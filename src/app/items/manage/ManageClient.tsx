"use client";

import { useState, useTransition } from "react";
import { deletePolicy } from "./actions";
import { useRouter } from "next/navigation";
import { Eye, Trash2, Plus, FileText, AlertTriangle, Loader2 } from "lucide-react";
import NextLink from "next/link";

type Policy = {
  id: string;
  title: string;
  category: string;
  status: string;
  createdAt: string;
  aiSummary: string | null;
};

const STATUS_STYLES: Record<string, string> = {
  Active: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  Draft: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  Archived: "bg-gray-100 text-gray-600 dark:bg-gray-900/30 dark:text-gray-400",
};

const CATEGORY_STYLES: Record<string, string> = {
  Healthcare: "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400",
  Climate: "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400",
  Education: "bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400",
  Housing: "bg-orange-50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400",
  Privacy: "bg-slate-50 text-slate-700 dark:bg-slate-900/20 dark:text-slate-400",
  Security: "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400",
  Labor: "bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400",
  Finance: "bg-teal-50 text-teal-700 dark:bg-teal-900/20 dark:text-teal-400",
};

interface Props {
  policies: Policy[];
}

export function ManageClient({ policies: initialPolicies }: Props) {
  const router = useRouter();
  const [policies, setPolicies] = useState(initialPolicies);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleDelete = (id: string) => {
    setDeletingId(id);
    setError(null);
    startTransition(async () => {
      const result = await deletePolicy(id);
      if (result.success) {
        setPolicies((prev) => prev.filter((p) => p.id !== id));
        setConfirmDeleteId(null);
      } else {
        setError(result.error ?? "Failed to delete policy.");
      }
      setDeletingId(null);
    });
  };

  return (
    <div className="min-h-screen bg-[#f5f4f0] dark:bg-[#040c1f] py-10 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Policies</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Manage the policies you've submitted to PolicyLens.
            </p>
          </div>
          <NextLink href="/items/add">
            <button className="flex items-center gap-2 px-5 py-2.5 bg-[#1a3a6b] hover:bg-[#152f58] text-white font-semibold rounded-xl transition-colors shadow-sm">
              <Plus className="w-4 h-4" />
              Add Policy
            </button>
          </NextLink>
        </div>

        {error && (
          <div className="flex items-center gap-3 p-4 mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-700 dark:text-red-400 text-sm">
            <AlertTriangle className="w-4 h-4 flex-shrink-0" />
            {error}
          </div>
        )}

        {policies.length === 0 ? (
          /* Empty State */
          <div className="bg-white dark:bg-[#091832] rounded-2xl border border-gray-200 dark:border-[#152f58] shadow-sm p-20 text-center">
            <FileText className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No policies yet</h2>
            <p className="text-gray-400 dark:text-gray-500 mb-6">
              Start by uploading your first policy document.
            </p>
            <NextLink href="/items/add">
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-[#1a3a6b] text-white font-semibold rounded-xl hover:bg-[#152f58] transition-colors">
                <Plus className="w-4 h-4" />
                Add Your First Policy
              </button>
            </NextLink>
          </div>
        ) : (
          /* Table */
          <div className="bg-white dark:bg-[#091832] rounded-2xl border border-gray-200 dark:border-[#152f58] shadow-sm overflow-hidden">
            {/* Stats bar */}
            <div className="flex items-center gap-6 px-6 py-4 border-b border-gray-100 dark:border-[#152f58] bg-gray-50 dark:bg-[#0a1c3a]">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold text-gray-900 dark:text-white">{policies.length}</span> total
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold text-emerald-600">{policies.filter(p => p.status === "Active").length}</span> active
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold text-yellow-600">{policies.filter(p => p.status === "Draft").length}</span> drafts
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 dark:border-[#152f58]">
                    <th className="text-left px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Policy</th>
                    <th className="text-left px-4 py-3.5 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 hidden md:table-cell">Category</th>
                    <th className="text-left px-4 py-3.5 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Status</th>
                    <th className="text-left px-4 py-3.5 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 hidden lg:table-cell">Added</th>
                    <th className="text-right px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 dark:divide-[#0f2345]">
                  {policies.map((policy) => (
                    <tr
                      key={policy.id}
                      className="hover:bg-gray-50 dark:hover:bg-[#0a1c3a] transition-colors group"
                    >
                      {/* Title + summary */}
                      <td className="px-6 py-4">
                        <div className="max-w-xs">
                          <p className="font-semibold text-gray-900 dark:text-white line-clamp-1 group-hover:text-[#1a3a6b] dark:group-hover:text-blue-300 transition-colors">
                            {policy.title}
                          </p>
                          {policy.aiSummary && (
                            <p className="text-xs text-gray-400 dark:text-gray-500 line-clamp-1 mt-0.5">
                              {policy.aiSummary}
                            </p>
                          )}
                        </div>
                      </td>

                      {/* Category */}
                      <td className="px-4 py-4 hidden md:table-cell">
                        <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full ${CATEGORY_STYLES[policy.category] ?? "bg-gray-100 text-gray-600"}`}>
                          {policy.category}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-4 py-4">
                        <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_STYLES[policy.status] ?? "bg-gray-100 text-gray-600"}`}>
                          {policy.status}
                        </span>
                      </td>

                      {/* Date */}
                      <td className="px-4 py-4 text-gray-500 dark:text-gray-400 text-xs hidden lg:table-cell">
                        {new Date(policy.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          {confirmDeleteId === policy.id ? (
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">Delete?</span>
                              <button
                                onClick={() => handleDelete(policy.id)}
                                disabled={isPending}
                                className="px-3 py-1.5 text-xs font-semibold bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors disabled:opacity-50 flex items-center gap-1"
                              >
                                {deletingId === policy.id ? <Loader2 className="w-3 h-3 animate-spin" /> : null}
                                Confirm
                              </button>
                              <button
                                onClick={() => setConfirmDeleteId(null)}
                                className="px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <>
                              <NextLink href={`/items/manage/${policy.id}/edit`}>
                                <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#1a3a6b] dark:text-blue-400 hover:bg-[#1a3a6b]/10 rounded-lg transition-colors">
                                  <Eye className="w-3.5 h-3.5" />
                                  Edit
                                </button>
                              </NextLink>
                              <button
                                onClick={() => setConfirmDeleteId(policy.id)}
                                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                Delete
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
