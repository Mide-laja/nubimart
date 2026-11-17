import React from 'react';
import { ShieldCheck, Lock } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
      <div className="space-y-3 pb-6 border-b border-slate-200 dark:border-[#262f17]">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 dark:bg-[#1f2614] text-brand-700 dark:text-brand-300 text-xs font-bold border border-brand-200 dark:border-[#2f391c]">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Data Governance & Privacy</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">Last updated: October 2026 &bull; Global Compliance (GDPR, NDPR, CCPA)</p>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed space-y-6">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">1. Information We Collect</h2>
          <p>
            NUBIMART collects information necessary to provide cross-border marketplace services: contact details (name, email, shipping address, telephone number), merchant KYC documentation (business registration certificates, tax identifiers, director identification), and transaction audit logs. We do not store raw credit card numbers or banking passwords.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">2. How Information is Used</h2>
          <p>
            Your information is utilized solely to:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Process and fulfill cross-border customer orders and split fulfillment dispatches.</li>
            <li>Coordinate customs clearance with partner international carriers (DHL, FedEx, UPS).</li>
            <li>Prevent fraud, manage escrow accounts, and disburse merchant settlements.</li>
            <li>Comply with international Anti-Money Laundering (AML) and Know Your Customer (KYC) regulations.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">3. Data Sharing & Third Parties</h2>
          <p>
            We share delivery coordinates exclusively with the specific merchant fulfilling your sub-order and our designated courier partners. We never sell or license personal data to third-party advertising brokers.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">4. Your Data Rights</h2>
          <p>
            You retain the right to access, export, rectify, or request the deletion of your personal account data at any time by contacting privacy@nubimart.com.
          </p>
        </section>
      </div>
    </div>
  );
}
