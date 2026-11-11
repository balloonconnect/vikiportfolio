"use client";
import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { play } from "@/data/experience";
import { Placeholder } from "./Placeholder";
import { Reveal } from "./Reveal";

// Mixed card shapes at one shared height: one wide square, then narrow portrait cards (width / height).
const ratios = [1, 0.417, 0.417, 0.417, 0.417, 1, 0.417, 0.417, 0.417];

export function PlaySection() {
  const ref = useRef<HTMLUListElement>(null);
  const [pos, setPos] = useState({ start: true, end: false });
  const update = () => {
    const el = ref.current; if (!el) return;
    setPos({ start: el.scrollLeft < 4, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4 });
  };
  const drag = useRef({ down: false, x: 0, left: 0, moved: false });
  const onDown = (e: React.PointerEvent) => { const el = ref.current; if (!el || e.pointerType !== "mouse") return; drag.current = { down: true, x: e.clientX, left: el.scrollLeft, moved: false }; };
  const onMove = (e: React.PointerEvent) => { const d = drag.current, el = ref.current; if (!d.down || !el) return; const dx = e.clientX - d.x; if (Math.abs(dx) > 4) { d.moved = true; el.style.scrollSnapType = "none"; el.scrollLeft = d.left - dx; } };
  const onUp = () => { const el = ref.current; drag.current.down = false; if (el) el.style.scrollSnapType = ""; };
  const go = (d: number) => ref.current?.scrollBy({ left: d * (ref.current.clientWidth * 0.6), behavior: "smooth" });
  const btn = "flex size-[42px] items-center justify-center rounded-full border transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-40 border-fg text-fg disabled:border-secondary disabled:text-secondary enabled:hover:bg-fg enabled:hover:text-bg enabled:active:scale-95";
  return (
    <section id="play" className="pt-[144px] [--play-h:clamp(300px,34vw,560px)] max-lg:pt-20 max-sm:[--play-h:360px]">
      <div className="wrap">
        <div className="flex items-end justify-between gap-8 max-lg:flex-col max-lg:items-start">
          <Reveal className="w-[618px] max-w-full">
            <h2 className="text-[24px] font-semibold leading-[1.2] max-lg:text-[20px]">Play</h2>
            <p className="mt-[18px] text-[16px] leading-[26px]">Here are some side projects, visual experiments, graphic design work, and anything else I thought looked nice.</p>
          </Reveal>
          <div className="flex gap-[14px] max-sm:hidden">
            <button className={btn} disabled={pos.start} onClick={() => go(-1)} aria-label="Previous"><ArrowLeft size={20} strokeWidth={1.5} /></button>
            <button className={btn} disabled={pos.end} onClick={() => go(1)} aria-label="Next"><ArrowRight size={20} strokeWidth={1.5} /></button>
          </div>
        </div>
      </div>
      <ul ref={ref} onScroll={update} onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerLeave={onUp} onClickCapture={(e) => { if (drag.current.moved) { e.preventDefault(); e.stopPropagation(); drag.current.moved = false; } }} data-cursor="Drag" className="mt-14 flex snap-x snap-mandatory scroll-pl-[var(--gutter)] gap-[clamp(16px,2vw,32px)] overflow-x-auto px-[var(--gutter)] pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden max-lg:mt-8">
        {play.map((item, i) => (
          <motion.li key={item.id} whileHover="hover" aria-label={`${item.title}: ${item.caption}`} className="shrink-0 snap-start overflow-hidden rounded-[14px] max-sm:rounded-[10px]" style={{ height: "var(--play-h)", aspectRatio: ratios[i % ratios.length] }}>
            <motion.div className="h-full w-full" variants={{ hover: { scale: 1.04 } }} transition={{ duration: 0.68, ease: [0.22, 1, 0.36, 1] }}>
              <Placeholder accent={item.accent} variant={i + 1} />
            </motion.div>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
