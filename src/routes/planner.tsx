import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, PageHeader, AiDisclaimer } from "@/components/AppShell";
import { AiOutput, FieldLabel, streamAi } from "@/components/ai";
import { Sparkles } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/planner")({
  component: PlannerPage,
  head: () => ({ meta: [{ title: "Task Planner — Lumen" }, { name: "description", content: "AI-prioritized daily and weekly schedules." }] }),
});

function PlannerPage() {
  const [tasks, setTasks] = useState("");
  const [hours, setHours] = useState("9am - 6pm");
  const [scope, setScope] = useState<"day" | "week">("day");
  const [out, setOut] = useState("");
  const [loading, setLoading] = useState(false);

  const plan = async () => {
    if (!tasks.trim()) { toast.error("List your tasks first"); return; }
    setLoading(true); setOut("");
    try {
      const input = `Build a ${scope === "day" ? "daily" : "weekly"} schedule.\nWorking hours: ${hours}\n\nTasks (with priority/deadline if noted):\n${tasks}`;
      let acc = "";
      await streamAi({ task: "planner", input, onDelta: (c) => { acc += c; setOut(acc); } });
    } catch (e) { toast.error(e instanceof Error ? e.message : "Failed"); }
    finally { setLoading(false); }
  };

  return (
    <AppShell>
      <div className="max-w-6xl mx-auto p-6 md:p-10">
        <PageHeader eyebrow="Tool 03" title="AI Task Planner" description="Drop in your tasks. Get a prioritized schedule with focus blocks and a priority matrix." />

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-border bg-card p-6 space-y-5">
            <div>
              <FieldLabel>Tasks</FieldLabel>
              <textarea
                value={tasks} onChange={(e) => setTasks(e.target.value)}
                placeholder={"Finish Q3 roadmap deck — high, due Wed\nReview design PRs — medium\nLunch with Maria — 1pm\n1:1 with Alex — 3pm\nReply to investor email — high"}
                rows={10}
                className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <FieldLabel>Working hours</FieldLabel>
                <input value={hours} onChange={(e) => setHours(e.target.value)} className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm" />
              </div>
              <div>
                <FieldLabel>Scope</FieldLabel>
                <div className="flex gap-2">
                  {(["day", "week"] as const).map((s) => (
                    <button key={s} onClick={() => setScope(s)} className={`flex-1 text-sm px-3 py-2.5 rounded-lg border transition capitalize ${scope === s ? "bg-primary text-primary-foreground border-primary" : "border-border hover:bg-muted"}`}>{s}</button>
                  ))}
                </div>
              </div>
            </div>
            <button disabled={loading} onClick={plan} className="w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-5 py-3 rounded-full font-semibold hover:opacity-90 disabled:opacity-50 transition">
              <Sparkles className="size-4" /> {loading ? "Planning…" : "Build my schedule"}
            </button>
            <AiDisclaimer />
          </div>
          <AiOutput content={out} loading={loading} />
        </div>
      </div>
    </AppShell>
  );
}
