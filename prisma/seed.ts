import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import "dotenv/config";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? "file:./prisma/dev.db",
});
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.preorder.deleteMany();

  const preorders = [
    {
      name: "Summer Collection 2026",
      products: 12,
      preorderWhen: "regardless-of-stock",
      startsAt: new Date("2026-06-01T00:00:00.000Z"),
      endsAt: new Date("2026-08-31T23:59:59.000Z"),
      status: true,
    },
    {
      name: "Winter Boots Limited",
      products: 5,
      preorderWhen: "out-of-stock",
      startsAt: new Date("2026-09-15T00:00:00.000Z"),
      endsAt: new Date("2026-11-30T23:59:59.000Z"),
      status: true,
    },
    {
      name: "Spring Accessories Pack",
      products: 8,
      preorderWhen: "regardless-of-stock",
      startsAt: new Date("2026-03-01T00:00:00.000Z"),
      endsAt: new Date("2026-05-31T23:59:59.000Z"),
      status: false,
    },
    {
      name: "Tech Gadgets Preorder",
      products: 3,
      preorderWhen: "out-of-stock",
      startsAt: new Date("2026-07-01T00:00:00.000Z"),
      endsAt: null,
      status: true,
    },
    {
      name: "Holiday Special Edition",
      products: 15,
      preorderWhen: "regardless-of-stock",
      startsAt: new Date("2026-10-01T00:00:00.000Z"),
      endsAt: new Date("2026-12-25T23:59:59.000Z"),
      status: true,
    },
    {
      name: "Fitness Gear Bundle",
      products: 6,
      preorderWhen: "out-of-stock",
      startsAt: new Date("2026-01-15T00:00:00.000Z"),
      endsAt: new Date("2026-03-15T23:59:59.000Z"),
      status: false,
    },
    {
      name: "Artisan Coffee Collection",
      products: 4,
      preorderWhen: "regardless-of-stock",
      startsAt: new Date("2026-04-01T00:00:00.000Z"),
      endsAt: null,
      status: true,
    },
    {
      name: "Home Decor Spring Line",
      products: 10,
      preorderWhen: "out-of-stock",
      startsAt: new Date("2026-02-01T00:00:00.000Z"),
      endsAt: new Date("2026-04-30T23:59:59.000Z"),
      status: false,
    },
    {
      name: "Gaming Peripherals Drop",
      products: 7,
      preorderWhen: "regardless-of-stock",
      startsAt: new Date("2026-08-01T00:00:00.000Z"),
      endsAt: new Date("2026-09-15T23:59:59.000Z"),
      status: true,
    },
    {
      name: "Organic Skincare Set",
      products: 5,
      preorderWhen: "out-of-stock",
      startsAt: new Date("2026-05-15T00:00:00.000Z"),
      endsAt: null,
      status: false,
    },
    {
      name: "Kids Back-to-School Bundle",
      products: 18,
      preorderWhen: "regardless-of-stock",
      startsAt: new Date("2026-07-15T00:00:00.000Z"),
      endsAt: new Date("2026-09-01T23:59:59.000Z"),
      status: true,
    },
    {
      name: "Smart Home Starter Kit",
      products: 4,
      preorderWhen: "out-of-stock",
      startsAt: new Date("2026-11-01T00:00:00.000Z"),
      endsAt: new Date("2026-12-31T23:59:59.000Z"),
      status: true,
    },
    {
      name: "Vegan Snack Box",
      products: 20,
      preorderWhen: "regardless-of-stock",
      startsAt: new Date("2026-02-01T00:00:00.000Z"),
      endsAt: null,
      status: false,
    },
    {
      name: "Outdoor Camping Gear",
      products: 9,
      preorderWhen: "out-of-stock",
      startsAt: new Date("2026-04-01T00:00:00.000Z"),
      endsAt: new Date("2026-06-30T23:59:59.000Z"),
      status: true,
    },
    {
      name: "Limited Edition Sneakers",
      products: 2,
      preorderWhen: "out-of-stock",
      startsAt: new Date("2026-09-01T00:00:00.000Z"),
      endsAt: new Date("2026-10-15T23:59:59.000Z"),
      status: true,
    },
    {
      name: "Eco-Friendly Kitchen Set",
      products: 14,
      preorderWhen: "regardless-of-stock",
      startsAt: new Date("2026-03-15T00:00:00.000Z"),
      endsAt: new Date("2026-05-01T23:59:59.000Z"),
      status: false,
    },
    {
      name: "Photography Masterclass",
      products: 1,
      preorderWhen: "regardless-of-stock",
      startsAt: new Date("2026-10-01T00:00:00.000Z"),
      endsAt: null,
      status: true,
    },
    {
      name: "Luxury Watch Collection",
      products: 6,
      preorderWhen: "out-of-stock",
      startsAt: new Date("2026-12-01T00:00:00.000Z"),
      endsAt: new Date("2027-01-31T23:59:59.000Z"),
      status: true,
    },
    {
      name: "Pet Accessories Bundle",
      products: 11,
      preorderWhen: "regardless-of-stock",
      startsAt: new Date("2026-06-15T00:00:00.000Z"),
      endsAt: new Date("2026-08-01T23:59:59.000Z"),
      status: false,
    },
    {
      name: "Yoga & Wellness Kit",
      products: 8,
      preorderWhen: "out-of-stock",
      startsAt: new Date("2026-01-01T00:00:00.000Z"),
      endsAt: new Date("2026-02-28T23:59:59.000Z"),
      status: false,
    },
  ];

  for (const preorder of preorders) {
    await prisma.preorder.create({ data: preorder });
  }

  console.log(`Seed completed: ${preorders.length} preorders inserted.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
