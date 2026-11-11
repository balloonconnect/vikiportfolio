"use client";
import { useEffect, useRef, useState } from "react";
import { MessageSquare, Send, X } from "lucide-react";
import { site } from "@/data/site";
import { projects } from "@/data/projects";
import { experience, awards } from "@/data/experience";

type Row = { label: string; value: string; href?: string };
type Rich = { text?: string; rows?: Row[]; chips?: string[]; links?: { label: string; href: string }[]; next?: string[] };
type Msg = { from: "user" | "ai"; text?: string; rich?: Rich };

const tryPlugin = "Can I try the plugin?";
const contactRows = (): Row[] => [
  { label: "Email", value: site.email, href: `mailto:${site.email}` },
  { label: "Phone", value: site.phone, href: site.phoneHref },
  ...site.social.map((l) => ({ label: l.label, value: "Open profile", href: l.href })),
  { label: "Resume", value: "Download PDF", href: site.resumeUrl },
];
const projectLinks = () => projects.map((p) => ({ label: p.name, href: `/work/${p.slug}` }));

// Question bank: trigger words, a reply, and follow-up suggestions that relate to this site.
// Swap `answer` for a fetch to /api/ask backed by an LLM when ready.
type Intent = { q: string; match: RegExp; reply: () => Rich };
const intents: Intent[] = [
  { q: "Hi", match: /^(hi|hello|hey|hola|good (morning|afternoon|evening))\b/, reply: () => ({ text: `Hi! I can tell you about ${site.name}’s projects, experience, skills and how to get in touch.`, next: ["Show me your projects", "What do you do?", "How can I contact you?"] }) },
  { q: "Thanks", match: /\b(thanks|thank you|thx|cheers)\b/, reply: () => ({ text: "You’re welcome! Anything else you’d like to know?", next: ["Show me your projects", "How can I contact you?"] }) },
  { q: tryPlugin, match: /(try|demo|test|play).*plugin|plugin.*(demo|try)/, reply: () => ({ text: "Yes. The Global Design Check case study ends with the plugin’s real interface running on a sample file.", links: [{ label: "Open the plugin demo", href: "/work/global-design-check#try-it" }], next: ["Tell me about Global Design Check", "What tools do you use?"] }) },
  { q: "How can I contact you?", match: /(contact|email|mail|hire|reach|resume|cv|phone|call|number|linkedin|behance|connect|available|availability|freelance)/, reply: () => ({ text: "Here is how to reach me:", rows: contactRows(), next: ["Show me your projects", "What’s your experience?"] }) },
  { q: "Show me your projects", match: /(project|work|portfolio|case stud|built|made)/, reply: () => ({ text: "Featured projects. Tap one to open the case study, or ask me about it.", links: projectLinks(), next: ["Tell me about Global Design Check", tryPlugin, "Which project is about design systems?"] }) },
  { q: "What’s your experience?", match: /(experience|worked|career|job|company|employ|indegene|hoffensoft|ad2pro|years|history)/, reply: () => ({ text: `${site.yearsExperience} years of experience`, rows: experience.map((e) => ({ label: e.years, value: `${e.role}, ${e.company}` })), next: ["What tools do you use?", "Show me your projects"] }) },
  { q: "What tools do you use?", match: /(skill|tool|good at|figma|stack|expertise|strength|software|prototype)/, reply: () => ({ text: "Skills and tools", chips: site.skills, next: ["Show me your projects", tryPlugin] }) },
  { q: "Any awards?", match: /(award|achievement|recognition|certif)/, reply: () => (awards.length ? { text: "Awards", rows: awards.map((a) => ({ label: a.org, value: a.title })), next: ["What’s your experience?"] } : { text: "No awards listed yet.", next: ["What’s your experience?"] }) },
  { q: "Where are you based?", match: /(where|location|based|city|country|timezone|time zone|live)/, reply: () => ({ text: `Based in ${site.location}. Time zone: India Standard Time.`, next: ["How can I contact you?", "What’s your experience?"] }) },
  { q: "What do you do?", match: /(who|about|intro|yourself|what do you do|story|background|specialis)/, reply: () => ({ text: site.intro, next: ["Show me your projects", "What tools do you use?", "How can I contact you?"] }) },
  { q: "Which project is about design systems?", match: /(design system|component|token|variable|library)/, reply: () => ({ text: "Design systems show up in two places:", links: [{ label: "Medora Design System", href: "/work/medora-design-system" }, { label: "MediSystem AI", href: "/work/medisystem-ai" }], next: ["Show me your projects", "Which project uses AI?"] }) },
  { q: "Which project uses AI?", match: /(\bai\b|artificial|llm|agent|assistant|machine)/, reply: () => ({ text: "AI work:", links: [{ label: "MediSystem AI", href: "/work/medisystem-ai" }, { label: "Global Design Check", href: "/work/global-design-check" }], next: ["Show me your projects", "What tools do you use?"] }) },
];

