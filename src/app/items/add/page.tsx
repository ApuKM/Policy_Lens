import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { AddPolicyForm } from "@/components/items/AddPolicyForm";
import { SiteNavbar } from "@/components/navbar";
import { Footer } from "@/components/landing/Footer";

export const metadata = {
  title: "Add Policy — PolicyLens",
};

export default async function AddItemPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 dark:bg-black">    
      <main className="flex-1 container mx-auto max-w-7xl px-4 py-12 md:py-20">
        <AddPolicyForm />
      </main>

      <Footer />
    </div>
  );
}
