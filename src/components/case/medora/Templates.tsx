"use client";
import { useEffect, useRef, useState } from "react";
import { Stage } from "./Stage";

type K = "bar" | "app" | "hero" | "image" | "cards" | "text" | "tags" | "footer" | "rows" | "downloads" | "callout" | "crumb" | "feature";
type Blk = [string, number, K];
type Pg = { id: string; name: string; read: string; d: Blk[]; m: Blk[] };

const pages: Pg[] = [
  { id: "corporate-home", name: "Corporate Home", read: "Utility bar and app bar, a hero feature, two press cards, News & Stories with a feature card and a three-card grid, an overlay banner, a professional callout, follow row and footer.",
    d: [["Utility Bar", 116, "bar"], ["App Bar", 65, "app"], ["Hero Feature", 548, "hero"], ["Featured press cards", 260, "cards"], ["News & Stories", 1040, "feature"], ["Banner with Overlay", 344, "image"], ["Professional callout", 256, "callout"], ["Follow Row", 72, "bar"], ["Footer", 361, "footer"]],
    m: [["Utility Bar", 32, "bar"], ["App Bar", 65, "app"], ["Hero Feature", 573, "hero"], ["Featured press cards", 752, "cards"], ["News & Stories", 2126, "feature"], ["Banner with Overlay", 332, "image"], ["Professional callout", 276, "callout"], ["Follow Row", 72, "bar"], ["Footer", 937, "footer"]] },
  { id: "culture-story", name: "Culture Story", read: "Breadcrumb with previous and next, a centered article intro, a banner, three portrait story blocks with Q&A, a callout band, FAQ accordion, services and tags, related stories, share and follow rows and footer.",
    d: [["Utility Bar", 116, "bar"], ["App Bar", 65, "app"], ["Breadcrumb row", 132, "crumb"], ["Article intro", 248, "text"], ["Banner", 430, "image"], ["Story block 1", 816, "text"], ["Story block 2", 816, "text"], ["Story block 3", 816, "text"], ["Callout band", 200, "callout"], ["FAQ", 401, "rows"], ["Services and tags", 174, "tags"], ["Related stories", 580, "cards"], ["Share Row", 72, "bar"], ["Follow Row", 72, "bar"], ["Footer", 361, "footer"]],
    m: [["Utility Bar", 32, "bar"], ["App Bar", 65, "app"], ["Breadcrumb row", 52, "crumb"], ["Article intro", 272, "text"], ["Banner", 193, "image"], ["Story block 1", 713, "text"], ["Story block 2", 713, "text"], ["Story block 3", 713, "text"], ["Callout band", 196, "callout"], ["FAQ", 443, "rows"], ["Services and tags", 172, "tags"], ["Related stories", 1008, "cards"], ["Share Row", 72, "bar"], ["Follow Row", 72, "bar"], ["Footer", 937, "footer"]] },
  { id: "topic-hub", name: "Topic Hub", read: "Breadcrumb, topic title and two-paragraph intro, a hero photo, latest articles with a feature card, grid and load more, further topics with a topic tile and downloads list, references, follow row and footer.",
    d: [["Utility Bar", 116, "bar"], ["App Bar", 65, "app"], ["Breadcrumb row", 52, "crumb"], ["Title and intro", 264, "text"], ["Hero photo", 440, "image"], ["Latest articles", 1026, "feature"], ["Further topics", 808, "downloads"], ["References", 172, "text"], ["Follow Row", 72, "bar"], ["Footer", 361, "footer"]],
    m: [["Utility Bar", 32, "bar"], ["App Bar", 65, "app"], ["Breadcrumb row", 52, "crumb"], ["Title and intro", 332, "text"], ["Hero photo", 193, "image"], ["Latest articles", 1982, "feature"], ["Further topics", 1384, "downloads"], ["References", 186, "text"], ["Follow Row", 72, "bar"], ["Footer", 937, "footer"]] },
];

const BL = "#2563eb", LN = "#e2e8f0", G = "#cbd5e1";
const line = (w: number | string, h = 10, c = G) => <i style={{ display: "block", width: w, height: h, background: c, borderRadius: 3 }} />;

