import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/AppShell";
import { Shield, Eye, Users, AlertTriangle, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({ meta: [{ title: "Responsible AI — Lumen" }, { name: "description", content: "How Lumen approaches ethical, transparent AI." }] }),
});

const principles = [
  { icon: Eye, title: "Transparent by default", body: "Every output carries a reminder to verify before professional use. We never hide that you're working with AI." },
  { icon: Users, title: "Human-in-the-loop", body: "AI drafts; people decide. We design tools that assist judgment, not replace it." },
  { icon: AlertTriangle, title: "Refuse harm", body: "The assistant declines requests that could be biased, harassing, deceptive, or unsafe." },
  { icon: CheckCircle2, title: "Privacy-respecting", body: "Inputs are sent only to the AI provider needed to generate the response. We don't sell or train on your content." },
];

function AboutPage() {
  return (
    <AppShell>
      <div className="max-w-4xl mx-auto p-6 md:p-10">
        <PageHeader eyebrow="Ethics" title="Responsible AI" description="Lumen is built around a simple idea: AI should give professionals more time and better judgment — not replace it." />

        <div className="rounded-2xl bg-ink text-primary-foreground p-8 mb-8 relative overflow-hidden">
          <Shield className="absolute -right-6 -bottom-6 size-40 text-accent/20" />
          <p className="font-display text-2xl md:text-3xl leading-tight max-w-2xl">
            "AI-generated content should be reviewed for accuracy before professional use."
          </p>
          <p className="mt-3 text-sm text-primary-foreground/60">— The disclaimer on every Lumen output</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-10">
          {principles.map((p) => (
            <div key={p.title} className="rounded-2xl border border-border bg-card p-6">
              <div className="size-10 rounded-xl bg-accent grid place-items-center mb-4">
                <p.icon className="size-5 text-accent-foreground" />
              </div>
              <h3 className="font-display text-lg font-bold mb-2">{p.title}</h3>
              <p className="text-sm text-muted-foreground">{p.body}</p>
            </div>
          ))}
        </div>

        <section className="rounded-2xl border border-border bg-card p-6">
          <h3 className="font-display text-xl font-bold mb-3">Before you send</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex gap-2"><CheckCircle2 className="size-4 mt-0.5 text-accent-foreground bg-accent rounded-full p-0.5 shrink-0" /> Verify names, numbers, dates, and any factual claims.</li>
            <li className="flex gap-2"><CheckCircle2 className="size-4 mt-0.5 text-accent-foreground bg-accent rounded-full p-0.5 shrink-0" /> Read for tone — does it sound like you?</li>
            <li className="flex gap-2"><CheckCircle2 className="size-4 mt-0.5 text-accent-foreground bg-accent rounded-full p-0.5 shrink-0" /> Consider whether anything is sensitive or confidential.</li>
            <li className="flex gap-2"><CheckCircle2 className="size-4 mt-0.5 text-accent-foreground bg-accent rounded-full p-0.5 shrink-0" /> When in doubt, ask a colleague to review.</li>
          </ul>
        </section>
      </div>
    </AppShell>
  );
}
