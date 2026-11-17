'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, ShieldCheck, Compass, Truck, ChevronDown } from 'lucide-react';
import { useCurrency } from '../../context/CurrencyContext';
import { CountryCurrencyModal } from './CountryCurrencyModal';

export function AnnouncementBar() {
  const { currentCountry, currentCurrency } = useCurrency();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="bg-brand-600 dark:bg-[#343a16] text-white text-[11px] sm:text-xs py-2 px-4 border-b border-brand-700/70 dark:border-[#272c10] shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
          {/* Left Announcement */}
          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center gap-1 font-bold text-gold-300 bg-brand-800/80 dark:bg-[#20250e] px-2.5 py-0.5 rounded-full border border-brand-500/50 dark:border-[#3d451a] shadow-2xs">
              <Sparkles className="w-3 h-3 text-gold-300" />
              Cross-Border Trade
            </span>
            <p className="text-brand-50 truncate font-medium">
              Connecting 38 Countries &bull; 100% Escrow Protection &bull; Free Global Delivery over $150
            </p>
          </div>

          {/* Right Utilities */}
          <div className="flex items-center gap-4 text-brand-100">
            <Link
              href="/track-your-order"
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <Compass className="w-3 h-3 text-gold-300" />
              <span>Track Order</span>
            </Link>
            <span className="text-brand-500/60 dark:text-brand-400/40">|</span>
            <Link href="/logistics" className="hover:text-white transition-colors flex items-center gap-1">
              <Truck className="w-3 h-3 text-brand-200" />
              <span>Logistics</span>
            </Link>
            <span className="text-brand-500/60 dark:text-brand-400/40">|</span>
            <Link href="/become-seller" className="hover:text-white transition-colors flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-gold-300" />
              <span>Sell on Nubimart</span>
            </Link>
            <span className="text-brand-500/60 dark:text-brand-400/40">|</span>

            {/* Interactive Country & Currency Selector */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-1.5 text-white hover:text-gold-300 font-semibold transition-colors cursor-pointer bg-brand-700/70 hover:bg-brand-700 dark:bg-[#252a11] dark:hover:bg-[#2e3415] px-2.5 py-1 rounded-lg border border-brand-500/40 dark:border-[#3d451a]"
              title="Click to change country or currency"
            >
              <span>{currentCountry.flag}</span>
              <span className="font-bold">{currentCountry.code}</span>
              <span className="text-gold-300 font-mono text-[11px]">({currentCurrency.code})</span>
              <ChevronDown className="w-3 h-3 text-brand-200" />
            </button>
          </div>
        </div>
      </div>

      <CountryCurrencyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
