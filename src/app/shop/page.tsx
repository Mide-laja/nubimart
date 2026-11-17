import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/db/prisma';
import { ProductCard } from '@/components/product/ProductCard';
import { SUPPORTED_COUNTRIES } from '@/lib/constants/countries';
import { Search, SlidersHorizontal, ArrowUpDown, X, Tag, Globe, Check } from 'lucide-react';

export const revalidate = 0; // Dynamic on every request

interface ShopPageProps {
  searchParams: {
    q?: string;
    category?: string;
    country?: string;
    minPrice?: string;
    maxPrice?: string;
    sort?: string;
    store?: string;
  };
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const query = searchParams.q || '';
  const categorySlug = searchParams.category || '';
  const countryCode = searchParams.country || '';
  const storeSlug = searchParams.store || '';
  const minPrice = searchParams.minPrice ? parseFloat(searchParams.minPrice) : undefined;
  const maxPrice = searchParams.maxPrice ? parseFloat(searchParams.maxPrice) : undefined;
  const sort = searchParams.sort || 'newest';

  // Build where clause
  const where: any = {
    status: 'APPROVED',
  };

  if (query) {
    where.OR = [
      { name: { contains: query } },
      { description: { contains: query } },
      { brand: { contains: query } },
    ];
  }

  if (categorySlug) {
    where.category = { slug: categorySlug };
  }

  if (countryCode && storeSlug) {
    where.store = {
      slug: storeSlug,
      sellerProfile: { countryCode: countryCode },
    };
  } else if (countryCode) {
    where.store = {
      sellerProfile: { countryCode: countryCode },
    };
  } else if (storeSlug) {
    where.store = { slug: storeSlug };
  }

  if (minPrice !== undefined || maxPrice !== undefined) {
    where.basePrice = {};
    if (minPrice !== undefined) where.basePrice.gte = minPrice;
    if (maxPrice !== undefined) where.basePrice.lte = maxPrice;
  }

  // Sorting
  let orderBy: any = { createdAt: 'desc' };
  if (sort === 'price_asc') orderBy = { basePrice: 'asc' };
  if (sort === 'price_desc') orderBy = { basePrice: 'desc' };
  if (sort === 'rating') orderBy = { rating: 'desc' };

  const [products, categories, stores] = await Promise.all([
    prisma.product.findMany({
      where,
      orderBy,
      include: {
        images: { where: { isPrimary: true }, take: 1 },
        store: { select: { id: true, name: true, slug: true } },
        category: { select: { name: true, slug: true } },
      },
    }),
    prisma.category.findMany({
      include: { _count: { select: { products: true } } },
    }),
    prisma.store.findMany({
      where: { isActive: true },
      select: { id: true, name: true, slug: true },
    }),
  ]);

  const activeCategory = categories.find((c) => c.slug === categorySlug);
  const activeCountry = SUPPORTED_COUNTRIES.find((c) => c.code === countryCode);

