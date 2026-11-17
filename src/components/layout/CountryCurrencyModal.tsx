'use client';

import React, { useState } from 'react';
import { X, Search, Globe, Check } from 'lucide-react';
import { SUPPORTED_COUNTRIES, CountryConfig } from '../../lib/constants/countries';
import { SUPPORTED_CURRENCIES } from '../../lib/constants/currencies';
import { useCurrency } from '../../context/CurrencyContext';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function CountryCurrencyModal({ isOpen, onClose }: Props) {
  const { currentCountry, currentCurrency, setCountry, setCurrency } = useCurrency();
  const [search, setSearch] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');

  if (!isOpen) return null;

  const regions = ['All', 'Africa', 'Europe', 'North America', 'Middle East & Asia-Pacific'];

  const filteredCountries = SUPPORTED_COUNTRIES.filter((country) => {
    const matchesSearch =
      country.name.toLowerCase().includes(search.toLowerCase()) ||
      country.code.toLowerCase().includes(search.toLowerCase()) ||
      country.currency.toLowerCase().includes(search.toLowerCase());
    const matchesRegion = selectedRegion === 'All' || country.region === selectedRegion;
    return matchesSearch && matchesRegion;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/60 dark:bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#12160d] rounded-2xl shadow-2xl border border-slate-200 dark:border-[#222818] w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden transition-colors">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-[#1e2514] bg-slate-50/50 dark:bg-[#0f130a]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-brand-50 dark:bg-[#1c2313] rounded-xl text-brand-600 dark:text-brand-400">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">Regional Settings & Currency</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Select your destination country and preferred transaction currency</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-[#1a2012] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search and Filters */}
        <div className="p-5 border-b border-slate-100 dark:border-[#1e2514] space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search by country, currency (e.g. Nigeria, NGN, United States, GBP)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 dark:bg-[#1a2012] border border-slate-200 dark:border-[#28321a] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 rounded-xl focus:bg-white dark:focus:bg-[#14190e] focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            {regions.map((region) => (
              <button
                key={region}
                onClick={() => setSelectedRegion(region)}
                className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
                  selectedRegion === region
                    ? 'bg-brand-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-[#181f11] text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-[#202816]'
                }`}
              >
                {region}
              </button>
            ))}
          </div>
        </div>

        {/* Country Grid */}
        <div className="p-5 overflow-y-auto flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {filteredCountries.map((country) => {
            const isSelected = currentCountry.code === country.code;
            return (
              <button
                key={country.code}
                onClick={() => {
                  setCountry(country.code);
                  onClose();
                }}
                className={`flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'border-brand-500 bg-brand-50/40 dark:bg-brand-900/30 shadow-sm'
                    : 'border-slate-200 dark:border-[#222818] hover:border-slate-300 dark:hover:border-[#384224] hover:bg-slate-50/60 dark:hover:bg-[#181f11]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{country.flag}</span>
                  <div>
                    <div className="text-sm font-semibold text-slate-900 dark:text-white">{country.name}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      Currency: <span className="font-medium text-slate-700 dark:text-slate-300">{country.currency}</span> ({country.currencySymbol}) &bull; VAT: {(country.taxRate * 100).toFixed(1)}%
                    </div>
                  </div>
                </div>
                {isSelected && <Check className="w-5 h-5 text-brand-600 dark:text-brand-400 shrink-0" />}
              </button>
            );
          })}
        </div>

        {/* Currency Override Selector */}
        <div className="px-6 py-3.5 bg-slate-50 dark:bg-[#0f130a] border-t border-slate-100 dark:border-[#1e2514] flex items-center justify-between text-xs">
          <span className="text-slate-600 dark:text-slate-400 font-medium">Want to force a specific billing currency?</span>
          <select
            value={currentCurrency.code}
            onChange={(e) => setCurrency(e.target.value)}
            className="bg-white dark:bg-[#1a2012] border border-slate-300 dark:border-[#28321a] rounded-lg px-2.5 py-1 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:border-brand-500"
          >
            {Object.values(SUPPORTED_CURRENCIES).map((c) => (
              <option key={c.code} value={c.code}>
                {c.code} - {c.name} ({c.symbol})
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
