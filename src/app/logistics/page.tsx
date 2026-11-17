'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Truck,
  Compass,
  Plane,
  Anchor,
  ShieldCheck,
  Globe,
  ArrowRight,
  Package,
  Calculator,
  CheckCircle2,
  Clock,
  Warehouse,
} from 'lucide-react';
import { SUPPORTED_COUNTRIES } from '@/lib/constants/countries';
import { useCurrency } from '@/context/CurrencyContext';
import { DHLLogo, FedExLogo, UPSLogo, AramexLogo } from '@/components/common/LogisticsCarrierLogos';

export default function LogisticsPage() {
  const router = useRouter();
  const { formatPrice } = useCurrency();

  const [trackingNumber, setTrackingNumber] = useState('');
  const [originCountry, setOriginCountry] = useState('NG');
  const [destCountry, setDestCountry] = useState('US');
  const [weightKg, setWeightKg] = useState(2);
  const [selectedCarrier, setSelectedCarrier] = useState<'dhl' | 'ups' | 'fedex' | 'aramex'>('dhl');

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingNumber.trim()) {
      router.push(`/track-your-order?orderId=${encodeURIComponent(trackingNumber.trim())}`);
    }
  };

  // Dynamic estimate calculation
  const baseRatePerKg =
    selectedCarrier === 'dhl' ? 24 : selectedCarrier === 'fedex' ? 22 : selectedCarrier === 'aramex' ? 20 : 19;
  const estimatedShippingCost = Math.round(35 + weightKg * baseRatePerKg);

  return (
    <div className="bg-slate-50 dark:bg-[#0c0e0a] min-h-screen py-10 space-y-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb & Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
            <Link href="/" className="hover:text-navy-950 dark:hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-navy-950 dark:text-white font-bold">Logistics & Fulfillments</span>
          </div>

          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 dark:bg-[#1f2614] border border-brand-200 dark:border-[#2f391c] text-xs font-bold text-brand-800 dark:text-brand-300">
              <Truck className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
              <span>Cross-Border Logistics Network</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-navy-950 dark:text-white tracking-tight leading-tight">
              Move Products. Connect Marketers. <br />
              <span className="text-brand-600 dark:text-brand-400">Deliver with Confidence.</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed pt-1">
              Nubimart is building an integrated cross-border logistics ecosystem designed to make local and international deliveries effortless for buyers, merchants, and enterprise distribution chains across 38 countries.
            </p>
          </div>
        </div>

        {/* Live Order Tracker Banner */}
        <div className="rounded-3xl bg-navy-950 dark:bg-[#11160a] text-white p-6 sm:p-10 border border-navy-800 dark:border-[#263016] shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-gold-400">
                <Compass className="w-4 h-4 text-gold-400" />
                <span>Real-Time Milestone Telemetry</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Track Any International Order
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                Enter your order confirmation number to view carrier dispatch, international customs transit, and last-mile delivery progress.
              </p>
            </div>

            <div className="lg:col-span-6">
              <form onSubmit={handleTrackSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  required
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  placeholder="e.g. NUB-2026-90412"
                  className="flex-1 bg-navy-900 dark:bg-[#1a2210] border border-navy-700 dark:border-[#2f391c] text-xs text-white rounded-2xl px-4 py-3.5 placeholder:text-slate-500 focus:outline-none focus:border-brand-500 font-mono"
                />
                <button
                  type="submit"
                  className="px-6 py-3.5 bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs uppercase tracking-wider rounded-2xl transition-colors shadow-md shrink-0 flex items-center justify-center gap-2"
                >
                  <span>Track Package</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
              <p className="text-[11px] text-slate-400 mt-2">
                Sample Seed Order: <span className="font-mono text-white font-bold cursor-pointer underline" onClick={() => setTrackingNumber('NUB-2026-90412')}>NUB-2026-90412</span>
              </p>
            </div>
          </div>
        </div>

        {/* Global Partner Carriers (Matching Reference Site Partners) */}
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <h2 className="text-2xl font-black text-navy-950 dark:text-white">Integrated Courier Partners</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Direct API integrations and automated manifest dispatch with top tier global couriers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* 1. DHL Express */}
            <div className="bg-white dark:bg-[#151a10] rounded-3xl p-6 border border-slate-200/80 dark:border-[#262f17] hover:border-amber-400 dark:hover:border-amber-400 shadow-sm transition-all space-y-4 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="h-12 w-full max-w-[150px] flex items-center justify-center bg-white rounded-2xl p-2 border border-slate-100 shadow-2xs">
                  <DHLLogo className="h-7 w-auto object-contain" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-navy-950 dark:text-white">DHL Express Worldwide</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    Trusted door-to-door express air delivery across 220+ territories with 48 to 72 hour transit times and integrated customs pre-clearance.
                  </p>
                </div>
              </div>
              <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 pt-3 border-t border-slate-100 dark:border-[#262f17]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>Real-time GPS tracking</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>Signature on delivery</span>
                </li>
              </ul>
            </div>

            {/* 2. FedEx International */}
            <div className="bg-white dark:bg-[#151a10] rounded-3xl p-6 border border-slate-200/80 dark:border-[#262f17] hover:border-purple-300 dark:hover:border-purple-400 shadow-sm transition-all space-y-4 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="h-12 w-full max-w-[150px] flex items-center justify-center bg-white rounded-2xl p-2 border border-slate-100 shadow-2xs">
                  <FedExLogo className="h-7 w-auto object-contain" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-navy-950 dark:text-white">FedEx International Priority</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    Priority time-definite global shipping connecting merchants from Asia, North America, and Europe directly to consumer doorsteps.
                  </p>
                </div>
              </div>
              <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 pt-3 border-t border-slate-100 dark:border-[#262f17]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>24/7 priority customer care</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>Insured transit protection</span>
                </li>
              </ul>
            </div>

            {/* 3. UPS Worldwide */}
            <div className="bg-white dark:bg-[#151a10] rounded-3xl p-6 border border-slate-200/80 dark:border-[#262f17] hover:border-amber-700 dark:hover:border-amber-600 shadow-sm transition-all space-y-4 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="h-12 w-full max-w-[150px] flex items-center justify-center bg-white rounded-2xl p-2 border border-slate-100 shadow-2xs">
                  <UPSLogo className="h-8 w-auto object-contain" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-navy-950 dark:text-white">UPS Air & Ground Freight</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    One of the world’s largest logistics enterprises handling parcel logistics, heavy industrial air cargo, and cross-border brokerage.
                  </p>
                </div>
              </div>
              <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 pt-3 border-t border-slate-100 dark:border-[#262f17]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>Automated duties estimation</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>High-volume freight options</span>
                </li>
              </ul>
            </div>

            {/* 4. Aramex Global Express */}
            <div className="bg-white dark:bg-[#151a10] rounded-3xl p-6 border border-slate-200/80 dark:border-[#262f17] hover:border-rose-400 dark:hover:border-rose-400 shadow-sm transition-all space-y-4 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="h-12 w-full max-w-[150px] flex items-center justify-center bg-white rounded-2xl p-2 border border-slate-100 shadow-2xs">
                  <AramexLogo className="h-6 w-auto object-contain" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-navy-950 dark:text-white">Aramex Global Express</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    Leading comprehensive global logistics specialist in Middle East, Africa, and Asia cross-border express e-commerce deliveries.
                  </p>
                </div>
              </div>
              <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 pt-3 border-t border-slate-100 dark:border-[#262f17]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>Cross-border COD clearance</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>Last-mile distribution network</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Shipping Rate Calculator Tool */}
        <div className="bg-white dark:bg-[#151a10] rounded-3xl p-6 sm:p-10 border border-slate-200/80 dark:border-[#262f17] shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-[#1f2614] text-xs font-bold text-navy-950 dark:text-slate-200">
                <Calculator className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
                <span>Cross-Border Rate Estimator</span>
              </div>
              <h2 className="text-2xl font-black text-navy-950 dark:text-white tracking-tight">
                Instant International Shipping Estimate
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Calculate estimated landed shipping rates and duty handling based on origin merchant location, package weight, and destination country.
              </p>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1c2313] border border-slate-100 dark:border-[#262f17] space-y-2 mt-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 dark:text-slate-400">Estimated Delivery:</span>
                  <span className="font-bold text-navy-950 dark:text-white">3 &ndash; 5 Business Days</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 dark:text-slate-400">Carrier Service:</span>
                  <span className="font-bold text-brand-700 dark:text-brand-400 uppercase">{selectedCarrier} Express</span>
                </div>
                <div className="pt-2 border-t border-slate-200 dark:border-[#262f17] flex items-center justify-between">
                  <span className="text-xs font-bold text-navy-950 dark:text-white">Estimated Landed Cost:</span>
                  <span className="text-lg font-black text-brand-600 dark:text-brand-400">
                    {formatPrice(estimatedShippingCost)}
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 bg-slate-50/70 dark:bg-[#182012] p-6 rounded-3xl border border-slate-200/70 dark:border-[#262f17] space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Shipment Origin
                  </label>
                  <select
                    value={originCountry}
                    onChange={(e) => setOriginCountry(e.target.value)}
                    className="w-full bg-white dark:bg-[#151a10] border border-slate-200 dark:border-[#2f391c] text-xs rounded-xl px-3 py-2.5 text-navy-950 dark:text-white font-medium"
                  >
                    {SUPPORTED_COUNTRIES.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.flag} {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Destination Country
                  </label>
                  <select
                    value={destCountry}
                    onChange={(e) => setDestCountry(e.target.value)}
                    className="w-full bg-white dark:bg-[#151a10] border border-slate-200 dark:border-[#2f391c] text-xs rounded-xl px-3 py-2.5 text-navy-950 dark:text-white font-medium"
                  >
                    {SUPPORTED_COUNTRIES.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.flag} {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  <span>Gross Weight (kg):</span>
                  <span className="font-bold text-navy-950 dark:text-white">{weightKg} kg</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="25"
                  step="0.5"
                  value={weightKg}
                  onChange={(e) => setWeightKg(parseFloat(e.target.value))}
                  className="w-full accent-brand-600 cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Select Carrier Network
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(['dhl', 'fedex', 'ups', 'aramex'] as const).map((carrier) => (
                    <button
                      key={carrier}
                      type="button"
                      onClick={() => setSelectedCarrier(carrier)}
                      className={`py-2 px-3 rounded-xl text-xs font-bold uppercase transition-all ${
                        selectedCarrier === carrier
                          ? 'bg-brand-600 text-white shadow-xs'
                          : 'bg-white dark:bg-[#151a10] border border-slate-200 dark:border-[#2f391c] text-slate-600 dark:text-slate-300 hover:border-brand-600'
                      }`}
                    >
                      {carrier} Express
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
