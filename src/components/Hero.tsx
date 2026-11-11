"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MapPin, Clock, ChevronDown } from "lucide-react";
import { site } from "@/data/site";
import { projects } from "@/data/projects";
import { Placeholder } from "./Placeholder";

// 9 tiles on a 6 x 2 grid: row 1 = 2+1+1+2 columns, row 2 = 1+1+2+1+1.
const spans = [2, 1, 1, 2, 1, 1, 2, 1, 1];

function useClock() {
  const [t, setT] = useState("");
  useEffect(() => {
    const f = () => setT(new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit", timeZone: site.timeZone, timeZoneName: "short" }).format(new Date()));
    f();
    const id = setInterval(f, 30000);
    return () => clearInterval(id);
  }, []);
  return t;
}

// Deterministic scatter offsets so server and client render the same markup.
const scatter = (i: number) => ({ x: ((i * 53) % 120) - 60, y: ((i * 37) % 90) - 30, rotate: ((i * 29) % 24) - 12 });

function hoursBehind() {
  try {
    const off = (tz: string) => { const d = new Date(); const l = new Date(d.toLocaleString("en-US", { timeZone: tz })); return (l.getTime() - d.getTime()) / 36e5; };
    const diff = off(site.timeZone) - off(Intl.DateTimeFormat().resolvedOptions().timeZone);
    if (Math.abs(diff) < 0.05) return "Same time as you";
    return `${Math.abs(diff).toFixed(1).replace(".0", "")} hours ${diff > 0 ? "ahead of" : "behind"} you`;
  } catch { return ""; }
}

export function Hero() {
  const reduce = useReducedMotion();
  const time = useClock();
  const [canDrag, setCanDrag] = useState(false);
  const [order, setOrder] = useState(() => spans.map((_, i) => i));
  const [tip, setTip] = useState(false);
  const tipText = tip ? hoursBehind() : "";
  const swapAt = (from: number, x: number, y: number) => {
    const el = document.elementsFromPoint(x, y).find((n) => (n as HTMLElement).dataset?.tile && Number((n as HTMLElement).dataset.tile) !== from) as HTMLElement | undefined;
    if (!el) return;
    const to = Number(el.dataset.tile);
    setOrder((o) => { const n = [...o]; const a = n.indexOf(from), b = n.indexOf(to); [n[a], n[b]] = [n[b], n[a]]; return n; });
  };
  useEffect(() => { setCanDrag(!reduce && matchMedia("(hover: hover) and (pointer: fine)").matches); }, [reduce]);
  const words = site.headline.split(" ");
  return (
    <section id="home" className="relative flex min-h-[100svh] flex-col justify-center pt-[110px] pb-12 max-lg:min-h-0">
      <div className="wrap w-full">
        <h1 className="h-display max-w-[760px]" aria-label={site.headline}>
          {words.map((w, i) => (
            <motion.span key={i} aria-hidden className="inline-block pr-[0.25em]"
              initial={reduce ? false : { opacity: 0, filter: "blur(10px)", y: 8 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{ duration: 0.68, delay: 0.04 * i, ease: [0.22, 1, 0.36, 1] }}>{w}</motion.span>
          ))}
        </h1>
        <motion.p initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.68 }}
          className="mt-6 max-w-[569px] text-[clamp(18px,1.6vw,21px)] leading-[1.4] text-muted">
          {site.subline} @ <span className="rounded-md bg-black/5 px-2 py-[2px] text-fg dark:bg-white/10">{site.employer}</span>
        </motion.p>
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-[15px] text-muted lg:justify-end lg:-mt-8">
          <span className="flex items-center gap-2"><MapPin size={16} />{site.location}</span>
          <span className="relative flex cursor-default items-center gap-2" suppressHydrationWarning onMouseEnter={() => setTip(true)} onMouseLeave={() => setTip(false)}>
            <Clock size={16} />{time || " "}
            <AnimatePresence>{tipText && (
              <motion.span initial={{ opacity: 0, y: 6, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 6, scale: 0.96 }} transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
                className="absolute bottom-full right-0 mb-2 whitespace-nowrap rounded-lg border border-border bg-bg px-3 py-2 text-[12px] text-fg shadow-lg">{tipText}</motion.span>
            )}</AnimatePresence>
          </span>
        </div>

        {/* Draggable glass tiles: 6 x 2 grid that scales with its container (u = width / 1272). */}
        <div className="mt-[74px] w-full max-lg:mt-6" style={{ containerType: "inline-size" }}>
          <div className="grid aspect-[1272/408] grid-cols-6 grid-rows-2" style={{ "--u": "calc(100cqw / 1272)", gap: "calc(24 * var(--u))" } as React.CSSProperties}>
            {order.map((tile, slot) => {
              const p = projects[tile % projects.length];
              const sc = scatter(tile);
              return (
                <motion.div key={tile} layout={!reduce} data-tile={tile} style={{ gridColumn: `span ${spans[slot]}` }}
                  initial={reduce ? false : { opacity: 0, ...sc, scale: 0.9 }} animate={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }}
                  transition={{ type: "spring", stiffness: 120, damping: 18, delay: 0.35 + 0.06 * tile, layout: { type: "spring", stiffness: 260, damping: 30 } }}>
                  <motion.div
                    drag={canDrag} dragSnapToOrigin dragElastic={1} dragMomentum={false}
                    whileDrag={{ scale: 1.03, zIndex: 30, cursor: "grabbing" }}
                    onDragEnd={(e) => { const pt = e as PointerEvent; if (pt.clientX != null) swapAt(tile, pt.clientX, pt.clientY); }}
                    data-cursor={canDrag ? "Drag me around" : undefined} draggable={false}
                    className="relative size-full select-none overflow-hidden border border-white bg-white/50 will-change-transform [touch-action:none]"
                    style={{ borderRadius: "calc(10 * var(--u))", cursor: canDrag ? "grab" : undefined, padding: "calc(4 * var(--u))" }}>
                    <div className="hero-glass-inner pointer-events-none size-full overflow-hidden bg-secondary" style={{ borderRadius: "calc(6 * var(--u))" }} aria-hidden>
                      <Placeholder accent={p.accent} variant={tile} />
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
        <a href="#work" aria-label="Scroll to work" data-cursor="grow" className="mx-auto mt-10 hidden w-fit text-muted transition-colors duration-[160ms] hover:text-fg lg:block"><ChevronDown className="anim-bob" size={24} /></a>
      </div>
    </section>
  );
}
