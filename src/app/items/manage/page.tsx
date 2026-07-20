import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ManageClient } from "./ManageClient";

export const metadata = {
  title: "My Policies — PolicyLens",
};

export default async function ManagePage({ searchParams }: { searchParams?: { page?: string } }) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) redirect("/login");

  const page = Number(searchParams?.page || 1) || 1;
  const perPage = 10;

  const [policies, total] = await Promise.all([
    prisma.policy.findMany({ where: { authorId: session.user.id }, orderBy: { createdAt: "desc" }, skip: (page - 1) * perPage, take: perPage }),
    prisma.policy.count({ where: { authorId: session.user.id } }),
  ]);

  const serializable = policies.map((p) => ({
    id: p.id,
    title: p.title,
    category: p.category,
    status: p.status,
    createdAt: p.createdAt.toISOString(),
    aiSummary: p.aiSummary ?? null,
  }));

  return <ManageClient policies={serializable} />;
}
