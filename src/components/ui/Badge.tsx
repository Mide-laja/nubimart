import React from 'react';
import { cn } from '../../lib/utils/cn';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'brand' | 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'gold';
  size?: 'sm' | 'md';
}

export function Badge({ className, variant = 'neutral', size = 'md', children, ...props }: BadgeProps) {
  const base = 'inline-flex items-center font-medium rounded-full select-none';

  const variants = {
    brand: 'bg-brand-50 text-brand-800 border border-brand-200 dark:bg-brand-950/60 dark:text-brand-300 dark:border-brand-800',
    success: 'bg-brand-50 text-brand-800 border border-brand-200 dark:bg-brand-950/60 dark:text-brand-300 dark:border-brand-800',
    warning: 'bg-amber-50 text-amber-800 border border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800',
    danger: 'bg-rose-50 text-rose-700 border border-rose-200 dark:bg-rose-950/50 dark:text-rose-300 dark:border-rose-800',
    info: 'bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-800',
    neutral: 'bg-slate-100 text-slate-700 border border-slate-200 dark:bg-navy-850 dark:text-slate-300 dark:border-navy-700',
    gold: 'bg-gold-50 text-gold-800 border border-gold-200 dark:bg-gold-950/50 dark:text-gold-300 dark:border-gold-800',
  };

  const sizes = {
    sm: 'text-xs px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
  };

  return (
    <span className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </span>
  );
}
