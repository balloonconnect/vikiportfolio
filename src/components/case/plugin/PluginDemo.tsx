"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, Moon, Sun, Undo2, ScanLine, Sparkles, Target } from "lucide-react";

type Cat = "Variables" | "Typography" | "Colors" | "Components" | "Accessibility" | "Collections";
type Issue = { id: string; cat: Cat; title: string; sub: string; from: string; to: string; layers: number; safe: boolean; match: number; swatch?: string };

const ISSUES: Issue[] = [
  { id: "c1", cat: "Colors", title: "Raw color · token available", sub: "Model + 4 more", from: "#114E68", to: "Secondary / Secondary_700", layers: 5, safe: true, match: 99, swatch: "#114E68" },
  { id: "a1", cat: "Accessibility", title: "Contrast below AA", sub: "Button label + 4 more", from: "4.2 : 1", to: "Secondary / Secondary_800", layers: 5, safe: false, match: 86, swatch: "#1b6f94" },
  { id: "v1", cat: "Variables", title: "Padding not bound", sub: "Card + 11 more", from: "16 px", to: "Spacing / 16", layers: 12, safe: true, match: 100 },
  { id: "t1", cat: "Typography", title: "Text style not linked", sub: "Caption + 2 more", from: "Inter 11 / 16", to: "Body / Small", layers: 3, safe: false, match: 92 },
  { id: "p1", cat: "Components", title: "External library instance", sub: "Button / Primary", from: "Legacy UI Kit", to: "In-file Button / Primary", layers: 7, safe: false, match: 94 },
  { id: "v2", cat: "Variables", title: "Gap not bound", sub: "Toolbar + 3 more", from: "12 px", to: "Spacing / 12", layers: 4, safe: true, match: 100 },
];
const TABS: ("All" | Cat)[] = ["All", "Variables", "Typography", "Colors", "Components", "Accessibility", "Collections"];
const SCORE = [100, 95, 92, 90, 89, 88, 86]; // index = issue groups remaining
const STEPS = ["Loading tokens", "Walking layers", "Matching values", "Grouping by signature"];
const ease = [0.22, 1, 0.36, 1] as const;

type Phase = "idle" | "scanning" | "results";

