import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { getSession } from '@/lib/auth/jwt';
import { z } from 'zod';

const payoutSchema = z.object({
  amount: z.number().positive('Withdrawal amount must be greater than zero'),
});

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session || (session.role !== 'SELLER' && session.role !== 'ADMIN')) {
      return NextResponse.json({ error: 'Unauthorized: Seller account required' }, { status: 403 });
    }

    const seller = await prisma.sellerProfile.findUnique({
      where: { userId: session.userId },
    });

    if (!seller) {
      return NextResponse.json({ error: 'Seller profile not found' }, { status: 404 });
    }

    const body = await req.json();
    const result = payoutSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid payout amount', details: result.error.format() },
        { status: 400 }
      );
    }

    const { amount } = result.data;

    if (amount > seller.walletBalance) {
      return NextResponse.json(
        { error: `Insufficient funds. Your available balance is $${seller.walletBalance.toFixed(2)}.` },
        { status: 400 }
      );
    }

    // Atomic transaction: Deduct balance and record payout request
    const payout = await prisma.$transaction(async (tx) => {
      await tx.sellerProfile.update({
        where: { id: seller.id },
        data: {
          walletBalance: seller.walletBalance - amount,
        },
      });

      return tx.sellerPayout.create({
        data: {
          sellerProfileId: seller.id,
          amount,
          currencyCode: 'USD',
          status: 'REQUESTED',
          bankDetailsJson: JSON.stringify({
            bankName: seller.bankName,
            accountNumber: seller.bankAccountNumber,
            accountName: seller.bankAccountName,
          }),
        },
      });
    });

    return NextResponse.json({ success: true, payout });
  } catch (error) {
    console.error('Payout request error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
