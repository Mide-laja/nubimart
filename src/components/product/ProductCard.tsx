'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, ShoppingCart, Check, ShieldCheck, Heart } from 'lucide-react';
import { useCurrency } from '@/context/CurrencyContext';
import { useCart } from '@/context/CartContext';
import { Badge } from '@/components/ui/Badge';

export interface ProductCardProps {
  id: string;
  name: string;
  slug: string;
  brand?: string | null;
  basePrice: number;
  salePrice?: number | null;
  imageUrl?: string;
  rating: number;
  reviewCount: number;
  storeId: string;
  storeName: string;
  categorySlug?: string;
}

export function ProductCard({
  id,
  name,
  slug,
  brand,
  basePrice,
  salePrice,
  imageUrl,
  rating,
  reviewCount,
  storeId,
  storeName,
}: ProductCardProps) {
  const { formatPrice } = useCurrency();
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const displayPrice = salePrice || basePrice;
  const hasDiscount = salePrice && salePrice < basePrice;
  const discountPercent = hasDiscount
    ? Math.round(((basePrice - salePrice!) / basePrice) * 100)
    : 0;

  const fallbackImage =
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80';

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addItem({
      productId: id,
      name,
      slug,
      sku: `SKU-${id.slice(0, 6)}`,
      basePrice,
      price: displayPrice,
      quantity: 1,
      image: imageUrl || fallbackImage,
      storeId,
      storeName,
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="group relative bg-white dark:bg-[#151a10] rounded-2xl border border-slate-200/80 dark:border-[#262f17] shadow-sm hover:shadow-premium hover:border-slate-300 dark:hover:border-brand-500 transition-all duration-300 flex flex-col overflow-hidden">
      {/* Product Image & Badges */}
      <Link href={`/product/${slug}`} className="relative block aspect-square bg-slate-100 dark:bg-[#1a2012] overflow-hidden">
        <Image
          src={imageUrl || fallbackImage}
          alt={name}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Top Floating Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {hasDiscount && (
            <span className="bg-rose-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-sm">
              -{discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsWishlisted(!isWishlisted);
          }}
          className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-colors shadow-sm ${
            isWishlisted
              ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400'
              : 'bg-white/90 dark:bg-[#151a10]/90 text-slate-500 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-white dark:hover:bg-[#1f2614]'
          }`}
          aria-label="Save to Wishlist"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>
      </Link>

      {/* Product Information */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Store / Verified Merchant */}
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400 mb-1">
            <span className="font-semibold text-slate-700 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 truncate">{storeName}</span>
            <span title="Verified Global Merchant"><ShieldCheck className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400 shrink-0" /></span>
          </div>

          {/* Title */}
          <Link href={`/product/${slug}`}>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 line-clamp-2 leading-snug transition-colors">
              {name}
            </h3>
          </Link>

          {/* Ratings */}
          <div className="flex items-center gap-1.5 mt-2">
            <div className="flex items-center text-amber-500">
              <Star className="w-3.5 h-3.5 fill-current" />
            </div>
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{rating.toFixed(1)}</span>
            <span className="text-[11px] text-slate-400 dark:text-slate-400">({reviewCount})</span>
          </div>
        </div>

        {/* Pricing & Add to Cart */}
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-[#262f17] flex items-center justify-between gap-2">
          <div>
            <div className="text-base font-black text-slate-900 dark:text-white">
              {formatPrice(displayPrice)}
            </div>
            {hasDiscount && (
              <div className="text-xs text-slate-400 dark:text-slate-500 line-through">
                {formatPrice(basePrice)}
              </div>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            className={`p-2.5 rounded-xl font-medium transition-all flex items-center justify-center shadow-sm ${
              added
                ? 'bg-brand-600 text-white'
                : 'bg-slate-100 dark:bg-[#222a16] text-slate-800 dark:text-slate-200 hover:bg-brand-600 dark:hover:bg-brand-600 hover:text-white'
            }`}
            aria-label="Add item to cart"
          >
            {added ? <Check className="w-4 h-4 stroke-[3]" /> : <ShoppingCart className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}
