'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Globe,
  Plane,
  Anchor,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Radio,
  Clock,
  Compass,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';

interface GlobalHub {
  id: string;
  name: string;
  country: string;
  flag: string;
  x: number; // percentage on globe (0-100)
  y: number; // percentage on globe (0-100)
  stores: string;
  leadTime: string;
  cargo: string;
  status: string;
}

const GLOBAL_HUBS: GlobalHub[] = [
  {
    id: 'lagos',
    name: 'Lagos Hub (LOS)',
    country: 'Nigeria',
    flag: '🇳🇬',
    x: 48,
    y: 56,
    stores: '14+ Verified Stores',
    leadTime: '24-48h Dispatch',
    cargo: 'Textiles, Crafts & Agro',
    status: 'High Volume Trade Active',
  },
  {
    id: 'shenzhen',
    name: 'Shenzhen Hub (SZX)',
    country: 'China',
    flag: '🇨🇳',
    x: 77,
    y: 45,
    stores: '32+ Factory Hubs',
    leadTime: '3-5 Days Express Air',
    cargo: 'Smart Tech & OEM Sourcing',
    status: 'Direct Sourcing Online',
  },
  {
    id: 'newyork',
    name: 'New York Gateway (JFK)',
    country: 'United States',
    flag: '🇺🇸',
    x: 25,
    y: 38,
    stores: '28+ Certified Merchants',
    leadTime: '2-4 Days Express',
    cargo: 'Electronics & Luxury Goods',
    status: 'US Escrow Clearing Active',
  },
  {
    id: 'london',
    name: 'London Depot (LHR)',
    country: 'United Kingdom',
    flag: '🇬🇧',
    x: 47,
    y: 32,
    stores: '19+ Premium Brands',
    leadTime: '48h Door Delivery',
    cargo: 'Horology, Apparel & Design',
    status: 'Bonded Warehouse Transit',
  },
  {
    id: 'dubai',
    name: 'Dubai Cargo (DXB)',
    country: 'United Arab Emirates',
    flag: '🇦🇪',
    x: 60,
    y: 46,
    stores: '15+ Gold Merchants',
    leadTime: '48-72h Air Freight',
    cargo: 'Perfumes, Jewelry & Tech',
    status: 'Middle East Logistics Center',
  },
  {
    id: 'tokyo',
    name: 'Tokyo Bay (NRT)',
    country: 'Japan',
    flag: '🇯🇵',
    x: 86,
    y: 40,
    stores: '18+ Precision Outlets',
    leadTime: '3-4 Days Express',
    cargo: 'High-End Audio & Collectibles',
    status: 'Automated Fulfillment',
  },
  {
    id: 'frankfurt',
    name: 'Frankfurt Hub (FRA)',
    country: 'Germany',
    flag: '🇩🇪',
    x: 50,
    y: 34,
    stores: '12+ Industrial Hubs',
    leadTime: '48h Central Europe',
    cargo: 'Machinery & Precision Tech',
    status: 'EU Cross-Border Clearing',
  },
];

const FLIGHT_TELEMETRY = [
  { id: 'FL-904', from: 'Shenzhen (SZX)', to: 'Lagos (LOS)', carrier: 'Nubimart Air Cargo', progress: '68%', status: 'In Flight • 34,000ft' },
  { id: 'FL-312', from: 'Dubai (DXB)', to: 'London (LHR)', carrier: 'Emirates SkyCargo', progress: '91%', status: 'Approach • Customs Cleared' },
  { id: 'SEA-108', from: 'Hamburg (HAM)', to: 'New York (JFK)', carrier: 'Atlantic Express', progress: '45%', status: 'Mid-Atlantic Transit' },
  { id: 'FL-771', from: 'Tokyo (NRT)', to: 'Nairobi (NBO)', carrier: 'East-West Freight', progress: '82%', status: 'In Transit • Escrow Locked' },
];

