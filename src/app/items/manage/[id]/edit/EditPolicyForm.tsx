"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, Input, Label, Select, SelectTrigger, SelectValue, SelectIndicator, SelectPopover, ListBox, ListBoxItem, Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { updatePolicy } from "./actions";

const CATEGORIES = ["Healthcare", "Climate", "Education", "Housing", "Privacy", "Labor", "Finance", "Security"];
const STATUSES = ["Draft", "Active", "Archived"];

interface PolicyFormProps {
  policy: {
    id: string;
    title: string;
    category: string;
    status: string;
    shortDescription: string;
    aiSummary: string | null;
  };
}

export default function EditPolicyForm({ policy }: PolicyFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState(policy.title);
  const [category, setCategory] = useState(policy.category);
  const [status, setStatus] = useState(policy.status);
  const [shortDescription, setShortDescription] = useState(policy.shortDescription);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);

    const result = await updatePolicy({ id: policy.id, title, category, status, shortDescription });
    if (result.success) {
      router.push("/items/manage");
    } else {
      setError(result.error ?? "Failed to update policy.");
    }

    setIsSaving(false);
  };

  return (
    <Card className="bg-white dark:bg-[#091832] border border-[#eceae4] dark:border-[#152f58] rounded-3xl shadow-sm">
      <CardHeader className="px-8 pt-8 pb-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Edit Policy</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Update the details for this policy and save your changes.</p>
      </CardHeader>
      <CardContent className="px-8 pb-8 space-y-6">
        {error && (
          <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="policy-title">Title</Label>
              <Input id="policy-title" value={title} onChange={(e) => setTitle(e.target.value)} disabled={isSaving} />
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Select selectedKey={category} onSelectionChange={(key) => key && setCategory(String(key))} isDisabled={isSaving}>
                <SelectTrigger>
                  <SelectValue />
                  <SelectIndicator />
                </SelectTrigger>
                <SelectPopover>
                  <ListBox>
                    {CATEGORIES.map((cat) => (
                      <ListBoxItem key={cat} id={cat}>
                        {cat}
                      </ListBoxItem>
                    ))}
                  </ListBox>
                </SelectPopover>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Status</Label>
              <Select selectedKey={status} onSelectionChange={(key) => key && setStatus(String(key))} isDisabled={isSaving}>
                <SelectTrigger>
                  <SelectValue />
                  <SelectIndicator />
                </SelectTrigger>
                <SelectPopover>
                  <ListBox>
                    {STATUSES.map((s) => (
                      <ListBoxItem key={s} id={s}>
                        {s}
                      </ListBoxItem>
                    ))}
                  </ListBox>
                </SelectPopover>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Summary</Label>
              <Input value={shortDescription} onChange={(e) => setShortDescription(e.target.value)} disabled={isSaving} />
            </div>
          </div>

          <div className="space-y-2">
            <Label>AI Summary</Label>
            <textarea rows={4} value={policy.aiSummary ?? ""} disabled className="w-full rounded-2xl border border-[#eceae4] bg-[#f8fafc] p-3 text-sm text-gray-700 dark:border-[#152f58] dark:bg-[#0b1726] dark:text-white" />
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Button type="submit" className="bg-[#1a3a6b] text-white hover:bg-[#152f58]" isDisabled={isSaving}>
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
            <button type="button" className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200" onClick={() => router.push("/items/manage")}>Cancel</button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
