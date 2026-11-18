# NUBIMART — Comprehensive Supabase PostgreSQL Migration Plan

> **Document Version:** 1.0.0  
> **Date:** November 18, 2026  
> **Status:** Proposal / Pending Review  
> **Target Environment:** Supabase PostgreSQL + Prisma ORM + Next.js (Vercel)

---

## Executive Summary

This document provides a formal assessment and execution roadmap for transitioning **NUBIMART** from Neon PostgreSQL to **Supabase PostgreSQL** as the primary database platform.

NUBIMART is a full-stack, enterprise-grade multi-vendor e-commerce marketplace featuring multi-currency transactions across 38 countries, automated vendor fulfillment splitting, and escrow workflows. Maintaining absolute application stability, database integrity, and security throughout this infrastructure transition is non-negotiable.

**Core Recommendation:**
1. **Adopt Supabase PostgreSQL** as the managed primary database engine, leveraging Supabase's native connection pooler (**Supavisor**) to handle Vercel serverless runtime concurrency.
2. **Retain Prisma ORM (v5.22.0)** as the application-level data access layer with dual-connection configuration (`DATABASE_URL` for runtime pooling, `DIRECT_URL` for DDL migrations/seeding).
3. **Retain the existing custom JWT/bcrypt authentication system** rather than migrating to Supabase Auth (`GoTrue`). The current authentication architecture is secure, self-contained, and deeply interwoven with 25 relational models and role-based access control (RBAC).
4. **Prepare Supabase Storage buckets** for seller KYC verification documents and dynamic product media as an incremental enhancement.

---

## 1. Current Database Provider & Configuration Audit

### 1.1 Database Provider
- **Current Active Target:** Neon Serverless PostgreSQL (`ep-gentle-cell-za7at929.c-2.eu-west-2.aws.neon.tech`).
- **Historical Development Database:** SQLite (`prisma/dev.db`, 307 KB), used during initial local prototyping.

### 1.2 Current Database Configuration
- In `prisma/schema.prisma`:
  ```prisma
  datasource db {
    provider = "postgresql"
    url      = env("DATABASE_URL")
  }

  generator client {
    provider = "prisma-client-js"
  }
  ```
- In `.env` (local workspace):
  - `DATABASE_URL` is configured to connect to the Neon project pooler with parameters `sslmode=require&connect_timeout=60&connection_limit=20`.
  - Sensitive database credentials are maintained exclusively in local environment files (`.env`) and are protected by `.gitignore`.

### 1.3 Application Connectivity & State
- **Schema Push Status:** The Prisma schema was synchronized to Neon via `prisma db push`. All 25 database tables and relational constraints exist on the Neon instance.
- **Data State:** The Neon database currently contains **zero production customer records and zero live transactions**. Initial database seeding was halted due to connection pool timeouts during bulk table resets.
- **Production Deployment Status:** The application has not yet been linked to a production Vercel project or domain. As a result, no production users or live financial transactions exist on Neon that would require complex database replication.

### 1.4 Prisma Schema & Migration History
- **Prisma Version:** `@prisma/client@^5.22.0` and `prisma@^5.22.0`.
- **Migration History:** There is no `prisma/migrations/` directory. Schema synchronization has been managed via `prisma db push`.
- **Model Inventory (25 Models):**
  - **Identity & Access:** `User`, `Address`, `AuditLog`, `Notification`
  - **Multi-Vendor & Storefronts:** `SellerProfile`, `Store`, `SellerPayout`
  - **Catalog & Inventory:** `Category`, `Product`, `ProductImage`, `ProductVariant`, `Warehouse`, `Inventory`
  - **Commerce & Cart:** `Cart`, `CartItem`, `Wishlist`, `Coupon`, `Affiliate`
  - **Orders & Escrow:** `Order`, `FulfillmentOrder`, `OrderItem`, `Payment`
  - **Logistics & Reviews:** `Shipment`, `TrackingEvent`, `Review`

---

