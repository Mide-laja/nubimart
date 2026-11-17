'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Globe,
  ArrowRight,
  Store,
  Truck,
  ShieldCheck,
  Search,
  Sparkles,
  ChevronDown,
  ChevronUp,
  X,
  ExternalLink,
  ChevronRight,
  MapPin,
  Tag,
} from 'lucide-react';

export interface CountryItem {
  name: string;
  code: string;
  flag: string;
  flagImg?: string;
  count: string;
  desc: string;
  continent: 'Africa' | 'Asia' | 'Europe' | 'North America' | 'South America' | 'Middle East' | 'Oceania';
  topCategories: string;
  leadTime: string;
  currency: string;
  isFeatured?: boolean;
}

export const ALL_COUNTRIES: CountryItem[] = [
  // Africa
  {
    name: 'Nigeria',
    code: 'NG',
    flag: '🇳🇬',
    flagImg: '/images/nubimart/flag-nigeria.png',
    count: '14+ Stores',
    desc: 'Aso-Oke, Ankara Luxury, Artisan Leather & Agro Commodities',
    continent: 'Africa',
    topCategories: 'Textiles, Crafts, Agro, Fashion',
    leadTime: '24-48h',
    currency: 'NGN (₦)',
    isFeatured: true,
  },
  {
    name: 'Ghana',
    code: 'GH',
    flag: '🇬🇭',
    count: '9+ Stores',
    desc: 'Royal Ashanti Kente, Bolga Baskets, Organic Cocoa & Shea Butter',
    continent: 'Africa',
    topCategories: 'Handicrafts, Cocoa, Fashion',
    leadTime: '48-72h',
    currency: 'GHS (GH₵)',
  },
  {
    name: "Côte d'Ivoire",
    code: 'CI',
    flag: '🇨🇮',
    count: '7+ Stores',
    desc: 'Single-Origin Cocoa, Gourmet Coffee & Handwoven Baoulé Cloth',
    continent: 'Africa',
    topCategories: 'Cocoa, Coffee, Textiles',
    leadTime: '3-4 Days',
    currency: 'XOF (CFA)',
  },
  {
    name: 'Senegal',
    code: 'SN',
    flag: '🇸🇳',
    count: '6+ Stores',
    desc: 'Dakar Haute Couture, Thiéboudienne Spices & Handcarved Wood',
    continent: 'Africa',
    topCategories: 'Fashion, Handicrafts, Spices',
    leadTime: '3-5 Days',
    currency: 'XOF (CFA)',
  },
  {
    name: 'Kenya',
    code: 'KE',
    flag: '🇰🇪',
    flagImg: '/images/nubimart/flag-kenya.png',
    count: '10+ Stores',
    desc: 'High-Altitude Arabica Coffee, Maasai Beadwork & Single-Estate Tea',
    continent: 'Africa',
    topCategories: 'Coffee, Tea, Artifacts, Jewelry',
    leadTime: '2-4 Days',
    currency: 'KES (KSh)',
  },
  {
    name: 'South Africa',
    code: 'ZA',
    flag: '🇿🇦',
    flagImg: '/images/nubimart/flag-south-africa.png',
    count: '11+ Stores',
    desc: 'Rooibos Blends, Cape Fine Wines, Contemporary Art & Gold',
    continent: 'Africa',
    topCategories: 'Wine, Botanicals, Gold, Decor',
    leadTime: '3-5 Days',
    currency: 'ZAR (R)',
  },
  {
    name: 'Rwanda',
    code: 'RW',
    flag: '🇷🇼',
    count: '6+ Stores',
    desc: 'Volcanic Single-Origin Coffees & Agaseke Peace Baskets',
    continent: 'Africa',
    topCategories: 'Coffee, Handcrafts, Honey',
    leadTime: '3-5 Days',
    currency: 'RWF (FRw)',
  },
  {
    name: 'Uganda',
    code: 'UG',
    flag: '🇺🇬',
    count: '5+ Stores',
    desc: 'Bugisu Arabica, Organic Bourbon Vanilla & Barkcloth Heritage',
    continent: 'Africa',
    topCategories: 'Coffee, Vanilla, Crafts',
    leadTime: '3-5 Days',
    currency: 'UGX (USh)',
  },
  {
    name: 'Tanzania',
    code: 'TZ',
    flag: '🇹🇿',
    count: '6+ Stores',
    desc: 'Zanzibar Organic Spices, Tanzanite Gemstones & Premium Cashews',
    continent: 'Africa',
    topCategories: 'Spices, Gemstones, Agro',
    leadTime: '3-5 Days',
    currency: 'TZS (TSh)',
  },
  {
    name: 'Egypt',
    code: 'EG',
    flag: '🇪🇬',
    count: '8+ Stores',
    desc: 'Giza Long-Staple Cotton, Egyptian Perfumery & Alabaster Stonework',
    continent: 'Africa',
    topCategories: 'Linens, Spices, Ceramics, Cotton',
    leadTime: '3-4 Days',
    currency: 'EGP (E£)',
  },
  {
    name: 'Morocco',
    code: 'MA',
    flag: '🇲🇦',
    count: '9+ Stores',
    desc: 'Pure Cold-Pressed Argan, Handcrafted Leather Babouches & Berber Rugs',
    continent: 'Africa',
    topCategories: 'Argan Oil, Leather, Rugs',
    leadTime: '3-5 Days',
    currency: 'MAD (DH)',
  },

  // Asia
  {
    name: 'China',
    code: 'CN',
    flag: '🇨🇳',
    flagImg: '/images/nubimart/flag-china.png',
    count: '32+ Hubs',
    desc: 'Direct Factory Sourcing, Smart Consumer Electronics & OEM Hubs',
    continent: 'Asia',
    topCategories: 'Consumer Tech, Industrial, OEM',
    leadTime: '3-6 Days Air',
    currency: 'CNY (¥)',
    isFeatured: true,
  },
  {
    name: 'Japan',
    code: 'JP',
    flag: '🇯🇵',
    flagImg: '/images/nubimart/flag-japan.png',
    count: '18+ Stores',
    desc: 'Precision Horology, Audiophile Gear & Culinary Matcha Artifacts',
    continent: 'Asia',
    topCategories: 'High-End Audio, Watches, Ceramics',
    leadTime: '3-4 Days',
    currency: 'JPY (¥)',
    isFeatured: true,
  },
  {
    name: 'South Korea',
    code: 'KR',
    flag: '🇰🇷',
    flagImg: '/images/nubimart/flag-south-korea.png',
    count: '16+ Stores',
    desc: 'K-Beauty Innovations, Advanced Skincare & Smart Consumer Gadgets',
    continent: 'Asia',
    topCategories: 'Beauty, Skincare, Tech',
    leadTime: '3-5 Days',
    currency: 'KRW (₩)',
  },
  {
    name: 'India',
    code: 'IN',
    flag: '🇮🇳',
    flagImg: '/images/nubimart/flag-india.png',
    count: '22+ Stores',
    desc: 'Handloom Silks, Malabar Spices, Ayurvedic Botanicals & Gem Jewelry',
    continent: 'Asia',
    topCategories: 'Textiles, Spices, Ayurveda',
    leadTime: '3-5 Days',
    currency: 'INR (₹)',
  },
  {
    name: 'Singapore',
    code: 'SG',
    flag: '🇸🇬',
    flagImg: '/images/nubimart/flag-singapore.png',
    count: '12+ Stores',
    desc: 'Fintech Hardware, Luxury Horology & Global Cargo Transit Hub',
    continent: 'Asia',
    topCategories: 'Electronics, Luxury, Logistics',
    leadTime: '2-3 Days',
    currency: 'SGD (S$)',
  },
  {
    name: 'Malaysia',
    code: 'MY',
    flag: '🇲🇾',
    count: '8+ Stores',
    desc: 'Royal Pewter Artistry, Certified Halal Organics & Electronics',
    continent: 'Asia',
    topCategories: 'Halal Goods, Tech, Crafts',
    leadTime: '3-5 Days',
    currency: 'MYR (RM)',
  },
  {
    name: 'Vietnam',
    code: 'VN',
    flag: '🇻🇳',
    count: '10+ Stores',
    desc: 'Highlands Robusta Coffee, Sustainable Bamboo & Precision Footwear',
    continent: 'Asia',
    topCategories: 'Furniture, Footwear, Coffee',
    leadTime: '4-6 Days',
    currency: 'VND (₫)',
  },

  // Europe
  {
    name: 'United Kingdom',
    code: 'GB',
    flag: '🇬🇧',
    flagImg: '/images/nubimart/flag-uk.png',
    count: '19+ Stores',
    desc: 'Savile Row Tailoring, British Horology & Fine Luxury Heritage',
    continent: 'Europe',
    topCategories: 'Apparel, Perfumes, Horology',
    leadTime: '2-3 Days',
    currency: 'GBP (£)',
    isFeatured: true,
  },
  {
    name: 'Germany',
    code: 'DE',
    flag: '🇩🇪',
    flagImg: '/images/nubimart/flag-germany.png',
    count: '15+ Stores',
    desc: 'Precision Hand Tools, Audiophile Engineering & Industrial Equipment',
    continent: 'Europe',
    topCategories: 'Tools, Automotive, Audio',
    leadTime: '2-4 Days',
    currency: 'EUR (€)',
  },
  {
    name: 'France',
    code: 'FR',
    flag: '🇫🇷',
    flagImg: '/images/nubimart/flag-france.png',
    count: '14+ Stores',
    desc: 'Haute Parfumerie, Parisian Designer Fashion & Organic Cosmetics',
    continent: 'Europe',
    topCategories: 'Perfumes, Fashion, Skincare',
    leadTime: '2-4 Days',
    currency: 'EUR (€)',
  },
  {
    name: 'Netherlands',
    code: 'NL',
    flag: '🇳🇱',
    count: '11+ Stores',
    desc: 'Euro Logistics Gateway, Modern Dutch Minimalist Homeware & Lighting',
    continent: 'Europe',
    topCategories: 'Design, Logistics, Decor',
    leadTime: '2-3 Days',
    currency: 'EUR (€)',
  },
  {
    name: 'Italy',
    code: 'IT',
    flag: '🇮🇹',
    count: '13+ Stores',
    desc: 'Tuscan Full-Grain Leather, Luxury Footwear & Espresso Machines',
    continent: 'Europe',
    topCategories: 'Leather, Shoes, Coffee Gear',
    leadTime: '2-4 Days',
    currency: 'EUR (€)',
  },
  {
    name: 'Spain',
    code: 'ES',
    flag: '🇪🇸',
    count: '9+ Stores',
    desc: 'Extra Virgin Olive Oils, Andalusian Ceramics & Handcrafted Footwear',
    continent: 'Europe',
    topCategories: 'Gourmet Food, Ceramics, Footwear',
    leadTime: '3-5 Days',
    currency: 'EUR (€)',
  },
  {
    name: 'Ireland',
    code: 'IE',
    flag: '🇮🇪',
    count: '6+ Stores',
    desc: 'Traditional Aran Knitwear, Crystal Glassware & Botanical Skincare',
    continent: 'Europe',
    topCategories: 'Knitwear, Glassware, Spirits',
    leadTime: '2-4 Days',
    currency: 'EUR (€)',
  },
  {
    name: 'Poland',
    code: 'PL',
    flag: '🇵🇱',
    count: '7+ Stores',
    desc: 'Baltic Amber Jewelry, Bolesławiec Stoneware & Precision Devices',
    continent: 'Europe',
    topCategories: 'Amber Jewelry, Stoneware, Tech',
    leadTime: '3-4 Days',
    currency: 'PLN (zł)',
  },
  {
    name: 'Sweden',
    code: 'SE',
    flag: '🇸🇪',
    count: '8+ Stores',
    desc: 'Scandinavian Functional Design, Art Glass & Minimalist Audio',
    continent: 'Europe',
    topCategories: 'Nordic Design, Glassware, Audio',
    leadTime: '2-4 Days',
    currency: 'SEK (kr)',
  },
  {
    name: 'Switzerland',
    code: 'CH',
    flag: '🇨🇭',
    count: '10+ Stores',
    desc: 'Swiss Horological Craft, Precision Micro-Mechanics & Chocolates',
    continent: 'Europe',
    topCategories: 'Watches, Instruments, Gourmet',
    leadTime: '2-3 Days',
    currency: 'CHF (CHF)',
  },
  {
    name: 'Belgium',
    code: 'BE',
    flag: '🇧🇪',
    count: '7+ Stores',
    desc: 'Master Chocolatiers, Certified Diamond Jewelry & Fine Tapestries',
    continent: 'Europe',
    topCategories: 'Chocolates, Diamonds, Decor',
    leadTime: '2-4 Days',
    currency: 'EUR (€)',
  },
  {
    name: 'Austria',
    code: 'AT',
    flag: '🇦🇹',
    count: '6+ Stores',
    desc: 'Viennese Precision Crystals, Confectionery & Optical Equipment',
    continent: 'Europe',
    topCategories: 'Crystals, Confections, Optics',
    leadTime: '2-4 Days',
    currency: 'EUR (€)',
  },
  {
    name: 'Portugal',
    code: 'PT',
    flag: '🇵🇹',
    count: '8+ Stores',
    desc: 'Sustainable Cork Eco-Fashion, Hand-Painted Azulejos & Extra Virgin Oils',
    continent: 'Europe',
    topCategories: 'Cork Goods, Ceramics, Oils',
    leadTime: '3-5 Days',
    currency: 'EUR (€)',
  },

  // North America
  {
    name: 'United States',
    code: 'US',
    flag: '🇺🇸',
    flagImg: '/images/nubimart/flag-usa.png',
    count: '28+ Stores',
    desc: 'Original Brand Electronics, Apparel, Computing Tech & Supplements',
    continent: 'North America',
    topCategories: 'Electronics, Supplements, Fashion',
    leadTime: '2-4 Days',
    currency: 'USD ($)',
    isFeatured: true,
  },
  {
    name: 'Canada',
    code: 'CA',
    flag: '🇨🇦',
    count: '12+ Stores',
    desc: 'Extreme Outdoor Apparel, Pure Grade-A Maple Syrup & Natural Health',
    continent: 'North America',
    topCategories: 'Winter Wear, Organics, Health',
    leadTime: '3-5 Days',
    currency: 'CAD (C$)',
  },

  // South America
  {
    name: 'Brazil',
    code: 'BR',
    flag: '🇧🇷',
    count: '11+ Stores',
    desc: 'Single-Origin Santos Arabica, Amazon Botanicals & Imperial Topaz',
    continent: 'South America',
    topCategories: 'Coffee, Botanicals, Gemstones',
    leadTime: '3-5 Days',
    currency: 'BRL (R$)',
  },

  // Middle East
  {
    name: 'United Arab Emirates',
    code: 'AE',
    flag: '🇦🇪',
    flagImg: '/images/nubimart/flag-uae.png',
    count: '17+ Stores',
    desc: 'Dubai Certified Gold, Premium Ambergris/Oud & Consumer Tech',
    continent: 'Middle East',
    topCategories: 'Gold, Oud, Consumer Tech',
    leadTime: '2-3 Days',
    currency: 'AED (د.إ)',
    isFeatured: true,
  },
  {
    name: 'Saudi Arabia',
    code: 'SA',
    flag: '🇸🇦',
    count: '11+ Stores',
    desc: 'Madinah Ajwa Dates, Royal Bakhoor Incense & Luxury Abayas',
    continent: 'Middle East',
    topCategories: 'Gourmet Dates, Fragrance, Fashion',
    leadTime: '2-4 Days',
    currency: 'SAR (﷼)',
  },
  {
    name: 'Qatar',
    code: 'QA',
    flag: '🇶🇦',
    count: '7+ Stores',
    desc: 'Natural Gulf Pearl Jewelry, Traditional Attar & Luxury Homeware',
    continent: 'Middle East',
    topCategories: 'Jewelry, Fragrances, Homeware',
    leadTime: '3-4 Days',
    currency: 'QAR (﷼)',
  },
  {
    name: 'Turkey',
    code: 'TR',
    flag: '🇹🇷',
    count: '14+ Stores',
    desc: 'Istanbul Grand Bazaar Textiles, Turkish Delights & Handwoven Kilims',
    continent: 'Middle East',
    topCategories: 'Textiles, Rugs, Ceramics',
    leadTime: '2-4 Days',
    currency: 'TRY (₺)',
  },

  // Oceania
  {
    name: 'Australia',
    code: 'AU',
    flag: '🇦🇺',
    count: '10+ Stores',
    desc: 'Certified Manuka Honey, Ultra-Fine Merino Wool & Coastal Botanicals',
    continent: 'Oceania',
    topCategories: 'Honey, Wool, Botanicals',
    leadTime: '3-5 Days',
    currency: 'AUD (A$)',
  },
  {
    name: 'New Zealand',
    code: 'NZ',
    flag: '🇳🇿',
    count: '8+ Stores',
    desc: 'High-Grade UMF Manuka, Alpine Dairy Delicacies & Thermal Outdoor Wear',
    continent: 'Oceania',
    topCategories: 'Manuka Honey, Health, Wool',
    leadTime: '3-6 Days',
    currency: 'NZD ($)',
  },
];

