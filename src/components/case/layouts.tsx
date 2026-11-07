import type { Project } from "@/data/projects";
import { Sec, P, Img, Video, Stats, Personas, Cards, Columns, Decisions, Features, Directions, Choose, Quotes, Callouts, Gallery, Grid, Compare, MoreWork } from "./blocks";

export type LayoutId = "contracts" | "give" | "legalease" | "itm" | "transitstats";
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

export const layouts: Record<LayoutId, Layout> = { contracts, give, legalease, itm, transitstats };
export const layoutIds = Object.keys(layouts) as LayoutId[];
void S;
