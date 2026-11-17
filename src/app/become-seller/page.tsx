'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Store,
  ShieldCheck,
  Globe,
  Upload,
  CheckCircle,
  Building,
  CreditCard,
  AlertCircle,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { SUPPORTED_COUNTRIES } from '@/lib/constants/countries';

export default function BecomeSellerPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();

  const [businessName, setBusinessName] = useState('');
  const [businessType, setBusinessType] = useState('REGISTERED_BUSINESS');
  const [regNumber, setRegNumber] = useState('');
  const [taxId, setTaxId] = useState('');
  const [countryCode, setCountryCode] = useState('NG');
  const [storeName, setStoreName] = useState('');
  const [storeDescription, setStoreDescription] = useState('');
  const [bankName, setBankName] = useState('');
  const [bankAccountNumber, setBankAccountNumber] = useState('');
  const [bankAccountName, setBankAccountName] = useState('');
  const [idDocumentUrl, setIdDocumentUrl] = useState('https://placehold.co/800x600/png?text=Passport+Uploaded');
  const [proofOfAddressUrl, setProofOfAddressUrl] = useState('https://placehold.co/800x600/png?text=Business+Cert+Uploaded');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const res = await fetch('/api/seller/onboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessName,
          businessType,
          regNumber,
          taxId,
          countryCode,
          storeName,
          storeDescription,
          bankName,
          bankAccountNumber,
          bankAccountName,
          idDocumentUrl,
          proofOfAddressUrl,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit seller application');
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-16 pb-20">
      {/* Hero Banner */}
      <section className="bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 dark:from-[#0a0c08] dark:via-[#11160a] dark:to-[#0a0c08] text-white py-16 sm:py-20 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 space-y-4 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/20 text-brand-400 text-xs font-bold border border-brand-500/30">
            <ShieldCheck className="w-4 h-4" />
            <span>NUBIMART Global Merchant Program</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Sell to Discerning Buyers <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 via-gold-300 to-gold-400">
              Across 38 Countries
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Expand your artisan craft, fashion brand, or manufacturing business internationally. Benefit from integrated DHL/FedEx logistics, multi-currency payouts, and escrow buyer trust.
          </p>
        </div>
      </section>

      {/* Form Container */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6">
        {success ? (
          <div className="bg-white dark:bg-[#151a10] rounded-3xl border border-slate-200 dark:border-[#262f17] p-8 sm:p-12 text-center space-y-5 shadow-premium">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">Application Submitted for Review!</h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                Thank you for applying to sell on NUBIMART. Our compliance and risk officers inspect all business verification documents within 24 to 48 hours.
              </p>
            </div>
            <div className="pt-4 flex justify-center gap-3">
              <button
                onClick={() => router.push('/seller')}
                className="px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold rounded-xl shadow-md transition-colors"
              >
                Access Merchant Portal
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white dark:bg-[#151a10] rounded-3xl border border-slate-200/80 dark:border-[#262f17] p-8 sm:p-10 shadow-premium space-y-8">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                Seller Onboarding & KYC Application
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Please provide accurate legal and operational details for marketplace verification.
              </p>
            </div>

            {error && (
              <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Business Identification */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 pb-2 border-b border-slate-100 dark:border-[#262f17] flex items-center gap-2">
                  <Building className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                  <span>1. Business Information</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Registered Business Name"
                    required
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="e.g. Afritex Luxury Ltd"
                  />
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                      Entity Type
                    </label>
                    <select
                      value={businessType}
                      onChange={(e) => setBusinessType(e.target.value)}
                      className="w-full bg-white dark:bg-[#1c2313] border border-slate-300 dark:border-[#2f391c] rounded-lg px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
                    >
                      <option value="REGISTERED_BUSINESS">Registered Business / LLC</option>
                      <option value="CORPORATION">Corporation / Enterprise</option>
                      <option value="INDIVIDUAL">Sole Trader / Artisan Individual</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Input
                    label="Registration Number"
                    required
                    value={regNumber}
                    onChange={(e) => setRegNumber(e.target.value)}
                    placeholder="e.g. RC-194029"
                  />
                  <Input
                    label="Tax ID / TIN / EIN"
                    required
                    value={taxId}
                    onChange={(e) => setTaxId(e.target.value)}
                    placeholder="e.g. TIN-882910"
                  />
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                      Country of Operation
                    </label>
                    <select
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      className="w-full bg-white dark:bg-[#1c2313] border border-slate-300 dark:border-[#2f391c] rounded-lg px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
                    >
                      {SUPPORTED_COUNTRIES.map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.flag} {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Storefront Setup */}
              <div className="space-y-4 pt-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 pb-2 border-b border-slate-100 dark:border-[#262f17] flex items-center gap-2">
                  <Store className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                  <span>2. Storefront Profile</span>
                </h3>

                <Input
                  label="Store Display Name"
                  required
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  placeholder="e.g. Afritex Global Heritage"
                />

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Store Bio & Specialization
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={storeDescription}
                    onChange={(e) => setStoreDescription(e.target.value)}
                    placeholder="Describe your craft, materials, quality standards, and heritage..."
                    className="w-full bg-white dark:bg-[#1c2313] border border-slate-300 dark:border-[#2f391c] rounded-lg p-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              {/* Settlement Bank Details */}
              <div className="space-y-4 pt-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 pb-2 border-b border-slate-100 dark:border-[#262f17] flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                  <span>3. Settlement & Payout Account</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Input
                    label="Bank / Financial Institution"
                    required
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    placeholder="e.g. Zenith Bank / Chase"
                  />
                  <Input
                    label="Account / IBAN Number"
                    required
                    value={bankAccountNumber}
                    onChange={(e) => setBankAccountNumber(e.target.value)}
                    placeholder="10-digit NUBAN or IBAN"
                  />
                  <Input
                    label="Beneficiary Account Name"
                    required
                    value={bankAccountName}
                    onChange={(e) => setBankAccountName(e.target.value)}
                    placeholder="Matching business name"
                  />
                </div>
              </div>

              {/* Document Uploads */}
              <div className="space-y-4 pt-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 pb-2 border-b border-slate-100 dark:border-[#262f17] flex items-center gap-2">
                  <Upload className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                  <span>4. Identity Verification Documents</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl border border-dashed border-slate-300 dark:border-[#2f391c] bg-slate-50 dark:bg-[#1c2313] text-center space-y-1">
                    <span className="text-xs font-bold text-slate-800 dark:text-white">Director Government ID</span>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400">Passport, National ID or Driver&apos;s License</p>
                    <span className="inline-block mt-2 px-2.5 py-1 bg-white dark:bg-[#151a10] border border-slate-200 dark:border-[#2f391c] rounded text-[10px] text-brand-700 dark:text-brand-400 font-bold">
                      ✓ Ready for Submission
                    </span>
                  </div>

                  <div className="p-4 rounded-xl border border-dashed border-slate-300 dark:border-[#2f391c] bg-slate-50 dark:bg-[#1c2313] text-center space-y-1">
                    <span className="text-xs font-bold text-slate-800 dark:text-white">Certificate of Incorporation</span>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400">Official registry or utility bill (under 90 days)</p>
                    <span className="inline-block mt-2 px-2.5 py-1 bg-white dark:bg-[#151a10] border border-slate-200 dark:border-[#2f391c] rounded text-[10px] text-brand-700 dark:text-brand-400 font-bold">
                      ✓ Ready for Submission
                    </span>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                isLoading={isLoading}
              >
                Submit Merchant Application for Review
              </Button>
            </form>
          </div>
        )}
      </section>
    </div>
  );
}
