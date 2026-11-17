'use client';

import React, { useState } from 'react';
import { Truck, Check, Package, ExternalLink, Calendar } from 'lucide-react';
import { formatCurrency, formatDate } from '@/lib/utils/formatters';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface Props {
  orders: any[];
}

export function SellerOrdersClient({ orders: initialOrders }: Props) {
  const [orders, setOrders] = useState(initialOrders);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleDispatch = async (orderId: string) => {
    setLoadingId(orderId);
    try {
      const res = await fetch(`/api/seller/orders/${orderId}/dispatch`, {
        method: 'POST',
      });
      if (res.ok) {
        setOrders((prev) =>
          prev.map((o) =>
            o.id === orderId ? { ...o, fulfillmentStatus: 'SHIPPED' } : o
          )
        );
      }
    } catch (e) {
      console.error('Dispatch failed:', e);
    } finally {
      setLoadingId(null);
    }
  };

  if (orders.length === 0) {
    return (
      <div className="bg-white dark:bg-navy-900 rounded-3xl border border-slate-200 dark:border-navy-700/80 p-12 text-center space-y-3 transition-colors">
        <Package className="w-10 h-10 text-slate-400 dark:text-slate-500 mx-auto" />
        <h3 className="text-base font-bold text-slate-900 dark:text-white">No Orders Assigned Yet</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          When international customers purchase your products, your sub-orders will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {orders.map((fo) => (
        <div key={fo.id} className="bg-white dark:bg-navy-900 rounded-3xl border border-slate-200/80 dark:border-navy-700/80 p-6 shadow-sm space-y-4 transition-colors">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 dark:border-navy-800 gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-sm text-slate-900 dark:text-slate-100">
                  Sub-Order #{fo.id.slice(-8).toUpperCase()}
                </span>
                <Badge
                  variant={fo.fulfillmentStatus === 'DELIVERED' ? 'success' : 'brand'}
                  size="sm"
                >
                  {fo.fulfillmentStatus}
                </Badge>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Created {formatDate(fo.createdAt)} &bull; Shipping Carrier: {fo.shippingMethod || 'DHL Express'}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-base font-black text-slate-900 dark:text-white">
                  {formatCurrency(fo.sellerEarnings, 'USD')}
                </div>
                <div className="text-[10px] text-slate-400 dark:text-slate-500">Net Merchant Payout</div>
              </div>

              {fo.fulfillmentStatus !== 'SHIPPED' && fo.fulfillmentStatus !== 'DELIVERED' && (
                <Button
                  onClick={() => handleDispatch(fo.id)}
                  variant="primary"
                  size="sm"
                  isLoading={loadingId === fo.id}
                  icon={<Truck className="w-4 h-4" />}
                >
                  Dispatch & Ship
                </Button>
              )}
            </div>
          </div>

          {/* Items */}
          <div className="divide-y divide-slate-100 dark:divide-navy-800 text-xs">
            {fo.orderItems.map((item: any) => (
              <div key={item.id} className="py-2.5 first:pt-0 last:pb-0 flex justify-between items-center">
                <div>
                  <span className="font-bold text-slate-900 dark:text-slate-100">{item.quantity}x {item.productName}</span>
                  <span className="text-slate-400 dark:text-slate-500 font-mono ml-2">({item.sku})</span>
                </div>
                <div className="font-bold text-slate-900 dark:text-white">
                  {formatCurrency(item.totalPrice, 'USD')}
                </div>
              </div>
            ))}
          </div>

          {/* Tracking info */}
          {fo.shipment && (
            <div className="bg-slate-50 dark:bg-navy-800 p-3 rounded-xl border border-slate-100 dark:border-navy-700 flex items-center justify-between text-xs text-slate-600 dark:text-slate-300">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                <span>Tracking Number: <strong className="font-mono text-slate-900 dark:text-slate-100">{fo.shipment.trackingNumber}</strong></span>
              </div>
              <span className="text-slate-500 dark:text-slate-400 text-[11px]">Carrier: {fo.shipment.carrier}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
