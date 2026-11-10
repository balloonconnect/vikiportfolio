"use client";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { MapPin, Clock, ChevronDown } from "lucide-react";
import { site } from "@/data/site";
import { projects } from "@/data/projects";
import { Placeholder } from "./Placeholder";

// 15 tiles over 3 rows. span = grid columns of 12.
const tiles = [
  [4, 2, 2, 4], [2, 2, 4, 2, 2], [3, 3, 2, 2, 2],
];

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
  const words = site.headline.split(" ");
  let n = 0;
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

        <div className="mt-10 space-y-3" aria-hidden>
          {tiles.map((row, r) => (
            <div key={r} className="grid h-[clamp(130px,15vw,215px)] grid-cols-12 gap-3 max-md:h-auto max-md:auto-rows-[150px] max-md:grid-cols-4">
              {row.map((span, c) => {
                const idx = tiles.slice(0, r).flat().length + c;
                const p = projects[idx % projects.length];
                return (
                  <motion.div key={c} style={{ gridColumn: `span ${span}` }}
                    className="h-full overflow-hidden rounded-[6px] max-md:!col-span-2 first:max-md:!col-span-4"
                    initial={reduce ? false : { opacity: 0, y: 30, rotate: (idx % 2 ? 2 : -2) }}
                    animate={{ opacity: 1, y: 0, rotate: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 + 0.05 * n++, ease: [0.22, 1, 0.36, 1] }}>
                    <Placeholder accent={p.accent} variant={idx} />
                  </motion.div>
                );
              })}
            </div>
          ))}
        </div>
        <a href="#work" aria-label="Scroll to work" data-cursor="grow" className="mx-auto mt-10 hidden w-fit text-muted transition-colors duration-[160ms] hover:text-fg lg:block"><ChevronDown className="anim-bob" size={24} /></a>
      </div>
    </section>
  );
}
