import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { layouts, layoutIds, type LayoutId } from "@/components/case/layouts";
import { CaseShell } from "@/components/case/blocks";
import { Footer } from "@/components/Footer";

// Preview of each fixed case study layout with placeholder content: /templates/contracts etc.
export function generateStaticParams() { return layoutIds.map((layout) => ({ layout })); }
export const metadata = { title: "Case study layout preview", robots: { index: false } };

export default async function Template({ params }: { params: Promise<{ layout: string }> }) {
  const id = (await params).layout as LayoutId;
  const L = layouts[id];
  if (!L) notFound();
  const p = { ...projects[0], layout: id, name: `Layout: ${id}`, tagline: "Placeholder layout preview. Pick this layout in src/data/projects.ts." };
  return (<><CaseShell p={p} toc={L.toc}>{L.render(p)}</CaseShell><Footer /></>);
}
