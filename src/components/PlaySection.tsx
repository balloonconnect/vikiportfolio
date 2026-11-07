"use client";
import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { play } from "@/data/experience";
import { Placeholder } from "./Placeholder";
import { Reveal } from "./Reveal";

export function PlaySection() {
  const ref = useRef<HTMLUListElement>(null);
  const [pos, setPos] = useState({ start: true, end: false });
  const update = () => {
    const el = ref.current; if (!el) return;
    setPos({ start: el.scrollLeft < 4, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4 });
  };
  const go = (d: number) => ref.current?.scrollBy({ left: d * (ref.current.clientWidth * 0.6), behavior: "smooth" });
  const btn = "flex size-[42px] items-center justify-center rounded-full border transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-40 border-secondary enabled:hover:bg-fg enabled:hover:text-bg";
  return (
    <section id="play" className="pt-[144px] max-lg:pt-20">
      <div className="wrap">
        <div className="flex items-end justify-between gap-8 max-lg:flex-col max-lg:items-start">
          <Reveal className="w-[618px] max-w-full">
            <h2 className="text-[24px] font-semibold leading-[1.2] max-lg:text-[20px]">Play</h2>
            <p className="mt-[18px] text-[16px] leading-[26px]">Here are some side projects, visual experiments, graphic design work, and anything else I thought looked nice.</p>
          </Reveal>
          <div className="flex gap-[14px] max-lg:hidden">
            <button className={btn} disabled={pos.start} onClick={() => go(-1)} aria-label="Previous"><ArrowLeft size={20} strokeWidth={1.5} /></button>
            <button className={btn} disabled={pos.end} onClick={() => go(1)} aria-label="Next"><ArrowRight size={20} strokeWidth={1.5} /></button>
          </div>
        </div>
      </div>
      <ul ref={ref} onScroll={update} className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-[var(--gutter)] pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden max-lg:grid max-lg:grid-cols-2 max-lg:overflow-visible max-sm:grid-cols-1">
        {play.map((item, i) => (
          <motion.li key={item.id} whileHover="hover" className="w-[min(34vw,480px)] shrink-0 snap-start max-lg:w-auto">
            <div className="aspect-[4/5] overflow-hidden rounded-[6px]">
              <motion.div className="h-full" variants={{ hover: { scale: 1.05 } }} transition={{ duration: 0.68, ease: [0.22, 1, 0.36, 1] }}>
                <Placeholder accent={item.accent} variant={i + 1} />
              </motion.div>
            </div>
            <p className="mt-3 text-[15px]">{item.title}</p>
            <p className="text-[13px] text-muted">{item.caption}</p>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
