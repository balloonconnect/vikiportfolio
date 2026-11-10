"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const ids = ["home", "work", "play", "about", "contact"];

// Fixed vertical progress dots. The active dot stretches from 10px to 30px with a springy ease.
export function ScrollDots() {
  const path = usePathname();
  const [active, setActive] = useState(0);
  useEffect(() => {
    if (path !== "/") return;
    const els = ids.map((id) => document.getElementById(id));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setActive(els.indexOf(e.target as HTMLElement)); });
    }, { rootMargin: "-45% 0px -50% 0px" });
    els.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [path]);
  if (path !== "/") return null;
  return (
    <nav aria-label="Page sections" className="pointer-events-none fixed right-[calc(var(--gutter)/2-5px)] top-1/2 z-[60] hidden -translate-y-1/2 lg:block">
      <ul className="pointer-events-auto flex w-[10px] flex-col items-center gap-[10px]">
        {ids.map((id, i) => (
          <li key={id}>
            <a href={`#${id}`} aria-label={`Go to ${id}`} aria-current={active === i} data-cursor="grow"
              className="block w-[10px] rounded-full bg-fg transition-[height,opacity] duration-[240ms] ease-spring"
              style={{ height: active === i ? 30 : 10, opacity: active === i ? 1 : 0.25 }} />
          </li>
        ))}
      </ul>
    </nav>
  );
}
