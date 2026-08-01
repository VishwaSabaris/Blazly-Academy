"use client";
import { useState } from "react";
import { Send, Bot, Sparkles } from "lucide-react";

export const AI_ASSISTANT_SYSTEM_PROMPT = `
You are Blazly AI, the course assistant for Blazly Academy.
You help students understand the current lesson material.
Always keep your answers concise, practical, and tied directly to Generative Engine Optimization (GEO).
Maintain a professional but encouraging tone.
If they ask something unrelated, politely steer them back to the lesson topic.
`;

export function AIAssistant({ currentLessonTitle }: { currentLessonTitle: string }) {
  const [messages, setMessages] = useState<{ role: "user" | "ai"; text: string }[]>([
    { role: "ai", text: `Hi! I'm your AI Assistant. I see you're currently studying "${currentLessonTitle}". How can I help you with this topic?` }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: `That's a great question about ${currentLessonTitle}. When optimizing for AI search engines, the key is structured data and semantic clarity. Try implementing lists and tables for better extraction!`,
        },
      ]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-[400px] border border-line rounded-xl bg-paper overflow-hidden">
      <div className="p-4 border-b border-line bg-paper-raised flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald to-emerald-deep flex items-center justify-center text-white">
          <Sparkles size={16} />
        </div>
        <div>
          <h4 className="font-bold text-sm text-ink">AI Course Assistant</h4>
          <p className="text-xs text-muted">Context: {currentLessonTitle}</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-3 max-w-[85%] ${msg.role === "user" ? "self-end flex-row-reverse" : "self-start"}`}>
            <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${msg.role === "user" ? "bg-ink text-paper" : "bg-emerald/10 text-emerald-deep"}`}>
              {msg.role === "user" ? <span className="text-xs font-bold">U</span> : <Bot size={14} />}
            </div>
            <div className={`p-3 rounded-2xl text-[14.5px] leading-relaxed ${msg.role === "user" ? "bg-ink text-paper rounded-tr-none" : "bg-paper-raised border border-line text-ink-soft rounded-tl-none"}`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex gap-3 max-w-[85%] self-start">
            <div className="w-7 h-7 rounded-full bg-emerald/10 text-emerald-deep flex items-center justify-center shrink-0">
              <Bot size={14} />
            </div>
            <div className="p-3 rounded-2xl bg-paper-raised border border-line rounded-tl-none flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="w-1.5 h-1.5 rounded-full bg-emerald animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="w-1.5 h-1.5 rounded-full bg-emerald animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-line bg-paper">
        <form onSubmit={handleSend} className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question about this lesson..."
            className="w-full bg-paper-raised border border-line rounded-full py-2.5 pl-4 pr-12 text-sm outline-none focus:border-emerald transition-colors"
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="absolute right-1.5 top-1.5 w-8 h-8 rounded-full bg-emerald text-white flex items-center justify-center hover:bg-emerald-deep disabled:opacity-50 transition-colors"
          >
            <Send size={14} className="ml-[-1px]" />
          </button>
        </form>
      </div>
    </div>
  );
}
