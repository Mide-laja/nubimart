'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Building2,
  ShieldCheck,
  Globe,
  Briefcase,
  Users,
  Layers,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  FileCheck,
  Send,
} from 'lucide-react';

export default function EnterpriseSolutionsPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    workEmail: '',
    contactName: '',
    country: 'United States',
    annualVolume: '$100k - $500k',
    requirements: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-slate-50 dark:bg-[#0c0e0a] min-h-screen py-10 space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Breadcrumb & Hero */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
            <Link href="/" className="hover:text-navy-950 dark:hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-navy-950 dark:text-white font-bold">Enterprise Solutions</span>
          </div>

          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 dark:bg-[#1f2614] border border-brand-200 dark:border-[#2f391c] text-xs font-bold text-brand-800 dark:text-brand-300">
              <Building2 className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
              <span>Enterprise Grade Digital Infrastructure</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-navy-950 dark:text-white tracking-tight leading-tight">
              Scalable Solutions for <br />
              <span className="text-brand-600 dark:text-brand-400">Complex Global Organisations.</span>
            </h1>
            <p className="text-xs sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed pt-1">
              Nubimart provides enterprise-grade commerce infrastructure that enables large organisations, institutions, and networks to access, manage, and distribute goods, services, and opportunities across international markets and borders.
            </p>
          </div>
        </div>

        {/* Who Enterprise Solutions Is For (Matching Reference Content) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-[#151a10] rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-[#262f17] shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-navy-950 dark:bg-[#1f2614] text-white flex items-center justify-center font-bold">
              01
            </div>
            <h3 className="text-base font-bold text-navy-950 dark:text-white">
              Large Enterprises & Corporations
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Streamline multi-country procurement, vendor vetting, and cross-border invoicing through one unified digital platform with automated customs clearance.
            </p>
          </div>

          <div className="bg-white dark:bg-[#151a10] rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-[#262f17] shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-600 text-white flex items-center justify-center font-bold">
              02
            </div>
            <h3 className="text-base font-bold text-navy-950 dark:text-white">
              Multinational Retailers & Distributors
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Scale catalogue distribution into emerging markets across Africa, Asia, and the Americas without the overhead of establishing local legal entities in every market.
            </p>
          </div>

          <div className="bg-white dark:bg-[#151a10] rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-[#262f17] shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-gold-500 text-navy-950 flex items-center justify-center font-bold">
              03
            </div>
            <h3 className="text-base font-bold text-navy-950 dark:text-white">
              Governments & Trade Development Agencies
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Connect local SME producers, artisanal cooperatives, and regional agricultural exporters with verified international procurement buyers.
            </p>
          </div>
        </div>

        {/* Core Pillars */}
        <div className="bg-navy-950 dark:bg-[#11160a] text-white rounded-3xl p-8 sm:p-12 border border-navy-800 dark:border-[#263016] shadow-2xl space-y-8">
          <div className="max-w-2xl space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              Enterprise Capabilities & Governance
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Built on compliant financial escrows, multi-tier KYC verification, and carrier integrations.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <ShieldCheck className="w-6 h-6 text-brand-400" />
              <h4 className="text-sm font-bold text-white">Institutional Escrow</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Multi-million dollar transaction protection with milestone-based payout authorization.
              </p>
            </div>

            <div className="space-y-2">
              <Globe className="w-6 h-6 text-gold-400" />
              <h4 className="text-sm font-bold text-white">38-Country Settlement</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Local currency treasury operations with Paystack, Flutterwave, Stripe and direct SWIFT routing.
              </p>
            </div>

            <div className="space-y-2">
              <FileCheck className="w-6 h-6 text-brand-400" />
              <h4 className="text-sm font-bold text-white">Automated Customs</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                HS code classification, harmonized tariff estimation, and pre-filed commercial customs manifests.
              </p>
            </div>

            <div className="space-y-2">
              <Users className="w-6 h-6 text-blue-400" />
              <h4 className="text-sm font-bold text-white">Dedicated Key Account Team</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Assigned relationship manager, custom SLA guarantees, and enterprise technical onboarding.
              </p>
            </div>
          </div>
        </div>

        {/* Consultation Inquiry Form */}
        <div className="bg-white dark:bg-[#151a10] rounded-3xl p-8 sm:p-12 border border-slate-200/80 dark:border-[#262f17] shadow-sm">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black text-navy-950 dark:text-white tracking-tight">
                Connect with Enterprise Advisory
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Discuss cross-border infrastructure, bulk supplier networks, or marketplace integrations with our corporate team.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 dark:text-emerald-400 mx-auto" />
                <h3 className="text-lg font-bold text-emerald-950 dark:text-white">Inquiry Received</h3>
                <p className="text-xs text-emerald-800 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out. A Nubimart Enterprise Director has been assigned to your request and will follow up within 24 business hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Organization / Company Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      placeholder="Acme Global Corporation"
                      className="w-full bg-slate-50 dark:bg-[#1c2313] border border-slate-200 dark:border-[#2f391c] text-xs rounded-xl px-4 py-3 text-navy-950 dark:text-white placeholder-slate-400 focus:bg-white dark:focus:bg-[#182011] focus:outline-none focus:border-brand-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Work Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.workEmail}
                      onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                      placeholder="procurement@acme.com"
                      className="w-full bg-slate-50 dark:bg-[#1c2313] border border-slate-200 dark:border-[#2f391c] text-xs rounded-xl px-4 py-3 text-navy-950 dark:text-white placeholder-slate-400 focus:bg-white dark:focus:bg-[#182011] focus:outline-none focus:border-brand-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Contact Name & Title
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.contactName}
                      onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                      placeholder="Sarah Jenkins, VP of Supply Chain"
                      className="w-full bg-slate-50 dark:bg-[#1c2313] border border-slate-200 dark:border-[#2f391c] text-xs rounded-xl px-4 py-3 text-navy-950 dark:text-white placeholder-slate-400 focus:bg-white dark:focus:bg-[#182011] focus:outline-none focus:border-brand-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Estimated Annual Trade Volume
                    </label>
                    <select
                      value={formData.annualVolume}
                      onChange={(e) => setFormData({ ...formData, annualVolume: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-[#1c2313] border border-slate-200 dark:border-[#2f391c] text-xs rounded-xl px-4 py-3 text-navy-950 dark:text-white focus:bg-white dark:focus:bg-[#182011] focus:outline-none focus:border-brand-600"
                    >
                      <option value="$100k - $500k">$100,000 – $500,000</option>
                      <option value="$500k - $2M">$500,000 – $2,000,000</option>
                      <option value="$2M - $10M">$2,000,000 – $10,000,000</option>
                      <option value="$10M+">$10,000,000+</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Procurement or Integration Requirements
                  </label>
                  <textarea
                    rows={4}
                    value={formData.requirements}
                    onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                    placeholder="Describe your cross-border sourcing goals, target corridors, or ERP integration requirements..."
                    className="w-full bg-slate-50 dark:bg-[#1c2313] border border-slate-200 dark:border-[#2f391c] text-xs rounded-xl px-4 py-3 text-navy-950 dark:text-white placeholder-slate-400 focus:bg-white dark:focus:bg-[#182011] focus:outline-none focus:border-brand-600"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Enterprise Consultation Request</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
