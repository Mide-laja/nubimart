import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/lib/db/prisma';
import { ProductCard } from '@/components/product/ProductCard';
import { HeroVideoBackground } from '@/components/home/HeroVideoBackground';
import { ShopByCountry3D } from '@/components/home/ShopByCountry3D';
import { CarrierLogoBadge } from '@/components/common/LogisticsCarrierLogos';
import {
  Globe,
  ShieldCheck,
  Truck,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Percent,
  Clock,
  Award,
  Store,
  ChevronRight,
  Compass,
  CheckCircle2,
  Package,
  Layers,
  Search,
  BookOpen,
  Anchor,
  Plane,
} from 'lucide-react';

export const revalidate = 0; // Dynamic data for development

const CATEGORY_VERTICALS = [
  { slug: 'agriculture-farm-supplies', name: 'Agriculture & Farm Supplies', count: '640+ Items', icon: '/images/nubimart/cat-agriculture.png' },
  { slug: 'automotive-transportation', name: 'Automotive & Transportation', count: '920+ Items', icon: '/images/nubimart/cat-automotive.png' },
  { slug: 'construction-tools-home-improvement', name: 'Construction, Tools & Home Improvement', count: '1,100+ Items', icon: '/images/nubimart/cat-construction.png' },
  { slug: 'digital-services-payments', name: 'Digital Services & Payments', count: '450+ Services', icon: '/images/nubimart/cat-digital-services.png' },
  { slug: 'education-books-training', name: 'Education, Books & Training', count: '780+ Items', icon: '/images/nubimart/cat-books.png' },
  { slug: 'electronics', name: 'Electronics & Technology', count: '3,400+ Items', icon: '/images/nubimart/cat-electronics.png' },
  { slug: 'events-entertainment-lifestyle', name: 'Events, Entertainment & Lifestyle', count: '520+ Items', icon: '/images/nubimart/cat-events.png' },
  { slug: 'fashion', name: 'Fashion, Clothing & Accessories', count: '4,800+ Items', icon: '/images/nubimart/cat-fashion.png' },
  { slug: 'groceries-food', name: 'Groceries & Food', count: '1,200+ Items', icon: '/images/nubimart/cat-groceries.png' },
  { slug: 'health-medical-services', name: 'Health & Medical Services', count: '310+ Services', icon: '/images/nubimart/cat-health-medical.png' },
  { slug: 'beauty-wellness', name: 'Health, Beauty & Personal Care', count: '2,100+ Items', icon: '/images/nubimart/cat-personal-care.png' },
  { slug: 'home-living', name: 'Home, Furniture & Kitchen', count: '1,650+ Items', icon: '/images/nubimart/cat-home-furniture.png' },
  { slug: 'hotels-travel-tourism', name: 'Hotels, Travel & Tourism', count: '240+ Packages', icon: '/images/nubimart/cat-hotels-travel.png' },
  { slug: 'household-cleaning', name: 'Household & Cleaning', count: '850+ Items', icon: '/images/nubimart/cat-household-cleaning.png' },
  { slug: 'jobs-business-professional-services', name: 'Jobs, Business & Professional Services', count: '390+ Listings', icon: '/images/nubimart/cat-job-business.png' },
  { slug: 'real-estate-properties', name: 'Real Estate & Properties', count: '180+ Listings', icon: '/images/nubimart/cat-realestate.png' },
];

