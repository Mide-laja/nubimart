import React from 'react';
import Link from 'next/link';
import { Globe, ShieldCheck, Heart, Users, Sparkles, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="space-y-16 pb-20">
      {/* Hero */}
      <section className="bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 text-white py-16 sm:py-24 text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/20 text-brand-400 text-xs font-bold border border-brand-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Our Purpose</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Bridging Continents Through <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-gold-400">
              Trusted Global Commerce
            </span>
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            NUBIMART was founded on a singular premise: exceptional products exist across every continent, yet cross-border friction has historically prevented verified creators and international buyers from connecting with total trust.
          </p>
        </div>
      </section>

      {/* Core Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-navy-900 rounded-3xl border border-slate-200/80 dark:border-navy-700/80 p-8 shadow-sm space-y-3 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 flex items-center justify-center font-bold">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">38-Country Footprint</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              We connect markets across West Africa, East Africa, Europe, North America, the Middle East, and Asia-Pacific through localized currencies and streamlined customs clearances.
            </p>
          </div>

          <div className="bg-white dark:bg-navy-900 rounded-3xl border border-slate-200/80 dark:border-navy-700/80 p-8 shadow-sm space-y-3 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-navy-50 dark:bg-navy-800 text-navy-800 dark:text-slate-200 flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">100% Escrow Guarantee</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Buyers shop with confidence knowing funds are held securely until delivery is carrier-verified and inspected. Sellers receive guaranteed settlements.
            </p>
          </div>

          <div className="bg-white dark:bg-navy-900 rounded-3xl border border-slate-200/80 dark:border-navy-700/80 p-8 shadow-sm space-y-3 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-gold-50 dark:bg-gold-950/60 text-gold-600 dark:text-gold-400 flex items-center justify-center font-bold">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Fair-Trade Creator Prosperity</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              We empower generational master weavers, botanical cultivators, and hardware innovators by providing direct access to premium international demand.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-navy-900 rounded-3xl p-8 sm:p-12 text-white text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl font-black">Join the NUBIMART Global Ecosystem</h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
            Whether you are discovering authentic world crafts or expanding your manufacturing enterprise internationally, we welcome you.
          </p>
          <div className="pt-2 flex justify-center gap-4">
            <Link
              href="/shop"
              className="px-6 py-3 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-bold transition-colors"
            >
              Shop Global Catalog
            </Link>
            <Link
              href="/become-seller"
              className="px-6 py-3 bg-navy-800 hover:bg-navy-700 border border-navy-700 text-white rounded-xl text-xs font-bold transition-colors"
            >
              Become a Merchant
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
