'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { AlertCircle, CheckCircle, Package, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface Props {
  categories: { id: string; name: string; slug: string }[];
}

export function NewProductForm({ categories }: Props) {
  const router = useRouter();

  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState(categories[0]?.id || '');
  const [summary, setSummary] = useState('');
  const [description, setDescription] = useState('');
  const [brand, setBrand] = useState('');
  const [basePrice, setBasePrice] = useState('');
  const [salePrice, setSalePrice] = useState('');
  const [sku, setSku] = useState('');
  const [stockQuantity, setStockQuantity] = useState('25');
  const [imageUrl, setImageUrl] = useState(
    'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80'
  );

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const res = await fetch('/api/seller/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          categoryId,
          summary,
          description,
          brand,
          basePrice: parseFloat(basePrice),
          salePrice: salePrice ? parseFloat(salePrice) : undefined,
          sku,
          stockQuantity: parseInt(stockQuantity, 10),
          imageUrl,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to list product');
      }

      router.push('/seller/products');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-navy-900 rounded-3xl border border-slate-200/80 dark:border-navy-700/80 p-6 sm:p-8 shadow-sm transition-colors">
      {error && (
        <div className="p-4 mb-6 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Product Title"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Master-Crafted Indigo Mudcloth Throw"
          />

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Department Category
            </label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full bg-white dark:bg-navy-900 border border-slate-300 dark:border-navy-700 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-brand-500 dark:focus:border-brand-400 transition-colors"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Brand / Artisan Name"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            placeholder="e.g. Heritage Artisans"
          />
          <Input
            label="Unique Stock Keeping Unit (SKU)"
            required
            value={sku}
            onChange={(e) => setSku(e.target.value)}
            placeholder="e.g. ART-MUD-001"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Short Summary (1-2 sentences)
          </label>
          <input
            type="text"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="Brief highlight of materials, origins, or specs"
            className="w-full bg-white dark:bg-navy-900 border border-slate-300 dark:border-navy-700 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-brand-500 dark:focus:border-brand-400 transition-colors"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Full Description & Cultural Heritage Details
          </label>
          <textarea
            rows={5}
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Provide comprehensive details on dimensions, craftsmanship, usage guidelines..."
            className="w-full bg-white dark:bg-navy-900 border border-slate-300 dark:border-navy-700 rounded-lg p-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-brand-500 dark:focus:border-brand-400 transition-colors"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Input
            label="Base Retail Price (USD)"
            type="number"
            step="0.01"
            required
            value={basePrice}
            onChange={(e) => setBasePrice(e.target.value)}
            placeholder="120.00"
          />
          <Input
            label="Sale / Promotion Price (USD, Optional)"
            type="number"
            step="0.01"
            value={salePrice}
            onChange={(e) => setSalePrice(e.target.value)}
            placeholder="99.00"
          />
          <Input
            label="Initial Stock Quantity"
            type="number"
            required
            value={stockQuantity}
            onChange={(e) => setStockQuantity(e.target.value)}
            placeholder="25"
          />
        </div>

        <Input
          label="Primary Product Image URL"
          type="url"
          required
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="https://..."
        />

        <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-navy-800">
          <Link
            href="/seller/products"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Products</span>
          </Link>

          <Button
            type="submit"
            variant="primary"
            size="md"
            isLoading={isLoading}
          >
            Publish Product to Marketplace
          </Button>
        </div>
      </form>
    </div>
  );
}
