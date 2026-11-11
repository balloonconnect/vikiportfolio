"use client";
import { Drift } from "@/components/Parallax";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

const B = "/case/medisystem-ai";
type Item = { n: string; label: string; src: string };
const mk = (d: string, names: string[]): Item[] => names.map((label, i) => { const n = String(i + 1).padStart(2, "0"); return { n, label, src: `${B}/${d}/${n}-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.webp` }; });

export const flows = {
  "Patient desktop": { w: 1440, h: 900, items: mk("pd", ["Login", "Dashboard", "Medical records", "Upload report", "AI processing", "Processing failed", "Report explanation", "AI chat", "Report history", "Appointments", "Book appointment", "Booking confirmed", "Prescriptions", "Messages", "Profile", "Privacy and consent", "Notifications", "Access control", "Empty state"]) },
  "Patient mobile": { w: 390, h: 844, items: mk("pm", ["Onboarding", "Login", "Home", "Records", "Report detail", "Upload", "Photo tips", "AI processing", "Processing failed", "Explanation", "AI chat", "History", "Appointments", "Book", "Confirmed", "Prescriptions", "Notifications", "Profile"]) },
  "Doctor desktop": { w: 1440, h: 900, items: mk("dd", ["Login", "Dashboard", "Patient list", "Patient profile", "Reports", "Report viewer", "AI summary review", "Approved", "Clinical notes", "Follow-up", "Appointments", "Messages", "Prescriptions", "No permission", "Audit log", "Confirm approve", "Settings"]) },
} as const;
type K = keyof typeof flows;

// All 54 prototype screens, grouped by surface. Click a screen to open it large; arrow keys step through.
export function ProtoFlows() {
  const [k, setK] = useState<K>("Patient desktop");
  const [open, setOpen] = useState<number | null>(null);
  const f = flows[k]; const mobile = f.w < 500;
  useEffect(() => {
    if (open === null) return;
    const on = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((i) => (i === null ? i : Math.min(f.items.length - 1, i + 1)));
      if (e.key === "ArrowLeft") setOpen((i) => (i === null ? i : Math.max(0, i - 1)));
    };
    addEventListener("keydown", on); document.body.style.overflow = "hidden";
    return () => { removeEventListener("keydown", on); document.body.style.overflow = ""; };
  }, [open, f.items.length]);
  const cur = open === null ? null : f.items[open];
  return (
    <div>
      <div role="tablist" className="mb-6 flex flex-wrap gap-2">
        {(Object.keys(flows) as K[]).map((n) => (
          <button key={n} role="tab" aria-selected={k === n} onClick={() => { setK(n); setOpen(null); }} data-cursor="grow"
            className="rounded-full border px-4 py-2 text-[14px] transition-colors duration-200"
            style={{ background: k === n ? "var(--fg)" : "var(--surface)", color: k === n ? "var(--bg)" : "var(--fg)", borderColor: "var(--border)" }}>{n} · {flows[n].items.length}</button>
        ))}
      </div>
      <ol className={`grid gap-4 ${mobile ? "grid-cols-3 md:grid-cols-6" : "grid-cols-2 md:grid-cols-3"}`}>
        {f.items.map((it, i) => (
          <li key={it.src}>
            <Drift amount={10}><button onClick={() => setOpen(i)} data-cursor="grow" className="group block w-full text-left" aria-label={`Open ${it.n} ${it.label}`}>
              <div className="overflow-hidden rounded-[6px] border border-secondary bg-surface transition-[transform,box-shadow] duration-[240ms] ease-spring group-hover:-translate-y-1 group-hover:shadow-[0_10px_30px_#0000001f]">
                <img src={it.src} alt={`${k}: ${it.label}`} width={f.w} height={f.h} loading="lazy" className="h-auto w-full" />
              </div>
              <p className="mt-2 text-[13px] text-muted">{it.n} · {it.label}</p>
            </button></Drift>
          </li>
        ))}
      </ol>
      {typeof document !== "undefined" && createPortal(<AnimatePresence>
        {cur && (
          <motion.div key="lb" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[2000] flex flex-col items-center justify-center gap-4 bg-black/80 p-4 backdrop-blur-sm" onClick={() => setOpen(null)} role="dialog" aria-modal="true" aria-label={cur.label}>
            <img src={cur.src} alt={`${k}: ${cur.label}`} onClick={(e) => e.stopPropagation()} className="max-h-[82vh] max-w-full rounded-[8px] bg-white object-contain" />
            <div className="flex items-center gap-4 text-[14px] text-white" onClick={(e) => e.stopPropagation()}>
              <button className="rounded-full border border-white/40 px-4 py-1.5 disabled:opacity-30" disabled={open === 0} onClick={() => setOpen((open ?? 0) - 1)}>← Prev</button>
              <span>{cur.n} · {cur.label} <span className="opacity-60">({(open ?? 0) + 1}/{f.items.length})</span></span>
              <button className="rounded-full border border-white/40 px-4 py-1.5 disabled:opacity-30" disabled={open === f.items.length - 1} onClick={() => setOpen((open ?? 0) + 1)}>Next →</button>
              <button className="rounded-full border border-white/40 px-4 py-1.5" onClick={() => setOpen(null)}>Close</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>, document.body)}
    </div>
  );
}
