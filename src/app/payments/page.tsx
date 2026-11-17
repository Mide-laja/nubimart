import React from 'react';
import Link from 'next/link';
import { CreditCard, ShieldCheck, Lock, Globe, ArrowRight } from 'lucide-react';

export default function PaymentsPage() {
  const gateways = [
    {
      name: 'Paystack (by Stripe)',
      region: 'Primary West & East Africa Gateway',
      currencies: 'NGN, GHS, KES, ZAR, USD',
      methods: 'Debit/Credit Cards, Bank Transfers, USSD, Apple Pay',
    },
    {
      name: 'Flutterwave',
      region: 'Pan-African & Cross-Border Mobile Money',
      currencies: 'Over 30 African currencies + USD, GBP, EUR',
      methods: 'M-Pesa, MTN Mobile Money, Airtel Money, Cards, Barter',
    },
    {
      name: 'Stripe',
      region: 'North America, United Kingdom & Europe',
      currencies: 'USD, EUR, GBP, CAD, AUD, JPY',
      methods: 'Visa, Mastercard, American Express, Apple Pay, Google Pay',
    },
    {
      name: 'Monnify & Bank Direct',
      region: 'Automated Real-Time Bank Settlement',
      currencies: 'NGN Direct Virtual Account Transfer',
      methods: 'Instant reserved virtual accounts, automated webhook verification',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-bold border border-brand-200">
          <CreditCard className="w-3.5 h-3.5" />
          <span>Payment Infrastructure</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Payment Partners & Escrow Architecture
        </h1>
        <p className="text-sm text-slate-500">
          Accepting localized payment methods in 38 countries with 256-bit encryption, 3D-Secure 2.0, and PCI-DSS Level 1 compliance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {gateways.map((g) => (
          <div key={g.name} className="bg-white rounded-3xl border border-slate-200/80 p-8 shadow-sm space-y-3">
            <span className="text-[10px] font-black uppercase tracking-wider text-brand-600 block">
              {g.region}
            </span>
            <h3 className="text-xl font-bold text-slate-900">{g.name}</h3>
            <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
              <p><strong>Supported Currencies:</strong> {g.currencies}</p>
              <p><strong>Payment Instruments:</strong> {g.methods}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-navy-950 text-white rounded-3xl p-8 sm:p-12 space-y-4">
        <div className="flex items-center gap-2 text-gold-400 text-xs font-bold">
          <ShieldCheck className="w-4 h-4" />
          <span>Security & Escrow Guarantee</span>
        </div>
        <h3 className="text-2xl font-black">Zero-Trust Buyer & Seller Protection</h3>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
          NUBIMART never stores raw card numbers or CVVs on our servers. All transactions are processed through tokenized vaulting with dual-factor authentication. Escrow funds are held in ring-fenced partner bank custody until courier delivery is validated.
        </p>
      </div>
    </div>
  );
}