export const REGIONS = [
  'All Countries',
  'Africa',
  'Asia',
  'Europe',
  'North America',
  'South America',
  'Middle East',
  'Oceania',
] as const;

type RegionFilter = typeof REGIONS[number];

/**
 * 1. Compact Country Tile Component
 */
function CompactCountryTile({
  country,
  onSelect,
}: {
  country: CountryItem;
  onSelect: (c: CountryItem) => void;
}) {
  return (
    <div
      onClick={() => onSelect(country)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(country);
        }
      }}
      className="group relative flex items-center justify-between p-3 sm:p-3.5 rounded-2xl bg-white dark:bg-[#151a10] border border-slate-200/90 dark:border-[#262f17] hover:border-brand-500 dark:hover:border-brand-500 hover:shadow-md transition-all duration-200 cursor-pointer select-none"
    >
      <div className="flex items-center gap-3 min-w-0">
        {/* Small Country Flag */}
        {country.flagImg ? (
          <div className="relative w-8 h-6 sm:w-9 sm:h-6 rounded-lg overflow-hidden border border-slate-200 dark:border-[#262f17] shadow-2xs shrink-0 bg-slate-50 dark:bg-[#1c2313]">
            <Image
              src={country.flagImg}
              alt={country.name}
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <span className="text-xl sm:text-2xl leading-none shrink-0" aria-hidden="true">
            {country.flag}
          </span>
        )}

        {/* Primary Information */}
        <div className="min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <h4 className="text-xs sm:text-sm font-bold text-navy-950 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors truncate">
              {country.name}
            </h4>
            <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded-md bg-slate-100 dark:bg-[#1f2614] text-slate-600 dark:text-slate-300 shrink-0">
              {country.count}
            </span>
          </div>
          <div className="flex items-center gap-2 text-[10px] text-slate-400 dark:text-slate-400 font-mono mt-0.5">
            <span>{country.currency}</span>
            <span className="text-slate-300 dark:text-slate-600">•</span>
            <span className="truncate max-w-[110px] sm:max-w-[140px] text-slate-500 dark:text-slate-400 font-sans">
              {country.topCategories.split(',')[0]}
            </span>
          </div>
        </div>
      </div>

      {/* Subtle Navigation Arrow */}
      <div className="w-6 h-6 rounded-lg bg-slate-50 dark:bg-[#1f2614] group-hover:bg-brand-600 group-hover:text-white text-slate-400 dark:text-slate-300 flex items-center justify-center transition-colors shrink-0 ml-2">
        <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
      </div>
    </div>
  );
}

