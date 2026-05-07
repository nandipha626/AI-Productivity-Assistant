// Multi-purpose AI assistant edge function
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const PROMPTS: Record<string, string> = {
  email: `You are a professional workplace communication assistant. Generate a concise, polished email tailored to the user's purpose, audience, and preferred tone. Always return the result as markdown with a "**Subject:**" line first, a blank line, then the email body. Maintain clarity, warmth, and professionalism. Do not invent facts — if details are missing, use neutral placeholders in [brackets].`,
  email_rewrite: `You are an expert editor. Rewrite the user's email to be clearer, more concise, and more professional while preserving intent and tone. Return only the rewritten email in markdown.`,
  meeting: `You are a meeting summarization expert. Read the provided notes/transcript and return clean markdown with these sections in order: ## Summary (3-5 sentences), ## Key Decisions (bullets), ## Action Items (checklist with [ ] checkboxes, owner in **bold**, deadline if any), ## Deadlines (table: Task | Owner | Due), ## Open Questions (bullets, only if any). Be concise and business-like.`,
  planner: `You are a productivity coach. Build a structured daily/weekly schedule from the user's tasks, deadlines, priorities, and working hours. Return markdown with: ## Priority Matrix (Eisenhower-style table: Urgent/Important quadrants), ## Time-Blocked Schedule (table with Time | Task | Focus), ## Productivity Tips (3-5 bullets). Prioritize urgent + high-impact work in deep-focus blocks.`,
  research: `You are a research analyst. Read the provided content/topic and return markdown with: ## TL;DR (2-3 sentences), ## Key Insights (5-7 bullets), ## Recommendations (actionable bullets for workplace decision-making), ## Plain-English Explanation (1 short paragraph for non-experts).`,
  chat: `You are an AI workplace productivity assistant. Help professionals with emails, meetings, planning, research, and general office productivity questions. Be conversational, concise, and practical. Use markdown for structure when helpful. Always remind users to verify AI output before professional use when relevant.`,
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const { task, input, messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const systemPrompt = PROMPTS[task] ?? PROMPTS.chat;
    const userMessages = messages ?? [{ role: "user", content: input ?? "" }];

    const r = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [{ role: "system", content: systemPrompt }, ...userMessages],
        stream: true,
      }),
    });

    if (!r.ok) {
      if (r.status === 429) return new Response(JSON.stringify({ error: "Rate limit exceeded. Please wait and try again." }), { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      if (r.status === 402) return new Response(JSON.stringify({ error: "AI credits exhausted. Add credits in Workspace Settings." }), { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      const t = await r.text();
      console.error("AI gateway error", r.status, t);
      return new Response(JSON.stringify({ error: "AI service error" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    return new Response(r.body, { headers: { ...corsHeaders, "Content-Type": "text/event-stream" } });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
