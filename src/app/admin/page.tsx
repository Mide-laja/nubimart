import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth/jwt';
import { prisma } from '@/lib/db/prisma';
import {
  ShieldAlert,
  DollarSign,
  Package,
  Users,
  Store,
  CheckCircle,
  Clock,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import { formatCurrency, formatDate } from '@/lib/utils/formatters';
import { Badge } from '@/components/ui/Badge';
import { AdminVerificationQueue } from './AdminVerificationQueue';

export const revalidate = 0;

export default async function AdminDashboardPage() {
  const session = await getSession();
  if (!session || session.role !== 'ADMIN') {
    redirect('/login');
  }

  // Calculate real platform operational metrics
  const [
    totalOrders,
    ordersList,
    totalCustomers,
    totalSellers,
    pendingSellers,
    fulfillmentOrders,
    auditLogs,
  ] = await Promise.all([
    prisma.order.count(),
    prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
      take: 6,
      include: {
        user: { select: { name: true, email: true } },
        fulfillmentOrders: { include: { store: true } },
        payments: true,
      },
    }),
    prisma.user.count({ where: { role: 'CUSTOMER' } }),
    prisma.sellerProfile.count({ where: { verificationStatus: 'VERIFIED' } }),
    prisma.sellerProfile.findMany({
      where: { verificationStatus: 'SUBMITTED' },
      include: {
        user: { select: { name: true, email: true } },
        store: true,
      },
      orderBy: { createdAt: 'asc' },
    }),
    prisma.fulfillmentOrder.findMany({
      select: {
        subtotal: true,
        commissionAmount: true,
      },
    }),
    prisma.auditLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
    }),
  ]);

  const gmv = fulfillmentOrders.reduce((sum, fo) => sum + fo.subtotal, 0);
  const totalCommissionRevenue = fulfillmentOrders.reduce((sum, fo) => sum + fo.commissionAmount, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Admin Header */}
      <div className="bg-navy-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-navy-800 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-purple-600 flex items-center justify-center font-black text-2xl text-white shadow-md">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black tracking-tight">
                Marketplace Administration Control Plane
              </h1>
              <Badge variant="brand" size="sm">SuperAdmin</Badge>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Global Platform Governance &bull; 38 Countries &bull; Escrow Risk Oversight
            </p>
          </div>
        </div>

        <div className="text-right text-xs text-slate-400">
          <div>Platform Commission Rate: <strong className="text-gold-400 font-bold">10.0% Default</strong></div>
          <div className="mt-1">Active Currency Base: <strong className="text-white font-bold">USD</strong></div>
        </div>
      </div>

      {/* Operational Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white dark:bg-navy-900 rounded-2xl border border-slate-200/80 dark:border-navy-700/80 p-5 shadow-sm space-y-2 transition-colors">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-semibold">
            <span>Gross Merchandise Value (GMV)</span>
            <DollarSign className="w-4 h-4 text-brand-600 dark:text-brand-400" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            {formatCurrency(gmv, 'USD')}
          </div>
          <div className="text-[11px] text-brand-700 dark:text-brand-400 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>All 38 international corridors</span>
          </div>
        </div>

        <div className="bg-white dark:bg-navy-900 rounded-2xl border border-slate-200/80 dark:border-navy-700/80 p-5 shadow-sm space-y-2 transition-colors">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-semibold">
            <span>Platform Commission Revenue</span>
            <DollarSign className="w-4 h-4 text-brand-600 dark:text-brand-400" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            {formatCurrency(totalCommissionRevenue, 'USD')}
          </div>
          <p className="text-[11px] text-slate-400 dark:text-slate-500">Net earned marketplace transaction fees</p>
        </div>

        <div className="bg-white dark:bg-navy-900 rounded-2xl border border-slate-200/80 dark:border-navy-700/80 p-5 shadow-sm space-y-2 transition-colors">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-semibold">
            <span>Total Marketplace Orders</span>
            <Package className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            {totalOrders}
          </div>
          <p className="text-[11px] text-slate-400 dark:text-slate-500">Customer transactions across merchants</p>
        </div>

        <div className="bg-white dark:bg-navy-900 rounded-2xl border border-slate-200/80 dark:border-navy-700/80 p-5 shadow-sm space-y-2 transition-colors">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-semibold">
            <span>Verified Active Sellers</span>
            <Store className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            {totalSellers}
          </div>
          <div className="text-[11px] text-amber-700 dark:text-amber-400 font-semibold">
            {pendingSellers.length} Pending KYC Applications
          </div>
        </div>
      </div>

      {/* Seller Verification Queue */}
      <div className="bg-white dark:bg-navy-900 rounded-3xl border border-slate-200/80 dark:border-navy-700/80 p-6 sm:p-8 shadow-sm space-y-6 transition-colors">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-navy-800">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Seller KYC Verification Queue ({pendingSellers.length})
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Inspect submitted business documents, tax registrations, and bank details before approving merchant storefronts.
            </p>
          </div>
        </div>

        <AdminVerificationQueue pendingSellers={pendingSellers as any} />
      </div>

      {/* Recent Orders Audit */}
      <div className="bg-white dark:bg-navy-900 rounded-3xl border border-slate-200/80 dark:border-navy-700/80 p-6 sm:p-8 shadow-sm space-y-6 transition-colors">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-navy-800">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Recent Cross-Border Orders & Escrow Audit
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Inspect transaction values, payment gateways, and merchant fulfillment sub-orders
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-navy-800 text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-200/80 dark:border-navy-700">
              <tr>
                <th className="px-6 py-4">Order Number</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Merchants Involved</th>
                <th className="px-6 py-4">Grand Total</th>
                <th className="px-6 py-4">Payment Method</th>
                <th className="px-6 py-4">Escrow Status</th>
                <th className="px-6 py-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-navy-800">
              {ordersList.map((ord) => (
                <tr key={ord.id} className="hover:bg-slate-50/60 dark:hover:bg-navy-800/60 transition-colors">
                  <td className="px-6 py-4 font-mono font-bold text-slate-900 dark:text-slate-100">
                    <Link href={`/orders/${ord.orderNumber}`} className="text-brand-600 dark:text-brand-400 hover:underline">
                      {ord.orderNumber}
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-900 dark:text-white">{ord.user.name}</div>
                    <div className="text-[11px] text-slate-400 dark:text-slate-500">{ord.user.email}</div>
                  </td>
                  <td className="px-6 py-4 text-slate-700 dark:text-slate-300">
                    {ord.fulfillmentOrders.map((f) => f.store.name).join(', ')}
                  </td>
                  <td className="px-6 py-4 font-black text-slate-900 dark:text-white">
                    {formatCurrency(ord.grandTotal, ord.currencyCode)}
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-mono bg-slate-100 dark:bg-navy-800 px-2 py-0.5 rounded text-slate-800 dark:text-slate-200 font-semibold border dark:border-navy-700">
                      {ord.payments[0]?.paymentMethod || 'PAYSTACK'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="success" size="sm">
                      {ord.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-slate-500 dark:text-slate-400">
                    {formatDate(ord.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Platform Audit Logs */}
      <div className="bg-white dark:bg-navy-900 rounded-3xl border border-slate-200/80 dark:border-navy-700/80 p-6 sm:p-8 shadow-sm space-y-4 transition-colors">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-navy-800">
          Security & System Audit Trail
        </h2>

        {auditLogs.length === 0 ? (
          <div className="text-xs text-slate-500 dark:text-slate-400">No security audit logs recorded yet.</div>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-navy-800 text-xs">
            {auditLogs.map((log) => (
              <div key={log.id} className="py-3 first:pt-0 last:pb-0 flex items-center justify-between">
                <div>
                  <span className="font-mono font-bold text-brand-700 dark:text-brand-400">{log.action}</span>
                  <span className="text-slate-500 dark:text-slate-400 ml-2">Resource: {log.resource} ({log.resourceId})</span>
                </div>
                <span className="text-slate-400 dark:text-slate-500 text-[11px]">{formatDate(log.createdAt)}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
