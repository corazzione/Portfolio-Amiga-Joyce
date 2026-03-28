---
phase: 01-foundation
plan: 02
subsystem: animation-system, data-layer, deployment
tags: [motion, animation-variants, data-stubs, vercel, typescript]
dependency_graph:
  requires: [01-01]
  provides: [animation-primitives, typed-data-layer, vercel-config]
  affects: [all-subsequent-phases]
tech_stack:
  added: [motion/react useInView, vercel.json]
  patterns: [shared-animation-variants, scroll-triggered-reveal, stagger-children, typed-static-data]
key_files:
  created:
    - lib/animation-variants.ts
    - components/motion/RevealWrapper.tsx
    - components/motion/StaggerChildren.tsx
    - lib/data.ts
    - vercel.json
  modified: []
decisions:
  - "Animation easing curve [0.22, 1, 0.36, 1] with 0.8s duration — project-wide editorial feel"
  - "RevealWrapper uses useInView with margin '-40px' to trigger slightly before element enters viewport"
  - "StaggerChildren exports both container (StaggerChildren) and child (StaggerItem) for flexible composition"
  - "lib/data.ts is a single file (not lib/data/*.ts) — plan spec overrides architecture doc suggestion; easy to split later"
  - "Image fields use /images/placeholder.jpg — real assets not yet available"
  - "vercel.json uses no buildCommand/outputDirectory — Vercel auto-detects Next.js defaults"
metrics:
  duration: "4 min"
  completed_date: "2026-03-28"
  tasks_completed: 2
  files_created: 5
  files_modified: 0
---

# Phase 01 Plan 02: Animation Primitives, Data Layer, and Vercel Config Summary

**One-liner:** Shared motion variant library (fadeUp/scaleIn/stagger/spring) with scroll-triggered RevealWrapper and StaggerChildren client components, typed Portuguese content stubs for all six data types, and Vercel deployment config with font caching and security headers.

## Tasks Completed

| # | Task | Commit | Files |
|---|------|--------|-------|
| 1 | Create animation variants and motion wrapper components | 55ddc09 | lib/animation-variants.ts, components/motion/RevealWrapper.tsx, components/motion/StaggerChildren.tsx |
| 2 | Create typed static data stubs and Vercel deployment config | 5044dd9 | lib/data.ts, vercel.json |

## What Was Built

### Animation System (`lib/animation-variants.ts`)

Four named exports consumed by every animated component in the project:

- `fadeUp` — opacity 0→1, y 24→0, 0.8s, easing `[0.22, 1, 0.36, 1]`
- `scaleIn` — opacity 0→1, scale 0.985→1, same timing
- `stagger` — container variant with `staggerChildren: 0.1s`
- `spring` — Transition object: type spring, stiffness 200, damping 30

### Motion Wrapper Components

**`components/motion/RevealWrapper.tsx`** — Wraps any children in a scroll-triggered `motion.div`. Uses `useInView` with `once: true` and `-40px` margin so the animation fires just before the element is fully visible. Accepts optional `delay` and `className` props.

**`components/motion/StaggerChildren.tsx`** — Exports two components:
- `StaggerChildren` — container that uses the `stagger` variant and `useInView` to trigger the cascade
- `StaggerItem` — child that uses `fadeUp` and inherits the stagger delay from its parent

Both components are `'use client'` and import exclusively from `motion/react`.

### Data Layer (`lib/data.ts`)

Six typed interfaces and six populated arrays with real Portuguese content extracted from `index.html`:

| Export | Count | Content source |
|--------|-------|---------------|
| `services` | 7 items | Service names and descriptions from #services section |
| `processSteps` | 6 items | Descoberta → Otimização from #process section |
| `testimonials` | 3 items | Danny Rose, David Nguyen, Alisha Moore from #testimonials |
| `blogPosts` | 3 items | Post titles from #blog section |
| `faqItems` | 4 items | Questions and answers from #faq section |
| `clientLogos` | 4 items | theo, Amsterdam, luminous, MILANO from logos strip |

### Deployment Config (`vercel.json`)

- `/fonts/(.*)` routes: `Cache-Control: public, max-age=31536000, immutable`
- All routes: `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`

## Verification Results

```
export const count in data.ts:    6 ✓
export interface count in data.ts: 6 ✓
animation variant exports:         6 lines ✓
'use client' in both wrappers:    ✓
framer-motion imports:             none ✓
npm run build:                     clean ✓
npx tsc --noEmit:                  0 errors ✓
```

## Deviations from Plan

None — plan executed exactly as written.

## Self-Check

- [x] `lib/animation-variants.ts` — exists, verified
- [x] `components/motion/RevealWrapper.tsx` — exists, verified
- [x] `components/motion/StaggerChildren.tsx` — exists, verified
- [x] `lib/data.ts` — exists, verified
- [x] `vercel.json` — exists, verified
- [x] Commit 55ddc09 — Task 1
- [x] Commit 5044dd9 — Task 2

## Self-Check: PASSED
