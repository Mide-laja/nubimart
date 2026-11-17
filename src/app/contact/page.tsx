'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, CheckCircle, Send, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('General Customer Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 dark:bg-[#1f2614] text-brand-700 dark:text-brand-300 text-xs font-bold border border-brand-200 dark:border-[#2f391c]">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Concierge & Support</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Contact NUBIMART Support
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Our global customer support, merchant operations, and escrow resolution desks are available 24/7.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Contact Information Cards */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-[#151a10] rounded-3xl border border-slate-200/80 dark:border-[#262f17] p-6 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Direct Communication Channels</h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-brand-50 dark:bg-[#1c2313] rounded-xl text-brand-600 dark:text-brand-400 shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">Email Desks</div>
                  <div className="text-slate-500 dark:text-slate-400">General: support@nubimart.com</div>
                  <div className="text-slate-500 dark:text-slate-400">Merchants: sellers@nubimart.com</div>
                  <div className="text-slate-500 dark:text-slate-400">Escrow Disputes: claims@nubimart.com</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-brand-50 dark:bg-[#1c2313] rounded-xl text-brand-600 dark:text-brand-400 shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">Telephone Hotlines</div>
                  <div className="text-slate-500 dark:text-slate-400">Africa Hub: +234 1 800 6824</div>
                  <div className="text-slate-500 dark:text-slate-400">Europe Desk: +44 20 7946 0912</div>
                  <div className="text-slate-500 dark:text-slate-400">Americas: +1 (800) 555-0199</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-brand-50 dark:bg-[#1c2313] rounded-xl text-brand-600 dark:text-brand-400 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">Corporate Headquarters</div>
                  <div className="text-slate-500 dark:text-slate-400">NUBIMART Global Trade Inc.</div>
                  <div className="text-slate-500 dark:text-slate-400">Atlantic City Hub, Lagos, Nigeria</div>
                  <div className="text-slate-500 dark:text-slate-400">European Branch: 1 Canada Square, Canary Wharf, London</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white dark:bg-[#151a10] rounded-3xl border border-slate-200/80 dark:border-[#262f17] p-8 shadow-sm">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Message Dispatched!</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                Thank you for contacting NUBIMART. A dedicated resolution specialist has been assigned to your case and will respond within 4 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-[#262f17]">
                Send Us a Message
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Your Full Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Sophia Kensington"
                />
                <Input
                  label="Your Email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="sophia@example.com"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Department / Subject
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-white dark:bg-[#1c2313] border border-slate-300 dark:border-[#2f391c] rounded-lg px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
                >
                  <option value="General Customer Inquiry">General Customer Inquiry</option>
                  <option value="Track International Shipment">Track International Shipment</option>
                  <option value="Seller Onboarding & KYC Support">Seller Onboarding & KYC Support</option>
                  <option value="Escrow Claim or Refund Request">Escrow Claim or Refund Request</option>
                  <option value="Logistics Carrier Partnership">Logistics Carrier Partnership</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Your Message
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Please include relevant order numbers or details..."
                  className="w-full bg-white dark:bg-[#1c2313] border border-slate-300 dark:border-[#2f391c] rounded-lg p-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-brand-500"
                />
              </div>

              <Button type="submit" variant="primary" size="md" className="w-full" icon={<Send className="w-4 h-4" />}>
                Submit Inquiry to Support
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
