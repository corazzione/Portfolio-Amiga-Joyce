# Phase 3: Hero + Animation System - Context

**Gathered:** 2026-03-28
**Status:** Ready for planning
**Source:** Auto mode (--auto) — all decisions are recommended defaults

<domain>
## Phase Boundary

Full-screen hero section (100vh) with background video support, animated text selector cycling through "A Criação / Videografia / Fotografia", page-load entrance animations, gold CTA button, and a hardened animation system that handles `prefers-reduced-motion`. Hero lives in `app/page.tsx`. Animation primitives (`RevealWrapper`, `StaggerChildren`) are upgraded here and used by every subsequent phase.

</domain>

<decisions>
## Implementation Decisions

### Hero Background
- Use a dark cinematic gradient placeholder (`bg-dark` base with subtle radial overlay) — no video file committed to git
- Video element is wired with `src` prop that accepts an external URL (Vercel Blob / Cloudinary) — currently empty string, renders gradient fallback
- `<video autoPlay muted loop playsInline>` attributes required per HERO-01
- Overlay: `absolute inset-0 bg-dark/40` over the video to ensure text contrast

### Text Selector
- Auto-advance timer: cycles every 3 seconds automatically (no scroll dependency)
- Three strings: `"A Criação"`, `"Videografia"`, `"Fotografia"` — in that order, looping
- `AnimatePresence` with `mode="wait"` drives enter/exit: `initial={{ opacity: 0, y: 12 }}` → `animate={{ opacity: 1, y: 0 }}` → `exit={{ opacity: 0, y: -12 }}`
- Duration: 0.4s, same easing curve `[0.22, 1, 0.36, 1]` — consistent with project
- Component: `HeroTextSelector` — `'use client'`, self-contained with `useEffect` interval

### Hero Load Animation (page-load entrance, no scroll trigger)
- Three-element stagger sequence: MC. logo/tagline → selector text → CTA button
- Use `motion` with `initial={{ opacity: 0, y: 24 }}` → `animate={{ opacity: 1, y: 0 }}` — matches `fadeUp` variant shape
- Delays: logo at 0.2s, selector at 0.5s, CTA at 0.8s — editorial pacing
- `initial` fires on mount (not `useInView`) — this is a page-load animation per HERO-05
- Hero layout: `<section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">`

### Hero CTA + Copy
- Gold CTA button: `bg-gold text-dark font-switzer` — "Ver Portfólio" — links to `#portfolio` anchor (Phase 4 will add the section)
- Tagline overlay: `"MC. // UMA CONTADORA DE HISTÓRIAS VISUAL"` — Switzer, uppercase tracking-widest, white
- The `//` separator must render as `{'//'}` in JSX (learned from Phase 2 fix)

### Animation System Hardening
- Add `prefers-reduced-motion` guard to `RevealWrapper` and `StaggerChildren` — required for ANIM-06
- Pattern: `const prefersReduced = useReducedMotion()` from `motion/react` — if true, skip animation (render children in visible state immediately)
- `useReducedMotion()` is available from `motion/react` — no new dependency
- `scaleIn` variant already exists in `lib/animation-variants.ts` — expose from `RevealWrapper` via `variant="scaleIn"` prop (default: `"fadeUp"`)
- `RevealWrapper` gains optional `variant` prop: `"fadeUp" | "scaleIn"` — planner should spec this

### Claude's Discretion
- Exact hero layout proportions and text sizes (mobile vs desktop)
- Whether selector label "Especializada em" or similar precedes the cycling text
- Desktop centering vs left-aligned hero text layout
- Hover effect on CTA button (scale/brightness)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Requirements
- `.planning/REQUIREMENTS.md` — HERO-01 through HERO-05 (hero section), ANIM-01 through ANIM-06 (animation system)

### Visual reference
- `index.html` — Complete HTML mockup; inspect `.hero`, `.hero-content`, `.text-selector`, and `.hero-overlay` sections for exact copy, layout structure, and animation CSS

### Foundation (Phase 1 + 2 outputs)
- `app/page.tsx` — Hero section replaces placeholder content here
- `app/layout.tsx` — TopNav and BottomBar already integrated; hero must work with transparent TopNav overlay
- `lib/animation-variants.ts` — `fadeUp`, `scaleIn`, `stagger`, `spring` — must NOT duplicate; extend if needed
- `components/motion/RevealWrapper.tsx` — Upgrade target: add `variant` prop + `prefers-reduced-motion`
- `components/motion/StaggerChildren.tsx` — Upgrade target: add `prefers-reduced-motion`
- `tailwind.config.ts` — `bg-dark`, `bg-gold`, `font-switzer` tokens available

### Architecture patterns
- `.planning/research/ARCHITECTURE.md` — AnimatePresence patterns, Client Component boundaries

### Critical pitfalls
- `.planning/research/PITFALLS.md` — AnimatePresence `mode="wait"` for text selector; Next.js 14 App Router page transition limitation

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `lib/animation-variants.ts`: `fadeUp` (opacity+y), `scaleIn` (opacity+scale), `stagger` (staggerChildren 0.1s), `spring` — all ready to use
- `components/motion/RevealWrapper.tsx`: `useInView` with `once: true, margin: '-40px'`; accepts `delay` and `className` props — upgrade to add `variant` + reduced motion
- `components/motion/StaggerChildren.tsx`: exports `StaggerChildren` container + `StaggerItem` child — upgrade to add reduced motion guard
- `lib/utils.ts`: `cn()` for conditional Tailwind class composition

### Established Patterns
- Motion imports: always `from 'motion/react'` (NOT `framer-motion`) — locked in Phase 1
- Client Components: `'use client'` on the specific component; layout stays Server Component
- Animation easing: `[0.22, 1, 0.36, 1]`, 0.8s — project-wide standard (shorter for micro-interactions: 0.4s)
- JSX text with `//`: must be `{'//'}` not literal `//` (learned in Phase 2)
- Font classes: `font-switzer` and `font-sans` inherited from `<html>` — no need to re-apply

### Integration Points
- `app/page.tsx` → Replace placeholder with `<HeroSection />` component
- `components/hero/HeroSection.tsx` → New file; `'use client'` for interval-driven selector
- `components/hero/HeroTextSelector.tsx` → New file; isolated `'use client'` component for the cycling text
- `components/motion/RevealWrapper.tsx` → Upgrade (not replace) with variant + reduced-motion support

</code_context>

<specifics>
## Specific Ideas

- The selector effect should feel like a typewriter/slide — not a cross-fade; text slides out upward and new text slides in from below
- Hero must feel cinematic immediately on load — the 0.2s/0.5s/0.8s stagger creates a composed, deliberate entrance
- Video placeholder gradient: `bg-gradient-to-b from-dark via-dark/90 to-dark` — dark but with subtle depth
- CTA button should have the same `bg-gold text-dark` treatment as the "Menu+" pill in BottomBar

</specifics>

<deferred>
## Deferred Ideas

- Lenis smooth scroll integration — v2 (noted in requirements)
- Custom cursor — v2 (noted in requirements)
- Scroll-driven text selector (instead of timer) — deferred; timer is simpler and equally editorial
- Parallax video effect on hero scroll — Phase 7 or v2

</deferred>

---

*Phase: 03-hero-animation-system*
*Context gathered: 2026-03-28 via auto mode*
