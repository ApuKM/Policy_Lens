"use client";

import { useState, useRef } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Input,
  Label,
  Select,
  SelectTrigger,
  SelectValue,
  SelectIndicator,
  SelectPopover,
  ListBox,
  ListBoxItem,
  Spinner,
} from "@heroui/react";
import { UploadDropzone, UploadButton } from "@/lib/uploadthing";
import { processPolicyDocument } from "@/app/items/add/actions";
import { useRouter } from "next/navigation";

const CATEGORIES = ["Healthcare", "Climate", "Education", "Housing", "Privacy", "Labor", "Finance", "Security"];
const STATUSES = ["Draft", "Active", "Archived"];

export function AddPolicyForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Healthcare");
  const [status, setStatus] = useState("Draft");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadedPdfUrl, setUploadedPdfUrl] = useState<string | null>(null);

  return (
    <Card className="w-full max-w-2xl mx-auto border shadow-sm rounded-2xl" style={{ background: "var(--color-surface)", color: "var(--color-foreground)", borderColor: "var(--color-offwhite-200)" }}>
      <CardHeader className="px-8 pt-8 pb-0 flex flex-col items-start gap-1">
        <h2 className="text-2xl font-bold" style={{ color: "var(--color-foreground)" }}>Add New Policy</h2>
        <p className="text-sm" style={{ color: "var(--color-offwhite-600)" }}>
          Fill in the details and upload a PDF. Our AI will automatically summarize it and extract key action items.
        </p>
      </CardHeader>

      <CardContent className="p-8 flex flex-col gap-6">
        {error && (
          <div className="p-4 rounded-lg text-sm" style={{ background: "var(--color-accent)/10", border: "1px solid var(--color-accent)/20", color: "var(--color-accent)" }}>
            {error}
          </div>
        )}

        <div className="flex flex-col gap-4">
          {/* Title */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="policy-title">Policy Title <span style={{ color: "var(--color-accent)" }}>*</span></Label>
            <Input
              id="policy-title"
              placeholder="Enter the title of the policy"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={isProcessing}
              className="bg-transparent"
              style={{ color: "var(--color-foreground)" }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Category Select */}
            <div className="flex flex-col gap-1.5">
              <Label>Category <span style={{ color: "var(--color-accent)" }}>*</span></Label>
              <Select
                selectedKey={category}
                onSelectionChange={(key) => key && setCategory(String(key))}
                isDisabled={isProcessing}
              >
                  <SelectTrigger className="bg-transparent px-3 py-2 border rounded-md" style={{ background: "var(--color-surface)", color: "var(--color-foreground)", borderColor: "var(--color-offwhite-200)" }}>
                    <SelectValue />
                    <SelectIndicator />
                  </SelectTrigger>
                  <SelectPopover>
                    <ListBox className="" style={{ background: "var(--color-surface)", color: "var(--color-foreground)" }}>
                      {CATEGORIES.map((cat) => (
                        <ListBoxItem key={cat} id={cat} style={{ color: "var(--color-foreground)", background: "transparent" }}>
                          {cat}
                        </ListBoxItem>
                      ))}
                    </ListBox>
                  </SelectPopover>
              </Select>
            </div>

            {/* Status Select */}
            <div className="flex flex-col gap-1.5">
              <Label>Status <span style={{ color: "var(--color-accent)" }}>*</span></Label>
              <Select
                selectedKey={status}
                onSelectionChange={(key) => key && setStatus(String(key))}
                isDisabled={isProcessing}
              >
                <SelectTrigger className="bg-transparent px-3 py-2 border rounded-md" style={{ background: "var(--color-surface)", color: "var(--color-foreground)", borderColor: "var(--color-offwhite-200)" }}>
                  <SelectValue />
                  <SelectIndicator />
                </SelectTrigger>
                <SelectPopover>
                  <ListBox className="" style={{ background: "var(--color-surface)", color: "var(--color-foreground)" }}>
                    {STATUSES.map((s) => (
                      <ListBoxItem key={s} id={s} style={{ color: "var(--color-foreground)", background: "transparent" }}>
                        {s}
                      </ListBoxItem>
                    ))}
                  </ListBox>
                </SelectPopover>
              </Select>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: "var(--color-foreground)" }}>
            Upload Policy Document (PDF) <span style={{ color: "var(--color-accent)" }}>*</span>
          </label>

          {isProcessing ? (
            <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-xl" style={{ borderColor: "var(--color-primary)", background: "var(--color-surface)" }}>
              <Spinner size="lg" />
              <p className="mt-4 font-semibold" style={{ color: "var(--color-primary)" }}>
                AI is processing the document...
              </p>
              <p className="text-xs mt-2" style={{ color: "var(--color-navy-300)" }}>
                Extracting text, generating summary, and identifying action items.
              </p>
            </div>
          ) : (
            <div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-3">
                <UploadButton
                  endpoint="policyUploader"
                  onClientUploadComplete={async (res) => {
                    if (!title.trim()) {
                      setError("Please provide a title before uploading.");
                      return;
                    }
                    if (res?.length) {
                      const pdfUrl = res[0].url;
                      setUploadedPdfUrl(pdfUrl);
                      setError(null);
                    }
                  }}
                  className="px-4 py-2 rounded-xl bg-[color:var(--color-accent)] text-white font-semibold hover:opacity-95"
                  content={{ button: "Choose PDF" }}
                />
                <p className="text-sm" style={{ color: "var(--color-foreground)" }}>
                  Upload a PDF document, then click Add Policy.
                </p>
              </div>
              <div className="rounded-2xl border border-dashed border-[color:var(--color-offwhite-200)] bg-[color:var(--color-surface)] p-6 text-sm text-[color:var(--color-foreground)]">
                {uploadedPdfUrl ? (
                  <p className="break-all">
                    Uploaded file URL: <span className="font-semibold">{uploadedPdfUrl}</span>
                  </p>
                ) : (
                  <p>Once a PDF is uploaded successfully, the URL will appear here.</p>
                )}
              </div>
              <div className="mt-3 flex items-center justify-between gap-3">
                <p className="text-sm truncate" style={{ color: "var(--color-foreground)" }}>{uploadedPdfUrl ? `Selected file: ${uploadedPdfUrl}` : "No file selected"}</p>
                <button
                  type="button"
                  onClick={async () => {
                    // Submit processing
                    setIsProcessing(true);
                    setError(null);
                    try {
                      if (!uploadedPdfUrl) throw new Error("No PDF uploaded");
                      const result = await processPolicyDocument({ title, category, status, pdfUrl: uploadedPdfUrl });
                      if (result.success) {
                        router.push("/dashboard");
                      } else {
                        setError(result.error ?? "Failed to process document.");
                        setIsProcessing(false);
                      }
                    } catch (err) {
                      setError(err instanceof Error ? err.message : "Failed to process document.");
                      setIsProcessing(false);
                    }
                  }}
                  disabled={!title.trim() || !uploadedPdfUrl || isProcessing}
                  className="px-4 py-2 rounded-xl"
                  style={{ background: !title.trim() || !uploadedPdfUrl || isProcessing ? "var(--color-offwhite-200)" : "var(--color-primary)", color: "white", fontWeight: 600, opacity: (!title.trim() || !uploadedPdfUrl || isProcessing) ? 0.6 : 1 }}
                >
                  Add Policy
                </button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
