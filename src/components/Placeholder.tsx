// Generated stand-in for project imagery: a flat device frame with abstract UI blocks.
export function Placeholder({ accent, variant = 0, className = "" }: { accent: string; variant?: number; className?: string }) {
  const wide = variant % 3 === 0;
  return (
    <div className={`relative flex h-full w-full items-center justify-center overflow-hidden bg-tile ${className}`} aria-hidden>
      <div
        className="relative overflow-hidden rounded-[10px] bg-white shadow-[0_8px_30px_rgba(0,0,0,.12)]"
        style={{ width: wide ? "78%" : "46%", aspectRatio: wide ? "16/10" : "9/16", maxHeight: "86%" }}
      >
        <div className="h-[12%] w-full" style={{ background: accent }} />
        <div className="space-y-[6%] p-[6%]">
          <div className="h-[7px] w-2/3 rounded-full bg-black/80" />
          <div className="h-[5px] w-full rounded-full bg-black/10" />
          <div className="h-[5px] w-5/6 rounded-full bg-black/10" />
          <div className="grid grid-cols-3 gap-[4%] pt-[4%]">
            {[0, 1, 2].map((i) => (
              <div key={i} className="aspect-square rounded-[4px]" style={{ background: i === variant % 3 ? accent : "#0000000d", opacity: i === variant % 3 ? 0.85 : 1 }} />
            ))}
          </div>
          <div className="h-[18%] w-full rounded-[4px] bg-black/5" />
        </div>
      </div>
    </div>
  );
}
