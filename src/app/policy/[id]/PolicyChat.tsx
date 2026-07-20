"use client";

import { useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles, Loader2 } from "lucide-react";
import { useStreamingChat } from "@/lib/useStreamingChat";

interface Props {
  policyId: string;
  policyTitle: string;
  aiSummary: string;
  fullText?: string;
}

export function PolicyChat({ policyId, policyTitle, aiSummary, fullText = "" }: Props) {
  const systemPrompt = `You are PolicyLens AI, an expert assistant that helps citizens understand government policy documents and legislation in plain language.\n\nContext (policy): ${policyTitle}\n\nSummary:\n${aiSummary || "(no summary available)"}\n\nFull Text Excerpt:\n${fullText.substring(0, 2000)}`;

  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useStreamingChat({ policyId, systemPrompt, policyTitle });

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="bg-white dark:bg-[#091832] rounded-2xl border border-gray-200 dark:border-[#152f58] shadow-sm overflow-hidden">
      {/* Chat header */}
      <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 dark:border-[#152f58] bg-gradient-to-r from-[#1a3a6b]/5 to-transparent dark:from-[#1a3a6b]/20">
        <div className="p-2 rounded-xl bg-[#1a3a6b] text-white">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <h2 className="font-bold text-gray-900 dark:text-white">AI Policy Assistant</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Context-aware · Powered by GPT-4o mini
          </p>
        </div>
        <div className="ml-auto flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Online
        </div>
      </div>

      {/* Messages */}
      <div className="h-[440px] overflow-y-auto px-6 py-4 flex flex-col gap-4 scroll-smooth">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
          >
            {/* Avatar */}
            <div
              className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                msg.role === "user"
                  ? "bg-[#d4960a]"
                  : "bg-[#1a3a6b]"
              }`}
            >
              {msg.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            {/* Bubble */}
            <div
              className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-[#1a3a6b] text-white rounded-tr-sm"
                  : "bg-gray-100 dark:bg-[#0f2345] text-gray-800 dark:text-gray-200 rounded-tl-sm"
              }`}
            >
              <MessageContent content={msg.content} />
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isLoading && (
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#1a3a6b] flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="bg-gray-100 dark:bg-[#0f2345] rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5">
              <div className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce [animation-delay:0ms]" />
                <span className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce [animation-delay:150ms]" />
                <span className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mx-auto bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 rounded-xl px-4 py-2.5 text-sm">
            ⚠️ {error.message || "Something went wrong. Please try again."}
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="px-6 py-4 border-t border-gray-100 dark:border-[#152f58]">
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-3 bg-gray-50 dark:bg-[#0a1c3a] rounded-xl px-4 py-2 border border-gray-200 dark:border-[#1a3a6b] focus-within:border-[#1a3a6b] focus-within:ring-1 focus-within:ring-[#1a3a6b] transition"
        >
          <input
            ref={inputRef}
            value={input}
            onChange={handleInputChange}
            disabled={isLoading}
            placeholder="Ask anything about this policy..."
            className="flex-1 bg-transparent text-sm text-gray-900 dark:text-white placeholder:text-gray-400 outline-none disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="flex-shrink-0 p-2 rounded-lg bg-[#1a3a6b] hover:bg-[#152f58] disabled:opacity-40 disabled:cursor-not-allowed text-white transition-colors"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </button>
        </form>
        <p className="text-center text-[11px] text-gray-400 dark:text-gray-600 mt-2">
          AI responses are generated and may not be fully accurate. Always refer to the original document.
        </p>
      </div>
    </div>
  );
}

// Streaming chat logic moved to `useStreamingChat` in `src/lib/useStreamingChat.tsx`

// Simple markdown-to-HTML renderer for chat messages
function MessageContent({ content }: { content: string }) {
  // Split on bold markers and newlines for basic formatting
  const lines = content.split("\n");
  return (
    <div className="space-y-1.5">
      {lines.map((line, i) => {
        if (!line.trim()) return <br key={i} />;
        // Bold: **text**
        const parts = line.split(/\*\*(.*?)\*\*/g);
        return (
          <p key={i}>
            {parts.map((part, j) =>
              j % 2 === 1 ? (
                <strong key={j}>{part}</strong>
              ) : (
                <span key={j}>{part}</span>
              )
            )}
          </p>
        );
      })}
    </div>
  );
}