// Every question the autocomplete can offer: the bank plus one per project.
const questionBank = [...intents.map((i) => i.q).filter((q) => !["Hi", "Thanks"].includes(q)), ...projects.map((p) => `Tell me about ${p.name}`)];

function answer(q: string): Rich {
  const s = q.toLowerCase().trim();
  const proj = projects.find((p) => s.includes(p.name.toLowerCase()) || s.includes(p.slug.replace(/-/g, " ")));
  if (proj) return { text: `${proj.name} (${proj.years})`, rows: [{ label: "About", value: proj.description }, { label: "Role", value: proj.role }, { label: "Scope", value: proj.scope }, { label: "Result", value: proj.results }], links: [{ label: "View case study", href: `/work/${proj.slug}` }], next: proj.slug === "global-design-check" ? [tryPlugin, "Show me your projects", "How can I contact you?"] : ["Show me your projects", "How can I contact you?"] };
  const hit = intents.find((i) => i.match.test(s));
  if (hit) return hit.reply();
  return { text: "I’m not sure about that one. I can help with projects, experience, skills, awards and how to get in touch.", next: ["Show me your projects", "What’s your experience?", "How can I contact you?"] };
}

function suggest(input: string): string[] {
  const t = input.toLowerCase().trim(); if (t.length < 2) return [];
  const words = t.split(/\s+/);
  return questionBank.filter((q) => { const ql = q.toLowerCase(); return words.every((w) => ql.includes(w)); }).slice(0, 4);
}

function Bubble({ m }: { m: Msg }) {
  if (m.from === "user") return <p className="ml-auto max-w-[85%] break-words rounded-2xl bg-fg px-4 py-2 text-[15px] leading-[1.5] text-bg">{m.text}</p>;
  const r = m.rich ?? { text: m.text };
  const ext = (h?: string) => (h && /^https?:/.test(h) ? { target: "_blank", rel: "noreferrer" } : {});
  return (
    <div className="max-w-[92%] space-y-3 rounded-2xl bg-tile px-4 py-3 text-[15px] leading-[1.5]">
      {r.text && <p className={r.rows || r.chips || r.links ? "font-semibold" : ""}>{r.text}</p>}
      {r.rows && (
        <dl className="divide-y divide-secondary">
          {r.rows.map((row, i) => (
            <div key={i} className="grid grid-cols-[88px_1fr] gap-x-3 py-2 first:pt-0 last:pb-0 max-sm:grid-cols-1 max-sm:gap-y-0.5">
              <dt className="text-[13px] text-muted">{row.label}</dt>
              <dd className="min-w-0 break-words">{row.href ? <a href={row.href} {...ext(row.href)} className="underline underline-offset-2 hover:opacity-70">{row.value}</a> : row.value}</dd>
            </div>
          ))}
        </dl>
      )}
      {r.chips && <ul className="flex flex-wrap gap-2">{r.chips.map((c) => <li key={c} className="rounded-full border border-secondary px-3 py-1 text-[13px]">{c}</li>)}</ul>}
      {r.links && <ul className="flex flex-wrap gap-2">{r.links.map((l) => <li key={l.href}><a href={l.href} className="inline-block rounded-full border border-secondary px-3 py-1 text-[13px] hover:bg-fg hover:text-bg">{l.label} ↗</a></li>)}</ul>}
    </div>
  );
}

