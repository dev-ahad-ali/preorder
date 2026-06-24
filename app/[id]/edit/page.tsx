import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PreorderForm } from "@/components/preorder-form";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPreorderPage({ params }: PageProps) {
  const { id } = await params;
  const preorder = await prisma.preorder.findUnique({
    where: { id: parseInt(id) },
  });

  if (!preorder) {
    notFound();
  }

  const serialized = {
    ...preorder,
    startsAt: preorder.startsAt.toISOString(),
    endsAt: preorder.endsAt?.toISOString() ?? null,
    createdAt: preorder.createdAt.toISOString(),
  };

  return (
    <div className="min-h-screen bg-zinc-50">
      <PreorderForm
        preorder={serialized as unknown as Parameters<typeof PreorderForm>[0]["preorder"]}
      />
    </div>
  );
}
