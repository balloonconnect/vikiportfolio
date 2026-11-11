import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, getProject } from "@/data/projects";
import { layouts } from "@/components/case/layouts";
import { CaseShell } from "@/components/case/blocks";
import { FigmaEmbed } from "@/components/case/FigmaEmbed";
import { Footer } from "@/components/Footer";

export function generateStaticParams() { return projects.map((p) => ({ slug: p.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const p = getProject((await params).slug);
  return { title: p ? `${p.name} — Case study` : "Not found", description: p?.description };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = getProject((await params).slug);
  if (!p) notFound();
  const L = layouts[p.layout];
  const next = projects[(projects.indexOf(p) + 1) % projects.length];
  return (
    <>
      {L.bare ? L.render(p) : <CaseShell p={p} toc={L.toc}>{L.render(p)}</CaseShell>}
      <div className="wrap"><div className={L.bare ? "" : "lg:ml-[260px] lg:max-w-[1000px]"}>{p.figma && !L.bare && <FigmaEmbed url={p.figma} title={p.name} />}
        <Link href={`/work/${next.slug}`} className="group block border-t border-secondary py-16" data-cursor="grow">
          <span className="text-[13px] text-muted">Next project</span>
          <span className="mt-2 block text-[clamp(28px,4vw,56px)] leading-[1.1] tracking-[-0.02em] transition-transform duration-[420ms] ease-out group-hover:translate-x-3">{next.name} →</span>
        </Link>
      </div></div>
      <Footer />
    </>
  );
}
