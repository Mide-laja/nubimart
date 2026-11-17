'use client';

import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export default function FAQPage() {
  const faqs = [
    {
      q: 'How does NUBIMART escrow protection work?',
      a: 'When you place an order, your payment is held securely in ring-fenced escrow custody. The seller does not receive your payment immediately. Funds are only settled into the merchant’s wallet after carrier tracking confirms delivery and you have inspected the goods.',
    },
    {
      q: 'Can I purchase items from multiple sellers in one order?',
      a: 'Yes. NUBIMART features a multi-vendor split cart. You pay once at checkout in your local currency. Our backend atomically splits your order into separate fulfillment sub-orders for each merchant with independent DHL/FedEx tracking numbers.',
    },
    {
      q: 'Which countries does NUBIMART currently ship to?',
      a: 'We actively connect buyers and verified sellers across 38 countries spanning West Africa, East & Southern Africa, Europe, the United Kingdom, North America, the Middle East, and Asia-Pacific.',
    },
    {
      q: 'How are customs duties and import taxes calculated?',
      a: 'During checkout, our cross-border engine displays estimated import duties and local VAT based on your destination country. Most shipments are sent via express carriers who clear customs electronically.',
    },
    {
      q: 'What is the return and refund policy?',
      a: 'We provide a 14-day international return window. If an item arrives damaged, defective, or significantly not as described, you can open a dispute in your account dashboard. Escrow funds will be refunded once the claim is verified.',
    },
    {
      q: 'How do I become a verified seller on NUBIMART?',
      a: 'Visit the "Become a Seller" page and submit your registered business information, tax ID, government-issued director ID, and bank settlement details. Our compliance team audits all applications within 24 to 48 hours before activating storefront catalogs.',
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 text-xs font-bold border border-brand-200 dark:border-brand-800">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Help Center</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          Everything you need to know about shopping, multi-vendor fulfillment, escrow guarantees, and selling on NUBIMART.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="bg-white dark:bg-navy-900 rounded-2xl border border-slate-200/80 dark:border-navy-700/80 overflow-hidden shadow-sm transition-all"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-slate-900 dark:text-white hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
              >
                <span>{faq.q}</span>
                {isOpen ? (
                  <ChevronUp className="w-4 h-4 text-brand-600 dark:text-brand-400 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400 dark:text-slate-500 shrink-0" />
                )}
              </button>
              {isOpen && (
                <div className="px-5 pb-5 pt-0 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-navy-800 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
