# NUBIMART
> **One Marketplace. Infinite Possibilities.**

NUBIMART is a full-stack, enterprise-grade multi-vendor e-commerce marketplace engineered to connect verified international sellers with buyers across 38 countries.

---

## Key Features & Highlights

- **Multi-Vendor Architecture:** Independent seller storefronts, multi-tier KYC verification, order fulfillment splitting, and automated commission ledger.
- **38 Countries & Multi-Currency Engine:** Real-time currency conversions, localized addresses, regional payment gateway prioritization, and global shipping calculations.
- **Unified Split Checkout:** Single cart checkout supporting multi-vendor purchases with server-side price validation, stock reservation, and atomic sub-order creation.
- **Three Dedicated Portals:**
  - **Buyer Account:** Order tracking timelines, saved addresses, wishlist, reviews, notifications.
  - **Seller Dashboard:** Catalog management, stock controls, fulfillment dispatch, revenue wallet, withdrawal requests.
  - **Admin Control Plane:** Seller approval queue, product moderation, platform commission configuration, transaction audits.
- **Modular Payment Ecosystem:** Paystack, Flutterwave, Stripe, and sandbox fallback adapters with signature-verified webhook handling.
- **AI-Powered Capabilities:** Contextual shopping assistant and product recommendation engine.

---

## Technology Stack

- **Framework:** Next.js (App Router, Server Actions, Route Handlers)
- **Frontend:** React, TypeScript, Tailwind CSS, Lucide Icons
- **Database & ORM:** Prisma ORM (SQLite for instant zero-config local development, PostgreSQL ready for production)
- **Security:** bcrypt password hashing, JWT session management, RBAC (`CUSTOMER`, `SELLER`, `ADMIN`), Zod validation schemas
- **Testing:** Jest / Node test runner, manual end-to-end verification workflows

---

## Quick Start Guide

### 1. Prerequisites
- Node.js >= 18.17.0 (Verified with Node v20.20.0)
- npm >= 9.0.0

### 2. Installation
```bash
# Clone or navigate to the directory
cd Nubimart

# Install all dependencies
npm install

# Setup environment variables
cp .env.example .env

# Generate Prisma Client & push schema to local database
npx prisma db push

# Seed database with realistic marketplace data (stores, products, categories, demo users)
npm run db:seed
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Demo Accounts (Seeded)

| Role | Email | Password | Permissions |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@nubimart.com` | `Admin2026!` | Full platform administration, KYC approvals, product moderation |
| **Seller** | `seller@nubimart.com` | `Seller2026!` | Store management, product listings, fulfillment, wallet |
| **Customer** | `customer@nubimart.com` | `Customer2026!` | Product shopping, cart, checkout, order history |

---

## Architectural Documentation
- [MASTER_BLUEPRINT.md](file:///c:/Users/Mide/Downloads/Nubimart/MASTER_BLUEPRINT.md)
- [IMPLEMENTATION_PLAN.md](file:///c:/Users/Mide/Downloads/Nubimart/IMPLEMENTATION_PLAN.md)
- [ARCHITECTURE.md](file:///c:/Users/Mide/Downloads/Nubimart/ARCHITECTURE.md)
- [DATABASE_SCHEMA.md](file:///c:/Users/Mide/Downloads/Nubimart/DATABASE_SCHEMA.md)
- [PROGRESS.md](file:///c:/Users/Mide/Downloads/Nubimart/PROGRESS.md)
