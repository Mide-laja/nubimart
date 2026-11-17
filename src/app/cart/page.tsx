'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Trash2,
  ArrowRight,
  ShieldCheck,
  Tag,
  Lock,
  ShoppingBag,
  ArrowLeft,
  Store,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useCurrency } from '@/context/CurrencyContext';
import { Button } from '@/components/ui/Button';

export default function CartPage() {
  const router = useRouter();
  const { items, updateQuantity, removeItem, clearCart, subtotal, totalItems, itemsByStore } = useCart();
  const { formatPrice, currentCountry } = useCurrency();

  const [couponCode, setCouponCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError(null);
    const code = couponCode.trim().toUpperCase();

    if (code === 'WELCOME10') {
      if (subtotal < 50) {
        setCouponError('Minimum order amount for WELCOME10 is $50.00');
        return;
      }
      const disc = subtotal * 0.1;
      setDiscountAmount(disc);
      setAppliedCoupon('WELCOME10 (10% Off)');
      setCouponCode('');
    } else if (code === 'GLOBAL25') {
      if (subtotal < 150) {
        setCouponError('Minimum order amount for GLOBAL25 is $150.00');
        return;
      }
      setDiscountAmount(25);
      setAppliedCoupon('GLOBAL25 ($25 Off)');
      setCouponCode('');
    } else {
      setCouponError('Invalid coupon code. Try WELCOME10');
    }
  };

  // Estimated shipping: $15 per distinct vendor storefront (multi-vendor shipping model)
  const numberOfSellers = Object.keys(itemsByStore).length;
  const estimatedShipping = numberOfSellers > 0 ? (subtotal > 150 ? 0 : numberOfSellers * 15) : 0;
  const estimatedTax = (subtotal - discountAmount) * currentCountry.taxRate;
  const grandTotal = Math.max(0, subtotal - discountAmount + estimatedShipping + estimatedTax);

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-[#151a10] border border-slate-200 dark:border-[#262f17] text-slate-400 flex items-center justify-center mx-auto shadow-inner">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">Your Shopping Cart is Empty</h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            Discover verified international artisans, flagship electronics, and ceremonial textiles across 38 countries.
          </p>
        </div>
        <div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-xl shadow-md transition-all"
          >
            <span>Start Shopping Global Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Title */}
      <div className="flex items-center justify-between pb-6 border-b border-slate-200 dark:border-[#262f17]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Shopping Cart ({totalItems} {totalItems === 1 ? 'item' : 'items'})
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Items from {numberOfSellers} verified international {numberOfSellers === 1 ? 'merchant' : 'merchants'}
          </p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs font-semibold text-rose-600 dark:text-rose-400 hover:text-rose-700"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: Items grouped by Seller */}
        <div className="lg:col-span-8 space-y-6">
          {Object.entries(itemsByStore).map(([storeId, group]) => (
            <div
              key={storeId}
              className="bg-white dark:bg-[#151a10] rounded-2xl border border-slate-200/80 dark:border-[#262f17] shadow-sm overflow-hidden"
            >
              {/* Store Header */}
              <div className="bg-slate-50/80 dark:bg-[#1c2313] px-5 py-3 border-b border-slate-100 dark:border-[#262f17] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Store className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    Fulfilled by: <strong className="text-brand-700 dark:text-brand-400">{group.storeName}</strong>
                  </span>
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
                </div>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  Subtotal: <strong className="text-slate-900 dark:text-white">{formatPrice(group.subtotal)}</strong>
                </span>
              </div>

              {/* Items in Store */}
              <div className="divide-y divide-slate-100 dark:divide-[#262f17] p-5 space-y-4">
                {group.items.map((item) => (
                  <div key={item.id} className="pt-4 first:pt-0 flex items-start gap-4">
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-slate-100 dark:bg-[#1c2313] border border-slate-200 dark:border-[#262f17] shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>

                    <div className="flex-1 space-y-1">
                      <Link
                        href={`/product/${item.slug}`}
                        className="text-sm font-bold text-slate-900 dark:text-white hover:text-brand-600 dark:hover:text-brand-400 transition-colors line-clamp-2"
                      >
                        {item.name}
                      </Link>
                      {item.variantName && (
                        <div className="text-xs text-slate-500 dark:text-slate-400">Option: {item.variantName}</div>
                      )}
                      <div className="text-xs font-mono text-slate-400 dark:text-slate-500">SKU: {item.sku}</div>

                      <div className="flex items-center justify-between pt-2">
                        {/* Quantity Controls */}
                        <div className="flex items-center border border-slate-200 dark:border-[#262f17] rounded-lg bg-slate-50 dark:bg-[#1c2313] overflow-hidden text-xs">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-2.5 py-1 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-[#252f18] font-bold"
                          >
                            -
                          </button>
                          <span className="px-3 py-1 font-bold text-slate-900 dark:text-white">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-2.5 py-1 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-[#252f18] font-bold"
                          >
                            +
                          </button>
                        </div>

                        {/* Price & Delete */}
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="text-sm font-black text-slate-900 dark:text-white">
                              {formatPrice(item.price * item.quantity)}
                            </div>
                            {item.quantity > 1 && (
                              <div className="text-[10px] text-slate-400 dark:text-slate-500">
                                {formatPrice(item.price)} each
                              </div>
                            )}
                          </div>

                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-1.5 text-slate-400 dark:text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
                            title="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-700 dark:text-brand-400 hover:text-brand-800"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Continue Shopping Global Catalog</span>
          </Link>
        </div>

        {/* Right: Order Summary */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white dark:bg-[#151a10] rounded-2xl border border-slate-200/80 dark:border-[#262f17] p-6 shadow-sm space-y-5">
            <h3 className="text-base font-black text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-[#262f17]">
              Order Summary
            </h3>

            {/* Price Breakdown */}
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Items Subtotal</span>
                <span className="font-bold text-slate-900 dark:text-white">{formatPrice(subtotal)}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-brand-700 dark:text-brand-400 font-semibold">
                  <span>Coupon Discount ({appliedCoupon})</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}

              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Estimated Shipping ({numberOfSellers} {numberOfSellers === 1 ? 'Seller' : 'Sellers'})</span>
                <span className="font-bold text-slate-900 dark:text-white">
                  {estimatedShipping === 0 ? (
                    <span className="text-brand-600 dark:text-brand-400">FREE OVER $150</span>
                  ) : (
                    formatPrice(estimatedShipping)
                  )}
                </span>
              </div>

              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Est. Local Taxes ({currentCountry.name} {(currentCountry.taxRate * 100).toFixed(1)}%)</span>
                <span className="font-bold text-slate-900 dark:text-white">{formatPrice(estimatedTax)}</span>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-[#262f17] flex justify-between items-baseline">
                <span className="text-sm font-bold text-slate-900 dark:text-white">Grand Total</span>
                <span className="text-2xl font-black text-slate-900 dark:text-white">{formatPrice(grandTotal)}</span>
              </div>
            </div>

            {/* Coupon Application Form */}
            <form onSubmit={handleApplyCoupon} className="pt-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Promo Code (e.g. WELCOME10)"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 px-3 py-2 bg-slate-50 dark:bg-[#1c2313] border border-slate-200 dark:border-[#2f391c] rounded-xl text-xs text-slate-800 dark:text-white uppercase focus:outline-none focus:border-brand-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold transition-colors"
                >
                  Apply
                </button>
              </div>
              {couponError && <p className="text-[11px] text-rose-600 dark:text-rose-400 font-medium mt-1">{couponError}</p>}
            </form>

            {/* Checkout Action */}
            <div className="space-y-3 pt-2">
              <Link
                href="/checkout"
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm rounded-xl shadow-md transition-colors"
              >
                <Lock className="w-4 h-4" />
                <span>Proceed to Split Checkout</span>
              </Link>
            </div>

            {/* Escrow Guarantee Note */}
            <div className="p-3 bg-brand-50/50 dark:bg-[#182512] rounded-xl border border-brand-100 dark:border-[#263c1d] text-[11px] text-brand-900 dark:text-emerald-300 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-brand-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <span>
                All purchases on NUBIMART are held safely in escrow. Sellers receive payout only after carrier delivers verified goods.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
