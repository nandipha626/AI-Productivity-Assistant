import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles, Mail, FileText, Calendar, Search, MessageSquare, ArrowRight, Zap, Clock, Shield } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Landing,
  head: () => ({
    meta: [
      { title: "Lumen — AI Workplace Productivity Assistant" },
      { name: "description", content: "Boost workplace productivity with AI: automate emails, summarize meetings, plan tasks, and research faster." },
    ],
  }),
});

const features = [
  { icon: Mail, title: "Smart Email", desc: "Draft, rewrite & polish emails in any tone.", to: "/email" },
  { icon: FileText, title: "Meeting Summaries", desc: "Turn long notes into action items in seconds.", to: "/meeting" },
  { icon: Calendar, title: "Task Planner", desc: "AI-prioritized daily and weekly schedules.", to: "/planner" },
  { icon: Search, title: "Research", desc: "Distill articles into insights you can act on.", to: "/research" },
  { icon: MessageSquare, title: "AI Chat", desc: "A productivity copilot for any workplace question.", to: "/chat" },
  { icon: Shield, title: "Responsible AI", desc: "Transparent, reviewable, human-first by default.", to: "/about" },
];

const stats = [
  { v: "8h+", l: "saved per week" },
  { v: "5x", l: "faster drafts" },
  { v: "92%", l: "less context-switching" },
];

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <nav className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="size-9 rounded-xl bg-primary grid place-items-center text-primary-foreground">
            <Sparkles className="size-5" strokeWidth={2.5} />
          </div>
          <span className="font-display text-xl font-bold">Lumen<span className="text-accent">.</span></span>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <a href="#features" className="text-muted-foreground hover:text-foreground">Features</a>
          <a href="#testimonials" className="text-muted-foreground hover:text-foreground">Testimonials</a>
          <Link to="/about" className="text-muted-foreground hover:text-foreground">Responsible AI</Link>
        </div>
        <Link to="/dashboard" className="inline-flex items-center gap-1.5 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold hover:opacity-90 transition">
          Open app <ArrowRight className="size-4" />
        </Link>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-hero pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-24 md:pt-24 md:pb-32 grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 backdrop-blur px-3 py-1 text-xs font-medium text-muted-foreground mb-6">
              <span className="size-1.5 rounded-full bg-accent animate-pulse" />
              AI workplace assistant — built for real work
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tighter leading-[0.95] text-foreground">
              Boost workplace<br />productivity with<br />
              <span className="relative inline-block">
                <span className="relative z-10">AI automation</span>
                <span className="absolute -bottom-1 left-0 right-0 h-3 bg-accent -z-0 -rotate-1" />
              </span>.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl">
              Automate emails, summarize meetings, plan tasks and conduct research faster — using AI tools designed for modern professionals.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/dashboard" className="group inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3.5 rounded-full font-semibold shadow-soft hover:shadow-glow transition-all">
                Launch dashboard <ArrowRight className="size-4 group-hover:translate-x-0.5 transition" />
              </Link>
              <Link to="/email" className="inline-flex items-center gap-2 bg-card border border-border px-6 py-3.5 rounded-full font-semibold hover:bg-muted transition">
                Try Email Generator
              </Link>
            </div>

            <dl className="mt-12 grid grid-cols-3 gap-6 max-w-md">
              {stats.map((s) => (
                <div key={s.l}>
                  <dt className="font-display text-3xl md:text-4xl font-bold">{s.v}</dt>
                  <dd className="text-xs text-muted-foreground mt-1">{s.l}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="md:col-span-5">
            <div className="relative">
              <div className="absolute -inset-4 bg-accent/30 rounded-3xl blur-2xl" />
              <div className="relative rounded-3xl border border-border bg-card shadow-soft p-6 rotate-1">
                <div className="flex items-center gap-2 mb-4">
                  <div className="size-2.5 rounded-full bg-destructive/60" />
                  <div className="size-2.5 rounded-full bg-accent" />
                  <div className="size-2.5 rounded-full bg-muted-foreground/30" />
                  <span className="ml-2 text-xs text-muted-foreground font-mono">lumen / email</span>
                </div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Subject</div>
                <div className="font-semibold mb-4">Q3 roadmap review — quick async input needed</div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Body</div>
                <div className="text-sm text-foreground/80 leading-relaxed space-y-2">
                  <p>Hi team,</p>
                  <p>Ahead of Friday's sync, could you each drop a 2-line update on your workstream by EOD Thursday?</p>
                  <p>Appreciate it — <span className="bg-accent/40 rounded px-1">Alex</span></p>
                </div>
                <div className="mt-5 flex gap-2">
                  <span className="text-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground">Friendly tone</span>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-accent/30">Generated in 1.2s</span>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 rounded-2xl border border-border bg-card shadow-soft p-4 -rotate-3 max-w-[200px] hidden md:block">
                <div className="flex items-center gap-2 mb-2"><Zap className="size-4 text-accent-foreground bg-accent rounded p-0.5" /><span className="text-xs font-semibold">Action item</span></div>
                <p className="text-xs text-muted-foreground">Send roadmap update — Due Thu 5pm</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">What's inside</div>
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">Six tools.<br />One quiet copilot.</h2>
          </div>
          <Clock className="size-12 text-muted-foreground/30 hidden md:block" />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <Link key={f.to} to={f.to} className="group relative rounded-2xl border border-border bg-card p-6 hover:shadow-soft hover:-translate-y-1 transition-all overflow-hidden">
              <div className="absolute top-0 right-0 text-[120px] font-display font-bold text-muted/30 leading-none -mt-4 -mr-2 select-none">{i + 1}</div>
              <f.icon className="size-7 mb-4 text-foreground" strokeWidth={2} />
              <h3 className="font-display text-xl font-bold mb-1.5">{f.title}</h3>
              <p className="text-sm text-muted-foreground mb-6">{f.desc}</p>
              <div className="inline-flex items-center gap-1 text-sm font-semibold">
                Open <ArrowRight className="size-3.5 group-hover:translate-x-1 transition" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">From the floor</div>
        <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-12">Loved by people who hate busywork.</h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { q: "I cut my email triage in half. The tone presets just work.", a: "Priya N.", r: "Operations Lead" },
            { q: "Meeting summaries finally include real action items. Game changer.", a: "Marcus T.", r: "Engineering Manager" },
            { q: "The planner stopped me from over-committing. Genuinely useful AI.", a: "Sara K.", r: "Founder, Studio" },
          ].map((t) => (
            <figure key={t.a} className="rounded-2xl bg-card border border-border p-6">
              <blockquote className="font-display text-lg leading-snug">"{t.q}"</blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <div className="size-9 rounded-full bg-accent grid place-items-center text-sm font-bold text-accent-foreground">{t.a[0]}</div>
                <div>
                  <div className="text-sm font-semibold">{t.a}</div>
                  <div className="text-xs text-muted-foreground">{t.r}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="rounded-3xl bg-ink text-primary-foreground p-10 md:p-16 relative overflow-hidden">
          <div className="absolute -right-20 -top-20 size-72 bg-accent/40 rounded-full blur-3xl" />
          <div className="relative max-w-2xl">
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">Get hours back, every week.</h2>
            <p className="mt-4 text-primary-foreground/70 text-lg">Open the dashboard and try every tool — no setup needed.</p>
            <Link to="/dashboard" className="mt-8 inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3.5 rounded-full font-semibold hover:scale-[1.02] transition">
              Open Lumen <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Sparkles className="size-4" />
            <span>Lumen — AI workplace productivity</span>
          </div>
          <div className="flex gap-6">
            <Link to="/about">Responsible AI</Link>
            <Link to="/dashboard">App</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
