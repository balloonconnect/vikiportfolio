"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";
import { site } from "@/data/site";

export function ContactSection() {
  const [i, setI] = useState(0);
  useEffect(() => { const id = setInterval(() => setI((v) => (v + 1) % site.ctaVerbs.length), 2200); return () => clearInterval(id); }, []);
  const link = "group inline-flex items-center gap-1 border-b border-transparent text-[17px] transition-colors hover:border-fg";
  return (
    <section id="contact" className="pt-[144px] pb-24 max-lg:pt-20">
      <div className="wrap">
        <h2 className="h-display max-w-[900px] !text-[clamp(36px,5vw,72px)] !leading-[1.05]">
          Let&apos;s{" "}
          <span className="relative inline-block min-w-[2.9em] align-bottom">
            <AnimatePresence mode="wait">
              <motion.span key={site.ctaVerbs[i]} className="inline-block" initial={{ y: "60%", opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: "-60%", opacity: 0 }} transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}>
                {site.ctaVerbs[i]}
              </motion.span>
            </AnimatePresence>
          </span>{" "}
          something great together.
        </h2>
        <div className="mt-[74px] flex flex-wrap items-center gap-x-8 gap-y-4">
          <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 rounded-full border-[0.8px] border-border bg-surface px-5 py-[10px] text-[17px] transition-colors duration-200 hover:bg-fg hover:text-bg"><Mail size={16} />{site.email}</a>
          <a className={link} href={site.phoneHref}>{site.phone}</a>
          <a className={link} href={site.resumeUrl} download>Resume <ArrowUpRight size={14} /></a>
          {site.social.map((s) => <a key={s.label} className={link} href={s.href} target="_blank" rel="noreferrer">{s.label} <ArrowUpRight size={14} /></a>)}
        </div>
      </div>
    </section>
  );
}
