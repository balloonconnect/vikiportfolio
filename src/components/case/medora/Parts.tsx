import { Plus, ChevronDown, ChevronRight, Search, Check, X, Info, TriangleAlert, CircleCheck, User, Menu, ArrowRight, House, Calendar, Ellipsis } from "lucide-react";

const BLUE = "#2563eb";
const lum = (h: string) => { const n = parseInt(h.slice(1), 16); const c = [n >> 16, (n >> 8) & 255, n & 255].map((v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }); return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]; };
const ink = (h: string) => (lum(h) > 0.4 ? "#0f172a" : "#ffffff");

export const ramps: { name: string; steps: [string, string][] }[] = [
  { name: "Neutral", steps: [["0", "#FFFFFF"], ["50", "#F8FAFC"], ["100", "#F1F5F9"], ["200", "#E2E8F0"], ["300", "#CBD5E1"], ["400", "#94A3B8"], ["500", "#64748B"], ["600", "#475569"], ["700", "#334155"], ["800", "#1E293B"], ["900", "#0F172A"], ["950", "#020617"]] },
  { name: "Brand", steps: [["50", "#EFF6FF"], ["100", "#DBEAFE"], ["200", "#BFDBFE"], ["300", "#93C5FD"], ["400", "#60A5FA"], ["500", "#3B82F6"], ["600", "#2563EB"], ["700", "#1D4ED8"], ["800", "#1E40AF"], ["900", "#1E3A8A"]] },
  { name: "Success", steps: [["50", "#F0FDF4"], ["100", "#DCFCE7"], ["300", "#86EFAC"], ["400", "#4ADE80"], ["500", "#22C55E"], ["600", "#16A34A"], ["700", "#15803D"], ["800", "#166534"], ["900", "#14532D"]] },
  { name: "Warning", steps: [["50", "#FFFBEB"], ["100", "#FEF3C7"], ["300", "#FCD34D"], ["400", "#FBBF24"], ["500", "#F59E0B"], ["600", "#D97706"], ["700", "#B45309"], ["800", "#92400E"], ["900", "#78350F"]] },
  { name: "Danger", steps: [["50", "#FEF2F2"], ["100", "#FEE2E2"], ["300", "#FCA5A5"], ["400", "#F87171"], ["500", "#EF4444"], ["600", "#DC2626"], ["700", "#B91C1C"], ["800", "#991B1B"], ["900", "#7F1D1D"]] },
];

export const Swatches = () => (
  <div className="space-y-6">{ramps.map((r) => (
    <div key={r.name}><p className="mb-2 text-[15px]">{r.name} <span className="text-muted">({r.steps.length})</span></p>
      <div className="grid grid-cols-5 gap-1 sm:grid-cols-6 md:grid-cols-12">{r.steps.map(([k, h]) => (
        <div key={k} className="rounded-[4px] border border-black/5 px-2 py-3" style={{ background: h, color: ink(h) }}><p className="text-[13px] font-semibold">{k}</p><p className="text-[11px] opacity-80">{h}</p></div>))}</div></div>))}</div>
);

