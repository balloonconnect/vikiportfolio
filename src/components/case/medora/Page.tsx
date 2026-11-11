import { Atom, Network, Layers, LayoutGrid, PanelsTopLeft, Monitor, Palette, Home, User, Settings, Bell, Heart, Star, MessageCircle, Mail, Trash2, Calendar, Sparkles, MousePointer2, Plus, ChevronDown, Search, Check, X, Info, TriangleAlert, CircleCheck, Menu, ArrowRight, ChevronRight, Ellipsis } from "lucide-react";
import { Stage } from "./Stage";
import { Swatches, TypeScale, GlobalTokens, SemanticTokens, Contrast, ButtonMatrix, InputMatrix, SelectionMatrix, ThemePreview, ramps } from "./Parts";
import { Steps, Cards, Decisions, MoreWork } from "../blocks";
import { OutcomeStats } from "../plugin/Motion";
import type { Project } from "@/data/projects";

const BL = "#2563eb";
const vars = { "--bg": "#f5f5f6", "--surface": "#ffffff", "--fg": "#0f172a", "--fg-muted": "#64748b", "--border": "#e2e8f0", "--tile": "#e8e8e8", "--secondary": "#e2e8f0" } as React.CSSProperties;
const Wrap = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => <div className={`mx-auto w-full max-w-[1200px] px-5 md:px-12 ${className}`}>{children}</div>;
const Band = ({ id, tone = "grey", children }: { id?: string; tone?: "grey" | "white" | "blue" | "dark"; children: React.ReactNode }) => (
  <section id={id} className="py-16 md:py-24" style={tone === "blue" ? { background: BL, color: "#fff" } : tone === "white" ? { background: "#fff" } : tone === "dark" ? { background: "#0b0f1a", color: "#f8fafc" } : { background: "#f5f5f6" }}>{children}</section>
);
const H = ({ title, text, left, accent }: { title: React.ReactNode; text?: React.ReactNode; left?: boolean; accent?: boolean }) => (
  <div className={left ? "max-w-[520px]" : "mx-auto max-w-[860px] text-center"}>
    <h2 className="text-[clamp(28px,4vw,44px)] font-semibold leading-[1.1] tracking-[-0.02em]">{title}</h2>
    {text && <p className="mt-4 text-[16px] leading-[26px]" style={{ opacity: 0.72 }}>{text}</p>}
  </div>
);
const Panel = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => <div className={`rounded-[14px] border-2 bg-white p-4 shadow-[0_10px_40px_#2563eb1f] ${className}`} style={{ borderColor: "#bfdbfe" }}>{children}</div>;
const ratio = (h: string) => { const L = (x: string) => { const n = parseInt(x.slice(1), 16); const c = [n >> 16, (n >> 8) & 255, n & 255].map((v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }); return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]; }; return (1.05 / (L(h) + 0.05)).toFixed(1); };

const Dash = ({ dark }: { dark?: boolean }) => {
  const c = dark ? { bg: "#0f172a", sub: "#1e293b", t: "#f8fafc", t2: "#cbd5e1", b: "#334155", br: "#60a5fa", onb: "#0f172a" } : { bg: "#ffffff", sub: "#f8fafc", t: "#0f172a", t2: "#475569", b: "#e2e8f0", br: "#2563eb", onb: "#ffffff" };
  return (
    <div style={{ width: 1000, height: 560, background: c.bg, color: c.t, fontFamily: "Inter, system-ui, sans-serif", textAlign: "left" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 28, padding: "18px 40px", borderBottom: `1px solid ${c.b}`, fontSize: 15 }}><b style={{ fontSize: 20 }}>Medora</b><span style={{ color: c.t2 }}>Dashboard</span><span style={{ color: c.t2 }}>Appointments</span><span style={{ color: c.t2 }}>Patients</span><i style={{ marginLeft: "auto", width: 32, height: 32, borderRadius: 99, background: c.br, color: c.onb, fontSize: 12, display: "flex", alignItems: "center", justifyContent: "center", fontStyle: "normal" }}>VK</i></div>
      <div style={{ padding: "34px 40px" }}>
        <div style={{ fontSize: 12, letterSpacing: ".1em", fontWeight: 600, color: c.br }}>NEWS &amp; STORIES</div>
        <div style={{ fontSize: 40, fontWeight: 700, lineHeight: "46px", marginTop: 8, width: 520 }}>Advancing care for people and animals</div>
        <div style={{ fontSize: 15, color: c.t2, marginTop: 10, width: 440 }}>A short supporting sentence that sets context for the page in no more than two lines.</div>
        <div style={{ display: "flex", gap: 10, marginTop: 18 }}><span style={{ background: c.br, color: c.onb, padding: "9px 18px", borderRadius: 8, fontSize: 14, fontWeight: 500 }}>Button</span><span style={{ border: `1px solid ${c.br}`, color: c.br, padding: "9px 18px", borderRadius: 8, fontSize: 14, fontWeight: 500 }}>Button</span></div>
        <div style={{ display: "flex", gap: 16, marginTop: 30 }}>{[["128", "Appointments today", "+12%"], ["128", "Appointments today", "+12%"], ["128", "Appointments today", "+12%"]].map(([a, b, d], i) => <div key={i} style={{ flex: 1, border: `1px solid ${c.b}`, borderRadius: 12, padding: 16, background: c.sub }}><div style={{ fontSize: 26, fontWeight: 700 }}>{a}</div><div style={{ fontSize: 13, color: c.t2 }}>{b}</div><div style={{ fontSize: 12, color: dark ? "#4ade80" : "#15803d", marginTop: 4 }}>{d}</div></div>)}</div>
      </div>
    </div>
  );
};

