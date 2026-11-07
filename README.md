# Portfolio (structure inspired by charleshonig.design)

Next.js (App Router) · React · TypeScript · Tailwind 3 · Framer Motion · Lucide.
All imagery is a generated placeholder; no third-party assets or identity are used.

## Run
```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Edit content
- `src/data/site.ts` name, headline, bio, contact links, skills, nav
- `src/data/projects.ts` projects and case-study content (add `cover: "/images/x.jpg"` support in ProjectCard to use real images)
- `src/data/experience.ts` experience, awards, Play items
- Drop `resume.pdf` and a portrait into `/public`.
- `src/components/AIAssistant.tsx` answers from the data files; swap `answer()` for a fetch to an LLM route if wanted.

## Deploy
Vercel: push to GitHub, import the repo, accept defaults. Or any Node host: `npm run build && npm start`.
Keyboard shortcuts: H, W, P, A jump to sections; Esc closes Ask AI.
See `DESIGN_SPEC.md` for the measured design tokens.
