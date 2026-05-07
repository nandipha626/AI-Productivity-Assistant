import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, PageHeader, AiDisclaimer } from "@/components/AppShell";
import { AiOutput, FieldLabel, streamAi } from "@/components/ai";
import { Sparkles } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/meeting")({
  component: MeetingPage,
  head: () => ({ meta: [{ title: "Meeting Summarizer — Lumen" }, { name: "description", content: "Turn meeting notes into action items." }] }),
});

const SAMPLE = `Standup Tuesday — Product team
Alex: shipped onboarding v2, conversion up 6%. Needs review of empty states by Thu.
Priya: blocked on API throttling. Will sync with infra. Decision: temporarily cap requests at 100/min.
Marcus: design system audit done. Action item: post Figma library link in #design by EOD.
Discussed Q3 OKR draft — Sara to circulate by Friday for sign-off Monday.`;

function MeetingPage() {
  const [notes, setNotes] = useState("");
  const [out, setOut] = useState("");
  const [loading, setLoading] = useState(false);

  const summarize = async () => {
    if (!notes.trim()) { toast.error("Paste meeting notes first"); return; }
    setLoading(true); setOut("");
    try {
      let acc = "";
      await streamAi({ task: "meeting", input: notes, onDelta: (c) => { acc += c; setOut(acc); } });
    } catch (e) { toast.error(e instanceof Error ? e.message : "Failed"); }
    finally { setLoading(false); }
  };

  return (
    <AppShell>
      <div className="max-w-6xl mx-auto p-6 md:p-10">
        <PageHeader eyebrow="Tool 02" title="Meeting Notes Summarizer" description="Paste raw notes or a transcript. Get a clean summary, decisions, action items, and deadlines." />

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <FieldLabel>Meeting notes / transcript</FieldLabel>
                <button onClick={() => setNotes(SAMPLE)} className="text-xs text-muted-foreground hover:text-foreground underline-offset-2 hover:underline">Load sample</button>
              </div>
              <textarea
                value={notes} onChange={(e) => setNotes(e.target.value)}
                placeholder="Paste your meeting notes here…"
                rows={16}
                className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <button disabled={loading} onClick={summarize} className="w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-5 py-3 rounded-full font-semibold hover:opacity-90 disabled:opacity-50 transition">
              <Sparkles className="size-4" /> {loading ? "Summarizing…" : "Summarize Meeting"}
            </button>
            <AiDisclaimer />
          </div>
          <AiOutput content={out} loading={loading} />
        </div>
      </div>
    </AppShell>
  );
}
