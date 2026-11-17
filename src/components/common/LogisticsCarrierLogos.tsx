'use client';

import React from 'react';

/**
 * 1. Authentic DHL Express Vector Logo
 */
export function DHLLogo({ className = 'h-6 w-auto' }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="DHL Express">
      <rect width="160" height="48" rx="8" fill="#FFCC00" />
      {/* Red speed stripes left */}
      <line x1="8" y1="16" x2="32" y2="16" stroke="#D40511" strokeWidth="2.8" strokeLinecap="round" />
      <line x1="12" y1="24" x2="30" y2="24" stroke="#D40511" strokeWidth="2.8" strokeLinecap="round" />
      <line x1="16" y1="32" x2="26" y2="32" stroke="#D40511" strokeWidth="2.8" strokeLinecap="round" />
      {/* DHL Italic Wordmark */}
      <path
        d="M40 36L44.5 12H55C60 12 63.5 14.8 62.2 20C61 25 57 27.5 52.5 27.5H47.5L46 36H40ZM47.8 23H51.5C54 23 55.8 21.8 56.4 19.5C57 17.2 55.8 16.5 53.5 16.5H49.2L47.8 23ZM64 36L68.5 12H75L72.2 22.5H81.8L84.5 12H91L86.5 36H80L82.8 27H73.2L70.5 36H64ZM92.5 36L97 12H103.5L100 31H112L111 36H92.5Z"
        fill="#D40511"
      />
      {/* Red speed stripes right */}
      <line x1="130" y1="16" x2="152" y2="16" stroke="#D40511" strokeWidth="2.8" strokeLinecap="round" />
      <line x1="132" y1="24" x2="148" y2="24" stroke="#D40511" strokeWidth="2.8" strokeLinecap="round" />
      <line x1="134" y1="32" x2="144" y2="32" stroke="#D40511" strokeWidth="2.8" strokeLinecap="round" />
    </svg>
  );
}

/**
 * 2. Authentic FedEx Vector Logo (Purple Fed + Orange Ex)
 */
export function FedExLogo({ className = 'h-6 w-auto' }: { className?: string }) {
  return (
    <svg viewBox="0 0 145 44" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="FedEx">
      {/* Fed (Purple #4D148C) */}
      <path d="M10 8H35V15.5H19.5V22H32V29H19.5V36H10V8Z" fill="#4D148C" />
      <path d="M47 18C40.5 18 36.5 22.2 36.5 27.2C36.5 32.2 40.8 36.5 47.2 36.5C51.5 36.5 55 34.5 57 32L52 28.5C50.8 30 49.2 31 47.2 31C44.5 31 42.8 29.5 42.5 27.2H58C58.2 26.2 58.2 25.2 58.2 24.2C58.2 20 54.5 18 47 18ZM42.5 23.8C43 21.8 44.5 20.8 47.2 20.8C49.8 20.8 51.5 21.8 52 23.8H42.5Z" fill="#4D148C" />
      <path d="M68 36V8H74.5V19C76 17 79 15.5 82.5 15.5C88.5 15.5 92.5 19.8 92.5 26C92.5 32.2 88.5 36.5 82 36.5C78.8 36.5 76 34.8 74.5 32.5V36H68ZM74.5 26C74.5 29.8 77.2 32 80.5 32C83.8 32 86.2 29.8 86.2 26C86.2 22.2 83.8 20 80.5 20C77.2 20 74.5 22.2 74.5 26Z" fill="#4D148C" />
      {/* Ex (Orange #FF6600) with subtle arrow space */}
      <path d="M103 18C96.5 18 92.5 22.2 92.5 27.2C92.5 32.2 96.8 36.5 103.2 36.5C107.5 36.5 111 34.5 113 32L108 28.5C106.8 30 105.2 31 103.2 31C100.5 31 98.8 29.5 98.5 27.2H114C114.2 26.2 114.2 25.2 114.2 24.2C114.2 20 110.5 18 103 18ZM98.5 23.8C99 21.8 100.5 20.8 103.2 20.8C105.8 20.8 107.5 21.8 108 23.8H98.5Z" fill="#FF6600" />
      <path d="M112 18.5H120L125.5 26.5L131 18.5H139L130 29.5L139.5 36H131.5L125.5 29.8L119.5 36H111.5L121 29.5L112 18.5Z" fill="#FF6600" />
    </svg>
  );
}

/**
 * 3. Authentic UPS Shield & Wordmark Logo (Brown #351C15 + Gold #FFB500)
 */
export function UPSLogo({ className = 'h-7 w-auto' }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 110" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="UPS">
      {/* Shield base Brown */}
      <path d="M50 106C50 106 12 85 12 40V12L50 4L88 12V40C88 85 50 106 50 106Z" fill="#351C15" />
      {/* Gold Upper Crest */}
      <path d="M50 4L12 12V25C12 25 32 31 50 31C68 31 88 25 88 25V12L50 4Z" fill="#FFB500" />
      {/* Lower gold accent arc */}
      <path d="M12 25V38C12 38 32 44 50 44C68 44 88 38 88 38V25C88 25 68 31 50 31C32 31 12 25 12 25Z" fill="#B38914" opacity="0.6" />
      {/* UPS Letters in Gold */}
      {/* u */}
      <path d="M25 46V64C25 68.5 28 71 32 71C36 71 39 68.5 39 64V46H44V64C44 71.5 39 75 32 75C25 75 20 71.5 20 64V46H25Z" fill="#FFB500" />
      {/* p */}
      <path d="M47 46H57.5C63 46 66.5 49 66.5 54C66.5 59 63 62 57.5 62H52.5V78H47V46ZM52.5 57.5H57C59.5 57.5 61 56 61 54C61 52 59.5 50.5 57 50.5H52.5V57.5Z" fill="#FFB500" />
      {/* s */}
      <path d="M77 50.5C75.5 49.2 73 48.5 70.5 48.5C68 48.5 66.5 49.5 66.5 51C66.5 52.5 68 53.2 71 54C75 55 78.5 56.5 78.5 60.5C78.5 64.8 74.8 67 70 67C66.2 67 63 65.5 61.2 64L63.5 60C65.2 61.5 67.8 62.5 70 62.5C72.8 62.5 74.2 61.5 74.2 59.8C74.2 58.2 72.8 57.5 69.8 56.8C65.5 55.8 62.2 54 62.2 50.2C62.2 46.5 65.8 44 70.2 44C73.5 44 76.5 45.2 78.5 46.8L77 50.5Z" fill="#FFB500" />
    </svg>
  );
}

