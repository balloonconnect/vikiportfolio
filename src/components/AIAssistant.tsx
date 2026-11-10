"use client";
import { useEffect, useRef, useState } from "react";
import { MessageSquare, Send, X } from "lucide-react";
import { site } from "@/data/site";
import { projects } from "@/data/projects";
import { experience, awards } from "@/data/experience";

type Msg = { from: "user" | "ai"; text: string };

// Local, data-driven answers. Swap `answer` for a fetch to /api/ask backed by an LLM when ready.
function answer(q: string): string {
  const s = q.toLowerCase();
  const proj = projects.find((p) => s.includes(p.name.toLowerCase()) || s.includes(p.slug.replace(/-/g, " ")));
  if (proj) return `${proj.name} (${proj.years}): ${proj.description} Role: ${proj.role}. Scope: ${proj.scope}.`;
  if (/(project|work|case)/.test(s)) return `Featured projects: ${projects.map((p) => p.name).join(", ")}. Ask about any of them for details.`;
  if (/(experience|worked|career|job|company|indegene)/.test(s)) return experience.map((e) => `${e.role} at ${e.company} (${e.years})`).join("; ") + ".";
  if (/(skill|tool|good at|figma)/.test(s)) return `Skills: ${site.skills.join(", ")}.`;
  if (/(award|achievement)/.test(s)) return awards.length ? awards.map((a) => a.title).join("; ") : "No awards listed yet.";
  if (/(contact|email|hire|reach|resume)/.test(s)) return `Email ${site.email}. Resume: ${site.resumeUrl}.`;
  if (/(who|about|intro|yourself)/.test(s)) return site.intro;
  if (/(where|location|based)/.test(s)) return `Based in ${site.location}.`;
  return "I can answer questions about projects, experience, skills, awards and how to get in touch. Try one of the suggestions.";
}

const suggestions = ["What do you do?", "Tell me about your projects", "What's your experience?", "How can I contact you?"];

export function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([{ from: "ai", text: `Hi, I answer questions about ${site.name}'s work and background.` }]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const end = useRef<HTMLDivElement>(null);

  useEffect(() => { const f = () => setOpen(true); window.addEventListener("open-ai", f); return () => window.removeEventListener("open-ai", f); }, []);
  useEffect(() => { end.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, open]);
  useEffect(() => { const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false); window.addEventListener("keydown", k); return () => window.removeEventListener("keydown", k); }, []);

  const send = (text: string) => {
    const t = text.trim(); if (!t) return;
    setMsgs((m) => [...m, { from: "user", text: t }]);
    setInput(""); setThinking(true);
    window.setTimeout(() => { setMsgs((m) => [...m, { from: "ai", text: answer(t) }]); setThinking(false); }, 700);
  };

  return (
    <>
      <button onClick={() => setOpen(true)} aria-label="Ask AI" className="fixed bottom-6 right-6 z-[90] flex size-14 items-center justify-center rounded-2xl border border-border bg-surface shadow-[0_10px_50px_#00000024] lg:hidden"><MessageSquare /></button>
      <aside aria-hidden={!open} inert={!open} className={`fixed inset-y-0 right-0 z-[2000] flex w-[424px] max-w-full flex-col border-l border-secondary bg-surface shadow-[0_10px_50px_#00000024] transition-transform duration-[420ms] ease-out ${open ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex h-[72px] items-center justify-between border-b border-secondary px-5">
          <h2 className="text-[17px] font-semibold">Ask AI</h2>
          <button onClick={() => setOpen(false)} aria-label="Close"><X size={20} /></button>
        </div>
        <div className="flex-1 space-y-3 overflow-y-auto p-5" aria-live="polite">
          {msgs.map((m, i) => (
            <p key={i} className={`max-w-[85%] rounded-2xl px-4 py-2 text-[15px] leading-[1.5] ${m.from === "user" ? "ml-auto bg-fg text-bg" : "bg-tile"}`}>{m.text}</p>
          ))}
          {thinking && <p className="agent-dots flex w-fit gap-1 rounded-2xl bg-tile px-4 py-3" role="status" aria-label="Thinking"><span /><span /><span /></p>}
          {msgs.length < 3 && <div className="flex flex-wrap gap-2 pt-2">{suggestions.map((s) => <button key={s} onClick={() => send(s)} className="press rounded-full border border-secondary px-3 py-1 text-[13px] hover:bg-tile">{s}</button>)}</div>}
          <div ref={end} />
        </div>
        <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="flex gap-2 border-t border-secondary p-4">
          <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask about my work…" aria-label="Your question" className="min-w-0 flex-1 rounded-full border border-secondary bg-transparent px-4 py-2 text-[15px]" />
          <button aria-label="Send" className="flex size-10 items-center justify-center rounded-full bg-fg text-bg"><Send size={16} /></button>
        </form>
      </aside>
    </>
  );
}
