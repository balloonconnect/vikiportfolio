"use client";
import { useState } from "react";
import { Placeholder } from "@/components/Placeholder";

const flows = {
  "Patient path": ["Login", "Dashboard", "Medical records", "Upload report", "AI processing", "Report explanation", "Appointments", "Report history"],
  "Doctor path": ["Login", "Dashboard", "Patient list", "Patient profile", "Medical report", "AI summary review", "Clinical notes", "Follow-up"],
} as const;

// Eight-frame prototype flows. Swap each tile for an exported frame when images are available.
export function ProtoFlows({ accent }: { accent: string }) {
  const [k, setK] = useState<keyof typeof flows>("Patient path");
  return (
    <div>
      <div role="tablist" className="mb-6 flex gap-2">
        {(Object.keys(flows) as (keyof typeof flows)[]).map((f) => (
          <button key={f} role="tab" aria-selected={k === f} onClick={() => setK(f)} data-cursor="grow"
            className="rounded-full border px-4 py-2 text-[14px] transition-colors duration-200"
            style={{ background: k === f ? "var(--fg)" : "var(--surface)", color: k === f ? "var(--bg)" : "var(--fg)", borderColor: "var(--border)" }}>{f} · 8 screens</button>
        ))}
      </div>
      <ol className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {flows[k].map((s, i) => (
          <li key={s} className="group">
            <div className="aspect-[16/10] overflow-hidden rounded-[6px] border border-secondary transition-transform duration-[240ms] ease-spring group-hover:-translate-y-1"><Placeholder accent={accent} variant={i} /></div>
            <p className="mt-2 text-[13px] text-muted">{String(i + 1).padStart(2, "0")}</p><p className="text-[15px]">{s}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
