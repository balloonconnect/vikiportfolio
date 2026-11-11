import { Check, X, Plus, ArrowRight, Download, Image as ImageIcon } from "lucide-react";
import type { ReactNode } from "react";

const BLUE = "#2563eb", INK = "#0f172a", SUB = "#64748b", LINE = "#e2e8f0", OK = "#15803d", NO = "#b91c1c";
const font = { fontFamily: "Inter, system-ui, sans-serif" } as const;

// numbered callout marker
const Dot = ({ n, className = "" }: { n: number; className?: string }) => (
  <span className={`absolute z-10 flex h-[22px] w-[22px] items-center justify-center rounded-full text-[12px] font-semibold text-white ${className}`} style={{ background: INK, ...font }}>{n}</span>
);
// a part of the component that carries a marker above it, joined by a thin line
const Part = ({ n, children, className = "", below = false }: { n: number; children: ReactNode; className?: string; below?: boolean }) => (
  <span className={`relative inline-flex ${className}`}>
    <span className={`pointer-events-none absolute left-1/2 h-[28px] w-px -translate-x-1/2 ${below ? "-bottom-[34px]" : "-top-[34px]"}`} style={{ background: INK }} />
    <Dot n={n} className={`left-1/2 -translate-x-1/2 ${below ? "-bottom-[56px]" : "-top-[56px]"}`} />
    {children}
  </span>
);

const Legend = ({ items }: { items: [string, string][] }) => (
  <ol className="space-y-3">{items.map(([t, d], i) => (
    <li key={t} className="flex gap-3"><span className="mt-[2px] flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-fg text-[12px] font-semibold text-bg" style={font}>{i + 1}</span>
      <span><span className="block text-[15px] font-semibold">{t}</span><span className="block text-[14px] text-muted">{d}</span></span></li>))}</ol>
);

const Shell = ({ title, stage, legend, pad = "pb-24 pt-24" }: { title: string; stage: ReactNode; legend: [string, string][]; pad?: string }) => (
  <div className="grid grid-cols-1 [&>*]:min-w-0 gap-6 lg:grid-cols-[1.25fr_1fr]">
    <div className={`flex min-h-[260px] items-center justify-center overflow-hidden rounded-[6px] border border-secondary bg-white px-6 ${pad} text-[#0f172a]`} role="img" aria-label={`${title} anatomy diagram`}>{stage}</div>
    <div><p className="mb-4 text-[20px]">{title}</p><Legend items={legend} /></div>
  </div>
);

// ---------- Button ----------
const Btn = ({ children, v = "primary", icon }: { children: ReactNode; v?: "primary" | "secondary" | "ghost" | "danger" | "custom"; icon?: ReactNode }) => {
  const s = { primary: { background: BLUE, color: "#fff", border: BLUE }, secondary: { background: "#fff", color: BLUE, border: BLUE }, ghost: { background: "transparent", color: BLUE, border: "transparent" }, danger: { background: "#dc2626", color: "#fff", border: "#dc2626" }, custom: { background: "#f97316", color: "#fff", border: "#f97316" } }[v];
  return <span className="inline-flex h-10 items-center gap-2 whitespace-nowrap rounded-[8px] border px-4 text-[14px] font-medium" style={{ background: s.background, color: s.color, borderColor: s.border, ...font }}>{icon}{children}</span>;
};
const ButtonAnatomy = () => (
  <Shell title="Button" legend={[["Container", "radius/md, size/control/md, semantic fill and border tokens."], ["Leading icon", "Optional. Boolean to show and an instance swap for the icon."], ["Label", "Label/Large text style. Keep to a short verb phrase."], ["Trailing icon", "Optional. Boolean to show and an instance swap for the icon."]]}
    stage={
      <Part n={1} below><span className="inline-flex h-14 items-center gap-3 rounded-[12px] border-2 px-6 text-[18px] font-medium text-white" style={{ background: BLUE, borderColor: BLUE, outline: `2px dashed ${INK}`, outlineOffset: 5, ...font }}>
        <Part n={2}><Plus size={20} /></Part><Part n={3}>Add patient</Part><Part n={4}><ArrowRight size={20} /></Part>
      </span></Part>} />
);

