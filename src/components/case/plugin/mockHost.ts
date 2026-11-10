// Stand-in for the Figma side of the plugin. The real UI (public/plugin/ui.html) sends messages
// such as {type:"scan"} and expects replies like {type:"result"}; this answers them with a sample file.
// Message shapes follow code.js in github.com/balloonconnect/global-design-check.
type Msg = Record<string, any>;
type Issue = Record<string, any>;

const P = ["Home", "Dashboard"];
const mk = (o: Issue): Issue => ({ sig: o.id, pages: P, canFix: true, safe: false, hasStyle: false, hasVars: false, currentSwatch: null, suggestedSwatch: null, preview: null, ...o });
const typeProps = (size: number, lh: number, sug: string) => [
  { label: "Font name", value: "Inter", linked: false, sug }, { label: "Weight", value: "Regular", linked: false, sug },
  { label: "Size", value: String(size), linked: false, sug }, { label: "Line height", value: String(lh), linked: true, auto: false },
];
const comp = (id: string, sev: string, name: string, to: string, layers: number, conf: number) =>
  mk({ id, sev, cat: "Components", rule: "external-instance", title: "External library component", object: layers > 1 ? `${name} + ${layers - 1} more` : name, current: `Legacy UI Kit / ${name}`, suggested: to, conf, action: "Swap", layers, preview: { from: `Legacy UI Kit / ${name}`, to } });

export const ISSUES: Issue[] = [
  mk({ id: "i1", sev: "warning", cat: "Colors", rule: "raw-fill", title: "Raw color · token available", object: "Model + 4 more", current: "#114E68", suggested: "Secondary / Secondary_700", currentSwatch: "#114E68", suggestedSwatch: "#114E68", conf: 99, action: "Apply", safe: true, layers: 5 }),
  mk({ id: "i2", sev: "warning", cat: "Accessibility", rule: "contrast", title: "Contrast below AA", object: "Button label + 4 more", current: "4.2:1", suggested: "Secondary / Secondary_800", currentSwatch: "#114E68", suggestedSwatch: "#1b6f94", conf: 86, action: "Fix", layers: 5, preview: { kind: "contrast", ratio: 4.2, required: 4.5, bg: "#ffffff", fg: "#7a7f8a" } }),
  mk({ id: "i3", sev: "warning", cat: "Accessibility", rule: "text-size", title: "Text below minimum size", object: "Caption + 1 more", current: "10px", suggested: "12px", conf: 100, action: "Set size", layers: 2, preview: { size: 10 } }),
  comp("i4", "warning", "Button / Primary", "In-file / Button / Primary", 2, 96),
  comp("i5", "warning", "Input / Text", "In-file / Input / Text", 1, 94),
  mk({ id: "i6", sev: "warning", cat: "Variables", rule: "unbound-radius", title: "Corner radius not bound", object: "Card", current: "8px radius", suggested: "Radius / 8", conf: 88, action: "Bind", layers: 1 }),
  mk({ id: "i7", sev: "info", cat: "Colors", rule: "raw-stroke", title: "Raw stroke · token available", object: "Divider + 1 more", current: "#E6E7E9", suggested: "Border / Default", currentSwatch: "#E6E7E9", suggestedSwatch: "#E6E7E9", conf: 100, action: "Apply", safe: true, layers: 2 }),
  mk({ id: "i8", sev: "info", cat: "Variables", rule: "unbound-padding", title: "Padding not bound to variable", object: "Card + 4 more", current: "16px padding", suggested: "Spacing / 16", conf: 100, action: "Bind", safe: true, layers: 5 }),
  mk({ id: "i9", sev: "info", cat: "Typography", rule: "unlinked-type", title: "Typography not linked", object: "Body text + 3 more", current: "Inter · Regular · 14", suggested: "Body / Small", conf: 96, hasStyle: true, hasVars: true, layers: 4, preview: { family: "Inter", style: "Regular", size: 14, props: typeProps(14, 20, "Body / Small") } }),
  mk({ id: "i10", sev: "info", cat: "Typography", rule: "unlinked-type", title: "Typography not linked", object: "Heading + 2 more", current: "Inter · Semi Bold · 20", suggested: "Heading / H5", conf: 94, hasStyle: true, hasVars: true, layers: 3, preview: { family: "Inter", style: "Semi Bold", size: 20, props: typeProps(20, 28, "Heading / H5") } }),
  mk({ id: "i11", sev: "info", cat: "Typography", rule: "unlinked-type", title: "Typography not linked", object: "Label + 1 more", current: "Inter · Medium · 12", suggested: "Label / Small", conf: 92, hasStyle: true, layers: 2, preview: { family: "Inter", style: "Medium", size: 12, props: typeProps(12, 16, "Label / Small") } }),
  comp("i12", "info", "Card / Default", "In-file / Card / Default", 3, 95),
  comp("i13", "info", "Tag / Status", "In-file / Tag / Status", 3, 93),
  comp("i14", "info", "Avatar / M", "In-file / Avatar / M", 2, 97),
  comp("i15", "info", "Icon / Chevron", "In-file / Icon / Chevron", 2, 99),
  comp("i16", "info", "Modal / Base", "In-file / Modal / Base", 2, 90),
];

