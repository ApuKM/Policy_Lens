import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { SiteNavbar } from "@/components/navbar";
import CategoryChart from "@/components/dashboard/CategoryChart";

export const metadata = {
  title: "Dashboard — PolicyLens",
};

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    redirect("/login");
  }

  // Fetch policies for the current user and overall
  const myPolicies = await prisma.policy.findMany({ where: { authorId: session.user.id }, orderBy: { createdAt: "desc" }, take: 10 });
  const allPolicies = await prisma.policy.findMany({ select: { category: true } });

  // Compute summary metrics
  const myCount = myPolicies.length;
  const totalCount = allPolicies.length;

  const categoryMap: Record<string, number> = {};
  for (const p of allPolicies) {
    categoryMap[p.category] = (categoryMap[p.category] || 0) + 1;
  }

  const categoryData = Object.entries(categoryMap).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 dark:bg-black">

      <main className="flex-1 container mx-auto max-w-7xl px-4 py-12 md:py-20">
        <h1 className="text-3xl font-bold mb-6" style={{ color: "var(--color-foreground)" }}>Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="p-6 rounded-2xl border" style={{ background: "var(--color-surface)", borderColor: "var(--color-offwhite-200)", color: "var(--color-foreground)" }}>
            <h3 className="text-sm text-default-500">My Policies</h3>
            <p className="text-2xl font-semibold">{myCount}</p>
          </div>

          <div className="p-6 rounded-2xl border" style={{ background: "var(--color-surface)", borderColor: "var(--color-offwhite-200)", color: "var(--color-foreground)" }}>
            <h3 className="text-sm text-default-500">Total Policies</h3>
            <p className="text-2xl font-semibold">{totalCount}</p>
          </div>

          <div className="p-6 rounded-2xl border" style={{ background: "var(--color-surface)", borderColor: "var(--color-offwhite-200)", color: "var(--color-foreground)" }}>
            <h3 className="text-sm text-default-500">Top Category</h3>
            <p className="text-2xl font-semibold">{categoryData[0]?.name ?? "—"}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 p-6 rounded-2xl border" style={{ background: "var(--color-surface)", borderColor: "var(--color-offwhite-200)", color: "var(--color-foreground)" }}>
            <h2 className="text-lg font-semibold mb-4">Policies by Category</h2>
            <CategoryChart data={categoryData} />
          </div>

          <div className="p-6 rounded-2xl border" style={{ background: "var(--color-surface)", borderColor: "var(--color-offwhite-200)", color: "var(--color-foreground)" }}>
            <h2 className="text-lg font-semibold mb-4">Recent Policies</h2>
            <ul className="space-y-3">
              {myPolicies.map((p) => (
                <li key={p.id} className="text-sm truncate" title={p.title} style={{ color: "var(--color-foreground)" }}>
                  {p.title}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
