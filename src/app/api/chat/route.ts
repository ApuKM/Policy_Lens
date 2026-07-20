import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const { messages, policyId } = await req.json();

  if (!policyId) {
    return new Response("Policy ID is required", { status: 400 });
  }

  const policy = await prisma.policy.findUnique({
    where: { id: policyId },
    select: { aiSummary: true, fullText: true, title: true, category: true },
  });

  if (!policy) {
    return new Response("Policy not found", { status: 404 });
  }

  const result = streamText({
    model: openai("gpt-4o-mini"),
    system: `You are PolicyLens AI, an expert assistant that helps citizens understand government policy documents and legislation in plain language.

You are analyzing this specific policy:

**Title:** ${policy.title}
**Category:** ${policy.category}

**Summary:**
${policy.aiSummary}

**Full Policy Text:**
${policy.fullText.substring(0, 20000)}

Guidelines:
- Answer questions clearly and concisely based on this policy only
- Use plain, accessible language that non-experts can understand
- Reference specific sections of the policy when relevant
- If something isn't covered in this policy, say so clearly
- Use markdown formatting (bullets, bold) when it helps clarity
- Be objective and factual`,
    messages,
  });

  return result.toTextStreamResponse();
}
