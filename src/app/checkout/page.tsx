'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ShieldCheck,
  Lock,
  Truck,
  CreditCard,
  AlertCircle,
  CheckCircle,
  ArrowRight,
  Store,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useCurrency } from '@/context/CurrencyContext';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { SUPPORTED_COUNTRIES } from '@/lib/constants/countries';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart, itemsByStore } = useCart();
  const { formatPrice, currentCountry } = useCurrency();
  const { user, isAuthenticated } = useAuth();

  const [fullName, setFullName] = useState(user?.name || 'Sophia Kensington');
  const [phone, setPhone] = useState('+1 (555) 234-5678');
  const [street, setStreet] = useState('742 Evergreen Terrace');
  const [apartment, setApartment] = useState('Apt 4B');
  const [city, setCity] = useState('Springfield');
  const [state, setState] = useState('OR');
  const [postalCode, setPostalCode] = useState('97477');
  const [countryCode, setCountryCode] = useState(currentCountry.code);

  const [paymentMethod, setPaymentMethod] = useState<'TEST_GATEWAY' | 'PAYSTACK' | 'FLUTTERWAVE' | 'STRIPE'>('TEST_GATEWAY');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const numberOfSellers = Object.keys(itemsByStore).length;
  const estimatedShipping = numberOfSellers > 0 ? (subtotal > 150 ? 0 : numberOfSellers * 15) : 0;
  const estimatedTax = subtotal * 0.08;
  const grandTotal = subtotal + estimatedShipping + estimatedTax;

  if (items.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-900">Your cart is empty</h2>
        <p className="text-xs text-slate-500">Please add products to your cart before checking out.</p>
        <Link href="/shop" className="inline-block px-4 py-2 bg-brand-600 text-white rounded-xl text-xs font-bold">
          Browse Catalog
        </Link>
      </div>
    );
  }

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const payload = {
        items: items.map((i) => ({
          productId: i.productId,
          variantId: i.variantId,
          quantity: i.quantity,
        })),
        shippingAddress: {
          fullName,
          phone,
          street,
          apartment,
          city,
          state,
          postalCode,
          countryCode,
        },
        paymentMethod,
        couponCode: 'WELCOME10', // Auto-apply for demo benefit if eligible
      };

      const res = await fetch('/api/checkout/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to place order');
      }

      clearCart();
      router.push(`/orders/${data.orderNumber}`);
    } catch (err: any) {
      setError(err.message);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Checkout Header */}
      <div className="pb-6 border-b border-slate-200 dark:border-[#262f17] flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 dark:bg-[#1f2614] text-brand-700 dark:text-brand-300 text-xs font-bold mb-2 border border-brand-200 dark:border-[#2f391c]">
            <Lock className="w-3.5 h-3.5" />
            <span>256-Bit SSL Escrow Protected Checkout</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            International Checkout
          </h1>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
          <span>Items: {items.length}</span> &bull;
          <span>Vendors: {numberOfSellers}</span>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmitOrder}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Delivery Address & Payment Method */}
          <div className="lg:col-span-7 space-y-8">
            {/* 1. Delivery Address */}
            <div className="bg-white dark:bg-[#151a10] rounded-2xl border border-slate-200/80 dark:border-[#262f17] p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-[#262f17]">
                <Truck className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">1. Delivery Address</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Recipient Full Name"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Sophia Kensington"
                />
                <Input
                  label="Contact Phone (for DHL/FedEx Courier)"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 234-5678"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <Input
                    label="Street Address"
                    required
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    placeholder="e.g. 742 Evergreen Terrace"
                  />
                </div>
                <div>
                  <Input
                    label="Apt / Suite (Optional)"
                    value={apartment}
                    onChange={(e) => setApartment(e.target.value)}
                    placeholder="Apt 4B"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <Input
                  label="City"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Springfield"
                />
                <Input
                  label="State / Province"
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  placeholder="OR"
                />
                <Input
                  label="Postal / ZIP Code"
                  required
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  placeholder="97477"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Destination Country (38 Supported)
                </label>
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="w-full bg-white dark:bg-[#1c2313] border border-slate-300 dark:border-[#2f391c] rounded-lg px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
                >
                  {SUPPORTED_COUNTRIES.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.flag} {c.name} ({c.currency})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* 2. Payment Gateway Selection */}
            <div className="bg-white dark:bg-[#151a10] rounded-2xl border border-slate-200/80 dark:border-[#262f17] p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-[#262f17]">
                <CreditCard className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">2. Select Payment Gateway</h3>
              </div>

              <div className="space-y-3">
                {/* Instant Escrow Test Gateway */}
                <label
                  className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                    paymentMethod === 'TEST_GATEWAY'
                      ? 'border-brand-600 dark:border-brand-500 bg-brand-50/40 dark:bg-[#1a2512] ring-1 ring-brand-500'
                      : 'border-slate-200 dark:border-[#262f17] hover:border-slate-300 dark:hover:border-brand-500 bg-white dark:bg-[#151a10]'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'TEST_GATEWAY'}
                    onChange={() => setPaymentMethod('TEST_GATEWAY')}
                    className="mt-1 text-brand-600"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-900 dark:text-white">
                        NUBIMART Instant Escrow Sandbox
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-brand-100 dark:bg-[#1f2614] text-brand-800 dark:text-brand-300 text-[10px] font-bold">
                        RECOMMENDED FOR TEST
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Simulates instant escrow payment confirmation without requiring live banking cards. Creates real database order records and vendor sub-orders.
                    </p>
                  </div>
                </label>

                {/* Paystack */}
                <label
                  className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                    paymentMethod === 'PAYSTACK'
                      ? 'border-brand-600 dark:border-brand-500 bg-brand-50/40 dark:bg-[#1a2512] ring-1 ring-brand-500'
                      : 'border-slate-200 dark:border-[#262f17] hover:border-slate-300 dark:hover:border-brand-500 bg-white dark:bg-[#151a10]'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'PAYSTACK'}
                    onChange={() => setPaymentMethod('PAYSTACK')}
                    className="mt-1 text-brand-600"
                  />
                  <div>
                    <div className="text-sm font-bold text-slate-900 dark:text-white">Paystack (African Markets & Cards)</div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Supports Naira (NGN), Ghanaian Cedi (GHS), Kenyan Shilling (KES), cards, USSD, and bank transfers.
                    </p>
                  </div>
                </label>

                {/* Flutterwave */}
                <label
                  className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                    paymentMethod === 'FLUTTERWAVE'
                      ? 'border-brand-600 dark:border-brand-500 bg-brand-50/40 dark:bg-[#1a2512] ring-1 ring-brand-500'
                      : 'border-slate-200 dark:border-[#262f17] hover:border-slate-300 dark:hover:border-brand-500 bg-white dark:bg-[#151a10]'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'FLUTTERWAVE'}
                    onChange={() => setPaymentMethod('FLUTTERWAVE')}
                    className="mt-1 text-brand-600"
                  />
                  <div>
                    <div className="text-sm font-bold text-slate-900 dark:text-white">Flutterwave (Pan-African & Global)</div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Accepts mobile money (M-Pesa, MTN, Airtel) and cross-border debit/credit cards.
                    </p>
                  </div>
                </label>

                {/* Stripe */}
                <label
                  className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                    paymentMethod === 'STRIPE'
                      ? 'border-brand-600 dark:border-brand-500 bg-brand-50/40 dark:bg-[#1a2512] ring-1 ring-brand-500'
                      : 'border-slate-200 dark:border-[#262f17] hover:border-slate-300 dark:hover:border-brand-500 bg-white dark:bg-[#151a10]'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'STRIPE'}
                    onChange={() => setPaymentMethod('STRIPE')}
                    className="mt-1 text-brand-600"
                  />
                  <div>
                    <div className="text-sm font-bold text-slate-900 dark:text-white">Stripe (USD, EUR, GBP & International Cards)</div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Supports Visa, Mastercard, American Express, Apple Pay, and Google Pay.
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column: Multi-Vendor Fulfillment Split & Totals */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white dark:bg-[#151a10] rounded-2xl border border-slate-200/80 dark:border-[#262f17] p-6 shadow-sm space-y-5">
              <h3 className="text-base font-black text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-[#262f17]">
                Multi-Vendor Order Breakdown
              </h3>

              {/* Vendors Sub-Orders */}
              <div className="space-y-4">
                {Object.entries(itemsByStore).map(([storeId, group]) => (
                  <div key={storeId} className="p-3.5 bg-slate-50 dark:bg-[#1c2313] rounded-xl border border-slate-200/70 dark:border-[#262f17] space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white">
                        <Store className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
                        <span>{group.storeName}</span>
                      </div>
                      <span className="font-bold text-slate-900 dark:text-white">{formatPrice(group.subtotal)}</span>
                    </div>

                    <div className="text-[11px] text-slate-500 dark:text-slate-400 space-y-1">
                      {group.items.map((it) => (
                        <div key={it.id} className="flex justify-between">
                          <span className="truncate max-w-[200px]">{it.quantity}x {it.name}</span>
                          <span>{formatPrice(it.price * it.quantity)}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-slate-200 dark:border-[#262f17] text-[10px] text-slate-400 dark:text-slate-400 flex items-center justify-between">
                      <span>Fulfillment: DHL Express Tracked</span>
                      <span className="text-brand-600 dark:text-brand-400 font-bold">Independent Sub-Order</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cost Summary */}
              <div className="space-y-2 text-xs pt-2 border-t border-slate-100 dark:border-[#262f17]">
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Subtotal</span>
                  <span className="font-bold text-slate-900 dark:text-white">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Cross-Border Logistics</span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    {estimatedShipping === 0 ? 'FREE' : formatPrice(estimatedShipping)}
                  </span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Taxes & Duties</span>
                  <span className="font-bold text-slate-900 dark:text-white">{formatPrice(estimatedTax)}</span>
                </div>
                <div className="pt-3 border-t border-slate-100 dark:border-[#262f17] flex justify-between items-baseline">
                  <span className="text-sm font-bold text-slate-900 dark:text-white">Total Payable</span>
                  <span className="text-2xl font-black text-slate-900 dark:text-white">{formatPrice(grandTotal)}</span>
                </div>
              </div>

              {/* Pay Button */}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                isLoading={isSubmitting}
                icon={<Lock className="w-4 h-4" />}
              >
                Place Order & Pay {formatPrice(grandTotal)}
              </Button>

              <div className="text-center text-[11px] text-slate-400 dark:text-slate-500">
                Funds held in escrow &bull; 14-day dispute guarantee
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
