import { HeroSection } from "@/components/landing/HeroSection";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { TrendingPolicies } from "@/components/landing/TrendingPolicies";
import { AICapabilities } from "@/components/landing/AICapabilities";
import { Statistics } from "@/components/landing/Statistics";
import { FAQ } from "@/components/landing/FAQ";
import { Footer } from "@/components/landing/Footer";

export const metadata = {
  title: "PolicyLens — Demystify Civic Policies with AI",
  description:
    "PolicyLens uses AI to transform dense government documents, legislation, and regulations into clear, actionable insights for citizens, researchers, and policymakers.",
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero */}
      <HeroSection />

      {/* 2. How It Works */}
      <HowItWorks />

      {/* 3. Trending Policies */}
      <TrendingPolicies />

      {/* 4. AI Capabilities */}
      <AICapabilities />

      {/* 5. Statistics */}
      <Statistics />

      {/* 6. FAQ */}
      <FAQ />

      {/* 7. Footer */}
      <Footer />
    </div>
  );
}
