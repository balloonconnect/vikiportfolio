import type { Project } from "@/data/projects";
import { PluginFrame } from "./plugin/PluginFrame";
import { OutcomeStats, AnimatedPipeline, FlowTabs } from "./plugin/Motion";
import { Placeholder } from "@/components/Placeholder";
import { ProtoFlows } from "./medisystem/Flows";
import { Sec, P, Img, Video, Stats, Personas, Cards, Columns, Decisions, Features, Directions, Choose, Quotes, Callouts, Gallery, Grid, Compare, MoreWork, Shot, Steps, Pipeline } from "./blocks";

export type LayoutId = "contracts" | "give" | "legalease" | "itm" | "transitstats" | "plugin" | "medisystem";
type Layout = { toc: { id: string; label: string }[]; render: (p: Project) => React.ReactNode };
const T = (...labels: string[]) => labels.map((l) => ({ id: l.toLowerCase().replace(/[^a-z0-9]+/g, "-"), label: l }));
const S = (label: string) => label.toLowerCase().replace(/[^a-z0-9]+/g, "-");
const copy = "Placeholder paragraph. Replace with two or three sentences about this part of the project.";

// 1. Contracts: video hero, long research + audit + features + design system + notifications.
const contracts: Layout = {
  toc: T("Overview", "Impact", "Users", "Research", "Audit", "Exploration", "Process", "Features", "Design system", "Results", "Feedback", "More work"),
  render: (p) => (<>
    <Sec id="overview"><Video accent={p.accent} caption="Demo video" /></Sec>
    <Sec id="impact" title="Impact"><Stats items={[["-40%", "Review time"], ["3x", "Faster approvals"], ["85", "Usability score"], ["1.5k", "Monthly users"]]} /></Sec>
    <Sec id="challenge" title="Challenge"><P>{copy}</P></Sec>
    <Sec id="collaboration" title="Collaboration"><P>{copy}</P></Sec>
    <Sec id="users" title="Designing for different users"><Personas accent={p.accent} items={[["Primary user", "Placeholder goals and context."], ["Secondary user", "Placeholder goals and context."]]} /></Sec>
    <Sec id="research" title="Research"><P>Interview questions and findings.</P><div className="mt-6 grid gap-4 md:grid-cols-2"><Cards items={[["User pain points", "Placeholder list of pain points."]]} /><Cards items={[["Business requirements", "Placeholder list of requirements."]]} /></div><div className="mt-6"><Img accent={p.accent} variant={1} caption="Research synthesis board" /></div></Sec>
    <Sec id="audit" title="Audit"><Img accent={p.accent} variant={2} /><Callouts items={["Placeholder annotation", "Placeholder annotation", "Placeholder annotation", "Placeholder annotation"]} /></Sec>
    <Sec id="exploration" title="Exploration"><div className="space-y-6"><Img accent={p.accent} variant={1} caption="Annotated legacy screen" /><Img accent={p.accent} variant={0} caption="Low-fidelity wireframe" /></div><div className="mt-6"><Cards cols={2} items={[["Pros", "+ Placeholder point"], ["Cons", "- Placeholder point"]]} /></div></Sec>
    <Sec id="process" title="Design process"><Grid accent={p.accent} n={3} cols={3} caption="Stage" /></Sec>
    <Sec id="before-after" title="Before and after"><Compare accent={p.accent} /></Sec>
    <Sec id="features" title="Key features"><Features accent={p.accent} video items={[["Feature one", copy], ["Feature two", copy], ["Feature three", copy], ["Feature four", copy]]} /></Sec>
    <Sec id="ai" title="AI section"><P>{copy}</P><div className="mt-6"><Video accent={p.accent} /></div></Sec>
    <Sec id="components" title="Custom components"><Grid accent={p.accent} n={4} cols={4} ratio="1/1" caption="Card" /></Sec>
    <Sec id="design-system" title="Design system"><div className="space-y-6"><Img accent={p.accent} variant={3} /><Img accent={p.accent} variant={0} /></div></Sec>
    <Sec id="notifications" title="Notifications"><Grid accent={p.accent} n={4} cols={2} caption="Channel" /></Sec>
    <Sec id="workflow" title="Workflow diagram"><P>{copy}</P><div className="mt-6"><Img accent={p.accent} variant={1} /></div></Sec>
    <Sec id="results" title="Results"><Stats items={[["92%", "Usability score"], ["70%", "Adoption"], ["+35%", "Usage growth"]]} /></Sec>
    <Sec id="feedback" title="Colleague feedback"><Quotes /></Sec>
    <Sec id="more-work" title="More of my work"><MoreWork current={p.slug} /></Sec>
  </>),
};

