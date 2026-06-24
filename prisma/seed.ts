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
  ];

  for (const preorder of preorders) {
    await prisma.preorder.create({ data: preorder });
  }

  console.log("Seed completed: 8 preorders inserted.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
