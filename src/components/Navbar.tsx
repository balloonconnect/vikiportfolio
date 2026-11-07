"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { CircleUser, MessageSquare, Menu as MenuIcon, X } from "lucide-react";
import { navItems } from "@/data/site";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);
  const onHome = pathname === "/";
  const href = (h: string) => (onHome ? h : `/${h}`);

  useEffect(() => {
    if (!onHome) return;
    const ids = ["home", "work", "play", "about", "contact"];
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, [onHome]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("input,textarea") || e.metaKey || e.ctrlKey || e.altKey) return;
      const item = navItems.find((n) => n.key === e.key.toLowerCase());
      if (item) {
        if (onHome) document.querySelector(item.href)?.scrollIntoView({ behavior: "smooth" });
        else router.push(`/${item.href}`);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onHome, router]);

  const openAI = () => window.dispatchEvent(new Event("open-ai"));

  return (
    <header className="fixed inset-x-0 top-0 z-[100]">
      <nav aria-label="Primary" className="mx-auto flex h-[72px] max-w-page items-center justify-between px-[var(--gutter)]">
        <ul className="hidden items-center gap-8 lg:flex">
          {navItems.map((n) => (
            <li key={n.href}>
              <Link href={href(n.href)} aria-current={active === n.href.slice(1) && onHome ? "true" : undefined}
                className={`group flex items-center gap-2 text-[17px] transition-opacity duration-200 ${active === n.href.slice(1) && onHome ? "font-semibold" : "opacity-90 hover:opacity-100"}`}>
                <kbd className="flex h-[18px] w-[18px] items-center justify-center rounded-[4px] border border-border text-[10px] font-semibold uppercase">{n.key}</kbd>
                {n.label}
              </Link>
            </li>
          ))}
          <li><ThemeToggle /></li>
        </ul>

        <div className="flex items-center gap-3 lg:hidden">
          <button onClick={() => setOpen(true)} className="flex items-center gap-3 text-[20px] font-semibold" aria-expanded={open} aria-label="Open menu">
            <span className="flex h-[30px] w-[30px] items-center justify-center rounded-[4px] border-[1.5px] border-border"><MenuIcon size={18} /></span>Menu
          </button>
        </div>

        <div className="flex items-center gap-6">
          <Link href={href("#contact")} data-cursor="Contact me" className="hidden items-center gap-2 text-[17px] lg:flex"><CircleUser size={20} strokeWidth={1.5} />Contact</Link>
          <button onClick={openAI} data-cursor="Open AI chat" className="hidden items-center gap-2 rounded-full border-[0.8px] border-border bg-transparent px-4 py-[6px] text-[17px] transition-colors duration-200 hover:bg-fg hover:text-bg lg:flex">
            <MessageSquare size={16} strokeWidth={1.5} />Ask AI
          </button>
          <div className="lg:hidden"><ThemeToggle /></div>
        </div>
      </nav>

      {open && (
        <div className="fixed inset-0 z-[1000] bg-bg px-6 pt-5" role="dialog" aria-modal="true" aria-label="Menu">
          <button onClick={() => setOpen(false)} className="mb-10 flex items-center gap-3 text-[20px] font-semibold" aria-label="Close menu">
            <span className="flex h-[30px] w-[30px] items-center justify-center rounded-[4px] border-[1.5px] border-border"><X size={18} /></span>Close
          </button>
          <ul className="space-y-6 text-[32px] leading-none">
            {[...navItems, { label: "Contact", href: "#contact", key: "c" }].map((n) => (
              <li key={n.href}><Link onClick={() => setOpen(false)} href={href(n.href)}>{n.label}</Link></li>
            ))}
            <li><button onClick={() => { setOpen(false); openAI(); }}>Ask AI</button></li>
          </ul>
        </div>
      )}
    </header>
  );
}
