"use client";
import { ExternalLink } from "lucide-react";

// Interactive Figma viewer: loads straight away so visitors can pan, zoom and switch pages.
// The Figma file must be shared as "Anyone with the link can view".
function embedUrl(url: string) {
  const m = url.match(/figma\.com\/(?:design|file|proto)\/([A-Za-z0-9]+)/);
  const key = m ? m[1] : "";
  return `https://embed.figma.com/design/${key}?embed-host=share&footer=false&page-selector=true&hide-ui=false&theme=system`;
}
export function FigmaEmbed({ url, title }: { url: string; title: string }) {
  return (
    <section id="figma" className="scroll-mt-28 py-12">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div><h2 className="text-[28px] leading-[1.2] tracking-[-0.01em]">Explore the Figma file</h2><p className="mt-1 text-[15px] text-muted">Pan, zoom and switch pages of {title} live in Figma.</p></div>
        <a href={url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-[15px] text-muted hover:text-fg">Open in Figma <ExternalLink size={14} /></a>
      </div>
      <div className="overflow-hidden rounded-[8px] border border-secondary bg-surface">
        <iframe src={embedUrl(url)} title={`${title} Figma file`} allow="clipboard-write; fullscreen" allowFullScreen className="block h-[78vh] min-h-[480px] w-full border-0" />
      </div>
    </section>
  );
}
