"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

export async function deletePolicy(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) return { success: false, error: "Unauthorized" };

    const policy = await prisma.policy.findUnique({ where: { id }, select: { authorId: true } });
    if (!policy) return { success: false, error: "Policy not found" };
    if (policy.authorId !== session.user.id) return { success: false, error: "Forbidden" };

    await prisma.policy.delete({ where: { id } });
    revalidatePath("/items/manage");
    return { success: true };
  } catch (err) {
    console.error("[deletePolicy]", err);
    return { success: false, error: "Failed to delete policy" };
  }
}
