import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/db/prisma';
import {
  CheckCircle,
  Package,
  Truck,
  ShieldCheck,
  Calendar,
  MapPin,
  CreditCard,
  Store,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { formatCurrency, formatDate, formatDateTime } from '@/lib/utils/formatters';
import { Badge } from '@/components/ui/Badge';

export const revalidate = 0;

interface OrderPageProps {
  params: {
    orderNumber: string;
  };
}

export default async function OrderConfirmationPage({ params }: OrderPageProps) {
  const { orderNumber } = params;

  const order = await prisma.order.findUnique({
    where: { orderNumber },
    include: {
      payments: true,
      fulfillmentOrders: {
        include: {
          store: true,
          orderItems: true,
          shipment: {
            include: {
              events: { orderBy: { timestamp: 'desc' } },
            },
          },
        },
      },
    },
  });

  if (!order) {
    notFound();
  }

  let address: any = {};
  try {
    address = JSON.parse(order.shippingAddress);
  } catch (e) {
    address = {};
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Success Banner */}
      <div className="bg-brand-50 dark:bg-[#151f11] border border-brand-200 dark:border-[#283d1c] rounded-3xl p-6 sm:p-8 text-center space-y-3">
        <div className="w-14 h-14 rounded-full bg-brand-600 text-white flex items-center justify-center mx-auto shadow-md">
          <CheckCircle className="w-8 h-8" />
        </div>
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Order Confirmed & Escrow Secured!
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Thank you for shopping on NUBIMART. Your payment of{' '}
            <strong className="text-slate-900 dark:text-white">{formatCurrency(order.grandTotal, order.currencyCode)}</strong> is safely held in escrow.
          </p>
        </div>
        <div className="pt-1 flex flex-wrap items-center justify-center gap-3 text-xs">
          <span className="font-mono font-bold text-slate-900 dark:text-white bg-white dark:bg-[#1a2313] px-3 py-1.5 rounded-xl border border-slate-200 dark:border-[#2f391c]">
            Order #{order.orderNumber}
          </span>
          <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            Placed on {formatDate(order.createdAt)}
          </span>
        </div>
      </div>

      {/* Multi-Vendor Fulfillment Breakdown */}
      <div className="space-y-6">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-[#262f17]">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Shipments by Merchant ({order.fulfillmentOrders.length} Sub-Orders)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Each international merchant packages and dispatches their items independently.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {order.fulfillmentOrders.map((fo, idx) => (
            <div
              key={fo.id}
              className="bg-white dark:bg-[#151a10] rounded-2xl border border-slate-200/80 dark:border-[#262f17] shadow-sm overflow-hidden"
            >
              {/* Store & Sub-Order Header */}
              <div className="bg-slate-50 dark:bg-[#1c2313] px-6 py-4 border-b border-slate-100 dark:border-[#262f17] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-brand-50 dark:bg-[#1f2614] rounded-xl text-brand-600 dark:text-brand-400">
                    <Store className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-900 dark:text-white">{fo.store.name}</span>
                      <ShieldCheck className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
                    </div>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">
                      Sub-Order #{fo.id.slice(-8).toUpperCase()} &bull; Carrier: {fo.shippingMethod || 'DHL Worldwide'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant="brand" size="md">
                    Status: {fo.fulfillmentStatus}
                  </Badge>
                </div>
              </div>

              {/* Items List */}
              <div className="p-6 divide-y divide-slate-100 dark:divide-[#262f17]">
                {fo.orderItems.map((item) => (
                  <div key={item.id} className="py-3 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
                    <div className="space-y-0.5">
                      <h4 className="text-sm font-semibold text-slate-900 dark:text-white">{item.productName}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                        SKU: {item.sku} &bull; Qty: {item.quantity} &times; {formatCurrency(item.unitPrice, order.currencyCode)}
                      </p>
                    </div>
                    <div className="text-sm font-black text-slate-900 dark:text-white">
                      {formatCurrency(item.totalPrice, order.currencyCode)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Shipment Tracking Timeline */}
              {fo.shipment && (
                <div className="bg-slate-50/60 dark:bg-[#182012] p-6 border-t border-slate-100 dark:border-[#262f17] space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
                      <Truck className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                      <span>Live Carrier Tracking: {fo.shipment.carrier}</span>
                      <span className="font-mono bg-white dark:bg-[#151a10] px-2 py-0.5 rounded border border-slate-200 dark:border-[#2f391c]">
                        {fo.shipment.trackingNumber}
                      </span>
                    </div>

                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      Est. Delivery: {fo.shipment.estimatedDelivery ? formatDate(fo.shipment.estimatedDelivery) : '3-5 Business Days'}
                    </span>
                  </div>

                  {/* Tracking Milestones */}
                  <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-brand-200 dark:before:bg-[#283d1c]">
                    {fo.shipment.events.map((evt) => (
                      <div key={evt.id} className="relative">
                        <div className="absolute -left-6 top-1 w-3 h-3 rounded-full bg-brand-600 ring-4 ring-brand-100 dark:ring-brand-900/40" />
                        <div>
                          <div className="text-xs font-bold text-slate-900 dark:text-white">{evt.description}</div>
                          <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-2 mt-0.5">
                            <span className="font-medium text-slate-700 dark:text-slate-300">{evt.location}</span>
                            <span>&bull;</span>
                            <span>{formatDateTime(evt.timestamp)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Details Grid: Address & Payment */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Address */}
        <div className="bg-white dark:bg-[#151a10] rounded-2xl border border-slate-200/80 dark:border-[#262f17] p-6 shadow-sm space-y-2 text-xs">
          <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-[#262f17]">
            <MapPin className="w-4 h-4 text-brand-600 dark:text-brand-400" />
            <span>Shipping Destination</span>
          </div>
          <div className="font-bold text-slate-900 dark:text-white">{address.fullName}</div>
          <div className="text-slate-600 dark:text-slate-300">{address.street} {address.apartment && `, ${address.apartment}`}</div>
          <div className="text-slate-600 dark:text-slate-300">{address.city}, {address.state} {address.postalCode}</div>
          <div className="font-semibold text-slate-800 dark:text-slate-200">Country Code: {address.countryCode}</div>
          <div className="text-slate-500 dark:text-slate-400 pt-1">Phone: {address.phone}</div>
        </div>

        {/* Payment & Security */}
        <div className="bg-white dark:bg-[#151a10] rounded-2xl border border-slate-200/80 dark:border-[#262f17] p-6 shadow-sm space-y-2 text-xs">
          <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-[#262f17]">
            <CreditCard className="w-4 h-4 text-brand-600 dark:text-brand-400" />
            <span>Payment Summary</span>
          </div>
          <div className="flex justify-between text-slate-600 dark:text-slate-400">
            <span>Payment Gateway:</span>
            <span className="font-bold text-slate-900 dark:text-white">{order.payments[0]?.paymentMethod || 'SECURE_GATEWAY'}</span>
          </div>
          <div className="flex justify-between text-slate-600 dark:text-slate-400">
            <span>Transaction Reference:</span>
            <span className="font-mono text-slate-700 dark:text-slate-300">{order.payments[0]?.providerReference}</span>
          </div>
          <div className="flex justify-between text-slate-600 dark:text-slate-400">
            <span>Escrow Status:</span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400">FUNDS HELD IN ESCROW</span>
          </div>
          <div className="pt-2 border-t border-slate-100 dark:border-[#262f17] flex justify-between font-bold text-sm text-slate-900 dark:text-white">
            <span>Total Paid:</span>
            <span>{formatCurrency(order.grandTotal, order.currencyCode)}</span>
          </div>
        </div>
      </div>

      <div className="text-center pt-4">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-xl shadow-md transition-all"
        >
          <span>Continue Shopping NUBIMART Catalog</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
