import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth/jwt';
import { prisma } from '@/lib/db/prisma';
import { SellerOrdersClient } from './SellerOrdersClient';
import { ArrowLeft } from 'lucide-react';

export const revalidate = 0;

export default async function SellerOrdersPage() {
  const session = await getSession();
  if (!session) {
    redirect('/login');
  }

  const seller = await prisma.sellerProfile.findUnique({
    where: { userId: session.userId },
    include: {
      store: {
        include: {
          fulfillmentOrders: {
            orderBy: { createdAt: 'desc' },
            include: {
              orderItems: true,
              shipment: true,
            },
          },
        },
      },
    },
  });

  if (!seller || !seller.store) {
    redirect('/become-seller');
  }

  const serializedOrders = seller.store.fulfillmentOrders.map((fo) => ({
    ...fo,
    createdAt: fo.createdAt.toISOString(),
    updatedAt: fo.updatedAt.toISOString(),
    shipment: fo.shipment
      ? {
          ...fo.shipment,
          createdAt: fo.shipment.createdAt.toISOString(),
          estimatedDelivery: fo.shipment.estimatedDelivery?.toISOString() || null,
        }
      : null,
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <Link href="/seller" className="text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 flex items-center gap-1 mb-2">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Seller Dashboard</span>
        </Link>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Assigned Store Orders & Fulfillment
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Review, pack, and dispatch individual merchant fulfillment sub-orders
        </p>
      </div>

      <SellerOrdersClient orders={serializedOrders} />
    </div>
  );
}
