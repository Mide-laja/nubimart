import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { getSession } from '@/lib/auth/jwt';
import { slugify } from '@/lib/utils/formatters';
import { z } from 'zod';

const sellerOnboardSchema = z.object({
  businessName: z.string().min(2),
  businessType: z.string(),
  regNumber: z.string().min(2),
  taxId: z.string().min(2),
  countryCode: z.string().length(2),
  storeName: z.string().min(2),
  storeDescription: z.string().min(5),
  bankName: z.string().min(2),
  bankAccountNumber: z.string().min(5),
  bankAccountName: z.string().min(2),
  idDocumentUrl: z.string().optional(),
  proofOfAddressUrl: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Please sign in to register as a seller' }, { status: 401 });
    }

    const body = await req.json();
    const result = sellerOnboardSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid application form data', details: result.error.format() },
        { status: 400 }
      );
    }

    const data = result.data;
    const baseSlug = slugify(data.storeName);
    const storeSlug = `${baseSlug}-${Math.floor(100 + Math.random() * 900)}`;

    const existingProfile = await prisma.sellerProfile.findUnique({
      where: { userId: session.userId },
    });

    if (existingProfile) {
      return NextResponse.json(
        { error: 'You have already submitted a seller application for this account.' },
        { status: 400 }
      );
    }

    // Create seller profile and store
    const newProfile = await prisma.sellerProfile.create({
      data: {
        userId: session.userId,
        businessName: data.businessName,
        businessType: data.businessType,
        regNumber: data.regNumber,
        taxId: data.taxId,
        countryCode: data.countryCode,
        verificationStatus: 'SUBMITTED', // Must await admin approval!
        bankName: data.bankName,
        bankAccountNumber: data.bankAccountNumber,
        bankAccountName: data.bankAccountName,
        idDocumentUrl: data.idDocumentUrl,
        proofOfAddressUrl: data.proofOfAddressUrl,
        store: {
          create: {
            name: data.storeName,
            slug: storeSlug,
            description: data.storeDescription,
            isActive: false, // Activated once admin approves KYC!
          },
        },
      },
      include: { store: true },
    });

    // Update user role to SELLER
    await prisma.user.update({
      where: { id: session.userId },
      data: { role: 'SELLER' },
    });

    // Create Audit Log
    await prisma.auditLog.create({
      data: {
        userId: session.userId,
        action: 'SELLER_APPLICATION_SUBMITTED',
        resource: 'SellerProfile',
        resourceId: newProfile.id,
        detailsJson: JSON.stringify({ businessName: data.businessName, country: data.countryCode }),
      },
    });

    return NextResponse.json({ success: true, profile: newProfile });
  } catch (error) {
    console.error('Seller onboard error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
