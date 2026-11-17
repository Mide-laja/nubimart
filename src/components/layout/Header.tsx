'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Search,
  ShoppingCart,
  User,
  Heart,
  Globe,
  ChevronDown,
  Menu,
  X,
  Store,
  ShieldAlert,
  LogOut,
  Package,
  Layers,
  Sparkles,
  Truck,
  Compass,
  ArrowRight,
  TrendingDown,
  Building2,
  Briefcase,
  HelpCircle,
  ExternalLink,
  SlidersHorizontal,
} from 'lucide-react';
import { useCurrency } from '../../context/CurrencyContext';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { CountryCurrencyModal } from './CountryCurrencyModal';
import { AuthModal } from '../auth/AuthModal';
import { ThemeToggle } from '../common/ThemeToggle';

export const CONTINENTS_DIRECTORY = [
  {
    id: 'asia',
    name: 'Asia',
    countries: [
      { name: 'China', code: 'CN', flag: '🇨🇳', hubs: 'Alibaba, 1688, Taobao, JD' },
      { name: 'Japan', code: 'JP', flag: '🇯🇵', hubs: 'Rakuten, Amazon JP, Bic Camera' },
      { name: 'South Korea', code: 'KR', flag: '🇰🇷', hubs: 'Coupang, Gmarket, Naver' },
      { name: 'India', code: 'IN', flag: '🇮🇳', hubs: 'Artisan Textiles, Spices & Tech' },
      { name: 'Singapore', code: 'SG', flag: '🇸🇬', hubs: 'Global Fintech & Commerce' },
      { name: 'United Arab Emirates', code: 'AE', flag: '🇦🇪', hubs: 'Dubai Gold & Luxury Trading' },
      { name: 'Saudi Arabia', code: 'SA', flag: '🇸🇦', hubs: 'Perfumes, Dates & Oud' },
      { name: 'Turkey', code: 'TR', flag: '🇹🇷', hubs: 'Grand Bazaar & Leather Goods' },
      { name: 'Vietnam', code: 'VN', flag: '🇻🇳', hubs: 'Apparel & Coffee Exports' },
      { name: 'Malaysia', code: 'MY', flag: '🇲🇾', hubs: 'Electronics & Halal Goods' },
    ],
  },
  {
    id: 'europe',
    name: 'Europe',
    countries: [
      { name: 'United Kingdom', code: 'GB', flag: '🇬🇧', hubs: 'London Luxury, British Heritage' },
      { name: 'Germany', code: 'DE', flag: '🇩🇪', hubs: 'Precision Engineering & Tech' },
      { name: 'France', code: 'FR', flag: '🇫🇷', hubs: 'Haute Couture, Cosmetics & Wine' },
      { name: 'Italy', code: 'IT', flag: '🇮🇹', hubs: 'Artisan Leather, Ceramics & Fashion' },
      { name: 'Spain', code: 'ES', flag: '🇪🇸', hubs: 'Footwear & Mediterranean Goods' },
      { name: 'Netherlands', code: 'NL', flag: '🇳🇱', hubs: 'Rotterdam Logistics Gateway' },
      { name: 'Poland', code: 'PL', flag: '🇵🇱', hubs: 'Amber Crafts & Manufacturing' },
      { name: 'Switzerland', code: 'CH', flag: '🇨🇭', hubs: 'Horology, Precision & Botanicals' },
    ],
  },
  {
    id: 'north-america',
    name: 'North America',
    countries: [
      { name: 'United States', code: 'US', flag: '🇺🇸', hubs: 'Silicon Valley Tech, Global Brands' },
      { name: 'Canada', code: 'CA', flag: '🇨🇦', hubs: 'Maple Botanicals & Clean Living' },
      { name: 'Mexico', code: 'MX', flag: '🇲🇽', hubs: 'Handmade Pottery & Textiles' },
    ],
  },
  {
    id: 'africa',
    name: 'Africa',
    countries: [
      { name: 'Nigeria', code: 'NG', flag: '🇳🇬', hubs: 'Aso-Oke, Ankara Luxury & Cocoa' },
      { name: 'South Africa', code: 'ZA', flag: '🇿🇦', hubs: 'Rooibos, Diamonds & Design' },
      { name: 'Kenya', code: 'KE', flag: '🇰🇪', hubs: 'Single-Origin Arabica & Tea' },
      { name: 'Egypt', code: 'EG', flag: '🇪🇬', hubs: 'Egyptian Giza Cotton & Perfumery' },
      { name: 'Ghana', code: 'GH', flag: '🇬🇭', hubs: 'Kente Cloth, Shea & Gold Ornaments' },
      { name: 'Morocco', code: 'MA', flag: '🇲🇦', hubs: 'Argan Oil, Medina Leather & Rugs' },
      { name: 'Rwanda', code: 'RW', flag: '🇷🇼', hubs: 'Specialty Bourbon Arabica Coffee' },
    ],
  },
  {
    id: 'south-america',
    name: 'South America',
    countries: [
      { name: 'Brazil', code: 'BR', flag: '🇧🇷', hubs: 'Coffee Estates & Organic Açai' },
      { name: 'Argentina', code: 'AR', flag: '🇦🇷', hubs: 'Pampa Leather & Wool Crafts' },
      { name: 'Colombia', code: 'CO', flag: '🇨🇴', hubs: 'Emeralds & High-Altitude Coffee' },
      { name: 'Chile', code: 'CL', flag: '🇨🇱', hubs: 'Alpaca Wool & Copper Art' },
    ],
  },
  {
    id: 'oceania',
    name: 'Oceania',
    countries: [
      { name: 'Australia', code: 'AU', flag: '🇦🇺', hubs: 'Merino Wool, Opal & Botanicals' },
      { name: 'New Zealand', code: 'NZ', flag: '🇳🇿', hubs: 'Manuka Honey & Wool Garments' },
    ],
  },
  {
    id: 'cargo',
    name: 'Global Cargo',
    countries: [
      { name: 'DHL Express Worldwide', code: 'DHL', flag: '✈️', hubs: 'Air Courier 48h Delivery' },
      { name: 'UPS Global Freight', code: 'UPS', flag: '📦', hubs: 'Express Freight & Customs' },
      { name: 'FedEx International', code: 'FDX', flag: '🌐', hubs: 'Priority Cargo Network' },
      { name: 'Cross-Border Consolidation', code: 'CBC', flag: '🚢', hubs: 'Consolidated Container Shipping' },
    ],
  },
];

