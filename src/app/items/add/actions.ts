"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import { PDFParse } from "pdf-parse";

const policySchema = z.object({
  summary: z.string().describe("A 3-sentence summary of the policy document."),
  actionItems: z
    .array(z.string())
    .describe("An array of 3-5 key action items or takeaways from the policy."),
});

export async function processPolicyDocument(data: {
  title: string;
  category: string;
  status: string;
  pdfUrl: string;
}) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      throw new Error("Unauthorized");
    }

    const { title, category, status, pdfUrl } = data;

    // 1. Download the PDF
    const response = await fetch(pdfUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch PDF from URL");
    }
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 2. Extract text using pdf-parse
    const parser = new PDFParse({ data: buffer });
    const pdfData = await parser.getText();
    const fullText = pdfData.text;

    if (!fullText || fullText.trim().length === 0) {
      throw new Error("Could not extract text from the PDF. It might be scanned or empty.");
    }

    // 3. Summarize using AI SDK
    const { object: aiResult } = await generateObject({
      model: openai("gpt-4o"),
      schema: policySchema,
      prompt: `Summarize this policy in 3 sentences and provide a JSON array of 3-5 key action items.\n\nPolicy Text:\n${fullText.substring(0, 30000)}`, // Truncate text to avoid token limits if necessary
    });

    // Extract a short description (e.g., first sentence of the summary)
    const shortDescription = aiResult.summary.split(".")[0] + ".";

    // 4. Save to Database
    const policy = await prisma.policy.create({
      data: {
        title,
        category,
        status,
        pdfUrl,
        fullText,
        aiSummary: aiResult.summary,
        aiActionItems: aiResult.actionItems,
        shortDescription,
        authorId: session.user.id,
      },
    });

    return { success: true, policyId: policy.id };
  } catch (error) {
    console.error("Error processing policy document:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to process document" 
    };
  }
}