const starters = ["What do you do?", "Show me your projects", "What’s your experience?", "How can I contact you?"];

export function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([{ from: "ai", text: `Hi, I answer questions about ${site.name}’s work and background.` }]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const end = useRef<HTMLDivElement>(null);
  const hints = suggest(input);

  useEffect(() => { const f = () => setOpen(true); window.addEventListener("open-ai", f); return () => window.removeEventListener("open-ai", f); }, []);
  useEffect(() => { end.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, open]);
  useEffect(() => { const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false); window.addEventListener("keydown", k); return () => window.removeEventListener("keydown", k); }, []);

  const send = (text: string) => {
    const t = text.trim(); if (!t) return;
    setMsgs((m) => [...m, { from: "user", text: t }]);
    setInput(""); setThinking(true);
    window.setTimeout(() => { setMsgs((m) => [...m, { from: "ai", rich: answer(t) }]); setThinking(false); }, 450);
  };

  return (
    <>
      <button onClick={() => setOpen(true)} aria-label="Ask AI" className="fixed bottom-6 right-6 z-[90] flex size-14 items-center justify-center rounded-2xl border border-border bg-surface shadow-[0_10px_50px_#00000024] lg:hidden"><MessageSquare /></button>
      <aside aria-hidden={!open} inert={!open} className={`fixed inset-y-0 right-0 z-[2000] flex w-[424px] max-w-full max-sm:w-full flex-col border-l border-secondary bg-surface shadow-[0_10px_50px_#00000024] transition-transform duration-[420ms] ease-out ${open ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex h-[72px] items-center justify-between border-b border-secondary px-5">
          <h2 className="text-[17px] font-semibold">Ask AI</h2>
          <button onClick={() => setOpen(false)} aria-label="Close"><X size={20} /></button>
        </div>
        <div className="flex-1 space-y-3 overflow-y-auto overscroll-contain p-5 max-sm:p-4" aria-live="polite">
          {msgs.map((m, i) => <Bubble key={i} m={m} />)}
          {thinking && <p className="agent-dots flex w-fit gap-1 rounded-2xl bg-tile px-4 py-3" role="status" aria-label="Thinking"><span /><span /><span /></p>}
          {!thinking && <div className="flex flex-wrap gap-2 pt-1">{(msgs.length < 2 ? starters : (msgs[msgs.length - 1].rich?.next ?? starters)).map((q) => <button key={q} onClick={() => send(q)} className="press rounded-full border border-secondary px-3 py-1.5 text-left text-[13px] hover:bg-tile">{q}</button>)}</div>}
          <div ref={end} />
        </div>
        <div className="border-t border-secondary">
        {hints.length > 0 && <ul className="flex flex-col px-4 pt-3" role="listbox" aria-label="Suggested questions">{hints.map((h) => <li key={h}><button type="button" onClick={() => send(h)} className="w-full rounded-lg px-3 py-2 text-left text-[14px] hover:bg-tile">{h}</button></li>)}</ul>}
        <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="flex gap-2 p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask about my work…" aria-label="Your question" className="min-w-0 flex-1 rounded-full border border-secondary bg-transparent px-4 py-2 text-[16px]" />
          <button aria-label="Send" className="flex size-10 items-center justify-center rounded-full bg-fg text-bg"><Send size={16} /></button>
        </form>
        </div>
      </aside>
    </>
  );
}
