import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, PageHeader, AiDisclaimer } from "@/components/AppShell";
import { AiOutput, FieldLabel, streamAi } from "@/components/ai";
import { Sparkles, RefreshCw } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/email")({
  component: EmailPage,
  head: () => ({ meta: [{ title: "Email Generator — Lumen" }, { name: "description", content: "Generate and rewrite professional emails with AI." }] }),
});

const TONES = ["Formal", "Friendly", "Persuasive", "Informal"];
const AUDIENCES = ["Client", "Manager", "Team member", "HR department"];

function EmailPage() {
  const [purpose, setPurpose] = useState("");
  const [audience, setAudience] = useState("Manager");
  const [tone, setTone] = useState("Friendly");
  const [points, setPoints] = useState("");
  const [out, setOut] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = async (rewrite = false) => {
    if (!rewrite && !purpose.trim()) { toast.error("Add a purpose first"); return; }
    if (rewrite && !out.trim()) { toast.error("Generate an email first"); return; }
    setLoading(true);
    const previous = out;
    setOut("");
    try {
      const input = rewrite
        ? `Rewrite this email to be clearer and more professional while keeping the tone ${tone.toLowerCase()}:\n\n${previous}`
        : `Purpose: ${purpose}\nAudience: ${audience}\nTone: ${tone}\nKey points:\n${points || "(none provided)"}\n\nWrite a complete professional email with a subject line.`;
      let acc = "";
      await streamAi({
        task: rewrite ? "email_rewrite" : "email",
        input,
        onDelta: (c) => { acc += c; setOut(acc); },
      });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to generate");
      setOut(previous);
    } finally { setLoading(false); }
  };

  return (
    <AppShell>
      <div className="max-w-6xl mx-auto p-6 md:p-10">
        <PageHeader eyebrow="Tool 01" title="Smart Email Generator" description="Describe what you need to say. We'll write it — clearly, in the right tone, for the right audience." />

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-border bg-card p-6 space-y-5">
            <div>
              <FieldLabel>Purpose</FieldLabel>
              <textarea
                value={purpose} onChange={(e) => setPurpose(e.target.value)}
                placeholder="e.g. Ask the design team for feedback on the new onboarding flow by Friday"
                rows={3}
                className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <FieldLabel>Audience</FieldLabel>
                <select value={audience} onChange={(e) => setAudience(e.target.value)} className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm">
                  {AUDIENCES.map((a) => <option key={a}>{a}</option>)}
                </select>
              </div>
              <div>
                <FieldLabel>Tone</FieldLabel>
                <div className="flex flex-wrap gap-1.5">
                  {TONES.map((t) => (
                    <button key={t} onClick={() => setTone(t)} className={`text-xs px-3 py-1.5 rounded-full border transition ${tone === t ? "bg-primary text-primary-foreground border-primary" : "border-border hover:bg-muted"}`}>{t}</button>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <FieldLabel>Key points (optional)</FieldLabel>
              <textarea
                value={points} onChange={(e) => setPoints(e.target.value)}
                placeholder="• Deadline is Friday EOD&#10;• Need feedback on hero copy specifically"
                rows={4}
                className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div className="flex gap-2">
              <button disabled={loading} onClick={() => generate(false)} className="flex-1 inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-5 py-3 rounded-full font-semibold hover:opacity-90 disabled:opacity-50 transition">
                <Sparkles className="size-4" /> {loading ? "Generating…" : "Generate Email"}
              </button>
              <button disabled={loading || !out} onClick={() => generate(true)} className="inline-flex items-center gap-2 bg-card border border-border px-5 py-3 rounded-full font-semibold hover:bg-muted disabled:opacity-50 transition">
                <RefreshCw className="size-4" /> Rewrite
              </button>
            </div>
            <AiDisclaimer />
          </div>

          <div>
            <AiOutput content={out} loading={loading} />
          </div>
        </div>
      </div>
    </AppShell>
  );
}
