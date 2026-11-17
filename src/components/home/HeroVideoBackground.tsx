'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface HeroVideoBackgroundProps {
  className?: string;
}

export function HeroVideoBackground({ className = '' }: HeroVideoBackgroundProps) {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlaying = () => {
      setVideoLoaded(true);
    };

    const handleError = () => {
      setVideoFailed(true);
    };

    video.addEventListener('playing', handlePlaying);
    video.addEventListener('error', handleError);

    // Attempt autoplay programmatically to handle strict browser policies
    video.play().catch(() => {
      // Autoplay policy prevented playback, keep motion fallback active
    });

    return () => {
      video.removeEventListener('playing', handlePlaying);
      video.removeEventListener('error', handleError);
    };
  }, []);

  return (
    <div
      className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0 ${className}`}
      aria-hidden="true"
    >
      {/* 1. Underlying Motion Aeroplane Layer (Active continuously or as seamless fallback) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden bg-navy-950">
        {/* Sky Ambient Sunset Warmth */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/15 via-sky-950/40 to-navy-950 pointer-events-none z-10 mix-blend-overlay" />

        {/* Moving Cloud Stream Layer 1 (Background Distant Parallax) */}
        <div
          className="absolute -inset-x-full inset-y-0 opacity-35 pointer-events-none z-0 animate-cloud-stream-slow"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 50%, rgba(254, 243, 199, 0.4) 0%, transparent 45%), radial-gradient(circle at 75% 35%, rgba(253, 230, 138, 0.3) 0%, transparent 55%)',
            backgroundSize: '100% 100%',
          }}
        />

        {/* Animated Boeing 777F Nubimart Cargo Jet (Gentle cruising glide) */}
        <div className="relative w-full h-full">
          <div className="relative w-full h-full animate-plane-glide scale-105">
            <Image
              src="/images/nubimart/airplane.jpg"
              alt="Nubimart Cargo Logistics Jet in flight"
              fill
              priority
              quality={90}
              className="object-cover object-[78%_center] lg:object-[70%_center]"
            />

            {/* Jet Engine Afterglow / Heat Exhaust Animation */}
            <div className="absolute bottom-[28%] left-[54%] w-16 h-8 bg-radial from-amber-400/80 via-orange-500/40 to-transparent blur-md rounded-full pointer-events-none animate-jet-pulse" />

            {/* Animated Wingtip Red Port Navigation Light */}
            <div className="absolute top-[21%] left-[8%] w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_10px_#f43f5e] pointer-events-none" />

            {/* Animated Anti-Collision Strobe Flash Lights */}
            <div className="absolute top-[21%] left-[8%] w-3 h-3 rounded-full bg-white blur-[1px] pointer-events-none animate-strobe-flash" />
            <div className="absolute top-[16%] right-[22%] w-3 h-3 rounded-full bg-white blur-[1px] pointer-events-none animate-strobe-flash" />

            {/* Vapor Contrail Stream */}
            <div className="absolute bottom-[25%] right-0 w-2/5 h-1.5 bg-gradient-to-l from-white/70 via-white/30 to-transparent blur-sm rounded-full pointer-events-none animate-contrail-flow" />
          </div>
        </div>

        {/* Moving Fast Fore-Clouds Layer */}
        <div
          className="absolute inset-0 pointer-events-none z-20 opacity-20 mix-blend-screen animate-cloud-stream-fast"
          style={{
            backgroundImage:
              'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 75%)',
            backgroundSize: '200% 100%',
          }}
        />
      </div>

      {/* 2. HTML5 Full-Bleed Video Element (Covering Entire Container) */}
      {!videoFailed && (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          poster="/images/nubimart/airplane.jpg"
          className={`absolute inset-0 w-full h-full object-cover object-[78%_center] lg:object-[70%_center] pointer-events-none transition-opacity duration-1000 ${
            videoLoaded ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <source src="/images/nubimart/airplane.mp4" type="video/mp4" />
          <source src="/images/nubimart/airplane.webm" type="video/webm" />
        </video>
      )}

      {/* 3. Layered Cinematic Overlays (Above video/image, Below hero content) */}
      {/* 3a. Dark Navy Base Tint */}
      <div className="absolute inset-0 bg-navy-950/45 z-20 pointer-events-none" />

      {/* 3b. Directional Readability Gradient (Stronger dark on left behind text, lighter on right to reveal plane) */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/85 via-50% to-transparent lg:to-navy-950/15 z-20 pointer-events-none" />
      <div className="lg:hidden absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/80 to-navy-950/50 z-20 pointer-events-none" />

      {/* 3c. Cinematic Radial Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(6,13,23,0.7)_100%)] z-20 pointer-events-none" />

      {/* 3d. Subtle Bottom Gradient Blending into Next Section */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-navy-950 z-20 pointer-events-none" />
    </div>
  );
}
