import { prisma } from "@/lib/prisma";
import { ExploreClient } from "./ExploreClient";

export const metadata = {
  title: "Explore Policies — PolicyLens",
  description: "Browse, search and filter all public policies on PolicyLens.",
};

export default async function ExplorePage() {
  const rawPolicies = await prisma.policy.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      shortDescription: true,
      category: true,
      status: true,
      createdAt: true,
      author: { select: { name: true } },
    },
  });

  // Serialize dates before passing to Client Component
  const policies = rawPolicies.map((p) => ({
    ...p,
    createdAt: p.createdAt.toISOString(),
  }));

  return <ExploreClient policies={policies} />;
}
