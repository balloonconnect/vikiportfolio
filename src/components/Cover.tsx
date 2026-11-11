import type { Project } from "@/data/projects";
import { Placeholder } from "./Placeholder";
import { Parallax } from "./Parallax";

// Project thumbnail: the real cover image when `project.cover` is set, otherwise the generated placeholder.
export function Cover({ project, variant = 0, sizes, drift = false }: { project: Project; variant?: number; sizes?: string; drift?: boolean }) {
  if (!project.cover) return <Placeholder accent={project.accent} variant={variant} />;
  // Letterboxed (object-contain) so wide covers are never cropped; the surround matches the cover's own colour.
  return (
    <div className="h-full w-full" style={{ background: project.coverBg ?? project.accent }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {drift ? <Parallax amount={5} scale={1} className="h-full w-full"><img src={project.cover} alt="" loading="lazy" decoding="async" draggable={false} sizes={sizes} className="h-full w-full select-none object-contain" /></Parallax> : <img src={project.cover} alt="" loading="lazy" decoding="async" draggable={false} sizes={sizes} className="h-full w-full select-none object-contain" />}
    </div>
  );
}