export const CORE_CATEGORIES = [
  { slug: 'all', name: 'All Categories' },
  { slug: 'groceries-food', name: 'Groceries & Food' },
  { slug: 'household-cleaning', name: 'Household & Cleaning' },
  { slug: 'beauty-wellness', name: 'Health, Beauty & Personal Care' },
  { slug: 'electronics', name: 'Electronics & Technology' },
  { slug: 'fashion', name: 'Fashion, Clothing & Accessories' },
  { slug: 'agriculture-farm-supplies', name: 'Agriculture & Farm Supplies' },
  { slug: 'automotive-transportation', name: 'Automotive & Transportation' },
  { slug: 'construction-tools-home-improvement', name: 'Construction, Tools & Home' },
  { slug: 'digital-services-payments', name: 'Digital Services & Payments' },
  { slug: 'education-books-training', name: 'Education, Books & Training' },
  { slug: 'events-entertainment-lifestyle', name: 'Events & Lifestyle' },
  { slug: 'health-medical-services', name: 'Health & Medical Services' },
  { slug: 'home-living', name: 'Home, Furniture & Kitchen' },
  { slug: 'hotels-travel-tourism', name: 'Hotels, Travel & Tourism' },
  { slug: 'jobs-business-professional-services', name: 'Jobs & Professional Services' },
  { slug: 'real-estate-properties', name: 'Real Estate & Properties' },
];

