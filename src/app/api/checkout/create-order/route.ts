import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { getSession } from '@/lib/auth/jwt';
import { generateOrderNumber, generateTrackingNumber } from '@/lib/utils/formatters';
import { z } from 'zod';

const createOrderSchema = z.object({
  items: z.array(
    z.object({
      productId: z.string(),
      variantId: z.string().optional(),
      quantity: z.number().int().positive(),
    })
  ).min(1, 'Cart cannot be empty'),
  shippingAddress: z.object({
    fullName: z.string().min(2),
    phone: z.string().min(6),
    street: z.string().min(3),
    apartment: z.string().optional(),
    city: z.string().min(2),
    state: z.string().min(2),
    postalCode: z.string().min(2),
    countryCode: z.string().length(2),
  }),
  paymentMethod: z.enum(['TEST_GATEWAY', 'PAYSTACK', 'FLUTTERWAVE', 'STRIPE']),
  couponCode: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const session = await getSession();
    const body = await req.json();

    const validation = createOrderSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid checkout request data', details: validation.error.format() },
        { status: 400 }
      );
    }

    const { items, shippingAddress, paymentMethod, couponCode } = validation.data;

    // Get user: if logged in, use session.userId; if guest, look up or create demo customer
    let userId = session?.userId;
    if (!userId) {
      let customer = await prisma.user.findUnique({ where: { email: 'customer@nubimart.com' } });
      if (!customer) {
        return NextResponse.json({ error: 'Please sign in to complete checkout' }, { status: 401 });
      }
      userId = customer.id;
    }

    // 1. Recalculate and verify ALL items and prices from database (NEVER trust frontend prices)
    const productIds = items.map((i) => i.productId);
    const dbProducts = await prisma.product.findMany({
      where: { id: { in: productIds }, status: 'APPROVED' },
      include: {
        store: true,
        variants: true,
        inventories: true,
      },
    });

    if (dbProducts.length !== productIds.length) {
      return NextResponse.json(
        { error: 'One or more items in your cart are no longer available in the marketplace.' },
        { status: 400 }
      );
    }

    // Group items by vendor storeId for multi-vendor order splitting
    const itemsByStore: Record<
      string,
      {
        storeId: string;
        storeName: string;
        items: {
          productId: string;
          variantId?: string;
          productName: string;
          sku: string;
          unitPrice: number;
          quantity: number;
          totalPrice: number;
        }[];
        storeSubtotal: number;
      }
    > = {};

    let verifiedSubtotal = 0;

    for (const item of items) {
      const prod = dbProducts.find((p) => p.id === item.productId)!;
      let unitPrice = prod.salePrice || prod.basePrice;
      let sku = prod.sku;

      if (item.variantId) {
        const variant = prod.variants.find((v) => v.id === item.variantId);
        if (variant) {
          unitPrice += variant.priceAdjustment;
          sku = variant.sku;
        }
      }

      const itemTotalPrice = unitPrice * item.quantity;
      verifiedSubtotal += itemTotalPrice;

      if (!itemsByStore[prod.storeId]) {
        itemsByStore[prod.storeId] = {
          storeId: prod.storeId,
          storeName: prod.store.name,
          items: [],
          storeSubtotal: 0,
        };
      }

      itemsByStore[prod.storeId].items.push({
        productId: prod.id,
        variantId: item.variantId,
        productName: prod.name,
        sku,
        unitPrice,
        quantity: item.quantity,
        totalPrice: itemTotalPrice,
      });

      itemsByStore[prod.storeId].storeSubtotal += itemTotalPrice;
    }

    // 2. Validate coupon on server
    let discountTotal = 0;
    if (couponCode) {
      const coupon = await prisma.coupon.findUnique({
        where: { code: couponCode.toUpperCase() },
      });
      if (coupon && coupon.isActive && verifiedSubtotal >= coupon.minOrderAmount) {
        if (coupon.discountType === 'PERCENTAGE') {
          discountTotal = (verifiedSubtotal * coupon.discountValue) / 100;
        } else {
          discountTotal = coupon.discountValue;
        }
      }
    }

    // 3. Multi-vendor shipping ($15 per seller; free if total > $150)
    const storeCount = Object.keys(itemsByStore).length;
    const shippingTotal = verifiedSubtotal > 150 ? 0 : storeCount * 15;
    const taxTotal = (verifiedSubtotal - discountTotal) * 0.08; // 8% base tax
    const grandTotal = Math.max(0, verifiedSubtotal - discountTotal + shippingTotal + taxTotal);

    const orderNumber = generateOrderNumber();

    // 4. ATOMIC DATABASE TRANSACTION: Create Master Order + Split Sub-Orders + Payment
    const createdOrder = await prisma.$transaction(async (tx) => {
      // Create master Order
      const newOrder = await tx.order.create({
        data: {
          orderNumber,
          userId,
          subtotal: verifiedSubtotal,
          discountTotal,
          shippingTotal,
          taxTotal,
          grandTotal,
          currencyCode: 'USD',
          exchangeRateToBase: 1.0,
          status: 'PROCESSING',
          shippingAddress: JSON.stringify(shippingAddress),
        },
      });

      // Split into Fulfillment Orders per vendor
      for (const group of Object.values(itemsByStore)) {
        const storeShippingFee = shippingTotal > 0 ? shippingTotal / storeCount : 0;
        const commissionRate = 0.1; // 10% platform commission
        const commissionAmount = group.storeSubtotal * commissionRate;
        const sellerEarnings = group.storeSubtotal - commissionAmount;

        const fulfillmentOrder = await tx.fulfillmentOrder.create({
          data: {
            orderId: newOrder.id,
            storeId: group.storeId,
            subtotal: group.storeSubtotal,
            shippingFee: storeShippingFee,
            commissionRate,
            commissionAmount,
            sellerEarnings,
            fulfillmentStatus: 'CONFIRMED',
            shippingMethod: 'DHL Express Worldwide',
          },
        });

        // Create Order Items
        for (const item of group.items) {
          await tx.orderItem.create({
            data: {
              orderId: newOrder.id,
              fulfillmentOrderId: fulfillmentOrder.id,
              productId: item.productId,
              variantId: item.variantId || null,
              productName: item.productName,
              sku: item.sku,
              unitPrice: item.unitPrice,
              quantity: item.quantity,
              totalPrice: item.totalPrice,
            },
          });
        }

        // Create Shipment & initial tracking event
        const trackingNumber = generateTrackingNumber('DHL');
        const shipment = await tx.shipment.create({
          data: {
            fulfillmentOrderId: fulfillmentOrder.id,
            carrier: 'DHL',
            trackingNumber,
            status: 'MANIFESTED',
            estimatedDelivery: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
          },
        });

        await tx.trackingEvent.create({
          data: {
            shipmentId: shipment.id,
            status: 'MANIFESTED',
            location: `${shippingAddress.city}, ${shippingAddress.countryCode}`,
            description: `Order verified and fulfillment request dispatched to ${group.storeName}.`,
          },
        });
      }

      // Record Payment
      const providerReference = `ref_${paymentMethod.toLowerCase()}_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
      await tx.payment.create({
        data: {
          orderId: newOrder.id,
          paymentMethod,
          providerReference,
          amount: grandTotal,
          currencyCode: 'USD',
          status: 'SUCCESSFUL',
          paidAt: new Date(),
        },
      });

      return newOrder;
    });

    return NextResponse.json({
      success: true,
      orderNumber: createdOrder.orderNumber,
      orderId: createdOrder.id,
      grandTotal: createdOrder.grandTotal,
    });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred while processing your order.' },
      { status: 500 }
    );
  }
}
