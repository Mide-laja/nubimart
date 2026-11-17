# NUBIMART — IMPLEMENTATION PLAN
**Methodology:** Incremental, Test-Driven & Verified Delivery  
**Standard:** Production-Grade Full-Stack Next.js / TypeScript / Tailwind CSS / Prisma ORM

---

## Phase 1: Foundation (Current Priority)
- [x] Project initialization with Next.js App Router, TypeScript, and Tailwind CSS.
- [x] Foundational documentation suite:
  - `MASTER_BLUEPRINT.md`
  - `IMPLEMENTATION_PLAN.md`
  - `ARCHITECTURE.md`
  - `DATABASE_SCHEMA.md`
  - `PROGRESS.md`
  - `README.md`
  - `.env.example`
- [ ] Comprehensive Design System (`/src/components/ui`):
  - Brand identity: Deep Indigo (`#0B192C`), Vibrant Amber/Gold (`#FF9F1C`), Crisp Slate, and Warm Stone.
  - Buttons, Badges, Modals, Dropdowns, Form Inputs, Toast Notifications, Empty & Loading Skeletons.
- [ ] Public Navigation & Layouts:
  - Global Header with Announcement bar, Country/Currency selector, Search bar, Category Mega-menu, Wishlist & Cart drawers/links, Account menu.
  - Comprehensive Global Footer with links to all 23 institutional and marketplace pages.
- [ ] Public Informational & Corporate Pages (all 23 required routes):
  - Home, Shop, Categories, Product Detail, Search Results.
  - About Us, Our Story, Why NUBIMART, How It Works, Global Shopping.
  - Become a Seller, Become an Affiliate, Logistics Partners, Payment Partners, Warehouse Network, Investor Relations, Careers, Blog, News, Contact Us, FAQ, Privacy Policy, Terms & Conditions.
- [ ] Database Setup with Prisma ORM:
  - Relational schema modeling users, roles, stores, products, inventory, orders, fulfillment sub-orders, payments, reviews, and logs.
  - Initial seed data script with verified realistic global products, categories, sellers, and test credentials.
- [ ] Secure Authentication & Role-Based Access Control (RBAC):
  - Registration, Login, Session Management, Password Hashing (bcrypt).
  - Role definitions: `CUSTOMER`, `SELLER`, `ADMIN`.
  - Route guards & server-side authorization.

---

## Phase 2: Marketplace Core
- [ ] Dynamic Product Catalog & Category Browsing:
  - Full-text search with price filtering, category filtering, in-stock toggles, and sorting options.
  - Product Detail Page (PDP) with high-res image gallery, variant selection (size/color), stock level indicator, seller info card, related products, and verified reviews.
- [ ] Shopping Cart & Multi-Vendor Split Checkout:
  - Persistent cart (Database for logged-in users, LocalStorage/Cookie sync for guests).
  - Server-side price recalculation (never trust browser subtotal).
  - Address selection (multi-country formats).
  - Multi-vendor fulfillment order splitting: Single parent Order creates separate `FulfillmentOrder` records per seller.
- [ ] Customer Account Portal (`/account`):
  - Dashboard overview, order history with detailed sub-order statuses, saved addresses, wishlist, notifications, and profile settings.
- [ ] Seller Portal & Storefront Management (`/seller`):
  - Seller onboarding / KYC application form with document upload simulation.
  - Seller dashboard overview (metrics, recent sales).
  - Product management: Add, edit, list, update stock, set variant pricing.
  - Order management: View assigned fulfillment orders, dispatch orders, add tracking codes.
- [ ] Administrator Control Plane (`/admin`):
  - High-level marketplace metrics (GMV, total orders, active users, pending verifications).
  - Seller management: Review KYC applications, Approve / Reject with feedback.
  - Product moderation: Review submitted listings, Approve / Reject listings.
  - Order & Transaction auditing.

---

## Phase 3: Business Operations
- [ ] Commission Engine:
  - Configurable platform commission rates by category and seller tier.
  - Automatic calculation and ledger entries per completed order item.
- [ ] Seller Wallets & Payout Management:
  - Running balance calculation (Available, Pending Escrow, Withdrawn).
  - Withdrawal request workflow for sellers and administrative disbursement tracking.
- [ ] Returns & Refund Workflows:
  - Buyer refund request filing with reason and photo evidence.
  - Seller approval / Admin dispute arbitration.
  - Inventory restoration upon approved return.
- [ ] Customer Support & In-App Helpdesk:
  - Ticket submission and threaded communication between customer, seller, and support agent.
- [ ] Notifications System:
  - In-app notification center for order status updates, seller approvals, and promotion alerts.

---

## Phase 4: Payment Ecosystem
- [ ] Modular Payment Gateway Interface:
  - Unified `PaymentGatewayAdapter` interface defining `initiatePayment`, `verifyPayment`, and `processWebhook`.
- [ ] Paystack Adapter (Launch Market Primary):
  - Checkout redirect / popup initialization, server-to-server transaction verification, signature-verified webhook handler.
- [ ] Flutterwave & Stripe Adapters:
  - Extensible architecture supporting international card and mobile money processing.
- [ ] Transaction Ledger & Idempotency:
  - Protection against duplicate webhook processing via unique event tracking.
  - Decimal-safe monetary accounting and transaction history records.

---

## Phase 5: International Commerce
- [ ] Multi-Country Configuration Engine (38 Countries):
  - Dynamic currency conversion engine with base exchange rates.
  - Dynamic display formatting (e.g., `$1,200.00`, `₦1,850,000`, `£950.00`, `€1,100.00`).
  - Country-specific postal/ZIP requirements, phone codes, and customs tax notices.
- [ ] Multi-Language Foundation:
  - Structural i18n support ready for localized dictionaries.
- [ ] Logistics & Carrier Integration:
  - Shipping rate calculator based on item weight, dimensions, and destination country.
  - Tracking status timeline simulator with real-world stages (Order Placed, Packed, Picked up by Carrier, In Transit, Customs Clearance, Out for Delivery, Delivered).

---

## Phase 6: Advanced Intelligence & Ecosystem Features
- [ ] AI-Powered Shopping Assistant:
  - Interactive contextual assistant advising buyers on product specs, gift ideas, and seller reliability.
- [ ] Intelligent Recommendation Engine:
  - Frequently bought together, category affinity recommendations, and trending score algorithms.
- [ ] Affiliate Marketing System:
  - Unique affiliate referral links, click and conversion tracking, pending/approved commission logs.
- [ ] Warehouse & Stock Management:
  - Multi-warehouse location tracking and regional fulfillment center routing.

---

## Phase 7: Production Preparation & Verification
- [ ] Security Hardening:
  - OWASP Top 10 protection, CSRF mitigation, Content Security Policy headers, strict input sanitization via Zod.
- [ ] Automated Test Suite:
  - Unit tests for financial calculations, order splitting, and authorization policies.
  - Integration tests for complete customer, seller, and admin workflows.
- [ ] Build & Performance Optimization:
  - Next.js static asset caching, image optimization, dynamic imports.
  - Production readiness checklist and verification.