## 2. Authentication Evaluation: Custom JWT vs. Supabase Auth

A critical requirement is to evaluate whether to migrate to Supabase Auth (`GoTrue`) or retain the existing authentication system.

| Evaluation Metric | Current Custom System (JWT + bcrypt) | Supabase Auth (`GoTrue`) |
| :--- | :--- | :--- |
| **User Identity Storage** | Single `User` table in public Postgres schema | Separate `auth.users` internal schema managed by GoTrue |
| **Foreign Key Relations** | 15+ models reference `User.id` (CUID) directly with Cascade rules | Requires schema rewrite from CUID to UUID, or database triggers syncing `auth.users` to `public.User` |
| **Session Transport** | HTTP-only, secure, `SameSite=lax` cookie (`nubimart_session`) | LocalStorage / Cookie token via `@supabase/ssr` client SDK |
| **RBAC Roles** | Strongly typed (`CUSTOMER`, `SELLER`, `ADMIN`) with dedicated API middleware | App metadata claims requiring custom Postgres RLS policies or token decoders |
| **Seller & KYC Coupling** | Atomic Prisma relation: `User.sellerProfile.store` fetched in single query | Multi-step asynchronous lookup combining Supabase client and Prisma |
| **Test Suite Compatibility** | 100% verified by existing tests (`workflow-test.ts`, `e2e-verification.ts`) | Entire test suite would need rewriting to mock Supabase Auth APIs |
| **Regression Risk** | **Zero** (fully functional, tested, and secure) | **High** (requires refactoring client context, API routes, and models) |

### Strategic Recommendation
**Retain the existing custom JWT/bcrypt authentication system.**  
- Introducing Supabase Auth would create competing identity systems or require intrusive schema migrations (rewriting CUID primary keys, adding webhook/trigger synchronization between schemas, and refactoring `/api/auth/*` handlers).
- The existing authentication system is secure, implements industry-standard bcrypt salt hashing (10 rounds), uses signed JSON Web Tokens inside HTTP-only cookies, and enforces strict Zod input validation.
- Supabase PostgreSQL can be used as a high-performance standard PostgreSQL engine without adopting GoTrue.

---

## 3. Storage Architecture: Supabase Storage Integration

NUBIMART requires secure and scalable storage for media assets. Currently, product images and store banners reference remote CDN URLs, while local branding assets are served from `/public`.

### Storage Strategy
Supabase Storage can be integrated cleanly without touching core transaction logic:
1. **Public Bucket — `marketplace-media`:**
   - **Purpose:** Product gallery images, category icons, store logos, and banners.
   - **Access Policy:** Public read access via Supabase CDN; authenticated seller/admin write access.
2. **Private Bucket — `kyc-verification-docs`:**
   - **Purpose:** Seller business registration documents, passport/ID scans, and proof of address.
   - **Access Policy:** Strict private access. Only accessible by platform SuperAdmins and the owning seller via time-limited signed URLs (TTL: 15 minutes).

*Note: File uploads can initially continue referencing standard HTTPS URLs in the database, with Supabase Storage client integration layered in as a subsequent enhancement.*

---

## 4. Prisma Compatibility & Connection Pooling Strategy

### 4.1 Compatibility Confirmation
Prisma v5.22.0 provides comprehensive, production-grade support for Supabase PostgreSQL.

### 4.2 Connection Configuration for Serverless (Vercel)
Serverless architectures instantiate and tear down functions rapidly. Direct connections to PostgreSQL (Port 5432) can quickly exhaust PostgreSQL's connection limits (`max_connections`).

Supabase addresses this through **Supavisor**, its built-in connection pooler operating in **Transaction Mode**.

### 4.3 Dual-Connection Setup in Prisma
To achieve flawless operation across both deployment runtime and schema operations, Prisma's `directUrl` feature will be utilized:

```prisma
datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL") // Supavisor Transaction Pooler (Port 6543)
  directUrl = env("DIRECT_URL")   // Direct PostgreSQL Connection (Port 5432)
}
```

