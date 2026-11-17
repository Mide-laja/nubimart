import React from 'react';
import Link from 'next/link';
import { Sparkles, DollarSign, Share2, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';

export default function AffiliatePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-50 text-gold-800 text-xs font-bold border border-gold-200">
          <Sparkles className="w-3.5 h-3.5 text-gold-600" />
          <span>NUBIMART Affiliate Program</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Earn 5% to 12% on Every Global Referral
        </h1>
        <p className="text-sm text-slate-500">
          Partner with NUBIMART to promote authentic artisan goods, luxury ceremonial fashion, and flagship electronics to your audience.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 space-y-3 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center">
            <Share2 className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900">1. Share Your Referral Link</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Generate unique affiliate tracking links for any catalog product, category, or storefront from your account dashboard.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 space-y-3 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-gold-50 text-gold-600 flex items-center justify-center">
            <DollarSign className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900">2. Customer Purchases</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            When international visitors complete an order using your link within 30 days, your commission is automatically logged in your affiliate ledger.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 space-y-3 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <TrendingUp className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900">3. Monthly Payouts</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Commissions are disbursed on the 1st of every month directly to your verified local or international bank account via Paystack, Stripe, or wire.
          </p>
        </div>
      </div>

      <div className="bg-slate-50 rounded-3xl border border-slate-200 p-8 text-center space-y-4">
        <h3 className="text-xl font-bold text-slate-900">Get Started in 60 Seconds</h3>
        <p className="text-xs text-slate-500 max-w-md mx-auto">
          Every registered customer account automatically receives a unique referral code. Simply sign in to grab your link.
        </p>
        <Link
          href="/account"
          className="inline-block px-6 py-3 bg-brand-600 text-white rounded-xl text-xs font-bold hover:bg-brand-700 transition-colors"
        >
          View My Affiliate Referral Link
        </Link>
      </div>
    </div>
  );
}
