'use client';

import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

interface ThemeToggleProps {
  className?: string;
  size?: 'sm' | 'md';
}

export function ThemeToggle({ className = '', size = 'md' }: ThemeToggleProps) {
  const { resolvedTheme, toggleTheme, mounted } = useTheme();

  // Render a placeholder before mount to avoid hydration mismatch
  if (!mounted) {
    return (
      <div
        className={`p-2 rounded-2xl border border-slate-200 dark:border-[#2a3020] text-slate-400 opacity-50 ${className}`}
        aria-hidden="true"
      >
        <span className="w-4 h-4 block" />
      </div>
    );
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className={`relative p-2.5 rounded-2xl border transition-all duration-200 flex items-center justify-center cursor-pointer ${
        isDark
          ? 'bg-[#1a1f14] hover:bg-[#242b1c] text-gold-400 border-[#2a3020] shadow-sm hover:border-gold-400/40'
          : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 shadow-2xs hover:border-slate-300'
      } ${className}`}
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      {isDark ? (
        <Sun className={`${size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4'} text-gold-400 animate-in spin-in-90 duration-200`} />
      ) : (
        <Moon className={`${size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4'} text-slate-600 hover:text-navy-950 animate-in spin-in-90 duration-200`} />
      )}
    </button>
  );
}