// 2. Give: hero pair, three directions, choosing, key experiences, before and after, handoff.
const give: Layout = {
  toc: T("Overview", "Impact", "Directions", "Choosing", "Experiences", "Before and after", "Handoff", "Feedback", "More work"),
  render: (p) => (<>
    <Sec id="overview"><div className="grid gap-6 md:grid-cols-2"><Img accent={p.accent} variant={0} /><Img accent={p.accent} variant={3} /></div></Sec>
    <Sec id="challenge" title="Challenge"><P>{copy}</P></Sec>
    <Sec id="impact" title="Impact"><Stats items={[["-30%", "Time to donate"], ["2x", "Volunteer sign-ups"], ["4.6", "CSAT"], ["12k", "Users"]]} /></Sec>
    <Sec id="collaboration" title="Collaboration"><P>{copy}</P></Sec>
    <Sec id="directions" title="Design directions"><P>{copy}</P><div className="mt-6"><Directions accent={p.accent} /></div></Sec>
    <Sec id="choosing" title="Choosing a direction"><Choose accent={p.accent} /></Sec>
    <Sec id="experiences" title="Key experiences"><Features accent={p.accent} items={[["Landing page", copy], ["Volunteer hub", copy], ["Campaign page", copy], ["Mobile experience", copy]]} /></Sec>
    <Sec id="before-and-after" title="Before and after"><Compare accent={p.accent} /></Sec>
    <Sec id="notifications" title="Notifications"><Img accent={p.accent} variant={2} caption="Caption" /></Sec>
    <Sec id="handoff" title="Component library and handoff"><Img accent={p.accent} variant={1} caption="Documentation" /></Sec>
    <Sec id="results" title="Results in person"><Img accent={p.accent} variant={3} caption="Caption" /></Sec>
    <Sec id="feedback" title="Colleague feedback"><Quotes /></Sec>
    <Sec id="more-work" title="More of my work"><MoreWork current={p.slug} /></Sec>
  </>),
};

// 3. LegalEase: two personas, pain points, workflow strip, decisions, features per audience.
const legalease: Layout = {
  toc: T("Overview", "Impact", "Users", "Research", "Workflow", "Process", "Decisions", "Feedback", "Requesters", "Legal teams", "Results", "Testimonials", "More work"),
  render: (p) => (<>
    <Sec id="overview"><Video accent={p.accent} caption="Demo video" /></Sec>
    <Sec id="challenge" title="Challenge"><P>{copy}</P></Sec>
    <Sec id="impact" title="Impact"><Stats items={[["$1M", "Saved each year"], ["5k", "Hours saved"]]} /></Sec>
    <Sec id="collaboration" title="Collaboration"><P>{copy}</P></Sec>
    <Sec id="users" title="Designing for different users"><Personas accent={p.accent} items={[["Requesters", "Placeholder description."], ["Reviewers", "Placeholder description."]]} /></Sec>
    <Sec id="research" title="User research"><Cards items={[1, 2, 3, 4, 5].map((n) => [`Pain point ${n}`, "Placeholder paragraph describing the problem."] as [string, string])} /></Sec>
    <Sec id="workflow" title="Understanding the workflow"><Columns items={[{ title: "Create", bullets: ["Step", "Step"], tag: "Outcome" }, { title: "Review", bullets: ["Step", "Step"], tag: "Outcome" }, { title: "Communicate", bullets: ["Step", "Step"], tag: "Outcome" }, { title: "Approve", bullets: ["Step", "Step"], tag: "Outcome" }]} /></Sec>
    <Sec id="process" title="Design process"><div className="grid gap-6 md:grid-cols-2"><Img accent="#7c7c7c" variant={0} caption="Grayscale wireframe" /><Img accent={p.accent} variant={3} caption="Final design" /></div></Sec>
    <Sec id="decisions" title="Key decisions"><Decisions items={[["Decision one", "One-line explanation."], ["Decision two", "One-line explanation."], ["Decision three", "One-line explanation."]]} /></Sec>
    <Sec id="feedback" title="Feedback from users"><Compare accent={p.accent} /></Sec>
    <Sec id="requesters" title="Key features for requesters"><Features accent={p.accent} video items={[["Dashboard and grid", copy], ["Submission form", copy], ["Communication", copy]]} /></Sec>
    <Sec id="legal-teams" title="Key features for legal teams"><Features accent={p.accent} video items={[["Triage board", copy], ["Request view", copy], ["Assign and approve", copy]]} /></Sec>
    <Sec id="results" title="Results after launch"><Stats items={[["6 wks to <1", "Processing time"], ["4k", "Requests processed"]]} /></Sec>
    <Sec id="testimonials" title="Colleague feedback"><Quotes /></Sec>
    <Sec id="more-work" title="More of my work"><MoreWork current={p.slug} /></Sec>
  </>),
};

