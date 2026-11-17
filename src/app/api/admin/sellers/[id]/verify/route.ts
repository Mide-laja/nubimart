import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { getSession } from '@/lib/auth/jwt';
import { z } from 'zod';

const verifySchema = z.object({
  action: z.enum(['APPROVE', 'REJECT', 'SUSPEND']),
  reason: z.string().optional(),
});

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession();
    if (!session || session.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized: Admin privileges required' }, { status: 403 });
    }

    const { id } = params;
    const body = await req.json();
    const result = verifySchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: 'Invalid verification action' }, { status: 400 });
    }

    const { action, reason } = result.data;

    const sellerProfile = await prisma.sellerProfile.findUnique({
      where: { id },
      include: { store: true },
    });

    if (!sellerProfile) {
      return NextResponse.json({ error: 'Seller profile not found' }, { status: 404 });
    }

    let status = 'VERIFIED';
    let isStoreActive = true;

    if (action === 'REJECT') {
      status = 'REJECTED';
      isStoreActive = false;
    } else if (action === 'SUSPEND') {
      status = 'SUSPENDED';
      isStoreActive = false;
    }

    // Update Seller Profile & Store
    const updated = await prisma.$transaction(async (tx) => {
      const profile = await tx.sellerProfile.update({
        where: { id },
        data: {
          verificationStatus: status,
          rejectionReason: reason || null,
        },
      });

      if (sellerProfile.store) {
        await tx.store.update({
          where: { id: sellerProfile.store.id },
          data: { isActive: isStoreActive },
        });
      }

      // Record Audit Log
      await tx.auditLog.create({
        data: {
          userId: session.userId,
          action: `SELLER_KYC_${action}`,
          resource: 'SellerProfile',
          resourceId: id,
          detailsJson: JSON.stringify({
            adminEmail: session.email,
            previousStatus: sellerProfile.verificationStatus,
            newStatus: status,
            reason,
          }),
        },
      });

      return profile;
    });

    return NextResponse.json({ success: true, profile: updated });
  } catch (error) {
    console.error('Admin seller verify error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
