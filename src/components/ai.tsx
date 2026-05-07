import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Copy, Check, Loader2 } from "lucide-react";
import { toast } from "sonner";

const FN_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-assist`;

export type AiTask = "email" | "email_rewrite" | "meeting" | "planner" | "research" | "chat";

export async function streamAi(opts: {
  task: AiTask;
  input?: string;
  messages?: { role: string; content: string }[];
  onDelta: (s: string) => void;
}) {
  const resp = await fetch(FN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
    },
    body: JSON.stringify({ task: opts.task, input: opts.input, messages: opts.messages }),
  });
  if (resp.status === 429) throw new Error("Rate limit exceeded. Please wait a moment.");
  if (resp.status === 402) throw new Error("AI credits exhausted. Add credits in Workspace Settings.");
  if (!resp.ok || !resp.body) throw new Error("Failed to reach AI service.");

  const reader = resp.body.getReader();
  const decoder = new TextDecoder();
  let buf = "";
  let done = false;
  while (!done) {
    const { done: d, value } = await reader.read();
    if (d) break;
    buf += decoder.decode(value, { stream: true });
    let i: number;
    while ((i = buf.indexOf("\n")) !== -1) {
      let line = buf.slice(0, i);
      buf = buf.slice(i + 1);
      if (line.endsWith("\r")) line = line.slice(0, -1);
      if (!line.startsWith("data: ")) continue;
      const j = line.slice(6).trim();
      if (j === "[DONE]") { done = true; break; }
      try {
        const p = JSON.parse(j);
        const c = p.choices?.[0]?.delta?.content;
        if (c) opts.onDelta(c);
      } catch {
        buf = line + "\n" + buf;
        break;
      }
    }
  }
}

export function AiOutput({ content, loading }: { content: string; loading: boolean }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopied(false), 1500);
  };

  if (!content && !loading) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-card/50 p-10 text-center text-muted-foreground text-sm">
        Output will appear here.
      </div>
    );
  }

  return (
    <div className="relative rounded-2xl border border-border bg-card shadow-soft overflow-hidden">
      <div className="flex items-center justify-between border-b border-border px-5 py-3 bg-muted/30">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {loading ? "Generating…" : "Output"}
        </span>
        {content && (
          <button
            onClick={copy}
            className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-md hover:bg-muted transition-colors"
          >
            {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
            {copied ? "Copied" : "Copy"}
          </button>
        )}
      </div>
      <div className="p-6 prose prose-sm max-w-none prose-headings:font-display prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-li:text-foreground prose-table:text-foreground prose-th:text-foreground prose-td:text-foreground">
        {content ? <ReactMarkdown>{content}</ReactMarkdown> : (
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <Loader2 className="size-4 animate-spin" /> Thinking…
          </div>
        )}
      </div>
    </div>
  );
}

export function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">{children}</label>;
}
