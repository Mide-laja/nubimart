'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DollarSign, Clock, ArrowDownLeft, CheckCircle, AlertCircle } from 'lucide-react';
import { formatCurrency, formatDate } from '@/lib/utils/formatters';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';

interface Props {
  walletBalance: number;
  pendingBalance: number;
  bankDetails: {
    bankName: string | null;
    accountNumber: string | null;
    accountName: string | null;
  };
  payouts: any[];
}

export function SellerWalletClient({
  walletBalance: initialBalance,
  pendingBalance,
  bankDetails,
  payouts: initialPayouts,
}: Props) {
  const router = useRouter();
  const [balance, setBalance] = useState(initialBalance);
  const [payouts, setPayouts] = useState(initialPayouts);
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setIsLoading(true);

    const withdrawAmount = parseFloat(amount);
    if (isNaN(withdrawAmount) || withdrawAmount <= 0) {
      setError('Please enter a valid withdrawal amount');
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/seller/payout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: withdrawAmount }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit withdrawal request');
      }

      setBalance((prev) => prev - withdrawAmount);
      setPayouts([data.payout, ...payouts]);
      setSuccess(true);
      setAmount('');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Balance Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-navy-900 rounded-3xl border border-slate-200/80 dark:border-navy-700/80 p-6 sm:p-8 shadow-sm space-y-2 transition-colors">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
            <span>Available for Withdrawal</span>
            <DollarSign className="w-5 h-5 text-brand-600 dark:text-brand-400" />
          </div>
          <div className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
            {formatCurrency(balance, 'USD')}
          </div>
          <p className="text-xs text-slate-400 dark:text-slate-500 pt-1">
            Settled earnings ready for automatic transfer to your bank.
          </p>
        </div>

        <div className="bg-white dark:bg-navy-900 rounded-3xl border border-slate-200/80 dark:border-navy-700/80 p-6 sm:p-8 shadow-sm space-y-2 transition-colors">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
            <span>Pending Escrow Settlement</span>
            <Clock className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          </div>
          <div className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
            {formatCurrency(pendingBalance, 'USD')}
          </div>
          <p className="text-xs text-slate-400 dark:text-slate-500 pt-1">
            Funds automatically release once carrier tracking marks deliveries as complete.
          </p>
        </div>
      </div>

      {/* Withdrawal Form & Payout Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-6 bg-white dark:bg-navy-900 rounded-3xl border border-slate-200/80 dark:border-navy-700/80 p-6 sm:p-8 shadow-sm space-y-6 transition-colors">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-navy-800">
            Request Payout Transfer
          </h2>

          {success && (
            <div className="p-4 rounded-xl bg-brand-50 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-800 text-brand-800 dark:text-brand-300 text-xs flex items-center gap-2">
              <CheckCircle className="w-4 h-4 shrink-0 text-brand-600 dark:text-brand-400" />
              <span>Withdrawal request submitted! Compliance will process disbursement.</span>
            </div>
          )}

          {error && (
            <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleWithdraw} className="space-y-4">
            <Input
              label="Withdrawal Amount (USD)"
              type="number"
              step="0.01"
              required
              max={balance}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="e.g. 500.00"
            />

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-navy-800/80 border border-slate-200 dark:border-navy-700 text-xs space-y-1">
              <span className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Destination Bank Account:</span>
              <p className="text-slate-600 dark:text-slate-400">Bank: <strong className="text-slate-900 dark:text-slate-100">{bankDetails.bankName || 'Not Set'}</strong></p>
              <p className="text-slate-600 dark:text-slate-400">Account: <strong className="text-slate-900 dark:text-slate-100">{bankDetails.accountNumber || 'Not Set'}</strong></p>
              <p className="text-slate-600 dark:text-slate-400">Name: <strong className="text-slate-900 dark:text-slate-100">{bankDetails.accountName || 'Not Set'}</strong></p>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              className="w-full"
              isLoading={isLoading}
              disabled={balance <= 0}
            >
              Withdraw {amount ? `$${parseFloat(amount).toFixed(2)}` : 'Funds'}
            </Button>
          </form>
        </div>

        {/* Payout History */}
        <div className="lg:col-span-6 bg-white dark:bg-navy-900 rounded-3xl border border-slate-200/80 dark:border-navy-700/80 p-6 sm:p-8 shadow-sm space-y-4 transition-colors">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-navy-800">
            Payout History
          </h2>

          {payouts.length === 0 ? (
            <div className="text-center py-10 text-xs text-slate-500 dark:text-slate-400">
              No withdrawal requests recorded yet.
            </div>
          ) : (
            <div className="divide-y divide-slate-100 dark:divide-navy-800 text-xs">
              {payouts.map((p) => (
                <div key={p.id} className="py-3 first:pt-0 last:pb-0 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">
                      {formatCurrency(p.amount, p.currencyCode || 'USD')}
                    </div>
                    <div className="text-[11px] text-slate-400 dark:text-slate-500">
                      Requested {formatDate(p.requestedAt)}
                    </div>
                  </div>
                  <Badge
                    variant={p.status === 'COMPLETED' ? 'success' : 'warning'}
                    size="sm"
                  >
                    {p.status}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
