import React from 'react';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/db/prisma';
import { ProductDetailClient } from './ProductDetailClient';
import { ProductCard } from '@/components/product/ProductCard';

export const revalidate = 0;

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = params;

  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      images: { orderBy: { sortOrder: 'asc' } },
      variants: true,
      inventories: {
        include: { warehouse: true },
      },
      store: true,
      category: true,
      reviews: {
        include: { user: { select: { name: true } } },
        orderBy: { createdAt: 'desc' },
      },
    },
  });

  if (!product) {
    notFound();
  }

  // Fetch related products in the same category
  const relatedProducts = await prisma.product.findMany({
    where: {
      categoryId: product.categoryId,
      id: { not: product.id },
      status: 'APPROVED',
    },
    take: 4,
    include: {
      images: { where: { isPrimary: true }, take: 1 },
      store: { select: { id: true, name: true, slug: true } },
    },
  });

  // Format reviews createdAt to string for client component serializability
  const serializedProduct = {
    ...product,
    reviews: product.reviews.map((r) => ({
      ...r,
      createdAt: r.createdAt.toISOString(),
    })),
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      <ProductDetailClient product={serializedProduct as any} />

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="pt-10 border-t border-slate-200 dark:border-[#262f17] space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                You May Also Like
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                Related in {product.category.name}
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-5">
            {relatedProducts.map((p) => (
              <ProductCard
                key={p.id}
                id={p.id}
                name={p.name}
                slug={p.slug}
                brand={p.brand}
                basePrice={p.basePrice}
                salePrice={p.salePrice}
                imageUrl={p.images[0]?.url}
                rating={p.rating}
                reviewCount={p.reviewCount}
                storeId={p.store.id}
                storeName={p.store.name}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
