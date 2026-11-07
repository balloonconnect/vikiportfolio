import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { projects, getProject } from "@/data/projects";
import { Placeholder } from "@/components/Placeholder";
import { Reveal } from "@/components/Reveal";
import { Footer } from "@/components/Footer";

export function generateStaticParams() { return projects.map((p) => ({ slug: p.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const p = getProject((await params).slug);
  return { title: p ? `${p.name} — Case study` : "Not found", description: p?.description };
}

const Block = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <Reveal className="grid grid-cols-12 gap-x-6 gap-y-4 border-t border-secondary py-12 max-lg:block">
    <h2 className="col-span-3 text-[15px] text-muted max-lg:mb-4">{title}</h2>
    <div className="col-span-8 col-start-5 text-[16px] leading-[26px] max-lg:col-span-12">{children}</div>
  </Reveal>
);

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = getProject((await params).slug);
  if (!p) notFound();
  const c = p.caseStudy;
  const i = projects.indexOf(p);
  const next = projects[(i + 1) % projects.length];
  const list = (a: string[]) => <ul className="list-disc space-y-1 pl-5">{a.map((x) => <li key={x}>{x}</li>)}</ul>;
  return (
    <>
      <article className="wrap pt-[130px]">
        <Link href="/#work" className="inline-flex items-center gap-2 text-[15px] text-muted hover:text-fg"><ArrowLeft size={16} />Work</Link>
        <h1 className="h-display mt-8 max-w-[900px] !text-[clamp(36px,5vw,72px)] !leading-[1.05]">{p.name}</h1>
        <p className="mt-6 max-w-[620px] text-[21px] leading-[1.4] text-muted">{p.tagline}</p>
        <dl className="mt-12 grid max-w-[720px] grid-cols-[88px_1fr] gap-y-3 text-[16px]">
          {([["Years", p.years], ["Role", p.role], ["Scope", p.scope], ["Results", p.results]] as const).map(([k, v]) => (<div key={k} className="contents"><dt className="text-muted">{k}</dt><dd>{v}</dd></div>))}
        </dl>
        <div className="mt-16 aspect-[16/9] overflow-hidden rounded-[6px] max-md:aspect-[4/3]"><Placeholder accent={p.accent} variant={0} /></div>

        <div className="mt-24">
          <Block title="Overview"><p>{c.overview}</p></Block>
          <Block title="Problem"><p>{c.problem}</p></Block>
          <Block title="Business objectives">{list(c.objectives)}</Block>
          <Block title="Research and discovery">{list(c.research)}</Block>
          <Block title="User personas">
            <div className="grid gap-4 sm:grid-cols-2">{c.personas.map((x) => (
              <div key={x.name} className="rounded-[6px] bg-tile p-5"><p className="font-semibold">{x.name}</p><p className="text-muted">{x.role}</p><p className="mt-2">{x.goal}</p></div>))}</div>
          </Block>
          <Block title="User journey">
            <ol className="grid gap-4 sm:grid-cols-3">{c.journey.map((j, k) => (
              <li key={j.stage} className="border-t border-fg pt-3"><p className="text-[13px] text-muted">0{k + 1}</p><p className="font-semibold">{j.stage}</p><p className="text-muted">{j.note}</p></li>))}</ol>
          </Block>
          <Block title="Information architecture">
            <div className="flex flex-wrap gap-2">{c.ia.map((x) => <span key={x} className="rounded-[6px] border border-secondary px-3 py-2">{x}</span>)}</div>
          </Block>
          <Block title="Wireframes"><p>{c.wireframes}</p><div className="mt-6 aspect-[16/9] overflow-hidden rounded-[6px]"><Placeholder accent="#7c7c7c" variant={1} /></div></Block>
          <Block title="Design explorations"><p>{c.explorations}</p>
            <div className="mt-6 grid grid-cols-3 gap-3">{[1, 2, 3].map((v) => <div key={v} className="aspect-[3/4] overflow-hidden rounded-[6px]"><Placeholder accent={p.accent} variant={v} /></div>)}</div></Block>
          <Block title="Final UI"><p>{c.finalUI}</p><div className="mt-6 aspect-[16/9] overflow-hidden rounded-[6px]"><Placeholder accent={p.accent} variant={3} /></div></Block>
          <Block title="Prototype"><p>{c.prototype}</p></Block>
          <Block title="Outcomes and impact">
            <div className="grid gap-6 sm:grid-cols-3">{c.outcomes.map((o) => (<div key={o.label}><p className="text-[48px] leading-none tracking-[-0.02em]">{o.metric}</p><p className="mt-2 text-muted">{o.label}</p></div>))}</div>
          </Block>
        </div>

        <Link href={`/work/${next.slug}`} className="group mt-12 block border-t border-secondary py-16">
          <span className="text-[13px] text-muted">Next project</span>
          <span className="mt-2 block text-[clamp(28px,4vw,56px)] leading-[1.1] tracking-[-0.02em] transition-transform duration-[420ms] ease-out group-hover:translate-x-3">{next.name} →</span>
        </Link>
      </article>
      <Footer />
    </>
  );
}