function Block({ b, w }: { b: Blk; w: number }) {
  const [label, h, k] = b; const pad = w > 600 ? 64 : 16; const inner = w - pad * 2;
  const body = (() => {
    switch (k) {
      case "bar": return <div style={{ display: "flex", alignItems: "center", gap: 12, padding: `0 ${pad}px`, height: "100%", background: "#f1f5f9" }}>{line(90, 10)}{line(60, 10)}<span style={{ marginLeft: "auto" }}>{line(70, 10)}</span></div>;
      case "app": return <div style={{ display: "flex", alignItems: "center", gap: 18, padding: `0 ${pad}px`, height: "100%", borderBottom: `1px solid ${LN}`, background: "#fff" }}><b style={{ width: 28, height: 28, borderRadius: 8, background: BL }} />{w > 600 && <>{line(60)}{line(60)}{line(60)}</>}<span style={{ marginLeft: "auto" }}>{line(w > 600 ? 90 : 28, 28, "#e2e8f0")}</span></div>;
      case "hero": return <div style={{ height: "100%", background: "linear-gradient(135deg,#1e3a8a,#2563eb)", color: "#fff", padding: `${h * 0.18}px ${pad}px`, display: "flex", flexDirection: "column", gap: 14, justifyContent: "flex-end" }}><div style={{ fontSize: w > 600 ? 44 : 30, fontWeight: 700, lineHeight: 1.1, maxWidth: inner * 0.7 }}>Headline placeholder text</div>{line(inner * 0.5, 12, "#ffffff88")}<span style={{ background: "#fff", width: 110, height: 38, borderRadius: 8 }} /></div>;
      case "image": return <div style={{ height: "100%", padding: `0 ${w > 600 && label !== "Banner with Overlay" ? pad : 0}px` }}><div style={{ height: "100%", background: "linear-gradient(135deg,#cbd5e1,#94a3b8)", borderRadius: label === "Banner with Overlay" ? 0 : 10, display: "flex", alignItems: "flex-end", padding: 24, color: "#fff", fontWeight: 600, fontSize: 22 }}>{label === "Banner with Overlay" ? "Overlay banner message" : ""}</div></div>;
      case "cards": case "feature": {
        const cols = w > 600 ? 3 : 1; const n = label === "Featured press cards" ? (w > 600 ? 2 : 2) : cols === 3 ? 3 : 2;
        return <div style={{ padding: `48px ${pad}px`, display: "flex", flexDirection: "column", gap: 24, height: "100%" }}>
          {k === "feature" && <><div style={{ display: "flex", justifyContent: "space-between" }}><b style={{ fontSize: 28 }}>{label.split(" ")[0] === "Latest" ? "Latest articles" : "News & Stories"}</b>{line(110, 12, BL)}</div><div style={{ height: h * 0.28, background: "#e2e8f0", borderRadius: 10 }} /></>}
          <div style={{ display: "grid", gridTemplateColumns: `repeat(${k === "cards" && label === "Featured press cards" ? (w > 600 ? 2 : 1) : cols},1fr)`, gap: 24, flex: 1 }}>{Array.from({ length: k === "feature" ? n + 1 : n }).slice(0, k === "feature" ? (cols === 3 ? 3 : 3) : n).map((_, i) => <div key={i} style={{ border: `1px solid ${LN}`, borderRadius: 10, overflow: "hidden", background: "#fff" }}><div style={{ height: "45%", background: "#e2e8f0" }} /><div style={{ padding: 14, display: "grid", gap: 8 }}>{line("80%", 12, "#94a3b8")}{line("95%")}{line("60%")}</div></div>)}</div></div>;
      }
      case "text": return <div style={{ padding: `32px ${w > 600 ? 240 : pad}px`, display: "grid", gap: 14, alignContent: "start" }}>{h > 500 && <div style={{ height: h * 0.55, background: "linear-gradient(135deg,#e2e8f0,#cbd5e1)", borderRadius: 10 }} />}<div style={{ fontSize: 30, fontWeight: 700 }}>{h > 500 ? "Person name · theme" : label === "Title and intro" ? "Topic title" : "Page headline placeholder"}</div>{line("100%")}{line("92%")}{line("70%")}</div>;
      case "callout": return <div style={{ padding: `40px ${pad}px`, display: "grid", gap: 14, justifyItems: w > 600 && label === "Callout band" ? "center" : "start" }}><b style={{ fontSize: 28 }}>Callout question placeholder?</b>{line(inner * 0.6)}<span style={{ background: BL, width: 120, height: 40, borderRadius: 8 }} /></div>;
      case "crumb": return <div style={{ display: "flex", alignItems: "center", gap: 10, padding: `0 ${pad}px`, height: "100%" }}>{line(60)}<span>›</span>{line(80)}<span>›</span>{line(70, 10, "#94a3b8")}</div>;
      case "tags": return <div style={{ padding: `24px ${w > 600 ? 240 : pad}px`, display: "grid", gap: 10 }}><b style={{ fontSize: 20 }}>Services</b><div style={{ display: "flex", gap: 8 }}>{[70, 70, 80].map((x, i) => <span key={i} style={{ width: x, height: 26, borderRadius: 99, background: "#dbeafe" }} />)}</div></div>;
      case "rows": return <div style={{ padding: `32px ${w > 600 ? 240 : pad}px`, display: "grid", gap: 10 }}><b style={{ fontSize: 28 }}>Frequently asked questions</b>{[0, 1, 2].map((i) => <div key={i} style={{ border: `1px solid ${LN}`, borderRadius: 8, padding: 14, display: "flex", justifyContent: "space-between" }}>{line("60%", 12, "#94a3b8")}<span>+</span></div>)}</div>;
      case "downloads": return <div style={{ padding: `48px ${pad}px`, display: "grid", gap: 20 }}><b style={{ fontSize: 28 }}>Further topics</b><div style={{ display: "grid", gridTemplateColumns: w > 600 ? "1fr 1fr" : "1fr", gap: 24 }}><div style={{ height: 300, borderRadius: 10, background: "linear-gradient(135deg,#bfdbfe,#60a5fa)" }} /><div style={{ border: `1px solid ${LN}`, borderRadius: 10, padding: 20, display: "grid", gap: 12 }}><b>Downloads</b>{[0, 1, 2, 3].map((i) => <div key={i} style={{ height: 52, borderRadius: 8, background: "#f1f5f9" }} />)}</div></div></div>;
      case "footer": return <div style={{ height: "100%", background: "#0f172a", padding: `40px ${pad}px`, display: "grid", gap: 12, alignContent: "start" }}><b style={{ color: "#fff", fontSize: 22 }}>Footer</b>{[0, 1, 2].map((i) => line(inner * (0.3 + i * 0.1), 10, "#475569"))}</div>;
    }
  })();
  return <div title={label} style={{ height: h, overflow: "hidden", position: "relative", borderBottom: "1px dashed #e2e8f0" }}>{body}<span style={{ position: "absolute", right: 8, top: 6, fontSize: 11, background: "#0f172acc", color: "#fff", borderRadius: 4, padding: "1px 6px" }}>{label}</span></div>;
}

