import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { getSession } from '@/lib/auth/jwt';
import { generateTrackingNumber } from '@/lib/utils/formatters';

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession();
    if (!session || (session.role !== 'SELLER' && session.role !== 'ADMIN')) {
      return NextResponse.json({ error: 'Unauthorized: Seller account required' }, { status: 403 });
    }

    const { id } = params;

    const fulfillmentOrder = await prisma.fulfillmentOrder.findUnique({
      where: { id },
      include: {
        store: { include: { sellerProfile: true } },
        shipment: true,
      },
    });

    if (!fulfillmentOrder) {
      return NextResponse.json({ error: 'Fulfillment order not found' }, { status: 404 });
    }

    // Role-based authorization: Verify this fulfillment order belongs to this seller!
    if (session.role !== 'ADMIN' && fulfillmentOrder.store.sellerProfile.userId !== session.userId) {
      return NextResponse.json({ error: 'Forbidden: You cannot modify another merchant’s order.' }, { status: 403 });
    }

    // Update fulfillment status to SHIPPED
    const updated = await prisma.fulfillmentOrder.update({
      where: { id },
      data: {
        fulfillmentStatus: 'SHIPPED',
      },
    });

    // Update or create shipment
    if (fulfillmentOrder.shipment) {
      await prisma.shipment.update({
        where: { id: fulfillmentOrder.shipment.id },
        data: { status: 'IN_TRANSIT' },
      });

      await prisma.trackingEvent.create({
        data: {
          shipmentId: fulfillmentOrder.shipment.id,
          status: 'IN_TRANSIT',
          location: 'Origin Fulfilment Hub',
          description: 'Package picked up by courier service and scanned into express sorting network.',
        },
      });
    } else {
      const trackingNumber = generateTrackingNumber('DHL');
      const shipment = await prisma.shipment.create({
        data: {
          fulfillmentOrderId: id,
          carrier: 'DHL',
          trackingNumber,
          status: 'IN_TRANSIT',
          estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        },
      });

      await prisma.trackingEvent.create({
        data: {
          shipmentId: shipment.id,
          status: 'IN_TRANSIT',
          location: 'Origin Fulfilment Hub',
          description: 'Package picked up by courier service and scanned into express sorting network.',
        },
      });
    }

    return NextResponse.json({ success: true, fulfillmentOrder: updated });
  } catch (error) {
    console.error('Dispatch error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
