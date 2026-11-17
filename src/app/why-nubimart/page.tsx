import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Globe, Zap, CheckCircle2, Lock, Truck, RefreshCw } from 'lucide-react';

export default function WhyNubimartPage() {
  const differentiators = [
    {
      title: 'Verified Origin Authentic Goods',
      desc: 'Zero counterfeit tolerance. Every merchant undergoes rigorous business registry, tax, and identity checks before publishing a single item.',
      icon: <ShieldCheck className="w-6 h-6 text-brand-600" />,
    },
    {
      title: 'Built-In Escrow Protection',
      desc: 'Unlike open marketplaces where payments go straight to unverified accounts, NUBIMART holds funds in escrow until carrier tracking confirms delivery.',
      icon: <Lock className="w-6 h-6 text-brand-600" />,
    },
    {
      title: 'Transparent Multi-Currency Billing',
      desc: 'Pay in your home currency (USD, NGN, GBP, EUR, KES, ZAR, etc.) without hidden bank conversion surcharges.',
      icon: <Globe className="w-6 h-6 text-brand-600" />,
    },
    {
      title: 'Express Cross-Border Fulfillment',
      desc: 'Direct integrations with DHL, FedEx, and regional fleets provide accurate delivery windows and continuous tracking updates.',
      icon: <Truck className="w-6 h-6 text-brand-600" />,
    },
    {
      title: 'Multi-Vendor Split Checkout',
      desc: 'Combine products from multiple creators across different continents into one unified order with separate tracking for each shipment.',
      icon: <Zap className="w-6 h-6 text-brand-600" />,
    },
    {
      title: '14-Day Global Return Policy',
      desc: 'If merchandise arrives damaged or fails to match verified catalog descriptions, return claims are arbitrated quickly and fairly.',
      icon: <RefreshCw className="w-6 h-6 text-brand-600" />,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-600">The NUBIMART Standard</span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Why Choose NUBIMART
        </h1>
        <p className="text-sm text-slate-500">
          Engineered from the ground up to solve the real problems of international e-commerce.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {differentiators.map((d, i) => (
          <div key={i} className="bg-white rounded-3xl border border-slate-200/80 p-8 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-brand-50 flex items-center justify-center">
              {d.icon}
            </div>
            <h3 className="text-base font-bold text-slate-900">{d.title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{d.desc}</p>
          </div>
        ))}
      </div>

      <div className="text-center pt-8">
        <Link
          href="/shop"
          className="inline-block px-8 py-3.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold shadow-md transition-all"
        >
          Explore NUBIMART Verified Products
        </Link>
      </div>
    </div>
  );
}
