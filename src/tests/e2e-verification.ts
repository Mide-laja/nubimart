import { prisma } from '../lib/db/prisma';
import bcrypt from 'bcryptjs';

async function runE2EVerification() {
  console.log('🚀 RUNNING NUBIMART REFERENCE IMPLEMENTATION END-TO-END VERIFICATION');
  console.log('===================================================================');

  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, msg: string) {
    if (condition) {
      console.log(`  ✅ PASS: ${msg}`);
      passed++;
    } else {
      console.error(`  ❌ FAIL: ${msg}`);
      failed++;
    }
  }

  // 1. Database & Catalog Verification
  console.log('\n📦 Phase 1: Database & Seed Verification');
  const products = await prisma.product.findMany({
    where: { status: 'APPROVED' },
    include: { store: { include: { sellerProfile: true } }, category: true },
  });
  assert(products.length >= 6, `Catalog has approved products (Found: ${products.length})`);

  const stores = await prisma.store.findMany({
    where: { isActive: true },
    include: { sellerProfile: true },
  });
  assert(stores.length >= 2, `Active verified stores exist (Found: ${stores.length})`);

  // 2. Multi-Vendor Order Splitting Logic
  console.log('\n🛍️ Phase 2: Multi-Vendor Order Splitting & Escrow');
  const testCustomer = await prisma.user.findUnique({
    where: { email: 'customer@nubimart.com' },
  });
  assert(testCustomer !== null, 'Customer account exists');

  // Verify multi-vendor orders in DB
  const orders = await prisma.order.findMany({
    include: {
      fulfillmentOrders: {
        include: { store: true },
      },
      orderItems: true,
      payments: true,
    },
  });
  assert(orders.length >= 1, `Multi-vendor orders recorded (Found: ${orders.length})`);

  const demoOrder = orders.find((o) => o.orderNumber === 'NUB-2026-90412');
  assert(demoOrder !== undefined, 'Demo order NUB-2026-90412 found');
  assert(demoOrder?.fulfillmentOrders.length === 2, `Demo order split across 2 sub-orders`);
  assert(demoOrder?.payments[0]?.status === 'SUCCESSFUL', 'Escrow payment status is confirmed');

  // 3. Seller KYC & Admin Governance Queue
  console.log('\n🔐 Phase 3: Seller KYC & Governance Controls');
  const verifiedSellers = await prisma.sellerProfile.findMany({
    where: { verificationStatus: 'VERIFIED' },
  });
  assert(verifiedSellers.length >= 2, `Verified merchants exist (Found: ${verifiedSellers.length})`);

  const submittedSellers = await prisma.sellerProfile.findMany({
    where: { verificationStatus: 'SUBMITTED' },
  });
  assert(submittedSellers.length >= 1, `Pending KYC review queue applicant exists (Found: ${submittedSellers.length})`);

  // 4. Warehouse & Carrier Telemetry
  console.log('\n🚚 Phase 4: Logistics & Milestone Tracking');
  const warehouses = await prisma.warehouse.findMany();
  assert(warehouses.length >= 2, `International fulfillment warehouses configured (Found: ${warehouses.length})`);

  const shipments = await prisma.shipment.findMany({
    include: { events: true },
  });
  assert(shipments.length >= 1, `Shipment manifests recorded (Found: ${shipments.length})`);
  assert(shipments[0]?.events.length >= 1, `Tracking milestone telemetry logged (Found: ${shipments[0]?.events.length} events)`);

  console.log('\n===================================================================');
  console.log(`🏁 VERIFICATION SUMMARY: ${passed} PASSED, ${failed} FAILED`);
  console.log('===================================================================');

  if (failed > 0) process.exit(1);
}

runE2EVerification()
  .catch((err) => {
    console.error('Fatal test error:', err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