  return (
    <div className="bg-slate-50 dark:bg-[#0c0e0a] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-[#262f17]">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium mb-1">
              <Link href="/" className="hover:text-navy-950 dark:hover:text-white transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-navy-950 dark:text-white font-bold">Global Catalog</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-navy-950 dark:text-white tracking-tight">
              {activeCategory
                ? activeCategory.name
                : activeCountry
                ? `Products from ${activeCountry.name} ${activeCountry.flag}`
                : query
                ? `Search: "${query}"`
                : 'Global Marketplace Catalog'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Showing <span className="font-bold text-navy-950 dark:text-white">{products.length}</span> verified products available for cross-border dispatch across 38 countries
            </p>
          </div>

          {/* Sorting Dropdown */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <ArrowUpDown className="w-3.5 h-3.5" />
              Sort:
            </span>
            <form method="GET" action="/shop" className="flex items-center gap-2">
              {query && <input type="hidden" name="q" value={query} />}
              {categorySlug && <input type="hidden" name="category" value={categorySlug} />}
              {countryCode && <input type="hidden" name="country" value={countryCode} />}
              {storeSlug && <input type="hidden" name="store" value={storeSlug} />}
              <select
                name="sort"
                defaultValue={sort}
                className="bg-white dark:bg-[#151a10] border border-slate-200 dark:border-[#262f17] rounded-2xl px-3.5 py-2 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:border-brand-600 shadow-2xs cursor-pointer"
              >
                <option value="newest">Newest Arrivals</option>
                <option value="rating">Highest Rated</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
              </select>
              <button
                type="submit"
                className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-2xl text-xs font-bold transition-colors shadow-2xs"
              >
                Apply
              </button>
            </form>
          </div>
        </div>

        {/* Active Filters Pill Strip */}
        {(categorySlug || countryCode || query || storeSlug || minPrice || maxPrice) && (
          <div className="flex flex-wrap items-center gap-2 bg-white dark:bg-[#151a10] p-3.5 rounded-2xl border border-slate-200/80 dark:border-[#262f17] shadow-2xs">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Filters:</span>
            {categorySlug && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-[#1f2614] text-xs font-bold text-navy-950 dark:text-white">
                Category: {activeCategory?.name || categorySlug}
                <Link href={`/shop?${new URLSearchParams({ ...(query && { q: query }), ...(countryCode && { country: countryCode }) }).toString()}`}>
                  <X className="w-3 h-3 hover:text-red-500" />
                </Link>
              </span>
            )}
            {countryCode && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 dark:bg-[#1f2614] text-xs font-bold text-brand-800 dark:text-brand-300">
                Country: {activeCountry?.flag} {activeCountry?.name || countryCode}
                <Link href={`/shop?${new URLSearchParams({ ...(query && { q: query }), ...(categorySlug && { category: categorySlug }) }).toString()}`}>
                  <X className="w-3 h-3 hover:text-red-500" />
                </Link>
              </span>
            )}
            {query && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-[#1f2614] text-xs font-bold text-navy-950 dark:text-white">
                Keyword: &ldquo;{query}&rdquo;
                <Link href={`/shop?${new URLSearchParams({ ...(categorySlug && { category: categorySlug }), ...(countryCode && { country: countryCode }) }).toString()}`}>
                  <X className="w-3 h-3 hover:text-red-500" />
                </Link>
              </span>
            )}
            <Link
              href="/shop"
              className="text-xs font-bold text-rose-600 dark:text-rose-400 hover:underline ml-auto"
            >
              Reset All
            </Link>
          </div>
        )}

        {/* Main Catalog Layout (Sidebar Filters + Product Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Filter Sidebar */}
          <aside className="lg:col-span-1 space-y-6 bg-white dark:bg-[#151a10] p-6 rounded-3xl border border-slate-200/80 dark:border-[#262f17] shadow-sm h-fit">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#262f17]">
              <div className="flex items-center gap-2 text-sm font-bold text-navy-950 dark:text-white">
                <SlidersHorizontal className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                <span>Filter Catalog</span>
              </div>
              {(categorySlug || countryCode || query || storeSlug) && (
                <Link href="/shop" className="text-xs font-semibold text-rose-600 dark:text-rose-400 hover:text-rose-700">
                  Clear
                </Link>
              )}
            </div>

            {/* Country of Origin Filter */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
                <span>Country of Origin</span>
              </h4>
              <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
                <Link
                  href={`/shop?${new URLSearchParams({ ...(categorySlug && { category: categorySlug }), ...(query && { q: query }) }).toString()}`}
                  className={`block px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                    !countryCode
                      ? 'bg-navy-950 dark:bg-brand-600 text-white font-bold'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#1f2614]'
                  }`}
                >
                  All Countries (38)
                </Link>
                {SUPPORTED_COUNTRIES.slice(0, 16).map((c) => (
                  <Link
                    key={c.code}
                    href={`/shop?country=${c.code}${categorySlug ? `&category=${categorySlug}` : ''}${query ? `&q=${query}` : ''}`}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                      countryCode === c.code
                        ? 'bg-navy-950 dark:bg-brand-600 text-white font-bold'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#1f2614]'
                    }`}
                  >
                    <span className="flex items-center gap-1.5 truncate">
                      <span>{c.flag}</span>
                      <span>{c.name}</span>
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">({c.code})</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Categories Filter */}
            <div className="space-y-2 pt-4 border-t border-slate-100 dark:border-[#262f17]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400">Categories</h4>
              <div className="space-y-1 max-h-56 overflow-y-auto pr-1">
                <Link
                  href={`/shop?${new URLSearchParams({ ...(countryCode && { country: countryCode }), ...(query && { q: query }) }).toString()}`}
                  className={`block px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                    !categorySlug
                      ? 'bg-navy-950 dark:bg-brand-600 text-white font-bold'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#1f2614]'
                  }`}
                >
                  All Categories
                </Link>
                {categories.map((c) => (
                  <Link
                    key={c.id}
                    href={`/shop?category=${c.slug}${countryCode ? `&country=${countryCode}` : ''}${query ? `&q=${query}` : ''}`}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                      categorySlug === c.slug
                        ? 'bg-navy-950 dark:bg-brand-600 text-white font-bold'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#1f2614]'
                    }`}
                  >
                    <span className="truncate">{c.name}</span>
                    <span className="text-[10px] text-slate-400 font-normal">{c._count.products}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Verified Stores Filter */}
            <div className="space-y-2 pt-4 border-t border-slate-100 dark:border-[#262f17]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400">Merchant Stores</h4>
              <div className="space-y-1">
                <Link
                  href={`/shop?${new URLSearchParams({ ...(categorySlug && { category: categorySlug }), ...(countryCode && { country: countryCode }) }).toString()}`}
                  className={`block px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                    !storeSlug
                      ? 'bg-navy-950 dark:bg-brand-600 text-white font-bold'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#1f2614]'
                  }`}
                >
                  All Stores
                </Link>
                {stores.map((s) => (
                  <Link
                    key={s.id}
                    href={`/shop?store=${s.slug}${categorySlug ? `&category=${categorySlug}` : ''}${countryCode ? `&country=${countryCode}` : ''}`}
                    className={`block px-3 py-2 rounded-xl text-xs font-medium transition-colors truncate ${
                      storeSlug === s.slug
                        ? 'bg-navy-950 dark:bg-brand-600 text-white font-bold'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#1f2614]'
                    }`}
                  >
                    {s.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div className="space-y-2 pt-4 border-t border-slate-100 dark:border-[#262f17]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400">Price Range (USD)</h4>
              <form method="GET" action="/shop" className="space-y-2">
                {query && <input type="hidden" name="q" value={query} />}
                {categorySlug && <input type="hidden" name="category" value={categorySlug} />}
                {countryCode && <input type="hidden" name="country" value={countryCode} />}
                {storeSlug && <input type="hidden" name="store" value={storeSlug} />}
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    name="minPrice"
                    placeholder="Min $"
                    defaultValue={minPrice || ''}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-[#1c2313] border border-slate-200 dark:border-[#2f391c] rounded-xl text-xs text-slate-800 dark:text-white placeholder-slate-400"
                  />
                  <input
                    type="number"
                    name="maxPrice"
                    placeholder="Max $"
                    defaultValue={maxPrice || ''}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-[#1c2313] border border-slate-200 dark:border-[#2f391c] rounded-xl text-xs text-slate-800 dark:text-white placeholder-slate-400"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold transition-colors shadow-2xs"
                >
                  Filter Price
                </button>
              </form>
            </div>
          </aside>

          {/* Right Products Grid */}
          <main className="lg:col-span-3">
            {products.length === 0 ? (
              <div className="text-center py-20 bg-white dark:bg-[#151a10] rounded-3xl border border-slate-200 dark:border-[#262f17] p-8 space-y-4 shadow-sm">
                <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-[#1c2313] text-slate-400 flex items-center justify-center mx-auto">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-navy-950 dark:text-white">No products match your criteria</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
                  We couldn&apos;t find any items matching your selected criteria. Try adjusting your origin country or category filters.
                </p>
                <div className="pt-2">
                  <Link
                    href="/shop"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-brand-600 text-white text-xs font-bold rounded-2xl hover:bg-brand-700 transition-colors shadow-md"
                  >
                    Clear All Filters
                  </Link>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {products.map((p) => (
                  <ProductCard
                    key={p.id}
                    id={p.id}
                    name={p.name}
                    slug={p.slug}
                    brand={p.brand}
                    basePrice={p.basePrice}
                    salePrice={p.salePrice}
                    imageUrl={p.images[0]?.url}
                    rating={p.rating}
                    reviewCount={p.reviewCount}
                    storeId={p.store.id}
                    storeName={p.store.name}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