/**
 * 4. Authentic Aramex Vector Logo (Signature Red #E31837)
 */
export function AramexLogo({ className = 'h-6 w-auto' }: { className?: string }) {
  return (
    <svg viewBox="0 0 155 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Aramex">
      {/* a */}
      <path d="M15 14C9.5 14 5.5 17.5 5.5 23C5.5 28.5 9.5 32 15 32C18 32 20.5 30.8 22 28.8V31.5H27V14.5H22V17.2C20.5 15.2 18 14 15 14ZM16.2 27.5C12.5 27.5 10.5 25.2 10.5 23C10.5 20.8 12.5 18.5 16.2 18.5C19.8 18.5 22 20.8 22 23C22 25.2 19.8 27.5 16.2 27.5Z" fill="#E31837" />
      {/* r */}
      <path d="M31 14.5H36V18.2C37.2 15.8 39.8 14.2 43 14.5V19.8C39.5 19.5 36 20.8 36 25.5V31.5H31V14.5Z" fill="#E31837" />
      {/* a */}
      <path d="M53 14C47.5 14 43.5 17.5 43.5 23C43.5 28.5 47.5 32 53 32C56 32 58.5 30.8 60 28.8V31.5H65V14.5H60V17.2C58.5 15.2 56 14 53 14ZM54.2 27.5C50.5 27.5 48.5 25.2 48.5 23C48.5 20.8 50.5 18.5 54.2 18.5C57.8 18.5 60 20.8 60 23C60 25.2 57.8 27.5 54.2 27.5Z" fill="#E31837" />
      {/* m */}
      <path d="M70 14.5H75V17.5C76.5 15.2 79.2 14 82.2 14C85.5 14 88 15.8 89 18.8C90.5 15.8 93.5 14 97 14C101.5 14 104 16.8 104 21.8V31.5H99V22.5C99 19.8 97.8 18.5 95.5 18.5C93 18.5 91.5 20 91.5 22.8V31.5H86.5V22.5C86.5 19.8 85.2 18.5 83 18.5C80.5 18.5 79 20 79 22.8V31.5H74V14.5H70Z" fill="#E31837" />
      {/* e */}
      <path d="M116 14C109.5 14 105.5 18 105.5 23C105.5 28 109.5 32 116 32C120 32 123 30.5 124.8 28.2L121 25.2C120 26.5 118.5 27.5 116 27.5C113 27.5 111 26 110.8 24H126C126.2 23.2 126.2 22.5 126.2 21.8C126.2 17.5 122.5 14 116 14ZM110.8 20.8C111.2 18.8 113 17.8 116 17.8C119 17.8 120.8 18.8 121.2 20.8H110.8Z" fill="#E31837" />
      {/* x */}
      <path d="M128 14.5H134L139 22L144 14.5H150L142.5 23.5L150.5 31.5H144.5L139 25L133.5 31.5H127.5L135.5 23.5L128 14.5Z" fill="#E31837" />
    </svg>
  );
}

/**
 * 5. Carrier Badge Wrapper with Logo + Text Label
 */
export function CarrierLogoBadge({
  carrier,
  subtext,
  darkTheme = false,
}: {
  carrier: 'dhl' | 'ups' | 'fedex' | 'aramex';
  subtext?: string;
  darkTheme?: boolean;
}) {
  return (
    <div
      className={`p-3.5 rounded-2xl flex flex-col items-center justify-between transition-all duration-200 group text-center ${
        darkTheme
          ? 'bg-slate-800/90 border border-slate-700/80 hover:border-slate-500 shadow-sm'
          : 'bg-white border border-slate-200 hover:border-navy-950/40 hover:shadow-md'
      }`}
    >
      {/* Logo Container with clean white background so brand colors pop */}
      <div className="h-10 w-full flex items-center justify-center bg-white rounded-xl px-2.5 py-1 shadow-2xs border border-slate-100">
        {carrier === 'dhl' && <DHLLogo className="h-6 w-auto object-contain" />}
        {carrier === 'ups' && <UPSLogo className="h-7 w-auto object-contain" />}
        {carrier === 'fedex' && <FedExLogo className="h-6 w-auto object-contain" />}
        {carrier === 'aramex' && <AramexLogo className="h-5 w-auto object-contain" />}
      </div>

      {subtext && (
        <span
          className={`text-[11px] font-medium mt-2 leading-tight ${
            darkTheme ? 'text-slate-300' : 'text-slate-500'
          }`}
        >
          {subtext}
        </span>
      )}
    </div>
  );
}
