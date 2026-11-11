import { site } from "@/data/site";
import { Experience } from "./Experience";
import { Education } from "./Education";
import { Awards } from "./Awards";
import { Reveal } from "./Reveal";

export function AboutSection() {
  return (
    <section id="about" className="pt-[144px] max-lg:pt-20">
      <div className="wrap grid grid-cols-12 gap-x-6 gap-y-12">
        <Reveal className="col-span-6 pb-[72px] max-lg:col-span-12 max-lg:pb-8">
          <h2 className="text-[24px] font-semibold leading-[1.2]">My Story</h2>
          <div className="mt-[18px] space-y-4 text-[16px] leading-[26px]">
            {site.bio.map((p) => <p key={p}>{p}</p>)}
          </div>
          <h3 className="mt-10 text-[20px] font-semibold">Skills and tools</h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {site.skills.map((s) => <li key={s} className="rounded-full border border-secondary px-3 py-1 text-[14px]">{s}</li>)}
          </ul>
        </Reveal>
        <Reveal className="col-span-5 col-start-8 max-lg:col-span-12 max-lg:col-start-1" delay={0.1}>
          {/* Replace with <Image src="/portrait.jpg" .../> */}
          <div className="mb-10 flex aspect-[4/5] w-full max-w-[420px] items-center justify-center rounded-[6px] bg-tile text-[13px] text-muted">Portrait placeholder</div>
                  </Reveal>
      </div>
      <div className="wrap mt-[96px] max-lg:mt-12"><Experience /><Education /><Awards /></div>
    </section>
  );
}
