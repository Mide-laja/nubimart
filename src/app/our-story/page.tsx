import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function OurStoryPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      <div className="text-center space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-600">The Journey</span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">Our Story</h1>
        <p className="text-sm text-slate-500 max-w-xl mx-auto">
          From a shared realization in Kumasi and Lagos to an international trade network spanning 38 nations.
        </p>
      </div>

      <div className="prose prose-slate max-w-none text-sm text-slate-700 leading-relaxed space-y-6">
        <p>
          The genesis of NUBIMART originated during a field visit to Ashanti master weavers in Kumasi, Ghana. We watched artisans spend six weeks handcrafting exquisite ceremonial silk Kente cloth of museum caliber. Yet, their ability to sell directly to international admirers in London, Toronto, or Tokyo was paralyzed by exorbitant cross-border shipping, payment chargeback fraud, and lack of trusted escrow mechanisms.
        </p>
        <p>
          Simultaneously, international consumers looking for authentic heritage apparel, rare cold-pressed botanicals, or artisanal Tuareg silverware were forced to gamble on unverified social media sellers with no delivery guarantees or return policies.
        </p>
        <div className="p-6 bg-slate-100 rounded-3xl border border-slate-200 font-medium text-slate-800 italic">
          &ldquo;NUBIMART was built to eliminate the geographical divide: creating a single marketplace where an artisan in Fez or Kumasi enjoys the same commercial credibility and express logistics infrastructure as a multinational brand.&rdquo;
        </div>
        <p>
          Today, NUBIMART unites buyers and verified sellers across 38 countries. With integrated multi-currency wallets, transparent customs duty estimations, automated vendor order splitting, and end-to-end courier milestone tracking, we are building the future of cross-border commerce.
        </p>
      </div>

      <div className="pt-6 border-t border-slate-200 flex justify-between items-center text-xs">
        <Link href="/about" className="font-bold text-slate-600 hover:text-slate-900">&larr; About Us</Link>
        <Link href="/why-nubimart" className="font-bold text-brand-600 hover:text-brand-700">Why NUBIMART &rarr;</Link>
      </div>
    </div>
  );
}
