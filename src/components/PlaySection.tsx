"use client";
import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Home, User, Bell, Calendar, Heart, Settings, Search, Mail, Star, Check } from "lucide-react";
import { motion } from "framer-motion";
import { play } from "@/data/experience";
import Link from "next/link";
import { Reveal } from "./Reveal";

// Mixed card shapes at one shared height: one wide square, then narrow portrait cards (width / height).
const ratios = [1, 0.417, 0.417, 0.417, 0.417, 1, 0.417, 0.417, 0.417];

const B = "#2563eb";
function Tile({ kind }: { kind: "components" | "tokens" }) {
  if (kind === "components") return (
    <div className="flex h-full w-full flex-col justify-center gap-5 bg-white p-6 text-[#0f172a]">
      <div className="flex flex-wrap gap-2">{["Primary", "Secondary", "Ghost"].map((l, i) => <span key={l} className="rounded-[8px] px-4 py-2 text-[13px] font-medium" style={i === 0 ? { background: B, color: "#fff" } : i === 1 ? { border: `1px solid ${B}`, color: B } : { color: B }}>{l}</span>)}</div>
      <div className="flex gap-2"><span className="flex flex-1 items-center gap-2 rounded-[8px] border border-[#cbd5e1] px-3 py-2 text-[13px] text-[#64748b]"><Search size={15} />Search</span><span className="rounded-[8px] border-2 px-3 py-2 text-[13px]" style={{ borderColor: B }}>Focus</span></div>
      <div className="flex items-center gap-4"><i className="relative h-6 w-11 rounded-full" style={{ background: B }}><b className="absolute left-[22px] top-[3px] h-[18px] w-[18px] rounded-full bg-white" /></i><i className="flex h-6 w-6 items-center justify-center rounded text-white" style={{ background: B }}><Check size={14} /></i><i className="h-6 w-6 rounded-full border-[6px]" style={{ borderColor: B }} /></div>
      <div className="flex flex-wrap gap-3">{[Home, User, Bell, Calendar, Heart, Settings, Mail, Star].map((I, k) => <span key={k} className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f1f5f9]"><I size={18} /></span>)}</div>
    </div>);
  const ramp = ["#eff6ff", "#bfdbfe", "#60a5fa", "#2563eb", "#1d4ed8", "#1e3a8a", "#0f172a"];
  return (
    <div className="flex h-full w-full flex-col justify-between bg-[#0f172a] p-6 text-white">
      <div><p className="text-[clamp(56px,7vw,96px)] font-bold leading-none tracking-[-0.03em]">Aa</p><p className="mt-2 text-[14px] text-[#94a3b8]">Inter · 13 text styles</p></div>
      <div><div className="flex overflow-hidden rounded-[10px]">{ramp.map((c) => <i key={c} className="h-14 flex-1" style={{ background: c }} />)}</div><p className="mt-2 text-[12px] text-[#94a3b8]">Brand ramp · 300+ variables</p></div>
    </div>);
}

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
          <motion.li key={item.id} whileHover="hover" aria-label={`${item.title}: ${item.caption}`} className="shrink-0 snap-start overflow-hidden rounded-[14px] max-sm:rounded-[10px]" style={{ height: "var(--play-h)", aspectRatio: item.ratio ?? ratios[i % ratios.length] }}>
            <motion.div className="h-full w-full" variants={{ hover: { scale: 1.04 } }} transition={{ duration: 0.68, ease: [0.22, 1, 0.36, 1] }}>
              <Link href={item.href} draggable={false} className="block h-full w-full bg-tile">{item.kind ? <Tile kind={item.kind} /> : <img src={item.src} alt={`${item.title}: ${item.caption}`} loading="lazy" draggable={false} className="h-full w-full object-cover object-top" />}</Link>
            </motion.div>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