export function HeroGlobe3D() {
  const [activeHub, setActiveHub] = useState<GlobalHub>(GLOBAL_HUBS[0]);
  const [telemetryIndex, setTelemetryIndex] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Cycle flight telemetry every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setTelemetryIndex((prev) => (prev + 1) % FLIGHT_TELEMETRY.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  // 3D Parallax Mouse Tracking
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      x: -y * 14, // tilt vertically
      y: x * 18,  // tilt horizontally
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const currentFlight = FLIGHT_TELEMETRY[telemetryIndex];

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-lg mx-auto perspective-1200 transition-all duration-300"
      style={{ minHeight: '520px' }}
    >
      {/* 3D Tilted Wrapper */}
      <div
        className="relative w-full h-full preserve-3d transition-transform duration-200 ease-out"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        }}
      >
        {/* Holographic Glowing Atmosphere Rings behind the 3D Globe */}
        <div className="absolute -inset-6 rounded-full bg-gradient-to-tr from-brand-500/20 via-sky-500/20 to-gold-400/20 blur-2xl pointer-events-none animate-pulse-beacon opacity-70" />
        <div className="absolute -inset-10 rounded-full border border-sky-500/20 animate-spin-slow pointer-events-none" />
        <div className="absolute -inset-16 rounded-full border border-gold-500/15 animate-spin-slow-reverse pointer-events-none" />

        {/* 1. Main 3D Holographic Globe Sphere */}
        <div className="relative w-full aspect-square max-w-[460px] mx-auto rounded-full bg-gradient-to-b from-navy-900 via-navy-950 to-[#040811] border-2 border-sky-400/30 shadow-[0_0_60px_-15px_rgba(56,189,248,0.4)] overflow-hidden preserve-3d">
          {/* Official Nubimart World Map Texture Layer */}
          <div className="absolute inset-0 opacity-30 mix-blend-screen pointer-events-none">
            <Image
              src="/images/nubimart/map.jpg"
              alt="Nubimart World Map"
              fill
              className="object-cover scale-110"
            />
          </div>

          {/* Animated 3D Latitude/Longitude Grid Lines */}
          <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1.5px,transparent_1.5px)] [background-size:20px_20px] opacity-30" />

          {/* Dynamic 3D Curvature Shadows for Globe Realism */}
          <div className="absolute inset-0 rounded-full shadow-[inset_-30px_-30px_60px_rgba(0,0,0,0.9),inset_20px_20px_40px_rgba(56,189,248,0.25)] pointer-events-none" />

          {/* 3D Rotating Equatorial Ring */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-gradient-to-r from-transparent via-sky-400/60 to-transparent shadow-[0_0_12px_#38bdf8]" />
          <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[1px] bg-gradient-to-b from-transparent via-sky-400/60 to-transparent shadow-[0_0_12px_#38bdf8]" />

          {/* Rotating Diagonal Orbital Path */}
          <div className="absolute inset-4 rounded-full border border-dashed border-sky-400/30 animate-spin-3d pointer-events-none" />

          {/* Animated SVG Flight Arcs across the Globe */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 100 100">
            {/* Route 1: Shenzhen to Lagos */}
            <path
              d="M 77 45 Q 60 30 48 56"
              fill="none"
              stroke="url(#arcGradient1)"
              strokeWidth="0.8"
              strokeDasharray="2,2"
              className="animate-dash-flow"
            />
            {/* Route 2: Dubai to London */}
            <path
              d="M 60 46 Q 55 35 47 32"
              fill="none"
              stroke="url(#arcGradient2)"
              strokeWidth="0.8"
              strokeDasharray="2,2"
              className="animate-dash-flow"
            />
            {/* Route 3: Frankfurt to New York */}
            <path
              d="M 50 34 Q 38 25 25 38"
              fill="none"
              stroke="url(#arcGradient3)"
              strokeWidth="0.8"
              strokeDasharray="2,2"
              className="animate-dash-flow"
            />
            {/* Route 4: Tokyo to Dubai */}
            <path
              d="M 86 40 Q 72 35 60 46"
              fill="none"
              stroke="url(#arcGradient1)"
              strokeWidth="0.8"
              strokeDasharray="2,2"
              className="animate-dash-flow"
            />

            <defs>
              <linearGradient id="arcGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#34d399" />
                <stop offset="100%" stopColor="#38bdf8" />
              </linearGradient>
              <linearGradient id="arcGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="#38bdf8" />
              </linearGradient>
              <linearGradient id="arcGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
            </defs>
          </svg>

          {/* Interactive Global Hub Beacons on Globe */}
          {GLOBAL_HUBS.map((hub) => {
            const isSelected = activeHub.id === hub.id;
            return (
              <div
                key={hub.id}
                onClick={() => setActiveHub(hub)}
                style={{
                  left: `${hub.x}%`,
                  top: `${hub.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                className="absolute z-20 cursor-pointer group"
              >
                {/* Concentric Pulsing Radar Rings */}
                <span
                  className={`absolute -inset-2.5 rounded-full ${
                    isSelected ? 'bg-gold-400/40 animate-pulse-beacon' : 'bg-sky-400/20 group-hover:bg-sky-400/40'
                  }`}
                />
                <span
                  className={`relative flex items-center justify-center w-5 h-5 rounded-full border-2 transition-all ${
                    isSelected
                      ? 'bg-gold-400 border-white shadow-[0_0_16px_#fbbf24] scale-125'
                      : 'bg-navy-950 border-sky-400 shadow-[0_0_8px_#38bdf8] group-hover:scale-110'
                  }`}
                >
                  <span className="text-[10px] leading-none select-none">{hub.flag}</span>
                </span>

                {/* 3D Hub Label on Hover/Select */}
                <div
                  className={`absolute left-1/2 -bottom-7 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded-md text-[10px] font-bold tracking-tight transition-all pointer-events-none ${
                    isSelected
                      ? 'bg-gold-400 text-navy-950 shadow-md scale-100 opacity-100'
                      : 'bg-navy-900/90 text-slate-300 border border-navy-700 opacity-0 group-hover:opacity-100 group-hover:scale-100'
                  }`}
                >
                  {hub.name.split(' ')[0]}
                </div>
              </div>
            );
          })}

          {/* 3D Animated Satellite in Orbit */}
          <div className="absolute top-8 right-12 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-navy-900/80 border border-sky-500/30 backdrop-blur-md text-[10px] text-sky-300 font-mono animate-float-3d">
            <Radio className="w-3 h-3 text-sky-400 animate-pulse" />
            <span>NUB-SAT LIVE</span>
          </div>

          {/* Radar Sweep Arc Effect */}
          <div className="absolute inset-0 rounded-full border border-sky-500/10 pointer-events-none">
            <div className="w-1/2 h-1/2 origin-bottom-right bg-gradient-to-br from-sky-500/15 to-transparent rounded-tl-full animate-radar-sweep pointer-events-none" />
          </div>
        </div>

        {/* 2. Floating 3D Telemetry HUD (Bottom of Globe) */}
        <div
          className="absolute -bottom-8 left-4 right-4 bg-navy-900/90 backdrop-blur-xl border border-navy-700/80 rounded-2xl p-3.5 shadow-2xl preserve-3d translate-z-30 transition-transform duration-300"
          style={{ transform: 'translateZ(35px)' }}
        >
          <div className="flex items-center justify-between text-[11px] pb-2 border-b border-navy-800">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-bold text-white uppercase tracking-wider text-[10px] flex items-center gap-1">
                <Plane className="w-3 h-3 text-brand-400" />
                <span>Live Cargo Telemetry</span>
              </span>
            </div>
            <span className="font-mono text-gold-400 text-[10px] bg-navy-950 px-2 py-0.5 rounded border border-navy-800">
              {currentFlight.id}
            </span>
          </div>

          <div className="flex items-center justify-between pt-2 text-xs">
            <div>
              <div className="text-white font-bold text-xs flex items-center gap-1.5">
                <span>{currentFlight.from}</span>
                <span className="text-brand-400">➔</span>
                <span>{currentFlight.to}</span>
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">{currentFlight.carrier} • {currentFlight.status}</div>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-mono font-bold text-sky-400 bg-sky-950/60 px-2 py-1 rounded border border-sky-800/50">
                {currentFlight.progress} Complete
              </span>
            </div>
          </div>
        </div>

        {/* 3. Floating 3D Hub Info Glass Card (Top Right Overlay) */}
        <div
          className="absolute -top-6 -right-2 sm:-right-4 w-64 bg-navy-950/95 backdrop-blur-xl border border-gold-400/40 rounded-2xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.6)] preserve-3d translate-z-40 animate-float-3d"
          style={{ transform: 'translateZ(45px)' }}
        >
          <div className="flex items-center justify-between pb-2 border-b border-navy-800">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{activeHub.flag}</span>
              <div>
                <h4 className="text-xs font-black text-white">{activeHub.name}</h4>
                <p className="text-[10px] text-gold-400 font-semibold">{activeHub.country}</p>
              </div>
            </div>
            <span className="w-2 h-2 rounded-full bg-brand-400 animate-pulse" title="Hub Operational" />
          </div>

          <div className="space-y-1.5 pt-2.5 text-[11px]">
            <div className="flex items-center justify-between text-slate-300">
              <span className="text-slate-400">Merchant Network:</span>
              <span className="font-bold text-white">{activeHub.stores}</span>
            </div>
            <div className="flex items-center justify-between text-slate-300">
              <span className="text-slate-400">Dispatch Speed:</span>
              <span className="font-bold text-brand-400">{activeHub.leadTime}</span>
            </div>
            <div className="flex items-center justify-between text-slate-300">
              <span className="text-slate-400">Core Cargo:</span>
              <span className="font-medium text-slate-200 truncate max-w-[120px]">{activeHub.cargo}</span>
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-navy-800 flex items-center justify-between">
            <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              <span>Escrow Protected</span>
            </span>
            <Link
              href={`/shop?country=${activeHub.country === 'Nigeria' ? 'NG' : activeHub.country === 'China' ? 'CN' : activeHub.country === 'United States' ? 'US' : activeHub.country === 'United Kingdom' ? 'GB' : activeHub.country === 'United Arab Emirates' ? 'AE' : activeHub.country === 'Japan' ? 'JP' : 'DE'}`}
              className="text-[10px] font-bold text-white hover:text-gold-400 flex items-center gap-0.5 transition-colors"
            >
              <span>Explore Hub</span>
              <ArrowRight className="w-2.5 h-2.5" />
            </Link>
          </div>
        </div>

        {/* 4. Floating 3D Escrow Guarantee Badge (Bottom Left) */}
        <div
          className="absolute bottom-16 -left-4 sm:-left-8 bg-gradient-to-r from-brand-950/90 to-navy-950/90 backdrop-blur-xl border border-brand-500/40 rounded-2xl px-3.5 py-2.5 shadow-xl preserve-3d translate-z-50 animate-float-reverse-3d hidden sm:flex items-center gap-3"
          style={{ transform: 'translateZ(50px)' }}
        >
          <div className="w-8 h-8 rounded-xl bg-brand-500/20 border border-brand-400/50 flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4 text-brand-400" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-white">100% Escrow Guarantee</div>
            <div className="text-[9px] text-slate-400">Payment released only after delivery</div>
          </div>
        </div>
      </div>
    </div>
  );
}
