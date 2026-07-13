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

const API_URL = "http://localhost:3001";

export default function ChatCard({ persona }: ChatCardProps) {
  const current = personas[persona];
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    setMessages([]);
    setInput("");
    setLoading(false);
  }, [persona]);

  async function handleReset() {
    setMessages([]);
    setInput("");
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
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
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

  return (
    <div className="w-full max-w-4xl overflow-hidden rounded-[32px] border border-zinc-800 bg-[#18181B] shadow-[0_20px_60px_rgba(0,0,0,0.45)]">

      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-800 px-8 py-6">
        <div className="flex items-center gap-4">
          <img src={current.avatar} className="h-14 w-14 rounded-full object-cover bg-zinc-700"/>
          <div>
            <h2 className="text-xl font-semibold text-white">{current.name}</h2>
            <p className="text-sm text-zinc-400">{current.subtitle}</p>
          </div>
        </div>
        <button
          onClick={handleReset}
          className="rounded-xl border border-zinc-700 bg-zinc-800 p-3 text-zinc-300 transition hover:bg-zinc-700"
        >
          <RotateCcw size={18} />
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex h-[600px] flex-col justify-between bg-[#151515]">

        {/* Messages or Empty State */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {messages.length === 0 ? (
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <img src={current.avatar} className="mx-auto mb-6 h-16 w-16 rounded-2xl object-cover bg-zinc-800"/>
                <h2 className="text-2xl font-semibold text-white">
                  Chat with {current.name.split(" ")[0]}
                </h2>
                <p className="mt-3 max-w-md text-zinc-400">{current.welcome}</p>
              </div>
            </div>
          ) : (
            <div className="mx-auto flex max-w-3xl flex-col gap-5">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] whitespace-pre-wrap rounded-2xl px-5 py-3 text-sm leading-relaxed ${
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
                  <div className="rounded-2xl bg-zinc-800 px-5 py-3 text-sm text-zinc-400">
                    Thinking...
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input */}
        <div className="border-t border-zinc-800 p-5">
          <div className="flex items-end gap-3 rounded-2xl border border-zinc-700 bg-zinc-900 p-3">
            <textarea
              ref={textareaRef}
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={current.placeholder}
              disabled={loading}
              className="max-h-40 flex-1 resize-none bg-transparent text-white placeholder:text-zinc-500 focus:outline-none disabled:opacity-50"
            />
            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-black transition hover:bg-zinc-200 disabled:opacity-40"
            >
              <ArrowUp size={20} />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
