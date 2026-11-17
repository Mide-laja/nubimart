import React from 'react';
import Link from 'next/link';
import { Search, ShoppingBag, ShieldCheck, Truck, ArrowRight } from 'lucide-react';

export default function HowItWorksPage() {
  const steps = [
    {
      num: '01',
      title: 'Discover Verified Creators',
      desc: 'Browse certified products from master artisans, innovative hardware creators, and organic beauty producers across 38 countries.',
      icon: <Search className="w-6 h-6 text-brand-600" />,
    },
    {
      num: '02',
      title: 'Multi-Vendor Split Cart',
      desc: 'Add items from vendors in Nigeria, Kenya, the US, or the UK into one cart. The system automatically calculates transparent regional shipping.',
      icon: <ShoppingBag className="w-6 h-6 text-brand-600" />,
    },
    {
      num: '03',
      title: 'Secure Escrow Checkout',
      desc: 'Pay in your home currency with Paystack, Flutterwave, Stripe, or PayPal. Funds are held safely in escrow rather than paid immediately to the seller.',
      icon: <ShieldCheck className="w-6 h-6 text-brand-600" />,
    },
    {
      num: '04',
      title: 'Express Tracked Delivery & Release',
      desc: 'Each vendor prepares and dispatches their portion via DHL or FedEx. Once you inspect and confirm receipt of goods, escrow funds are released.',
      icon: <Truck className="w-6 h-6 text-brand-600" />,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-600">The Journey</span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          How NUBIMART Works
        </h1>
        <p className="text-sm text-slate-500">
          A seamless, transparent experience for buyers and verified international merchants.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((s) => (
          <div key={s.num} className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm space-y-4 relative flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl font-black text-slate-200 font-mono">{s.num}</span>
                <div className="p-3 bg-brand-50 rounded-2xl">{s.icon}</div>
              </div>
              <h3 className="text-base font-bold text-slate-900">{s.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed mt-2">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-50 rounded-3xl border border-slate-200 p-8 sm:p-12 text-center space-y-4">
        <h3 className="text-xl sm:text-2xl font-black text-slate-900">Ready to Experience NUBIMART?</h3>
        <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
          Start exploring thousands of authentic items or register your business to sell across 38 global markets today.
        </p>
        <div className="pt-2 flex justify-center gap-4">
          <Link href="/shop" className="px-6 py-3 bg-brand-600 text-white rounded-xl text-xs font-bold hover:bg-brand-700 transition-colors">
            Shop Catalog
          </Link>
          <Link href="/become-seller" className="px-6 py-3 bg-white border border-slate-300 text-slate-800 rounded-xl text-xs font-bold hover:bg-slate-100 transition-colors">
            Become a Seller
          </Link>
        </div>
      </div>
    </div>
  );
}