const scale: [string, string, number, number, string, string][] = [
  ["Display Large", "Bold", 48, 56, "Hero headline", "Display/Large"], ["Heading H1", "Bold", 36, 44, "Page title", "Heading/H1"], ["Heading H2", "Semi Bold", 30, 38, "Major section", "Heading/H2"],
  ["Heading H3", "Semi Bold", 24, 32, "Section title", "Heading/H3"], ["Heading H4", "Semi Bold", 20, 28, "Card or group title", "Heading/H4"], ["Body Large", "Regular", 18, 28, "Lead paragraph", "Body/Large"],
  ["Body Medium", "Regular", 16, 24, "Primary body copy", "Body/Medium"], ["Body Small", "Regular", 14, 20, "Secondary text, tables", "Body/Small"], ["Label Large", "Medium", 16, 24, "Buttons, nav", "Label/Large"],
  ["Label Medium", "Medium", 14, 20, "Form labels", "Label/Medium"], ["Label Small", "Medium", 12, 16, "Compact labels", "Label/Small"], ["Caption Default", "Regular", 12, 16, "Captions, helper text", "Caption/Default"], ["Overline Default", "Semi Bold", 11, 16, "Eyebrows, categories", "Overline/Default"],
];
const wt = (w: string) => (w === "Bold" ? 700 : w === "Semi Bold" ? 600 : w === "Medium" ? 500 : 400);
export const TypeScale = () => (
  <div className="overflow-x-auto rounded-[6px] border border-secondary"><table className="w-full min-w-[720px] border-collapse text-left text-[14px]">
    <thead><tr className="bg-surface">{["Example", "Weight", "Size", "Line height", "Usage", "Style"].map((h) => <th key={h} className="px-4 py-3 font-semibold">{h}</th>)}</tr></thead>
    <tbody>{scale.map(([n, w, s, l, u, st]) => (<tr key={n} className="border-t border-secondary"><td className="px-4 py-2 align-middle" style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: s, lineHeight: `${l}px`, fontWeight: wt(w), whiteSpace: "nowrap", textTransform: n.startsWith("Overline") ? "uppercase" : undefined, letterSpacing: n.startsWith("Overline") ? "0.08em" : undefined }}>{n}</td><td className="px-4 py-2 text-muted">{w}</td><td className="px-4 py-2 text-muted">{s}</td><td className="px-4 py-2 text-muted">{l}</td><td className="px-4 py-2 text-muted">{u}</td><td className="px-4 py-2 text-muted">{st}</td></tr>))}</tbody></table></div>
);

const Chip = ({ h }: { h: string }) => <span className="inline-flex items-center gap-2"><i className="inline-block h-4 w-4 rounded-[4px] border border-black/10" style={{ background: h }} />{h}</span>;
export const GlobalTokens = () => (
  <div className="overflow-x-auto rounded-[6px] border border-secondary"><table className="w-full min-w-[420px] border-collapse text-left text-[15px]"><thead><tr className="bg-surface"><th className="px-4 py-3 font-semibold">Name</th><th className="px-4 py-3 font-semibold">Value</th></tr></thead>
    <tbody>{ramps[1].steps.map(([k, h]) => <tr key={k} className="border-t border-secondary"><td className="px-4 py-2.5 text-muted">Brand / blue/{k}</td><td className="px-4 py-2.5"><Chip h={h} /></td></tr>)}</tbody></table></div>
);
const sem: [string, string, string][] = [["surface/default", "#FFFFFF", "#0F172A"], ["surface/subtle", "#F8FAFC", "#1E293B"], ["text/primary", "#0F172A", "#F8FAFC"], ["text/secondary", "#475569", "#CBD5E1"], ["border/default", "#E2E8F0", "#334155"], ["brand/default", "#2563EB", "#60A5FA"], ["status/success/text", "#166534", "#DCFCE7"], ["status/danger/text", "#991B1B", "#FEE2E2"]];
export const SemanticTokens = () => (
  <div className="overflow-x-auto rounded-[6px] border border-secondary"><table className="w-full min-w-[460px] border-collapse text-left text-[15px]"><thead><tr className="bg-surface">{["Name", "Light", "Dark"].map((h) => <th key={h} className="px-4 py-3 font-semibold">{h}</th>)}</tr></thead>
    <tbody>{sem.map(([n, l, d]) => <tr key={n} className="border-t border-secondary"><td className="px-4 py-2.5 text-muted">{n}</td><td className="px-4 py-2.5"><Chip h={l} /></td><td className="px-4 py-2.5"><Chip h={d} /></td></tr>)}</tbody></table></div>
);
export const Contrast = () => (
  <div className="grid gap-4 sm:grid-cols-3">{[["text/primary on surface", "17.85", "AAA pass"], ["text/secondary on surface", "7.58", "AAA pass"], ["on-brand on brand", "5.17", "AA pass"]].map(([a, b, c]) => (
    <div key={a} className="rounded-[6px] border border-secondary bg-surface p-5"><p className="text-[14px] text-muted">{a}</p><p className="mt-1 text-[36px] leading-none tracking-[-0.02em]">{b}</p><p className="mt-2 text-[14px]" style={{ color: "#15803d" }}>✓ {c}</p></div>))}</div>
);

