"use client";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
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

export function Hero() {
  const reduce = useReducedMotion();
  const time = useClock();
  const [canDrag, setCanDrag] = useState(false);
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
          <span className="flex items-center gap-2" suppressHydrationWarning><Clock size={16} />{time || " "}</span>
        </div>

        {/* Draggable glass tiles: 6 x 2 grid that scales with its container (u = width / 1272). */}
        <div className="mt-[74px] w-full max-lg:mt-6" style={{ containerType: "inline-size" }}>
          <div className="grid aspect-[1272/408] grid-cols-6 grid-rows-2" style={{ "--u": "calc(100cqw / 1272)", gap: "calc(24 * var(--u))" } as React.CSSProperties}>
            {spans.map((span, idx) => {
              const p = projects[idx % projects.length];
              return (
                <motion.div key={idx} style={{ gridColumn: `span ${span}` }}
                  initial={reduce ? false : { opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 + 0.05 * idx, ease: [0.22, 1, 0.36, 1] }}>
                  <motion.div
                    drag={canDrag} dragSnapToOrigin dragElastic={1} dragMomentum={false}
                    whileDrag={{ scale: 1.03, zIndex: 30, cursor: "grabbing" }}
                    transition={{ type: "spring", stiffness: 700, damping: 30, mass: 1 }}
                    data-cursor={canDrag ? "Drag me" : undefined} draggable={false}
                    className="relative size-full select-none overflow-hidden border border-white bg-white/50 will-change-transform [touch-action:none]"
                    style={{ borderRadius: "calc(10 * var(--u))", cursor: canDrag ? "grab" : undefined, padding: "calc(4 * var(--u))" }}>
                    <div className="hero-glass-inner pointer-events-none size-full overflow-hidden bg-secondary" style={{ borderRadius: "calc(6 * var(--u))" }} aria-hidden>
                      <Placeholder accent={p.accent} variant={idx} />
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