// 4. ITM: hero pair, stakeholder needs, flow + wireframes, stacked directions, six experiences.
const itm: Layout = {
  toc: T("Overview", "Impact", "Needs", "Research", "Wireframes", "Directions", "Choosing", "Experiences", "Feedback", "More work"),
  render: (p) => (<>
    <Sec id="overview"><div className="grid gap-6 md:grid-cols-2"><Img accent={p.accent} variant={0} /><Img accent={p.accent} variant={3} /></div></Sec>
    <Sec id="challenge" title="Challenge"><P>{copy}</P></Sec>
    <Sec id="impact" title="Impact"><Stats items={[["-50%", "Task time"], ["3x", "Adoption"], ["4.7", "Satisfaction"]]} /></Sec>
    <Sec id="collaboration" title="Collaboration"><P>{copy}</P></Sec>
    <Sec id="needs" title="Understanding the need"><Columns items={[{ title: "Stakeholder group 1", bullets: ["Need", "Need", "Need"] }, { title: "Stakeholder group 2", bullets: ["Need", "Need", "Need"] }, { title: "Stakeholder group 3", bullets: ["Need", "Need", "Need"] }]} /></Sec>
    <Sec id="research" title="Research and planning"><P>{copy}</P><div className="mt-6"><Img accent={p.accent} variant={1} caption="Flow diagram" /></div></Sec>
    <Sec id="wireframes" title="Initial wireframes"><P>{copy}</P><div className="mt-6"><Img accent="#7c7c7c" variant={0} /></div></Sec>
    <Sec id="directions" title="Design directions"><P>{copy}</P><div className="mt-6"><Directions accent={p.accent} labels={["Low fidelity", "Medium fidelity", "High fidelity"]} stacked /></div></Sec>
    <Sec id="choosing" title="Choosing a direction"><Choose accent={p.accent} /></Sec>
    <Sec id="experiences" title="Key experiences"><Features accent={p.accent} items={[1, 2, 3, 4, 5, 6].map((n) => [`Screen ${n}`, copy] as [string, string])} /></Sec>
    <Sec id="feedback" title="Colleague feedback"><Quotes /></Sec>
    <Sec id="more-work" title="More of my work"><MoreWork current={p.slug} /></Sec>
  </>),
};

// 5. TransitStats: screenshot gallery, counters, mapping, iterations, annotated decisions, branding, growth.
const transitstats: Layout = {
  toc: T("Overview", "Impact", "Users", "Mapping", "Process", "Iterations", "Decisions", "Experiences", "Branding", "Growth", "Feedback", "More work"),
  render: (p) => (<>
    <Sec id="overview"><Gallery accent={p.accent} n={7} /></Sec>
    <Sec id="challenge" title="Challenge"><P>{copy}</P></Sec>
    <Sec id="impact" title="Impact"><Stats items={[["100k", "Users"], ["5k", "Premium users"], ["20k", "Daily active"], ["4.8", "Store rating"]]} /><div className="mt-10"><Stats items={[["1.2M", "Rides"], ["18M", "Miles"], ["950k", "Hours"]]} /></div></Sec>
    <Sec id="users" title="Who I designed for"><Personas accent={p.accent} items={[["Primary user", "Placeholder bullets."], ["Secondary user", "Placeholder bullets."]]} /></Sec>
    <Sec id="mapping" title="Feature mapping"><Img accent={p.accent} variant={1} caption="Features sorted into categories" /></Sec>
    <Sec id="process" title="Design process"><P>{copy}</P><div className="mt-6"><Grid accent={p.accent} n={4} cols={4} ratio="9/16" caption="Stage" /></div></Sec>
    <Sec id="iterations" title="Design iterations"><Grid accent={p.accent} n={3} cols={3} ratio="3/4" caption="Iteration" /><Callouts items={["Placeholder annotation", "Placeholder annotation", "Placeholder annotation"]} /></Sec>
    <Sec id="decisions" title="Key decisions"><div className="grid gap-6 md:grid-cols-2"><Img accent={p.accent} variant={0} caption="Tracking" /><Img accent={p.accent} variant={3} caption="Ranking" /></div><Callouts items={["Entry point", "At-a-glance info", "Personalisation", "Social features"]} /></Sec>
    <Sec id="experiences" title="Key experiences"><Features accent={p.accent} video items={[["Dashboard", copy], ["Live tracking", copy], ["Coverage map and history", copy], ["Stats and achievements", copy], ["Leaderboard", copy]]} /></Sec>
    <Sec id="branding" title="Branding"><Grid accent={p.accent} n={4} cols={2} caption="Asset" /></Sec>
    <Sec id="ai" title="AI workflow"><Img accent={p.accent} variant={1} caption="Tool chain" /></Sec>
    <Sec id="growth" title="Growth"><Grid accent={p.accent} n={4} cols={2} caption="Channel" /></Sec>
    <Sec id="news" title="In the news"><Img accent={p.accent} variant={2} caption="Caption" /></Sec>
    <Sec id="feedback" title="User feedback"><Quotes /></Sec>
    <Sec id="more-work" title="More of my work"><MoreWork current={p.slug} /></Sec>
  </>),
};


