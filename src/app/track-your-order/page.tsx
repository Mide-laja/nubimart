import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/db/prisma';
import {
  Compass,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  MapPin,
  AlertCircle,
  Building2,
  Plane,
} from 'lucide-react';

export const revalidate = 0;

interface TrackOrderPageProps {
  searchParams: {
    orderId?: string;
    email?: string;
  };
}

export default async function TrackOrderPage({ searchParams }: TrackOrderPageProps) {
  const queryOrderId = searchParams.orderId || '';

  let order: any = null;
  if (queryOrderId) {
    order = await prisma.order.findFirst({
      where: {
        orderNumber: {
          contains: queryOrderId.trim(),
        },
      },
      include: {
        orderItems: true,
        fulfillmentOrders: {
          include: {
            store: true,
            shipment: {
              include: {
                events: {
                  orderBy: { timestamp: 'desc' },
                },
              },
            },
          },
        },
      },
    });
  }

  // Standard demo milestones if order exists or for demo fallback
  const isDemo = !order && queryOrderId.toUpperCase().includes('NUB-2026-90412');

  const defaultEvents = [
    {
      status: 'DELIVERED',
      location: 'London Heathrow Gateway & Dest Hub, UK',
      description: 'Delivered and signed by recipient. Escrow release authorized.',
      time: 'Oct 20, 2026 &bull; 08:45 AM',
      completed: true,
    },
    {
      status: 'OUT_FOR_DELIVERY',
      location: 'Greater London Distribution Facility',
      description: 'Package sorted to local courier vehicle for delivery.',
      time: 'Oct 19, 2026 &bull; 06:15 AM',
      completed: true,
    },
    {
      status: 'CUSTOMS_CLEARED',
      location: 'HM Revenue & Customs Import Terminal, UK',
      description: 'Cross-border electronic manifest approved. Zero duties pending.',
      time: 'Oct 18, 2026 &bull; 03:30 PM',
      completed: true,
    },
    {
      status: 'AIR_TRANSIT',
      location: 'Murtala Muhammed Cargo Hub, Lagos -> LHR',
      description: 'Dispatched via DHL Express Flight D0812 international air cargo.',
      time: 'Oct 17, 2026 &bull; 11:20 PM',
      completed: true,
    },
    {
      status: 'CARRIER_PICKUP',
      location: 'Ikeja Logistics Gateway, Nigeria',
      description: 'Consolidated parcel handed over to DHL Express with verified manifest.',
      time: 'Oct 17, 2026 &bull; 02:00 PM',
      completed: true,
    },
    {
      status: 'ESCROW_FUNDED',
      location: 'Nubimart Multi-Vendor Control Plane',
      description: 'Buyer payment verified via escrow adapter. Seller order split complete.',
      time: 'Oct 16, 2026 &bull; 09:12 AM',
      completed: true,
    },
  ];

  const activeEvents = order?.fulfillmentOrders[0]?.shipment?.events?.length > 0
    ? order.fulfillmentOrders[0].shipment.events.map((e: any) => ({
        status: e.status,
        location: e.location || 'Logistics Transit Hub',
        description: e.description,
        time: new Date(e.timestamp).toLocaleString(),
        completed: true,
      }))
    : defaultEvents;

  return (
    <div className="bg-slate-50 dark:bg-[#0c0e0a] min-h-screen py-10 space-y-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
            <Link href="/" className="hover:text-navy-950 dark:hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-navy-950 dark:text-white font-bold">Track Your Order</span>
          </div>

          <div className="max-w-xl">
            <h1 className="text-3xl font-black text-navy-950 dark:text-white tracking-tight">
              Track Your Order & Delivery
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Real-time multi-carrier tracking telemetry across 38 supported countries.
            </p>
          </div>
        </div>

        {/* Search Input Card */}
        <div className="bg-white dark:bg-[#151a10] rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-[#262f17] shadow-sm space-y-4">
          <form method="GET" action="/track-your-order" className="grid grid-cols-1 sm:grid-cols-12 gap-3">
            <div className="sm:col-span-8">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Order Reference or Tracking Number
              </label>
              <input
                type="text"
                name="orderId"
                required
                defaultValue={queryOrderId}
                placeholder="e.g. NUB-2026-90412"
                className="w-full bg-slate-50 dark:bg-[#1c2313] border border-slate-200 dark:border-[#2f391c] text-xs rounded-2xl px-4 py-3 text-navy-950 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:bg-white dark:focus:bg-[#182011] focus:outline-none focus:border-brand-600 font-mono"
              />
            </div>

            <div className="sm:col-span-4 flex items-end">
              <button
                type="submit"
                className="w-full py-3 px-6 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-md flex items-center justify-center gap-2"
              >
                <Compass className="w-4 h-4" />
                <span>Track</span>
              </button>
            </div>
          </form>

          <p className="text-[11px] text-slate-400 dark:text-slate-500">
            Try demo tracking ID:{' '}
            <Link
              href="/track-your-order?orderId=NUB-2026-90412"
              className="text-brand-600 dark:text-brand-400 font-mono font-bold hover:underline"
            >
              NUB-2026-90412
            </Link>
          </p>
        </div>

        {/* Tracking Results */}
        {queryOrderId ? (
          <div className="bg-white dark:bg-[#151a10] rounded-3xl border border-slate-200/80 dark:border-[#262f17] shadow-sm overflow-hidden divide-y divide-slate-100 dark:divide-[#262f17]">
            {/* Header Status Strip */}
            <div className="p-6 sm:p-8 bg-slate-50/70 dark:bg-[#182012] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Tracking Summary
                </span>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-black text-navy-950 dark:text-white font-mono">
                    {order ? order.orderNumber : queryOrderId}
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-brand-100 dark:bg-[#1f2614] text-brand-800 dark:text-brand-300 text-[10px] font-bold">
                    {order ? order.status : 'IN_TRANSIT'}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Carrier: <span className="font-semibold text-slate-800 dark:text-slate-200">DHL Express Air Cargo</span> &bull; Insured Escrow
                </p>
              </div>

              <div className="text-left sm:text-right space-y-1">
                <span className="text-xs text-slate-400 dark:text-slate-500">Estimated Landed Delivery</span>
                <div className="text-sm font-bold text-navy-950 dark:text-white">Delivered & Verified</div>
                <div className="text-[11px] text-brand-700 dark:text-brand-400 font-semibold flex items-center gap-1 sm:justify-end">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Escrow Guarantee Active</span>
                </div>
              </div>
            </div>

            {/* Timeline Events */}
            <div className="p-6 sm:p-8 space-y-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Milestone Telemetry
              </h4>

              <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 dark:before:bg-[#262f17]">
                {activeEvents.map((evt: any, i: number) => (
                  <div key={i} className="relative">
                    {/* Bullet */}
                    <div
                      className={`absolute -left-6 top-1 w-4 h-4 rounded-full border-2 border-white dark:border-[#151a10] shadow-xs ${
                        i === 0 ? 'bg-brand-600 ring-4 ring-brand-100 dark:ring-brand-900/40' : 'bg-slate-400 dark:bg-slate-600'
                      }`}
                    />

                    <div className="space-y-1">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1">
                        <span className="font-bold text-navy-950 dark:text-white text-sm">
                          {evt.status.replace(/_/g, ' ')}
                        </span>
                        <span className="text-[11px] text-slate-400 dark:text-slate-500 font-mono" dangerouslySetInnerHTML={{ __html: evt.time }} />
                      </div>
                      <div className="text-xs font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 shrink-0" />
                        <span>{evt.location}</span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed pt-0.5">
                        {evt.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white dark:bg-[#151a10] rounded-3xl p-8 border border-slate-200/80 dark:border-[#262f17] text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-[#1c2313] flex items-center justify-center mx-auto text-slate-400 dark:text-slate-500">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-navy-950 dark:text-white">No Order Selected</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
              Please enter an order number above or check your email receipt to monitor international transit telemetry.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