export const SpacingRadius = () => (
  <div className="grid grid-cols-1 gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] [&>*]:min-w-0">
    <div className="overflow-x-auto rounded-[6px] border border-secondary"><table className="w-full border-collapse text-left text-[15px]"><thead><tr className="bg-surface">{["Token", "px", "Example"].map((h) => <th key={h} className="px-4 py-3 font-semibold">{h}</th>)}</tr></thead>
      <tbody>{[["space/2xs", 4], ["space/xs", 8], ["space/sm", 12], ["space/md", 16], ["space/lg", 24], ["space/xl", 32], ["space/2xl", 48], ["space/3xl", 64]].map(([t, n]) => <tr key={t as string} className="border-t border-secondary"><td className="px-4 py-2 text-muted">{t}</td><td className="px-4 py-2">{n}</td><td className="px-4 py-2"><i className="block h-3 rounded-[2px]" style={{ width: n as number, background: BLUE }} /></td></tr>)}</tbody></table></div>
    <div className="grid grid-cols-3 content-start gap-4">{[["none", "0px", 0], ["sm", "4px", 4], ["md", "8px", 8], ["lg", "12px", 12], ["xl", "16px", 16], ["full", "full", 999]].map(([n, v, r]) => (
      <div key={n as string}><div className="aspect-square border-2" style={{ borderRadius: r as number, borderColor: BLUE, background: "#eff6ff" }} /><p className="mt-2 text-[13px] text-muted">radius/{n} / {v}</p></div>))}</div>
  </div>
);

export const Grids = () => (
  <div className="space-y-6">{[["Desktop Grid", "Margin: 48   Gutter: 24   Columns: 12", 12, 48, 24], ["Tablet Grid", "Margin: 24   Gutter: 16   Columns: 8", 8, 24, 16], ["Mobile Grid", "Margin: 16   Gutter: 16   Columns: 4", 4, 16, 16]].map(([t, d, c, m, g]) => (
    <div key={t as string}><p className="mb-2 text-[15px]">{t as string} <span className="text-muted">· {d as string}</span></p>
      <div className="flex rounded-[6px] border border-secondary bg-surface py-4" style={{ paddingInline: (m as number) / 2, gap: (g as number) / 3, maxWidth: t === "Desktop Grid" ? "100%" : t === "Tablet Grid" ? "62%" : "30%" }}>{Array.from({ length: c as number }).map((_, i) => <i key={i} className="h-24 flex-1 rounded-[2px]" style={{ background: "#2563eb26" }} />)}</div></div>))}</div>
);

export const Elevation = () => (
  <div className="grid grid-cols-2 gap-6 md:grid-cols-4">{[["Elevation/1", "0 1px 2px #0f172a1a"], ["Elevation/2", "0 4px 12px #0f172a26"], ["Elevation/3", "0 12px 32px #0f172a33"], ["Focus/Ring", "0 0 0 2px #fff, 0 0 0 4px #2563eb"]].map(([n, s]) => (
    <div key={n}><div className="flex aspect-[4/3] items-center justify-center rounded-[8px] bg-white text-[14px] text-[#0f172a]" style={{ boxShadow: s }}>{n}</div></div>))}</div>
);

const icons: [string, React.ComponentType<{ size?: number }>][] = [["plus", Plus], ["chevron-down", ChevronDown], ["chevron-right", ChevronRight], ["search", Search], ["check", Check], ["close", X], ["info", Info], ["alert", TriangleAlert], ["check-circle", CircleCheck], ["user", User], ["menu", Menu], ["arrow-right", ArrowRight], ["home", House], ["calendar", Calendar], ["more", Ellipsis]];
export const IconGrid = () => (
  <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">{icons.map(([n, I]) => <div key={n} className="flex flex-col items-center gap-2 rounded-[6px] border border-secondary bg-surface py-5"><I size={24} /><span className="text-[12px] text-muted">{n}</span></div>)}</div>
);