// ---------- Card ----------
// Matches the Figma Card: 24px padding, inset media, header (title + description), body, footer right-aligned with Secondary then Primary.
const CardMock = ({ media = true, header = "Complete blood count", desc = "Uploaded 12 Mar 2025", body = "Two values are outside the printed reference range.", footer = true, secondary = true, marks = false }: { media?: boolean; header?: string; desc?: string; body?: string; footer?: boolean; secondary?: boolean; marks?: boolean }) => {
  const M = ({ n, children }: { n: number; children: ReactNode }) => marks ? (
    <div className="relative"><span className="absolute top-1/2 -translate-y-1/2" style={{ left: -58 }}><Dot n={n} className="!relative" /></span><span className="pointer-events-none absolute top-1/2 h-px" style={{ background: INK, left: -36, width: 36 }} />{children}</div>) : <>{children}</>;
  return (
    <div className="w-[290px] space-y-3 rounded-[12px] border bg-white p-5 text-left" style={{ borderColor: LINE, boxShadow: "0 1px 3px rgba(15,23,42,.08)", ...font }}>
      {media && <M n={1}><div className="flex h-[110px] items-center justify-center rounded-[8px]" style={{ background: "#dbeafe", color: BLUE }}><ImageIcon size={28} /></div></M>}
      <M n={2}><div><p className="text-[16px] font-semibold leading-[22px]">{header}</p><p className="text-[13px] leading-[18px]" style={{ color: SUB }}>{desc}</p></div></M>
      <M n={3}><p className="text-[13px] leading-[19px]" style={{ color: SUB }}>{body}</p></M>
      {footer && <M n={4}><div className="flex justify-end gap-2 pt-1">{secondary && <Btn v="secondary">Dismiss</Btn>}<Btn>Review</Btn></div></M>}
    </div>);
};
const CardAnatomy = () => (
  <Shell title="Card" legend={[["Slot / Media", "Show media boolean. Fixed ratio, never stretched."], ["Slot / Header", "Header content swap: title and description."], ["Slot / Body", "Body content swap. Short, scannable copy."], ["Slot / Footer", "Show footer boolean. Actions sit on the right: Secondary, then Primary at the far right."]]}
    pad="py-10" stage={<div className="pl-10 max-sm:pl-8"><CardMock marks /></div>} />
);

// ---------- Do / Don't ----------
const Verdict = ({ ok, title, text, children }: { ok: boolean; title: string; text: string; children: ReactNode }) => (
  <figure className="overflow-hidden rounded-[6px] border" style={{ borderColor: ok ? "#86efac" : "#fca5a5" }}>
    <div className="flex min-h-[150px] items-center justify-center bg-white p-5 text-[#0f172a]">{children}</div>
    <figcaption className="border-t p-4" style={{ borderColor: ok ? "#86efac" : "#fca5a5", background: ok ? "#f0fdf4" : "#fef2f2" }}>
      <p className="mb-1 flex items-center gap-2 text-[14px] font-semibold" style={{ color: ok ? OK : NO }}>{ok ? <Check size={16} /> : <X size={16} />}{ok ? "Do" : "Don't"}</p>
      <p className="text-[14px] font-medium text-[#0f172a]">{title}</p><p className="mt-1 text-[13px] text-[#475569]">{text}</p>
    </figcaption>
  </figure>
);
const Pairs = ({ label, rows }: { label: string; rows: [ReactNode, ReactNode][] }) => (
  <div className="mt-10"><p className="mb-4 text-[17px] font-semibold">{label}</p>
    <div className="grid grid-cols-1 [&>*]:min-w-0 gap-4 md:grid-cols-2">{rows.flat().map((r, i) => <div key={i}>{r}</div>)}</div></div>
);

