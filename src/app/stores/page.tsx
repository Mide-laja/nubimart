import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/lib/db/prisma';
import { SUPPORTED_COUNTRIES } from '@/lib/constants/countries';
import {
  Store,
  ShieldCheck,
  Star,
  MapPin,
  Search,
  Filter,
  ArrowRight,
  Package,
  Globe,
  SlidersHorizontal,
} from 'lucide-react';

export const revalidate = 0;

interface StoresPageProps {
  searchParams: {
    q?: string;
    country?: string;
    sort?: string;
  };
}

export default async function StoresPage({ searchParams }: StoresPageProps) {
  const query = searchParams.q || '';
  const countryCode = searchParams.country || '';
  const sortBy = searchParams.sort || 'rating';

  // Build where conditions
  const whereClause: any = { isActive: true };
  if (query) {
    whereClause.OR = [
      { name: { contains: query } },
      { description: { contains: query } },
    ];
  }
  if (countryCode) {
    whereClause.sellerProfile = {
      countryCode: countryCode,
    };
  }

  let orderBy: any = { rating: 'desc' };
  if (sortBy === 'newest') orderBy = { createdAt: 'desc' };
  if (sortBy === 'name') orderBy = { name: 'asc' };
  if (sortBy === 'products') orderBy = { products: { _count: 'desc' } };

  const stores = await prisma.store.findMany({
    where: whereClause,
    include: {
      sellerProfile: true,
      _count: { select: { products: true } },
    },
    orderBy,
  });

  return (
    <div className="bg-slate-50 dark:bg-[#0c0e0a] min-h-screen pt-8 sm:pt-10 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb & Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
            <Link href="/" className="hover:text-navy-950 dark:hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-navy-950 dark:text-white font-bold">Store Directory</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 dark:bg-[#1f2614] border border-brand-200 dark:border-[#2f391c] text-xs font-bold text-brand-800 dark:text-brand-300 mb-2">
                <Store className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
                <span>Verified Multi-Vendor Marketplace</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-navy-950 dark:text-white tracking-tight">
                Find International Stores
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
                Browse verified merchants, certified brand storefronts, and independent artisans across 38 countries with 100% escrow protection.
              </p>
            </div>

            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 bg-white dark:bg-[#151a10] px-4 py-2.5 rounded-2xl border border-slate-200 dark:border-[#262f17] shadow-2xs">
              Showing <span className="font-bold text-navy-950 dark:text-white">{stores.length}</span> verified stores
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white dark:bg-[#151a10] rounded-3xl p-4 sm:p-6 border border-slate-200/80 dark:border-[#262f17] shadow-sm space-y-4">
          <form method="GET" action="/stores" className="grid grid-cols-1 sm:grid-cols-12 gap-3">
            {/* Keyword Search */}
            <div className="sm:col-span-5 relative">
              <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type="text"
                name="q"
                defaultValue={query}
                placeholder="Search store name, craft, or specialty..."
                className="w-full bg-slate-50 dark:bg-[#1c2313] border border-slate-200 dark:border-[#2f391c] text-xs rounded-2xl pl-10 pr-4 py-3 text-navy-950 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:bg-white dark:focus:bg-[#182011] focus:outline-none focus:border-brand-600"
              />
            </div>

            {/* Country Selector Filter */}
            <div className="sm:col-span-4 relative">
              <select
                name="country"
                defaultValue={countryCode}
                className="w-full bg-slate-50 dark:bg-[#1c2313] border border-slate-200 dark:border-[#2f391c] text-xs rounded-2xl px-4 py-3 text-navy-950 dark:text-white focus:bg-white dark:focus:bg-[#182011] focus:outline-none focus:border-brand-600 cursor-pointer"
              >
                <option value="">All Countries (38 Total)</option>
                {SUPPORTED_COUNTRIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.flag} {c.name} ({c.code})
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="sm:col-span-3 flex gap-2">
              <select
                name="sort"
                defaultValue={sortBy}
                className="w-full bg-slate-50 dark:bg-[#1c2313] border border-slate-200 dark:border-[#2f391c] text-xs rounded-2xl px-4 py-3 text-navy-950 dark:text-white focus:bg-white dark:focus:bg-[#182011] focus:outline-none focus:border-brand-600 cursor-pointer"
              >
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest First</option>
                <option value="name">Alphabetical (A-Z)</option>
                <option value="products">Most Products</option>
              </select>

              <button
                type="submit"
                className="px-5 py-3 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs uppercase tracking-wider transition-colors shrink-0 shadow-sm"
              >
                Filter
              </button>
            </div>
          </form>
        </div>

        {/* Store Grid */}
        {stores.length === 0 ? (
          <div className="bg-white dark:bg-[#151a10] rounded-3xl border border-slate-200 dark:border-[#262f17] p-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-[#1c2313] flex items-center justify-center mx-auto text-slate-400">
              <Store className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-navy-950 dark:text-white">No stores found matching your selection</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
              Try adjusting your search terms or clearing the country filter to discover verified international merchants.
            </p>
            <Link
              href="/stores"
              className="inline-block px-6 py-2.5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs uppercase tracking-wider"
            >
              Reset Filters
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stores.map((store) => {
              const country = SUPPORTED_COUNTRIES.find((c) => c.code === store.sellerProfile?.countryCode);

              return (
                <div
                  key={store.id}
                  className="bg-white dark:bg-[#151a10] rounded-3xl border border-slate-200/80 dark:border-[#262f17] overflow-hidden shadow-sm hover:shadow-xl hover:border-slate-300 dark:hover:border-brand-500 transition-all flex flex-col justify-between group"
                >
                  {/* Banner image or gradient */}
                  <div className="h-28 relative bg-navy-900 overflow-hidden">
                    {store.bannerUrl ? (
                      <Image
                        src={store.bannerUrl}
                        alt={store.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-r from-navy-950 to-brand-950 opacity-90" />
                    )}
                    {country && (
                      <div className="absolute top-3 right-3 bg-white/95 dark:bg-[#151a10]/95 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-bold text-navy-950 dark:text-white flex items-center gap-1.5 shadow-md border border-slate-100 dark:border-[#262f17]">
                        <span>{country.flag}</span>
                        <span>{country.name}</span>
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-6 pt-0 relative flex-1 flex flex-col justify-between">
                    <div>
                      {/* Logo Avatar overlapping banner */}
                      <div className="-mt-10 mb-3 relative w-16 h-16 rounded-2xl overflow-hidden bg-white dark:bg-[#151a10] border-2 border-white dark:border-[#262f17] shadow-lg shrink-0">
                        {store.logoUrl ? (
                          <Image src={store.logoUrl} alt={store.name} fill className="object-cover" />
                        ) : (
                          <div className="w-full h-full bg-slate-100 dark:bg-[#1c2313] flex items-center justify-center font-black text-navy-950 dark:text-white text-lg">
                            {store.name.slice(0, 2).toUpperCase()}
                          </div>
                        )}
                      </div>

                      {/* Title & Trust Badge */}
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-base font-bold text-navy-950 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                          {store.name}
                        </h3>
                        <span title="Verified KYC Merchant">
                          <ShieldCheck className="w-4 h-4 text-brand-600 dark:text-brand-400 shrink-0" />
                        </span>
                      </div>

                      {/* Ratings */}
                      <div className="flex items-center gap-2 text-xs mt-1 text-slate-500 dark:text-slate-400">
                        <div className="flex items-center text-amber-500 font-bold">
                          <Star className="w-3.5 h-3.5 fill-current mr-0.5" />
                          <span>{store.rating.toFixed(1)}</span>
                        </div>
                        <span>&bull;</span>
                        <span>{store.reviewCount} Reviews</span>
                        <span>&bull;</span>
                        <span className="font-semibold text-slate-700 dark:text-slate-300">{store._count.products} Products</span>
                      </div>

                      {/* Description */}
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-3 line-clamp-3 leading-relaxed">
                        {store.description || 'Verified merchant providing catalog items with international delivery.'}
                      </p>
                    </div>

                    {/* Bottom CTA */}
                    <div className="mt-6 pt-4 border-t border-slate-100 dark:border-[#262f17] flex items-center justify-between">
                      <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">Escrow Protected</span>
                      <Link
                        href={`/shop?store=${store.slug}`}
                        className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-2xs"
                      >
                        <span>Visit Store</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