const btn = (v: string, s: string): React.CSSProperties => {
  const b: React.CSSProperties = { height: 40, padding: "0 16px", borderRadius: 8, fontSize: 15, fontWeight: 500, border: "1px solid transparent", display: "inline-flex", alignItems: "center" };
  const t: Record<string, Record<string, React.CSSProperties>> = {
    Primary: { Default: { background: "#2563eb", color: "#fff" }, Hover: { background: "#1d4ed8", color: "#fff" }, Disabled: { background: "#e2e8f0", color: "#94a3b8" } },
    Secondary: { Default: { background: "#fff", color: "#2563eb", borderColor: "#2563eb" }, Hover: { background: "#eff6ff", color: "#1d4ed8", borderColor: "#1d4ed8" }, Disabled: { background: "#fff", color: "#94a3b8", borderColor: "#e2e8f0" } },
    Ghost: { Default: { background: "transparent", color: "#2563eb" }, Hover: { background: "#eff6ff", color: "#1d4ed8" }, Disabled: { background: "transparent", color: "#94a3b8" } },
    Danger: { Default: { background: "#dc2626", color: "#fff" }, Hover: { background: "#b91c1c", color: "#fff" }, Disabled: { background: "#e2e8f0", color: "#94a3b8" } },
  };
  return { ...b, ...t[v][s] };
};
export const ButtonMatrix = () => (
  <div className="overflow-x-auto rounded-[6px] border border-secondary bg-white p-5 text-[#0f172a]"><table className="w-full min-w-[520px] border-collapse text-left text-[14px]"><thead><tr><th /> {["Default", "Hover", "Disabled"].map((s) => <th key={s} className="pb-3 font-semibold text-[#64748b]">{s}</th>)}</tr></thead>
    <tbody>{["Primary", "Secondary", "Ghost", "Danger"].map((v) => <tr key={v}><td className="py-2 pr-4 font-semibold">{v}</td>{["Default", "Hover", "Disabled"].map((s) => <td key={s} className="py-2"><span style={btn(v, s)}>Button</span></td>)}</tr>)}</tbody></table></div>
);

const fieldBorder: Record<string, string> = { Default: "#cbd5e1", Focus: "#2563eb", Error: "#dc2626", Disabled: "#e2e8f0" };
export const InputMatrix = () => (
  <div className="grid gap-4 rounded-[6px] border border-secondary bg-white p-5 text-[#0f172a] sm:grid-cols-2 lg:grid-cols-4">{["Default", "Focus", "Error", "Disabled"].map((s) => (
    <div key={s}><p className="mb-2 text-[13px] font-semibold text-[#64748b]">{s}</p><p className="mb-1 text-[14px] font-medium">Label</p>
      <div className="h-10 rounded-[8px] border px-3 text-[15px] leading-[38px]" style={{ borderColor: fieldBorder[s], background: s === "Disabled" ? "#f1f5f9" : "#fff", color: s === "Disabled" ? "#94a3b8" : "#64748b", boxShadow: s === "Focus" ? "0 0 0 2px #fff, 0 0 0 4px #2563eb" : "none" }}>Placeholder</div>
      <p className="mt-1 text-[12px]" style={{ color: s === "Error" ? "#b91c1c" : "#64748b" }}>Helper text</p></div>))}</div>
);

