"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

// Fixed section index shown from the lg breakpoint up, with scroll-spy highlight.
export function Toc({ items, floating }: { items: { id: string; label: string }[]; floating?: boolean }) {
  const [active, setActive] = useState(items[0]?.id);
  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: "-30% 0px -60% 0px" });
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [items]);
  return (
    <nav aria-label="Case study sections" className={floating ? "fixed left-4 top-[110px] z-40 hidden w-[150px] flex-col gap-[clamp(8px,1.6vh,18px)] rounded-[12px] border border-secondary bg-surface/90 p-4 text-[15px] shadow-[0_10px_40px_#0000001a] backdrop-blur min-[1360px]:flex" : "fixed left-[var(--gutter)] top-[174px] z-0 hidden w-[200px] flex-col gap-[clamp(12px,2.4vh,34px)] text-[17px] lg:flex"}>
      <Link href="/#work" className="inline-flex items-center gap-2 text-muted transition-colors duration-[160ms] hover:text-fg"><ArrowLeft size={16} />Back</Link>
      {items.map((i) => (
        <a key={i.id} href={`#${i.id}`} className={`transition-colors duration-[160ms] ${active === i.id ? "text-fg" : "text-muted hover:text-fg"}`} aria-current={active === i.id ? "location" : undefined}>{i.label}</a>
      ))}
    </nav>
  );
}
