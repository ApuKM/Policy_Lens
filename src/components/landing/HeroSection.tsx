"use client";

import { Button } from "@heroui/react";
import { ArrowRight, Sparkles, ShieldCheck } from "lucide-react";
import NextLink from "next/link";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex items-center justify-center overflow-hidden bg-[#1a3a6b] min-h-[70vh] max-h-[70vh]"
    >
      {/* Radial glow background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 60%, rgba(212,150,10,0.18) 0%, transparent 70%), radial-gradient(ellipse 60% 40% at 80% 20%, rgba(61,100,159,0.35) 0%, transparent 60%)",
        }}
      />

      {/* Subtle grid overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl px-6 py-20 text-center flex flex-col items-center gap-8">
        {/* Badge */}
        <div className="flex items-center gap-2 bg-[#152f58] border border-[#3d649f] rounded-full px-4 py-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#f4ba18]" />
          <span className="text-[#f7ce47] text-xs font-semibold tracking-wide">
            AI-Powered Civic Intelligence
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
          Demystify{" "}
          <span
            className="text-transparent bg-clip-text"
            style={{
              backgroundImage: "linear-gradient(135deg, #f7ce47 0%, #f4ba18 50%, #d4960a 100%)",
            }}
          >
            Civic Policies
          </span>{" "}
          with&nbsp;AI
        </h1>

        {/* Subheading */}
        <p className="max-w-2xl text-lg sm:text-xl text-[#9baece] leading-relaxed">
          PolicyLens transforms dense government documents, legislation, and regulations into
          clear, actionable insights — so citizens, researchers, and decision-makers can
          understand what matters most.
        </p>

        {/* Trust line */}
        <div className="flex items-center gap-2 text-[#6987b6] text-sm">
          <ShieldCheck className="w-4 h-4 text-[#d4960a]" />
          <span>Trusted by 2,400+ policy analysts across 38 countries</span>
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
          <NextLink href="/register">
            <Button
              variant="primary"
              size="lg"
              className="bg-[#d4960a] hover:bg-[#f4ba18] text-[#040c1f] font-bold px-8 h-12 rounded-full shadow-lg shadow-[#d4960a]/30 transition-all duration-200 gap-2"
            >
              Get Started Free
              <ArrowRight className="w-4 h-4" />
            </Button>
          </NextLink>
          <NextLink href="#how-it-works">
            <Button
              variant="outline"
              size="lg"
              className="border-[#3d649f] text-[#cdd5e6] hover:bg-[#152f58] hover:border-[#6987b6] font-semibold px-8 h-12 rounded-full transition-all duration-200"
            >
              See How It Works
            </Button>
          </NextLink>
        </div>

        {/* Floating stat chips */}
        <div className="flex flex-wrap justify-center gap-3 mt-4">
          {[
            { value: "10k+", label: "Policies Analyzed" },
            { value: "98%", label: "Accuracy Rate" },
            { value: "< 30s", label: "Analysis Time" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-2 rounded-full bg-[#152f58]/70 border border-[#3d649f] px-4 py-2 backdrop-blur-sm"
            >
              <span className="text-[#f7ce47] font-bold text-sm">{stat.value}</span>
              <span className="text-[#9baece] text-xs">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom fade into page */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-24"
        style={{
          background: "linear-gradient(to bottom, transparent, #fafaf8)",
        }}
      />
    </section>
  );
}
