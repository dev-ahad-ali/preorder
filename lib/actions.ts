"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export async function togglePreorderStatus(id: number) {
  const preorder = await prisma.preorder.findUnique({ where: { id } });
  if (!preorder) throw new Error("Preorder not found");

  await prisma.preorder.update({
    where: { id },
    data: { status: !preorder.status },
  });

  revalidatePath("/");
}

export async function deletePreorder(id: number) {
  await prisma.preorder.delete({ where: { id } });
  revalidatePath("/");
}

export async function createPreorder(formData: FormData) {
  const name = formData.get("name") as string;
  const products = parseInt(formData.get("products") as string) || 1;
  const preorderWhen = formData.get("preorderWhen") as string;
  const startsAt = formData.get("startsAt") as string;
  const endsAt = formData.get("endsAt") as string;
  const status = formData.get("status") === "true";

  if (!name || !startsAt) {
    return { error: "Name and startsAt are required" };
  }

  await prisma.preorder.create({
    data: {
      name,
      products,
      preorderWhen,
      startsAt: new Date(startsAt),
      endsAt: endsAt ? new Date(endsAt) : null,
      status,
    },
  });

  revalidatePath("/");
  return { success: true };
}

export async function updatePreorder(id: number, formData: FormData) {
  const name = formData.get("name") as string;
  const products = parseInt(formData.get("products") as string) || 1;
  const preorderWhen = formData.get("preorderWhen") as string;
  const startsAt = formData.get("startsAt") as string;
  const endsAt = formData.get("endsAt") as string;
  const status = formData.get("status") === "true";

  if (!name || !startsAt) {
    return { error: "Name and startsAt are required" };
  }

  await prisma.preorder.update({
    where: { id },
    data: {
      name,
      products,
      preorderWhen,
      startsAt: new Date(startsAt),
      endsAt: endsAt ? new Date(endsAt) : null,
      status,
    },
  });

  revalidatePath("/");
  return { success: true };
}
