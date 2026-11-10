import Link from "next/link";
import { ArrowUpRight, Play } from "lucide-react";
import { Placeholder } from "../Placeholder";
import { Reveal } from "../Reveal";
import { projects } from "@/data/projects";
import { Toc } from "./Toc";
import { BeforeAfter } from "./BeforeAfter";
import type { Project } from "@/data/projects";

export const Sec = ({ id, title, children }: { id: string; title?: string; children: React.ReactNode }) => (
  <Reveal className="scroll-mt-28 pb-20 max-lg:pb-14"><section id={id}>{title && <h2 className="mb-6 text-[32px] leading-[1.2] tracking-[-0.01em] max-lg:text-[26px]">{title}</h2>}{children}</section></Reveal>
);
export const P = ({ children }: { children: React.ReactNode }) => <p className="max-w-[720px] text-[17px] leading-[28px] text-muted">{children}</p>;
export const Img = ({ accent, variant = 0, ratio = "16/9", caption }: { accent: string; variant?: number; ratio?: string; caption?: string }) => (
  <figure><div className="overflow-hidden rounded-[6px]" style={{ aspectRatio: ratio }}><Placeholder accent={accent} variant={variant} /></div>{caption && <figcaption className="mt-3 text-[14px] text-muted">{caption}</figcaption>}</figure>
);
export const Video = ({ accent, src, caption }: { accent: string; src?: string; caption?: string }) => (
  <figure>
    <div className="relative aspect-[16/9] overflow-hidden rounded-[6px]">
      {src ? <video src={src} autoPlay loop muted playsInline className="h-full w-full object-cover" /> : (<><Placeholder accent={accent} variant={0} /><span className="absolute inset-0 flex items-center justify-center"><span className="flex h-16 w-16 items-center justify-center rounded-full bg-fg text-bg"><Play size={22} fill="currentColor" /></span></span></>)}
    </div>{caption && <figcaption className="mt-3 text-[14px] text-muted">{caption}</figcaption>}
  </figure>
);
export const Shot = ({ src, alt, w, h, caption, narrow }: { src: string; alt: string; w: number; h: number; caption?: string; narrow?: boolean }) => (
  <figure className={narrow ? "max-w-[420px]" : ""}><div className="overflow-hidden rounded-[6px] border border-secondary bg-surface"><img src={src} alt={alt} width={w} height={h} loading="lazy" className="h-auto w-full" /></div>{caption && <figcaption className="mt-3 text-[14px] text-muted">{caption}</figcaption>}</figure>
);
export const Steps = ({ items }: { items: [string, string][] }) => (
  <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">{items.map(([t, d]) => (<li key={t} className="rounded-[6px] border border-secondary bg-surface p-4"><p className="text-[16px] font-semibold">{t}</p><p className="mt-2 text-[14px] leading-[22px] text-muted">{d}</p></li>))}</ol>
);
export const Pipeline = ({ steps }: { steps: string[] }) => (
  <ol className="flex flex-wrap items-center gap-2 text-[14px]">{steps.map((s, i) => (<li key={s} className="flex items-center gap-2"><span className="rounded-full border border-secondary bg-surface px-4 py-2">{s}</span>{i < steps.length - 1 && <span className="text-muted" aria-hidden>→</span>}</li>))}</ol>
);
export const Stats = ({ items }: { items: [string, string][] }) => (
  <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-[repeat(auto-fit,minmax(150px,1fr))]">{items.map(([v, l]) => (<div key={l}><p className="text-[clamp(40px,5vw,64px)] leading-none tracking-[-0.02em]">{v}</p><p className="mt-2 text-[15px] text-muted">{l}</p></div>))}</div>
);
export const Personas = ({ accent, items }: { accent: string; items: [string, string][] }) => (
  <div className="grid gap-6 md:grid-cols-2">{items.map(([r, d], i) => (<div key={r} className="rounded-[6px] border border-secondary bg-surface p-5"><div className="aspect-[4/3] overflow-hidden rounded-[6px]"><Placeholder accent={accent} variant={i + 1} /></div><p className="mt-5 text-[12px] uppercase tracking-[0.08em] text-muted">User type</p><p className="mt-1 text-[22px]">{r}</p><p className="mt-2 text-[15px] text-muted">{d}</p></div>))}</div>
);
export const Cards = ({ items, cols = 1 }: { items: [string, string][]; cols?: 1 | 2 | 3 }) => (
  <div className={`grid gap-4 ${cols === 3 ? "md:grid-cols-3" : cols === 2 ? "md:grid-cols-2" : ""}`}>{items.map(([t, d]) => (<div key={t} className="rounded-[6px] border border-secondary bg-surface p-5 transition-[transform,border-color,box-shadow] duration-[240ms] ease-spring hover:-translate-y-1 hover:border-border hover:shadow-[0_10px_30px_#0000001a]"><p className="text-[18px] font-semibold">{t}</p><p className="mt-2 text-[15px] leading-[24px] text-muted">{d}</p></div>))}</div>
);
export const Columns = ({ items }: { items: { title: string; bullets: string[]; tag?: string }[] }) => (
  <div className="grid gap-4 md:grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">{items.map((c) => (<div key={c.title} className="rounded-[6px] border border-secondary bg-surface p-5"><p className="text-[18px] font-semibold">{c.title}</p><ul className="mt-3 list-disc space-y-1 pl-5 text-[15px] text-muted">{c.bullets.map((b) => <li key={b}>{b}</li>)}</ul>{c.tag && <p className="mt-4 inline-block rounded-[4px] bg-tile px-2 py-1 text-[13px]">{c.tag}</p>}</div>))}</div>
);
export const Decisions = ({ items }: { items: [string, string][] }) => (
  <ol className="space-y-6">{items.map(([t, d], i) => (<li key={t} className="flex gap-6 border-t border-secondary pt-5"><span className="text-[32px] leading-none text-muted">0{i + 1}</span><div><p className="text-[20px] font-semibold">{t}</p><p className="mt-1 text-muted">{d}</p></div></li>))}</ol>
);
export const Feature = ({ accent, title, text, i, video }: { accent: string; title: string; text: string; i: number; video?: boolean }) => (
  <div className={`grid items-center gap-8 md:grid-cols-2 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
    <div className="relative aspect-[4/3] overflow-hidden rounded-[6px]"><Placeholder accent={accent} variant={i + 1} />{video && <span className="absolute bottom-4 left-4 flex h-10 w-10 items-center justify-center rounded-full bg-fg text-bg"><Play size={14} fill="currentColor" /></span>}</div>
    <div><p className="text-[13px] text-muted">0{i + 1}</p><h3 className="mt-2 text-[24px]">{title}</h3><p className="mt-3 text-muted">{text}</p></div>
  </div>
);
export const Features = ({ accent, items, video }: { accent: string; items: [string, string][]; video?: boolean }) => (<div className="space-y-16">{items.map(([t, d], i) => <Feature key={t} accent={accent} title={t} text={d} i={i} video={video} />)}</div>);
export const Directions = ({ accent, labels = ["Mild", "Medium", "Spicy"], stacked }: { accent: string; labels?: string[]; stacked?: boolean }) => (
  <div className={stacked ? "space-y-6" : "grid gap-6 md:grid-cols-3"}>{labels.map((l, i) => <Img key={l} accent={accent} variant={i} ratio={stacked ? "16/9" : "4/3"} caption={l} />)}</div>
);
export const Choose = ({ accent, labels = ["Option A", "Option B (chosen)", "Option C"] }: { accent: string; labels?: string[] }) => (
  <div className="grid gap-6 md:grid-cols-3">{labels.map((l, i) => (<div key={l} className={`rounded-[6px] border bg-surface p-4 ${l.includes("chosen") ? "border-border" : "border-secondary"}`}><div className="aspect-[4/3] overflow-hidden rounded-[6px]"><Placeholder accent={accent} variant={i} /></div><p className="mt-4 font-semibold">{l}</p><p className="mt-3 text-[12px] uppercase tracking-[0.08em] text-muted">Positive</p><p className="text-[15px] text-muted">+ Placeholder feedback point</p><p className="mt-3 text-[12px] uppercase tracking-[0.08em] text-muted">Negative</p><p className="text-[15px] text-muted">- Placeholder feedback point</p></div>))}</div>
);
export const Quotes = () => (
  <div className="grid gap-6 md:grid-cols-2">{[1, 2].map((n) => (<blockquote key={n} className="rounded-[6px] border border-secondary bg-surface p-6"><span className="inline-block rounded-[4px] bg-tile px-3 py-1 text-[12px] uppercase tracking-[0.08em]">Company logo</span><p className="mt-5 text-[19px] leading-[28px]">Placeholder quote from a colleague about the project and the difference it made.</p><footer className="mt-5 text-[15px]"><p className="font-semibold">Name Surname</p><p className="text-muted">Role, Company</p></footer></blockquote>))}</div>
);
export const Callouts = ({ items }: { items: string[] }) => (<ul className="mt-6 grid gap-4 md:grid-cols-2">{items.map((t, i) => (<li key={t} className="flex gap-3"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-fg text-[12px] text-bg">{i + 1}</span><span className="text-[15px] text-muted">{t}</span></li>))}</ul>);
export const Gallery = ({ accent, n = 6 }: { accent: string; n?: number }) => (
  <div className="-mx-[var(--gutter)] flex snap-x gap-4 overflow-x-auto px-[var(--gutter)] pb-4">{Array.from({ length: n }).map((_, i) => (<div key={i} className="aspect-[9/16] w-[200px] shrink-0 snap-start overflow-hidden rounded-[10px] max-md:w-[160px]"><Placeholder accent={accent} variant={i + 1} /></div>))}</div>
);
export const Grid = ({ accent, n, cols = 2, ratio = "4/3", caption }: { accent: string; n: number; cols?: 2 | 3 | 4; ratio?: string; caption?: string }) => (
  <div className={`grid gap-6 ${cols === 4 ? "sm:grid-cols-2 xl:grid-cols-4" : cols === 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>{Array.from({ length: n }).map((_, i) => <Img key={i} accent={accent} variant={i} ratio={ratio} caption={caption ? `${caption} ${i + 1}` : undefined} />)}</div>
);
export const Compare = ({ accent }: { accent: string }) => <BeforeAfter accent={accent} />;
export const MoreWork = ({ current }: { current: string }) => (
  <ol className="grid gap-4 md:grid-cols-2">{projects.filter((x) => x.slug !== current).slice(0, 4).map((x, i) => (
    <li key={x.slug}><Link href={`/work/${x.slug}`} className="group flex items-center gap-5 rounded-[6px] border border-secondary bg-surface p-5 transition-colors duration-200 hover:border-border" data-cursor="grow">
      <span className="text-[32px] leading-none text-muted">0{i + 1}</span>
      <span className="flex-1"><span className="block text-[18px] font-semibold">{x.name}</span><span className="block text-[14px] text-muted">{x.tagline}</span></span>
      <span className="flex items-center gap-1 text-[14px]">View Case Study <ArrowUpRight size={14} /></span>
    </Link></li>))}</ol>
);

export function CaseShell({ p, toc, children }: { p: Project; toc: { id: string; label: string }[]; children: React.ReactNode }) {
  return (
    <article className="wrap relative pt-[130px]" id="top">
      <Toc items={toc} />
      <div className="lg:ml-[260px] lg:max-w-[1000px]">
        <Link href="/#work" className="mb-8 inline-flex items-center gap-2 text-[15px] text-muted hover:text-fg lg:hidden">← Back</Link>
        <h1 className="h-display !text-[clamp(36px,5vw,72px)] !leading-[1.05]">{p.name}</h1>
        <p className="mt-6 max-w-[620px] text-[21px] leading-[1.4] text-muted">{p.tagline}</p>
        <p className="mt-4 text-[14px] text-muted">{p.readTime} min read</p>
        <dl className="mt-10 grid max-w-[720px] grid-cols-[88px_1fr] gap-y-3 text-[16px]">
          {([["Role", p.role], ["Years", p.years], ["Scope", p.scope]] as const).map(([k, v]) => (<div key={k} className="contents"><dt className="text-muted">{k}</dt><dd>{v}</dd></div>))}
        </dl>
        <div className="mt-14 space-y-0">{children}</div>
      </div>
    </article>
  );
}