const COL_NAMES = ["Color · Primitives", "Color · Semantic", "Spacing", "Radius", "Typography", "Elevation", "Motion", "Opacity", "Border width", "Breakpoints", "Z-index", "Sizing"];
const COLLECTIONS = COL_NAMES.map((name, k) => ({ id: `c${k}`, name, lib: k < 3 ? "Design System Core" : "", remote: k < 3, varCount: 8 + ((k * 7) % 23), layers: 12 + ((k * 13) % 60) }));
const COL_TARGETS = [
  { kind: "local", id: "t1", key: "", name: "Color · Semantic v2", count: 34, lib: "" },
  { kind: "local", id: "t2", key: "", name: "Spacing v2", count: 18, lib: "" },
  { kind: "library", id: "", key: "lib-core", name: "Color · Semantic", lib: "Design System Core" },
];
const STATS = { nodes: 258, ms: 700, truncated: false, pages: 1, tokens: { floats: 42, strings: 3, colors: 36, textStyles: 14, paintStyles: 0 }, libraryImported: 0, libraryError: null, ignored: 0 };
const STEPS = [["Reading tokens…", 0], ["Walking layers…", 64], ["Walking layers…", 150], ["Matching colors…", 232], ["Checking typography…", 258], ["Matching components…", 258], ["Reading variable collections…", 258]] as const;

export function createHost(post: (m: Msg) => void, opts: { dark: boolean }) {
  let timers: number[] = []; let ignored = 0; let dark = opts.dark;
  let settings: Msg = { scope: "selection" }; // mirrors what the UI last saved, so a theme change keeps the user's settings
  const later = (fn: () => void, ms: number) => { timers.push(window.setTimeout(fn, ms)); };
  const clear = () => { timers.forEach(clearTimeout); timers = []; };
  const init = () => post({ type: "init", settings: { ...settings, dark }, selection: 1, ignored });

  const handle = (m: Msg) => {
    switch (m.type) {
      case "ready": return init();
      case "scan": {
        clear();
        STEPS.forEach(([label, nodes], k) => later(() => post({ type: "progress", nodes, label }), 120 + k * 230));
        later(() => post({ type: "result", scope: m.scope || "selection", issues: ISSUES, collections: COLLECTIONS, colTargets: COL_TARGETS, stats: { ...STATS, ignored } }), 120 + STEPS.length * 230);
        return;
      }
      case "cancel": clear(); return post({ type: "cancelled" });
      case "fix": {
        const ids: string[] = m.ids || [];
        later(() => post({ type: "fixed", results: ids.map((id) => ({ id, ok: true, fixed: ISSUES.find((i) => i.id === id)?.layers ?? 1 })) }), 650);
        return;
      }
      case "ignore": ignored += (m.sigs || []).length; return post({ type: "ignored", count: ignored });
      case "reset-ignored": ignored = 0; return post({ type: "ignored", count: 0 });
      case "col-plan": {
        const src = COLLECTIONS.find((c) => c.id === m.sourceId); if (!src) return;
        const total = src.varCount; const matched = Math.max(1, total - 2 - (total % 3));
        const unmatched = Array.from({ length: total - matched }, (_, k) => `${src.name.split(" · ")[0].toLowerCase()}/legacy-${k + 1}`);
        later(() => post({ type: "col-plan", sourceId: m.sourceId, targetKey: m.targetKey, matched, total, layers: src.layers, unmatched }), 450);
        return;
      }
      case "col-swap": {
        const src = COLLECTIONS.find((c) => c.id === m.sourceId); if (!src) return;
        const total = src.varCount; const matched = Math.max(1, total - 2 - (total % 3));
        later(() => post({ type: "col-swapped", sourceId: m.sourceId, vars: matched, layers: src.layers, failed: 0, unmatched: total - matched }), 800);
        return;
      }
      case "settings": settings = { ...m.settings }; return;
      default: return; // locate, col-locate, settings: nothing to do outside Figma
    }
  };
  return { handle, setDark: (d: boolean) => { dark = d; init(); }, dispose: clear };
}