const GreyVis = ({ children }: { children: React.ReactNode }) => <div className="flex h-[150px] items-center justify-center overflow-hidden bg-[#ececec] p-4">{children}</div>;
const FCard = ({ title, text, vis }: { title: string; text: string; vis: React.ReactNode }) => (
  <div className="overflow-hidden rounded-[14px] border border-[#d9dde7] bg-white"><GreyVis>{vis}</GreyVis><div className="p-5"><p className="text-[17px] font-medium">{title}</p><p className="mt-1 text-[14px] leading-[22px] text-[#64748b]">{text}</p></div></div>
);
const iconList: [string, React.ComponentType<{ size?: number }>][] = [["home", Home], ["profile", User], ["settings", Settings], ["notifications", Bell], ["favorite", Heart], ["rating", Star], ["message", MessageCircle], ["email", Mail], ["delete", Trash2], ["calendar", Calendar]];

export function MedoraPage({ p }: { p: Project }) {
  return (
    <div style={{ ...vars, color: "#0f172a", fontFamily: "Inter, Lato, system-ui, sans-serif", background: "#f5f5f6" }} className="pt-[64px]">
      {/* stats bar */}
      <div style={{ background: "#eef2ff" }}><Wrap className="flex flex-wrap justify-center gap-x-10 gap-y-1 py-4 text-[15px] font-semibold" ><span style={{ color: BL }}>54 Components</span><span style={{ color: BL }}>165 Variants</span><span style={{ color: BL }}>300+ Variables</span><span style={{ color: BL }}>13 Text styles</span><span style={{ color: BL }}>15 Icons</span></Wrap></div>
      {/* hero */}
      <section id="overview" className="relative overflow-hidden pb-0 pt-12 text-center" style={{ backgroundColor: "#f7f8fc", backgroundImage: "radial-gradient(#cbd5e1 1.2px, transparent 1.2px)", backgroundSize: "26px 26px" }}>
        <Wrap>
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[22px] font-bold shadow-[0_6px_20px_#0f172a1f]" style={{ color: BL }}>M</div>
          <p className="mt-6 text-[13px] font-semibold tracking-[0.18em]" style={{ color: BL }}>MEDORA · FIGMA · VARIABLES · COMPONENTS</p>
          <div className="relative mx-auto mt-3 inline-block">
            <h1 className="text-[clamp(52px,12.5vw,150px)] font-extrabold leading-[1] tracking-[-0.04em]"><span>Design </span><span style={{ color: BL }}>System</span></h1>
            <span className="absolute -right-2 -top-3 inline-flex items-center gap-1 rounded-full px-4 py-1.5 text-[clamp(12px,1.6vw,20px)] font-medium text-white shadow-[0_10px_24px_#2563eb55] md:-right-14 md:top-auto md:bottom-0" style={{ background: "linear-gradient(135deg,#2563eb,#7c3aed)" }}><MousePointer2 size={16} fill="#fff" />Case Study</span>
            <Sparkles className="absolute -left-4 top-0 hidden md:block" size={44} style={{ color: "#7c3aed" }} />
          </div>
          <p className="mx-auto mt-6 max-w-[620px] text-[clamp(15px,1.6vw,19px)] leading-[1.5]">An atomic design system that brings together semantic tokens, reusable components and color modes in one scalable UI foundation.</p>
          <div className="relative mx-auto mt-12 max-w-[1000px]">
            <div className="relative overflow-hidden rounded-t-[28px] border-[10px] border-b-0" style={{ borderColor: "#0b0f1a" }}>
              <Stage w={1000} h={560}><div className="relative"><Dash /><div className="absolute inset-0" style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%)" }}><Dash dark /></div></div></Stage>
            </div>
            <span className="absolute -left-2 bottom-24 hidden items-center gap-1 rounded-full border-2 border-white px-4 py-1.5 text-[18px] font-medium text-white shadow-[0_10px_24px_#2563eb55] md:inline-flex" style={{ background: BL }}>Atomic Design</span>
          </div>
        </Wrap>
      </section>

      {/* foundations */}
      <Band tone="grey"><Wrap>
        <H title="A scalable system of reusable foundations and components" />
        <div className="mt-12 grid grid-cols-1 [&>*]:min-w-0 gap-6 md:grid-cols-3">
          <FCard title="Color System" text="Base palettes and semantic color roles that support consistent theming across the interface." vis={<div className="flex gap-3">{[["Blue-500", "#3B82F6"], ["Blue-700", "#1D4ED8"], ["Blue-900", "#1E3A8A"]].map(([n, h]) => <div key={n} className="w-[92px] rounded-[10px] border border-[#d9dde7] bg-white p-2"><i className="block h-[52px] rounded-[8px]" style={{ background: h }} /><p className="mt-1 text-[11px] font-medium">{n}</p><p className="text-[10px] text-[#64748b]">{h} · {ratio(h)}:1</p></div>)}</div>} />
          <FCard title="Typography" text="A flexible type scale with predefined roles for clear hierarchy and readability." vis={<div className="w-full text-right"><p className="text-[52px] font-bold leading-none text-[#0f172a14]">Typography</p><p className="text-[40px] font-bold leading-none">Inter</p></div>} />
          <FCard title="Spacing & Radius" text="A 4-point spacing scale and defined radius tokens for predictable layouts and component shapes." vis={<div className="relative rounded-[14px] border-2 border-dashed border-[#2563eb] bg-[#bfdbfe99] p-4"><div className="rounded-[10px] bg-white px-6 py-3 text-[13px]">Card · $1,200.00</div>{["left-1 top-1", "right-1 top-1", "left-1 bottom-1", "right-1 bottom-1"].map((c) => <b key={c} className={`absolute ${c} rounded bg-[#7c3aed] px-1 text-[10px] text-white`}>16</b>)}</div>} />
          <FCard title="Components" text="Reusable UI components built on shared foundations for faster and more consistent design." vis={<div className="grid grid-cols-4 gap-2">{["Default", "Hover", "Focus", "Disabled"].map((s, i) => <span key={s} className="rounded-[6px] px-3 py-2 text-center text-[10px] font-semibold tracking-wide text-white" style={{ background: i === 3 ? "#93c5fd" : i === 1 ? "#1d4ed8" : BL, outline: i === 2 ? "2px solid #93c5fd" : "none" }}>LABEL</span>)}</div>} />
          <FCard title="Variables & Tokens" text="Global and semantic variables that simplify system updates and support multiple color modes." vis={<div className="w-full space-y-1.5 text-[11px]">{[["surface/default", "#FFFFFF", "#0F172A"], ["text/primary", "#0F172A", "#F8FAFC"], ["brand/default", "#2563EB", "#60A5FA"], ["border/default", "#E2E8F0", "#334155"]].map(([n, l, d]) => <div key={n} className="flex items-center justify-between rounded-[6px] bg-white px-2 py-1"><span>{n}</span><span className="flex gap-1"><i className="h-3 w-3 rounded border border-black/10" style={{ background: l }} /><i className="h-3 w-3 rounded" style={{ background: d }} /></span></div>)}</div>} />
          <FCard title="Icons" text="A unified icon library with consistent sizing, alignment and stroke style." vis={<div className="flex gap-3">{[Home, User, Home, Calendar, Bell].map((I, i) => <span key={i} className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-sm" style={i === 2 ? { background: BL, color: "#fff" } : undefined}><I size={20} /></span>)}</div>} />
        </div>
      </Wrap></Band>

      {/* atomic */}
      <Band id="atomic-design" tone="blue"><Wrap>
        <H title="Atomic Design Framework" text="A structured methodology that organizes interfaces into reusable building blocks, making products easier to scale, maintain and evolve." />
        <div className="mt-12 grid grid-cols-1 [&>*]:min-w-0 gap-5 md:grid-cols-2">{([[Palette, "Design Tokens", "Core design values that define color, typography, spacing, radius and elevation."], [LayoutGrid, "Organisms · 9", "Complex interface sections built by combining multiple molecules and atoms. Hero, Footer, Mega Menu, Table."], [Atom, "Atoms · 15", "The smallest reusable UI elements that serve as the foundation for every interface. Button, Field, Badge, Icon."], [PanelsTopLeft, "Templates", "Page structures that organize components into consistent layouts without real content."], [Network, "Molecules · 15", "Simple combinations of atoms that create functional UI patterns. Card, Alert, Tabs, Pagination."], [Monitor, "Pages · 3", "Complete interface screens populated with real content, data and interactions. Home, Science, News."]] as const).map(([I, t, d]) => (
          <div key={t} className="flex items-center gap-5 rounded-[14px] border border-white/25 bg-white/10 p-6"><div className="flex-1"><p className="text-[19px] font-medium">{t}</p><p className="mt-1 text-[14px] leading-[22px]" style={{ opacity: 0.8 }}>{d}</p></div><I size={44} strokeWidth={1.5} /></div>))}</div>
        <p className="mx-auto mt-8 max-w-[720px] text-center text-[15px]" style={{ opacity: 0.85 }}>Every component page follows one flow: Heading, Component, Variants, Anatomy and usage, then three viewports in light and dark.</p>
      </Wrap></Band>

      {/* typography */}
      <Band id="typography" tone="grey"><Wrap className="relative">
        <p aria-hidden className="pointer-events-none absolute right-6 top-0 hidden select-none text-[clamp(80px,16vw,200px)] font-bold leading-none text-[#0f172a0d] md:block">Inter</p>
        <H left title="Typography" text="A structured type system with reusable text styles, a predefined hierarchy and consistent usage across every interface. Linked to Typography variables for Desktop, Tablet and Mobile." />
        <div className="relative mt-10 grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_280px]"><div className="min-w-0 overflow-x-auto"><TypeScale /></div>
          <Panel className="hidden lg:block"><p className="mb-2 text-[12px] font-semibold text-[#64748b]">Text styles</p>{["Display/Large · 48/56", "Heading/H1 · 36/44", "Heading/H2 · 30/38", "Heading/H3 · 24/32", "Heading/H4 · 20/28", "Body/Large · 18/28", "Body/Medium · 16/24", "Body/Small · 14/20", "Label/Large · 16/24", "Caption/Default · 12/16", "Overline/Default · 11/16"].map((s) => <p key={s} className="border-t border-[#eef2f7] py-1.5 text-[13px]"><b className="mr-2">Ag</b>{s}</p>)}</Panel></div>
      </Wrap></Band>

      {/* color */}
      <Band id="color" tone="white"><Wrap>
        <H title="Color System" text="A layered color system connects base palettes with global and semantic tokens, ensuring consistent UI roles, easier maintenance and seamless switching between light and dark modes." />
        <div className="mt-12"><Swatches /></div>
      </Wrap></Band>

      {/* tokens alternating */}
      <Band id="tokens" tone="grey"><Wrap className="space-y-20">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 [&>*]:min-w-0"><div><H left title="Global Tokens" text="Base color values that form the foundation of the design system. They remain independent of UI meaning and are reused to build semantic tokens." /></div><Panel><GlobalTokens /></Panel></div>
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 [&>*]:min-w-0"><Panel className="order-2 md:order-1"><SemanticTokens /></Panel><div className="order-1 md:order-2"><H left title="Semantic Tokens" text="Semantic color variables assign reusable UI roles to global values, improving consistency, maintenance and switching between color modes." /></div></div>
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 [&>*]:min-w-0"><div><H left title="Color Contrast Check" text="Key text and surface pairs were calculated against WCAG contrast requirements for light and dark modes." /></div><Contrast /></div>
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 [&>*]:min-w-0"><Panel className="order-2 md:order-1"><div className="space-y-1 text-[14px]">{[["radius/sm", "4"], ["radius/md", "8"], ["radius/lg", "12"], ["radius/xl", "16"], ["space/xs", "8"], ["space/md", "16"], ["space/xl", "32"]].map(([n, v]) => <div key={n} className="flex justify-between border-b border-[#eef2f7] px-2 py-2"><span className="text-[#475569]">{n}</span><span>{v}</span></div>)}</div></Panel><div className="order-1 md:order-2"><H left title="Number Variables" text="Reusable spacing and radius variables translate the system scale into shared values, keeping layouts and component shapes consistent and easier to update." /></div></div>
        <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2"><div><p className="text-[20px] font-medium">Primitives to pages</p><p className="mt-2 text-[15px] text-[#64748b]">Raw values become meaning, meaning becomes component decisions, and components compose into pages. Change one layer and everything above it updates.</p></div><div className="grid gap-3">{[["1 · Primitives", "Raw ramps and scales: color/blue/600, 4px spacing steps, type sizes. Hidden from daily use."], ["2 · Semantic", "Roles with Light and Dark modes: color/brand/default, color/surface/default, text and border roles."], ["3 · Component", "Per-component bindings such as button/primary/background and field/border-focus."], ["4 · Atoms → Pages", "Atoms, molecules and organisms use only these tokens, then compose into templates and pages."]].map(([t, d]) => <div key={t} className="rounded-[12px] border border-[#e2e8f0] bg-white p-4"><p className="font-medium">{t}</p><p className="mt-1 text-[14px] text-[#64748b]">{d}</p></div>)}</div></div>
      </Wrap></Band>

      {/* spacing & radius */}
      <Band id="spacing" tone="white"><Wrap>
        <H title="Spacing & Radius Scale" text="A 4-point spacing scale provides reusable values for consistent gaps, margins and padding across components and layouts." />
        <div className="mt-10 overflow-x-auto rounded-[12px] border border-[#e2e8f0]"><table className="w-full min-w-[480px] border-collapse text-left text-[15px]"><thead><tr className="bg-[#f8fafc]">{["Token", "px", "Example"].map((h) => <th key={h} className="px-4 py-3 font-semibold">{h}</th>)}</tr></thead><tbody>{[["space/2xs", 4], ["space/xs", 8], ["space/sm", 12], ["space/md", 16], ["space/lg", 24], ["space/xl", 32], ["space/2xl", 48], ["space/3xl", 64]].map(([t, n]) => <tr key={t as string} className="border-t border-[#e2e8f0]"><td className="px-4 py-2.5"><code className="rounded bg-[#eef2f7] px-2 py-0.5 text-[13px]">{t}</code></td><td className="px-4 py-2.5">{n}</td><td className="px-4 py-2.5"><i className="flex h-6 items-center rounded-[4px] bg-[#e2e8f0] px-2 text-[11px] font-semibold" style={{ width: Math.max(n as number, 24) * 3 }}>{n}</i></td></tr>)}</tbody></table></div>
        <div className="mt-16"><H title="Spacing in Practice" text="The spacing scale creates predictable relationships between content, controls and component boundaries." />
          <div className="relative mx-auto mt-8 max-w-[420px]"><div className="rounded-[16px] border-2 border-dashed p-4" style={{ borderColor: BL, background: "#bfdbfe99" }}><div className="flex items-center gap-3 rounded-[10px] bg-white p-3"><span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e2e8f0]"><Home size={18} /></span><b>Appointments</b></div><div className="mt-3 rounded-[10px] bg-white px-4 py-4 text-[20px]">128 today</div></div>{["-left-3 -top-3", "-right-3 -top-3", "-left-3 -bottom-3", "-right-3 -bottom-3"].map((c) => <b key={c} className={`absolute ${c} rounded bg-[#7c3aed] px-1.5 py-0.5 text-[12px] text-white`}>16</b>)}</div></div>
        <div className="mt-16"><H title="Radius Scale" text="A defined radius scale gives components a consistent shape and hierarchy, making the interface feel cohesive and recognizable." />
          <div className="mt-8 grid grid-cols-1 [&>*]:min-w-0 grid-cols-3 gap-4 md:grid-cols-6">{[["none", "0px", 0], ["sm", "4px", 4], ["md", "8px", 8], ["lg", "12px", 12], ["xl", "16px", 16], ["full", "full", 999]].map(([n, v, r]) => <div key={n as string} className="text-center"><p className="mb-2 text-[12px]">radius/{n} / {v}</p><div className="aspect-square border-2 bg-white" style={{ borderRadius: r as number, borderColor: "#6366f1" }} /></div>)}</div></div>
      </Wrap></Band>

      {/* grids */}
      <Band id="grids" tone="blue"><Wrap>
        <H title="Grids" text="The responsive grid adapts across screen sizes, using 12 columns for desktop, 8 for tablet and 4 for mobile. Every layout follows the spacing system to keep alignment consistent across breakpoints." />
        {[["Desktop Grid", 12, "Margin: 48   Gutter: 24   Columns: 12"], ["Tablet Grid", 8, "Margin: 24   Gutter: 16   Columns: 8"], ["Mobile Grid", 4, "Margin: 16   Gutter: 16   Columns: 4"]].map(([t, c, d], i) => (
          <div key={t as string} className={i === 0 ? "mt-12" : "mt-8"} style={i ? { maxWidth: i === 1 ? "100%" : "100%" } : undefined}><p className="mb-2 text-[17px] font-medium">{t as string}</p><div className="flex gap-1 rounded-[14px] border border-white/25 bg-white/10 p-4 md:gap-3">{Array.from({ length: c as number }).map((_, k) => <i key={k} className="h-[120px] flex-1 rounded-[3px] bg-white/45 md:h-[170px]" />)}</div><p className="mt-2 text-[13px]" style={{ opacity: 0.85 }}>{d as string}</p></div>))}
      </Wrap></Band>

      {/* shadows */}
      <Band tone="grey"><Wrap>
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 [&>*]:min-w-0"><H left title="Shadows & Blurs" text="Elevation styles create depth, separate interface layers and guide attention. Focus ring style keeps keyboard focus visible on every component." />
          <Panel><p className="mb-2 flex items-center gap-1 text-[13px] text-[#64748b]"><ChevronDown size={14} />Effect styles</p>{["Elevation/1", "Elevation/2", "Elevation/3", "Focus/Ring"].map((s) => <p key={s} className="flex items-center gap-2 border-t border-[#eef2f7] py-2 text-[13px]"><i className="h-3.5 w-3.5 rounded-[3px] border border-[#cbd5e1]" />{s}</p>)}</Panel></div>
        <div className="mt-10 rounded-[16px] bg-[#ececec] p-6 md:p-8"><p className="text-[24px] font-semibold">Drop Shadows</p><div className="mt-6 grid grid-cols-1 [&>*]:min-w-0 grid-cols-2 gap-6 md:grid-cols-4">{[["Elevation/1", "0 1px 2px #0f172a1a"], ["Elevation/2", "0 4px 12px #0f172a26"], ["Elevation/3", "0 12px 32px #0f172a33"], ["Focus/Ring", "0 0 0 2px #fff, 0 0 0 4px #2563eb"]].map(([n, s]) => <div key={n}><p className="mb-2 text-[12px]">{n}</p><div className="aspect-square rounded-[12px] bg-white" style={{ boxShadow: s }} /></div>)}</div></div>
      </Wrap></Band>

      {/* icons */}
      <Band id="icons" tone="grey"><Wrap>
        <H title="Icons" text="Icons are built on a 24px grid with consistent stroke rules, so they stay clear across sizes and adapt to semantic colors through instance swap." />
        <div className="mt-10 grid grid-cols-1 [&>*]:min-w-0 grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">{iconList.map(([n, I]) => <div key={n} className="flex flex-col items-center gap-3 rounded-[12px] bg-white py-6 shadow-[0_2px_10px_#0f172a14]"><span className="text-[13px]">{n[0].toUpperCase() + n.slice(1)}</span><I size={26} /></div>)}</div>
      </Wrap></Band>

      {/* component library */}
      <Band id="components" tone="white"><Wrap>
        <H title="Component Library" text="Components are organized by purpose, making the library easier to navigate and helping designers quickly find the right pattern for each interaction." />
        <div className="mt-10 grid grid-cols-1 [&>*]:min-w-0 gap-5 md:grid-cols-3">{[["Actions", "Button, Icon Button", <div key="a" className="flex gap-2">{["Default", "Hover", "Disabled"].map((s, i) => <span key={s} className="rounded-[6px] px-3 py-2 text-[10px] font-semibold text-white" style={{ background: i === 2 ? "#93c5fd" : i === 1 ? "#1d4ed8" : BL }}>LABEL</span>)}</div>], ["Navigation", "Tab", <div key="b" className="flex border border-[#cbd5e1] text-[12px]">{["Tab", "Tab", "Tab", "Tab"].map((t, i) => <span key={i} className="px-4 py-2" style={i === 0 ? { color: BL, background: "#fff", borderBottom: `2px solid ${BL}` } : { color: "#94a3b8" }}>{t}</span>)}</div>], ["Inputs", "Text Field: label, placeholder, helper text", <div key="c" className="flex gap-2">{["#cbd5e1", BL].map((b) => <span key={b} className="rounded-[6px] border px-3 py-2 text-[11px] text-[#64748b]" style={{ borderColor: b }}>Type here</span>)}</div>], ["Selection", "Checkbox, Radio, Switch", <div key="d" className="flex items-center gap-3"><i className="relative h-5 w-9 rounded-full" style={{ background: BL }}><b className="absolute left-[18px] top-0.5 h-4 w-4 rounded-full bg-white" /></i><i className="relative h-5 w-9 rounded-full bg-[#cbd5e1]"><b className="absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white" /></i><i className="flex h-5 w-5 items-center justify-center rounded text-white" style={{ background: BL }}><Check size={12} /></i></div>], ["Feedback", "Alert, Badge", <div key="e" className="rounded-[8px] border border-[#bfdbfe] bg-[#eff6ff] px-3 py-2 text-[11px]"><b>Alert title</b> · Supporting message</div>], ["Content", "Card with slots", <div key="f" className="w-40 rounded-[8px] border border-[#e2e8f0] bg-white p-2 text-[11px]"><b>Card title</b><div className="mt-1 rounded border border-dashed border-[#94a3b8] py-2 text-center text-[#64748b]">Slot content</div></div>]].map(([t, s, v], i) => (
          <div key={t as string} className="overflow-hidden rounded-[12px] border border-[#c7d2fe]"><div className="px-4 py-3" style={{ background: "#dbeafe" }}><p className="font-medium">{t as string}</p><p className="text-[12px] text-[#475569]">{s as string}</p></div><div className="flex h-[110px] items-center justify-center bg-[#f8fafc] p-3">{v as React.ReactNode}</div></div>))}
        </div>
        <div className="mt-8 text-center text-[clamp(22px,3vw,32px)] font-semibold" style={{ color: BL }}>54 Components · 165 Variants</div>
      </Wrap></Band>

      <Band tone="grey"><Wrap className="space-y-24">
        <div><H left title="Buttons" text="Buttons are built with semantic tokens and configurable properties. Size, emphasis, state and optional icons adjust inside one component while preserving structure." /><div className="mt-8 grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_280px]"><div className="min-w-0 overflow-x-auto"><ButtonMatrix /></div><Panel><p className="mb-2 text-[12px] font-semibold text-[#64748b]">Properties</p>{[["Type", "Primary, Secondary, Ghost, Danger"], ["State", "Default, Hover, Disabled"], ["Label text", "Label"], ["Show icon", "False"], ["Icon 1", "plus"]].map(([a, b]) => <p key={a} className="border-t border-[#eef2f7] py-1.5 text-[13px]"><b className="mr-2">{a}</b><span className="text-[#64748b]">{b}</span></p>)}</Panel></div></div>
        <div><H left title="Inputs" text="Inputs combine a label, field and supporting text. Predefined states ensure consistent feedback and predictable behavior." /><div className="mt-8 min-w-0 overflow-x-auto"><InputMatrix /></div></div>
        <div><H left title="Checkboxes, Radios & Switches" text="Selection controls support binary and multiple choices, with indeterminate and disabled states sharing one interaction model." /><div className="mt-8 min-w-0 overflow-x-auto"><SelectionMatrix /></div></div>
      </Wrap></Band>

      {/* anatomy */}
      <Band id="anatomy" tone="white"><Wrap>
        <H title="Clear Anatomy, Scalable Components" text="Each component is built from clearly defined elements, shared tokens and reusable subcomponents. Documented sizing, spacing and dependencies keep variants consistent." />
        <div className="mt-10 grid grid-cols-1 [&>*]:min-w-0 gap-6 md:grid-cols-2">{[["Button", ["1 · Container: radius/md, size/control/md", "2 · Leading icon: boolean + instance swap", "3 · Label: Label/Large text style", "4 · Trailing icon: boolean + instance swap"], <span key="b" className="rounded-[8px] px-5 py-3 text-[15px] font-medium text-white" style={{ background: BL }}>Button</span>], ["Card", ["1 · Slot / Media: Show media boolean", "2 · Slot / Header: Header content swap", "3 · Slot / Body: Body content swap", "4 · Slot / Footer: Show footer boolean"], <div key="c" className="w-48 space-y-1.5 rounded-[10px] border border-[#e2e8f0] bg-white p-2 text-[11px]">{["Media", "Header", "Body", "Footer"].map((s) => <div key={s} className="rounded border border-dashed px-2 py-1.5" style={{ borderColor: BL, color: BL }}>Slot / {s}</div>)}</div>]].map(([t, l, v]) => (
          <div key={t as string} className="flex flex-col gap-6 rounded-[14px] bg-[#f8fafc] p-6 sm:flex-row sm:items-center"><div className="flex min-h-[150px] flex-1 items-center justify-center rounded-[10px] bg-[#eef2f7]">{v as React.ReactNode}</div><div className="flex-1"><p className="mb-2 text-[18px] font-medium">{t as string}</p><ul className="space-y-2 text-[13px] text-[#475569]">{(l as string[]).map((x, i) => <li key={x} className="flex gap-2"><b className="flex h-5 w-5 flex-none items-center justify-center rounded-full bg-[#c2410c] text-[11px] text-white">{i + 1}</b>{x.slice(4)}</li>)}</ul></div></div>))}</div>
      </Wrap></Band>

      {/* slots */}
      <Band id="slot-method" tone="grey"><Wrap>
        <H title="Slot Method" text="A slot is a named, bounded region inside a component. It accepts swappable content so teams compose variations without detaching or rebuilding." />
        <div className="mt-10 grid grid-cols-1 [&>*]:min-w-0 gap-5 md:grid-cols-2">{[["Slot frame", "Auto-layout frame named \"Slot / Body\". Owns padding, gap and width, so dropped content keeps the layout."], ["Instance swap", "Property such as \"Body content\" replaces the default with any compatible component."], ["Boolean", "Properties such as \"Show media\" or \"Show footer\" hide a slot and the component re-hugs."], ["Documented bounds", "Each slot lists what it accepts and its reading order, so usage stays predictable."]].map(([t, d]) => <div key={t} className="rounded-[12px] border border-[#e2e8f0] bg-white p-5"><p className="font-medium">{t}</p><p className="mt-1 text-[14px] text-[#64748b]">{d}</p></div>)}</div>
        <div className="mt-8 grid grid-cols-1 [&>*]:min-w-0 gap-5 md:grid-cols-3">{[["A · Media + body text + actions", "One Card with an image slot, a short summary and a button group."], ["B · Header + Alert in body", "The same Card with a header and an Alert dropped into the body slot."], ["C · Media + body text", "The same Card with the footer hidden through a boolean."]].map(([t, d]) => <div key={t} className="rounded-[12px] border border-[#c7d2fe] bg-white p-5"><p className="font-medium">{t}</p><p className="mt-1 text-[14px] text-[#64748b]">{d}</p></div>)}</div>
        <div className="mt-8 overflow-x-auto rounded-[12px] border border-[#e2e8f0] bg-white"><table className="w-full min-w-[560px] border-collapse text-left text-[14px]"><thead><tr className="bg-[#f8fafc]">{["Component", "Slots", "Swap / boolean"].map((h) => <th key={h} className="px-4 py-3 font-semibold">{h}</th>)}</tr></thead><tbody>{[["Card", "Media · Header · Body · Footer", "Body content · Show media / header / footer"], ["Dialog", "Header · Body · Footer", "Body content · Footer content · Show footer"], ["Hero Banner", "Media · Content · Actions", "Media content · Show media / actions"], ["Page Header", "Leading · Actions", "Actions content · Show back / actions"]].map((r) => <tr key={r[0]} className="border-t border-[#e2e8f0]">{r.map((c, i) => <td key={i} className={`px-4 py-3 ${i ? "text-[#64748b]" : "font-medium"}`}>{c}</td>)}</tr>)}</tbody></table></div>
        <p className="mb-4 mt-14 text-center text-[24px] font-semibold">More slot components in practice</p>
        <div className="grid grid-cols-1 [&>*]:min-w-0 gap-5 md:grid-cols-3">{[["4 · Dialog", "Slots: Header, Body, Footer. The body slot takes a form, text or alert. The footer slot holds actions and can be hidden for read-only dialogs."], ["5 · Hero Banner", "Slots: Media, Content, Actions. The media slot holds a photo or the image placeholder; the actions slot is toggled off when the page needs no call to action."], ["6 · Page Header", "Slots: Leading, Actions. The leading slot shows a back button when the page is nested; the actions slot is swapped for the primary task of each page."], ["7 · Accordion Item", "Slots: Content. The content slot expands in place and can hold text, lists or media. Closed items hide the slot and re-hug."], ["8 · Alert", "Slots: Actions. The actions slot takes any button group. With it hidden the alert becomes a simple notice."], ["9 · Button", "Slots: Leading icon, Label, Trailing icon. Icon slots accept any icon through instance swap, so one Button covers text-only, leading and trailing icon cases."]].map(([t, d]) => <div key={t} className="rounded-[12px] border border-[#e2e8f0] bg-white p-5"><p className="font-medium">{t}</p><p className="mt-1 text-[14px] text-[#64748b]">{d}</p></div>)}</div>
      </Wrap></Band>

      {/* pages */}
      <Band id="pages" tone="white"><Wrap>
        <H title="Two Example Pages" text="Two full pages from the Page Examples library, built only from system components. Each is shown at desktop and mobile in the light theme." />
        <div className="mt-10 grid grid-cols-1 [&>*]:min-w-0 gap-8 md:grid-cols-2">{[["Page 1 · Homepage", "Hero banner, stats, story cards with imagery, FAQ accordion and footer. Desktop 1280 and Mobile 375."], ["Page 2 · Science inner page", "Breadcrumb, page header, image banner, alert, accordion list and footer. Desktop 1280 and Mobile 375."]].map(([t, d], i) => (
          <div key={t}><div className="overflow-hidden rounded-[14px] border border-[#e2e8f0] shadow-[0_10px_40px_#0f172a14]">{i === 0 ? <Stage w={1000} h={560}><Dash /></Stage> : <div className="p-4"><ThemePreview /></div>}</div><p className="mt-4 text-[20px] font-medium">{t}</p><p className="mt-1 text-[14px] text-[#64748b]">{d}</p></div>))}</div>
      </Wrap></Band>

      {/* themes */}
      <Band id="themes" tone="grey"><Wrap>
        <H title={<>From System to Interface — <span style={{ color: BL }}>Light</span> Theme</>} text="Neutral surfaces, subtle outlines and clear contrast keep healthcare information easy to scan while preserving a lightweight visual hierarchy." />
        <div className="mx-auto mt-10 max-w-[900px] overflow-hidden rounded-[16px] border border-[#e2e8f0] shadow-[0_10px_40px_#0f172a14]"><Stage w={1000} h={560}><Dash /></Stage></div>
      </Wrap></Band>
      <Band tone="dark"><Wrap>
        <H title={<><span style={{ color: "#60a5fa" }}>Dark</span> Theme</>} text="Semantic color variables remap surfaces, text, borders and interactive states while preserving the same hierarchy, structure and component behavior." />
        <div className="mx-auto mt-10 max-w-[900px] overflow-hidden rounded-[16px] border border-[#334155]"><Stage w={1000} h={560}><Dash dark /></Stage></div>
        <p className="mx-auto mt-6 max-w-[720px] text-center text-[14px]" style={{ opacity: 0.7 }}>Layout, Spacing, Size and Typography collections switch by viewport; Color and Component collections switch by theme.</p>
      </Wrap></Band>

      {/* quality + outcome */}
      <Band id="quality" tone="white"><Wrap>
        <H title="Accessible by default, governed by process" />
        <div className="mt-10 grid grid-cols-1 [&>*]:min-w-0 gap-5 md:grid-cols-2">{[["Accessibility", "Contrast-checked color pairs, 44px touch targets, visible focus, semantic names for assistive tech."], ["Documentation", "Each component: variants, anatomy, usage, do and don’t, three viewports in both themes."], ["Handoff", "Storybook mapping, token names matching code, Code Connect ready structure."], ["Governance", "Contribution steps, versioned changelog, review checklist."]].map(([t, d]) => <div key={t} className="rounded-[12px] border border-[#e2e8f0] bg-[#f8fafc] p-6"><p className="text-[18px] font-medium">{t}</p><p className="mt-1 text-[14px] text-[#64748b]">{d}</p></div>)}</div>
        <div className="mt-16"><H title="A system that scales with the content" /><div className="mt-8 grid grid-cols-1 [&>*]:min-w-0 gap-5 md:grid-cols-2">{[["Consistent", "Consistent components across three viewports and two themes."], ["Layered tokens", "Tokens in three layers: change once, update everywhere."], ["Composable", "Slots let teams compose pages without detaching."], ["Ready to extend", "Contribution and governance in place."]].map(([t, d]) => <div key={t} className="rounded-[12px] border border-[#e2e8f0] p-6"><p className="text-[18px] font-medium">{t}</p><p className="mt-1 text-[14px] text-[#64748b]">{d}</p></div>)}</div></div>
      </Wrap></Band>

      {/* thank you */}
      <section className="relative overflow-hidden py-24 text-center text-white" style={{ background: BL }}><Wrap>
        <h2 className="text-[clamp(52px,11vw,140px)] font-extrabold leading-none tracking-[-0.03em]">Thank You!</h2>
        <p className="mt-6 text-[18px] font-medium">MEDORA Design System · Tokens · Components · Themes</p>
        <p className="mt-2 text-[15px]" style={{ opacity: 0.85 }}>Vignesh K · Senior UI/UX & AI Designer</p>
      </Wrap></section>
      <Band id="more-work" tone="grey"><Wrap><p className="mb-6 text-[28px] font-semibold">More of my work</p><MoreWork current={p.slug} /></Wrap></Band>
    </div>
  );
}