export function Header() {
  const router = useRouter();
  const { currentCountry, currentCurrency } = useCurrency();
  const { totalItems, openCartDrawer } = useCart();
  const { user, isAuthenticated, logout } = useAuth();

  const [isCountryModalOpen, setIsCountryModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Menus
  const [isCountryMenuOpen, setIsCountryMenuOpen] = useState(false);
  const [activeContinentTab, setActiveContinentTab] = useState('asia');
  const [isBusinessMenuOpen, setIsBusinessMenuOpen] = useState(false);
  const [isCategoriesMenuOpen, setIsCategoriesMenuOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [wishlistToast, setWishlistToast] = useState(false);

  const countryMenuRef = useRef<HTMLDivElement>(null);
  const businessMenuRef = useRef<HTMLDivElement>(null);
  const categoriesMenuRef = useRef<HTMLDivElement>(null);

  // Close menus on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (countryMenuRef.current && !countryMenuRef.current.contains(event.target as Node)) {
        setIsCountryMenuOpen(false);
      }
      if (businessMenuRef.current && !businessMenuRef.current.contains(event.target as Node)) {
        setIsBusinessMenuOpen(false);
      }
      if (categoriesMenuRef.current && !categoriesMenuRef.current.contains(event.target as Node)) {
        setIsCategoriesMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.set('q', searchQuery.trim());
    if (selectedCategory && selectedCategory !== 'all') params.set('category', selectedCategory);
    router.push(`/shop?${params.toString()}`);
  };

  const handleWishlistClick = () => {
    setWishlistToast(true);
    setTimeout(() => setWishlistToast(false), 3000);
  };

  const currentContinent = CONTINENTS_DIRECTORY.find((c) => c.id === activeContinentTab) || CONTINENTS_DIRECTORY[0];

  return (
    <>
      <header className="sticky top-0 z-40 bg-white dark:bg-[#11160c] border-b border-slate-200/90 dark:border-[#222818] shadow-xs transition-colors">
        {/* Main Header Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-4">
            {/* Official Logo */}
            <div className="flex items-center gap-6 shrink-0">
              <Link href="/" className="flex items-center gap-2 group">
                <div className="relative w-36 sm:w-44 h-11 sm:h-12">
                  <Image
                    src="/images/nubimart/logo.png"
                    alt="Nubimart — Endless Shopping, Endless Joy & Endless Possibilities"
                    fill
                    className="object-contain object-left dark:brightness-110"
                    priority
                  />
                </div>
              </Link>
            </div>

            {/* Universal Search Bar with Category Dropdown Filter */}
            <div className="hidden lg:flex flex-1 max-w-2xl mx-2">
              <form
                onSubmit={handleSearch}
                className="w-full flex items-center bg-slate-100/80 hover:bg-slate-100 dark:bg-[#1a2012] dark:hover:bg-[#1f2615] rounded-2xl border border-slate-200 dark:border-[#28321a] focus-within:border-brand-600 dark:focus-within:border-brand-500 focus-within:bg-white dark:focus-within:bg-[#14190e] focus-within:ring-2 focus-within:ring-brand-600/15 transition-all overflow-hidden p-1"
              >
                {/* Category Dropdown Filter */}
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-transparent text-xs font-semibold text-slate-700 dark:text-slate-300 pl-3 pr-2 py-2 border-r border-slate-200 dark:border-[#28321a] focus:outline-none cursor-pointer max-w-[150px] truncate"
                >
                  {CORE_CATEGORIES.map((cat) => (
                    <option key={cat.slug} value={cat.slug} className="text-navy-950 dark:text-slate-900 text-xs">
                      {cat.name}
                    </option>
                  ))}
                </select>

                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products, stores, artisan crafts, electronics, brands..."
                  className="flex-1 bg-transparent text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 px-3 py-2 focus:outline-none"
                />

                <button
                  type="submit"
                  className="p-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl transition-colors shrink-0 shadow-sm"
                  aria-label="Search"
                >
                  <Search className="w-4 h-4" />
                </button>
              </form>
            </div>

            {/* Right Action Controls */}
            <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
              {/* Theme Mode Switcher (Sun / Moon) */}
              <ThemeToggle />

              {/* Country & Currency Selector Trigger */}
              <button
                onClick={() => setIsCountryModalOpen(true)}
                className="hidden md:flex items-center gap-2 px-3 py-2 rounded-2xl border border-slate-200 dark:border-[#28321a] hover:border-slate-300 dark:hover:border-[#3d4a27] hover:bg-slate-50 dark:hover:bg-[#181f11] transition-colors text-xs font-semibold text-slate-700 dark:text-slate-200"
                title="Select Shipping Country & Multi-Currency"
              >
                <span className="text-base">{currentCountry.flag}</span>
                <span className="hidden xl:inline">{currentCountry.name}</span>
                <span className="text-brand-600 dark:text-brand-400 font-bold">({currentCurrency.symbol})</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {/* Wishlist Trigger */}
              <button
                onClick={handleWishlistClick}
                className="relative p-2.5 rounded-2xl border border-slate-200 dark:border-[#28321a] hover:border-slate-300 dark:hover:border-[#3d4a27] hover:bg-slate-50 dark:hover:bg-[#181f11] text-slate-700 dark:text-slate-300 transition-colors"
                title="My Wishlist"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5 text-slate-700 dark:text-slate-300 hover:text-red-500 transition-colors" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  0
                </span>
              </button>

              {/* Account Dropdown or Auth Modal Trigger */}
              <div className="relative">
                {isAuthenticated && user ? (
                  <button
                    onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
                    className="flex items-center gap-2 px-3 py-2 rounded-2xl border border-slate-200 dark:border-[#28321a] hover:border-slate-300 dark:hover:border-[#3d4a27] hover:bg-slate-50 dark:hover:bg-[#181f11] transition-colors text-xs font-medium text-slate-700 dark:text-slate-200"
                  >
                    <div className="w-7 h-7 rounded-full bg-brand-600 text-white flex items-center justify-center font-bold text-xs">
                      {user.name.charAt(0)}
                    </div>
                    <div className="text-left hidden sm:block">
                      <div className="font-bold text-navy-950 dark:text-white leading-none">{user.name.split(' ')[0]}</div>
                      <div className="text-[10px] text-brand-600 dark:text-brand-400 font-bold uppercase">{user.role}</div>
                    </div>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                ) : (
                  <button
                    onClick={() => setIsAuthModalOpen(true)}
                    className="flex items-center gap-2 px-3 py-2 rounded-2xl border border-slate-200 dark:border-[#28321a] hover:border-slate-300 dark:hover:border-[#3d4a27] hover:bg-slate-50 dark:hover:bg-[#181f11] transition-colors text-xs font-medium text-slate-700 dark:text-slate-200"
                  >
                    <div className="w-7 h-7 rounded-full bg-slate-100 dark:bg-[#1f2615] flex items-center justify-center text-slate-600 dark:text-slate-300">
                      <User className="w-4 h-4" />
                    </div>
                    <div className="text-left hidden sm:block">
                      <div className="text-[10px] text-slate-400 leading-none">Sign In</div>
                      <div className="font-bold text-navy-950 dark:text-white leading-tight">My Account</div>
                    </div>
                  </button>
                )}

                {/* Account Menu Popup */}
                {isAccountMenuOpen && isAuthenticated && user && (
                  <div
                    onMouseLeave={() => setIsAccountMenuOpen(false)}
                    className="absolute right-0 mt-2 w-64 rounded-3xl bg-white dark:bg-[#14190f] shadow-2xl border border-slate-100 dark:border-[#26301a] p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  >
                    <div className="p-3 border-b border-slate-100 dark:border-[#242c16] bg-slate-50/70 dark:bg-[#1b2213] rounded-2xl mb-1">
                      <p className="text-xs font-bold text-navy-950 dark:text-white">{user.name}</p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{user.email}</p>
                      <span className="inline-block mt-1 text-[10px] font-bold px-2.5 py-0.5 bg-brand-100 dark:bg-brand-900/60 text-brand-800 dark:text-brand-300 rounded-full">
                        Role: {user.role}
                      </span>
                    </div>

                    <Link
                      href="/account"
                      onClick={() => setIsAccountMenuOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#1f2615] rounded-xl transition-colors"
                    >
                      <User className="w-4 h-4 text-slate-400" />
                      <span>Buyer Dashboard & Profile</span>
                    </Link>
                    <Link
                      href="/account/orders"
                      onClick={() => setIsAccountMenuOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#1f2615] rounded-xl transition-colors"
                    >
                      <Package className="w-4 h-4 text-slate-400" />
                      <span>My Orders & Escrow Status</span>
                    </Link>

                    {(user.role === 'SELLER' || user.role === 'ADMIN') && (
                      <Link
                        href="/seller"
                        onClick={() => setIsAccountMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-brand-700 dark:text-brand-400 hover:bg-brand-50 dark:hover:bg-[#1f2615] rounded-xl transition-colors"
                      >
                        <Store className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                        <span>Seller Merchant Portal</span>
                      </Link>
                    )}

                    {user.role === 'ADMIN' && (
                      <Link
                        href="/admin"
                        onClick={() => setIsAccountMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-purple-700 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-[#1f2615] rounded-xl transition-colors"
                      >
                        <ShieldAlert className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                        <span>Admin Control Plane</span>
                      </Link>
                    )}

                    <div className="pt-1 border-t border-slate-100 dark:border-[#242c16]">
                      <button
                        onClick={() => {
                          setIsAccountMenuOpen(false);
                          logout();
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-[#1f2615] rounded-xl transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Side Cart Drawer Trigger */}
              <button
                onClick={openCartDrawer}
                className="relative flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white transition-all shadow-md group"
                aria-label="Open Shopping Cart Drawer"
              >
                <div className="relative">
                  <ShoppingCart className="w-5 h-5 text-white group-hover:scale-105 transition-transform" />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-gold-400 text-navy-950 text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                      {totalItems}
                    </span>
                  )}
                </div>
                <span className="hidden sm:inline text-xs font-bold">
                  {totalItems > 0 ? `${totalItems} items` : 'Cart'}
                </span>
              </button>

              {/* Mobile Hamburger Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-2xl border border-slate-200 dark:border-[#28321a] text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#181f11]"
                aria-label="Toggle Navigation"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Secondary Navigation Bar (with Shop By Country Mega Menu) */}
        <div className="hidden lg:block border-t border-slate-100 dark:border-[#222818] bg-slate-50/60 dark:bg-[#0c0e0a]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-12 text-xs">
              <div className="flex items-center gap-1">
                {/* 1. All Categories Dropdown */}
                <div className="relative" ref={categoriesMenuRef}>
                  <button
                    onClick={() => {
                      setIsCategoriesMenuOpen(!isCategoriesMenuOpen);
                      setIsCountryMenuOpen(false);
                      setIsBusinessMenuOpen(false);
                    }}
                    className={`flex items-center gap-2 px-4 py-2 font-bold rounded-xl transition-all ${
                      isCategoriesMenuOpen
                        ? 'bg-brand-600 text-white'
                        : 'bg-white dark:bg-[#161c10] border border-slate-200 dark:border-[#28321a] text-navy-950 dark:text-slate-100 hover:border-brand-600 dark:hover:border-brand-500 shadow-2xs'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
                    <span>All Categories</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isCategoriesMenuOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isCategoriesMenuOpen && (
                    <div className="absolute left-0 mt-2 w-80 bg-white dark:bg-[#14190f] rounded-3xl shadow-2xl border border-slate-100 dark:border-[#28321a] p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150 grid grid-cols-1 gap-1 max-h-[460px] overflow-y-auto">
                      {CORE_CATEGORIES.slice(1).map((cat) => (
                        <Link
                          key={cat.slug}
                          href={`/shop?category=${cat.slug}`}
                          onClick={() => setIsCategoriesMenuOpen(false)}
                          className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#1e2515] hover:text-navy-950 dark:hover:text-white transition-colors flex items-center justify-between"
                        >
                          <span>{cat.name}</span>
                          <ArrowRight className="w-3 h-3 text-slate-300 dark:text-slate-600" />
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* 2. "Shop By Country" Mega Menu */}
                <div className="relative" ref={countryMenuRef}>
                  <button
                    onClick={() => {
                      setIsCountryMenuOpen(!isCountryMenuOpen);
                      setIsCategoriesMenuOpen(false);
                      setIsBusinessMenuOpen(false);
                    }}
                    className={`flex items-center gap-1.5 px-3.5 py-2 font-bold rounded-xl transition-all ${
                      isCountryMenuOpen ? 'bg-brand-600 text-white' : 'text-slate-800 dark:text-slate-200 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-white dark:hover:bg-[#181f11]'
                    }`}
                  >
                    <Globe className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
                    <span>Shop By Country</span>
                    <ChevronDown className={`w-3 h-3 transition-transform ${isCountryMenuOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Mega Menu Dropdown */}
                  {isCountryMenuOpen && (
                    <div className="absolute left-0 mt-2 w-[760px] bg-white dark:bg-[#14190f] rounded-3xl shadow-2xl border border-slate-100 dark:border-[#28321a] overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="flex border-b border-slate-100 dark:border-[#242c16] bg-slate-50/80 dark:bg-[#0e1209] px-4 py-2 gap-1 overflow-x-auto">
                        {CONTINENTS_DIRECTORY.map((continent) => (
                          <button
                            key={continent.id}
                            onClick={() => setActiveContinentTab(continent.id)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                              activeContinentTab === continent.id
                                ? 'bg-brand-600 text-white shadow-xs'
                                : 'text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-slate-200/60 dark:hover:bg-[#1c2214]'
                            }`}
                          >
                            {continent.name}
                          </button>
                        ))}
                      </div>

                      <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                            {currentContinent.name} Marketplace Hubs & Regional Sellers
                          </h4>
                          <Link
                            href="/stores"
                            onClick={() => setIsCountryMenuOpen(false)}
                            className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
                          >
                            <span>Browse Verified Stores</span>
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>

                        <div className="grid grid-cols-2 gap-3 max-h-[340px] overflow-y-auto pr-2">
                          {currentContinent.countries.map((country) => (
                            <Link
                              key={country.name}
                              href={`/shop?country=${country.code}`}
                              onClick={() => setIsCountryMenuOpen(false)}
                              className="p-3 rounded-2xl border border-slate-100 dark:border-[#222915] hover:border-slate-300 dark:hover:border-brand-500/50 hover:bg-slate-50/80 dark:hover:bg-[#1b2212] transition-all group flex items-start gap-3"
                            >
                              <span className="text-2xl shrink-0 p-1 bg-white dark:bg-[#161c10] rounded-lg border border-slate-100 dark:border-[#222915] shadow-2xs">
                                {country.flag}
                              </span>
                              <div className="min-w-0">
                                <div className="flex items-center gap-1.5">
                                  <h5 className="font-bold text-navy-950 dark:text-white text-xs group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                                    {country.name}
                                  </h5>
                                  <span className="text-[10px] text-slate-400 font-mono">({country.code})</span>
                                </div>
                                <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">{country.hubs}</p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>

                      <div className="bg-slate-50 dark:bg-[#0e1209] px-6 py-3 border-t border-slate-100 dark:border-[#242c16] flex items-center justify-between text-xs">
                        <span className="text-slate-500 dark:text-slate-400 font-medium">
                          Connecting verified sellers across 38 countries with escrow guarantees.
                        </span>
                        <Link
                          href="/stores"
                          onClick={() => setIsCountryMenuOpen(false)}
                          className="font-bold text-navy-950 dark:text-white hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                        >
                          Explore Full Store Directory &rarr;
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

                {/* 3. Find Stores */}
                <Link
                  href="/stores"
                  className="px-3 py-2 font-semibold text-slate-700 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-white dark:hover:bg-[#181f11] rounded-xl transition-all flex items-center gap-1.5"
                >
                  <Store className="w-3.5 h-3.5 text-slate-400" />
                  <span>Find Stores</span>
                </Link>

                {/* 4. Logistics */}
                <Link
                  href="/logistics"
                  className="px-3 py-2 font-semibold text-slate-700 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-white dark:hover:bg-[#181f11] rounded-xl transition-all flex items-center gap-1.5"
                >
                  <Truck className="w-3.5 h-3.5 text-slate-400" />
                  <span>Logistics & Cargo</span>
                </Link>

                {/* 5. Price Comparison */}
                <Link
                  href="/price-comparison"
                  className="px-3 py-2 font-semibold text-slate-700 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-white dark:hover:bg-[#181f11] rounded-xl transition-all flex items-center gap-1.5"
                >
                  <TrendingDown className="w-3.5 h-3.5 text-slate-400" />
                  <span>Price Comparison</span>
                </Link>

                {/* 6. Business on Nubimart Dropdown */}
                <div className="relative" ref={businessMenuRef}>
                  <button
                    onClick={() => {
                      setIsBusinessMenuOpen(!isBusinessMenuOpen);
                      setIsCountryMenuOpen(false);
                      setIsCategoriesMenuOpen(false);
                    }}
                    className={`flex items-center gap-1 px-3 py-2 font-semibold rounded-xl transition-all ${
                      isBusinessMenuOpen
                        ? 'bg-brand-600 text-white'
                        : 'text-slate-700 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-white dark:hover:bg-[#181f11]'
                    }`}
                  >
                    <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                    <span>Business on Nubimart</span>
                    <ChevronDown className={`w-3 h-3 transition-transform ${isBusinessMenuOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isBusinessMenuOpen && (
                    <div className="absolute left-0 mt-2 w-64 bg-white dark:bg-[#14190f] rounded-3xl shadow-2xl border border-slate-100 dark:border-[#28321a] p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                      <Link
                        href="/become-seller"
                        onClick={() => setIsBusinessMenuOpen(false)}
                        className="p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-[#1e2515] transition-colors block"
                      >
                        <p className="text-xs font-bold text-navy-950 dark:text-white">Sell on Nubimart</p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Reach international buyers across 38 countries</p>
                      </Link>
                      <Link
                        href="/enterprise-solutions"
                        onClick={() => setIsBusinessMenuOpen(false)}
                        className="p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-[#1e2515] transition-colors block"
                      >
                        <p className="text-xs font-bold text-navy-950 dark:text-white">Enterprise Solutions</p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Custom procurement & multinational supply chains</p>
                      </Link>
                      <Link
                        href="/investors"
                        onClick={() => setIsBusinessMenuOpen(false)}
                        className="p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-[#1e2515] transition-colors block"
                      >
                        <p className="text-xs font-bold text-navy-950 dark:text-white">Investors & Governance</p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Stakeholder value & global expansion</p>
                      </Link>
                    </div>
                  )}
                </div>
              </div>

              {/* Auxiliary Quick Links */}
              <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400 font-medium">
                <Link href="/track-your-order" className="hover:text-navy-950 dark:hover:text-white transition-colors flex items-center gap-1">
                  <Compass className="w-3.5 h-3.5 text-slate-400" />
                  <span>Track Your Order</span>
                </Link>
                <span className="text-slate-300 dark:text-slate-700">&bull;</span>
                <Link href="/contact" className="hover:text-navy-950 dark:hover:text-white transition-colors">
                  Help Centre
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 dark:border-[#222818] bg-white dark:bg-[#12160d] p-5 space-y-5 animate-in slide-in-from-top-4 duration-200">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products, stores, categories..."
                className="w-full bg-slate-50 dark:bg-[#1a2012] border border-slate-200 dark:border-[#28321a] text-sm rounded-2xl pl-4 pr-10 py-3 text-navy-950 dark:text-white focus:bg-white dark:focus:bg-[#14190e] focus:outline-none"
              />
              <button
                type="submit"
                className="absolute right-2 top-2 p-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl shadow-xs"
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>

            {/* Mobile Controls: Country Switcher & Theme Toggle */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setIsCountryModalOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="flex-1 flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-[#1a2012] border border-slate-200 dark:border-[#28321a] text-xs font-bold text-navy-950 dark:text-white"
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">{currentCountry.flag}</span>
                  <span>{currentCountry.name} ({currentCurrency.code})</span>
                </div>
                <span className="text-brand-600 dark:text-brand-400 font-semibold">Change</span>
              </button>
              <ThemeToggle />
            </div>

            {/* Core Links */}
            <div className="grid grid-cols-2 gap-2 text-xs font-bold">
              <Link
                href="/shop"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-3 bg-slate-50 dark:bg-[#1a2012] hover:bg-slate-100 dark:hover:bg-[#202716] rounded-2xl text-navy-950 dark:text-white flex items-center gap-2"
              >
                <Package className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                <span>Shop All</span>
              </Link>
              <Link
                href="/stores"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-3 bg-slate-50 dark:bg-[#1a2012] hover:bg-slate-100 dark:hover:bg-[#202716] rounded-2xl text-navy-950 dark:text-white flex items-center gap-2"
              >
                <Store className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                <span>Find Stores</span>
              </Link>
              <Link
                href="/logistics"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-3 bg-slate-50 dark:bg-[#1a2012] hover:bg-slate-100 dark:hover:bg-[#202716] rounded-2xl text-navy-950 dark:text-white flex items-center gap-2"
              >
                <Truck className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                <span>Logistics</span>
              </Link>
              <Link
                href="/price-comparison"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-3 bg-slate-50 dark:bg-[#1a2012] hover:bg-slate-100 dark:hover:bg-[#202716] rounded-2xl text-navy-950 dark:text-white flex items-center gap-2"
              >
                <TrendingDown className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                <span>Price Compare</span>
              </Link>
            </div>

            {/* Continents Accordion */}
            <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-[#222818]">
              <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                Shop By Continent
              </h4>
              <div className="grid grid-cols-3 gap-2">
                {CONTINENTS_DIRECTORY.map((c) => (
                  <Link
                    key={c.id}
                    href={`/shop`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2.5 rounded-xl border border-slate-200 dark:border-[#28321a] text-center text-xs font-semibold hover:bg-slate-50 dark:hover:bg-[#1a2012] text-slate-800 dark:text-slate-200"
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Business Links */}
            <div className="pt-2 border-t border-slate-100 dark:border-[#222818] space-y-1">
              <Link
                href="/become-seller"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-2 text-xs font-bold text-brand-600 dark:text-brand-400"
              >
                Sell on Nubimart (38 Countries) &rarr;
              </Link>
              <Link
                href="/enterprise-solutions"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-navy-950 dark:hover:text-white"
              >
                Enterprise Solutions
              </Link>
              <Link
                href="/track-your-order"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-navy-950 dark:hover:text-white"
              >
                Track Your Order
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Wishlist Toast Notification */}
      {wishlistToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-navy-950 text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2 duration-200 text-xs font-medium border border-navy-800">
          <Heart className="w-4 h-4 text-red-400 fill-red-400 shrink-0" />
          <span>Product saved to your wishlist. Sign in to view all saved items.</span>
        </div>
      )}

      {/* Country & Currency Switcher Modal */}
      <CountryCurrencyModal
        isOpen={isCountryModalOpen}
        onClose={() => setIsCountryModalOpen(false)}
      />

      {/* Authentication Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
}
