---
phase: 05-complex-interactive-sections
plan: 02
subsystem: sections
tags: [client-component, carousel, animate-presence, auto-advance, testimonials, page-integration, tests]
dependency_graph:
  requires: [lib/data.ts, components/sections/ProcessSection.tsx, components/sections/BentoSection.tsx]
  provides: [components/sections/TestimonialSection.tsx]
  affects: [app/page.tsx]
tech_stack:
  added: []
  patterns: [animate-presence-carousel, interval-ref-restart, use-reduced-motion, client-component-boundary, vi-fake-timers]
key_files:
  created:
    - components/sections/TestimonialSection.tsx
  modified:
    - __tests__/components/sections/TestimonialSection.test.tsx
    - app/page.tsx
decisions:
  - "TestimonialSection uses intervalRef + useCallback startInterval pattern to restart timer on dot click without creating stale closures"
  - "Video element omits src attribute entirely (not src='') to prevent blank frame flash — bg-dark background provides cinematic fallback"
  - "AnimatePresence key={currentIndex} (numeric index) unlike HeroTextSelector which keys on string value — both are valid, index is simpler here"
  - "page.tsx inserts BentoSection between ProcessSection and PortfolioSection per Phase 5 CONTEXT.md section order"
metrics:
  duration: 5 min
  completed_date: "2026-03-28"
  tasks_completed: 3
  files_created: 1
  files_modified: 2
---

# Phase 05 Plan 02: TestimonialSection + Page Integration Summary

**One-liner:** Cinematic testimonial carousel with AnimatePresence auto-advance and interval-restart dot navigation, plus full Phase 5 section wiring into page.tsx with passing build.

## What Was Built

**TestimonialSection** is a Client Component implementing a cinematic dark-background carousel with three testimonials from `lib/data.ts`. It uses `AnimatePresence mode="wait"` with `key={currentIndex}` for smooth enter/exit transitions, a `setInterval` auto-advance every 5000ms managed via `useRef` and a `useCallback startInterval` function that clears and restarts the timer on each dot click. A `video` element with no `src` attribute provides the background slot without triggering a broken-media flash. `useReducedMotion()` from `motion/react` zeroes out all transition durations when the OS preference is enabled.

**TestimonialSection tests** replace 6 `it.todo()` stubs with full implementations: dark section + video render, name/quote content, timer-driven auto-advance using `vi.useFakeTimers()` + `act()`, dot click navigation, dot count assertion, and reduced motion toggle.

**page.tsx** replaces both Phase 5 placeholder `<section aria-hidden>` elements with `<ProcessSection />`, `<BentoSection />`, and `<TestimonialSection />` in correct order. All Phase 5 components are now live in the homepage.

## Tasks Completed

| # | Task | Commit | Files |
|---|------|--------|-------|
| 1 | Implement TestimonialSection with AnimatePresence carousel and auto-advance | c7346ee | components/sections/TestimonialSection.tsx |
| 2 | Complete TestimonialSection test stubs with full implementations | c85a1ea | __tests__/components/sections/TestimonialSection.test.tsx |
| 3 | Wire ProcessSection, BentoSection, TestimonialSection into page.tsx + build verification | 908c0a1 | app/page.tsx |

## Verification

- `npx vitest run __tests__/components/sections/TestimonialSection.test.tsx` — 6/6 passed
- `npx vitest run` — 60 passed, 17 test files, no regressions
- `npm run build` — compiled successfully, all 5 static pages generated, no TypeScript errors

## Deviations from Plan

None - plan executed exactly as written.

## Self-Check: PASSED
