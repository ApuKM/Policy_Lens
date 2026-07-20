"use client";

import { useState, useMemo } from "react";
import { Input, Button } from "@heroui/react";
import { Search, X, Filter, BookOpen, ExternalLink } from "lucide-react";
import NextLink from "next/link";

type Policy = {
  id: string;
  title: string;
  shortDescription: string;
  category: string;
  status: string;
  createdAt: string;
  author: { name: string };
};

const CATEGORY_IMAGES: Record<string, string> = {
  Healthcare: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=400&fit=crop&q=80",
  Climate: "https://images.unsplash.com/photo-1604328698692-f52a678c2049?w=800&h=400&fit=crop&q=80",
  Education: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=400&fit=crop&q=80",
  Housing: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=400&fit=crop&q=80",
  Privacy: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=400&fit=crop&q=80",
  Security: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&h=400&fit=crop&q=80",
  Labor: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop&q=80",
  Finance: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop&q=80",
  Default: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop&q=80",
};

const CATEGORY_TAG_COLORS: Record<string, string> = {
  Healthcare: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  Climate: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
  Education: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
  Housing: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
  Privacy: "bg-slate-100 text-slate-700 dark:bg-slate-900/40 dark:text-slate-300",
  Security: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
  Labor: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  Finance: "bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300",
};

const STATUS_COLORS: Record<string, string> = {
  Active: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  Draft: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300",
  Archived: "bg-gray-100 text-gray-600 dark:bg-gray-900/40 dark:text-gray-400",
};

const ALL_CATEGORIES = ["Healthcare", "Climate", "Education", "Housing", "Privacy", "Security", "Labor", "Finance"];
const ALL_STATUSES = ["Active", "Draft", "Archived"];

