'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Lock, Mail, ArrowRight, UserCheck, AlertCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to authenticate');
      }

      login(data.user);

      // Redirect according to role
      if (data.user.role === 'ADMIN') {
        router.push('/admin');
      } else if (data.user.role === 'SELLER') {
        router.push('/seller');
      } else {
        router.push('/account');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickLogin = (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail);
    setPassword(demoPass);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-navy-950 transition-colors">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-navy-900 p-8 rounded-2xl border border-slate-200/80 dark:border-navy-700/80 shadow-premium">
        <div className="text-center">
          <div className="mx-auto w-12 h-12 rounded-xl bg-navy-950 dark:bg-navy-800 border dark:border-navy-700 flex items-center justify-center text-white font-black text-2xl shadow-md">
            N
          </div>
          <h2 className="mt-4 text-2xl font-black tracking-tight text-slate-900 dark:text-white">
            Sign in to <span className="text-brand-600 dark:text-brand-400">NUBIMART</span>
          </h2>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Access your orders, multi-country shipments, or merchant dashboard
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <Input
            label="Email Address"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="e.g. customer@nubimart.com"
            icon={<Mail className="w-4 h-4" />}
          />

          <Input
            label="Password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••••••"
            icon={<Lock className="w-4 h-4" />}
          />

          <Button type="submit" variant="primary" className="w-full" size="md" isLoading={isLoading}>
            Sign In to Marketplace
          </Button>
        </form>

        {/* Demo Fast-Login Pills for Testing */}
        <div className="pt-4 border-t border-slate-100 dark:border-navy-800">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase text-slate-400 dark:text-slate-500 mb-2.5">
            <UserCheck className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
            <span>Instant Demo Account Sign-In:</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleQuickLogin('customer@nubimart.com', 'Customer2026!')}
              className="px-2.5 py-1.5 bg-slate-50 hover:bg-slate-100 dark:bg-navy-800 dark:hover:bg-navy-750 border border-slate-200 dark:border-navy-700 rounded-lg text-left text-[11px] transition-colors"
            >
              <div className="font-bold text-slate-900 dark:text-slate-100">Customer</div>
              <div className="text-[9px] text-slate-500 dark:text-slate-400">Sophia K.</div>
            </button>

            <button
              type="button"
              onClick={() => handleQuickLogin('seller@nubimart.com', 'Seller2026!')}
              className="px-2.5 py-1.5 bg-brand-50 hover:bg-brand-100 dark:bg-brand-950/50 dark:hover:bg-brand-900/60 border border-brand-200 dark:border-brand-800 rounded-lg text-left text-[11px] transition-colors"
            >
              <div className="font-bold text-brand-900 dark:text-brand-300">Seller</div>
              <div className="text-[9px] text-brand-700 dark:text-brand-400">Afritex Ltd</div>
            </button>

            <button
              type="button"
              onClick={() => handleQuickLogin('admin@nubimart.com', 'Admin2026!')}
              className="px-2.5 py-1.5 bg-navy-50 hover:bg-navy-100 dark:bg-navy-800 dark:hover:bg-navy-750 border border-navy-200 dark:border-navy-700 rounded-lg text-left text-[11px] transition-colors"
            >
              <div className="font-bold text-navy-950 dark:text-white">Admin</div>
              <div className="text-[9px] text-navy-600 dark:text-slate-400">SuperUser</div>
            </button>
          </div>
        </div>

        <div className="text-center text-xs text-slate-500 dark:text-slate-400">
          Don&apos;t have an account yet?{' '}
          <Link href="/register" className="font-bold text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300">
            Create Customer Account
          </Link>
        </div>
      </div>
    </div>
  );
}