- **`DATABASE_URL` (Port 6543, Transaction Mode with `?pgbouncer=true`):**
  Used by Next.js route handlers, server actions, and API endpoints during runtime on Vercel. Ensures fast query execution without exhausting database connections.
- **`DIRECT_URL` (Port 5432, Session Mode):**
  Used exclusively by the Prisma CLI during `prisma db push`, `prisma migrate`, and database seeding scripts (`seed.ts`), which require advisory locks and non-pooled DDL commands.

---

## 5. Required Schema & Environment Changes

### 5.1 Schema Changes
Only one minor modification is required in `prisma/schema.prisma`:
```diff
 datasource db {
-  provider = "postgresql"
-  url      = env("DATABASE_URL")
+  provider  = "postgresql"
+  url       = env("DATABASE_URL")
+  directUrl = env("DIRECT_URL")
 }
```
**No entity, model, relation, or column changes are needed.** The schema remains 100% backward-compatible with all existing business logic, seed scripts, and verification tests.

### 5.2 Environment Variables Required

#### Local Development (`.env`)
```bash
# Application Environment
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME="NUBIMART"
NEXT_PUBLIC_APP_TAGLINE="One Marketplace. Infinite Possibilities."

# Supabase PostgreSQL Database (Dual-URL)
DATABASE_URL="postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1"
DIRECT_URL="postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:5432/postgres"

# Authentication Secrets
JWT_SECRET="[SECURE-RANDOM-32-CHAR-STRING]"
NEXTAUTH_SECRET="[SECURE-RANDOM-32-CHAR-STRING]"
NEXTAUTH_URL=http://localhost:3000

# Platform SuperAdmin Credentials
ADMIN_EMAIL=admin@nubimart.com
ADMIN_PASSWORD=Admin2026!

# Localization & Multi-Currency Defaults
NEXT_PUBLIC_DEFAULT_CURRENCY=USD
NEXT_PUBLIC_DEFAULT_COUNTRY=US

# Payment Gateway API Keys (Test Sandbox)
PAYSTACK_PUBLIC_KEY=pk_test_sample_paystack_key
PAYSTACK_SECRET_KEY=sk_test_sample_paystack_key
PAYSTACK_WEBHOOK_SECRET=sample_webhook_secret

FLUTTERWAVE_PUBLIC_KEY=FLWPUBK_TEST-sample
FLUTTERWAVE_SECRET_KEY=FLWSECK_TEST-sample
FLUTTERWAVE_ENCRYPTION_KEY=FLWSECK_TEST_ENCRYPTION_KEY

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_sample_stripe_key
STRIPE_SECRET_KEY=sk_test_sample_stripe_key
STRIPE_WEBHOOK_SECRET=whsec_sample_stripe_webhook_secret

# Logistics Providers (Test Mode)
DHL_API_KEY=dhl_sample_key
FEDEX_API_KEY=fedex_sample_key
```

#### Production Deployment (Vercel Project Settings)
The same environment variables will be configured in Vercel with:
- `NODE_ENV=production`
- `NEXT_PUBLIC_APP_URL=https://[YOUR-VERCEL-DOMAIN].vercel.app`
- Cryptographically strong values for `JWT_SECRET` and `NEXTAUTH_SECRET`.

---

## 6. Recommended Migration Procedure

Once approved, the migration will be executed through the following stages:

```mermaid
flowchart TD
    A["Stage 1: Provision Supabase Project"] --> B["Stage 2: Retrieve Pooled & Direct Connection Strings"]
    B --> C["Stage 3: Update schema.prisma with directUrl"]
    C --> D["Stage 4: Update local .env"]
    D --> E["Stage 5: Run prisma generate & prisma db push"]
    E --> F["Stage 6: Seed Supabase DB with Master Dataset"]
    F --> G["Stage 7: Execute Automated Verification Test Suite"]
    G --> H["Stage 8: Commit Code & Deploy to Vercel"]
```

