"use client";
import { Drift } from "@/components/Parallax";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

const S = "/case/global-design-check/screens";
const W = 420, H = 700;

// Seven views: pick a card, see that tab in the plugin. Text is the original feature copy.
export function ViewsExplorer({ items }: { items: { title: string; text: string; src: string }[] }) {
  const [i, setI] = useState(0);
  const cur = items[i];
  return (
    <div className="grid items-start gap-8 md:grid-cols-[minmax(0,1fr)_340px] md:gap-10">
      <div className="order-2 grid gap-3 md:order-1">
        {items.map((it, k) => (
          <button key={it.title} onClick={() => setI(k)} onMouseEnter={() => setI(k)} onFocus={() => setI(k)} data-cursor="grow" aria-pressed={k === i}
            className="rounded-[6px] border bg-surface p-5 text-left transition-[transform,border-color,box-shadow] duration-[240ms] ease-spring"
            style={{ borderColor: k === i ? "var(--fg)" : "var(--secondary)", transform: k === i ? "translateX(4px)" : "none", boxShadow: k === i ? "0 10px 30px #0000001a" : "none" }}>
            <p className="text-[18px] font-semibold">{it.title}</p><p className="mt-1 text-[15px] leading-[24px] text-muted">{it.text}</p>
          </button>
        ))}
      </div>
      <div className="order-1 md:order-2 md:sticky md:top-28">
        <div className="overflow-hidden rounded-[6px] border border-secondary bg-surface">
          <AnimatePresence mode="wait" initial={false}>
            <motion.img key={cur.src} src={cur.src} alt={`${cur.title} tab of the plugin`} width={W} height={H} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }} className="h-auto w-full" />
          </AnimatePresence>
        </div>
        <p className="mt-3 text-[14px] text-muted">{cur.title} tab · 420 px</p>
      </div>
    </div>
  );
}

// Key states of the plugin. Click one to view it large.
export function StatesRow({ items }: { items: { label: string; src: string }[] }) {
  const [open, setOpen] = useState<number | null>(null);
  useEffect(() => {
    if (open === null) return;
    const on = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(null); if (e.key === "ArrowRight") setOpen((x) => (x === null ? x : Math.min(items.length - 1, x + 1))); if (e.key === "ArrowLeft") setOpen((x) => (x === null ? x : Math.max(0, x - 1))); };
    addEventListener("keydown", on); document.body.style.overflow = "hidden";
    return () => { removeEventListener("keydown", on); document.body.style.overflow = ""; };
  }, [open, items.length]);
  const cur = open === null ? null : items[open];
  return (
    <div>
      <ol className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {items.map((it, k) => (
          <li key={it.src}><Drift amount={10}><button onClick={() => setOpen(k)} data-cursor="grow" className="group block w-full text-left" aria-label={`Open ${it.label}`}>
            <div className="overflow-hidden rounded-[6px] border border-secondary bg-surface transition-[transform,box-shadow] duration-[240ms] ease-spring group-hover:-translate-y-1 group-hover:shadow-[0_10px_30px_#0000001f]"><img src={it.src} alt={it.label} width={W} height={H} loading="lazy" className="h-auto w-full" /></div>
            <p className="mt-2 text-[13px] text-muted">{it.label}</p></button></Drift></li>
        ))}
      </ol>
      {typeof document !== "undefined" && createPortal(<AnimatePresence>{cur && (
        <motion.div key="lb" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="fixed inset-0 z-[2000] flex flex-col items-center justify-center gap-4 bg-black/80 p-4 backdrop-blur-sm" onClick={() => setOpen(null)} role="dialog" aria-modal="true" aria-label={cur.label}>
          <img src={cur.src} alt={cur.label} onClick={(e) => e.stopPropagation()} className="max-h-[82vh] max-w-full rounded-[8px] bg-white object-contain" />
          <div className="flex items-center gap-4 text-[14px] text-white" onClick={(e) => e.stopPropagation()}>
            <button className="rounded-full border border-white/40 px-4 py-1.5 disabled:opacity-30" disabled={open === 0} onClick={() => setOpen((open ?? 0) - 1)}>← Prev</button>
            <span>{cur.label}</span>
            <button className="rounded-full border border-white/40 px-4 py-1.5 disabled:opacity-30" disabled={open === items.length - 1} onClick={() => setOpen((open ?? 0) + 1)}>Next →</button>
            <button className="rounded-full border border-white/40 px-4 py-1.5" onClick={() => setOpen(null)}>Close</button>
          </div>
        </motion.div>)}</AnimatePresence>, document.body)}
    </div>
  );
}
