"use client";

import { Card, CardContent } from "@heroui/react";
import { Upload, Cpu, FileText } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: Upload,
    title: "Upload Your Document",
    description:
      "Import any policy PDF, legislative bill, municipal ordinance, or regulatory filing directly into PolicyLens. We support documents up to 500 pages.",
    color: "#1a3a6b",
    accent: "#d4960a",
  },
  {
    step: "02",
    icon: Cpu,
    title: "AI Processes & Analyzes",
    description:
      "Our fine-tuned language models extract key clauses, cross-reference related legislation, flag ambiguities, and build a structured knowledge graph of the document.",
    color: "#152f58",
    accent: "#f4ba18",
  },
  {
    step: "03",
    icon: FileText,
    title: "Get Clear Insights",
    description:
      "Receive plain-language summaries, clause-level breakdowns, impact scores, stakeholder analysis, and Q&A capabilities — all in seconds.",
    color: "#0f2345",
    accent: "#d4960a",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-[#fafaf8] dark:bg-[#040c1f]">
      <div className="mx-auto max-w-6xl px-6">
        {/* Heading */}
        <div className="text-center mb-16">
          <p className="text-[#d4960a] font-semibold text-sm uppercase tracking-widest mb-3">
            The Process
          </p>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-[#091832] dark:text-[#eef1f7] tracking-tight">
            How It Works
          </h2>
          <p className="mt-4 text-lg text-[#7a756a] dark:text-[#9baece] max-w-2xl mx-auto">
            From raw policy document to actionable intelligence in three simple steps.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector line (desktop only) */}
          <div
            aria-hidden="true"
            className="hidden md:block absolute top-[52px] left-[calc(16.67%+32px)] right-[calc(16.67%+32px)] h-[2px]"
            style={{
              background:
                "linear-gradient(90deg, #d4960a 0%, #f4ba18 50%, #d4960a 100%)",
              opacity: 0.4,
            }}
          />

          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div key={idx} className="relative flex flex-col items-center text-center group">
                {/* Step circle */}
                <div
                  className="relative z-10 flex items-center justify-center w-16 h-16 rounded-full mb-6 transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: `linear-gradient(135deg, ${s.color} 0%, ${s.accent}33 100%)`,
                    border: `2px solid ${s.accent}66`,
                    boxShadow: `0 0 24px ${s.accent}33`,
                  }}
                >
                  <Icon className="w-7 h-7" style={{ color: s.accent }} />
                  <span
                    className="absolute -top-2 -right-2 text-xs font-black rounded-full w-6 h-6 flex items-center justify-center"
                    style={{ background: s.accent, color: "#040c1f" }}
                  >
                    {s.step.slice(-1)}
                  </span>
                </div>

                <Card className="w-full bg-white dark:bg-[#091832] border border-[#eceae4] dark:border-[#152f58] shadow-sm hover:shadow-lg transition-shadow duration-300 rounded-2xl">
                  <CardContent className="p-6 flex flex-col items-center gap-3">
                    <span className="text-xs font-black tracking-widest text-[#a09b8e] dark:text-[#6987b6]">
                      STEP {s.step}
                    </span>
                    <h3 className="text-xl font-bold text-[#091832] dark:text-[#eef1f7]">
                      {s.title}
                    </h3>
                    <p className="text-sm text-[#7a756a] dark:text-[#9baece] leading-relaxed">
                      {s.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