const buttonRows: [ReactNode, ReactNode][] = [
  [<Verdict key="a" ok title="One primary action per group" text="Pair a single Primary with a Secondary or Ghost so the next step is obvious."><div className="flex gap-3"><Btn v="secondary">Cancel</Btn><Btn>Save changes</Btn></div></Verdict>,
   <Verdict key="b" ok={false} title="Several primaries competing" text="Equal emphasis makes users hesitate and weakens the main call to action."><div className="flex gap-3"><Btn>Save</Btn><Btn>Share</Btn><Btn>Publish</Btn></div></Verdict>],
  [<Verdict key="c" ok title="Use a specific verb label" text="Two or three words that say what happens, with an icon only when it adds meaning."><Btn icon={<Download size={16} />}>Download report</Btn></Verdict>,
   <Verdict key="d" ok={false} title="Vague or long labels" text="Avoid “Click here” or full sentences. They are hard to scan and translate poorly."><span className="inline-flex h-10 items-center whitespace-nowrap rounded-[8px] border px-4 text-[14px] font-medium" style={{ background: BLUE, color: "#fff", borderColor: BLUE, ...font }}>Click here to submit</span></Verdict>],
  [<Verdict key="e" ok title="Use variants for meaning" text="Danger is reserved for destructive actions, always confirmed with a clear label."><div className="flex gap-3"><Btn v="ghost">Keep</Btn><Btn v="danger">Delete record</Btn></div></Verdict>,
   <Verdict key="f" ok={false} title="Off-token colours" text="Hard-coded fills break dark mode and contrast checks. Use the semantic tokens."><Btn v="custom">Save changes</Btn></Verdict>],
];
const cardRows: [ReactNode, ReactNode][] = [
  [<Verdict key="a" ok title="Keep the slot order" text="Media, header, body, then footer, with actions on the right as in the Figma component."><div className="scale-[.82]"><CardMock /></div></Verdict>,
   <Verdict key="b" ok={false} title="Rearranging or skipping the structure" text="Body text above the header and an unlabeled block make cards harder to compare."><div className="w-[220px] rounded-[12px] border bg-white p-4" style={{ borderColor: LINE, ...font }}><p className="text-[13px]" style={{ color: SUB }}>Two values are outside the printed reference range and need review before the visit.</p><p className="mt-3 text-[15px] font-semibold">Complete blood count</p></div></Verdict>],
  [<Verdict key="c" ok title="One clear footer action" text="One Primary at the right edge, with at most one Secondary to its left."><div className="scale-[.82]"><CardMock media={false} secondary={false} /></div></Verdict>,
   <Verdict key="d" ok={false} title="A crowd of actions" text="Three or more buttons in the footer split attention and overflow on mobile."><div className="w-[220px] rounded-[12px] border bg-white p-4" style={{ borderColor: LINE, ...font }}><p className="text-[15px] font-semibold">Complete blood count</p><div className="mt-3 flex flex-wrap justify-end gap-2"><Btn v="ghost">Edit</Btn><Btn v="secondary">Share</Btn><Btn v="danger">Delete</Btn><Btn>Review</Btn></div></div></Verdict>],
  [<Verdict key="e" ok title="Turn unused slots off" text="Use the Show media and Show footer booleans so the card collapses cleanly."><div className="scale-[.82]"><CardMock media={false} footer={false} /></div></Verdict>,
   <Verdict key="f" ok={false} title="Leaving empty placeholders" text="An empty media area or footer gap wastes space and looks unfinished."><div className="w-[220px] overflow-hidden rounded-[12px] border bg-white" style={{ borderColor: LINE, ...font }}><div className="h-[64px] border-b border-dashed" style={{ borderColor: "#cbd5e1", background: "#f8fafc" }} /><div className="p-4"><p className="text-[15px] font-semibold">Complete blood count</p><div className="mt-6 h-8" /></div></div></Verdict>],
];

export const ComponentAnatomy = () => (
  <div className="space-y-12">
    <ButtonAnatomy />
    <Pairs label="Button: dos and don'ts" rows={buttonRows} />
    <div className="pt-4"><CardAnatomy /></div>
    <Pairs label="Card: dos and don'ts" rows={cardRows} />
  </div>
);
