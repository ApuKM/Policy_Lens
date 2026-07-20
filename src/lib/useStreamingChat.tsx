"use client";

import { useState } from "react";

export function useStreamingChat({ policyId, systemPrompt, policyTitle }: { policyId: string; systemPrompt: string; policyTitle: string; }) {
  const [messages, setMessages] = useState<Array<{ id?: string; role: string; content: string }>>([
    { role: "system", content: systemPrompt },
    {
      id: "welcome",
      role: "assistant",
      content: `Hi! I'm the PolicyLens AI assistant. I've analyzed **"${policyTitle}"** and I'm ready to answer any questions you have about it.\n\nYou can ask me things like:\n- "What are the main goals of this policy?"\n- "Who does this policy affect?"\n- "What are the key deadlines or requirements?"\n- "Summarize the action items for me"`,
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;
    const userMessage = { id: String(Date.now()), role: "user", content: trimmed };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages, policyId }),
      });
      if (!res.ok) throw new Error(await res.text());

      // Stream the response and append to assistant message progressively
      const reader = res.body?.getReader();
      if (!reader) throw new Error("Streaming not supported by the response");
      const decoder = new TextDecoder();
      let done = false;
      let assistantContent = "";

      // Add a placeholder assistant message
      const assistantId = String(Date.now() + 1);
      setMessages((m) => [...m, { id: assistantId, role: "assistant", content: "" }]);

      while (!done) {
        const { value, done: d } = await reader.read();
        done = !!d;
        if (value) {
          assistantContent += decoder.decode(value, { stream: true });
          setMessages((prev) => {
            // replace last assistant placeholder with updated content
            const lastIndex = prev.findIndex((msg) => msg.id === assistantId);
            if (lastIndex === -1) return prev;
            const newPrev = prev.slice(0, lastIndex).concat([{ id: assistantId, role: "assistant", content: assistantContent }]);
            return newPrev;
          });
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"));
    } finally {
      setIsLoading(false);
    }
  };

  return { messages, input, handleInputChange, handleSubmit, isLoading, error };
}
