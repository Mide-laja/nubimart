import React from 'react';
import Link from 'next/link';
import { Briefcase, MapPin, Users, Sparkles, ArrowRight } from 'lucide-react';

export default function CareersPage() {
  const openings = [
    {
      title: 'Senior Cross-Border Payments Engineer',
      dept: 'Fintech & Settlement Engineering',
      location: 'London, UK / Remote',
      type: 'Full-time',
    },
    {
      title: 'Head of Global Logistics & Carrier Relations',
      dept: 'Operations & Supply Chain',
      location: 'Lagos, Nigeria / Dubai, UAE',
      type: 'Full-time',
    },
    {
      title: 'Lead Artisan Partnerships & Merchant Onboarding',
      dept: 'Seller Success',
      location: 'Nairobi, Kenya',
      type: 'Full-time',
    },
    {
      title: 'Senior Full-Stack TypeScript / Next.js Architect',
      dept: 'Platform Engineering',
      location: 'Remote (Global)',
      type: 'Full-time',
    },
    {
      title: 'Risk, Fraud & Escrow Compliance Officer',
      dept: 'Legal & Compliance',
      location: 'New York, US / Remote',
      type: 'Full-time',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-bold border border-brand-200">
          <Briefcase className="w-3.5 h-3.5" />
          <span>Work with Us</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Join the Global Commerce Revolution
        </h1>
        <p className="text-sm text-slate-500">
          Help us build the cross-border marketplace powering international trade for creators, manufacturers, and buyers across 38 countries.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 pb-2 border-b border-slate-200">
          Open Positions ({openings.length})
        </h2>

        <div className="space-y-3">
          {openings.map((job) => (
            <div
              key={job.title}
              className="p-6 bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-premium hover:border-slate-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-brand-600 block">
                  {job.dept}
                </span>
                <h3 className="text-base font-bold text-slate-900">{job.title}</h3>
                <div className="text-xs text-slate-500 flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{job.location}</span>
                  <span>&bull;</span>
                  <span>{job.type}</span>
                </div>
              </div>

              <Link
                href="/contact"
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold self-start sm:self-auto transition-colors"
              >
                Apply Now
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
