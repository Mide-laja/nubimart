import React from 'react';
import Link from 'next/link';
import { TrendingUp, ShieldCheck, Globe, DollarSign, Mail } from 'lucide-react';

export default function InvestorsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 dark:bg-[#1f2614] text-brand-700 dark:text-brand-300 text-xs font-bold border border-brand-200 dark:border-[#2f391c]">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Capital & Growth</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Investor Relations
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Building the foundational digital trade infrastructure connecting emerging market creators with high-purchasing-power international consumers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div className="p-6 bg-white dark:bg-[#151a10] rounded-3xl border border-slate-200/80 dark:border-[#262f17] shadow-sm space-y-1">
          <div className="text-3xl font-black text-slate-900 dark:text-white">$3.8T</div>
          <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Cross-Border E-Commerce Market by 2030</div>
        </div>
        <div className="p-6 bg-white dark:bg-[#151a10] rounded-3xl border border-slate-200/80 dark:border-[#262f17] shadow-sm space-y-1">
          <div className="text-3xl font-black text-brand-600 dark:text-brand-400">38</div>
          <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Initial Connected Corridor Countries</div>
        </div>
        <div className="p-6 bg-white dark:bg-[#151a10] rounded-3xl border border-slate-200/80 dark:border-[#262f17] shadow-sm space-y-1">
          <div className="text-3xl font-black text-slate-900 dark:text-white">10-15%</div>
          <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Gross Marketplace Take-Rate Model</div>
        </div>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">Investment Thesis</h3>
        <p>
          Global e-commerce platforms have traditionally focused on domestic intra-country sales. NUBIMART captures high-margin cross-border transactions by integrating localized regulatory compliance, automated customs declarations, multi-currency escrow, and decentralized warehouse routing into a single modular stack.
        </p>
      </div>

      <div className="p-8 bg-slate-50 dark:bg-[#151a10] rounded-3xl border border-slate-200 dark:border-[#262f17] text-center space-y-3">
        <h4 className="text-base font-bold text-slate-900 dark:text-white">Institutional Inquiries & Investor Deck</h4>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
          Accredited institutional investors and strategic venture partners may contact our corporate development team.
        </p>
        <a
          href="mailto:ir@nubimart.com"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold transition-colors"
        >
          <Mail className="w-4 h-4" />
          <span>Contact ir@nubimart.com</span>
        </a>
      </div>
    </div>
  );
}
