"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { Cover } from "./Cover";
import { Parallax } from "./Parallax";
import { Reveal } from "./Reveal";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const href = `/work/${project.slug}`;
  return (
    <article className="group relative grid grid-cols-12 gap-x-6 gap-y-8 py-[72px] first:pt-0 max-lg:block max-lg:py-12">
      <Reveal className="col-span-5 flex flex-col justify-between max-lg:mb-8">
        <div>
          <p className="mb-3 text-[13px] tabular-nums text-muted">{String(index + 1).padStart(2, "0")}</p>
          <h2 className="text-[24px] font-semibold leading-[1.2] tracking-[-0.02em]">{project.name}</h2>
          <p className="mt-[18px] text-[18px] leading-[1.4]">{project.tagline}</p>
          <p className="mt-3 text-[16px] leading-[26px] text-muted">{project.description}</p>
          <dl className="mt-[40px] grid grid-cols-[88px_1fr] gap-y-3 text-[16px]">
            {([["Years", project.years], ["Role", project.role], ["Scope", project.scope], ["Results", project.results]] as const).map(([k, v]) => (
              <div key={k} className="contents"><dt className="text-muted">{k}</dt><dd>{v}</dd></div>
            ))}
          </dl>
        </div>
        <div className="mt-10 flex items-center gap-4">
          <Link href={href} className="relative z-[2] inline-flex items-center gap-2 rounded-full border-[0.8px] border-border bg-surface px-5 py-[10px] text-[16px] transition-colors duration-200 hover:bg-fg hover:text-bg">
            View Case Study <ArrowUpRight size={16} />
          </Link>
          <span className="text-[13px] text-muted">{project.readTime} min read</span>
        </div>
      </Reveal>
      <Reveal className="col-span-7" delay={0.1}>
        <Link href={href} tabIndex={-1} data-cursor="View case" className="relative block aspect-[774/782] max-lg:aspect-[4/3] overflow-hidden rounded-[6px]" aria-hidden>
          <motion.div className="h-full w-full" whileHover={{ scale: 1.03 }} transition={{ duration: 0.68, ease: [0.22, 1, 0.36, 1] }}>
            <Parallax className="h-full w-full"><Cover project={project} variant={index} /></Parallax>
          </motion.div>
          <motion.span aria-hidden className="pointer-events-none absolute inset-0 bg-secondary" initial={{ opacity: 1 }} whileInView={{ opacity: 0 }} viewport={{ once: true, margin: "-10% 0px" }} transition={{ duration: 0.6, delay: 0.45, ease: [0.22, 1, 0.36, 1] }} />
        </Link>
      </Reveal>
    </article>
  );
}
