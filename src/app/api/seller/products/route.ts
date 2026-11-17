import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { getSession } from '@/lib/auth/jwt';
import { slugify } from '@/lib/utils/formatters';
import { z } from 'zod';

const createProductSchema = z.object({
  name: z.string().min(3),
  categoryId: z.string().min(1),
  summary: z.string().optional(),
  description: z.string().min(10),
  brand: z.string().optional(),
  basePrice: z.number().positive(),
  salePrice: z.number().positive().optional(),
  sku: z.string().min(3),
  stockQuantity: z.number().int().nonnegative(),
  imageUrl: z.string().url(),
});

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session || (session.role !== 'SELLER' && session.role !== 'ADMIN')) {
      return NextResponse.json({ error: 'Unauthorized: Seller account required' }, { status: 403 });
    }

    const seller = await prisma.sellerProfile.findUnique({
      where: { userId: session.userId },
      include: { store: true },
    });

    if (!seller || !seller.store) {
      return NextResponse.json({ error: 'Seller store profile not found' }, { status: 404 });
    }

    const body = await req.json();
    const result = createProductSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid product details', details: result.error.format() },
        { status: 400 }
      );
    }

    const data = result.data;
    const baseSlug = slugify(data.name);
    const slug = `${baseSlug}-${Math.floor(1000 + Math.random() * 9000)}`;

    // Get default warehouse
    const warehouse = await prisma.warehouse.findFirst();

    const product = await prisma.product.create({
      data: {
        storeId: seller.store.id,
        categoryId: data.categoryId,
        name: data.name,
        slug,
        summary: data.summary,
        description: data.description,
        brand: data.brand,
        basePrice: data.basePrice,
        salePrice: data.salePrice || null,
        sku: data.sku.toUpperCase(),
        status: 'APPROVED', // Or PENDING_APPROVAL based on policy
        images: {
          create: {
            url: data.imageUrl,
            altText: data.name,
            isPrimary: true,
            sortOrder: 0,
          },
        },
        inventories: warehouse
          ? {
              create: {
                warehouseId: warehouse.id,
                quantity: data.stockQuantity,
                lowStockThreshold: 5,
              },
            }
          : undefined,
      },
    });

    return NextResponse.json({ success: true, product });
  } catch (error: any) {
    console.error('Create product error:', error);
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'A product with this SKU or slug already exists. Please choose a unique SKU.' },
        { status: 409 }
      );
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
