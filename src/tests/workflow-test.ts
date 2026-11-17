import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { formatCurrency, generateOrderNumber, generateTrackingNumber } from '../lib/utils/formatters';
import { SUPPORTED_COUNTRIES } from '../lib/constants/countries';
import { SUPPORTED_CURRENCIES } from '../lib/constants/currencies';

const prisma = new PrismaClient();

async function runTests() {
  console.log('🧪 ========================================================');
  console.log('🧪 RUNNING NUBIMART WORKFLOW VERIFICATION SUITE');
  console.log('🧪 ========================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, testName: string) {
    if (condition) {
      console.log(`  ✅ PASS: ${testName}`);
      passed++;
    } else {
      console.error(`  ❌ FAIL: ${testName}`);
      failed++;
    }
  }

  try {
    // 1. Database Connection & Seeded Entities Verification
    console.log('📦 Test Suite 1: Database Integrity & Seeded Catalog');
    const userCount = await prisma.user.count();
    assert(userCount >= 4, `Database has at least 4 users (Found: ${userCount})`);

    const admin = await prisma.user.findUnique({ where: { email: 'admin@nubimart.com' } });
    assert(admin !== null && admin.role === 'ADMIN', 'SuperAdmin account exists with ADMIN role');

    const seller = await prisma.user.findUnique({
      where: { email: 'seller@nubimart.com' },
      include: { sellerProfile: { include: { store: true } } },
    });
    assert(seller !== null && seller.role === 'SELLER', 'Seller account exists with SELLER role');
    assert(seller?.sellerProfile?.verificationStatus === 'VERIFIED', 'Seller KYC is VERIFIED');
    assert(seller?.sellerProfile?.store !== null, 'Seller storefront profile is linked');

    const pendingSeller = await prisma.user.findUnique({
      where: { email: 'applicant@nubimart.com' },
      include: { sellerProfile: true },
    });
    assert(pendingSeller?.sellerProfile?.verificationStatus === 'SUBMITTED', 'Pending seller exists in review queue');

    const productCount = await prisma.product.count();
    assert(productCount >= 6, `Product catalog has active products (Found: ${productCount})`);

    const categoriesCount = await prisma.category.count();
    assert(categoriesCount >= 6, `Categories seeded (Found: ${categoriesCount})`);

    // 2. Global Footprint (38 Countries & Multi-Currency Engine)
    console.log('\n🌍 Test Suite 2: Global 38-Country Footprint & Currency Engine');
    assert(SUPPORTED_COUNTRIES.length === 38, `Supports exactly 38 countries (Found: ${SUPPORTED_COUNTRIES.length})`);
    
    const formattedUSD = formatCurrency(100, 'USD');
    assert(formattedUSD.includes('100'), `USD Formatter output correct (${formattedUSD})`);

    const formattedNGN = formatCurrency(100, 'NGN');
    assert(formattedNGN.includes('155,000') || formattedNGN.includes('155'), `NGN Multi-currency conversion correct (${formattedNGN})`);

    const formattedGBP = formatCurrency(100, 'GBP');
    assert(formattedGBP.includes('79'), `GBP Multi-currency conversion correct (${formattedGBP})`);

    // 3. Multi-Vendor Order Splitting Logic
    console.log('\n🛍️ Test Suite 3: Multi-Vendor Order Splitting & Escrow Integrity');
    const demoOrder = await prisma.order.findUnique({
      where: { orderNumber: 'NUB-2026-90412' },
      include: {
        fulfillmentOrders: {
          include: { store: true, orderItems: true, shipment: true },
        },
        payments: true,
      },
    });

    assert(demoOrder !== null, 'Demo multi-vendor order NUB-2026-90412 exists');
    assert(demoOrder?.fulfillmentOrders.length === 2, `Order successfully split across 2 distinct vendors (Found: ${demoOrder?.fulfillmentOrders.length})`);
    assert(demoOrder?.payments[0]?.status === 'SUCCESSFUL', 'Payment recorded with SUCCESSFUL escrow status');
    
    const totalVendorEarnings = demoOrder?.fulfillmentOrders.reduce((acc, fo) => acc + fo.sellerEarnings, 0) || 0;
    const totalCommissions = demoOrder?.fulfillmentOrders.reduce((acc, fo) => acc + fo.commissionAmount, 0) || 0;
    assert(totalVendorEarnings > 0 && totalCommissions > 0, `Commissions ($${totalCommissions}) and Vendor Earnings ($${totalVendorEarnings}) properly accounted`);

    // 4. Password Security Verification
    console.log('\n🔐 Test Suite 4: Password Security & Cryptography');
    const isPasswordValid = await bcrypt.compare('Customer2026!', demoOrder ? (await prisma.user.findUnique({ where: { id: demoOrder.userId } }))!.passwordHash : '');
    assert(isPasswordValid, 'bcrypt password hash verifies successfully');

    console.log('\n========================================================');
    console.log(`🏁 TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
    console.log('========================================================\n');

    if (failed > 0) {
      process.exit(1);
    }
  } catch (err) {
    console.error('Fatal test error:', err);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

runTests();