export default async function HomePage() {
  // Fetch real database records
  const featuredProducts = await prisma.product.findMany({
    where: { status: 'APPROVED' },
    take: 8,
    include: {
      images: { where: { isPrimary: true }, take: 1 },
      store: { select: { id: true, name: true, slug: true } },
    },
    orderBy: { rating: 'desc' },
  });

  const stores = await prisma.store.findMany({
    where: { isActive: true },
    take: 3,
    include: {
      _count: { select: { products: true } },
    },
  });

  return (
    <div className="space-y-16 sm:space-y-20 pb-20">
      {/* 1. Hero Section — Full-Bleed Cinematic Aeroplane Video Background */}
      <section className="relative min-h-[640px] lg:min-h-[720px] flex items-center overflow-hidden bg-navy-950 text-white border-b border-navy-800">
        {/* Full-Bleed Background Video & Aeroplane Motion Engine */}
        <HeroVideoBackground />

        {/* Hero Content Container — Single Column, Wide Breathing Room */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-20 lg:py-28">
          <div className="max-w-2xl lg:max-w-3xl space-y-7">
            {/* Small Promotional Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-navy-900/90 backdrop-blur-md border border-navy-700/80 text-xs font-bold text-gold-400 shadow-lg">
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              <span>Endless Shopping, Endless Joy & Endless Possibilities</span>
            </div>

            {/* Dominant Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight leading-[1.08] uppercase text-white drop-shadow-sm">
              SHOP THE WORLD <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-brand-200 to-gold-400">
                ACROSS DIFFERENT COUNTRIES
              </span>
            </h1>

            {/* Supporting Description */}
            <p className="text-base sm:text-lg lg:text-xl text-slate-200 max-w-xl font-normal leading-relaxed drop-shadow-sm">
              Discover global stores, compare prices, and shop across continents with verified international escrow protection and express door-to-door delivery.
            </p>

            {/* Primary & Secondary Action CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#shop-by-country"
                className="px-7 sm:px-8 py-4 rounded-2xl bg-white hover:bg-slate-100 text-navy-950 font-extrabold text-sm shadow-xl transition-all flex items-center gap-2.5 group hover:scale-[1.02] active:scale-[0.98]"
              >
                <Globe className="w-4 h-4 text-brand-700" />
                <span>Explore All Countries</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <Link
                href="/shop"
                className="px-7 sm:px-8 py-4 rounded-2xl bg-navy-900/90 hover:bg-navy-800/90 backdrop-blur-md border border-navy-700 hover:border-gold-400/60 text-white font-bold text-sm transition-all flex items-center gap-2.5 shadow-lg hover:scale-[1.02] active:scale-[0.98]"
              >
                <Sparkles className="w-4 h-4 text-gold-400" />
                <span>Start Shopping Globally Today</span>
              </Link>
            </div>

            {/* Verified Trust Metrics */}
            <div className="pt-8 border-t border-navy-700/60 grid grid-cols-3 gap-6 sm:gap-10 text-left max-w-xl">
              <div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">38</div>
                <div className="text-xs sm:text-sm text-slate-300 font-medium mt-0.5">Countries Connected</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">100%</div>
                <div className="text-xs sm:text-sm text-slate-300 font-medium mt-0.5">Escrow Protected</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">48h</div>
                <div className="text-xs sm:text-sm text-slate-300 font-medium mt-0.5">Carrier Dispatch</div>
              </div>
            </div>
          </div>
        </div>

        {/* Minimal Unobtrusive Live Air Freight Status Badge in Corner */}
        <div className="hidden xl:flex absolute bottom-8 right-8 z-20 items-center gap-3 px-4 py-2 rounded-full bg-navy-950/70 backdrop-blur-md border border-navy-700/60 text-xs text-slate-300 shadow-xl pointer-events-none">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="font-mono text-[11px] font-semibold tracking-wide">
            <span className="text-slate-400">CARGO EXPRESS: </span>
            <span className="text-white font-bold">LOS ➔ LHR ➔ JFK</span>
            <span className="text-gold-400 font-medium"> • 100% ESCROW PROTECTED</span>
          </span>
        </div>
      </section>

      {/* 2. Shop by Country Global Directory */}
      <section id="shop-by-country" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-36 pt-4">
        <ShopByCountry3D />
      </section>

      {/* 3. Shop by Category Grid (16 Core Verticals from Reference Site) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider mb-1 flex items-center gap-1">
              <Layers className="w-3.5 h-3.5" />
              <span>Full Category Taxonomy</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-navy-950 dark:text-white tracking-tight">
              Shop by Category
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Find exactly what you need, from anywhere in the world.
            </p>
          </div>

          <Link
            href="/shop"
            className="text-xs sm:text-sm font-bold text-navy-950 dark:text-slate-200 hover:text-brand-600 dark:hover:text-brand-400 flex items-center gap-1 group self-start md:self-auto"
          >
            <span>View Full Catalog</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
          {CATEGORY_VERTICALS.map((cat) => (
            <Link
              key={cat.slug}
              href={`/shop?category=${cat.slug}`}
              className="group p-4 bg-white dark:bg-[#151a10] rounded-3xl border border-slate-200/80 dark:border-[#262f17] hover:border-slate-300 dark:hover:border-brand-500 hover:shadow-lg transition-all flex items-center gap-3.5"
            >
              <div className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-[#1c2313] border border-slate-100/90 dark:border-[#2f391c] flex items-center justify-center p-2 shrink-0 group-hover:scale-105 transition-transform">
                <div className="relative w-full h-full">
                  <Image src={cat.icon} alt={cat.name} fill className="object-contain" />
                </div>
              </div>
              <div className="min-w-0">
                <h3 className="text-xs font-bold text-navy-950 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors line-clamp-2 leading-snug">
                  {cat.name}
                </h3>
                <p className="text-[10px] text-slate-400 dark:text-slate-400 mt-0.5 font-medium">{cat.count}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. Featured Global Products Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider mb-1 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Curated International Selections</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-navy-950 dark:text-white tracking-tight">
              Featured Global Products
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-xs sm:text-sm font-bold text-brand-700 dark:text-brand-400 hover:text-brand-800 flex items-center gap-1 group"
          >
            <span>Explore All</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {featuredProducts.map((p) => (
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
      </section>

      {/* 5. Special Promotional Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-navy-950 dark:bg-[#11160a] text-white p-8 sm:p-12 border border-navy-800 dark:border-[#263016] shadow-2xl relative overflow-hidden">
          <div className="max-w-2xl space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/20 text-gold-400 text-xs font-bold border border-gold-500/30">
              <Percent className="w-3.5 h-3.5" />
              <span>International Welcome Discount</span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
              Claim 10% Off Your First Cross-Border Order
            </h3>

            <p className="text-sm text-slate-300 dark:text-slate-300 leading-relaxed">
              Use promo code <span className="font-mono font-bold text-white bg-navy-900 dark:bg-[#1a2110] px-2.5 py-1 rounded-xl border border-navy-700 dark:border-[#2f391c]">WELCOME10</span> at checkout on orders of $50 or more. Valid across all 38 supported countries.
            </p>

            <div className="pt-2">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-100 text-navy-950 font-bold text-xs sm:text-sm shadow-md transition-all"
              >
                <span>Shop Deals Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Logistics & Fulfillments Section (Matching Reference Site) */}
      <section className="bg-slate-900 dark:bg-[#0c0e0a] text-white py-16 sm:py-20 border-y border-slate-800 dark:border-[#1e2513]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-800 dark:bg-[#19200f] text-brand-400 text-xs font-bold border border-navy-700 dark:border-[#263016]">
                <Truck className="w-3.5 h-3.5" />
                <span>Global Courier Ecosystem</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
                Logistics & Fulfillments: <br />
                <span className="text-slate-400 font-normal">Move Products. Connect Marketers. Deliver with Confidence.</span>
              </h2>

              <p className="text-sm text-slate-300 leading-relaxed">
                Nubimart is building a connected logistics network designed to make cross-border freight simpler. Partnered with global air and sea carriers to deliver tracked parcels with customs clearance handled automatically.
              </p>

              {/* Authentic Carrier Logos Badges (DHL, FedEx, UPS, Aramex) */}
              <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-3">
                <CarrierLogoBadge carrier="dhl" subtext="Air Parcel 48-72h" darkTheme />
                <CarrierLogoBadge carrier="fedex" subtext="End-to-End Tracking" darkTheme />
                <CarrierLogoBadge carrier="ups" subtext="Customs Brokerage" darkTheme />
                <CarrierLogoBadge carrier="aramex" subtext="Global Freight & Express" darkTheme />
              </div>

              <div className="pt-4 flex flex-wrap gap-4">
                <Link
                  href="/logistics"
                  className="px-6 py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-md"
                >
                  View Logistics & Rates
                </Link>
                <Link
                  href="/track-your-order"
                  className="px-6 py-3.5 rounded-2xl bg-slate-800 dark:bg-[#161c10] hover:bg-slate-700 dark:hover:bg-[#1f2615] text-white font-bold text-xs uppercase tracking-wider border border-slate-700 dark:border-[#263016] transition-colors"
                >
                  Track Order
                </Link>
              </div>
            </div>

            {/* Right Tracking Widget Form */}
            <div className="lg:col-span-5">
              <div className="bg-white dark:bg-[#151a10] rounded-3xl p-6 sm:p-8 text-navy-950 dark:text-white shadow-2xl border border-slate-100 dark:border-[#262f17] space-y-4">
                <div className="flex items-center gap-2">
                  <Compass className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                  <h3 className="text-base font-bold text-navy-950 dark:text-white">Track Shipment in Real-Time</h3>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Enter your NUBIMART order tracking ID to inspect waypoint telemetry from dispatch to carrier delivery.
                </p>

                <form
                  action="/track-your-order"
                  method="GET"
                  className="space-y-3 pt-1"
                >
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Order / Tracking Number
                    </label>
                    <input
                      type="text"
                      name="orderId"
                      required
                      placeholder="e.g. NUB-2026-90412"
                      className="w-full bg-slate-50 dark:bg-[#1c2313] border border-slate-200 dark:border-[#2f391c] text-xs rounded-xl px-4 py-3 text-navy-950 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:bg-white dark:focus:bg-[#182011] focus:outline-none focus:border-brand-600 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Billing Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email used during checkout"
                      className="w-full bg-slate-50 dark:bg-[#1c2313] border border-slate-200 dark:border-[#2f391c] text-xs rounded-xl px-4 py-3 text-navy-950 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:bg-white dark:focus:bg-[#182011] focus:outline-none focus:border-brand-600"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <span>Check Shipment Status</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>

                <div className="pt-2 text-center text-[11px] text-slate-400 dark:text-slate-500">
                  Demo order available: <span className="font-mono font-bold text-slate-600 dark:text-slate-300">NUB-2026-90412</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Latest News (Exact Match with Reference Site) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider mb-1 flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5" />
              <span>News & Market Intelligence</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-navy-950 dark:text-white tracking-tight">
              Latest News
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Insights, industry intelligence, and updates from the global commerce ecosystem.
            </p>
          </div>
          <Link
            href="/blog"
            className="text-xs sm:text-sm font-bold text-navy-950 dark:text-slate-200 hover:text-brand-600 dark:hover:text-brand-400 flex items-center gap-1 group"
          >
            <span>Read All Articles</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Article 1: Legal Information */}
          <Link
            href="/legal"
            className="group bg-white dark:bg-[#151a10] rounded-3xl border border-slate-200/80 dark:border-[#262f17] p-6 hover:shadow-xl hover:border-slate-300 dark:hover:border-brand-500 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-400">
                <span className="font-bold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-[#1f2614] text-slate-700 dark:text-slate-300">Legal</span>
                <span>April 17, 2026 &bull; by Nubimart</span>
              </div>
              <h3 className="text-lg font-bold text-navy-950 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors line-clamp-2">
                Legal Information
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3">
                Welcome to Nubimart’s Legal Center. This page outlines important legal information governing your access to and use of our cross-border global marketplace.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-100 dark:border-[#262f17] flex items-center justify-between text-xs font-bold text-brand-700 dark:text-brand-400">
              <span>Read More &rarr;</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Article 2: Why Global Shopping Is the Future of E-Commerce */}
          <Link
            href="/blog"
            className="group bg-white dark:bg-[#151a10] rounded-3xl border border-slate-200/80 dark:border-[#262f17] p-6 hover:shadow-xl hover:border-slate-300 dark:hover:border-brand-500 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-400">
                <span className="font-bold px-2.5 py-0.5 rounded-full bg-brand-50 dark:bg-[#1f2614] text-brand-700 dark:text-brand-300">Trends</span>
                <span>April 17, 2026 &bull; by Nubimart</span>
              </div>
              <h3 className="text-lg font-bold text-navy-950 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors line-clamp-2">
                Why Global Shopping Is the Future of E-Commerce
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3">
                E-commerce is evolving rapidly, and one of the biggest trends shaping its future is global shopping. Consumers today want more cross-border choice, authenticity, and competitive value.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-100 dark:border-[#262f17] flex items-center justify-between text-xs font-bold text-brand-700 dark:text-brand-400">
              <span>Read More &rarr;</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Article 3: Top Global Online Marketplaces You Should Know */}
          <Link
            href="/blog"
            className="group bg-white dark:bg-[#151a10] rounded-3xl border border-slate-200/80 dark:border-[#262f17] p-6 hover:shadow-xl hover:border-slate-300 dark:hover:border-brand-500 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-400">
                <span className="font-bold px-2.5 py-0.5 rounded-full bg-gold-50 dark:bg-[#1f2614] text-gold-700 dark:text-gold-400">Marketplaces</span>
                <span>April 17, 2026 &bull; by Nubimart</span>
              </div>
              <h3 className="text-lg font-bold text-navy-950 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors line-clamp-2">
                Top Global Online Marketplaces You Should Know
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3">
                The global e-commerce space is driven by powerful online marketplaces that connect millions of buyers and sellers worldwide. Learn how regional hubs operate seamlessly under Nubimart.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-100 dark:border-[#262f17] flex items-center justify-between text-xs font-bold text-brand-700 dark:text-brand-400">
              <span>Read More &rarr;</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </section>

      {/* 8. 4-Pillar Trust Guarantee Strip (Matching Reference Site) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-8 bg-white dark:bg-[#151a10] rounded-3xl border border-slate-200/90 dark:border-[#262f17] shadow-sm">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-brand-50 dark:bg-[#1f2614] text-brand-700 dark:text-brand-400 border border-brand-100 dark:border-[#2f391c] shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-navy-950 dark:text-white tracking-tight">Worldwide Delivery</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Across all countries and regions worldwide. Express courier & cargo consolidation.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-gold-50 dark:bg-[#1f2614] text-gold-700 dark:text-gold-400 border border-gold-100 dark:border-[#2f391c] shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-navy-950 dark:text-white tracking-tight">Secure Payment</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Pay with popular and secure payment methods. 100% Escrow buyer protection.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-brand-50 dark:bg-[#1f2614] text-brand-700 dark:text-brand-400 border border-brand-100 dark:border-[#2f391c] shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-navy-950 dark:text-white tracking-tight">14-day Return Policy</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Return requests must be made within 7–14 days of confirmed package receipt.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-sky-50 dark:bg-[#1f2614] text-sky-700 dark:text-sky-400 border border-sky-100 dark:border-[#2f391c] shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-navy-950 dark:text-white tracking-tight">24/7 Help Center</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                We'll respond to you within 24 hours. Dedicated multi-language concierge support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Top Verified Global Merchants */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider mb-1 flex items-center gap-1">
              <Award className="w-3.5 h-3.5" />
              <span>Verified Storefronts</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-navy-950 dark:text-white tracking-tight">
              Top Verified Global Merchants
            </h2>
          </div>
          <Link
            href="/stores"
            className="text-xs sm:text-sm font-bold text-navy-950 dark:text-slate-200 hover:text-brand-600 dark:hover:text-brand-400 flex items-center gap-1 group"
          >
            <span>View All Stores</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stores.map((store) => (
            <div
              key={store.id}
              className="bg-white dark:bg-[#151a10] rounded-3xl border border-slate-200/80 dark:border-[#262f17] p-6 shadow-sm hover:shadow-xl hover:border-slate-300 dark:hover:border-brand-500 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative w-14 h-14 rounded-2xl overflow-hidden bg-slate-100 dark:bg-[#1c2313] border border-slate-200 dark:border-[#2f391c] shrink-0">
                    {store.logoUrl ? (
                      <Image src={store.logoUrl} alt={store.name} fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center font-bold text-slate-400 dark:text-slate-500">
                        {store.name.slice(0, 2)}
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-sm font-bold text-navy-950 dark:text-white">{store.name}</h4>
                      <span title="Verified Merchant"><ShieldCheck className="w-4 h-4 text-brand-600 dark:text-brand-400 shrink-0" /></span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-amber-500 font-bold mt-0.5">
                      <span>★ {store.rating.toFixed(1)}</span>
                      <span className="text-slate-400 dark:text-slate-400 font-normal">({store.reviewCount} reviews)</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                  {store.description || 'Verified international merchant offering authentic catalog inventory.'}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 dark:border-[#262f17] flex items-center justify-between">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">{store._count.products} Products Listed</span>
                <Link
                  href={`/shop?store=${store.slug}`}
                  className="text-xs font-bold text-brand-700 dark:text-brand-400 hover:text-brand-800"
                >
                  Visit Storefront &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
