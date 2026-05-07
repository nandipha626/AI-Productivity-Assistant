import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { AppShell, PageHeader } from "@/components/AppShell";
import { streamAi } from "@/components/ai";
import ReactMarkdown from "react-markdown";
import { Send, Sparkles, User, Loader2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/chat")({
  component: ChatPage,
  head: () => ({ meta: [{ title: "AI Chat — Lumen" }, { name: "description", content: "Conversational AI for workplace productivity." }] }),
});

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTED = [
  "Help me write a polite follow-up email",
  "Summarize my week's priorities",
  "How do I run a better 1:1?",
  "Draft an OKR for Q3",
];

function ChatPage() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const send = async (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg: Msg = { role: "user", content: text };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setLoading(true);
    let acc = "";
    try {
      await streamAi({
        task: "chat",
        messages: next,
        onDelta: (c) => {
          acc += c;
          setMessages((prev) => {
            const last = prev[prev.length - 1];
            if (last?.role === "assistant") return prev.map((m, i) => i === prev.length - 1 ? { ...m, content: acc } : m);
            return [...prev, { role: "assistant", content: acc }];
          });
        },
      });
    } catch (e) { toast.error(e instanceof Error ? e.message : "Failed"); }
    finally { setLoading(false); }
  };

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto p-6 md:p-10 flex flex-col h-screen md:h-[100dvh]">
        <PageHeader eyebrow="Tool 05" title="AI Workplace Chat" description="Ask anything — drafting, planning, prep, advice." />

        <div className="flex-1 overflow-y-auto rounded-2xl border border-border bg-card p-6 space-y-5 min-h-0">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="size-12 rounded-2xl bg-accent grid place-items-center text-accent-foreground mb-4">
                <Sparkles className="size-6" />
              </div>
              <h3 className="font-display text-xl font-bold mb-1">How can I help?</h3>
              <p className="text-muted-foreground text-sm mb-6">Try one of these to get started.</p>
              <div className="grid sm:grid-cols-2 gap-2 w-full max-w-xl">
                {SUGGESTED.map((s) => (
                  <button key={s} onClick={() => send(s)} className="text-left text-sm px-4 py-3 rounded-xl border border-border hover:bg-muted transition">
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((m, i) => (
              <div key={i} className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                <div className={`shrink-0 size-8 rounded-full grid place-items-center ${m.role === "user" ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground"}`}>
                  {m.role === "user" ? <User className="size-4" /> : <Sparkles className="size-4" />}
                </div>
                <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${m.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"}`}>
                  {m.role === "user" ? m.content : (
                    <div className="prose prose-sm max-w-none prose-p:my-1.5 prose-headings:font-display prose-headings:my-2">
                      {m.content ? <ReactMarkdown>{m.content}</ReactMarkdown> : <Loader2 className="size-4 animate-spin" />}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
          <div ref={endRef} />
        </div>

        <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="mt-4 flex gap-2">
          <input
            value={input} onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything…"
            disabled={loading}
            className="flex-1 rounded-full border border-input bg-card px-5 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <button disabled={loading || !input.trim()} className="size-12 rounded-full bg-primary text-primary-foreground grid place-items-center hover:opacity-90 disabled:opacity-40 transition">
            <Send className="size-4" />
          </button>
        </form>
      </div>
    </AppShell>
  );
}
