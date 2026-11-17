import React from 'react';
import { ShieldCheck, Scale } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
      <div className="space-y-3 pb-6 border-b border-slate-200 dark:border-[#262f17]">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 dark:bg-[#1f2614] text-brand-700 dark:text-brand-300 text-xs font-bold border border-brand-200 dark:border-[#2f391c]">
          <Scale className="w-3.5 h-3.5" />
          <span>Legal Framework</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Terms and Conditions of Service
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">Effective: October 2026 &bull; Multi-Vendor Marketplace Agreement</p>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed space-y-6">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">1. Acceptance of Terms</h2>
          <p>
            By accessing or using the NUBIMART platform, services, or mobile applications, you agree to be legally bound by these Terms and Conditions. NUBIMART operates as an independent multi-vendor marketplace connecting verified sellers and buyers across 38 designated countries.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">2. Marketplace Role & Multi-Vendor Relationship</h2>
          <p>
            NUBIMART facilitates cross-border commerce by providing technological infrastructure, escrow services, and logistics coordination. The direct contract of sale for catalog items is between the customer and the independent merchant identified on the product card and sub-order confirmation.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">3. Escrow Settlement & Payment Rules</h2>
          <p>
            All customer payments are held in escrow. A seller has no entitlement to claim funds until carrier tracking status confirms successful delivery to the customer’s specified address. In the event of non-delivery or proven defect, NUBIMART arbitrates refunds in accordance with our 14-day policy.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">4. Seller Obligations & Prohibited Items</h2>
          <p>
            Merchants must supply authentic, legally acquired goods matching catalog photographs and specifications. Counterfeit items, hazardous materials, and unlicensed reproductions result in immediate account suspension, forfeiture of escrow funds, and notification of legal authorities.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">5. Limitation of Liability & Governing Law</h2>
          <p>
            These terms are governed by international commercial trade laws and the designated arbitration authority of our corporate jurisdiction.
          </p>
        </section>
      </div>
    </div>
  );
}
