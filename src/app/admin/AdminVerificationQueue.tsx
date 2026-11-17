'use client';

import React, { useState } from 'react';
import { ShieldCheck, Check, X, Building, Globe, ExternalLink, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface Props {
  pendingSellers: any[];
}

export function AdminVerificationQueue({ pendingSellers: initialSellers }: Props) {
  const [sellers, setSellers] = useState(initialSellers);
  const [actionId, setActionId] = useState<string | null>(null);

  const handleAction = async (sellerId: string, action: 'APPROVE' | 'REJECT') => {
    setActionId(sellerId);
    try {
      const res = await fetch(`/api/admin/sellers/${sellerId}/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, reason: action === 'APPROVE' ? 'KYC verified valid' : 'Incomplete registry documents' }),
      });

      if (res.ok) {
        setSellers((prev) => prev.filter((s) => s.id !== sellerId));
      }
    } catch (e) {
      console.error('Verification error:', e);
    } finally {
      setActionId(null);
    }
  };

  if (sellers.length === 0) {
    return (
      <div className="p-8 text-center text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-navy-800 rounded-2xl border border-slate-200 dark:border-navy-700 transition-colors">
        All seller KYC verification applications have been reviewed. Queue is clear!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {sellers.map((seller) => (
        <div
          key={seller.id}
          className="p-5 rounded-2xl bg-white dark:bg-navy-850 border border-slate-200 dark:border-navy-700 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors"
        >
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-slate-900 dark:text-white">{seller.businessName}</span>
              <Badge variant="warning" size="sm">
                KYC Awaiting Review
              </Badge>
            </div>

            <div className="text-xs text-slate-600 dark:text-slate-300 flex flex-wrap gap-x-4 gap-y-1">
              <span>Owner: <strong className="text-slate-800 dark:text-slate-100">{seller.user.name}</strong> ({seller.user.email})</span>
              <span>Country: <strong className="text-slate-800 dark:text-slate-100">{seller.countryCode}</strong></span>
              <span>Reg: <strong className="font-mono text-slate-800 dark:text-slate-100">{seller.regNumber}</strong></span>
              <span>TIN: <strong className="font-mono text-slate-800 dark:text-slate-100">{seller.taxId}</strong></span>
            </div>

            <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-3 pt-1">
              <span>Bank: {seller.bankName} ({seller.bankAccountNumber})</span>
              <span>&bull;</span>
              <a
                href={seller.idDocumentUrl}
                target="_blank"
                rel="noreferrer"
                className="text-brand-600 dark:text-brand-400 font-bold hover:underline inline-flex items-center gap-0.5"
              >
                <span>View ID Document</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Button
              onClick={() => handleAction(seller.id, 'REJECT')}
              variant="outline"
              size="sm"
              isLoading={actionId === seller.id}
              className="text-rose-600 hover:bg-rose-50 border-rose-200 dark:border-rose-900 dark:hover:bg-rose-950/40 dark:text-rose-400"
              icon={<X className="w-4 h-4" />}
            >
              Reject
            </Button>

            <Button
              onClick={() => handleAction(seller.id, 'APPROVE')}
              variant="primary"
              size="sm"
              isLoading={actionId === seller.id}
              icon={<Check className="w-4 h-4" />}
            >
              Approve KYC
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