function Viewport({ blocks, w, label, id, kind, mode }: { blocks: Blk[]; w: number; label: string; id: string; kind: "desktop" | "mobile"; mode: "light" | "dark" }) {
  const total = blocks.reduce((a, b) => a + b[1], 0);
  const [ok, setOk] = useState(false); const ref = useRef<HTMLImageElement>(null);
  useEffect(() => { const im = ref.current; if (im && im.complete && im.naturalWidth > 0) setOk(true); }, []);
  const src = `/case/medora-design-system/templates/${id}-${kind}${mode === "dark" ? "-dark" : ""}.webp`;
  return (
    <div className="min-w-0">
      <p className="mb-2 text-[13px] text-muted">{label}</p>
      <div className="max-h-[560px] overflow-y-auto rounded-[8px] border border-secondary bg-surface">
        <img ref={ref} src={src} alt={`${id} ${kind} ${mode}`} className={ok ? "block h-auto w-full" : "hidden"} onLoad={() => setOk(true)} />
        {!ok && (
          <Stage w={w} h={total}><div style={{ width: w, background: "#fff", color: "#0f172a", fontFamily: "Inter, sans-serif" }}>{blocks.map((b, i) => <Block key={i} b={b} w={w} />)}</div></Stage>
        )}
      </div>
    </div>
  );
}

export function TemplatesExplorer() {
  const [i, setI] = useState(0); const [mode, setMode] = useState<"light" | "dark">("light"); const p = pages[i];
  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center gap-2"><div className="flex flex-wrap gap-2" role="tablist">{pages.map((x, k) => <button key={x.id} role="tab" aria-selected={k === i} onClick={() => setI(k)} className={`rounded-full border px-4 py-2 text-[14px] transition-colors ${k === i ? "border-fg bg-fg text-bg" : "border-secondary text-muted hover:text-fg"}`}>{`Page ${k + 1} · ${x.name}`}</button>)}</div>
        <label className="ml-auto flex items-center gap-2 text-[14px] text-muted">Theme<select value={mode} onChange={(e) => setMode(e.target.value as "light" | "dark")} aria-label="Template theme" className="rounded-full border border-secondary bg-surface px-4 py-2 text-[14px] text-fg outline-none transition-colors hover:border-fg focus-visible:border-fg"><option value="light">Light</option><option value="dark">Dark</option></select></label></div>
      <p className="mb-6 max-w-[720px] text-[15px] leading-[24px] text-muted">{p.read}</p>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-[minmax(0,1fr)_220px]">
        <Viewport key={p.id + mode + "d"} blocks={p.d} w={1280} id={p.id} kind="desktop" mode={mode} label={`Desktop · 1280 · ${mode === "dark" ? "Dark" : "Light"}`} />
        <Viewport key={p.id + mode + "m"} blocks={p.m} w={375} id={p.id} kind="mobile" mode={mode} label={`Mobile · 375 · ${mode === "dark" ? "Dark" : "Light"}`} />
      </div>
    </div>
  );
}
