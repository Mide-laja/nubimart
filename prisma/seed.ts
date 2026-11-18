import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DIRECT_URL || process.env.DATABASE_URL,
    },
  },
});

async function main() {
  console.log("🌱 Starting NUBIMART Database Seeding...");

  // Clear existing records to ensure clean idempotent seed
  await prisma.review.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.trackingEvent.deleteMany();
  await prisma.shipment.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.fulfillmentOrder.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.order.deleteMany();
  await prisma.inventory.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.store.deleteMany();
  await prisma.sellerPayout.deleteMany();
  await prisma.sellerProfile.deleteMany();
  await prisma.address.deleteMany();
  await prisma.coupon.deleteMany();
  await prisma.affiliate.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.user.deleteMany();
  await prisma.warehouse.deleteMany();

  // 1. Password hash
  const adminPasswordHash = await bcrypt.hash("Admin2026!", 10);
  const sellerPasswordHash = await bcrypt.hash("Seller2026!", 10);
  const customerPasswordHash = await bcrypt.hash("Customer2026!", 10);

  // 2. Admin User
  const adminUser = await prisma.user.create({
    data: {
      email: "admin@nubimart.com",
      passwordHash: adminPasswordHash,
      name: "Marcus Vance (Platform SuperAdmin)",
      role: "ADMIN",
      emailVerified: true,
      status: "ACTIVE",
    },
  });

  // 3. Customer User
  const customerUser = await prisma.user.create({
    data: {
      email: "customer@nubimart.com",
      passwordHash: customerPasswordHash,
      name: "Sophia Kensington",
      role: "CUSTOMER",
      emailVerified: true,
      status: "ACTIVE",
      addresses: {
        create: [
          {
            fullName: "Sophia Kensington",
            phone: "+1 (555) 234-5678",
            street: "742 Evergreen Terrace",
            apartment: "Apt 4B",
            city: "Springfield",
            state: "OR",
            postalCode: "97477",
            countryCode: "US",
            isDefaultShipping: true,
            isDefaultBilling: true,
          },
          {
            fullName: "Sophia Kensington (Lagos Vacation Home)",
            phone: "+234 803 123 4567",
            street: "Plot 14 Admiralty Way",
            apartment: "Block B, Flat 3",
            city: "Lekki Phase 1",
            state: "Lagos",
            postalCode: "105102",
            countryCode: "NG",
            isDefaultShipping: false,
            isDefaultBilling: false,
          },
        ],
      },
      affiliate: {
        create: {
          referralCode: "SOPHIA2026",
          commissionRate: 0.05,
          totalEarnings: 145.5,
          paidEarnings: 50.0,
        },
      },
    },
  });

  // 4. Sellers
  // Seller 1: Afritex Luxury
  const seller1User = await prisma.user.create({
    data: {
      email: "seller@nubimart.com",
      passwordHash: sellerPasswordHash,
      name: "Amara Okonkwo",
      role: "SELLER",
      emailVerified: true,
      status: "ACTIVE",
      sellerProfile: {
        create: {
          businessName: "Afritex Luxury Textiles & Artisan Crafts Ltd",
          businessType: "REGISTERED_BUSINESS",
          regNumber: "RC-1984201",
          taxId: "TIN-NG-889912",
          countryCode: "NG",
          verificationStatus: "VERIFIED",
          bankName: "Zenith Bank PLC",
          bankAccountNumber: "1012345678",
          bankAccountName: "Afritex Luxury Ltd",
          walletBalance: 4250.0,
          pendingBalance: 820.0,
          store: {
            create: {
              name: "Afritex Global Heritage",
              slug: "afritex-global",
              description: "Authentic West African ceremonial textiles, luxury handcrafted accessories, and heritage home decor.",
              logoUrl: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=300&q=80",
              bannerUrl: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1200&q=80",
              supportEmail: "concierge@afritex.com",
              supportPhone: "+234 802 999 8888",
              rating: 4.9,
              reviewCount: 142,
              isActive: true,
            },
          },
        },
      },
    },
    include: {
      sellerProfile: {
        include: { store: true },
      },
    },
  });

  // Seller 2: TechNexus
  const seller2User = await prisma.user.create({
    data: {
      email: "tech@nubimart.com",
      passwordHash: sellerPasswordHash,
      name: "David Sterling",
      role: "SELLER",
      emailVerified: true,
      status: "ACTIVE",
      sellerProfile: {
        create: {
          businessName: "TechNexus Global Devices Inc.",
          businessType: "CORPORATION",
          regNumber: "DE-LLC-77401",
          taxId: "EIN-82-4410982",
          countryCode: "US",
          verificationStatus: "VERIFIED",
          bankName: "JPMorgan Chase Bank",
          bankAccountNumber: "4420981772",
          bankAccountName: "TechNexus Global Devices Inc.",
          walletBalance: 12890.0,
          pendingBalance: 1450.0,
          store: {
            create: {
              name: "TechNexus Official Store",
              slug: "technexus-official",
              description: "High-performance consumer electronics, premium audio gear, and minimalist desk setups with worldwide warranty.",
              logoUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=300&q=80",
              bannerUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80",
              supportEmail: "support@technexus.io",
              supportPhone: "+1 (800) 555-0199",
              rating: 4.8,
              reviewCount: 289,
              isActive: true,
            },
          },
        },
      },
    },
    include: {
      sellerProfile: {
        include: { store: true },
      },
    },
  });

  // Seller 3: Savanna Organics
  const seller3User = await prisma.user.create({
    data: {
      email: "savanna@nubimart.com",
      passwordHash: sellerPasswordHash,
      name: "Wanjiku Mwangi",
      role: "SELLER",
      emailVerified: true,
      status: "ACTIVE",
      sellerProfile: {
        create: {
          businessName: "Savanna Gold Botanicals Kenya Ltd",
          businessType: "REGISTERED_BUSINESS",
          regNumber: "CPR/2021/89201",
          taxId: "P051892012K",
          countryCode: "KE",
          verificationStatus: "VERIFIED",
          bankName: "Standard Chartered Bank Kenya",
          bankAccountNumber: "0100234981",
          bankAccountName: "Savanna Gold Botanicals Ltd",
          walletBalance: 3100.0,
          pendingBalance: 320.0,
          store: {
            create: {
              name: "Savanna Organics",
              slug: "savanna-organics",
              description: "Fair-trade wildcrafted African botanicals, cold-pressed oils, organic shea butters, and single-origin coffees.",
              logoUrl: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=300&q=80",
              bannerUrl: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80",
              supportEmail: "hello@savannaorganics.co.ke",
              supportPhone: "+254 722 000 111",
              rating: 4.95,
              reviewCount: 94,
              isActive: true,
            },
          },
        },
      },
    },
    include: {
      sellerProfile: {
        include: { store: true },
      },
    },
  });

  // Seller 4: Pending Seller for Admin Review Queue
  await prisma.user.create({
    data: {
      email: "applicant@nubimart.com",
      passwordHash: sellerPasswordHash,
      name: "Tariq Benali",
      role: "SELLER",
      emailVerified: true,
      status: "ACTIVE",
      sellerProfile: {
        create: {
          businessName: "Atlas Heritage Leatherworks SARL",
          businessType: "REGISTERED_BUSINESS",
          regNumber: "MA-FEZ-48102",
          taxId: "IF-1849204",
          countryCode: "MA",
          verificationStatus: "SUBMITTED",
          bankName: "Attijariwafa Bank",
          bankAccountNumber: "007780000123456789012345",
          bankAccountName: "Atlas Heritage Leatherworks",
          idDocumentUrl: "https://placehold.co/800x600/png?text=Passport+Tariq+Benali",
          proofOfAddressUrl: "https://placehold.co/800x600/png?text=Fez+Commercial+Registry+Cert",
          store: {
            create: {
              name: "Atlas Heritage Leatherworks",
              slug: "atlas-leatherworks",
              description: "Master tanners producing vegetable-tanned genuine leather duffels and messenger bags in the ancient medina of Fez.",
              isActive: false,
            },
          },
        },
      },
    },
  });

  // 5. Warehouses
  const whLagos = await prisma.warehouse.create({
    data: {
      name: "Lagos Atlantic Gateway Fulfilment Centre",
      code: "WH-LOS-01",
      countryCode: "NG",
      city: "Ikeja, Lagos",
      address: "Plot 3 Commercial Avenue, Industrial Zone",
    },
  });

  const whUS = await prisma.warehouse.create({
    data: {
      name: "New Jersey Regional Fulfilment Center",
      code: "WH-USA-01",
      countryCode: "US",
      city: "Edison, NJ",
      address: "500 Logistics Boulevard",
    },
  });

  // 6. Categories
  const catFashion = await prisma.category.create({
    data: {
      name: "Fashion & Luxury Apparel",
      slug: "fashion",
      description: "Designer apparel, bespoke ceremonial fabrics, luxury tailoring, and fine footwear.",
      imageUrl: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80",
      icon: "Shirt",
      featured: true,
    },
  });

  const catElectronics = await prisma.category.create({
    data: {
      name: "Electronics & Smart Devices",
      slug: "electronics",
      description: "Cutting-edge consumer tech, flagship audio, smart home devices, and computing essentials.",
      imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
      icon: "Headphones",
      featured: true,
    },
  });

  const catArtisan = await prisma.category.create({
    data: {
      name: "Artisan Crafts & Cultural Heritage",
      slug: "artisan-crafts",
      description: "Authentic handmade sculptures, ceremonial jewelry, Tuareg silverware, and heritage artifacts.",
      imageUrl: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80",
      icon: "Gem",
      featured: true,
    },
  });

  const catBeauty = await prisma.category.create({
    data: {
      name: "Beauty & Organic Wellness",
      slug: "beauty-wellness",
      description: "Organic African botanicals, cold-pressed elixirs, pure raw shea, and clean skincare.",
      imageUrl: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80",
      icon: "Sparkles",
      featured: true,
    },
  });

  const catHome = await prisma.category.create({
    data: {
      name: "Home & Contemporary Living",
      slug: "home-living",
      description: "Hand-woven textiles, ergonomic designer furniture, ambient lighting, and luxury kitchenware.",
      imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80",
      icon: "Home",
      featured: true,
    },
  });

  const catFood = await prisma.category.create({
    data: {
      name: "Specialty Gourmet & Coffee",
      slug: "foods-spices",
      description: "Single-origin mountain coffees, rare spices, artisanal honeys, and organic superfoods.",
      imageUrl: "https://images.unsplash.com/photo-1509785307050-d4066910ec1e?auto=format&fit=crop&w=600&q=80",
      icon: "Coffee",
      featured: true,
    },
  });

  const store1 = seller1User.sellerProfile!.store!;
  const store2 = seller2User.sellerProfile!.store!;
  const store3 = seller3User.sellerProfile!.store!;

  // 7. Products
  // Product 1 (Afritex)
  const p1 = await prisma.product.create({
    data: {
      storeId: store1.id,
      categoryId: catFashion.id,
      name: "Royal Hand-Woven Ashanti Kente Ceremonial Cloth",
      slug: "royal-ashanti-kente-cloth",
      summary: "Authentic double-weave silk & cotton Kente hand-loomed by master weavers in Kumasi.",
      description: "Handcrafted using generational techniques in the historic Ashanti region, this authentic royal Kente cloth features rich geometric motifs symbolizing royalty, wisdom, and spiritual purity. Each yard represents over 40 hours of meticulous handloom craftsmanship. Perfect for monumental ceremonies, weddings, or wall tapestry display.",
      brand: "Afritex Heritage",
      basePrice: 280.0,
      salePrice: 245.0,
      sku: "AFR-KNT-001",
      status: "APPROVED",
      featured: true,
      rating: 4.95,
      reviewCount: 38,
      images: {
        create: [
          {
            url: "https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=800&q=80",
            altText: "Hand-Woven Royal Kente Cloth in vibrant gold and indigo",
            isPrimary: true,
            sortOrder: 0,
          },
          {
            url: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80",
            altText: "Close-up detail of geometric Kente weave",
            isPrimary: false,
            sortOrder: 1,
          },
        ],
      },
      variants: {
        create: [
          {
            name: "Standard 6-Yard Roll / Gold & Royal Indigo",
            sku: "AFR-KNT-001-6YD",
            attributesJson: JSON.stringify({ length: "6 Yards", color: "Gold & Royal Indigo" }),
            priceAdjustment: 0.0,
            stockQuantity: 24,
          },
          {
            name: "Grand 12-Yard Roll / Gold & Royal Indigo",
            sku: "AFR-KNT-001-12YD",
            attributesJson: JSON.stringify({ length: "12 Yards", color: "Gold & Royal Indigo" }),
            priceAdjustment: 220.0,
            stockQuantity: 12,
          },
        ],
      },
      inventories: {
        create: {
          warehouseId: whLagos.id,
          quantity: 36,
          lowStockThreshold: 5,
        },
      },
    },
  });

  // Product 2 (TechNexus)
  const p2 = await prisma.product.create({
    data: {
      storeId: store2.id,
      categoryId: catElectronics.id,
      name: "AeroSound Pro Active Noise-Cancelling Wireless Headphones",
      slug: "aerosound-pro-anc-headphones",
      summary: "Studio-grade lossless audio with 45dB hybrid ANC, 60-hour battery, and custom titanium drivers.",
      description: "Engineered for discerning audiophiles and frequent global travelers. The AeroSound Pro combines 40mm custom titanium diaphragms with 8 ambient microphones for whisper-quiet silence in airplane cabins and busy cities. Supports LDAC, aptX HD, and multi-point Bluetooth 5.4 pairing across three simultaneous devices.",
      brand: "AeroSound",
      basePrice: 199.0,
      salePrice: 169.0,
      sku: "TECH-AERO-PRO",
      status: "APPROVED",
      featured: true,
      rating: 4.85,
      reviewCount: 112,
      images: {
        create: [
          {
            url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
            altText: "AeroSound Pro Wireless Headphones Matte Black",
            isPrimary: true,
            sortOrder: 0,
          },
          {
            url: "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80",
            altText: "Headphones in protective hard-shell travel case",
            isPrimary: false,
            sortOrder: 1,
          },
        ],
      },
      variants: {
        create: [
          {
            name: "Midnight Obsidian",
            sku: "TECH-AERO-BLK",
            attributesJson: JSON.stringify({ color: "Midnight Obsidian" }),
            priceAdjustment: 0.0,
            stockQuantity: 80,
          },
          {
            name: "Lunar Silver",
            sku: "TECH-AERO-SLV",
            attributesJson: JSON.stringify({ color: "Lunar Silver" }),
            priceAdjustment: 0.0,
            stockQuantity: 45,
          },
        ],
      },
      inventories: {
        create: {
          warehouseId: whUS.id,
          quantity: 125,
          lowStockThreshold: 10,
        },
      },
    },
  });

  // Product 3 (Savanna Organics)
  const p3 = await prisma.product.create({
    data: {
      storeId: store3.id,
      categoryId: catBeauty.id,
      name: "Wildcrafted Nilotica Raw Shea Butter & Baobab Soufflé (250ml)",
      slug: "wildcrafted-nilotica-shea-baobab-souffle",
      summary: "Silky, non-greasy East African Nilotica shea whipped with pure organic baobab and marula oils.",
      description: "Unlike traditional West African shea, rare East African Nilotica shea boasts an exceptionally high olein content, melting effortlessly on skin contact like silk. Infused with cold-pressed Kenyan baobab seed oil rich in vitamins A, D, and E to deeply regenerate dry skin, reduce hyperpigmentation, and soothe inflammation.",
      brand: "Savanna Gold",
      basePrice: 38.0,
      salePrice: 32.0,
      sku: "SAV-SHEA-250",
      status: "APPROVED",
      featured: true,
      rating: 4.98,
      reviewCount: 76,
      images: {
        create: [
          {
            url: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80",
            altText: "Glass jar of whipped organic shea butter soufflé",
            isPrimary: true,
            sortOrder: 0,
          },
        ],
      },
      variants: {
        create: [
          {
            name: "Unscented Pure Botanicals / 250ml",
            sku: "SAV-SHEA-250-RAW",
            attributesJson: JSON.stringify({ scent: "Unscented", size: "250ml" }),
            priceAdjustment: 0.0,
            stockQuantity: 150,
          },
          {
            name: "Sweet Orange & Vanilla Pod / 250ml",
            sku: "SAV-SHEA-250-ORNG",
            attributesJson: JSON.stringify({ scent: "Sweet Orange & Vanilla", size: "250ml" }),
            priceAdjustment: 4.0,
            stockQuantity: 90,
          },
        ],
      },
      inventories: {
        create: {
          warehouseId: whLagos.id,
          quantity: 240,
          lowStockThreshold: 20,
        },
      },
    },
  });

  // Product 4 (Afritex)
  const p4 = await prisma.product.create({
    data: {
      storeId: store1.id,
      categoryId: catArtisan.id,
      name: "Hand-Engraved Sahara Tuareg Sterling Silver Cuff",
      slug: "tuareg-sterling-silver-cuff",
      summary: "925 sterling silver cuff hand-etched with ancient nomadic geometric talismanic engravings.",
      description: "Handcrafted by traditional Tuareg silversmiths using generational lost-wax and chisel carving methods. Each piece is a unique personal talisman with protective symbols representing celestial navigation across the Sahara. Solid 925 sterling silver with ebony inlay accents.",
      brand: "Afritex Heritage",
      basePrice: 145.0,
      salePrice: 129.0,
      sku: "AFR-SLV-CUFF",
      status: "APPROVED",
      featured: false,
      rating: 4.9,
      reviewCount: 22,
      images: {
        create: [
          {
            url: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80",
            altText: "Hand-carved solid sterling silver cuff bracelet",
            isPrimary: true,
            sortOrder: 0,
          },
        ],
      },
      variants: {
        create: [
          {
            name: "Medium (Fits 16-18cm wrist)",
            sku: "AFR-SLV-CUFF-M",
            attributesJson: JSON.stringify({ size: "Medium" }),
            priceAdjustment: 0.0,
            stockQuantity: 18,
          },
          {
            name: "Large (Fits 19-21cm wrist)",
            sku: "AFR-SLV-CUFF-L",
            attributesJson: JSON.stringify({ size: "Large" }),
            priceAdjustment: 15.0,
            stockQuantity: 14,
          },
        ],
      },
      inventories: {
        create: {
          warehouseId: whLagos.id,
          quantity: 32,
          lowStockThreshold: 5,
        },
      },
    },
  });

  // Product 5 (TechNexus)
  const p5 = await prisma.product.create({
    data: {
      storeId: store2.id,
      categoryId: catElectronics.id,
      name: "QuantumGlide Tri-Mode Wireless Ergonomic Mechanical Keyboard",
      slug: "quantumglide-mechanical-keyboard",
      summary: "Hot-swappable tactile switches, aircraft aluminum chassis, gasket mount, and 2.4GHz ultra-low latency.",
      description: "Designed for software engineers, authors, and power users. Custom factory-lubed linear switches deliver a satisfying acoustic pop. Features full QMK/VIA key remapping, per-key RGB backlighting, Bluetooth 5.2 (3 channels), 2.4GHz dongle, and USB-C connectivity with 200 hours of battery life.",
      brand: "QuantumGear",
      basePrice: 129.0,
      salePrice: 109.0,
      sku: "TECH-QG-KB75",
      status: "APPROVED",
      featured: true,
      rating: 4.92,
      reviewCount: 84,
      images: {
        create: [
          {
            url: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80",
            altText: "Custom 75% Mechanical Keyboard with retro keycaps",
            isPrimary: true,
            sortOrder: 0,
          },
        ],
      },
      variants: {
        create: [
          {
            name: "Linear Quiet Switches / Retro Grey & Slate",
            sku: "TECH-KB-LIN",
            attributesJson: JSON.stringify({ switches: "Linear Quiet", color: "Retro Grey" }),
            priceAdjustment: 0.0,
            stockQuantity: 55,
          },
          {
            name: "Tactile Bump Switches / Stealth Carbon",
            sku: "TECH-KB-TAC",
            attributesJson: JSON.stringify({ switches: "Tactile Bump", color: "Stealth Carbon" }),
            priceAdjustment: 10.0,
            stockQuantity: 40,
          },
        ],
      },
      inventories: {
        create: {
          warehouseId: whUS.id,
          quantity: 95,
          lowStockThreshold: 8,
        },
      },
    },
  });

  // Product 6 (Savanna Organics)
  const p6 = await prisma.product.create({
    data: {
      storeId: store3.id,
      categoryId: catFood.id,
      name: "Ethiopian Yirgacheffe Washed Grade 1 Coffee Beans (1kg)",
      slug: "ethiopian-yirgacheffe-coffee-1kg",
      summary: "Single-origin high altitude arabica with bright bergamot, jasmine florals, and wild blueberry notes.",
      description: "Grown at 2,100 meters above sea level by smallholder farming families in the birthplace of arabica coffee. Medium roast roasted in small batches to preserve delicate floral aromatics, lively citrus acidity, and a creamy stone-fruit finish. Fair-trade certified and directly sourced.",
      brand: "Savanna Origin",
      basePrice: 42.0,
      salePrice: null,
      sku: "SAV-COF-YIRG-1KG",
      status: "APPROVED",
      featured: true,
      rating: 4.96,
      reviewCount: 52,
      images: {
        create: [
          {
            url: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=800&q=80",
            altText: "Bag of specialty artisan roasted coffee beans",
            isPrimary: true,
            sortOrder: 0,
          },
        ],
      },
      variants: {
        create: [
          {
            name: "Whole Bean (Fresh Roast) / 1000g",
            sku: "SAV-COF-WHOLE-1K",
            attributesJson: JSON.stringify({ grind: "Whole Bean", weight: "1kg" }),
            priceAdjustment: 0.0,
            stockQuantity: 120,
          },
          {
            name: "Coarse French Press / 1000g",
            sku: "SAV-COF-CRSE-1K",
            attributesJson: JSON.stringify({ grind: "Coarse", weight: "1kg" }),
            priceAdjustment: 0.0,
            stockQuantity: 60,
          },
        ],
      },
      inventories: {
        create: {
          warehouseId: whLagos.id,
          quantity: 180,
          lowStockThreshold: 15,
        },
      },
    },
  });

  // 8. Reviews
  await prisma.review.create({
    data: {
      userId: customerUser.id,
      productId: p1.id,
      rating: 5,
      title: "Breathtaking artistry and fast international DHL shipping",
      comment: "This Kente cloth is genuine museum-quality art. The weight, vibrant colors, and weaving precision blew away my family at my sister's wedding. Packaged securely with an authenticity certificate.",
      verifiedPurchase: true,
    },
  });

  await prisma.review.create({
    data: {
      userId: customerUser.id,
      productId: p2.id,
      rating: 5,
      title: "Better noise cancellation than my Sony XM5s",
      comment: "I fly trans-Atlantic frequently between London, Lagos, and New York. The hybrid noise cancellation is sensational, battery lasts through 3 return flights without a recharge, and the mic is crystal clear.",
      verifiedPurchase: true,
    },
  });

  // 9. Coupons
  await prisma.coupon.create({
    data: {
      code: "WELCOME10",
      discountType: "PERCENTAGE",
      discountValue: 10.0,
      minOrderAmount: 50.0,
      validFrom: new Date(),
      validUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
      usageLimit: 1000,
      usedCount: 14,
      isActive: true,
    },
  });

  await prisma.coupon.create({
    data: {
      code: "GLOBAL25",
      discountType: "FIXED",
      discountValue: 25.0,
      minOrderAmount: 150.0,
      validFrom: new Date(),
      validUntil: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000),
      usageLimit: 500,
      usedCount: 8,
      isActive: true,
    },
  });

  // 10. Completed Demo Multi-Vendor Order (Customer bought from Afritex + TechNexus)
  const orderNumber = "NUB-2026-90412";
  const demoOrder = await prisma.order.create({
    data: {
      orderNumber,
      userId: customerUser.id,
      subtotal: 414.0, // $245 (Kente) + $169 (Headphones)
      discountTotal: 41.4, // 10% coupon
      shippingTotal: 30.0, // $15 per seller
      taxTotal: 32.21,
      grandTotal: 434.81,
      currencyCode: "USD",
      exchangeRateToBase: 1.0,
      status: "PROCESSING",
      shippingAddress: JSON.stringify({
        fullName: "Sophia Kensington",
        phone: "+1 (555) 234-5678",
        street: "742 Evergreen Terrace",
        apartment: "Apt 4B",
        city: "Springfield",
        state: "OR",
        postalCode: "97477",
        countryCode: "US",
      }),
      payments: {
        create: {
          paymentMethod: "PAYSTACK",
          providerReference: "pstk_ref_990142_demo",
          amount: 434.81,
          currencyCode: "USD",
          status: "SUCCESSFUL",
          paidAt: new Date(),
        },
      },
    },
  });

  // Fulfillment Order 1 (Afritex)
  const fo1 = await prisma.fulfillmentOrder.create({
    data: {
      orderId: demoOrder.id,
      storeId: store1.id,
      subtotal: 245.0,
      shippingFee: 15.0,
      commissionRate: 0.1,
      commissionAmount: 24.5,
      sellerEarnings: 220.5,
      fulfillmentStatus: "PACKING",
      shippingMethod: "DHL Express Worldwide",
      orderItems: {
        create: {
          orderId: demoOrder.id,
          productId: p1.id,
          productName: "Royal Hand-Woven Ashanti Kente Ceremonial Cloth",
          sku: "AFR-KNT-001-6YD",
          unitPrice: 245.0,
          quantity: 1,
          totalPrice: 245.0,
        },
      },
      shipment: {
        create: {
          carrier: "DHL",
          trackingNumber: "DHL-9840192831",
          status: "MANIFESTED",
          estimatedDelivery: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
          events: {
            create: [
              {
                status: "MANIFESTED",
                location: "Ikeja Hub, Lagos, Nigeria",
                description: "Electronic shipping manifest received. Goods being prepared for pickup.",
              },
            ],
          },
        },
      },
    },
  });

  // Fulfillment Order 2 (TechNexus)
  const fo2 = await prisma.fulfillmentOrder.create({
    data: {
      orderId: demoOrder.id,
      storeId: store2.id,
      subtotal: 169.0,
      shippingFee: 15.0,
      commissionRate: 0.1,
      commissionAmount: 16.9,
      sellerEarnings: 152.1,
      fulfillmentStatus: "SHIPPED",
      shippingMethod: "FedEx International Priority",
      orderItems: {
        create: {
          orderId: demoOrder.id,
          productId: p2.id,
          productName: "AeroSound Pro Active Noise-Cancelling Wireless Headphones",
          sku: "TECH-AERO-BLK",
          unitPrice: 169.0,
          quantity: 1,
          totalPrice: 169.0,
        },
      },
      shipment: {
        create: {
          carrier: "FEDEX",
          trackingNumber: "FDX-7719204918",
          status: "IN_TRANSIT",
          estimatedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
          events: {
            create: [
              {
                status: "PICKED_UP",
                location: "Edison, NJ, USA",
                description: "Package received by FedEx origin sorting facility.",
              },
              {
                status: "IN_TRANSIT",
                location: "Memphis SuperHub, TN, USA",
                description: "Departed international sort hub on route to destination.",
              },
            ],
          },
        },
      },
    },
  });

  console.log("✅ Seed completed successfully!");
  console.log("👤 Admin Account: admin@nubimart.com / Admin2026!");
  console.log("🏪 Seller Account: seller@nubimart.com / Seller2026!");
  console.log("🛒 Customer Account: customer@nubimart.com / Customer2026!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
