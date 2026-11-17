import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth/jwt';
import { prisma } from '@/lib/db/prisma';
import { PlusCircle, Package, ExternalLink, ArrowLeft } from 'lucide-react';
import { formatCurrency } from '@/lib/utils/formatters';
import { Badge } from '@/components/ui/Badge';

export const revalidate = 0;

export default async function SellerProductsPage() {
  const session = await getSession();
  if (!session) {
    redirect('/login');
  }

  const seller = await prisma.sellerProfile.findUnique({
    where: { userId: session.userId },
    include: {
      store: {
        include: {
          products: {
            orderBy: { createdAt: 'desc' },
            include: {
              images: { where: { isPrimary: true }, take: 1 },
              category: true,
              inventories: true,
            },
          },
        },
      },
    },
  });

  if (!seller || !seller.store) {
    redirect('/become-seller');
  }

  const products = seller.store.products;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-navy-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link href="/seller" className="text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Seller Dashboard</span>
            </Link>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Store Product Catalog ({products.length})
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Manage your listings, variant adjustments, and fulfillment stock levels
          </p>
        </div>

        <Link
          href="/seller/products/new"
          className="px-4 py-2.5 bg-brand-600 hover:bg-brand-700 dark:bg-brand-600 dark:hover:bg-brand-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition-colors self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add New Product</span>
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="bg-white dark:bg-navy-900 rounded-3xl border border-slate-200 dark:border-navy-700/80 p-12 text-center space-y-4 shadow-sm transition-colors">
          <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-navy-800 text-slate-400 dark:text-slate-500 flex items-center justify-center mx-auto">
            <Package className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">No products listed in your store</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            Start expanding your cross-border reach by listing your first product on NUBIMART.
          </p>
          <div className="pt-2">
            <Link
              href="/seller/products/new"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-bold"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Create Product</span>
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-navy-900 rounded-3xl border border-slate-200/80 dark:border-navy-700/80 overflow-hidden shadow-sm transition-colors">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-navy-800/80 text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-200/80 dark:border-navy-700">
                <tr>
                  <th className="px-6 py-4">Product</th>
                  <th className="px-6 py-4">Department</th>
                  <th className="px-6 py-4">SKU</th>
                  <th className="px-6 py-4">Price (USD)</th>
                  <th className="px-6 py-4">Total Stock</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-navy-800">
                {products.map((p) => {
                  const stock = p.inventories.reduce((acc, i) => acc + i.quantity, 0);
                  return (
                    <tr key={p.id} className="hover:bg-slate-50/60 dark:hover:bg-navy-800/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-12 rounded-xl bg-slate-100 dark:bg-navy-800 overflow-hidden shrink-0 border border-slate-200 dark:border-navy-700">
                            {p.images[0]?.url && (
                              <Image src={p.images[0].url} alt={p.name} fill className="object-cover" />
                            )}
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 dark:text-slate-100 line-clamp-1">{p.name}</div>
                            <div className="text-[11px] text-slate-400 dark:text-slate-500">{p.brand || 'Artisan Direct'}</div>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 font-medium text-slate-700 dark:text-slate-300">
                        {p.category.name}
                      </td>

                      <td className="px-6 py-4 font-mono text-slate-600 dark:text-slate-400">
                        {p.sku}
                      </td>

                      <td className="px-6 py-4">
                        <div className="font-bold text-slate-900 dark:text-white">
                          {formatCurrency(p.salePrice || p.basePrice, 'USD')}
                        </div>
                        {p.salePrice && (
                          <div className="text-[10px] text-slate-400 dark:text-slate-500 line-through">
                            {formatCurrency(p.basePrice, 'USD')}
                          </div>
                        )}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`font-semibold ${
                            stock > 10 ? 'text-emerald-700 dark:text-emerald-400' : 'text-amber-700 dark:text-amber-400'
                          }`}
                        >
                          {stock} units
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <Badge
                          variant={p.status === 'APPROVED' ? 'success' : 'neutral'}
                          size="sm"
                        >
                          {p.status}
                        </Badge>
                      </td>

                      <td className="px-6 py-4 text-right">
                        <Link
                          href={`/product/${p.slug}`}
                          className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 inline-flex items-center gap-1"
                        >
                          <span>View</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
