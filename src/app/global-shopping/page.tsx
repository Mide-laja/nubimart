import React from 'react';
import Link from 'next/link';
import { SUPPORTED_COUNTRIES } from '@/lib/constants/countries';
import { Globe, ShieldCheck, Truck, ArrowRight } from 'lucide-react';

export default function GlobalShoppingPage() {
  const regions = ['Africa', 'Europe', 'North America', 'Middle East & Asia-Pacific'] as const;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-bold border border-brand-200">
          <Globe className="w-3.5 h-3.5" />
          <span>Cross-Border Logistics Network</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Shopping Across 38 Countries
        </h1>
        <p className="text-sm text-slate-500">
          Direct trade corridors connecting verified sellers with buyers worldwide with native currency conversion and express insured delivery.
        </p>
      </div>

      {/* Region Groups */}
      <div className="space-y-12">
        {regions.map((region) => {
          const countriesInRegion = SUPPORTED_COUNTRIES.filter((c) => c.region === region);
          return (
            <div key={region} className="space-y-4">
              <h2 className="text-lg font-bold text-slate-900 pb-2 border-b border-slate-200 flex items-center gap-2">
                <span>{region}</span>
                <span className="text-xs text-slate-400 font-normal">({countriesInRegion.length} Countries)</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {countriesInRegion.map((country) => (
                  <div
                    key={country.code}
                    className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{country.flag}</span>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">{country.name}</h4>
                        <div className="text-[11px] text-slate-500">
                          {country.currency} ({country.currencySymbol}) &bull; VAT: {(country.taxRate * 100).toFixed(1)}%
                        </div>
                      </div>
                    </div>

                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      Active
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-8 bg-navy-950 text-white rounded-3xl text-center space-y-4">
        <h3 className="text-xl sm:text-2xl font-black">Want to Sell to Customers in All 38 Countries?</h3>
        <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
          Join our verified merchant program to showcase your products to millions of international buyers with automatic currency conversion and customs clearance support.
        </p>
        <Link
          href="/become-seller"
          className="inline-block px-6 py-3 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-bold transition-colors"
        >
          Apply as Verified Merchant
        </Link>
      </div>
    </div>
  );
}
