'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  TrendingDown,
  Scale,
  ShieldCheck,
  Globe,
  ArrowRight,
  CheckCircle2,
  Package,
  Layers,
  Sparkles,
  Search,
} from 'lucide-react';
import { useCurrency } from '@/context/CurrencyContext';

const COMPARISON_ITEMS = [
  {
    name: 'Hand-Woven Royal Ashanti Kente Cloth',
    category: 'Fashion & Apparel',
    localRetail: 380,
    nubimartEscrow: 245,
    origin: 'Kumasi, Ghana 🇬🇭',
    seller: 'Afritex Global Heritage',
    savings: '35% Saved',
  },
  {
    name: 'Flagship ANC Wireless Headphones Pro',
    category: 'Electronics',
    localRetail: 349,
    nubimartEscrow: 229,
    origin: 'Shenzhen, China 🇨🇳',
    seller: 'TechNexus Devices Inc.',
    savings: '34% Saved',
  },
  {
    name: 'Organic Cold-Pressed Moroccan Argan Oil (500ml)',
    category: 'Beauty & Wellness',
    localRetail: 95,
    nubimartEscrow: 58,
    origin: 'Agadir, Morocco 🇲🇦',
    seller: 'Atlas Botanical Co-op',
    savings: '39% Saved',
  },
  {
    name: 'Single-Origin Mount Kenya Bourbon Arabica (1kg)',
    category: 'Gourmet & Foods',
    localRetail: 65,
    nubimartEscrow: 38,
    origin: 'Nyeri, Kenya 🇰🇪',
    seller: 'Highland Mountain Roasters',
    savings: '41% Saved',
  },
  {
    name: 'Handcrafted Tuareg Silver Geometric Pendant',
    category: 'Artisan Crafts',
    localRetail: 180,
    nubimartEscrow: 115,
    origin: 'Agadez, Niger 🇳🇪',
    seller: 'Sahara Silversmith Guild',
    savings: '36% Saved',
  },
];

export default function PriceComparisonPage() {
  const { formatPrice } = useCurrency();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = COMPARISON_ITEMS.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.origin.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-slate-50 dark:bg-[#0c0e0a] min-h-screen py-10 space-y-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
            <Link href="/" className="hover:text-navy-950 dark:hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-navy-950 dark:text-white font-bold">Price Comparison</span>
          </div>

          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 dark:bg-[#1f2614] border border-brand-200 dark:border-[#2f391c] text-xs font-bold text-brand-800 dark:text-brand-300">
              <TrendingDown className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
              <span>Evercompare Global Engine</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-navy-950 dark:text-white tracking-tight leading-tight">
              Compare Global Prices & Landed Costs
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed pt-1">
              Cut out intermediary markups. See how direct sourcing from verified origin merchants across 38 countries compares against domestic imported retail rates.
            </p>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white dark:bg-[#151a10] rounded-3xl p-4 sm:p-6 border border-slate-200/80 dark:border-[#262f17] shadow-sm flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:max-w-md">
            <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Filter by product name, category, or origin..."
              className="w-full bg-slate-50 dark:bg-[#1c2313] border border-slate-200 dark:border-[#2f391c] text-xs rounded-2xl pl-10 pr-4 py-3 text-navy-950 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:bg-white dark:focus:bg-[#182011] focus:outline-none focus:border-brand-600"
            />
          </div>

          <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
            Showing <span className="font-bold text-navy-950 dark:text-white">{filteredItems.length}</span> benchmark comparisons
          </div>
        </div>

        {/* Comparison Table Card */}
        <div className="bg-white dark:bg-[#151a10] rounded-3xl border border-slate-200/80 dark:border-[#262f17] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50/80 dark:bg-[#1c2313] border-b border-slate-200 dark:border-[#262f17] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
                  <th className="py-4 px-6">Product & Specification</th>
                  <th className="py-4 px-6">Verified Origin & Store</th>
                  <th className="py-4 px-6 text-right">Typical Retail Price</th>
                  <th className="py-4 px-6 text-right">Nubimart Direct Escrow</th>
                  <th className="py-4 px-6 text-center">Net Savings</th>
                  <th className="py-4 px-6 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-[#262f17]">
                {filteredItems.map((item, idx) => {
                  const netSavings = item.localRetail - item.nubimartEscrow;

                  return (
                    <tr key={idx} className="hover:bg-slate-50/70 dark:hover:bg-[#192111] transition-colors">
                      <td className="py-4 px-6">
                        <div className="font-bold text-navy-950 dark:text-white text-sm">{item.name}</div>
                        <span className="text-[10px] text-slate-400 dark:text-slate-400 font-medium">{item.category}</span>
                      </td>

                      <td className="py-4 px-6">
                        <div className="font-semibold text-slate-800 dark:text-slate-200">{item.seller}</div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{item.origin}</div>
                      </td>

                      <td className="py-4 px-6 text-right text-slate-400 dark:text-slate-500 line-through font-mono">
                        {formatPrice(item.localRetail)}
                      </td>

                      <td className="py-4 px-6 text-right font-black text-navy-950 dark:text-white text-base font-mono">
                        {formatPrice(item.nubimartEscrow)}
                      </td>

                      <td className="py-4 px-6 text-center">
                        <span className="inline-block px-2.5 py-1 rounded-full bg-brand-100 dark:bg-[#1f2614] text-brand-800 dark:text-brand-300 font-bold text-xs">
                          {item.savings} ({formatPrice(netSavings)})
                        </span>
                      </td>

                      <td className="py-4 px-6 text-center">
                        <Link
                          href="/shop"
                          className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs inline-flex items-center gap-1 transition-colors shadow-2xs"
                        >
                          <span>Shop</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Why Evercompare Transparency Guarantee */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-[#151a10] rounded-3xl p-6 border border-slate-200/80 dark:border-[#262f17] space-y-2">
            <Scale className="w-6 h-6 text-brand-600 dark:text-brand-400" />
            <h4 className="text-sm font-bold text-navy-950 dark:text-white">Direct Origin Wholesalers</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Cut out 3rd party distributors and local markups by shopping directly with verified origin workshops and tech creators.
            </p>
          </div>

          <div className="bg-white dark:bg-[#151a10] rounded-3xl p-6 border border-slate-200/80 dark:border-[#262f17] space-y-2">
            <ShieldCheck className="w-6 h-6 text-gold-500" />
            <h4 className="text-sm font-bold text-navy-950 dark:text-white">Guaranteed Escrow Protection</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Every international order includes escrow protection. Never risk paying for goods that don’t arrive as described.
            </p>
          </div>

          <div className="bg-white dark:bg-[#151a10] rounded-3xl p-6 border border-slate-200/80 dark:border-[#262f17] space-y-2">
            <Globe className="w-6 h-6 text-blue-500" />
            <h4 className="text-sm font-bold text-navy-950 dark:text-white">Transparent Landed Costs</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              No hidden checkout surcharges. Currency exchange and applicable carrier freight are calculated upfront in your preferred currency.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
