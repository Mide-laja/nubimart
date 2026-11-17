import React from 'react';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth/jwt';
import { prisma } from '@/lib/db/prisma';
import { NewProductForm } from './NewProductForm';

export const revalidate = 0;

export default async function NewProductPage() {
  const session = await getSession();
  if (!session) {
    redirect('/login');
  }

  const seller = await prisma.sellerProfile.findUnique({
    where: { userId: session.userId },
  });

  if (!seller) {
    redirect('/become-seller');
  }

  const categories = await prisma.category.findMany({
    select: { id: true, name: true, slug: true },
    orderBy: { name: 'asc' },
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          List New Product
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Create a new catalog item ready for global discovery and cross-border fulfillment.
        </p>
      </div>

      <NewProductForm categories={categories} />
    </div>
  );
}
