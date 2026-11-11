import { awards } from "@/data/experience";
import { Reveal } from "./Reveal";

export function Awards() {
  if (!awards.length) return null;
  return (
    <Reveal className="grid grid-cols-12 gap-x-6 gap-y-6 border-t border-secondary py-[72px] max-lg:py-10">
      <h3 className="col-span-2 text-[24px] font-semibold leading-[1.2] max-lg:col-span-12 max-lg:text-[20px]">Awards</h3>
      <ul className="col-span-10 grid grid-flow-col auto-cols-fr gap-x-6 max-lg:col-span-12 max-lg:grid-flow-row max-lg:gap-y-6">
        {awards.map((a) => (
          <li key={a.title}>
            <p className="text-[16px] font-medium">{a.title}</p>
            <p className="mt-1 text-[16px] text-muted">{a.org}</p>
            <p className="mt-4 max-w-[240px] text-[16px] leading-[1.5]">{a.note}</p>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}
