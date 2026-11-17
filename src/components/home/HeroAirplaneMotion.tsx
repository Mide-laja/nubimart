'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Plane,
  ShieldCheck,
  Compass,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Sparkles,
  Maximize2,
  Radio,
  ArrowRight,
  RotateCcw,
} from 'lucide-react';

interface FlightTelemetry {
  flightNo: string;
  aircraft: string;
  from: string;
  fromCode: string;
  to: string;
  toCode: string;
  altitude: string;
  speed: string;
  heading: string;
  progress: number; // percentage
  status: string;
  cargo: string;
}

const ACTIVE_FLIGHTS: FlightTelemetry[] = [
  {
    flightNo: 'NUB-804',
    aircraft: 'Boeing 777F Nubimart Cargo Express',
    from: 'Lagos Murtala Muhammed',
    fromCode: 'LOS',
    to: 'London Heathrow',
    toCode: 'LHR',
    altitude: '37,000 FT (FL370)',
    speed: '512 KTS • MACH 0.83',
    heading: '348° NW',
    progress: 74,
    status: 'Cruising • International Escrow Sealed',
    cargo: '18.4t Aso-Oke, Luxury Textiles & Agro',
  },
  {
    flightNo: 'NUB-512',
    aircraft: 'Boeing 747-8F Heavy Global Freighter',
    from: 'Shenzhen Baoan',
    fromCode: 'SZX',
    to: 'Lagos Hub',
    toCode: 'LOS',
    altitude: '39,000 FT (FL390)',
    speed: '535 KTS • MACH 0.85',
    heading: '265° W',
    progress: 58,
    status: 'Direct Sourcing Transit • Cleared Customs',
    cargo: '34.2t Smart Electronics, OEM Devices',
  },
  {
    flightNo: 'NUB-220',
    aircraft: 'Airbus A330-200F Continental Cargo',
    from: 'Dubai World Central',
    fromCode: 'DWC',
    to: 'New York JFK',
    toCode: 'JFK',
    altitude: '38,000 FT (FL380)',
    speed: '498 KTS • MACH 0.82',
    heading: '298° NW',
    progress: 86,
    status: 'Transatlantic Descent Approaching JFK',
    cargo: '22.1t Dubai Gold, Perfumery & Horology',
  },
];

