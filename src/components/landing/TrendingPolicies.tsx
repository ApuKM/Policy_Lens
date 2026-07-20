"use client";

import { Card, CardContent, Button } from "@heroui/react";
import { TrendingUp, ArrowRight } from "lucide-react";

const policies = [
  {
    id: 1,
    category: "Healthcare",
    categoryColor: "#1a3a6b",
    title: "Affordable Medicines Access Act 2024",
    summary:
      "Mandates price caps on essential medications and expands generic drug approval pathways to improve access for low-income households.",
    region: "Federal · USA",
    complexity: "High",
    date: "Jun 2024",
    trending: true,
  },
  {
    id: 2,
    category: "Climate",
    categoryColor: "#155e1a",
    title: "Net Zero Infrastructure Directive",
    summary:
      "Establishes binding emissions standards for public construction projects and introduces green procurement benchmarks for government contracts.",
    region: "EU · Brussels",
    complexity: "Medium",
    date: "May 2024",
    trending: true,
  },
  {
    id: 3,
    category: "Education",
    categoryColor: "#5b21b6",
    title: "Digital Literacy Framework for Schools",
    summary:
      "Requires K-12 schools to integrate AI literacy, data privacy education, and critical media evaluation into core curricula by 2026.",
    region: "State · California",
    complexity: "Low",
    date: "Apr 2024",
    trending: false,
  },
  {
    id: 4,
    category: "Housing",
    categoryColor: "#9a3412",
    title: "Urban Housing Equity Resolution",
    summary:
      "Introduces zoning reform measures to increase affordable unit supply in high-demand metro areas and streamlines eviction protection processes.",
    region: "Municipal · NYC",
    complexity: "High",
    date: "Mar 2024",
    trending: true,
  },
  {
    id: 5,
    category: "Privacy",
    categoryColor: "#0f2345",
    title: "Consumer Data Protection Act",
    summary:
      "Grants citizens explicit opt-in rights over personal data collection by tech firms and establishes a new Federal Privacy Enforcement Bureau.",
    region: "Federal · USA",
    complexity: "Medium",
    date: "Feb 2024",
    trending: false,
  },
  {
    id: 6,
    category: "Labor",
    categoryColor: "#92400e",
    title: "Gig Worker Rights & Benefits Bill",
    summary:
      "Reclassifies gig economy workers under an expanded employment category, granting access to health insurance subsidies and paid leave.",
    region: "State · New York",
    complexity: "Medium",
    date: "Jan 2024",
    trending: true,
  },
];

const complexityColor: Record<string, string> = {
  Low: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Medium: "bg-amber-50 text-amber-700 border-amber-200",
  High: "bg-red-50 text-red-700 border-red-200",
};

export function TrendingPolicies() {
  return (
    <section id="trending" className="py-24 bg-[#f5f4f0] dark:bg-[#091832]">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12 gap-4">
          <div>
            <p className="text-[#d4960a] font-semibold text-sm uppercase tracking-widest mb-3">
              What People Are Reading
            </p>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-[#091832] dark:text-[#eef1f7] tracking-tight">
              Trending Policies
            </h2>
            <p className="mt-3 text-[#7a756a] dark:text-[#9baece]">
              The most-analyzed civic documents on PolicyLens right now.
            </p>
          </div>
          <Button
            variant="outline"
            className="border-[#1a3a6b] text-[#1a3a6b] dark:border-[#3d649f] dark:text-[#9baece] hover:bg-[#1a3a6b] hover:text-white rounded-full shrink-0 gap-2"
          >
            Browse All
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {policies.map((policy) => (
            <Card
              key={policy.id}
              className="bg-white dark:bg-[#0f2345] border border-[#eceae4] dark:border-[#1a3a6b] rounded-2xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
            >
              <CardContent className="p-5 flex flex-col gap-3">
                {/* Top row */}
                <div className="flex items-center justify-between">
                  <span
                    className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full text-white"
                    style={{ background: policy.categoryColor }}
                  >
                    {policy.category}
                  </span>
                  {policy.trending && (
                    <span className="flex items-center gap-1 text-[11px] font-semibold text-[#d4960a]">
                      <TrendingUp className="w-3 h-3" />
                      Trending
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-[#091832] dark:text-[#eef1f7] leading-snug group-hover:text-[#1a3a6b] dark:group-hover:text-[#f7ce47] transition-colors">
                  {policy.title}
                </h3>

                {/* Summary */}
                <p className="text-sm text-[#7a756a] dark:text-[#9baece] leading-relaxed line-clamp-3">
                  {policy.summary}
                </p>

                {/* Footer meta */}
                <div className="flex items-center justify-between pt-2 border-t border-[#eceae4] dark:border-[#152f58] mt-auto">
                  <span className="text-xs text-[#a09b8e] dark:text-[#6987b6]">
                    {policy.region} · {policy.date}
                  </span>
                  <span
                    className={`text-[10px] font-semibold border rounded-full px-2 py-0.5 ${complexityColor[policy.complexity]}`}
                  >
                    {policy.complexity} Complexity
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
