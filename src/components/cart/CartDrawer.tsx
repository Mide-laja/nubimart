'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Truck,
  Store,
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useCurrency } from '../../context/CurrencyContext';

export function CartDrawer() {
  const router = useRouter();
  const {
    items,
    isCartDrawerOpen,
    closeCartDrawer,
    updateQuantity,
    removeItem,
    subtotal,
    totalItems,
    itemsByStore,
  } = useCart();
  const { formatPrice } = useCurrency();

  if (!isCartDrawerOpen) return null;

  const storeCount = Object.keys(itemsByStore).length;
  const freeShippingThreshold = 150; // in USD
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={closeCartDrawer}
        className="absolute inset-0 bg-navy-950/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col transform transition-transform animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-brand-600 text-white rounded-xl shadow-xs">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-navy-950">Your Shopping Cart</h2>
                <p className="text-xs text-slate-500 font-medium">
                  {totalItems} {totalItems === 1 ? 'item' : 'items'}
                  {storeCount > 1 ? ` &bull; ${storeCount} international sellers` : ''}
                </p>
              </div>
            </div>
            <button
              onClick={closeCartDrawer}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Tier */}
          <div className="bg-brand-50/90 border-b border-brand-100/90 px-5 py-3">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-semibold text-brand-950 flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-brand-600" />
                {progressPercent >= 100
                  ? '🎉 Qualified for Free International Express Delivery!'
                  : `Add ${formatPrice(freeShippingThreshold - subtotal)} for Free Express Delivery`}
              </span>
              <span className="font-bold text-brand-700">{progressPercent}%</span>
            </div>
            <div className="w-full bg-brand-200/60 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-brand-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Content Body */}
          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4">
              <div className="w-20 h-20 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400">
                <ShoppingBag className="w-10 h-10 stroke-[1.5]" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-navy-950">Your cart is currently empty!</h3>
                <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
                  Discover curated luxury items, authentic African crafts, tech devices and regional products from verified sellers.
                </p>
              </div>
              <button
                onClick={() => {
                  closeCartDrawer();
                  router.push('/shop');
                }}
                className="mt-2 px-6 py-3 rounded-2xl bg-navy-950 hover:bg-navy-900 text-white font-semibold text-xs transition-all shadow-md"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto divide-y divide-slate-100 p-5 space-y-4">
              {Object.entries(itemsByStore).map(([storeId, storeGroup]) => (
                <div key={storeId} className="pt-3 first:pt-0 space-y-3">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-600 pb-1 border-b border-slate-100">
                    <span className="flex items-center gap-1 text-navy-900 font-bold">
                      <Store className="w-3.5 h-3.5 text-brand-600" />
                      {storeGroup.storeName}
                    </span>
                    <span className="text-[11px] text-slate-400 font-normal">
                      Subtotal: {formatPrice(storeGroup.subtotal)}
                    </span>
                  </div>

                  <div className="space-y-3">
                    {storeGroup.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex gap-3 bg-slate-50/60 p-2.5 rounded-xl border border-slate-100 hover:border-slate-200 transition-colors"
                      >
                        <div className="w-16 h-16 rounded-lg bg-white overflow-hidden relative shrink-0 border border-slate-100">
                          {item.image ? (
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover"
                              sizes="64px"
                            />
                          ) : (
                            <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-300">
                              <ShoppingBag className="w-5 h-5" />
                            </div>
                          )}
                        </div>

                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div>
                            <Link
                              href={`/product/${item.slug}`}
                              onClick={closeCartDrawer}
                              className="text-xs font-bold text-navy-950 hover:text-brand-600 line-clamp-1 transition-colors"
                            >
                              {item.name}
                            </Link>
                            {item.variantName && (
                              <p className="text-[10px] text-slate-500 mt-0.5">
                                Variant: <span className="font-semibold">{item.variantName}</span>
                              </p>
                            )}
                            <p className="text-xs font-black text-navy-900 mt-0.5">
                              {formatPrice(item.price)}
                            </p>
                          </div>

                          <div className="flex items-center justify-between mt-2 pt-1">
                            <div className="inline-flex items-center border border-slate-200 rounded-lg bg-white overflow-hidden shadow-2xs">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-1 hover:bg-slate-100 text-slate-600 transition-colors"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="px-2.5 text-xs font-bold text-navy-950">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-1 hover:bg-slate-100 text-slate-600 transition-colors"
                                aria-label="Increase quantity"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            <button
                              onClick={() => removeItem(item.id)}
                              className="p-1 text-slate-400 hover:text-red-600 transition-colors"
                              aria-label="Remove item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Footer Subtotal & Action CTAs */}
          {items.length > 0 && (
            <div className="p-5 border-t border-slate-100 bg-white space-y-3">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>Cart Subtotal</span>
                  <span className="text-sm font-black text-navy-950">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-600 shrink-0" />
                  <span>Escrow protection enabled &bull; Split fulfillment ready</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5 pt-1">
                <Link
                  href="/cart"
                  onClick={closeCartDrawer}
                  className="w-full py-3 px-4 rounded-2xl border border-slate-300 text-navy-950 hover:bg-slate-50 font-bold text-xs text-center transition-colors"
                >
                  View Cart
                </Link>

                <Link
                  href="/checkout"
                  onClick={closeCartDrawer}
                  className="w-full py-3 px-4 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs text-center shadow-md transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Checkout</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
