"use client";
import { useEffect, useRef, useState } from "react";

// Renders a fixed-size mock (w x h) scaled to its container width, so desktop UI stays crisp on any screen.
export function Stage({ w, h, children, className = "" }: { w: number; h: number; children: React.ReactNode; className?: string }) {
  const r = useRef<HTMLDivElement>(null);
  const [s, setS] = useState(1);
  useEffect(() => {
    const el = r.current; if (!el) return;
    const f = () => setS(el.clientWidth / w);
    f(); const ro = new ResizeObserver(f); ro.observe(el);
    return () => ro.disconnect();
  }, [w]);
  return (
    <div ref={r} className={className} style={{ height: h * s, position: "relative", overflow: "hidden" }}>
      <div style={{ width: w, height: h, transform: `scale(${s})`, transformOrigin: "top left" }}>{children}</div>
    </div>
  );
}
