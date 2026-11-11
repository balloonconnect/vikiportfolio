"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { CircleUser, MessageSquare, Menu as MenuIcon, X, Copy, Check, ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { navItems, site } from "@/data/site";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);
  const [pop, setPop] = useState(false);
  const [copied, setCopied] = useState(false);
  const copy = () => { navigator.clipboard?.writeText(site.email); setCopied(true); setTimeout(() => setCopied(false), 1400); };
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
          <div className="relative hidden lg:block" onMouseEnter={() => setPop(true)} onMouseLeave={() => setPop(false)} onFocus={() => setPop(true)} onBlur={() => setPop(false)}>
            <Link href={href("#contact")} className="flex items-center gap-2 text-[17px]"><CircleUser size={20} strokeWidth={1.5} />Contact</Link>
            <AnimatePresence>{pop && (
              <motion.div initial={{ opacity: 0, y: -6, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -6, scale: 0.97 }} transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
                className="absolute right-0 top-full z-[110] w-[260px] pt-2">
                <div className="rounded-xl border border-border bg-bg p-3 text-[14px] shadow-xl">
                  <button onClick={copy} className="flex w-full items-center justify-between rounded-md p-2 text-left hover:bg-secondary"><span><span className="block text-[11px] text-muted">Email</span>{site.email}</span>{copied ? <Check size={15} /> : <Copy size={15} />}</button>
                  {site.social.slice(0, 1).map((l) => <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className="flex items-center justify-between rounded-md p-2 hover:bg-secondary"><span><span className="block text-[11px] text-muted">{l.label}</span>Open profile</span><ArrowUpRight size={15} /></a>)}
                  <a href={site.resumeUrl} download className="flex items-center justify-between rounded-md p-2 hover:bg-secondary"><span><span className="block text-[11px] text-muted">Resume</span>Download PDF</span><ArrowUpRight size={15} /></a>
                </div>
              </motion.div>
            )}</AnimatePresence>
          </div>
          <button onClick={openAI} data-cursor="Open AI chat" className="hidden items-center gap-2 press rounded-full border-[0.8px] border-border bg-transparent px-4 py-[6px] text-[17px] hover:bg-fg hover:text-bg lg:flex">
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