// 6. Plugin: tool case study with real UI shots, problem cards, approach steps, feature map, architecture, tokens, flows.
const D = "/case/global-design-check";
const plugin: Layout = {
  toc: T("Overview", "Problem", "Goals", "Approach", "Features", "How it works", "Decisions", "Design system", "Prototype", "Outcomes", "Next steps", "Try it", "More work"),
  render: (p) => (<>
    <div className="mb-[72px] max-lg:mb-12"><Shot src={`${D}/cover.png`} alt="Global Design Check: one plugin for every global designer to find and fix design-system drift" w={1440} h={892} /></div>
    <Sec id="overview" title="A single, trustworthy pass over a design file">
      <div className="grid items-start gap-10 md:grid-cols-[minmax(0,1fr)_320px]">
        <div><P>Global teams share one design system across many files, markets and designers. Drift creeps in quietly. Global Design Check turns an hours-long manual audit into a scan, a review and a one-step fix.</P>
          <div className="mt-8"><Cards items={[["What it is", "A Figma plugin with seven checks: Variables, Typography, Colors, Components, Accessibility, Collections, and an All view that combines them."], ["Who it is for", "Product designers, design-system maintainers and reviewers who work across files, libraries and locales."], ["What makes it different", "Fixes are tied to your own tokens. Safe matches apply in one click and undo as one step. Everything else is shown for review."]]} /></div></div>
        <Shot src={`${D}/hero-ui.png`} alt="Global Design Check plugin showing project health, tabs and issue cards" w={870} h={1440} caption="The plugin at 420 px wide" narrow />
      </div>
    </Sec>
    <Sec id="problem" title="Design files drift from the system"><P>Every file that leaves the system silently costs the team later: inconsistent UI, rework in review, and slower engineering hand-off.</P><div className="mt-6"><Cards cols={3} items={[["Hardcoded values", "Padding, gap, radius and colors typed in by hand instead of bound to variables, so a token update never reaches them."], ["Unlinked typography", "Font name, weight, size and line height set directly. Text looks right but ignores the style and variable system."], ["Library drift", "Instances from retired or external libraries stay in files even when an in-file component exists."], ["Accessibility misses", "Low contrast, tiny text and small touch targets are found late, usually in review or after release."], ["Collection migrations", "Moving a file from an old variable collection to a new one is tedious and error-prone when done binding by binding."], ["No target, no trust", "Many audit tools list problems without a way to jump to the layer, so reviewers stop using them."]]} /></div></Sec>
    <Sec id="goals" title="Designed for speed, safety and trust"><P>The goals below shaped every screen. User groups are working assumptions to validate with interviews, not measured findings.</P><div className="mt-6"><Cards cols={2} items={[["1 · Find everything fast", "One scan covers variables, styles, colors, components, accessibility and collections."], ["2 · Fix without fear", "Exact matches are safe. Near matches need review. Every fix batch undoes in one step."], ["3 · Show where", "Every issue, whatever its severity, has a Select layers or Locate button that selects and zooms to the layer."], ["4 · Work with any system", "Suggestions come from the file's own local tokens and library items already in use. No hardcoded design system."]]} /></div><div className="mt-6"><Cards cols={3} items={[["Product designer (assumption)", "Wants to ship a clean file before review without learning every token name."], ["Design-system maintainer (assumption)", "Wants to see how far files have drifted and migrate collections safely."], ["Reviewer or QA (assumption)", "Wants a quick list of problems with a jump-to-layer button and an exportable report."]]} /></div></Sec>
    <Sec id="approach" title="From a Figma Make prototype to a working plugin"><P>The starting point was an interactive prototype of the plugin UI. The approach kept that interface and replaced the mock data with a real scan and fix engine.</P><div className="mt-6"><Steps items={[["1 · Discover", "Reviewed the prototype screens and flows, then listed the checks a global team needs."], ["2 · Define", "Chose safe versus review fixes, grouped issues by signature and set rules for matching."], ["3 · Design", "Built tokens, a seven-tab layout, issue cards and a settings sheet in light and dark."], ["4 · Build", "Wrote the plugin in plain JavaScript with async Figma APIs and no build step."], ["5 · Verify", "Ran the engine against a mock Figma document and tuned layout with user feedback."]]} /></div><div className="mt-6"><Cards items={[["Iterated on real feedback", "Feedback changed the product in four places: the Component Migration settings were removed, the Components tab now lists external-library instances, Typography links each property to library and local styles, and a Collections tab was added for swapping variable collections."]]} /></div></Sec>
    <Sec id="features" title="Seven views, one consistent card"><P>Every tab uses the same issue card: checkbox, category icon, plain-language title, Safe and match badges, a Current to Suggested comparison, and Ignore, Select layers and Apply actions.</P><div className="mt-6"><Cards cols={3} items={[["All", "Combined list grouped by severity with errors first. Health score and safe-fix count at the top."], ["Variables", "Padding, gap and corner radius not bound to variables. Broken and deprecated variable bindings."], ["Typography", "Font name, weight, size and line height shown as separate properties. Suggests library styles in use and local styles."], ["Colors", "Raw fills and strokes, broken and deprecated tokens. Exact matches are safe, close matches use Lab color distance and need review."], ["Components", "External library instances with an in-file replacement shown side by side. Flags instances whose main component is missing."], ["Accessibility", "WCAG contrast ratio with a suggested fix, minimum text size and minimum touch target size."], ["Collections", "Usage by collection. Plans a swap from one collection to another by variable name and type, with a preview before applying."]]} /></div></Sec>
    <Sec id="how-it-works" title="A scan engine behind a calm interface"><P>The plugin has two parts that talk through messages: a UI that renders results and a main thread that reads and edits the document.</P><div className="mt-6"><Columns items={[{ title: "UI · ui.html", bullets: ["Tabs, severity groups, issue cards", "Health score and settings sheet", "Search, filters and export (CSV, JSON, summary)", "Light and dark themes from Figma tokens"] }, { title: "Main · code.js", bullets: ["Token loader: variables, text and paint styles", "Matchers: exact value and Lab color distance", "Checks: variables, type, color, components, accessibility, collections", "Fix applier with one undo step per batch"] }, { title: "Figma document", bullets: ["Layers, instances, variables and styles", "Team libraries (optional import)", "Ignore list stored with the file", "Settings stored per user"] }]} /></div><div className="mt-8"><AnimatedPipeline steps={["Load tokens", "Walk layers", "Match values", "Group by signature", "Report", "Fix and undo"]} /></div><div className="mt-6"><P>Layers are walked iteratively with regular yields so large files stay responsive. Issues are grouped by signature, so one card can fix every matching layer at once.</P></div></Sec>
    <Sec id="decisions" title="Choices that build trust"><P>Auditing tools earn trust when they are predictable. These decisions were made to keep every action understandable and reversible.</P><div className="mt-6"><Decisions items={[["Safe versus review", "Only exact matches are marked safe and included in Fix all. Near matches show a Review button instead."], ["One undo step", "Each batch of fixes is committed as one undo step, so a single shortcut reverses the whole pass."], ["Locate on every issue", "Errors, warnings and info all have a Locate button. Reviewers can always jump to the layer."], ["Property-level typography", "Font name, weight, size and line height are listed as separate chips so designers see exactly what is unlinked."], ["Plan before swap", "The Collections tab shows a mapping with matched and unmatched variables before anything changes."], ["Compact by design", "Seven tabs with inline counts fit a 420 px plugin window. The header, search and footer stay fixed while only the results scroll."]]} /></div></Sec>
    <Sec id="design-system" title="Tokens in light and dark"><P>The plugin UI uses a Color variable collection with Light and Dark modes. Every screen is bound to these variables, so the dark theme is a single mode switch.</P><div className="mt-6 space-y-6"><Shot src={`${D}/tokens.png`} alt="Color tokens for light and dark modes" w={2210} h={1254} caption="Color tokens · Light and Dark modes" /><Shot src={`${D}/typography.png`} alt="Inter type scale used in the plugin" w={1240} h={660} caption="Typography · Inter" /></div></Sec>
    <Sec id="prototype" title="Three flows you can play in Figma"><P>Open the Plugin UI page and press Present. Flows start at Idle in light or dark, Collections and Settings. The moon button switches theme.</P><div className="mt-6"><FlowTabs flows={[{ label: "Flow 1 · Scan and fix", src: `${D}/flow1.png`, alt: "Flow 1: Idle, Scanning, All issues, Fix applied", w: 2200, h: 800 }, { label: "Flow 2 · Explore tabs", src: `${D}/flow2.png`, alt: "Flow 2: Typography, Colors, Components, Collections swap", w: 2200, h: 790 }, { label: "Flow 3 · Export, settings, dark", src: `${D}/flow3.png`, alt: "Flow 3: Export menu, Settings, Compliant, Dark theme", w: 2200, h: 790 }]} /></div></Sec>
    <Sec id="outcomes" title="Outcomes"><OutcomeStats items={[[19, "Issue groups found"], [16, "Fixed in one pass"], [1, "Undo step"]]} /><div className="mt-10 grid gap-6 md:grid-cols-3"><Cards items={[["Tested", "Validated on a mock document: the engine found 19 issue groups, the fix pass applied 16, the collection swap plan was verified and undo was confirmed as one step."]]} /><Cards items={[["Iterated", "Shaped by feedback on the prototype and the first working builds."]]} /><Cards items={[["Proposed", "Success metrics are proposed, not measured yet."]]} /></div></Sec>
    <Sec id="next-steps" title="Learnings and next steps"><div className="grid gap-6 md:grid-cols-2"><Cards items={[["Learnings", "The Plugin API cannot list library styles or components, so suggestions rely on what is already in the file. Grids need min widths of zero to stay inside a 420 px window."]]} /><Cards items={[["Next", "Validate with interviews, add multi-page scan, saved reports and team rules, then publish to Figma Community."]]} /></div></Sec>
    <Sec id="try-it" title="Try the plugin"><P>This is the plugin itself. Run the check on the sample file, switch tabs, apply or ignore an issue, fix all safe issues, plan a collection swap or export a report. The moon button switches theme.</P><div className="mt-8"><PluginFrame /></div></Sec>
    <Sec id="more-work" title="More of my work"><MoreWork current={p.slug} /></Sec>
  </>),
};