const Box = ({ on, kind, dis, mid }: { on?: boolean; kind: "c" | "r" | "s"; dis?: boolean; mid?: boolean }) => {
  const col = dis ? "#cbd5e1" : "#2563eb";
  if (kind === "s") return <i className="relative inline-block h-5 w-9 rounded-full" style={{ background: on ? col : "#cbd5e1" }}><b className="absolute top-0.5 h-4 w-4 rounded-full bg-white" style={{ left: on ? 18 : 2 }} /></i>;
  const r = kind === "r";
  return <i className="relative inline-flex h-5 w-5 items-center justify-center border-2 text-white" style={{ borderRadius: r ? 999 : 4, borderColor: on || mid ? col : "#94a3b8", background: !r && (on || mid) ? col : "#fff" }}>{!r && on && <Check size={12} strokeWidth={3} />}{!r && mid && <b className="h-0.5 w-2.5 bg-white" />}{r && on && <b className="h-2.5 w-2.5 rounded-full" style={{ background: col }} />}</i>;
};
export const SelectionMatrix = () => (
  <div className="grid gap-6 rounded-[6px] border border-secondary bg-white p-5 text-[#0f172a] sm:grid-cols-3">{([["Checkbox", "c", [["Unchecked", {}], ["Checked", { on: true }], ["Indeterminate", { mid: true }], ["Disabled", { dis: true }]]], ["Radio", "r", [["Off", {}], ["On", { on: true }], ["Disabled", { dis: true }]]], ["Switch", "s", [["Off", {}], ["On", { on: true }], ["Disabled", { dis: true, on: true }]]]] as const).map(([t, k, rows]) => (
    <div key={t}><p className="mb-3 text-[13px] font-semibold text-[#64748b]">{t}</p><div className="space-y-3">{rows.map(([l, o]) => <div key={l} className="flex items-center gap-3 text-[15px]"><Box kind={k} {...(o as object)} /><span>{t} label <span className="text-[#64748b]">· {l}</span></span></div>)}</div></div>))}</div>
);

export const ThemePreview = ({ dark }: { dark?: boolean }) => {
  const c = dark ? { bg: "#0f172a", sub: "#1e293b", t: "#f8fafc", t2: "#cbd5e1", b: "#334155", br: "#60a5fa", onb: "#0f172a" } : { bg: "#ffffff", sub: "#f8fafc", t: "#0f172a", t2: "#475569", b: "#e2e8f0", br: "#2563eb", onb: "#ffffff" };
  return (
    <div className="overflow-hidden rounded-[10px] border text-left" style={{ background: c.bg, color: c.t, borderColor: dark ? "#334155" : "#e2e8f0", fontFamily: "Inter, system-ui, sans-serif" }}>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-b px-4 py-3 text-[13px]" style={{ borderColor: c.b }}><b className="text-[15px]">Medora</b><span style={{ color: c.t2 }}>Dashboard</span><span style={{ color: c.t2 }}>Appointments</span><span style={{ color: c.t2 }}>Patients</span><i className="ml-auto flex h-6 w-6 items-center justify-center rounded-full text-[10px]" style={{ background: c.br, color: c.onb }}>VK</i></div>
      <div className="px-5 py-5"><p className="text-[12px]" style={{ color: c.t2 }}>Home / Science / Research areas / Immunology</p><p className="mt-2 text-[26px] font-bold leading-[32px]">Page title</p><p className="text-[14px]" style={{ color: c.t2 }}>Short description of this page.</p>
        <div className="mt-3 flex gap-2"><span className="rounded-[8px] px-3 py-1.5 text-[13px] font-medium" style={{ background: c.br, color: c.onb }}>Button</span><span className="rounded-[8px] border px-3 py-1.5 text-[13px] font-medium" style={{ borderColor: c.br, color: c.br }}>Button</span></div>
        <div className="mt-4 rounded-[8px] border p-3 text-[13px]" style={{ background: c.sub, borderColor: c.b }}><b>Alert title</b><p style={{ color: c.t2 }}>Supporting message that explains what happened and what to do next.</p></div>
        <div className="mt-3 space-y-2 text-[13px]">{["Accordion title", "Accordion title"].map((a, i) => <div key={i} className="flex items-center justify-between rounded-[8px] border px-3 py-2" style={{ borderColor: c.b, background: c.sub }}>{a}<ChevronDown size={14} /></div>)}</div></div>
    </div>
  );
};
