import { experience } from "@/data/experience";
export function Experience() {
  return (
    <div>
      <h3 className="text-[20px] font-semibold">Experience</h3>
      <ul className="mt-6 divide-y divide-secondary">
        {experience.map((e) => (
          <li key={e.company + e.years} className="grid grid-cols-[1fr_auto] gap-x-4 py-4">
            <div><p className="text-[16px]">{e.company}</p><p className="text-[15px] text-muted">{e.role}</p></div>
            <p className="text-[15px] text-muted tabular-nums">({e.years})</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
