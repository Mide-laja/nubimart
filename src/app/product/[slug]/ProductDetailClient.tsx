'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  Check,
  ShoppingCart,
  Heart,
  Share2,
  Lock,
  Warehouse,
  Sparkles,
} from 'lucide-react';
import { useCurrency } from '@/context/CurrencyContext';
import { useCart } from '@/context/CartContext';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface ProductDetailClientProps {
  product: {
    id: string;
    name: string;
    slug: string;
    description: string;
    summary: string | null;
    brand: string | null;
    basePrice: number;
    salePrice: number | null;
    sku: string;
    rating: number;
    reviewCount: number;
    images: { id: string; url: string; altText: string | null; isPrimary: boolean }[];
    variants: { id: string; name: string; sku: string; priceAdjustment: number; stockQuantity: number; attributesJson: string }[];
    inventories: { quantity: number; warehouse: { name: string; city: string; countryCode: string } }[];
    store: { id: string; name: string; slug: string; rating: number; reviewCount: number; logoUrl: string | null; supportEmail: string | null };
    category: { id: string; name: string; slug: string };
    reviews: { id: string; rating: number; title: string; comment: string; createdAt: string; user: { name: string } }[];
  };
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const router = useRouter();
  const { formatPrice } = useCurrency();
  const { addItem } = useCart();

  const [selectedImage, setSelectedImage] = useState<string>(
    product.images[0]?.url || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80'
  );

  const [selectedVariantId, setSelectedVariantId] = useState<string | undefined>(
    product.variants[0]?.id
  );

  const [quantity, setQuantity] = useState<number>(1);
  const [isAdded, setIsAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'reviews'>('desc');

  const selectedVariant = product.variants.find((v) => v.id === selectedVariantId);
  const priceAdjustment = selectedVariant?.priceAdjustment || 0;
  const currentBasePrice = (product.salePrice || product.basePrice) + priceAdjustment;
  const originalBasePrice = product.basePrice + priceAdjustment;
  const hasDiscount = product.salePrice && product.salePrice < product.basePrice;

  // Available stock calculation
  const totalStock = product.inventories.reduce((sum, inv) => sum + inv.quantity, 0) || 50;

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      variantId: selectedVariant?.id,
      variantName: selectedVariant?.name,
      name: product.name,
      slug: product.slug,
      sku: selectedVariant?.sku || product.sku,
      basePrice: originalBasePrice,
      price: currentBasePrice,
      quantity,
      image: selectedImage,
      storeId: product.store.id,
      storeName: product.store.name,
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push('/cart');
  };

  return (
    <div className="space-y-12">
      {/* Top Product Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: Gallery */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-square rounded-3xl overflow-hidden bg-slate-100 dark:bg-[#1a2012] border border-slate-200 dark:border-[#262f17] shadow-sm">
            <Image
              src={selectedImage}
              alt={product.name}
              fill
              className="object-cover object-center"
              priority
            />
            {hasDiscount && (
              <div className="absolute top-4 left-4 bg-rose-600 text-white text-xs font-black px-3 py-1 rounded-full shadow-md">
                SPECIAL OFFER
              </div>
            )}
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {product.images.map((img) => (
                <button
                  key={img.id}
                  onClick={() => setSelectedImage(img.url)}
                  className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all shrink-0 ${
                    selectedImage === img.url
                      ? 'border-brand-600 dark:border-brand-500 ring-2 ring-brand-500/30'
                      : 'border-slate-200 dark:border-[#262f17] hover:border-slate-400 dark:hover:border-brand-500'
                  }`}
                >
                  <Image src={img.url} alt={img.altText || ''} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Buy Box & Options */}
        <div className="lg:col-span-6 space-y-6">
          {/* Breadcrumb & Merchant */}
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
              <Link href="/shop" className="hover:text-slate-800 dark:hover:text-white">Shop</Link>
              <span>/</span>
              <Link href={`/shop?category=${product.category.slug}`} className="hover:text-slate-800 dark:hover:text-white">
                {product.category.name}
              </Link>
            </div>

            <Link
              href={`/shop?store=${product.store.slug}`}
              className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-200 hover:text-brand-600 dark:hover:text-brand-400 transition-colors bg-slate-100 dark:bg-[#1a2012] px-3 py-1 rounded-full border border-slate-200/60 dark:border-[#262f17]"
            >
              <ShieldCheck className="w-4 h-4 text-brand-600 dark:text-brand-400" />
              <span>{product.store.name}</span>
            </Link>
          </div>

          {/* Title & Brand */}
          <div>
            {product.brand && (
              <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 mb-1 block">
                {product.brand}
              </span>
            )}
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-snug">
              {product.name}
            </h1>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center text-amber-500">
              <Star className="w-4 h-4 fill-current" />
            </div>
            <span className="text-sm font-bold text-slate-900 dark:text-white">{product.rating.toFixed(1)}</span>
            <span className="text-xs text-slate-400 dark:text-slate-400 font-medium">
              &bull; ({product.reviewCount} verified international reviews)
            </span>
          </div>

          {/* Price Block */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#151a10] border border-slate-200/80 dark:border-[#262f17] flex items-baseline gap-3">
            <div className="text-3xl font-black text-slate-900 dark:text-white">
              {formatPrice(currentBasePrice)}
            </div>
            {hasDiscount && (
              <div className="text-sm text-slate-400 dark:text-slate-500 line-through">
                {formatPrice(originalBasePrice)}
              </div>
            )}
            <Badge variant="success" size="sm">
              Cross-Border Escrow Guaranteed
            </Badge>
          </div>

          {/* Variants Picker */}
          {product.variants.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                Select Option / Variation:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {product.variants.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVariantId(v.id)}
                    className={`p-3 rounded-xl border text-left text-xs font-semibold transition-all ${
                      selectedVariantId === v.id
                        ? 'border-brand-600 dark:border-brand-500 bg-brand-50/50 dark:bg-[#1b2512] text-brand-900 dark:text-brand-300 shadow-sm ring-1 ring-brand-500'
                        : 'border-slate-200 dark:border-[#262f17] hover:border-slate-300 dark:hover:border-brand-500 text-slate-700 dark:text-slate-300 bg-white dark:bg-[#151a10]'
                    }`}
                  >
                    <div>{v.name}</div>
                    {v.priceAdjustment > 0 && (
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 font-normal">
                        +{formatPrice(v.priceAdjustment)}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Stock & Warehouse Origin */}
          <div className="flex items-center gap-2 text-xs text-brand-800 dark:text-brand-300 bg-brand-50 dark:bg-[#192311] border border-brand-200 dark:border-[#28381c] p-3 rounded-xl font-medium">
            <Warehouse className="w-4 h-4 text-brand-600 dark:text-brand-400 shrink-0" />
            <span>
              In Stock &bull; Dispatched from{' '}
              <strong className="text-brand-950 dark:text-white">
                {product.inventories[0]?.warehouse.name || 'Lagos Atlantic Hub'} ({product.inventories[0]?.warehouse.countryCode || 'NG'})
              </strong>
            </span>
          </div>

          {/* Quantity & CTA Buttons */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-slate-300 dark:border-[#262f17] rounded-xl bg-white dark:bg-[#151a10] overflow-hidden shadow-sm">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3.5 py-2.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#1c2313] font-bold"
                >
                  -
                </button>
                <span className="px-4 py-2.5 text-sm font-bold text-slate-900 dark:text-white">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3.5 py-2.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#1c2313] font-bold"
                >
                  +
                </button>
              </div>

              <Button
                onClick={handleAddToCart}
                variant="primary"
                size="lg"
                className="flex-1"
                icon={isAdded ? <Check className="w-5 h-5" /> : <ShoppingCart className="w-5 h-5" />}
              >
                {isAdded ? 'Added to Cart!' : 'Add to Cart'}
              </Button>
            </div>

            <Button
              onClick={handleBuyNow}
              variant="gold"
              size="lg"
              className="w-full"
            >
              Buy Now with Escrow Protection
            </Button>
          </div>

          {/* Guarantee Badges */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-100 dark:border-[#262f17] text-center text-[11px] text-slate-500 dark:text-slate-400">
            <div className="p-2 bg-slate-50 dark:bg-[#151a10] rounded-xl border border-slate-100 dark:border-[#262f17]">
              <Lock className="w-4 h-4 text-brand-600 dark:text-brand-400 mx-auto mb-1" />
              <span>Escrow Secure</span>
            </div>
            <div className="p-2 bg-slate-50 dark:bg-[#151a10] rounded-xl border border-slate-100 dark:border-[#262f17]">
              <Truck className="w-4 h-4 text-brand-600 dark:text-brand-400 mx-auto mb-1" />
              <span>Tracked DHL/FedEx</span>
            </div>
            <div className="p-2 bg-slate-50 dark:bg-[#151a10] rounded-xl border border-slate-100 dark:border-[#262f17]">
              <RotateCcw className="w-4 h-4 text-brand-600 dark:text-brand-400 mx-auto mb-1" />
              <span>14-Day Returns</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs: Description, Specs, Reviews */}
      <div className="border-t border-slate-200 dark:border-[#262f17] pt-10">
        <div className="flex items-center gap-6 border-b border-slate-200 dark:border-[#262f17] text-sm font-bold">
          <button
            onClick={() => setActiveTab('desc')}
            className={`pb-3.5 transition-colors ${
              activeTab === 'desc'
                ? 'border-b-2 border-brand-600 dark:border-brand-400 text-brand-700 dark:text-brand-400'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Product Overview & Story
          </button>
          <button
            onClick={() => setActiveTab('specs')}
            className={`pb-3.5 transition-colors ${
              activeTab === 'specs'
                ? 'border-b-2 border-brand-600 dark:border-brand-400 text-brand-700 dark:text-brand-400'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Specifications & SKU
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`pb-3.5 transition-colors ${
              activeTab === 'reviews'
                ? 'border-b-2 border-brand-600 dark:border-brand-400 text-brand-700 dark:text-brand-400'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Verified Customer Reviews ({product.reviews.length})
          </button>
        </div>

        <div className="py-8">
          {activeTab === 'desc' && (
            <div className="prose prose-slate dark:prose-invert max-w-none text-sm text-slate-700 dark:text-slate-300 leading-relaxed space-y-4">
              <p>{product.description}</p>
              {product.summary && (
                <div className="p-4 bg-brand-50/60 dark:bg-[#192311] rounded-2xl border border-brand-100 dark:border-[#28381c] text-brand-900 dark:text-brand-300 font-medium">
                  {product.summary}
                </div>
              )}
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="max-w-xl">
              <dl className="divide-y divide-slate-100 dark:divide-[#262f17] text-xs">
                <div className="py-2.5 flex justify-between">
                  <dt className="font-semibold text-slate-500 dark:text-slate-400">Universal SKU</dt>
                  <dd className="font-mono font-bold text-slate-900 dark:text-white">{product.sku}</dd>
                </div>
                <div className="py-2.5 flex justify-between">
                  <dt className="font-semibold text-slate-500 dark:text-slate-400">Brand / Origin Artisan</dt>
                  <dd className="font-bold text-slate-900 dark:text-white">{product.brand || 'Artisan Direct'}</dd>
                </div>
                <div className="py-2.5 flex justify-between">
                  <dt className="font-semibold text-slate-500 dark:text-slate-400">Category Department</dt>
                  <dd className="font-bold text-slate-900 dark:text-white">{product.category.name}</dd>
                </div>
                <div className="py-2.5 flex justify-between">
                  <dt className="font-semibold text-slate-500 dark:text-slate-400">Fulfillment Hub</dt>
                  <dd className="font-bold text-slate-900 dark:text-white">
                    {product.inventories[0]?.warehouse.name || 'Central Hub'}
                  </dd>
                </div>
              </dl>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-6">
              {product.reviews.length === 0 ? (
                <p className="text-xs text-slate-500 dark:text-slate-400">No customer reviews submitted yet.</p>
              ) : (
                product.reviews.map((rev) => (
                  <div key={rev.id} className="p-5 rounded-2xl bg-white dark:bg-[#151a10] border border-slate-200/80 dark:border-[#262f17] shadow-sm space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-slate-900 dark:text-white">{rev.user.name}</span>
                        <Badge variant="brand" size="sm">Verified Buyer</Badge>
                      </div>
                      <div className="flex items-center text-amber-500">
                        {Array.from({ length: rev.rating }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                    </div>
                    <h5 className="text-xs font-bold text-slate-800 dark:text-slate-200">{rev.title}</h5>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{rev.comment}</p>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
