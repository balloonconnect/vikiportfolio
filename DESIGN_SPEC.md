# Design Specification (derived from inspecting the reference)

Measured in the built-in browser from the live reference: computed styles, CSS custom properties, DOM structure. Items marked (inferred) were not measured.

## Layout
- Single page, sections: `#home`, `#work`, `#play`, `#about`, closing CTA. Each full-viewport (`min-height:100svh`, scroll-snap start) on desktop; `min-height:0` below 1024px.
- Container: max-width 1440px, horizontal padding 84px desktop, 24px below 1024px.
- Header: fixed, nav max-width 1440px, padding 0 84px.
- Nav items: Home / Work / Play / About, each with a small boxed key hint (H, W, P, A) = keyboard shortcuts. Theme toggle pill (44x24). Right side: Contact, Ask AI (pill outline button). Below 1024px: "Menu" button + theme toggle; floating chat button bottom right.
- Hero: H1, subline with employer chip, meta row (location, local time, temperature), then a 15-tile "bento" grid of tilted/floating device previews.
- Work: 5 cards. Each has H2 (20-24px, 600), tagline, description, meta rows (Years / Role / Scope, muted labels), "View Case Study" button, read-time, large tile preview (rounded-6px link, aspect 774/782).
- Play: heading + one-line intro on left, previous/next circular buttons (42px) on right; horizontal carousel of videos/images with captions.
- About ("My Story"): two paragraphs + portrait, Experience list (company, role, years), Awards list.
- Closing CTA: "Let's create something great together." with rotating verb (create/design/build/make); email, resume, LinkedIn links.
- Ask AI: right side panel, width 424px.

## Typography
- Family: Lato (400, 600, 700).
- Body 16-17px / 26px. H1 about 41px at 1265px wide (clamped), line-height 1.2, letter-spacing -0.02em, weight 400. Lede 24px. Heading 24px, 600. Caption 15px / 13px.
- Tokens: display 90, tagline 46, title 46, gate 32, heading 24, lede 24, body 16, caption 15, caption-sm 13.

## Color
- Light: bg #f5f5f6, fg #000, muted #7c7c7c / #9d9d9d, tile fill ~#e8e8e8, border #000 (buttons, 0.8px), surface #fff.
- Dark: bg #0d0d0d, surface #000, card #1e1e1e, secondary #292929, fg #fff, muted #7c7c7c.
- Accent: none in chrome (monochrome). Pink #f91880 only for "like".

## Spacing and radius
- Space scale 4/8/12/16/24/32/48/64/96/128. Block 144, section gap 44, summary gap 54, head gap 18, info gap 54, CTA gap 74.
- Radius: 4 / 8 / 12 / 16 / 24 / full. Link focus tiles use 6px.

## Motion
- Durations: 80ms, 160ms, 240ms, 420ms, 680ms.
- Easings: out cubic-bezier(.22,1,.36,1); in-out (.65,0,.35,1); spring (.34,1.56,.64,1); emphasis (.2,0,0,1).
- Hero loads with blur-to-sharp text fade in. Staggered tile entrance. Custom cursor layer exists (z-cursor 4000) (inferred: small circle follows pointer, visible over tiles).
- Shadows: card 0 10px 50px rgba(0,0,0,.14); glass fill #ffffff80 with 8px blur (used sparingly on chips).

## Not measured / assumptions
- Exact desktop positions of the 15 bento tiles (viewport was narrow in my session); I place them by eye from screenshots.
- Case-study page internals were not inspected; I build them from the brief's section list.
- Copy, images and identity are all original placeholders for Vignesh.
