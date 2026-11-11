"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

// Scroll parallax for images: the child drifts against the scroll inside a clipped frame.
// Off for reduced-motion users and on small screens.
export function Parallax({ children, amount = 7, scale = 1.14, className = "" }: { children: React.ReactNode; amount?: number; scale?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [wide, setWide] = useState(false);
  useEffect(() => { const mq = window.matchMedia("(min-width: 1024px)"); const f = () => setWide(mq.matches); f(); mq.addEventListener("change", f); return () => mq.removeEventListener("change", f); }, []);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`${amount}%`, `${-amount}%`]);
  const on = wide && !reduce;
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div className="h-full w-full" style={on ? { y, scale } : undefined}>{children}</motion.div>
    </div>
  );
}

// Whole-element drift (no cropping): for thumbnails and screens that must stay fully visible.
export function Drift({ children, amount = 18, className = "" }: { children: React.ReactNode; amount?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [wide, setWide] = useState(false);
  useEffect(() => { const m = window.matchMedia("(min-width: 1024px)"); const f = () => setWide(m.matches); f(); m.addEventListener("change", f); return () => m.removeEventListener("change", f); }, []);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [amount, -amount]);
  return <div ref={ref} className={className}><motion.div style={wide && !reduce ? { y } : undefined}>{children}</motion.div></div>;
}
