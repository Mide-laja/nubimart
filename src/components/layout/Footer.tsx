'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Globe,
  ShieldCheck,
  Truck,
  CreditCard,
  Mail,
  CheckCircle,
  Sparkles,
  ArrowRight,
  Headphones,
  RotateCcw,
  Check,
} from 'lucide-react';

export function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-navy-950 text-slate-300 pt-16 pb-12 border-t border-navy-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 1. Value Proposition 4-Card Strip (Matching Reference Site Top Footer) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-12 border-b border-navy-800/80">
          <div className="flex items-start gap-4 p-4 rounded-2xl bg-navy-900/60 border border-navy-800/60">
            <div className="p-3 rounded-xl bg-navy-950 text-brand-400 border border-navy-800 shrink-0 shadow-inner">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white tracking-tight">Worldwide Delivery</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Direct cross-border shipping across 38 countries with DHL, UPS & express air cargo.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-2xl bg-navy-900/60 border border-navy-800/60">
            <div className="p-3 rounded-xl bg-navy-950 text-gold-400 border border-navy-800 shrink-0 shadow-inner">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white tracking-tight">Secure Payment</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                100% Escrow Protection. Funds released to sellers only after carrier delivery confirmation.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-2xl bg-navy-900/60 border border-navy-800/60">
            <div className="p-3 rounded-xl bg-navy-950 text-brand-400 border border-navy-800 shrink-0 shadow-inner">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white tracking-tight">14-Day Return Policy</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Hassle-free international return and exchange window on all eligible purchases.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-2xl bg-navy-900/60 border border-navy-800/60">
            <div className="p-3 rounded-xl bg-navy-950 text-blue-400 border border-navy-800 shrink-0 shadow-inner">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white tracking-tight">24/7 Help Center</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Dedicated concierge support for international buyers, merchants and enterprise clients.
              </p>
            </div>
          </div>
        </div>

        {/* 2. Main 5-Column Navigation Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 py-12 border-b border-navy-800/80">
          {/* Brand Col & Mission */}
          <div className="col-span-2 space-y-4">
            <Link href="/" className="inline-block relative w-44 h-12">
              <Image
                src="/images/nubimart/logo.png"
                alt="Nubimart Logo"
                fill
                className="object-contain object-left brightness-0 invert"
              />
            </Link>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Nubimart is a premier global marketplace framework connecting consumers, enterprises, and verified merchants across borders. Endless Shopping, Endless Joy & Endless Possibilities.
            </p>

            {/* Newsletter Subscription */}
            <div className="pt-2 max-w-sm">
              <p className="text-xs font-bold text-white mb-2 uppercase tracking-wider text-slate-300">
                Let’s keep in touch
              </p>
              {isSubscribed ? (
                <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 p-3 rounded-2xl">
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  <span>Thank you for subscribing to global alerts!</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="flex-1 bg-navy-900 border border-navy-700 text-xs text-white rounded-xl px-3.5 py-2.5 placeholder:text-slate-500 focus:outline-none focus:border-brand-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold transition-colors shrink-0 shadow-sm"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Column 1: Get to Know Us */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-white">Get to Know Us</h5>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/our-story" className="hover:text-white transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/why-nubimart" className="hover:text-white transition-colors">
                  Why Global Shopping
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">
                  Marketplace Blogs
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-white transition-colors">
                  Careers & Culture
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Customer Service */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-white">Customer Service</h5>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Help Centre
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  FAQ & Guides
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/warehouses" className="hover:text-white transition-colors">
                  Fulfillment Hubs
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-white transition-colors">
                  How Nubimart Works
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Orders & Returns */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-white">Orders & Returns</h5>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/track-your-order" className="hover:text-white transition-colors">
                  Track Your Order
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Return & Exchange Policy
                </Link>
              </li>
              <li>
                <Link href="/logistics" className="hover:text-white transition-colors">
                  Shipping & Customs
                </Link>
              </li>
              <li>
                <Link href="/payments" className="hover:text-white transition-colors">
                  Payment Methods
                </Link>
              </li>
              <li>
                <Link href="/price-comparison" className="hover:text-white transition-colors">
                  Price Comparison
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Sell on Nubimart */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-white">Business & Partners</h5>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/become-seller" className="hover:text-white font-semibold text-brand-400 transition-colors">
                  Sell on Nubimart
                </Link>
              </li>
              <li>
                <Link href="/enterprise-solutions" className="hover:text-white transition-colors">
                  Enterprise Solutions
                </Link>
              </li>
              <li>
                <Link href="/investors" className="hover:text-white transition-colors">
                  Investors
                </Link>
              </li>
              <li>
                <Link href="/stores" className="hover:text-white transition-colors">
                  Find Stores Directory
                </Link>
              </li>
              <li>
                <Link href="/affiliate" className="hover:text-white transition-colors">
                  Affiliate Program
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* 3. Social Media Links & Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex flex-wrap items-center gap-4">
            <span className="font-bold text-white">Stay Connected:</span>
            <a
              href="https://www.instagram.com/info.nubimart"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              Instagram
            </a>
            <span>&bull;</span>
            <a
              href="https://www.tiktok.com/@nubimart"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              TikTok
            </a>
            <span>&bull;</span>
            <a
              href="https://x.com/nubi_mart"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              X (Twitter)
            </a>
            <span>&bull;</span>
            <a
              href="https://www.linkedin.com/company/nubimart/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              LinkedIn
            </a>
            <span>&bull;</span>
            <a
              href="https://www.youtube.com/@nubimart"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              YouTube
            </a>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms & Conditions
            </Link>
            <Link href="/legal" className="hover:text-white transition-colors">
              Legal
            </Link>
          </div>
        </div>

        {/* Copyright & Official Payment Gateways */}
        <div className="mt-8 pt-6 border-t border-navy-900 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 – Nubimart. Designed By Civak Digital</p>
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[11px] text-slate-400">Secure Payment Gateways:</span>
            <div className="flex items-center gap-2 bg-white/90 px-3 py-1 rounded-xl shadow-xs">
              <div className="relative w-16 h-5">
                <Image src="/images/nubimart/paystack.png" alt="Paystack" fill className="object-contain" />
              </div>
              <div className="relative w-16 h-5">
                <Image src="/images/nubimart/flutterwave.png" alt="Flutterwave" fill className="object-contain" />
              </div>
              <div className="relative w-8 h-5">
                <Image src="/images/nubimart/mastercard.webp" alt="Mastercard" fill className="object-contain" />
              </div>
              <div className="relative w-8 h-5">
                <Image src="/images/nubimart/visa.webp" alt="Visa" fill className="object-contain" />
              </div>
              <div className="relative w-7 h-5">
                <Image src="/images/nubimart/bank-transfer.webp" alt="Bank Transfer" fill className="object-contain" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
