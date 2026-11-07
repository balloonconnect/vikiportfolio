"use client";
import { useEffect, useRef, useState } from "react";

// Ring cursor that follows the pointer. Elements opt in with data-cursor="grow" (bigger ring)
// or data-cursor="Some label" (ring becomes a labelled pill). Disabled on touch and reduced motion.
export function CustomCursor() {
  const ring = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<string | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    setEnabled(true);
    let tx = -100, ty = -100, x = -100, y = -100, raf = 0;
    const move = (e: PointerEvent) => {
      tx = e.clientX; ty = e.clientY;
      const el = (e.target as HTMLElement | null)?.closest?.("[data-cursor]") as HTMLElement | null;
      setMode(el ? el.dataset.cursor ?? null : null);
    };
    const leave = () => { tx = ty = -100; };
    const tick = () => {
      x += (tx - x) * 0.22; y += (ty - y) * 0.22;
      if (ring.current) ring.current.style.transform = `translate3d(${x}px,${y}px,0) translate(-50%,-50%)`;
      raf = requestAnimationFrame(tick);
    };
    addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    raf = requestAnimationFrame(tick);
    return () => { removeEventListener("pointermove", move); document.documentElement.removeEventListener("pointerleave", leave); cancelAnimationFrame(raf); };
  }, []);

  if (!enabled) return null;
  const label = mode && mode !== "grow" ? mode : "";
  const size = label ? 0 : mode === "grow" ? 64 : 28;
  return (
    <div ref={ring} aria-hidden className="pointer-events-none fixed left-0 top-0 z-[5000]" style={{ willChange: "transform" }}>
      <div
        className="flex items-center justify-center rounded-full border-[0.8px] border-border text-[13px] transition-[width,height,background-color,color,padding] duration-200 ease-out"
        style={label
          ? { height: 34, padding: "0 14px", background: "var(--fg)", color: "var(--bg)", whiteSpace: "nowrap" }
          : { width: size, height: size, background: "transparent" }}
      >{label}</div>
    </div>
  );
}
