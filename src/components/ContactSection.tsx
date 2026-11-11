"use client";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Mail, MessageCircle } from "lucide-react";
import { site } from "@/data/site";

export function ContactSection() {
  const [i, setI] = useState(0);
  useEffect(() => { const id = setInterval(() => setI((v) => (v + 1) % site.ctaVerbs.length), 2200); return () => clearInterval(id); }, []);
  const [w, setW] = useState<number | null>(null);
  // Each new word reports its own width when it mounts, so the gap before "something" always fits it.
  const word = useCallback((el: HTMLSpanElement | null) => { if (el) setW(el.offsetWidth); }, []);
  const link = "group inline-flex items-center gap-1 border-b border-transparent text-[17px] transition-colors hover:border-fg";
  return (
    <section id="contact" className="pt-[144px] pb-24 max-lg:pt-20">
      <div className="wrap">
        <h2 className="h-display max-w-[900px] !text-[clamp(36px,5vw,72px)] !leading-[1.05]">
          Let&apos;s{" "}
          <motion.span className="relative inline-block align-bottom" initial={false} animate={w ? { width: w } : undefined} transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}>
            <AnimatePresence mode="wait">
              <motion.span ref={word} key={site.ctaVerbs[i]} className="inline-block whitespace-nowrap" initial={{ y: "60%", opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: "-60%", opacity: 0 }} transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}>
                {site.ctaVerbs[i]}
              </motion.span>
            </AnimatePresence>
          </motion.span>{" "}
          something great together.
        </h2>
        <div className="mt-[74px] flex flex-wrap items-center gap-x-8 gap-y-4">
          <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 rounded-full border-[0.8px] border-border bg-surface px-5 py-[10px] text-[17px] transition-colors duration-200 hover:bg-fg hover:text-bg"><Mail size={16} />{site.email}</a>
          <a href={site.whatsappHref} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-[10px] text-[17px] font-medium text-[#062b14] transition-transform duration-200 hover:scale-[1.03] active:scale-95"><MessageCircle size={18} />Chat on WhatsApp</a>
          <a className={link} href={site.phoneHref}>{site.phone}</a>
          <a className={link} href={site.resumeUrl} download>Resume <ArrowUpRight size={14} /></a>
          {site.social.map((s) => <a key={s.label} className={link} href={s.href} target="_blank" rel="noreferrer">{s.label} <ArrowUpRight size={14} /></a>)}
        </div>
      </div>
    </section>
  );
}
