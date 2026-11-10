"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";

// Numbers count up once when scrolled into view.
export function CountUp({ to, suffix = "", duration = 1.2 }: { to: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null); const inView = useInView(ref, { once: true, margin: "-10% 0px" }); const reduce = useReducedMotion();
  const [v, setV] = useState(reduce ? to : 0);
  useEffect(() => {
    if (!inView || reduce) { if (reduce) setV(to); return; }
    let raf = 0; const t0 = performance.now();
    const tick = (t: number) => { const p = Math.min(1, (t - t0) / (duration * 1000)); setV(Math.round(to * (1 - Math.pow(1 - p, 3)))); if (p < 1) raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick); return () => cancelAnimationFrame(raf);
  }, [inView, to, duration, reduce]);
  return <span ref={ref} className="tabular-nums">{v}{suffix}</span>;
}

export function OutcomeStats({ items }: { items: [number, string, string?][] }) {
  return (
    <div className="grid gap-8 sm:grid-cols-3">{items.map(([n, label, suffix]) => (
      <div key={label}><p className="text-[clamp(40px,5vw,64px)] leading-none tracking-[-0.02em]"><CountUp to={n} suffix={suffix} /></p><p className="mt-2 text-[15px] text-muted">{label}</p></div>
    ))}</div>
  );
}

// Pipeline that lights up step by step while in view; hovering a step pins it.
export function AnimatedPipeline({ steps }: { steps: string[] }) {
  const ref = useRef<HTMLOListElement>(null); const inView = useInView(ref, { margin: "-15% 0px" }); const reduce = useReducedMotion();
  const [i, setI] = useState(0); const [pin, setPin] = useState<number | null>(null);
  useEffect(() => { if (!inView || reduce || pin !== null) return; const t = setInterval(() => setI((x) => (x + 1) % steps.length), 900); return () => clearInterval(t); }, [inView, reduce, pin, steps.length]);
  const cur = pin ?? i;
  return (
    <ol ref={ref} className="flex flex-wrap items-center gap-2 text-[14px]">
      {steps.map((s, k) => (
        <li key={s} className="flex items-center gap-2">
          <button onMouseEnter={() => setPin(k)} onMouseLeave={() => setPin(null)} onFocus={() => setPin(k)} onBlur={() => setPin(null)} data-cursor="grow"
            className="rounded-full border px-4 py-2 transition-[background-color,color,transform,border-color] duration-[240ms] ease-spring"
            style={{ background: k === cur ? "var(--fg)" : "var(--surface)", color: k === cur ? "var(--bg)" : "var(--fg)", borderColor: k <= cur ? "var(--border)" : "var(--secondary)", transform: k === cur ? "scale(1.06)" : "scale(1)" }}>{s}</button>
          {k < steps.length - 1 && <span aria-hidden className="text-muted transition-opacity duration-200" style={{ opacity: k < cur ? 1 : 0.35 }}>→</span>}
        </li>
      ))}
    </ol>
  );
}

// Tabs that crossfade between prototype flow screenshots.
export function FlowTabs({ flows }: { flows: { label: string; src: string; alt: string; w: number; h: number }[] }) {
  const [a, setA] = useState(0); const reduce = useReducedMotion(); const f = flows[a];
  return (
    <div>
      <div role="tablist" className="mb-4 flex flex-wrap gap-2">
        {flows.map((x, k) => (
          <button key={x.label} role="tab" aria-selected={k === a} onClick={() => setA(k)} data-cursor="grow"
            className="press rounded-full border px-4 py-2 text-[14px]" style={{ background: k === a ? "var(--fg)" : "transparent", color: k === a ? "var(--bg)" : "var(--fg)", borderColor: k === a ? "var(--fg)" : "var(--secondary)" }}>{x.label}</button>
        ))}
      </div>
      <div className="overflow-hidden rounded-[6px] border border-secondary bg-surface">
        <AnimatePresence mode="wait" initial={false}>
          <motion.img key={f.src} src={f.src} alt={f.alt} width={f.w} height={f.h} className="h-auto w-full"
            initial={reduce ? false : { opacity: 0, scale: 0.985 }} animate={{ opacity: 1, scale: 1 }} exit={reduce ? undefined : { opacity: 0 }} transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }} />
        </AnimatePresence>
      </div>
    </div>
  );
}