/**
 * 2. Featured Country Card Component
 */
function FeaturedCountryCard({
  country,
  onSelect,
}: {
  country: CountryItem;
  onSelect: (c: CountryItem) => void;
}) {
  return (
    <div
      onClick={() => onSelect(country)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(country);
        }
      }}
      className="group relative p-3.5 rounded-2xl bg-white dark:bg-[#151a10] border border-slate-200/90 dark:border-[#262f17] hover:border-gold-400 dark:hover:border-gold-400 hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between"
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        {country.flagImg ? (
          <div className="relative w-8 h-6 rounded-lg overflow-hidden border border-slate-200 dark:border-[#262f17] shadow-2xs shrink-0 bg-slate-50 dark:bg-[#1c2313]">
            <Image
              src={country.flagImg}
              alt={country.name}
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <span className="text-2xl leading-none shrink-0">{country.flag}</span>
        )}

        <span className="text-[9px] font-bold font-mono px-1.5 py-0.5 rounded-md bg-gold-400/15 text-navy-950 dark:text-gold-300 border border-gold-400/30 shrink-0">
          FEATURED
        </span>
      </div>

      <div>
        <h4 className="text-xs sm:text-sm font-extrabold text-navy-950 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors truncate">
          {country.name}
        </h4>
        <div className="flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400 mt-1">
          <span className="font-semibold text-navy-950 dark:text-white">{country.count}</span>
          <span className="font-mono text-slate-400 dark:text-slate-400">{country.currency}</span>
        </div>
      </div>

      <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-[#262f17] flex items-center justify-between text-[10px]">
        <span className="text-slate-400 dark:text-slate-400 flex items-center gap-1 font-medium">
          <Truck className="w-3 h-3 text-brand-600 dark:text-brand-400" />
          <span>{country.leadTime}</span>
        </span>
        <span className="text-brand-700 dark:text-brand-400 font-bold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
          <span>Explore</span>
          <ArrowRight className="w-2.5 h-2.5" />
        </span>
      </div>
    </div>
  );
}

