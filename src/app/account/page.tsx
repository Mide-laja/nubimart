import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth/jwt';
import { prisma } from '@/lib/db/prisma';
import {
  User,
  Package,
  Heart,
  MapPin,
  Clock,
  ArrowRight,
  ShieldCheck,
  CreditCard,
  Sparkles,
} from 'lucide-react';
import { formatCurrency, formatDate } from '@/lib/utils/formatters';
import { Badge } from '@/components/ui/Badge';

export const revalidate = 0;

export default async function CustomerAccountPage() {
  const session = await getSession();
  if (!session) {
    redirect('/login');
  }

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    include: {
      addresses: true,
      orders: {
        orderBy: { createdAt: 'desc' },
        take: 5,
        include: {
          fulfillmentOrders: {
            include: { store: true },
          },
        },
      },
      affiliate: true,
      _count: {
        select: { orders: true, wishlist: true, reviews: true },
      },
    },
  });

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Account Hero Banner */}
      <div className="bg-white dark:bg-[#151a10] rounded-3xl border border-slate-200/80 dark:border-[#262f17] p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-brand-50 dark:bg-[#1f2614] text-brand-700 dark:text-brand-300 flex items-center justify-center font-black text-2xl border border-brand-200 dark:border-[#2f391c] shadow-sm">
            {user.name.slice(0, 1)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                {user.name}
              </h1>
              <Badge variant="brand" size="sm">
                Verified Global Buyer
              </Badge>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{user.email}</p>
          </div>
        </div>

        {user.affiliate && (
          <div className="p-4 bg-slate-50 dark:bg-[#1c2313] rounded-2xl border border-slate-200 dark:border-[#262f17] text-xs space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-200">
              <Sparkles className="w-3.5 h-3.5 text-gold-500" />
              <span>Affiliate Referral Link</span>
            </div>
            <div className="font-mono bg-white dark:bg-[#151a10] px-2.5 py-1 rounded border border-slate-200 dark:border-[#2f391c] text-[11px] text-brand-700 dark:text-brand-400 font-bold">
              nubimart.com/?ref={user.affiliate.referralCode}
            </div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400">
              Earn 5% commission on purchases made via your link.
            </div>
          </div>
        )}
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white dark:bg-[#151a10] rounded-2xl border border-slate-200/80 dark:border-[#262f17] p-5 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-xs font-semibold">Total Orders</span>
            <Package className="w-4 h-4 text-brand-600 dark:text-brand-400" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">{user._count.orders}</div>
          <Link href="/orders" className="text-xs text-brand-600 dark:text-brand-400 font-bold hover:underline inline-block pt-1">
            View full order history &rarr;
          </Link>
        </div>

        <div className="bg-white dark:bg-[#151a10] rounded-2xl border border-slate-200/80 dark:border-[#262f17] p-5 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-xs font-semibold">Saved Addresses</span>
            <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">{user.addresses.length}</div>
          <p className="text-xs text-slate-400 dark:text-slate-400 pt-1">Global delivery destinations</p>
        </div>

        <div className="bg-white dark:bg-[#151a10] rounded-2xl border border-slate-200/80 dark:border-[#262f17] p-5 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-xs font-semibold">Wishlist Items</span>
            <Heart className="w-4 h-4 text-rose-500 dark:text-rose-400" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">{user._count.wishlist}</div>
          <Link href="/shop" className="text-xs text-brand-600 dark:text-brand-400 font-bold hover:underline inline-block pt-1">
            Discover more products &rarr;
          </Link>
        </div>
      </div>

      {/* Recent Orders Section */}
      <div className="bg-white dark:bg-[#151a10] rounded-3xl border border-slate-200/80 dark:border-[#262f17] p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-[#262f17]">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Recent International Orders</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Real-time carrier tracking for cross-border shipments</p>
          </div>
          <Link href="/shop" className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:text-brand-700">
            Shop Catalog &rarr;
          </Link>
        </div>

        {user.orders.length === 0 ? (
          <div className="text-center py-12 text-slate-500 dark:text-slate-400 text-xs">
            You haven&apos;t placed any orders yet. Explore our catalog of verified sellers!
          </div>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-[#262f17]">
            {user.orders.map((ord) => (
              <div key={ord.id} className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs text-slate-900 dark:text-white">{ord.orderNumber}</span>
                    <Badge variant="brand" size="sm">
                      {ord.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Placed {formatDate(ord.createdAt)} &bull; {ord.fulfillmentOrders.length} {ord.fulfillmentOrders.length === 1 ? 'Merchant' : 'Merchants'}
                  </p>
                  <div className="text-[11px] text-slate-400 dark:text-slate-500">
                    Merchants: {ord.fulfillmentOrders.map((f) => f.store.name).join(', ')}
                  </div>
                </div>

                <div className="flex items-center gap-4 justify-between sm:justify-end">
                  <div className="text-right">
                    <div className="text-sm font-black text-slate-900 dark:text-white">
                      {formatCurrency(ord.grandTotal, ord.currencyCode)}
                    </div>
                    <div className="text-[10px] text-brand-700 dark:text-brand-400 font-semibold">Escrow Protected</div>
                  </div>

                  <Link
                    href={`/orders/${ord.orderNumber}`}
                    className="px-3.5 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold transition-colors shadow-2xs"
                  >
                    Track Shipment
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Saved Addresses Section */}
      <div className="bg-white dark:bg-[#151a10] rounded-3xl border border-slate-200/80 dark:border-[#262f17] p-6 sm:p-8 shadow-sm space-y-6">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-[#262f17]">
          Saved International Delivery Addresses
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {user.addresses.map((addr) => (
            <div key={addr.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1c2313] border border-slate-200 dark:border-[#262f17] text-xs space-y-1">
              <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white">
                <span>{addr.fullName}</span>
                {addr.isDefaultShipping && (
                  <Badge variant="success" size="sm">Default</Badge>
                )}
              </div>
              <p className="text-slate-600 dark:text-slate-300">{addr.street} {addr.apartment && `, ${addr.apartment}`}</p>
              <p className="text-slate-600 dark:text-slate-300">{addr.city}, {addr.state} {addr.postalCode}</p>
              <p className="font-semibold text-slate-800 dark:text-slate-200">{addr.countryCode}</p>
              <p className="text-slate-500 dark:text-slate-400 text-[11px] pt-1">Phone: {addr.phone}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
