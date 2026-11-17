# NUBIMART — MASTER BLUEPRINT
**Tagline:** One Marketplace. Infinite Possibilities.  
**Version:** 1.0.0 (Foundation)  
**Target Footprint:** 38 Countries across Africa, Europe, North America, Middle East, and Asia-Pacific.

---

## 1. Executive Summary & Product Vision
NUBIMART is an enterprise-grade, multi-vendor global e-commerce marketplace engineered to connect verified sellers with international buyers. Unlike traditional localized retail platforms, NUBIMART is architected from its inception to eliminate cross-border friction: supporting multi-currency transactions, localized logistics networks, country-specific payment methods (Paystack, Flutterwave, Monnify, Stripe, PayPal), automated seller onboarding with multi-tier verification, real-time inventory management, multi-seller split checkout, and intelligent AI-assisted discovery.

---

## 2. Global Footprint & Country Strategy (38 Countries)
NUBIMART is designed to operate in phases across 38 strategically selected markets:
1. **West Africa (Anchor Launch Markets):** Nigeria (NGN), Ghana (GHS), Côte d'Ivoire (XOF), Senegal (XOF).
2. **East & Southern Africa:** Kenya (KES), South Africa (ZAR), Rwanda (RWF), Uganda (UGX), Tanzania (TZS), Egypt (EGP), Morocco (MAD).
3. **Europe & United Kingdom:** United Kingdom (GBP), Germany (EUR), France (EUR), Netherlands (EUR), Italy (EUR), Spain (EUR), Ireland (EUR), Poland (PLN), Sweden (SEK), Switzerland (CHF), Belgium (EUR), Austria (EUR), Portugal (EUR).
4. **North America:** United States (USD), Canada (CAD).
5. **Middle East & Asia-Pacific:** United Arab Emirates (AED), Saudi Arabia (SAR), Qatar (QAR), Turkey (TRY), India (INR), Singapore (SGD), Malaysia (MYR), Australia (AUD), New Zealand (NZD), Japan (JPY), China/Hong Kong (HKD).

Each country configuration defines:
- Default and supported currencies with ISO currency codes and conversion factors.
- Localized tax/VAT/GST rules.
- Local payment gateway priority (e.g., Paystack/Flutterwave in West Africa, Stripe/PayPal in US/UK/Europe).
- Domestic and international logistics partners (DHL, FedEx, UPS, local courier partners).
- Dialing codes, address formats, and localized regional compliance requirements.

---

## 3. Marketplace Multi-Vendor Ecosystem
### A. The Buyer Journey
- **Discovery:** Global search with autocomplete, category hierarchies, facet filters (price, rating, brand, country of origin, free shipping), flash sales, daily deals, and AI-recommended feeds.
- **Cart & Multi-Vendor Checkout:** Single unified checkout allowing items from multiple sellers. The backend transparently splits orders into seller-specific fulfillment sub-orders with independent tracking, shipping rates, and dispute channels.
- **Customer Account Portal:** Profile management, saved multi-country addresses, order history with live status timelines, wishlist, product review submission, return/exchange claims, notification center, and affiliate referral link management.

### B. The Seller Journey (Storefronts & Dashboard)
- **Onboarding & KYC:** Business registration data, tax ID, proof of address, director ID verification, bank/payout account details. State transitions: `DRAFT` → `SUBMITTED` → `UNDER_REVIEW` → `VERIFIED` (or `REJECTED` with reason).
- **Storefront Management:** Custom store banner, logo, bio, verified badge, return policies, store ratings, and dedicated seller URL slug (`/stores/[slug]`).
- **Catalog & Inventory Operations:** Single and multi-variant products (size, color, material), SKU tracking, safety stock alerts, warehouse assignment, product submission awaiting marketplace moderation.
- **Order Fulfillment & Logistics:** Print pick-lists/packing slips, mark orders as dispatched, enter carrier tracking numbers, manage returns.
- **Financials & Payouts:** Real-time wallet balance, commission deduction tracking, gross merchandise value (GMV), withdrawal request workflows with automated admin audit trails.

### C. The Marketplace Administrator Journey
- **Platform Analytics:** Real-time GMV, active buyer/seller counts, orders by status, commission revenues.
- **Seller Verification Center:** Multi-step inspection of business documents, approve/reject/suspend workflows with audit reasons.
- **Product Moderation Queue:** Review new and updated listings for compliance, quality, and counterfeit prevention before public catalog publishing.
- **Financial Controls:** Configurable marketplace commission rates (global default, category-specific, or seller-tiered), payout batch approvals, fee structures.
- **Platform Governance:** Role-Based Access Control (`CUSTOMER`, `SELLER`, `ADMIN`), system audit logs, country/currency configuration toggles.

---

## 4. Monetization & Revenue Models
1. **Commission on Sales:** Variable commission (default 8% to 15% depending on category) deducted at order settlement.
2. **Seller Subscription Tiers:** Free Starter tier, Professional Merchant tier, and Enterprise Global tier with reduced commission fees and premium storefront features.
3. **Featured & Sponsored Listings:** Pay-per-placement placement on category headers and search result spotlights.
4. **Logistics & Fulfillment Margin:** Margins on platform-negotiated international shipping rates via partner carriers.
5. **Affiliate & Referral Network:** Performance-based affiliate payouts with anti-fraud click attribution.

---

## 5. Technology Principles
- **Modularity:** Unified codebase cleanly separated into Domain Services, API Handlers, and UI Components.
- **Server Authority:** All prices, discounts, tax rates, inventory deductions, and permissions are enforced strictly on the server. The client never calculates payable amounts.
- **Data Integrity & Idempotency:** Financial and inventory transactions use atomic boundaries and idempotent webhook processing to eliminate duplicate charges or stock desynchronization.
- **Accessible & Internationalized UI:** Responsive mobile-first design, keyboard navigable, screen-reader friendly, support for dynamic currency rendering.
