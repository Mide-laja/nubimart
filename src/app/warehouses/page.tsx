import React from 'react';
import Link from 'next/link';
import { Warehouse, MapPin, CheckCircle, ArrowRight } from 'lucide-react';

export default function WarehousesPage() {
  const hubs = [
    {
      name: 'Lagos Atlantic Gateway Fulfilment Centre',
      code: 'WH-LOS-01',
      city: 'Ikeja, Lagos, Nigeria',
      type: 'Origin Sorting, Textile Inspection & West Africa Freight Hub',
      features: ['Air-conditioned textile preservation', 'Direct airside connection to Murtala Muhammed Airport', 'Artisan quality inspection labs'],
    },
    {
      name: 'Nairobi Express Logistics Depot',
      code: 'WH-NBO-01',
      city: 'Embakasi, Nairobi, Kenya',
      type: 'Botanical, Coffee & East Africa Regional Depot',
      features: ['Cold-chain storage for organic oils and shea', 'Customs bonded export terminal', 'Automated pick & pack line'],
    },
    {
      name: 'New Jersey Regional Fulfilment Center',
      code: 'WH-USA-01',
      city: 'Edison, NJ, United States',
      type: 'North American Direct Distribution & Consumer Returns',
      features: ['48-hour ground delivery across Eastern seaboard', 'Reverse logistics inspection centre', 'Same-day carrier pickups'],
    },
    {
      name: 'London Heathrow Gateway Warehouse',
      code: 'WH-LHR-01',
      city: 'Hounslow, Greater London, United Kingdom',
      type: 'UK & European Import Logistics Facility',
      features: ['HMRC customs bonded clearance', 'Rapid transit to European sorting hubs', 'Secure high-value jewelry storage'],
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-bold border border-brand-200">
          <Warehouse className="w-3.5 h-3.5" />
          <span>Fulfillment Infrastructure</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Global Warehouse Network
        </h1>
        <p className="text-sm text-slate-500">
          Strategically located fulfillment centers equipped for climate-controlled preservation, artisan quality audits, and express customs routing.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {hubs.map((h) => (
          <div key={h.code} className="bg-white rounded-3xl border border-slate-200/80 p-8 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold px-2.5 py-1 bg-slate-100 rounded-lg text-slate-700">
                {h.code}
              </span>
              <span className="text-xs text-brand-700 font-bold flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>{h.city}</span>
              </span>
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900">{h.name}</h3>
              <p className="text-xs text-slate-500 mt-0.5">{h.type}</p>
            </div>

            <ul className="space-y-1.5 text-xs text-slate-600 pt-3 border-t border-slate-100">
              {h.features.map((f, i) => (
                <li key={i} className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-brand-600 shrink-0" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