/**
 * Main Country Discovery Component
 */
export function ShopByCountry3D() {
  const [selectedRegion, setSelectedRegion] = useState<RegionFilter>('All Countries');
  const [searchQuery, setSearchQuery] = useState('');
  const [previewCountry, setPreviewCountry] = useState<CountryItem | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const INITIAL_VISIBLE_COUNT = 16;

  // Filter countries based on region and search query
  const filteredCountries = ALL_COUNTRIES.filter((country) => {
    const matchesRegion =
      selectedRegion === 'All Countries' || country.continent === selectedRegion;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      q === '' ||
      country.name.toLowerCase().includes(q) ||
      country.code.toLowerCase().includes(q) ||
      country.desc.toLowerCase().includes(q) ||
      country.topCategories.toLowerCase().includes(q) ||
      country.currency.toLowerCase().includes(q);

    return matchesRegion && matchesSearch;
  });

  const featuredCountries = ALL_COUNTRIES.filter((c) => c.isFeatured);

  // Pagination / Show More Logic
  const isFiltering = selectedRegion !== 'All Countries' || searchQuery.trim().length > 0;
  const visibleCountries = isFiltering || isExpanded
    ? filteredCountries
    : filteredCountries.slice(0, INITIAL_VISIBLE_COUNT);

  // Close preview on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPreviewCountry(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="space-y-8">
      {/* 1. Country Discovery Header (Clean Section Heading) */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-200/80 dark:border-[#262f17]">
        <div>
          <div className="text-[11px] font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5" />
            <span>Cross-Border Trade Directory</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-navy-950 dark:text-white tracking-tight uppercase">
            SHOP BY COUNTRY
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Discover international stores, explore products and shop across global markets.
          </p>
        </div>

        <Link
          href="/stores"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-navy-950 dark:text-slate-200 hover:text-brand-600 dark:hover:text-brand-400 transition-colors self-start md:self-auto py-1"
        >
          <span>Explore All 38 Countries</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      {/* 2. Controls Bar: Compact Search & Region Filter Pills */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Region Filters (Horizontal Scrolling on Mobile) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full no-scrollbar">
            {REGIONS.map((region) => {
              const isSelected = selectedRegion === region;
              const count =
                region === 'All Countries'
                  ? ALL_COUNTRIES.length
                  : ALL_COUNTRIES.filter((c) => c.continent === region).length;

              return (
                <button
                  key={region}
                  onClick={() => setSelectedRegion(region)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 shrink-0 ${
                    isSelected
                      ? 'bg-brand-600 text-white shadow-xs'
                      : 'bg-white dark:bg-[#151a10] hover:bg-slate-100 dark:hover:bg-[#1f2614] text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-[#262f17] hover:text-navy-950 dark:hover:text-white'
                  }`}
                >
                  <span>{region}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                      isSelected ? 'bg-gold-400 text-navy-950 font-bold' : 'bg-slate-100 dark:bg-[#1f2614] text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Compact Country Search Input */}
          <div className="relative w-full sm:w-64 shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
            <input
              type="text"
              placeholder="Search country, currency..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-7 py-1.5 rounded-xl border border-slate-200 dark:border-[#262f17] bg-white dark:bg-[#151a10] text-xs text-navy-950 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-600/20 focus:border-brand-600 transition-all shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 3. Featured Countries (Compact Section) */}
      {!searchQuery && selectedRegion === 'All Countries' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5 font-mono">
              <Sparkles className="w-3 h-3 text-gold-500" />
              <span>Key International Trade Hubs</span>
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {featuredCountries.map((country) => (
              <FeaturedCountryCard
                key={country.code}
                country={country}
                onSelect={(c) => setPreviewCountry(c)}
              />
            ))}
          </div>
        </div>
      )}

      {/* 4. Explore All Countries Directory (Compact Tiles Grid) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider font-mono">
            {isFiltering ? (
              <span>
                Matching Results ({filteredCountries.length} countries)
              </span>
            ) : (
              <span>
                Explore All Countries ({ALL_COUNTRIES.length} destinations)
              </span>
            )}
          </span>

          <span className="text-xs text-slate-400 dark:text-slate-400 font-medium">
            Showing {visibleCountries.length} of {filteredCountries.length}
          </span>
        </div>

        {/* Responsive Grid: 1 col on mobile, 2 on sm, 3 on md, 4 on lg */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3">
          {visibleCountries.map((country) => (
            <CompactCountryTile
              key={country.code}
              country={country}
              onSelect={(c) => setPreviewCountry(c)}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredCountries.length === 0 && (
          <div className="p-10 text-center bg-white dark:bg-[#151a10] rounded-3xl border border-slate-200 dark:border-[#262f17]">
            <Globe className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
            <h4 className="text-sm font-bold text-navy-950 dark:text-white">No countries found for "{searchQuery}"</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Try another country name or select "All Countries".</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedRegion('All Countries');
              }}
              className="mt-3 px-4 py-1.5 rounded-xl bg-navy-950 dark:bg-brand-600 text-white text-xs font-bold hover:bg-navy-900 dark:hover:bg-brand-500 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Show More / Show Less Toggle Button (When not filtering) */}
        {!isFiltering && filteredCountries.length > INITIAL_VISIBLE_COUNT && (
          <div className="pt-2 text-center">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-white dark:bg-[#151a10] border border-slate-200 dark:border-[#262f17] hover:border-navy-950/80 dark:hover:border-brand-500 text-navy-950 dark:text-white text-xs font-bold transition-all shadow-2xs hover:shadow-xs group"
            >
              {isExpanded ? (
                <>
                  <span>Show Less Countries</span>
                  <ChevronUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
                </>
              ) : (
                <>
                  <span>
                    Show All {ALL_COUNTRIES.length} Countries ({ALL_COUNTRIES.length - INITIAL_VISIBLE_COUNT} more)
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* 5. Compact Expandable Country-Details Flyout Modal */}
      {previewCountry && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/60 dark:bg-black/75 backdrop-blur-xs animate-in fade-in duration-150"
          onClick={() => setPreviewCountry(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative w-full max-w-md bg-white dark:bg-[#151a10] rounded-3xl border border-slate-200 dark:border-[#262f17] shadow-2xl p-5 space-y-4 animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between pb-3 border-b border-slate-100 dark:border-[#262f17]">
              <div className="flex items-center gap-3">
                {previewCountry.flagImg ? (
                  <div className="relative w-11 h-8 rounded-xl overflow-hidden border border-slate-200 dark:border-[#262f17] shadow-2xs shrink-0 bg-slate-50 dark:bg-[#1c2313]">
                    <Image
                      src={previewCountry.flagImg}
                      alt={previewCountry.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <span className="text-3xl leading-none">{previewCountry.flag}</span>
                )}
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-base font-extrabold text-navy-950 dark:text-white">{previewCountry.name}</h3>
                    <span className="px-1.5 py-0.2 rounded-md bg-slate-100 dark:bg-[#1f2614] text-slate-600 dark:text-slate-300 text-[10px] font-mono font-bold">
                      {previewCountry.code}
                    </span>
                  </div>
                  <p className="text-[11px] text-brand-600 dark:text-brand-400 font-semibold">
                    {previewCountry.continent} • {previewCountry.count}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setPreviewCountry(null)}
                className="w-7 h-7 rounded-xl bg-slate-100 dark:bg-[#1f2614] hover:bg-slate-200 dark:hover:bg-[#2b351c] text-slate-500 dark:text-slate-300 hover:text-navy-950 dark:hover:text-white flex items-center justify-center font-bold text-xs transition-colors"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 bg-slate-50 dark:bg-[#1c2313] rounded-xl border border-slate-100 dark:border-[#262f17]">
                <span className="text-[10px] text-slate-400 dark:text-slate-400 uppercase font-mono font-bold block">
                  Transit Lead Time
                </span>
                <span className="text-xs font-bold text-navy-950 dark:text-white flex items-center gap-1 mt-0.5">
                  <Truck className="w-3 h-3 text-brand-600 dark:text-brand-400" />
                  <span>{previewCountry.leadTime} Air Cargo</span>
                </span>
              </div>

              <div className="p-2.5 bg-slate-50 dark:bg-[#1c2313] rounded-xl border border-slate-100 dark:border-[#262f17]">
                <span className="text-[10px] text-slate-400 dark:text-slate-400 uppercase font-mono font-bold block">
                  Settlement Currency
                </span>
                <span className="text-xs font-bold text-navy-950 dark:text-white font-mono mt-0.5 block">
                  {previewCountry.currency}
                </span>
              </div>
            </div>

            {/* Regional Description & Specialties */}
            <div className="space-y-2 text-xs">
              <div>
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-400 uppercase font-mono block">
                  Export Specialties
                </span>
                <p className="text-slate-700 dark:text-slate-300 mt-0.5 leading-relaxed text-xs">
                  {previewCountry.desc}
                </p>
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-400 uppercase font-mono block mb-1">
                  Top Categories
                </span>
                <div className="flex flex-wrap gap-1">
                  {previewCountry.topCategories.split(',').map((cat) => (
                    <span
                      key={cat}
                      className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-[#1f2614] text-slate-600 dark:text-slate-300 text-[10px] font-medium"
                    >
                      {cat.trim()}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Escrow Guarantee Pill */}
            <div className="p-2.5 bg-brand-50/70 dark:bg-[#182813] rounded-xl border border-brand-200/60 dark:border-[#28481f] flex items-center gap-2.5 text-[11px] text-brand-900 dark:text-emerald-300">
              <ShieldCheck className="w-4 h-4 text-brand-700 dark:text-emerald-400 shrink-0" />
              <span>
                <strong>Escrow Secured:</strong> Payments released only after customs clearance and delivery.
              </span>
            </div>

            {/* Actions */}
            <div className="pt-2 flex items-center gap-2.5">
              <Link
                href={`/stores?country=${previewCountry.code}`}
                onClick={() => setPreviewCountry(null)}
                className="w-1/2 py-2.5 rounded-xl border border-slate-200 dark:border-[#262f17] text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-50 dark:hover:bg-[#1c2313] text-center transition-colors flex items-center justify-center gap-1"
              >
                <Store className="w-3.5 h-3.5 text-slate-400" />
                <span>View Stores</span>
              </Link>

              <Link
                href={`/shop?country=${previewCountry.code}`}
                onClick={() => setPreviewCountry(null)}
                className="w-1/2 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs text-center shadow-md transition-all flex items-center justify-center gap-1 group"
              >
                <span>Shop Catalog</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Alias export for backward compatibility
export const ShopByCountryDirectory = ShopByCountry3D;
