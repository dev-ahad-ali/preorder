import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { PreorderTable } from "@/components/preorder-table";
import type { SortField, SortDirection } from "@/components/sort-popover";

interface PageProps {
  searchParams: Promise<{
    status?: string;
    sortField?: string;
    sortDirection?: string;
    page?: string;
  }>;
}

const PAGE_SIZE = 8;

export default async function HomePage({ searchParams }: PageProps) {
  const params = await searchParams;
  const statusFilter = params.status || "all";
  const sortField = (params.sortField || "createdAt") as SortField;
  const sortDirection = (params.sortDirection || "desc") as SortDirection;
  const currentPage = Math.max(1, parseInt(params.page || "1"));

  const where: Record<string, unknown> = {};
  if (statusFilter === "active") where.status = true;
  if (statusFilter === "inactive") where.status = false;

  const orderBy: Record<string, string> = {};
  orderBy[sortField] = sortDirection;

  const [preorders, total] = await Promise.all([
    prisma.preorder.findMany({
      where,
      orderBy,
      skip: (currentPage - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.preorder.count({ where }),
  ]);

  const serialized = preorders.map((p) => ({
    ...p,
    startsAt: p.startsAt.toISOString(),
    endsAt: p.endsAt?.toISOString() ?? null,
    createdAt: p.createdAt.toISOString(),
  }));

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-8">
        <h1 className="text-3xl font-bold tracking-tight">Preorders</h1>
        <Button asChild className="rounded-lg px-6 py-5 text-base">
          <a href="/new">Create Preorder</a>
        </Button>
      </header>
      <main className="mx-auto w-full max-w-6xl flex-1 px-6 pb-8">
        <PreorderTable
          preorders={serialized as unknown as Parameters<typeof PreorderTable>[0]["preorders"]}
          total={total}
          currentPage={currentPage}
          pageSize={PAGE_SIZE}
          statusFilter={statusFilter}
          sortField={sortField}
          sortDirection={sortDirection}
        />
      </main>
    </div>
  );
}