export function ExploreClient({ policies }: { policies: Policy[] }) {
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const toggleStatus = (s: string) => {
    setSelectedStatuses((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedStatuses([]);
    setSearch("");
  };

  const hasFilters = selectedCategories.length > 0 || selectedStatuses.length > 0 || search.length > 0;

  const filtered = useMemo(() => {
    return policies.filter((p) => {
      const matchesSearch =
        !search ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.shortDescription?.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(p.category);
      const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.includes(p.status);
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [policies, search, selectedCategories, selectedStatuses]);

  return (
    <div className="min-h-screen bg-[#f5f4f0] dark:bg-[#040c1f]">
      {/* Hero Search Header */}
      <div className="bg-gradient-to-br from-[#091832] via-[#1a3a6b] to-[#091832] text-white py-12 px-4">
        <div className="container mx-auto max-w-7xl text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur rounded-full px-4 py-1.5 text-sm font-medium mb-4">
            <BookOpen className="w-4 h-4" />
            Policy Library
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Explore Policies</h1>
          <p className="text-lg text-blue-200 mb-8 max-w-2xl mx-auto">
            Browse AI-analyzed policy documents. Search, filter by category, and dive into detailed summaries.
          </p>
          {/* Search bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
            <input
              type="text"
              placeholder="Search policies by title or description..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-900 dark:text-white bg-white dark:bg-[#0f2345] shadow-xl text-base outline-none focus:ring-2 focus:ring-[#d4960a] transition"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
          <p className="text-sm text-blue-300 mt-3">
            {filtered.length} of {policies.length} policies
          </p>
        </div>
      </div>

      {/* Main layout */}
      <div className="container mx-auto max-w-7xl px-4 py-8">
        {/* Mobile filter toggle */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setShowMobileFilters((v) => !v)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-[#0f2345] border border-gray-200 dark:border-gray-700 text-sm font-medium shadow-sm"
          >
            <Filter className="w-4 h-4" />
            Filters
            {hasFilters && (
              <span className="ml-1 bg-[#1a3a6b] text-white text-xs rounded-full px-2 py-0.5">
                {selectedCategories.length + selectedStatuses.length}
              </span>
            )}
          </button>
        </div>

        <div className="flex gap-6">
          {/* Sidebar */}
          <aside
            className={`${
              showMobileFilters ? "block" : "hidden"
            } lg:block w-full lg:w-64 flex-shrink-0`}
          >
            <div className="bg-white dark:bg-[#091832] rounded-2xl border border-gray-200 dark:border-[#152f58] shadow-sm p-5 sticky top-20">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-gray-900 dark:text-white">Filters</h2>
                {hasFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-xs text-[#d4960a] font-medium hover:underline"
                  >
                    Clear all
                  </button>
                )}
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">
                  Category
                </h3>
                <div className="flex flex-col gap-2">
                  {ALL_CATEGORIES.map((cat) => (
                    <label
                      key={cat}
                      className="flex items-center gap-2.5 cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(cat)}
                        onChange={() => toggleCategory(cat)}
                        className="w-4 h-4 rounded border-gray-300 accent-[#1a3a6b] cursor-pointer"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition">
                        {cat}
                      </span>
                      <span className="ml-auto text-xs text-gray-400">
                        {policies.filter((p) => p.category === cat).length}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Status Filter */}
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">
                  Status
                </h3>
                <div className="flex flex-col gap-2">
                  {ALL_STATUSES.map((s) => (
                    <label key={s} className="flex items-center gap-2.5 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={selectedStatuses.includes(s)}
                        onChange={() => toggleStatus(s)}
                        className="w-4 h-4 rounded border-gray-300 accent-[#1a3a6b] cursor-pointer"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition">
                        {s}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Policy Grid */}
          <main className="flex-1 min-w-0">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <BookOpen className="w-16 h-16 text-gray-300 dark:text-gray-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  No policies found
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                  Try adjusting your filters or search query.
                </p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-2.5 bg-[#1a3a6b] text-white rounded-lg text-sm font-medium hover:bg-[#152f58] transition"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                {filtered.map((policy) => (
                  <PolicyCard key={policy.id} policy={policy} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

function PolicyCard({ policy }: { policy: Policy }) {
  const imgSrc =
    CATEGORY_IMAGES[policy.category] || CATEGORY_IMAGES.Default;
  const catColor =
    CATEGORY_TAG_COLORS[policy.category] || "bg-gray-100 text-gray-700";
  const statusColor =
    STATUS_COLORS[policy.status] || "bg-gray-100 text-gray-600";
  const date = new Date(policy.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="group bg-white dark:bg-[#091832] rounded-2xl border border-gray-200 dark:border-[#152f58] shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 overflow-hidden flex flex-col">
      {/* Card image */}
      <div className="relative overflow-hidden h-40">
        <img
          src={imgSrc}
          alt={policy.category}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        {/* Status badge overlaid on image */}
        <span
          className={`absolute top-2 right-2 text-[11px] font-semibold px-2.5 py-1 rounded-full ${statusColor}`}
        >
          {policy.status}
        </span>
      </div>

      {/* Card content */}
      <div className="flex flex-col flex-1 p-4">
        {/* Category tag */}
        <span
          className={`self-start text-[11px] font-semibold px-2.5 py-1 rounded-full mb-2 ${catColor}`}
        >
          {policy.category}
        </span>

        {/* Title */}
        <h3 className="font-bold text-gray-900 dark:text-white text-sm leading-snug mb-1.5 line-clamp-2">
          {policy.title}
        </h3>

        {/* Description */}
        {policy.shortDescription && (
          <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mb-3 flex-1">
            {policy.shortDescription}
          </p>
        )}

        {/* Author & date */}
        <div className="flex items-center justify-between text-[11px] text-gray-400 dark:text-gray-500 mb-3 mt-auto">
          <span>{policy.author?.name || "Unknown"}</span>
          <span>{date}</span>
        </div>

        {/* CTA */}
        <NextLink href={`/policy/${policy.id}`} className="block">
          <button className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg bg-[#1a3a6b] hover:bg-[#152f58] text-white text-xs font-semibold transition-colors">
            <ExternalLink className="w-3.5 h-3.5" />
            View Details
          </button>
        </NextLink>
      </div>
    </div>
  );
}
