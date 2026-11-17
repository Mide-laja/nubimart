import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth/jwt';
import { prisma } from '@/lib/db/prisma';
import { Package, ArrowLeft, ArrowRight, Calendar, Store } from 'lucide-react';
import { formatCurrency, formatDate } from '@/lib/utils/formatters';
import { Badge } from '@/components/ui/Badge';

export const revalidate = 0;

export default async function CustomerOrdersPage() {
  const session = await getSession();
  if (!session) {
    redirect('/login');
  }

  const orders = await prisma.order.findMany({
    where: { userId: session.userId },
    orderBy: { createdAt: 'desc' },
    include: {
      fulfillmentOrders: {
        include: {
          store: true,
          orderItems: true,
          shipment: true,
        },
      },
    },
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <Link href="/account" className="text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white flex items-center gap-1 mb-2">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to My Account</span>
        </Link>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          My Order History ({orders.length})
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Review your cross-border purchases, fulfillment orders, and live carrier tracking
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white dark:bg-[#151a10] rounded-3xl border border-slate-200 dark:border-[#262f17] p-12 text-center space-y-4 shadow-sm">
          <Package className="w-12 h-12 text-slate-400 dark:text-slate-500 mx-auto" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">No orders placed yet</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            Browse our global catalog of verified international creators and artisans.
          </p>
          <div className="pt-2">
            <Link
              href="/shop"
              className="inline-block px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold rounded-xl transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((ord) => (
            <div
              key={ord.id}
              className="bg-white dark:bg-[#151a10] rounded-3xl border border-slate-200/80 dark:border-[#262f17] p-6 sm:p-8 shadow-sm space-y-5"
            >
              {/* Top bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 dark:border-[#262f17] gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-base text-slate-900 dark:text-white">
                      {ord.orderNumber}
                    </span>
                    <Badge variant="brand" size="sm">
                      {ord.status}
                    </Badge>
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Placed on {formatDate(ord.createdAt)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 justify-between sm:justify-end">
                  <div className="text-right">
                    <div className="text-base font-black text-slate-900 dark:text-white">
                      {formatCurrency(ord.grandTotal, ord.currencyCode)}
                    </div>
                    <div className="text-[10px] text-brand-700 dark:text-brand-400 font-semibold">Escrow Protected</div>
                  </div>

                  <Link
                    href={`/orders/${ord.orderNumber}`}
                    className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold transition-colors"
                  >
                    Track Shipment
                  </Link>
                </div>
              </div>

              {/* Sub-orders */}
              <div className="space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400">
                  Fulfillment Sub-Orders ({ord.fulfillmentOrders.length} {ord.fulfillmentOrders.length === 1 ? 'Merchant' : 'Merchants'}):
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {ord.fulfillmentOrders.map((fo) => (
                    <div key={fo.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1c2313] border border-slate-200 dark:border-[#262f17] text-xs space-y-2">
                      <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white">
                        <div className="flex items-center gap-1.5">
                          <Store className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
                          <span>{fo.store.name}</span>
                        </div>
                        <Badge variant="brand" size="sm">{fo.fulfillmentStatus}</Badge>
                      </div>

                      <div className="text-slate-600 dark:text-slate-300 text-[11px] space-y-0.5">
                        {fo.orderItems.map((item) => (
                          <div key={item.id} className="flex justify-between">
                            <span>{item.quantity}x {item.productName}</span>
                            <span className="font-semibold">{formatCurrency(item.totalPrice, ord.currencyCode)}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-2 border-t border-slate-200 dark:border-[#262f17] text-[10px] text-slate-500 dark:text-slate-400 flex justify-between">
                        <span>Carrier: {fo.shipment?.carrier || 'DHL'}</span>
                        <span className="font-mono">{fo.shipment?.trackingNumber || 'Manifesting'}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
