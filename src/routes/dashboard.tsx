import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/AppShell";
import { Mail, FileText, Calendar, Search, MessageSquare, TrendingUp, Clock, CheckCircle2, ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
  head: () => ({ meta: [{ title: "Dashboard — Lumen" }, { name: "description", content: "Your AI productivity command center." }] }),
});

const tools = [
  { to: "/email", icon: Mail, title: "Email Generator", desc: "Draft, rewrite, polish." },
  { to: "/meeting", icon: FileText, title: "Meeting Summarizer", desc: "Notes → action items." },
  { to: "/planner", icon: Calendar, title: "Task Planner", desc: "AI daily schedule." },
  { to: "/research", icon: Search, title: "Research Assistant", desc: "Insights from any text." },
  { to: "/chat", icon: MessageSquare, title: "AI Chat", desc: "Always-on copilot." },
];

const stats = [
  { icon: Clock, label: "Time saved this week", value: "6.4h", trend: "+12%" },
  { icon: CheckCircle2, label: "Tasks completed", value: "47", trend: "+8" },
  { icon: TrendingUp, label: "Productivity score", value: "82", trend: "+5pt" },
];

function Dashboard() {
  return (
    <AppShell>
      <div className="max-w-6xl mx-auto p-6 md:p-10">
        <PageHeader eyebrow="Workspace" title="Good day. Let's get to work." description="Quick access to every AI tool, plus a snapshot of your week." />

        <div className="grid md:grid-cols-3 gap-4 mb-10">
          {stats.map((s) => (
            <div key={s.label} className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center justify-between mb-4">
                <s.icon className="size-5 text-muted-foreground" />
                <span className="text-xs font-semibold text-accent-foreground bg-accent px-2 py-0.5 rounded-full">{s.trend}</span>
              </div>
              <div className="font-display text-3xl font-bold">{s.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        <h2 className="font-display text-2xl font-bold mb-4">AI tools</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {tools.map((t) => (
            <Link key={t.to} to={t.to} className="group rounded-2xl border border-border bg-card p-5 hover:shadow-soft hover:-translate-y-0.5 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="size-10 rounded-xl bg-secondary grid place-items-center"><t.icon className="size-5" /></div>
                <ArrowUpRight className="size-4 text-muted-foreground group-hover:text-foreground transition" />
              </div>
              <div className="font-semibold">{t.title}</div>
              <div className="text-sm text-muted-foreground">{t.desc}</div>
            </Link>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="font-display text-lg font-bold mb-4">Recent activity</h3>
            <ul className="space-y-3 text-sm">
              {[
                ["Drafted email", "Q3 roadmap review", "2m ago"],
                ["Summarized meeting", "Design critique", "1h ago"],
                ["Planned day", "Tuesday schedule", "3h ago"],
                ["Researched", "Pricing benchmarks", "Yesterday"],
              ].map(([a, b, c]) => (
                <li key={b} className="flex justify-between items-center py-2 border-b border-border last:border-0">
                  <div>
                    <div className="font-medium">{a}</div>
                    <div className="text-muted-foreground text-xs">{b}</div>
                  </div>
                  <span className="text-xs text-muted-foreground">{c}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl bg-ink text-primary-foreground p-6 relative overflow-hidden">
            <div className="absolute -right-10 -top-10 size-40 bg-accent/40 rounded-full blur-3xl" />
            <div className="relative">
              <div className="text-xs uppercase tracking-widest text-primary-foreground/60 mb-2">Tip of the day</div>
              <h3 className="font-display text-xl font-bold mb-2">Time-block deep work before noon.</h3>
              <p className="text-sm text-primary-foreground/70 mb-4">Use the Planner to lock in 90-minute focus windows on your top priority — your future self will thank you.</p>
              <Link to="/planner" className="inline-flex items-center gap-1.5 bg-accent text-accent-foreground px-4 py-2 rounded-full text-sm font-semibold">
                Plan my day <ArrowUpRight className="size-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
