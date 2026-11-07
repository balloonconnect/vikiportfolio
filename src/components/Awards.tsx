import { awards } from "@/data/experience";
export function Awards() {
  if (!awards.length) return null;
  return (
    <div>
      <h3 className="text-[20px] font-semibold">Awards</h3>
      <ul className="mt-6 divide-y divide-secondary">
        {awards.map((a) => (
          <li key={a.title} className="py-4">
            <p className="text-[16px]">{a.title}</p>
            <p className="text-[15px] text-muted">{a.org}</p>
            <p className="text-[15px] text-muted">{a.note}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
