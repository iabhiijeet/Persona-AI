import { useState, useRef, useEffect } from "react";
import { ArrowUp, RotateCcw } from "lucide-react";
import { type Persona, personas } from "../data/personas";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type ChatCardProps = {
  persona: Persona;
};

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

export default function ChatCard({ persona }: ChatCardProps) {
  const current = personas[persona];
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [remaining, setRemaining] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleReset() {
    setMessages([]);
    setInput("");
    setRemaining(null);
    await fetch(`${API_URL}/api/reset`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ persona }),
    });
  }

  async function handleSend() {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ persona, message: text }),
      });
      const data = await res.json();

      if (res.status === 429) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.error || "Daily limit reached. Try again tomorrow." },
        ]);
        setRemaining(0);
      } else if (res.ok) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.reply || "No response received." },
        ]);
        if (data.remaining !== undefined) setRemaining(data.remaining);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.error || "Something went wrong. Please try again." },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
      textareaRef.current?.focus();
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  const limitReached = remaining !== null && remaining <= 0;

  return (
    <div className="w-full max-w-4xl overflow-hidden rounded-2xl border border-zinc-800 bg-[#18181B] shadow-[0_20px_60px_rgba(0,0,0,0.45)] sm:rounded-[32px]">

      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-4 sm:px-8 sm:py-6">
        <div className="flex items-center gap-3 sm:gap-4">
          <img src={current.avatar} className="h-10 w-10 rounded-full object-cover bg-zinc-700 sm:h-14 sm:w-14"/>
          <div>
            <h2 className="text-base font-semibold text-white sm:text-xl">{current.name}</h2>
            <p className="text-xs text-zinc-400 sm:text-sm">{current.subtitle}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          {remaining !== null && (
            <span className={`text-xs sm:text-sm ${limitReached ? "text-red-400" : "text-zinc-400"}`}>
              {remaining}/10
            </span>
          )}
          <button
            onClick={handleReset}
            className="rounded-lg border border-zinc-700 bg-zinc-800 p-2 text-zinc-300 transition hover:bg-zinc-700 sm:rounded-xl sm:p-3"
          >
            <RotateCcw size={16} className="sm:hidden" />
            <RotateCcw size={18} className="hidden sm:block" />
          </button>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex h-[calc(100dvh-180px)] flex-col justify-between bg-[#151515] sm:h-[600px]">

        {/* Messages or Empty State */}
        <div className="flex-1 overflow-y-auto px-4 py-4 sm:px-6 sm:py-6">
          {messages.length === 0 ? (
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <img src={current.avatar} className="mx-auto mb-4 h-12 w-12 rounded-2xl object-cover bg-zinc-800 sm:mb-6 sm:h-16 sm:w-16"/>
                <h2 className="text-lg font-semibold text-white sm:text-2xl">
                  Chat with {current.name.split(" ")[0]}
                </h2>
                <p className="mt-2 max-w-md text-sm text-zinc-400 sm:mt-3">{current.welcome}</p>
              </div>
            </div>
          ) : (
            <div className="mx-auto flex max-w-3xl flex-col gap-3 sm:gap-5">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] whitespace-pre-wrap rounded-xl px-4 py-2.5 text-sm leading-relaxed sm:max-w-[80%] sm:rounded-2xl sm:px-5 sm:py-3 ${
                      msg.role === "user"
                        ? "bg-white text-black"
                        : "bg-zinc-800 text-zinc-100"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="rounded-xl bg-zinc-800 px-4 py-2.5 text-sm text-zinc-400 sm:rounded-2xl sm:px-5 sm:py-3">
                    Thinking...
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input */}
        <div className="border-t border-zinc-800 p-3 sm:p-5">
          {limitReached && (
            <div className="mb-2 rounded-lg border border-red-900 bg-red-950 px-3 py-2 text-center text-xs text-red-300 sm:mb-3 sm:rounded-xl sm:px-4 sm:py-3 sm:text-sm">
              Daily limit reached. Come back tomorrow.
            </div>
          )}
          <div className="flex items-end gap-2 rounded-xl border border-zinc-700 bg-zinc-900 p-2 sm:gap-3 sm:rounded-2xl sm:p-3">
            <textarea
              ref={textareaRef}
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={limitReached ? "Limit reached" : current.placeholder}
              disabled={loading || limitReached}
              className="max-h-40 flex-1 resize-none bg-transparent text-sm text-white placeholder:text-zinc-500 focus:outline-none disabled:opacity-50 sm:text-base"
            />
            <button
              onClick={handleSend}
              disabled={loading || !input.trim() || limitReached}
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-black transition hover:bg-zinc-200 disabled:opacity-40 sm:h-11 sm:w-11 sm:rounded-xl"
            >
              <ArrowUp size={18} className="sm:hidden" />
              <ArrowUp size={20} className="hidden sm:block" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
