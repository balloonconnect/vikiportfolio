"use client";
import { useState } from "react";
import { Placeholder } from "../Placeholder";

// Drag slider comparing a before and an after image. Swap the Placeholders for <img> tags.
export function BeforeAfter({ accent }: { accent: string }) {
  const [v, setV] = useState(50);
  return (
    <div className="relative aspect-[16/9] overflow-hidden rounded-[6px] select-none" data-cursor="grow">
      <div className="absolute inset-0"><Placeholder accent="#7c7c7c" variant={0} /></div>
      <div className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${v}%)` }}><Placeholder accent={accent} variant={3} /></div>
      <span className="absolute left-4 top-4 rounded-full bg-surface px-3 py-1 text-[13px]">Before</span>
      <span className="absolute right-4 top-4 rounded-full bg-surface px-3 py-1 text-[13px]">After</span>
      <div className="pointer-events-none absolute inset-y-0 w-[2px] bg-fg" style={{ left: `${v}%` }}>
        <span className="absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[0.8px] border-border bg-surface text-[12px]">↔</span>
      </div>
      <input aria-label="Compare before and after" type="range" min={0} max={100} value={v} onChange={(e) => setV(+e.target.value)} className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0" />
    </div>
  );
}
