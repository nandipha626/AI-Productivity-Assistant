import { Link, useLocation } from "@tanstack/react-router";
import { Sparkles, Mail, FileText, Calendar, Search, MessageSquare, LayoutDashboard, Shield } from "lucide-react";
import { ReactNode } from "react";

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/email", label: "Email", icon: Mail },
  { to: "/meeting", label: "Meetings", icon: FileText },
  { to: "/planner", label: "Planner", icon: Calendar },
  { to: "/research", label: "Research", icon: Search },
  { to: "/chat", label: "Chat", icon: MessageSquare },
  { to: "/about", label: "Responsible AI", icon: Shield },
];

export function AppShell({ children }: { children: ReactNode }) {
  const loc = useLocation();
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background">
      <aside className="md:w-64 md:min-h-screen border-b md:border-b-0 md:border-r border-border bg-sidebar text-sidebar-foreground">
        <div className="p-6">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="size-9 rounded-xl bg-accent grid place-items-center text-accent-foreground shadow-glow">
              <Sparkles className="size-5" strokeWidth={2.5} />
            </div>
            <span className="font-display text-lg font-bold tracking-tight">Lumen<span className="text-accent">.</span></span>
          </Link>
        </div>
        <nav className="px-3 pb-6 flex md:flex-col gap-1 overflow-x-auto">
          {nav.map((n) => {
            const active = loc.pathname === n.to;
            return (
              <Link
                key={n.to}
                to={n.to}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                  active
                    ? "bg-sidebar-accent text-sidebar-primary"
                    : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
                }`}
              >
                <n.icon className="size-4" />
                {n.label}
              </Link>
            );
          })}
        </nav>
      </aside>
      <main className="flex-1 min-w-0">{children}</main>
    </div>
  );
}

export function PageHeader({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <header className="mb-8">
      <div className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-muted-foreground mb-3">
        <span className="size-1.5 rounded-full bg-accent" /> {eyebrow}
      </div>
      <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">{title}</h1>
      <p className="text-muted-foreground max-w-2xl">{description}</p>
    </header>
  );
}

export function AiDisclaimer() {
  return (
    <div className="mt-6 flex gap-2 items-start text-xs text-muted-foreground border-l-2 border-accent pl-3">
      <Shield className="size-3.5 mt-0.5 shrink-0" />
      <span>AI-generated content should be reviewed for accuracy before professional use.</span>
    </div>
  );
}