export function PluginDemo({ accent = "#5b4fe0" }: { accent?: string }) {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("idle");
  const [progress, setProgress] = useState(0);
  const [dark, setDark] = useState(false);
  const [tab, setTab] = useState<(typeof TABS)[number]>("All");
  const [open, setOpen] = useState<string[]>([]); // remaining issue ids
  const [lastBatch, setLastBatch] = useState<string[]>([]); // for undo
  const [toast, setToast] = useState("");
  const raf = useRef(0);

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  const run = () => {
    setPhase("scanning"); setProgress(0); setLastBatch([]); setToast("");
    const t0 = performance.now(); const dur = reduce ? 200 : 1900;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / dur); setProgress(p);
      if (p < 1) raf.current = requestAnimationFrame(tick);
      else { setOpen(ISSUES.map((i) => i.id)); setTab("All"); setPhase("results"); }
    };
    raf.current = requestAnimationFrame(tick);
  };

  const remaining = useMemo(() => ISSUES.filter((i) => open.includes(i.id)), [open]);
  const shown = tab === "All" ? remaining : remaining.filter((i) => i.cat === tab);
  const safe = remaining.filter((i) => i.safe);
  const count = (c: (typeof TABS)[number]) => (c === "All" ? remaining.length : remaining.filter((i) => i.cat === c).length);
  const score = SCORE[remaining.length];

  const apply = (ids: string[]) => {
    if (!ids.length) return;
    setOpen((o) => o.filter((x) => !ids.includes(x))); setLastBatch(ids);
    setToast(`Fixed ${ids.length} issue${ids.length > 1 ? "s" : ""} · undo with ⌘Z`);
  };
  const undo = () => { setOpen((o) => [...o, ...lastBatch]); setLastBatch([]); setToast(""); };
  const ignore = (id: string) => setOpen((o) => o.filter((x) => x !== id));

  // keyboard undo, scoped to the demo having a batch
  useEffect(() => {
    const k = (e: KeyboardEvent) => { if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "z" && lastBatch.length) { e.preventDefault(); undo(); } };
    addEventListener("keydown", k); return () => removeEventListener("keydown", k);
  });
  useEffect(() => { if (!toast) return; const t = setTimeout(() => setToast(""), 4200); return () => clearTimeout(t); }, [toast]);

  const th = dark
    ? { bg: "#16161a", card: "#1f1f25", fg: "#f4f4f6", mute: "#9a9aa6", line: "#2f2f38", chip: "#2a2a33" }
    : { bg: "#f7f7f9", card: "#ffffff", fg: "#17171c", mute: "#6d6d78", line: "#e4e4ea", chip: "#eeeef3" };
  const R = 30, C = 2 * Math.PI * R;
  const stepIdx = Math.min(STEPS.length - 1, Math.floor(progress * STEPS.length));
  const shownScore = phase === "results" ? score : 0;

  return (
    <div role="group" aria-label="Interactive plugin demo" className="mx-auto w-full max-w-[440px] select-none overflow-hidden rounded-[20px] border shadow-[0_10px_50px_#00000024] transition-colors duration-300"
      style={{ background: th.bg, color: th.fg, borderColor: th.line }} data-cursor="grow">
      {/* header */}
      <div className="flex items-center justify-between px-4 py-3" style={{ background: th.card, borderBottom: `1px solid ${th.line}` }}>
        <div className="flex items-center gap-3">
          <span className="grid size-9 grid-cols-2 gap-[3px] rounded-[10px] p-[7px]" style={{ background: accent }} aria-hidden>{[0, 1, 2, 3].map((i) => <span key={i} className="rounded-[3px] bg-white" style={{ opacity: i === 3 ? 0.55 : 1 }} />)}</span>
          <div><p className="text-[14px] font-bold leading-tight">Global Design Check</p><p className="text-[11px]" style={{ color: th.mute }}>Design system governance</p></div>
        </div>
        <button onClick={() => setDark((d) => !d)} aria-label={dark ? "Switch to light theme" : "Switch to dark theme"} className="press grid size-8 place-items-center rounded-[10px]" style={{ border: `1px solid ${th.line}` }}>
          {dark ? <Sun size={15} /> : <Moon size={15} />}
        </button>
      </div>

      {/* health */}
      <div className="flex items-center gap-4 px-4 py-4">
        <div className="relative size-[72px] shrink-0">
          <svg viewBox="0 0 72 72" className="-rotate-90"><circle cx="36" cy="36" r={R} fill="none" stroke={th.line} strokeWidth="6" />
            <motion.circle cx="36" cy="36" r={R} fill="none" stroke={shownScore >= 90 ? "#16a36a" : "#d97706"} strokeWidth="6" strokeLinecap="round" strokeDasharray={C}
              animate={{ strokeDashoffset: C * (1 - (phase === "scanning" ? progress : shownScore / 100)) }} transition={{ duration: reduce ? 0 : 0.5, ease }} /></svg>
          <span className="absolute inset-0 grid place-items-center text-[20px] font-bold tabular-nums">{phase === "idle" ? "–" : phase === "scanning" ? Math.round(progress * 100) : shownScore}</span>
        </div>
        <div className="min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-[0.12em]" style={{ color: th.mute }}>Project health</p>
          <p className="text-[17px] font-bold" aria-live="polite">{phase === "idle" ? "Not scanned yet" : phase === "scanning" ? "Scanning…" : remaining.length === 0 ? "Healthy, no issues" : `${shownScore >= 90 ? "Healthy" : "Good"}, ${remaining.length} issue groups`}</p>
          <p className="text-[12px]" style={{ color: th.mute }}>{phase === "scanning" ? `${STEPS[stepIdx]} · ${Math.round(progress * 258)} layers` : phase === "results" ? "258 layers scanned in 0.7 s" : "Scan the selection, page or file"}</p>
        </div>
      </div>
      <div className="px-4 pb-4">
        <button onClick={run} disabled={phase === "scanning"} className="press flex w-full items-center justify-center gap-2 rounded-[12px] py-[10px] text-[14px] font-bold text-white disabled:opacity-70" style={{ background: accent }}>
          {phase === "scanning" ? <ScanLine size={16} className="anim-bob" /> : <Sparkles size={16} />}{phase === "idle" ? "Run Design Check" : phase === "scanning" ? "Scanning…" : "Rescan"}
        </button>
      </div>

      {/* tabs */}
      <div className="flex gap-1 overflow-x-auto px-3 [scrollbar-width:none]" role="tablist" style={{ borderTop: `1px solid ${th.line}`, borderBottom: `1px solid ${th.line}`, background: th.card }}>
        {TABS.map((t) => (
          <button key={t} role="tab" aria-selected={tab === t} onClick={() => setTab(t)} disabled={phase !== "results"} className="relative shrink-0 px-2 py-3 text-[12px] font-semibold disabled:opacity-50" style={{ color: tab === t ? th.fg : th.mute }}>
            {t} <span className="ml-1 rounded-full px-[6px] py-[1px] text-[10px]" style={{ background: th.chip }}>{phase === "results" ? count(t) : "–"}</span>
            {tab === t && <motion.span layoutId="demo-tab" className="absolute inset-x-1 bottom-0 h-[2px] rounded-full" style={{ background: accent }} transition={{ duration: reduce ? 0 : 0.24, ease }} />}
          </button>
        ))}
      </div>

      {/* body */}
      <div className="relative h-[372px] overflow-y-auto p-3" style={{ background: th.bg }}>
        {phase === "idle" && <Empty th={th} title="Ready to check your design" text="Run the check to find unlinked variables, raw colors, legacy components and contrast problems." />}
        {phase === "scanning" && (
          <div className="grid h-full place-content-center gap-4 text-center">
            <div className="mx-auto h-[6px] w-[220px] overflow-hidden rounded-full" style={{ background: th.line }}><div className="h-full rounded-full" style={{ width: `${progress * 100}%`, background: accent }} /></div>
            <ul className="space-y-1 text-[12px]">{STEPS.map((s, i) => <li key={s} className="flex items-center justify-center gap-2" style={{ color: i <= stepIdx ? th.fg : th.mute, opacity: i <= stepIdx ? 1 : 0.5, transition: "opacity .24s" }}>{i < stepIdx ? <Check size={12} /> : <span className="size-[6px] rounded-full" style={{ background: i === stepIdx ? accent : th.line }} />}{s}</li>)}</ul>
          </div>
        )}
        {phase === "results" && (
          shown.length === 0
            ? <Empty th={th} ok title={remaining.length === 0 ? "Design System Compliant" : `No ${tab.toLowerCase()} issues`} text={remaining.length === 0 ? "All variables, styles, colors and components are properly connected." : "Nothing to review in this view."} />
            : <ul className="space-y-3">
                <AnimatePresence initial={false}>
                  {shown.map((i) => (
                    <motion.li key={i.id} layout={!reduce} initial={reduce ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={reduce ? undefined : { opacity: 0, x: 40, height: 0, marginBottom: 0 }} transition={{ duration: 0.32, ease }}
                      className="overflow-hidden rounded-[14px] p-3" style={{ background: th.card, border: `1px solid ${th.line}` }}>
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0"><p className="text-[13px] font-bold">{i.title}</p><p className="text-[11px]" style={{ color: th.mute }}>{i.sub}</p></div>
                        <div className="flex shrink-0 gap-1">{i.safe && <span className="rounded-md px-[6px] py-[2px] text-[10px] font-bold" style={{ background: `${accent}22`, color: accent }}>Safe</span>}<span className="rounded-md px-[6px] py-[2px] text-[10px] font-bold" style={{ background: i.match >= 95 ? "#16a36a22" : "#d9770622", color: i.match >= 95 ? "#16a36a" : "#d97706" }}>{i.match}% match</span></div>
                      </div>
                      <div className="mt-2 grid grid-cols-[1fr_auto_1fr] items-center gap-2 rounded-[10px] px-3 py-2 text-[12px]" style={{ background: th.bg }}>
                        <span className="flex min-w-0 items-center gap-2"><span className="size-3 shrink-0 rounded-[3px]" style={{ background: i.swatch ?? th.mute }} /><span className="truncate">{i.from}</span></span>
                        <span aria-hidden style={{ color: th.mute }}>→</span>
                        <span className="truncate font-semibold" style={{ color: accent }}>{i.to}</span>
                      </div>
                      <div className="mt-2 flex items-center justify-between text-[11px]" style={{ color: th.mute }}>
                        <span>{i.layers} layers</span>
                        <span className="flex items-center gap-2">
                          <button onClick={() => ignore(i.id)} className="press px-1 font-semibold">Ignore</button>
                          <button className="press flex items-center gap-1 rounded-lg px-2 py-1 font-semibold" style={{ border: `1px solid ${th.line}`, color: th.fg }}><Target size={11} />Select layers</button>
                          <button onClick={() => apply([i.id])} className="press rounded-lg px-3 py-1 font-bold text-white" style={{ background: accent }}>{i.safe ? "Apply" : "Fix"}</button>
                        </span>
                      </div>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
        )}
        <AnimatePresence>
          {toast && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 16 }} transition={{ duration: 0.24, ease }} role="status"
              className="sticky bottom-0 mt-3 flex items-center justify-between gap-3 rounded-[12px] px-3 py-2 text-[12px] font-semibold" style={{ background: th.fg, color: th.bg }}>
              <span className="flex items-center gap-2"><Check size={14} />{toast}</span>
              <button onClick={undo} className="press flex items-center gap-1 underline"><Undo2 size={12} />Undo</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* footer */}
      <div className="flex items-center justify-between gap-3 px-4 py-3" style={{ background: th.card, borderTop: `1px solid ${th.line}` }}>
        <span className="text-[12px]" style={{ color: th.mute }}>{phase === "results" ? `${safe.length} safe fix${safe.length === 1 ? "" : "es"} ready` : "Safe fixes undo in one step"}</span>
        <button onClick={() => apply(safe.map((s) => s.id))} disabled={phase !== "results" || safe.length === 0} className="press rounded-[12px] px-4 py-2 text-[13px] font-bold text-white disabled:opacity-40" style={{ background: accent }}>
          Fix All Safe Issues{safe.length ? ` (${safe.length})` : ""}
        </button>
      </div>
    </div>
  );
}

function Empty({ th, title, text, ok }: { th: { fg: string; mute: string; line: string }; title: string; text: string; ok?: boolean }) {
  return (
    <div className="grid h-full place-content-center justify-items-center gap-2 px-6 text-center">
      <span className="grid size-12 place-items-center rounded-full" style={{ background: ok ? "#16a36a22" : th.line, color: ok ? "#16a36a" : th.mute }}>{ok ? <Check size={22} /> : <ScanLine size={22} />}</span>
      <p className="text-[14px] font-bold" style={{ color: th.fg }}>{title}</p><p className="text-[12px]" style={{ color: th.mute }}>{text}</p>
    </div>
  );
}
