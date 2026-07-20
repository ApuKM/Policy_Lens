"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

export async function updatePolicy(data: {
  id: string;
  title: string;
  category: string;
  status: string;
  shortDescription: string;
}): Promise<{ success: boolean; error?: string }> {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) return { success: false, error: "Unauthorized" };

    const policy = await prisma.policy.findUnique({ where: { id: data.id }, select: { authorId: true } });
    if (!policy) return { success: false, error: "Policy not found" };
    if (policy.authorId !== session.user.id) return { success: false, error: "Forbidden" };

    await prisma.policy.update({
      where: { id: data.id },
      data: {
        title: data.title,
        category: data.category,
        status: data.status,
        shortDescription: data.shortDescription,
      },
    });

    revalidatePath("/items/manage");
    return { success: true };
  } catch (err) {
    console.error("[updatePolicy]", err);
    return { success: false, error: "Failed to update policy" };
  }
}
