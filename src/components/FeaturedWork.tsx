import { projects } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";

export function FeaturedWork() {
  return (
    <section id="work" className="pt-[144px] max-lg:pt-20">
      <div className="wrap">
        <h2 className="sr-only">Work</h2>
        {projects.map((p, i) => <ProjectCard key={p.slug} project={p} index={i} />)}
      </div>
    </section>
  );
}
