import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PolicyChat } from "./PolicyChat";
import { ExternalLink, Tag, Activity, Calendar, User, ArrowLeft, FileText, Sparkles, ListChecks } from "lucide-react";
import NextLink from "next/link";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const policy = await prisma.policy.findUnique({ where: { id }, select: { title: true, shortDescription: true } });
  if (!policy) return { title: "Policy Not Found" };
  return {
    title: `${policy.title} — PolicyLens`,
    description: policy.shortDescription ?? undefined,
  };
}

const CATEGORY_IMAGES: Record<string, string> = {
  Healthcare: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1600&h=600&fit=crop&q=80",
  Climate: "https://images.unsplash.com/photo-1604328698692-f52a678c2049?w=1600&h=600&fit=crop&q=80",
  Education: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1600&h=600&fit=crop&q=80",
  Housing: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600&h=600&fit=crop&q=80",
  Privacy: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1600&h=600&fit=crop&q=80",
  Security: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=1600&h=600&fit=crop&q=80",
  Labor: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&h=600&fit=crop&q=80",
  Finance: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1600&h=600&fit=crop&q=80",
};
const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1600&h=600&fit=crop&q=80";

const STATUS_STYLES: Record<string, string> = {
  Active: "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30",
  Draft: "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30",
  Archived: "bg-gray-500/20 text-gray-300 border border-gray-500/30",
};

export default async function PolicyDetailPage({ params }: Props) {
  const { id } = await params;

  const policy = await prisma.policy.findUnique({
    where: { id },
    include: { author: { select: { name: true } } },
  });

  if (!policy) notFound();

  const heroImage = CATEGORY_IMAGES[policy.category] ?? DEFAULT_IMAGE;
  const statusStyle = STATUS_STYLES[policy.status] ?? STATUS_STYLES.Draft;
  const formattedDate = policy.createdAt.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const actionItems: string[] = Array.isArray(policy.aiActionItems) ? policy.aiActionItems as string[] : [];

  return (
    <div className="min-h-screen bg-[#f5f4f0] dark:bg-[#040c1f]">
      {/* Hero Banner */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        <img src={heroImage} alt={policy.category} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#091832] via-[#091832]/60 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end px-4 pb-8">
          <div className="container mx-auto max-w-6xl">
            <NextLink
              href="/explore"
              className="inline-flex items-center gap-1.5 text-blue-300 hover:text-white text-sm mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Explore
            </NextLink>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1 bg-white/20 backdrop-blur text-white text-xs font-semibold px-3 py-1 rounded-full">
                <Tag className="w-3 h-3" />
                {policy.category}
              </span>
              <span className={`inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full ${statusStyle}`}>
                <Activity className="w-3 h-3" />
                {policy.status}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight max-w-4xl">
              {policy.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-blue-200">
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                {policy.author?.name ?? "Unknown Author"}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {formattedDate}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto max-w-6xl px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Main Content */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* AI Summary */}
            <div className="bg-white dark:bg-[#091832] rounded-2xl border border-gray-200 dark:border-[#152f58] shadow-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 rounded-lg bg-[#1a3a6b]/10 dark:bg-[#1a3a6b]/30">
                  <Sparkles className="w-5 h-5 text-[#1a3a6b] dark:text-[#6987b6]" />
                </div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">AI Summary</h2>
              </div>
              {policy.aiSummary ? (
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{policy.aiSummary}</p>
              ) : (
                <p className="text-gray-400 italic">Summary not yet generated.</p>
              )}
            </div>

            {/* AI Action Items */}
            {actionItems.length > 0 && (
              <div className="bg-white dark:bg-[#091832] rounded-2xl border border-gray-200 dark:border-[#152f58] shadow-sm p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 rounded-lg bg-[#d4960a]/10 dark:bg-[#d4960a]/20">
                    <ListChecks className="w-5 h-5 text-[#d4960a]" />
                  </div>
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white">AI Action Items</h2>
                </div>
                <ul className="flex flex-col gap-2.5">
                  {actionItems.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#1a3a6b]/10 dark:bg-[#1a3a6b]/30 text-[#1a3a6b] dark:text-[#6987b6] text-xs font-bold flex items-center justify-center mt-0.5">
                        {i + 1}
                      </span>
                      <span className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Full text preview */}
            {policy.fullText && (
              <div className="bg-white dark:bg-[#091832] rounded-2xl border border-gray-200 dark:border-[#152f58] shadow-sm p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 rounded-lg bg-gray-100 dark:bg-[#152f58]">
                    <FileText className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  </div>
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white">Policy Text</h2>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed max-h-64 overflow-y-auto bg-gray-50 dark:bg-[#040c1f] rounded-xl p-4 font-mono whitespace-pre-wrap">
                  {policy.fullText}
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="flex flex-col gap-4">
            {/* PDF Viewer Card */}
            {policy.pdfUrl && (
              <div className="bg-gradient-to-br from-[#1a3a6b] to-[#091832] rounded-2xl p-6 text-white shadow-lg">
                <div className="p-3 rounded-xl bg-white/10 w-fit mb-4">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg mb-1">Original Document</h3>
                <p className="text-blue-200 text-sm mb-4">
                  View the full original PDF policy document.
                </p>
                <a
                  href={policy.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-[#d4960a] hover:bg-[#c08609] text-white font-semibold text-sm transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Open PDF
                </a>
              </div>
            )}

            {/* Policy details card */}
            <div className="bg-white dark:bg-[#091832] rounded-2xl border border-gray-200 dark:border-[#152f58] shadow-sm p-5">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Policy Details</h3>
              <dl className="flex flex-col gap-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-gray-500 dark:text-gray-400">Category</dt>
                  <dd className="font-medium text-gray-900 dark:text-white">{policy.category}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500 dark:text-gray-400">Status</dt>
                  <dd className="font-medium text-gray-900 dark:text-white">{policy.status}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500 dark:text-gray-400">Author</dt>
                  <dd className="font-medium text-gray-900 dark:text-white">{policy.author?.name ?? "—"}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500 dark:text-gray-400">Published</dt>
                  <dd className="font-medium text-gray-900 dark:text-white">{formattedDate}</dd>
                </div>
                {actionItems.length > 0 && (
                  <div className="flex justify-between">
                    <dt className="text-gray-500 dark:text-gray-400">Action Items</dt>
                    <dd className="font-medium text-gray-900 dark:text-white">{actionItems.length}</dd>
                  </div>
                )}
              </dl>
            </div>
          </div>
        </div>

        {/* AI Chat Section */}
        <div className="mt-8">
          <PolicyChat
            policyId={policy.id}
            policyTitle={policy.title}
            aiSummary={policy.aiSummary ?? ""}
            fullText={policy.fullText ?? ""}
          />
        </div>
      </div>
    </div>
  );
}
