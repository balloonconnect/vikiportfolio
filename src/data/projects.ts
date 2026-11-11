// Placeholder projects. Replace copy, `cover` paths and `accent` with your own.
// If `cover` is omitted, a generated placeholder tile is drawn using `accent`.
export type CaseStudy = {
  overview: string;
  problem: string;
  objectives: string[];
  research: string[];
  personas: { name: string; role: string; goal: string }[];
  journey: { stage: string; note: string }[];
  ia: string[];
  wireframes: string;
  explorations: string;
  finalUI: string;
  prototype: string;
  outcomes: { metric: string; label: string }[];
};

import type { LayoutId } from "@/components/case/layouts";

export type Project = {
  /** Which case study layout to use: contracts | give | legalease | itm | transitstats */
  layout: LayoutId;
  slug: string;
  /** Optional Figma file URL, rendered as an interactive embed so visitors can browse all pages */
  figma?: string;
  name: string;
  tagline: string;
  description: string;
  years: string;
  role: string;
  scope: string;
  results: string;
  readTime: number;
  accent: string;
  cover?: string;
  coverBg?: string; // background colour shown around a letterboxed cover
  caseStudy: CaseStudy;
};

const base = (name: string): CaseStudy => ({
  overview: `${name} is a placeholder case study. Replace this overview with a two or three sentence summary of the product, the team and your part in it.`,
  problem: "Describe the problem users and the business faced before you started. Keep it specific and measurable.",
  objectives: ["Reduce task completion time", "Unify the interface under one design system", "Meet WCAG 2.2 AA"],
  research: ["Stakeholder interviews", "Heuristic audit of the existing product", "Usability sessions with 8 participants", "Analytics review"],
  personas: [
    { name: "Primary user", role: "Day-to-day operator", goal: "Finish routine work quickly and with confidence" },
    { name: "Secondary user", role: "Reviewer or approver", goal: "See status at a glance and act on exceptions" },
  ],
  journey: [
    { stage: "Discover", note: "How users find and understand the tool" },
    { stage: "Do", note: "Core task flow and friction points" },
    { stage: "Review", note: "Confirming results and sharing outcomes" },
  ],
  ia: ["Dashboard", "Records", "Workflows", "Reports", "Settings"],
  wireframes: "Low-fidelity flows exploring layout and hierarchy before visual design.",
  explorations: "Three directions compared on clarity, density and brand fit.",
  finalUI: "The final interface uses a token-based design system with light and dark themes.",
  prototype: "Interactive prototype used for testing and developer handoff.",
  outcomes: [
    { metric: "-35%", label: "Time on task" },
    { metric: "+22", label: "SUS score" },
    { metric: "4x", label: "Faster design handoff" },
  ],
});

export const projects: Project[] = [
  {
    slug: "medisystem-ai",
    layout: "medisystem",
    name: "MediSystem AI",
    tagline: "Better understanding. More connected care.",
    description: "A concept patient and doctor product that explains medical reports in plain language, with source traceability and clinician review. Sample data only.",
    years: "2025", role: "Senior UI/UX & AI Designer (solo)", scope: "Research, UX, UI, design system, prototype", results: "54 screens, ~30 components, clickable prototype (concept)",
    readTime: 6, accent: "#0f766e", cover: "/case/medisystem-ai/cover.png", coverBg: "#ffffff", caseStudy: base("MediSystem AI"),
  },
  {
    slug: "medora-design-system",
    figma: "https://www.figma.com/design/DErYluda5bAKKIjmrjfnWB",
    layout: "medora",
    name: "MEDORA Design System",
    tagline: "A scalable healthcare design system: tokens, atomic components, slots and governance.",
    description: "An atomic design system that brings together semantic tokens, reusable components and color modes in one scalable UI foundation.",
    years: "2026", role: "Senior UI/UX & AI Designer", scope: "Design system: tokens, components, slots, governance", results: "54 components, 165 variants, 300+ variables",
    readTime: 8, accent: "#2563eb", cover: "/case/medora-design-system/cover.png", coverBg: "#f3f5fb", caseStudy: base("MEDORA Design System"),
  },
  {
    slug: "global-design-check",
    layout: "plugin",
    name: "Global Design Check",
    tagline: "One plugin to find and fix design-system drift.",
    description: "A Figma plugin that scans a file for unlinked variables, text styles, colors, external components, contrast and collection mismatches, with safe one-step fixes.",
    years: "2026", role: "Product design, UX, plugin build", scope: "Discovery, UX, UI, Figma Plugin API", results: "19 issue groups found, 16 fixed in one undoable pass (mock file)",
    readTime: 7, accent: "#5b4fe0", cover: "/case/global-design-check/cover.png", coverBg: "#6257e9", caseStudy: base("Global Design Check"),
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