const Table = ({ head, rows }: { head: string[]; rows: string[][] }) => (
  <div className="overflow-x-auto rounded-[6px] border border-secondary"><table className="w-full min-w-[560px] border-collapse text-left text-[15px]">
    <thead><tr className="bg-surface">{head.map((h) => <th key={h} className="px-4 py-3 font-semibold">{h}</th>)}</tr></thead>
    <tbody>{rows.map((r) => <tr key={r[0]} className="border-t border-secondary">{r.map((c, i) => <td key={i} className={`px-4 py-3 align-top ${i ? "text-muted" : ""}`}>{c}</td>)}</tr>)}</tbody>
  </table></div>
);

const M = "/case/medisystem-ai";
const medisystem: Layout = {
  toc: T("Overview", "Impact", "Problem", "Research", "Competitors", "Users", "Process", "Key decisions", "Screens", "Safety", "Prototype", "Reflection", "More work"),
  render: (p) => {
    const A = p.accent;
    const Cap = ({ children }: { children: React.ReactNode }) => <p className="mt-3 text-[14px] text-muted">{children}</p>;
    return (<>
    <div className="mb-[72px] max-lg:mb-12"><Shot src={`${M}/cover.png`} alt="MediSystem AI: patient explanation, doctor review and mobile screens" w={1440} h={892} /></div>
    <Sec id="overview" title="Helping people understand their results, and helping doctors review them">
      <P>Lab reports reach patients as numbers and ranges. This concept explains a report in plain language, ties every statement to its source value, and routes it through a doctor before it is treated as reviewed.</P>
      <div className="mt-8"><Shot src={`${M}/pd/02-dashboard.webp`} alt="Patient dashboard with reports, review count and an AI-assisted explanation" w={1440} h={900} caption="Patient dashboard: recent reports, next appointment and an AI-assisted explanation" /></div>
    </Sec>
    <Sec id="impact" title="At a glance">
      <OutcomeStats items={[[54, "Screens designed"], [30, "Component sets", "+"], [3, "Prototype surfaces"]]} />
      <div className="mt-8 grid gap-4 md:grid-cols-3">{[["Role", "Senior UI/UX & AI Designer (solo)"], ["Platforms", "Desktop web 1440 · Mobile 390"], ["Status", "Concept. Not user-tested."]].map(([k, v]) => <div key={k} className="border-t border-secondary pt-4"><p className="text-[13px] uppercase tracking-[0.08em] text-muted">{k}</p><p className="mt-1 text-[17px]">{v}</p></div>)}</div>
    </Sec>
    <Sec id="problem" title="The gap is understanding, not access">
      <P>Records and booking are widely available. Making sense of results is not. Patients see values without context, and doctors receive reports with little structure.</P>
      <div className="mt-8"><Cards cols={3} items={[["Patients", "See values without context. “Out of range” is not the same as disease. Some turn to general AI chatbots with no source linkage."], ["Doctors", "Receive reports with little structure and cannot see what the patient already read or concluded."], ["Opportunity", "Explain a person’s own report, show uncertainty, and keep a clinician in the loop."]]} /></div>
    </Sec>
    <Sec id="research" title="What I did, and what I did not">
      <P>Honest framing first: this is desk research and design judgement, not primary research.</P>
      <div className="mt-8"><Table head={["Activity", "Status", "Evidence"]} rows={[["Public-source review of five reference products", "Done", "Product pages, app listings, help pages, reviews"], ["Interview guides and affinity template", "Prepared", "Ready to run"], ["Personas and empathy maps", "Provisional", "Synthetic, hypothesis-based"], ["Primary user research", "Not done", "No interviews conducted"], ["Usability testing", "Planned", "Test plan only"]]} /></div>
    </Sec>
    <Sec id="competitors" title="Five reference points, one open space">
      <P>Observed from public information. “Not observed” means not found in sources reviewed.</P>
      <div className="mt-8"><Table head={["Capability", "Practo", "Apple Health", "MyChart", "Ada", "MediSystem AI"]} rows={[["Store and organise reports", "Yes", "Yes", "Yes", "Partial", "Proposed"], ["Plain-language result context", "Not observed", "Yes", "Partial", "n/a", "Proposed"], ["Generative AI explanation of reports", "Not observed", "Not observed", "Partial (planned)", "Not observed", "Proposed (core)"], ["Share with a doctor", "Yes", "Yes (US)", "Yes", "Partial", "Proposed, consent-first"], ["Doctor review of AI output", "Not observed", "n/a", "Partial", "n/a", "Proposed, required"], ["Source-value traceability", "Not observed", "Partial", "Not observed", "n/a", "Proposed (core)"]]} /></div>
      <div className="mt-6"><Cards cols={2} items={[["Practo", "Breadth of care tasks; results explanation not observed."], ["Apple Health Records", "Calm in-range context; no care workflow."], ["MyChart (Epic)", "Messaging and scheduling inside a health system; generative AI described as planned."], ["Ada · AI chatbots", "Clear advice levels; chatbots are instant but leave verification to the patient."]]} /></div>
    </Sec>
    <Sec id="users" title="Two provisional personas">
      <P>Synthetic and hypothesis-based; to be confirmed or replaced by interviews.</P>
      <div className="mt-8 grid gap-6 md:grid-cols-2">{[["Maya Iyer, 34", "Patient", "Product marketing lead who also manages her father’s appointments.", ["“I get the numbers. I don’t get what they mean for me.”", "Needs plain language", "Wants to know what to do next", "Cautious about sharing data"]], ["Dr. Arjun Menon, 45", "Doctor", "General physician reviewing reports before visits.", ["“Give me the signal fast, and let me check it myself.”", "Needs structured context", "Wants to see what the patient read", "Requires review control"]]].map(([n, r, d, b], i) => (
        <div key={n as string} className="rounded-[6px] border border-secondary bg-surface p-5"><div className="flex h-16 w-16 items-center justify-center rounded-full text-[22px] text-white" style={{ background: i ? "#6b4fa0" : A }}>{(n as string).split(" ").map((w) => w[0]).slice(0, 2).join("")}</div><p className="mt-5 text-[12px] uppercase tracking-[0.08em] text-muted">{r as string}</p><p className="mt-1 text-[22px]">{n as string}</p><p className="mt-2 text-muted">{d as string}</p><ul className="mt-3 list-disc space-y-1 pl-5 text-[15px] text-muted">{(b as string[]).map((x) => <li key={x}>{x}</li>)}</ul></div>))}</div>
      <div className="mt-10"><Table head={["Stage", "Patient moment", "Pain (hypothesis)", "Design response"]} rows={[["Receive result", "Report arrives as numbers", "Anxiety, no context", "Plain-language summary with uncertainty"], ["Understand", "Searches or asks a chatbot", "Unverified answers", "Each statement tied to a report value"], ["Share", "Emails a PDF", "Privacy risk", "Consent-first sharing with audit"], ["Follow up", "Waits for a reply", "Uncertainty drags on", "Visible doctor review status"]]} /></div>
    </Sec>
    <Sec id="process" title="From research to a clickable prototype">
      <P>Four steps, each with an artifact in the Figma master file.</P>
      <div className="mt-8"><Steps items={[["1 · Research and personas", "Desk review of five reference products, provisional personas and a journey."], ["2 · Information architecture", "Patient and doctor navigation, flows and wireframes."], ["3 · Design system", "Variables, text styles, ~30 component sets and 35 icons."], ["4 · Screens and prototype", "54 screens and an index-driven clickable prototype."]]} /></div>
      <div className="mt-8"><Cards cols={3} items={[["Information architecture", "Patient: Home, Records, Upload, Appointments, Messages, Profile. Doctor: Dashboard, Patients, Review queue, Notes, Audit."], ["Design system", "Variables for colour (light/dark), spacing and radius; 12 text styles; ~30 component sets; 35 icons."], ["AI safeguards", "May summarise and cite source rows. Must not diagnose, prescribe or call values safe or dangerous."]]} /></div>
    </Sec>
    <Sec id="key-decisions" title="Choices that build trust">
      <div className="grid items-start gap-8 md:grid-cols-2">
        <div><Shot src={`${M}/pd/07-report-explanation.webp`} alt="Patient report explanation with values and a source row" w={1440} h={900} caption="Patient: explanation with source row" /><div className="mt-4"><Decisions items={[["Cite the source", "Every statement links to a report row, such as page 1, row 4."], ["Show uncertainty", "Outside the printed range does not mean disease, and the screen says so."]]} /></div></div>
        <div><Shot src={`${M}/dd/07-ai-summary-review.webp`} alt="Doctor review of an AI draft summary" w={1440} h={900} caption="Doctor: AI draft review" /><div className="mt-4"><Decisions items={[["Doctor approves first", "Nothing is shown to the patient until the doctor approves."], ["Edits are audited", "Every change is recorded in the audit log."]]} /></div></div>
      </div>
    </Sec>
    <Sec id="screens" title="54 screens across three surfaces">
      <P>Selected screens, assembled from design system components.</P>
      <div className="mt-8 space-y-4"><Shot src={`${M}/pd/04-upload-report.webp`} alt="Upload report screen" w={1440} h={900} caption="Patient desktop: upload with consent" /><div className="grid gap-4 md:grid-cols-2"><Shot src={`${M}/pd/08-ai-chat.webp`} alt="Ask about this report chat" w={1440} h={900} caption="Patient desktop: AI chat with limits" /><Shot src={`${M}/dd/03-patient-list.webp`} alt="Doctor patient list" w={1440} h={900} caption="Doctor desktop: patient list" /></div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">{[["03-home", "Home"], ["10-explanation", "Explanation"], ["11-ai-chat", "AI chat"], ["13-appointments", "Appointments"]].map(([f, l]) => <Shot key={f} src={`${M}/pm/${f}.webp`} alt={`Mobile ${l}`} w={390} h={844} caption={`Mobile: ${l.toLowerCase()}`} />)}</div></div>
    </Sec>
    <Sec id="safety" title="Contrast audit fixed in the tokens">
      <P>A computed audit of 14 colour pairs found failures in light-mode status colours and dark-mode brand text. I changed the variable values so every screen updated; all pairs now pass WCAG 2.2 AA by calculation. Not yet tested with assistive technology.</P>
      <div className="mt-8"><Cards cols={3} items={[["Never diagnoses", "AI explains and cites; a clinician review state is first-class."], ["Status is never colour-only", "Always paired with text or icon."], ["Failure degrades safely", "Raw report remains available when extraction fails."]]} /></div>
    </Sec>
    <Sec id="prototype" title="All 54 screens, clickable, and a ready test plan">
      <P>All 54 screens are reachable from an index: 19 patient desktop, 18 patient mobile and 17 doctor desktop. Select any screen to view it large. A test plan with hypotheses H1 to H4 is ready. No sessions have been run and no results are claimed.</P>
      <div className="mt-8"><Shot src={`${M}/prototype-index.webp`} alt="Prototype index listing all 54 screens" w={1440} h={1408} caption="Prototype index: every screen is reachable from here" /></div><div className="mt-10"><ProtoFlows /></div>
    </Sec>
    <Sec id="reflection" title="What I learned and what is next">
      <Table head={["Learned", "Not done (yet)", "Next"]} rows={[["Source-linked explanations build trust better than chat alone", "Interviews, usability tests, AI validation", "Run research and test H1 to H4"], ["Tokens make accessibility fixes cheap", "Assistive-technology testing, tablet screens", "Clinical and legal wording review"], ["Honest limits make a case study credible", "Business results (none claimed)", "Iterate, then extend"]]} />
      <p className="mt-6 text-[14px] text-muted">Concept project with sample data only. Not a medical product.</p>
    </Sec>
    <Sec id="more-work" title="More of my work"><MoreWork current={p.slug} /></Sec>
  </>);
  },
};

export const layouts: Record<LayoutId, Layout> = { contracts, give, legalease, itm, transitstats, plugin, medisystem };
export const layoutIds = Object.keys(layouts) as LayoutId[];
void S;
