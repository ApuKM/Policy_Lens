"use client";

import { Card } from "@heroui/react";
import {
  ScanText,
  Network,
  GitCompare,
  MessageSquareQuote,
  ShieldAlert,
  BarChart3,
} from "lucide-react";

const capabilities = [
  {
    icon: ScanText,
    title: "Full Document Parsing",
    description:
      "Ingests PDFs, Word documents, and scanned images (via OCR) — even 500-page legislative bundles — and extracts structured content with paragraph-level precision.",
    tag: "Core",
    tagColor: "#1a3a6b",
  },
  {
    icon: Network,
    title: "Cross-Reference Mapping",
    description:
      "Automatically links clauses to related statutes, prior rulings, and international treaties, building a live knowledge graph so you never miss a dependency.",
    tag: "Intelligence",
    tagColor: "#d4960a",
  },
  {
    icon: GitCompare,
    title: "Version Diff Analysis",
    description:
      "Compare any two drafts of a bill or regulation side-by-side, with AI-highlighted additions, removals, and semantic meaning changes between versions.",
    tag: "Analysis",
    tagColor: "#155e1a",
  },
  {
    icon: MessageSquareQuote,
    title: "Natural Language Q&A",
    description:
      "Ask any question about a policy document in plain English and get precise, cited answers — no legal jargon required.",
    tag: "Conversational",
    tagColor: "#5b21b6",
  },
  {
    icon: ShieldAlert,
    title: "Risk & Ambiguity Flagging",
    description:
      "Identifies vague language, contradictory clauses, and enforcement gaps that could create legal risk or implementation challenges.",
    tag: "Safety",
    tagColor: "#9a3412",
  },
  {
    icon: BarChart3,
    title: "Impact Scoring",
    description:
      "Quantifies policy impact across key dimensions — economic, social, environmental, and administrative — with explainable scores and sector breakdowns.",
    tag: "Scoring",
    tagColor: "#0f2345",
  },
];

export function AICapabilities() {
  return (
    <section id="ai-capabilities" className="py-24 bg-[#1a3a6b] relative overflow-hidden">
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(212,150,10,0.12) 0%, transparent 70%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="text-center mb-16">
          <p className="text-[#f7ce47] font-semibold text-sm uppercase tracking-widest mb-3">
            Powered by AI
          </p>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            AI Capabilities
          </h2>
          <p className="mt-4 text-lg text-[#9baece] max-w-2xl mx-auto">
            PolicyLens combines large language models with domain-specific legal knowledge to
            deliver analysis that no general-purpose AI tool can match.
          </p>
        </div>

        {/* Capability grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((cap, idx) => {
            const Icon = cap.icon;
            return (
              <Card
                key={idx}
                className="bg-[#152f58]/60 border border-[#3d649f]/40 rounded-2xl backdrop-blur-sm hover:bg-[#152f58] hover:border-[#6987b6] hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group"
              >
                <Card.Content className="p-6 flex flex-col gap-4">
                  {/* Icon + Tag row */}
                  <div className="flex items-start justify-between">
                    <div
                      className="flex items-center justify-center w-11 h-11 rounded-xl"
                      style={{ background: `${cap.tagColor}33`, border: `1px solid ${cap.tagColor}66` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: "#f7ce47" }} />
                    </div>
                    <span
                      className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full text-white"
                      style={{ background: cap.tagColor }}
                    >
                      {cap.tag}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-white group-hover:text-[#f7ce47] transition-colors">
                    {cap.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-[#9baece] leading-relaxed">
                    {cap.description}
                  </p>
                </Card.Content>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
