import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, PageHeader, AiDisclaimer } from "@/components/AppShell";
import { AiOutput, FieldLabel, streamAi } from "@/components/ai";
import { Sparkles } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/research")({
  component: ResearchPage,
  head: () => ({ meta: [{ title: "Research Assistant — Lumen" }, { name: "description", content: "Distill articles and reports into insights." }] }),
});

function ResearchPage() {
  const [topic, setTopic] = useState("");
  const [content, setContent] = useState("");
  const [out, setOut] = useState("");
  const [loading, setLoading] = useState(false);

  const summarize = async () => {
    if (!topic.trim() && !content.trim()) { toast.error("Add a topic or paste content"); return; }
    setLoading(true); setOut("");
    try {
      const input = content.trim()
        ? `Topic (optional): ${topic || "n/a"}\n\nContent to analyze:\n${content}`
        : `Provide a workplace-friendly briefing on this topic: ${topic}`;
      let acc = "";
      await streamAi({ task: "research", input, onDelta: (c) => { acc += c; setOut(acc); } });
    } catch (e) { toast.error(e instanceof Error ? e.message : "Failed"); }
    finally { setLoading(false); }
  };

  return (
    <AppShell>
      <div className="max-w-6xl mx-auto p-6 md:p-10">
        <PageHeader eyebrow="Tool 04" title="AI Research Assistant" description="Summarize an article or explore a topic. Get TL;DR, key insights, and recommendations." />

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-border bg-card p-6 space-y-5">
            <div>
              <FieldLabel>Topic (optional)</FieldLabel>
              <input value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="e.g. AI in HR onboarding 2025"
                className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm" />
            </div>
            <div>
              <FieldLabel>Paste article / report content</FieldLabel>
              <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={12}
                placeholder="Paste any text — article, report, transcript…"
                className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <button disabled={loading} onClick={summarize} className="w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-5 py-3 rounded-full font-semibold hover:opacity-90 disabled:opacity-50 transition">
              <Sparkles className="size-4" /> {loading ? "Researching…" : "Generate insights"}
            </button>
            <AiDisclaimer />
          </div>
          <AiOutput content={out} loading={loading} />
        </div>
      </div>
    </AppShell>
  );
}
