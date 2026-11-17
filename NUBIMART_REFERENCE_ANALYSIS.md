# NUBIMART Reference Website Analysis & Architectural Specification

**Reference Website:** [https://nubimart.com](https://nubimart.com)  
**Target Codebase:** NUBIMART (Next.js 14 App Router, TypeScript, Tailwind CSS, Prisma ORM, SQLite/PostgreSQL)  
**Date of Inspection:** October 2026  
**Inspection Mode:** HTTP Protocol & DOM Extraction, Network Analysis, CSS/Theme Disassembly, Script & Template Reverse Engineering  

---

## Executive Summary

The purpose of this analysis is to thoroughly evaluate the design quality, user experience, visual identity, structural patterns, and functional architecture of the live reference website `https://nubimart.com`, and formulate a strategic roadmap to adapt its strongest marketplace patterns into the modern full-stack Next.js NUBIMART codebase.

The reference website operates as a global multi-sector e-commerce platform and business directory connecting international shoppers and enterprises across continents (Asia, Europe, North America, South America, Africa, Oceania). While the reference platform is implemented on WordPress/WooCommerce with Elementor, OceanWP, and WCFM Marketplace, NUBIMART's target implementation is a modern, high-performance Next.js 14 App Router application with custom backend API route handlers, Prisma ORM, split-checkout logic, and multi-currency conversion.

---

## 1. Inspection Methodology & Limitations

### 1.1 Methodology
- **Automated Deep Crawl:** Programmatically fetched raw HTML, asset manifests, and stylesheets across 10 key entry points:
  1. Homepage (`/`) — 2.37 MB DOM footprint
  2. Shop Catalog (`/shop/`) — 2.33 MB
  3. Category Archive (`/product-category/groceries-food/`) — 2.33 MB
  4. Store Directory (`/store-list/`) — 2.39 MB
  5. Shopping Cart (`/cart/`) — 2.53 MB
  6. Customer Account & Authentication (`/my-account/`) — 2.33 MB
  7. Merchant Onboarding (`/sell-on-nubimart/`) — 2.33 MB
  8. Enterprise Solutions (`/enterprise-solutions/`) — 2.33 MB
  9. Logistics & Cargo Tracking (`/logistics/`) — 2.34 MB
  10. Price Comparison (`/evercompare/`) & Order Tracking (`/track-your-order/`) — 2.33 MB
- **DOM & Style Parsing:** Analyzed 28 inline stylesheet blocks, 92 external stylesheet links, 2,451 CSS custom properties, and 58 dominant hex color variables.
- **Component & Widget Inventory:** Extracted 481 page list elements, 200 nested accordion items, 66 heading blocks, and 65 core graphics.

### 1.2 Inspection Limitations
- **Empty Catalog State:** On the live reference website, the shop catalog (`/shop/`) and category archives currently return *"No products were found matching your selection."* No active products are published in the live public catalog.
- **Empty Store Directory:** The `/store-list/` route returns *"Showing 1-0 of 0 results. No store found!"*.
- **Checkout Redirection:** Attempting to access `/checkout/` without cart items issues an HTTP 302 redirect back to `/cart/`. Consequently, the final checkout payment step was inspected via its WooCommerce form definitions rather than interactive transactional submissions.
- **Browser Execution:** Due to headless execution without a graphical browser window, visual rendering was reconstructed via stylesheet and DOM layout extraction.

---

## 2. Phase 1: Visual Analysis & Design System

### 2.1 Visual Identity & Brand Persona
- **Brand Positioning:** "Endless Shopping, Endless Joy & Endless Possibilities." A cross-border commerce gateway integrating consumer goods, industrial supplies, international shopping directories, and enterprise logistics.
- **Aesthetic Tone:** Clean, international, and utilitarian. It combines corporate trust with consumer marketplace accessibility.
- **Primary Imagery:** Vector world map coordinates (`map.jpg`), country national flags (Nigeria, China, USA, UK, UAE, India, Singapore, Japan, South Korea, Germany, France, etc.), and international logistics partner emblems (DHL Express, UPS, FedEx).

### 2.2 Color Palette
The color hierarchy is structured around high-contrast neutrals with purposeful functional accents:
- **Primary Dominant Dark:** `#000000` / `#222222` / `#333333` — Applied to navigation headers, primary buttons, accordion headers, and high-emphasis typography.
- **Primary Hover Dark:** `#4F4F4F` / `#595A5A` — Used for button hover states and active tabs.
- **Secondary / Accent Gold:** `#FBB102` / `#FFA500` / `#BE6400` — Star ratings, verified badges, and promotional tags.
- **Alert / Sale Red:** `#AB2E31` / `#A90707` / `#FF0000` — Discount tags, urgent announcements, and error states.
- **Success Green:** `#00A901` / `#008000` — In-stock indicators, verified seller checkmarks, and secure payment highlights.
- **Accent Indigo / Blue:** `#605BE5` — Modern interactive highlights and focus rings.
- **Neutral Canvas & Surfaces:**
  - Page Background: `#FFFFFF` (Pure White)
  - Card & Section Backgrounds: `#F8F9FA`, `#F4F4F4`, `#EDEDED`, `#EEEEEE`
  - Subtle Borders & Dividers: `#DDDDDD`, `#E8E8E8`, `#CCCCCC`

### 2.3 Typography
- **Primary Typeface:** `Montserrat` (Google Fonts, weights 100 through 900).
- **Secondary / System Fallback:** `Roboto`, `Lato`, `Sans-Serif`.
- **Typographic Scale:**
  - Hero Taglines: 36px–52px / 800 ExtraBold, tight letter-spacing (-0.02em)
  - Section Titles (H2): 24px–32px / 700 Bold
  - Component Headings (H3/H4): 16px–20px / 600 SemiBold
  - Body Text: 14px–15px / 400 Regular, line height 1.6
  - Overlines / Micro-badges: 11px–12px / 700 Bold, uppercase with 0.05em tracking

### 2.4 Spacing, Alignment & Border Radii
- **Signature Button Radius:** `16px` (`--rounded-corners-radius: 16px; --add-to-cart-rounded-corners-radius: 16px`). Buttons feature rounded pill-like geometries rather than sharp 4px corners, giving the interface a friendly, approachable aesthetic.
- **Container Max-Width:** 1280px to 1360px centered with responsive gutters (16px on mobile, 24px on tablet, 32px on desktop).
- **Card Styling:** 12px border radius, 1px solid `#E8E8E8`, subtle elevation shadow `0 2px 8px rgba(0,0,0,0.04)` transitioning to `0 8px 24px rgba(0,0,0,0.08)` on hover.

---

## 3. Phase 2: Structural & Component Inventory

### 3.1 Header & Topbar Navigation
1. **Utility Strip (Topbar):**
   - Left: Regional multi-currency selector (YayCurrency switcher supporting NGN, USD, GBP, EUR, CNY, etc.).
   - Right: Quick links for *Track Your Order*, *Help Centre*, and *Contact Us*.
2. **Main Header Row:**
   - Official Brand Logo (Nubimart mark + wordmark).
   - Global Search Bar: Full-width search bar with category selector dropdown and embedded search button.
   - Action Badges:
     - Wishlist trigger with item count badge.
     - User Account trigger (opens tabbed login/register modal).
     - Slide-out Cart Drawer toggle (`xoo-wsc`) displaying cart item quantity and subtotal.
3. **Primary Navigation Bar & "Shop By Country" Mega Menu:**
   - **"Shop By Country" (Mega Menu):** Comprehensive continent-based navigation organizing countries and external/internal store hubs:
     - **Asia:** China (Alibaba, Taobao, Tmall, JD.com, 1688), Japan (Rakuten, Amazon JP), South Korea (Coupang, Gmarket), India, Singapore, Malaysia, Indonesia, Thailand, Vietnam, UAE, Saudi Arabia, Qatar, Turkey.
     - **Europe:** UK, Germany, France, Italy, Spain, Netherlands, Poland.
     - **North America:** USA, Canada, Mexico.
     - **South America:** Brazil, Argentina, Colombia, Chile.
     - **Africa:** Nigeria, South Africa, Kenya, Egypt, Ghana, Morocco.
     - **Oceania:** Australia, New Zealand.
     - **Global Cargo:** Air freight, sea freight, cross-border consolidation.
   - **"Find Stores":** Direct link to verified seller store directory (`/store-list/`).
   - **"Logistics":** Cross-border fulfillment and shipping calculators (`/logistics/`).
   - **"Price Comparison":** Evercompare multi-market price lookup (`/evercompare/`).
   - **"Business on Nubimart" Dropdown:** Sell on Nubimart, Enterprise Solutions, Investors.
   - **"All Categories" Dropdown:** 16 core e-commerce & service verticals.

### 3.2 Homepage Layout Progression
1. **Hero Banner:**
   - Headline: *"SHOP THE WORLD ACROSS DIFFERENT COUNTRIES"*
   - Subtitle: *"Discover global stores, compare prices, and shop across continents"*
   - CTA Buttons: *"Start Shopping Globally Today"* and *"Explore All Countries"*
   - Visual: World map network backdrop (`map.jpg`) with connection nodes.
2. **Shop By Country Grid:**
   - Quick-access country cards with vibrant national flags and seller counts.
3. **Shop By Category (16 Core Verticals):**
   - Agriculture & Farm Supplies
   - Automotive & Transportation
   - Construction, Tools & Home Improvement
   - Digital Services & Payments
   - Education, Books & Training
   - Electronics & Technology
   - Events, Entertainment & Lifestyle
   - Fashion, Clothing & Accessories
   - Groceries & Food
   - Health & Medical Services
   - Health, Beauty & Personal Care
   - Home, Furniture & Kitchen
   - Hotels, Travel & Tourism
   - Household & Cleaning
   - Jobs, Business & Professional Services
   - Real Estate & Properties
4. **Logistics & Cross-Border Delivery Feature:**
   - Courier integrations (DHL Express, UPS, FedEx).
   - Instant tracking lookup form and shipping cost estimator.
5. **Editorial & Knowledge Hub:**
   - *"Why Global Shopping Is the Future of E-Commerce"*
   - *"Top Global Online Marketplaces You Should Know"*
6. **Trust & Guarantee Strip:**
   - Worldwide Delivery
   - Secure Escrow Payments
   - 14-day Return Policy
   - 24/7 Dedicated Support
7. **Comprehensive Footer:**
   - Brand mission, social channel links (Facebook, Instagram, TikTok, X, LinkedIn, YouTube).
   - Organized columns: Get to Know Us, Customer Service, Orders & Returns, Sell on Nubimart, Newsletter Subscription.
   - Legal bar: Privacy Policy, Terms and Conditions, Legal notices, Copyright © 2026 Nubimart.

### 3.3 Shopping Cart & Side Drawer
- **Slide-out Cart Drawer (`side-cart-woocommerce`):** Slides out from the right on add-to-cart or cart icon click. Displays item thumbnail, quantity controls (`+` / `-`), unit price, subtotal, and quick checkout button without requiring page navigation.
- **Dedicated Cart Page (`/cart/`):** Full table view with coupon code input, shipping calculator, cart total summary, and proceed to checkout CTA.

### 3.4 Multi-Vendor Store Directory (`/store-list/`)
- Multi-vendor directory powered by WCFM Marketplace.
- Location and country filter dropdown.
- Sorting controls: Newest, Rating, Alphabetical (A-Z, Z-A).
- Store cards displaying store logo, banner, rating stars, country badge, and "Visit Store" button.

### 3.5 Customer Account & Authentication
- Modal-based or dedicated page authentication (`easy-login-woocommerce`) with 3 tabs:
  1. Login (Email/Username + Password + Remember Me + Forgot Password)
  2. Register (Name, Email, Password, Terms acceptance)
  3. Lost Password (Password reset link requester)

---

## 4. Phase 3: Functional Analysis (Verified vs Inferred)

| Feature / Element | Verification Status | Functional Observation |
|---|---|---|
| Navigation links & routing | **Verified** | All header and footer links resolve cleanly with HTTP 200 responses. |
| Country Mega Menu | **Verified** | DOM contains comprehensive continent-nested accordions for 30+ countries and global e-commerce directories. |
| Currency switcher | **Verified DOM / Inferred JS** | YayCurrency form exists in DOM with USD, NGN, GBP, EUR options. Dynamic rates are managed server-side. |
| Global Search bar | **Verified** | `wpr-search-form` with `action="https://nubimart.com"` and input `s`. |
| Category archives | **Verified** | 108 category URL endpoints exist and route to WooCommerce archives. |
| Live Product Catalog | **Inferred (Empty)** | `/shop/` currently has 0 active published products on live site ("No products were found matching your selection"). |
| Add-to-cart / Variations | **Inferred** | WCFM/WooLentor add-to-cart button styles and side cart markup are defined, but uncallable due to empty catalog. |
| Empty Cart State | **Verified** | `/cart/` renders clean empty state: "Your cart is currently empty! Return to shop". |
| Checkout flow | **Verified 302** | `/checkout/` issues HTTP 302 redirect back to `/cart/` when empty. |
| Store Directory filters | **Verified** | `/store-list/` provides sort by rating, date, alphabetical, and location filter dropdown. |
| Merchant Onboarding | **Verified** | Dedicated `/sell-on-nubimart/` landing page with value proposition and registration CTA. |
| Logistics & Tracking | **Verified** | Dedicated `/logistics/` and `/track-your-order/` landing pages with carrier references (DHL, UPS). |
| Responsive Mobile Menu | **Verified** | Royal Elementor hamburger menu toggles dropdown navigation on screens under 1024px. |

---

## 5. Strategic Implementation Plan for NUBIMART

To elevate NUBIMART while preserving its existing Next.js architecture, real database, multi-vendor order splitting, and authentication, we will implement the following high-impact upgrades:

### Workstream 1: Design System & Styling Alignment
1. **Typography:** Integrate `Montserrat` font with optimal Google Font weights (400, 500, 600, 700, 800, 900) into `layout.tsx` and `tailwind.config.ts`.
2. **Color Palette & Accents:** Align primary brand colors with clean deep charcoal/black tones (`#111827`, `#1e293b`), signature `16px` rounded button styles (`rounded-2xl`), gold rating accents (`#FBB102`), and crisp border treatments.
3. **Slide-out Cart Drawer:** Implement an interactive slide-over cart drawer (`CartDrawer.tsx`) accessible from anywhere on the platform with instant quantity updates and checkout navigation.

### Workstream 2: Header & Global "Shop By Country" Navigation
1. **Utility Bar:** Multi-currency switcher (USD, NGN, GBP, EUR, KES, ZAR, CAD, AUD), country selector, order tracking link, and customer service hotline.
2. **Universal Search:** Search bar with category dropdown filter and real-time query handling.
3. **"Shop By Country" Mega Menu:** Build an interactive continent-based mega menu (Asia, Europe, North America, South America, Africa, Oceania) with national flags and direct merchant links.
4. **Header Navigation Links:** Direct links to *Shop*, *Find Stores*, *Logistics*, *Price Comparison*, *Business on Nubimart* (Sell on Nubimart, Enterprise Solutions, Investors), and *All Categories*.

### Workstream 3: Homepage Redesign (Matching Reference Excellence)
1. **Hero Section:** World map backdrop graphic, bold tagline *"SHOP THE WORLD ACROSS DIFFERENT COUNTRIES"*, global stats, and high-converting CTA buttons.
2. **Shop By Country Grid:** Interactive carousel/grid showcasing international trade hubs with flags (Nigeria, China, USA, UK, UAE, India, Singapore, Japan, Germany, France, etc.).
3. **16-Vertical Category Grid:** Complete category grid matching the reference site's exact taxonomy (Agriculture, Automotive, Construction, Digital Services, Electronics, Fashion, Groceries, Health, Home, Logistics, etc.).
4. **Featured Products & Verified Merchants:** Live dynamic product cards with star ratings, origin country flags, vendor tags, and instant "Add to Cart" with toast feedback.
5. **Logistics & Cross-Border Delivery Section:** Interactive tracking lookup card and carrier badges (DHL, UPS, FedEx).
6. **Editorial & Trust Strip:** 4-point guarantee strip (Worldwide Delivery, 100% Escrow Protection, 14-day Returns, 24/7 Help Desk).
7. **Comprehensive 5-Column Footer:** Social channels, Help Centre, FAQ, Return Policy, Enterprise Solutions, and newsletter subscription form.

### Workstream 4: New Dedicated Pages & Store Directory
1. **Store Directory (`/stores` or `/store-list`):** Dedicated page listing verified sellers with country filters, search, rating sorts, and direct links to seller storefronts.
2. **Logistics Page (`/logistics`):** Rich interactive landing page with shipment tracker, shipping calculator, and carrier partners.
3. **Enterprise Solutions (`/enterprise-solutions`):** B2B solutions page for large enterprises, bulk sourcing, and cross-border distribution.
4. **Price Comparison (`/evercompare`):** Multi-market comparison tool allowing buyers to compare prices across regional vendors.
5. **Track Your Order (`/track-your-order`):** Dedicated tracking lookup with order number and email input.

### Workstream 5: Authentication & Mobile Responsiveness
1. **Auth Modal / Quick Drawer:** Tabbed Sign In / Sign Up modal accessible from the header without losing the current shopping context.
2. **Mobile Navigation Drawer & Bottom Bar:** Touch-friendly mobile bottom navigation bar (Home, Shop, Stores, Cart with badge, Account) and collapsible mobile menu with continent accordions.

---

## 6. Execution Verification Protocol
- Verify Next.js production build (`npm run build`).
- Run the workflow verification suite (`npx tsx src/tests/workflow-test.ts`).
- Validate end-to-end user journeys:
  1. Browsing homepage and selecting country/category filters.
  2. Searching products with category filters.
  3. Adding products to cart and adjusting quantities in the side cart drawer.
  4. Viewing multi-vendor split orders in checkout.
  5. Buyer and seller authentication and dashboard navigation.
