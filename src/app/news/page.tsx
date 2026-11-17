import React from 'react';
import Link from 'next/link';
import { Newspaper, Calendar, ExternalLink } from 'lucide-react';

export default function NewsPage() {
  const releases = [
    {
      date: 'October 18, 2026',
      title: 'NUBIMART Launches Commercial Cross-Border Marketplace Connecting Verified Merchants Across 38 Countries',
      location: 'London & Lagos',
      summary: 'Platform introduces multi-vendor split cart checkout, zero-trust escrow protection, and automated international logistics integration with DHL and FedEx.',
    },
    {
      date: 'September 15, 2026',
      title: 'NUBIMART Partners with Regional Banking Gateways to Expand Local Currency Settlements for African Artisans',
      location: 'Nairobi & New York',
      summary: 'Partnership with Paystack and Flutterwave enables direct settlements in NGN, KES, GHS, and ZAR, eliminating foreign exchange conversion losses for small creators.',
    },
    {
      date: 'August 01, 2026',
      title: 'Global Warehouse Network Expands with Dedicated Facilities in New Jersey and London Heathrow',
      location: 'New Jersey, USA',
      summary: 'New customs-bonded fulfillment hubs reduce trans-Atlantic delivery windows to 3 business days for verified international storefronts.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-bold border border-brand-200">
          <Newspaper className="w-3.5 h-3.5" />
          <span>Press & Media</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          News & Press Releases
        </h1>
        <p className="text-sm text-slate-500">
          Official announcements, corridor expansions, and strategic partnerships from NUBIMART.
        </p>
      </div>

      <div className="space-y-6">
        {releases.map((item) => (
          <div key={item.title} className="p-8 bg-white rounded-3xl border border-slate-200/80 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-brand-600">
              <Calendar className="w-3.5 h-3.5" />
              <span>{item.date}</span>
              <span>&bull;</span>
              <span className="text-slate-500">{item.location}</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 leading-snug">{item.title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{item.summary}</p>
          </div>
        ))}
      </div>

      <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-center space-y-2">
        <p className="font-bold text-slate-800">Media Inquiries & Press Kit</p>
        <p className="text-slate-500">Journalists and media representatives can reach our press desk at press@nubimart.com.</p>
      </div>
    </div>
  );
}
