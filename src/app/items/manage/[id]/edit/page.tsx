import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { SiteNavbar } from "@/components/navbar";
import EditPolicyForm from "./EditPolicyForm";

export const metadata = {
  title: "Edit Policy — PolicyLens",
};

export default async function EditPolicyPage({ params }: { params: { id: string } }) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    redirect("/login");
  }

  const policy = await prisma.policy.findUnique({
    where: { id: params.id },
    select: {
      id: true,
      title: true,
      category: true,
      status: true,
      shortDescription: true,
      aiSummary: true,
      authorId: true,
    },
  });

  if (!policy || policy.authorId !== session.user.id) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 dark:bg-black">
      <SiteNavbar />
      <main className="flex-1 container mx-auto max-w-4xl px-4 py-12 md:py-20">
        <EditPolicyForm policy={policy} />
      </main>
    </div>
  );
}
