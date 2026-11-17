import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth/jwt';
import { prisma } from '@/lib/db/prisma';
import {
  Store,
  Package,
  TrendingUp,
  DollarSign,
  Clock,
  ShieldCheck,
  PlusCircle,
  Truck,
  AlertTriangle,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { formatCurrency, formatDate } from '@/lib/utils/formatters';
import { Badge } from '@/components/ui/Badge';

export const revalidate = 0;

export default async function SellerDashboardPage() {
  const session = await getSession();
  if (!session) {
    redirect('/login');
  }

  // Find seller profile & store
  const seller = await prisma.sellerProfile.findUnique({
    where: { userId: session.userId },
    include: {
      store: {
        include: {
          products: {
            orderBy: { createdAt: 'desc' },
            take: 5,
            include: { images: true },
          },
          fulfillmentOrders: {
            orderBy: { createdAt: 'desc' },
            take: 5,
            include: {
              orderItems: true,
              shipment: true,
            },
          },
          _count: {
            select: { products: true, fulfillmentOrders: true },
          },
        },
      },
    },
  });

  if (!seller) {
    redirect('/become-seller');
  }

  const isVerified = seller.verificationStatus === 'VERIFIED';
  const store = seller.store;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header & Verification Status */}
      <div className="bg-white dark:bg-navy-900 rounded-3xl border border-slate-200/80 dark:border-navy-700/80 p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6 transition-colors">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 flex items-center justify-center font-black text-2xl border border-brand-200 dark:border-brand-800 shrink-0">
            {store?.name.slice(0, 1) || 'S'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                {store?.name || seller.businessName}
              </h1>
              <Badge
                variant={isVerified ? 'brand' : seller.verificationStatus === 'SUBMITTED' ? 'warning' : 'danger'}
                size="sm"
              >
                KYC: {seller.verificationStatus}
              </Badge>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Legal Entity: {seller.businessName} &bull; Country: {seller.countryCode} &bull; Reg: {seller.regNumber || 'Pending'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {store && (
            <Link
              href={`/shop?store=${store.slug}`}
              className="px-4 py-2 border border-slate-200 dark:border-navy-700 hover:border-slate-300 dark:hover:border-navy-600 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-navy-800 flex items-center gap-1.5 transition-colors"
            >
              <span>View Public Storefront</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          )}

          {isVerified && (
            <Link
              href="/seller/products/new"
              className="px-4 py-2 bg-brand-600 hover:bg-brand-700 dark:bg-brand-600 dark:hover:bg-brand-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add New Product</span>
            </Link>
          )}
        </div>
      </div>

      {/* KYC Warning Banner if Not Verified */}
      {!isVerified && (
        <div className="p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs">
            <h4 className="font-bold text-sm text-amber-950 dark:text-amber-100">
              KYC Business Verification Application Under Review
            </h4>
            <p className="text-amber-800 dark:text-amber-300 leading-relaxed">
              Your business documents (incorporation license, director ID, and bank account details) have been submitted to NUBIMART platform compliance officers. While under review, your store catalog is private. Once approved by an administrator, your storefront will be publicly indexed across 38 countries.
            </p>
          </div>
        </div>
      )}

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white dark:bg-navy-900 rounded-2xl border border-slate-200/80 dark:border-navy-700/80 p-5 shadow-sm space-y-2 transition-colors">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-semibold">
            <span>Available Wallet Balance</span>
            <DollarSign className="w-4 h-4 text-brand-600 dark:text-brand-400" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            {formatCurrency(seller.walletBalance, 'USD')}
          </div>
          <Link href="/seller/wallet" className="text-xs text-brand-600 dark:text-brand-400 font-bold hover:underline block pt-1">
            Request Payout Withdrawal &rarr;
          </Link>
        </div>

        <div className="bg-white dark:bg-navy-900 rounded-2xl border border-slate-200/80 dark:border-navy-700/80 p-5 shadow-sm space-y-2 transition-colors">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-semibold">
            <span>Pending Escrow Balance</span>
            <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            {formatCurrency(seller.pendingBalance, 'USD')}
          </div>
          <p className="text-[11px] text-slate-400 dark:text-slate-500 pt-1">Released upon carrier delivery confirmation</p>
        </div>

        <div className="bg-white dark:bg-navy-900 rounded-2xl border border-slate-200/80 dark:border-navy-700/80 p-5 shadow-sm space-y-2 transition-colors">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-semibold">
            <span>Assigned Sub-Orders</span>
            <Package className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            {store?._count.fulfillmentOrders || 0}
          </div>
          <Link href="/seller/orders" className="text-xs text-brand-600 dark:text-brand-400 font-bold hover:underline block pt-1">
            Manage Order Fulfillment &rarr;
          </Link>
        </div>

        <div className="bg-white dark:bg-navy-900 rounded-2xl border border-slate-200/80 dark:border-navy-700/80 p-5 shadow-sm space-y-2 transition-colors">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-semibold">
            <span>Active Products Listed</span>
            <Store className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            {store?._count.products || 0}
          </div>
          <Link href="/seller/products" className="text-xs text-brand-600 dark:text-brand-400 font-bold hover:underline block pt-1">
            View Catalog & Stock &rarr;
          </Link>
        </div>
      </div>

      {/* Recent Fulfillment Orders Table */}
      <div className="bg-white dark:bg-navy-900 rounded-3xl border border-slate-200/80 dark:border-navy-700/80 p-6 sm:p-8 shadow-sm space-y-6 transition-colors">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-navy-800">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Assigned Fulfillment Orders</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Orders requiring pick, pack, dispatch and tracking numbers
            </p>
          </div>
          <Link href="/seller/orders" className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300">
            View All Sub-Orders &rarr;
          </Link>
        </div>

        {(!store?.fulfillmentOrders || store.fulfillmentOrders.length === 0) ? (
          <div className="text-center py-10 text-xs text-slate-500 dark:text-slate-400">
            No fulfillment orders assigned to your storefront yet.
          </div>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-navy-800">
            {store.fulfillmentOrders.map((fo) => (
              <div key={fo.id} className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs text-slate-900 dark:text-slate-100">
                      Sub-Order #{fo.id.slice(-8).toUpperCase()}
                    </span>
                    <Badge variant="brand" size="sm">
                      {fo.fulfillmentStatus}
                    </Badge>
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-300">
                    {fo.orderItems.map((i) => `${i.quantity}x ${i.productName}`).join(', ')}
                  </div>
                  <div className="text-[11px] text-slate-400 dark:text-slate-500">
                    Tracking: {fo.shipment?.trackingNumber || 'Manifest Generated'} &bull; Carrier: {fo.shipment?.carrier || 'DHL'}
                  </div>
                </div>

                <div className="flex items-center gap-4 justify-between sm:justify-end">
                  <div className="text-right">
                    <div className="text-sm font-black text-slate-900 dark:text-white">
                      {formatCurrency(fo.sellerEarnings, 'USD')}
                    </div>
                    <div className="text-[10px] text-slate-400 dark:text-slate-500">Net Seller Earnings</div>
                  </div>

                  <Link
                    href="/seller/orders"
                    className="px-3 py-1.5 bg-slate-900 dark:bg-navy-800 hover:bg-slate-800 dark:hover:bg-navy-700 text-white rounded-lg text-xs font-bold transition-colors"
                  >
                    Manage
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