### Stage 1: Provisioning Supabase Project
1. Create a new Supabase project named `nubimart-production` in the desired region (e.g., Frankfurt `eu-central-1` or London `eu-west-2`).
2. Record the database password securely.
3. In Supabase Dashboard → **Project Settings** → **Database**, locate:
   - Connection Pooling string (Transaction Mode, port 6543)
   - Direct Connection string (Session Mode, port 5432)

### Stage 2: Schema & Environment Configuration
1. Update `prisma/schema.prisma` to include `directUrl = env("DIRECT_URL")`.
2. Update `.env` with the Supabase connection strings.
3. Run `npx prisma generate` to rebuild the local Prisma Client artifacts.

### Stage 3: Schema Synchronization
1. Execute `npx prisma db push`.
   - Prisma will automatically route through `DIRECT_URL` to create all 25 tables, unique constraints, and foreign key indexes in Supabase.

### Stage 4: Database Seeding
1. Execute `npx tsx prisma/seed.ts`.
   - Seeds the SuperAdmin account (`admin@nubimart.com`).
   - Seeds verified sellers (`Afritex`, `TechNexus`, `Savanna Organics`) and review-queue applicants (`Atlas Heritage`).
   - Seeds 6 product categories and 6 detailed products with variants, images, and inventory across 2 international fulfillment hubs.
   - Seeds multi-vendor split order `NUB-2026-90412`, escrow payments, DHL/FedEx shipments, and tracking checkpoints.

### Stage 5: Quality Assurance & Verification
1. Run `npm run test`:
   - Runs `workflow-test.ts` (verifies database integrity, entity relationships, currency calculations, and bcrypt cryptography).
   - Runs `e2e-verification.ts` (verifies catalog endpoints, authentication tokens, and order splitting).
2. Run `npm run build`:
   - Verifies all 48 Next.js static and dynamic routes compile cleanly with zero TypeScript or linting errors.

### Stage 6: Vercel Production Deployment
1. Set the repository environment variables in Vercel.
2. Ensure Vercel build command is set to: `prisma generate && next build`.
3. Deploy to production and verify live storefront, login, and order tracking.

---

## 7. Potential Risks & Mitigation Strategies

| Potential Risk | Severity | Root Cause | Mitigation Strategy |
| :--- | :--- | :--- | :--- |
| **Connection Starvation on Serverless** | High | Multiple Vercel serverless function instances creating unbounded Postgres connections | Use Supavisor Transaction Pooler (`DATABASE_URL`, port 6543) with `?pgbouncer=true` and limit connection pooling per instance. |
| **Migration Lockout / Timeout** | Medium | Running schema push/migrations through a transaction pooler that prohibits advisory locks | Isolate schema DDL operations to `DIRECT_URL` (port 5432). |
| **Cold-Start Latency** | Low | New serverless lambdas initiating first TLS handshake with Supabase | Enable global edge caching on read-only public routes; utilize pooled connections. |
| **Accidental Credential Exposure** | Critical | Committing connection strings containing plaintext passwords to GitHub | Keep `.env` strictly gitignored; reference only placeholder examples in `.env.example`; add real values directly in Vercel secrets. |
| **Data Loss from Prior Database** | Negligible | Changing database providers while live data exists | Confirmed Neon contains no active production users or orders; the master dataset is reproduced deterministically via `prisma/seed.ts`. |

---

## 8. Summary of Deliverables & Next Steps

| Deliverable | Description | Current State |
| :--- | :--- | :--- |
| **Architecture Audit** | Review of Neon, SQLite, Prisma, and Auth systems | Completed (Section 1 & 2) |
| **Migration Plan** | Formal report in `docs/SUPABASE_MIGRATION_PLAN.md` | Created & Documented |
| **Supabase Credentials** | Project URL, Pooler URL, Direct URL | Awaiting User / Supabase Project Setup |
| **Implementation** | Code changes, schema push, seeding, and Vercel deploy | **On hold pending user approval of this plan** |

---
*End of Report. Awaiting user feedback before proceeding with any modifications.*
