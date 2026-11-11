import { experience } from "@/data/experience";
import { Reveal } from "./Reveal";

// Full-width row: label on the left, entries spread across columns (reference layout).
export function Experience() {
  return (
    <Reveal className="grid grid-cols-12 gap-x-6 gap-y-6 border-t border-secondary py-[72px] max-lg:py-10">
      <h3 className="col-span-2 text-[24px] font-semibold leading-[1.2] max-lg:col-span-12 max-lg:text-[20px]">Experience</h3>
      <ul className="col-span-10 grid grid-flow-col auto-cols-fr gap-x-6 max-lg:col-span-12 max-lg:grid-flow-row max-lg:gap-y-6 max-sm:grid-cols-1">
        {experience.map((e) => (
          <li key={e.company + e.years}>
            <p className="text-[16px] font-medium">{e.company}</p>
            <p className="mt-1 text-[16px] text-muted">{e.role}</p>
            <p className="mt-4 text-[16px]">({e.years})</p>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}