export function HeroAirplaneMotion() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [flightIndex, setFlightIndex] = useState(0);
  const [cameraView, setCameraView] = useState<'cruise' | 'cockpit' | 'wide'>('cruise');
  const [isAudioMuted, setIsAudioMuted] = useState(true);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const noiseNodeRef = useRef<AudioNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const currentFlight = ACTIVE_FLIGHTS[flightIndex];

  // Rotate through active flights periodically
  useEffect(() => {
    const timer = setInterval(() => {
      setFlightIndex((prev) => (prev + 1) % ACTIVE_FLIGHTS.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  // Web Audio API ambient sound generator (jet cabin hum)
  const toggleAudio = () => {
    if (isAudioMuted) {
      try {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioContextClass();
        audioCtxRef.current = ctx;

        // Pink noise generator for gentle aerodynamic wind/jet engine rush
        const bufferSize = ctx.sampleRate * 2;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.96900 * b2 + white * 0.1538520;
          b3 = 0.86650 * b3 + white * 0.3104856;
          b4 = 0.55000 * b4 + white * 0.5329522;
          b5 = -0.7616 * b5 - white * 0.0168980;
          output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
          output[i] *= 0.035; // keep whisper quiet
          b6 = white * 0.115926;
        }

        const whiteNoise = ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;

        // Lowpass filter to mimic pressurized cabin engine sound
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(320, ctx.currentTime);

        const gainNode = ctx.createGain();
        gainNode.gain.setValueAtTime(0.04, ctx.currentTime);

        whiteNoise.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);

        whiteNoise.start();
        noiseNodeRef.current = whiteNoise;
        gainNodeRef.current = gainNode;
        setIsAudioMuted(false);
      } catch (e) {
        console.warn('Audio not allowed without interaction:', e);
      }
    } else {
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
        audioCtxRef.current = null;
      }
      setIsAudioMuted(true);
    }
  };

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  // Smooth mouse flight interaction
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseOffset({
      x: x * 14, // slight lateral drift
      y: y * 10, // slight altitude control
    });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
    setIsHovering(false);
  };

  // Dynamic zoom/scale based on camera view
  const cameraScale =
    cameraView === 'cockpit'
      ? 'scale-125 translate-x-3 -translate-y-2'
      : cameraView === 'wide'
      ? 'scale-95'
      : 'scale-105';

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-lg mx-auto rounded-3xl bg-navy-900 border border-navy-700/90 shadow-2xl overflow-hidden transition-all duration-300 group select-none"
      style={{ minHeight: '510px' }}
    >
      {/* 1. Top HUD Header Bar */}
      <div className="absolute top-0 inset-x-0 z-30 flex items-center justify-between px-4 py-3 bg-gradient-to-b from-navy-950/95 via-navy-950/80 to-transparent backdrop-blur-xs border-b border-navy-800/60">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <span className="text-[10px] sm:text-[11px] font-bold text-white uppercase tracking-wider flex items-center gap-1.5 font-mono">
            <span>LIVE AIR FREIGHT</span>
            <span className="text-slate-500">•</span>
            <span className="text-gold-400">{currentFlight.flightNo}</span>
          </span>
        </div>

        {/* Live Route Codes */}
        <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-300 bg-navy-950/90 px-2.5 py-1 rounded-full border border-navy-800 shadow-inner">
          <span className="font-bold text-white">{currentFlight.fromCode}</span>
          <Plane className="w-3 h-3 text-brand-400 rotate-90" />
          <span className="font-bold text-gold-400">{currentFlight.toCode}</span>
        </div>
      </div>

      {/* 2. Main Motion Video Viewport */}
      <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] overflow-hidden bg-slate-950">
        {/* Dynamic Atmospheric Sunset Sky Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 via-sky-900/30 to-navy-950 pointer-events-none z-10 mix-blend-overlay" />

        {/* Moving Cloud Stream Layer 1 (Background Distant Parallax) */}
        <div
          className={`absolute -inset-x-full inset-y-0 opacity-40 pointer-events-none z-0 ${
            isPlaying ? 'animate-cloud-stream-slow' : ''
          }`}
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 50%, rgba(254, 243, 199, 0.45) 0%, transparent 40%), radial-gradient(circle at 70% 30%, rgba(253, 230, 138, 0.35) 0%, transparent 50%)',
            backgroundSize: '100% 100%',
          }}
        />

        {/* 3. The Logistics Airplane with Nubimart Livery (Gentle Motion & Pitch) */}
        <div
          className="relative w-full h-full transition-transform duration-500 ease-out z-10"
          style={{
            transform: isHovering
              ? `translate(${mouseOffset.x}px, ${mouseOffset.y}px) rotate(${mouseOffset.x * 0.35}deg)`
              : 'translate(0px, 0px)',
          }}
        >
          <div
            className={`relative w-full h-full transition-all duration-700 ease-out ${cameraScale} ${
              isPlaying ? 'animate-plane-glide' : ''
            }`}
          >
            <Image
              src="/images/nubimart/airplane.jpg"
              alt="Nubimart Cargo Logistics Airplane Boeing 777F in flight"
              fill
              className="object-cover object-center scale-105"
              priority
            />

            {/* Jet Engine Afterglow / Heat Exhaust Animation */}
            <div
              className={`absolute bottom-[28%] left-[54%] w-12 h-6 bg-radial from-amber-400/80 via-orange-500/40 to-transparent blur-md rounded-full pointer-events-none ${
                isPlaying ? 'animate-jet-pulse' : ''
              }`}
            />

            {/* Animated Wingtip Red Port Navigation Light */}
            <div className="absolute top-[21%] left-[8%] w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_8px_#f43f5e] pointer-events-none" />

            {/* Animated Anti-Collision Strobe Flash Light (Wingtip & Tail) */}
            <div
              className={`absolute top-[21%] left-[8%] w-3 h-3 rounded-full bg-white blur-[1px] pointer-events-none ${
                isPlaying ? 'animate-strobe-flash' : 'opacity-0'
              }`}
            />
            <div
              className={`absolute top-[16%] right-[22%] w-3 h-3 rounded-full bg-white blur-[1px] pointer-events-none ${
                isPlaying ? 'animate-strobe-flash' : 'opacity-0'
              }`}
            />

            {/* Animated Vapor Contrails Streaming into Horizon */}
            <div
              className={`absolute bottom-[25%] right-0 w-1/3 h-1 bg-gradient-to-l from-white/70 via-white/30 to-transparent blur-sm rounded-full pointer-events-none ${
                isPlaying ? 'animate-contrail-flow' : ''
              }`}
            />
          </div>
        </div>

        {/* Moving Fast Fore-Clouds Layer (Adds forward airspeed depth) */}
        <div
          className={`absolute inset-0 pointer-events-none z-20 opacity-25 mix-blend-screen ${
            isPlaying ? 'animate-cloud-stream-fast' : ''
          }`}
          style={{
            backgroundImage:
              'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 45%, transparent 70%)',
            backgroundSize: '200% 100%',
          }}
        />

        {/* Video Camera View & Audio Control Strip */}
        <div className="absolute bottom-3 right-3 z-30 flex items-center gap-1.5 bg-navy-950/85 backdrop-blur-md px-2.5 py-1.5 rounded-2xl border border-navy-700/80 shadow-lg text-[10px] text-white">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            title={isPlaying ? 'Pause Motion Flight' : 'Resume Motion Flight'}
            className="p-1 rounded-lg hover:bg-navy-800 text-slate-300 hover:text-white transition-colors"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-brand-400" />}
          </button>

          <button
            onClick={toggleAudio}
            title={isAudioMuted ? 'Listen to Jet Cabin Sound' : 'Mute Sound'}
            className="p-1 rounded-lg hover:bg-navy-800 text-slate-300 hover:text-white transition-colors"
          >
            {isAudioMuted ? <VolumeX className="w-3.5 h-3.5 text-slate-400" /> : <Volume2 className="w-3.5 h-3.5 text-gold-400 animate-pulse" />}
          </button>

          <span className="text-navy-700">|</span>

          {/* Camera Angles */}
          <div className="flex items-center gap-1 font-mono text-[9px]">
            <button
              onClick={() => setCameraView('cruise')}
              className={`px-1.5 py-0.5 rounded transition-all ${
                cameraView === 'cruise' ? 'bg-brand-600 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              CRUISE
            </button>
            <button
              onClick={() => setCameraView('cockpit')}
              className={`px-1.5 py-0.5 rounded transition-all ${
                cameraView === 'cockpit' ? 'bg-brand-600 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              CLOSE
            </button>
            <button
              onClick={() => setCameraView('wide')}
              className={`px-1.5 py-0.5 rounded transition-all ${
                cameraView === 'wide' ? 'bg-brand-600 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              WIDE
            </button>
          </div>
        </div>

        {/* Live Escrow Badge */}
        <div className="absolute bottom-3 left-3 z-30 flex items-center gap-1.5 bg-navy-950/85 backdrop-blur-md px-2.5 py-1.5 rounded-2xl border border-brand-500/40 shadow-lg text-[10px] text-emerald-400 font-bold">
          <ShieldCheck className="w-3.5 h-3.5 text-brand-400" />
          <span>ESCROW AIR CARGO</span>
        </div>
      </div>

      {/* 3. Bottom Flight Telemetry HUD Deck */}
      <div className="p-4 bg-navy-950 border-t border-navy-800 space-y-3">
        {/* Origin & Destination Route */}
        <div className="flex items-center justify-between text-xs">
          <div>
            <div className="text-[10px] text-slate-400 font-mono">ORIGIN</div>
            <div className="font-bold text-white text-xs sm:text-sm">{currentFlight.from}</div>
          </div>
          <div className="flex flex-col items-center px-3">
            <span className="text-[10px] font-mono text-gold-400 font-bold">{currentFlight.speed}</span>
            <div className="w-20 sm:w-28 h-0.5 bg-navy-800 relative my-1">
              <div
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-brand-500 to-gold-400 transition-all duration-500"
                style={{ width: `${currentFlight.progress}%` }}
              />
              <Plane
                className="w-3 h-3 text-gold-400 absolute top-1/2 -translate-y-1/2 -translate-x-1/2 transition-all duration-500"
                style={{ left: `${currentFlight.progress}%` }}
              />
            </div>
            <span className="text-[9px] text-slate-400 font-mono">{currentFlight.progress}% Waypoint Reached</span>
          </div>
          <div className="text-right">
            <div className="text-[10px] text-slate-400 font-mono">DESTINATION</div>
            <div className="font-bold text-gold-400 text-xs sm:text-sm">{currentFlight.to}</div>
          </div>
        </div>

        {/* Real-Time Flight Instrumentation */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-navy-900 text-center text-[10px] font-mono">
          <div className="p-2 rounded-xl bg-navy-900/80 border border-navy-800">
            <span className="text-slate-400 block text-[9px]">CRUISE ALTITUDE</span>
            <span className="text-white font-bold">{currentFlight.altitude}</span>
          </div>
          <div className="p-2 rounded-xl bg-navy-900/80 border border-navy-800">
            <span className="text-slate-400 block text-[9px]">HEADING</span>
            <span className="text-brand-400 font-bold">{currentFlight.heading}</span>
          </div>
          <div className="p-2 rounded-xl bg-navy-900/80 border border-navy-800">
            <span className="text-slate-400 block text-[9px]">AIRCRAFT</span>
            <span className="text-white font-bold truncate block">B777-Freighter</span>
          </div>
        </div>

        {/* Cargo Manifest & Live Track CTA */}
        <div className="pt-1 flex items-center justify-between text-xs">
          <div className="truncate max-w-[240px] text-[11px] text-slate-400">
            <span className="font-semibold text-slate-300">Payload: </span>
            <span>{currentFlight.cargo}</span>
          </div>

          <Link
            href="/track-your-order"
            className="px-3.5 py-1.5 rounded-xl bg-navy-900 hover:bg-navy-800 text-brand-400 hover:text-white font-bold text-[11px] border border-navy-700 transition-colors flex items-center gap-1 shrink-0"
          >
            <span>Track Flight</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
