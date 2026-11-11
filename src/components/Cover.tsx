import type { Project } from "@/data/projects";
import { Placeholder } from "./Placeholder";

// Project thumbnail: the real cover image when `project.cover` is set, otherwise the generated placeholder.
export function Cover({ project, variant = 0, sizes }: { project: Project; variant?: number; sizes?: string }) {
  if (!project.cover) return <Placeholder accent={project.accent} variant={variant} />;
  // Letterboxed (object-contain) so wide covers are never cropped; the surround matches the cover's own colour.
  return (
    <div className="h-full w-full" style={{ background: project.coverBg ?? project.accent }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={project.cover} alt="" loading="lazy" decoding="async" draggable={false} sizes={sizes} className="h-full w-full select-none object-contain" />
    </div>
  );
}
