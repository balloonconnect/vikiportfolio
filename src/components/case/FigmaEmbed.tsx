"use client";
import { useState } from "react";
import { ExternalLink } from "lucide-react";

// Interactive Figma viewer: lets visitors browse every page of the file. File must be viewable by link.
export function FigmaEmbed({ url, title }: { url: string; title: string }) {
  const [on, setOn] = useState(false);
  const src = `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(url)}`;
  return (
    <section id="figma" className="scroll-mt-28 py-12">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div><h2 className="text-[28px] leading-[1.2] tracking-[-0.01em]">Explore the Figma file</h2><p className="mt-1 text-[15px] text-muted">Browse every page, component and document of {title} live in Figma.</p></div>
        <a href={url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-[15px] text-muted hover:text-fg">Open in Figma <ExternalLink size={14} /></a>
      </div>
      <div className="relative aspect-[16/10] overflow-hidden rounded-[8px] border border-secondary bg-surface max-md:aspect-[4/5]">
        {on ? <iframe src={src} title={`${title} Figma file`} allowFullScreen loading="lazy" className="absolute inset-0 h-full w-full border-0" /> : (
          <button onClick={() => setOn(true)} className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-fg"><span className="rounded-full border border-border px-6 py-3 text-[16px] transition-colors hover:bg-fg hover:text-bg">Load interactive Figma</span><span className="text-[13px] text-muted">Loads figma.com in this frame</span></button>
        )}
      </div>
    </section>
  );
}
