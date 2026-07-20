"use client";

import { Card, CardContent } from "@heroui/react";
import { FileText, Globe, Users, Zap, BookOpen, Award } from "lucide-react";

const stats = [
  {
    icon: FileText,
    value: "10,000+",
    label: "Policies Simplified",
    sub: "From federal bills to municipal codes",
    accent: "#d4960a",
  },
  {
    icon: Globe,
    value: "38",
    label: "Countries Covered",
    sub: "Cross-border policy intelligence",
    accent: "#1a3a6b",
  },
  {
    icon: Users,
    value: "2,400+",
    label: "Active Analysts",
    sub: "Researchers, lawyers & policymakers",
    accent: "#d4960a",
  },
  {
    icon: Zap,
    value: "< 30s",
    label: "Analysis Speed",
    sub: "Average document processing time",
    accent: "#1a3a6b",
  },
  {
    icon: BookOpen,
    value: "98%",
    label: "Accuracy Rate",
    sub: "Validated against legal expert reviews",
    accent: "#d4960a",
  },
  {
    icon: Award,
    value: "4.9 / 5",
    label: "User Satisfaction",
    sub: "Across 800+ verified reviews",
    accent: "#1a3a6b",
  },
];

export function Statistics() {
  return (
    <section id="statistics" className="py-24 bg-[#fafaf8] dark:bg-[#040c1f] relative overflow-hidden">
      {/* Background blobs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-10"
        style={{ background: "radial-gradient(circle, #d4960a 0%, transparent 70%)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full opacity-10"
        style={{ background: "radial-gradient(circle, #1a3a6b 0%, transparent 70%)" }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="text-center mb-16">
          <p className="text-[#d4960a] font-semibold text-sm uppercase tracking-widest mb-3">
            By the Numbers
          </p>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-[#091832] dark:text-[#eef1f7] tracking-tight">
            Statistics That Speak
          </h2>
          <p className="mt-4 text-lg text-[#7a756a] dark:text-[#9baece] max-w-xl mx-auto">
            PolicyLens is trusted by professionals who need reliable, fast, and accurate policy
            intelligence.
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <Card
                key={idx}
                className="bg-white dark:bg-[#091832] border border-[#eceae4] dark:border-[#152f58] rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group overflow-hidden"
              >
                <CardContent className="p-8 relative flex flex-col gap-2">
                  {/* Accent line */}
                  <div
                    className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
                    style={{ background: `linear-gradient(90deg, ${stat.accent}, transparent)` }}
                  />

                  {/* Icon */}
                  <div
                    className="flex items-center justify-center w-12 h-12 rounded-xl mb-3"
                    style={{ background: `${stat.accent}18`, border: `1px solid ${stat.accent}33` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: stat.accent }} />
                  </div>

                  {/* Big number */}
                  <span
                    className="text-5xl font-black tracking-tight leading-none"
                    style={{ color: stat.accent }}
                  >
                    {stat.value}
                  </span>

                  {/* Label */}
                  <span className="text-xl font-bold text-[#091832] dark:text-[#eef1f7] mt-1">
                    {stat.label}
                  </span>

                  {/* Sub-label */}
                  <p className="text-sm text-[#7a756a] dark:text-[#9baece]">{stat.sub}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
