import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth/jwt';
import { prisma } from '@/lib/db/prisma';
import { SellerWalletClient } from './SellerWalletClient';
import { ArrowLeft } from 'lucide-react';

export const revalidate = 0;

export default async function SellerWalletPage() {
  const session = await getSession();
  if (!session) {
    redirect('/login');
  }

  const seller = await prisma.sellerProfile.findUnique({
    where: { userId: session.userId },
    include: {
      payouts: {
        orderBy: { requestedAt: 'desc' },
      },
    },
  });

  if (!seller) {
    redirect('/become-seller');
  }

  const serializedPayouts = seller.payouts.map((p) => ({
    ...p,
    requestedAt: p.requestedAt.toISOString(),
    processedAt: p.processedAt?.toISOString() || null,
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <Link href="/seller" className="text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 flex items-center gap-1 mb-2">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Seller Dashboard</span>
        </Link>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Merchant Revenue & Wallet
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Monitor your cross-border earnings, escrow settlements, and withdraw directly to your verified bank account.
        </p>
      </div>

      <SellerWalletClient
        walletBalance={seller.walletBalance}
        pendingBalance={seller.pendingBalance}
        bankDetails={{
          bankName: seller.bankName,
          accountNumber: seller.bankAccountNumber,
          accountName: seller.bankAccountName,
        }}
        payouts={serializedPayouts}
      />
    </div>
  );
}
