---
phase: 03-hero-animation-system
plan: 02
subsystem: ui
tags: [nextjs, motion, react, tailwind, hero, animation]

requires:
  - phase: 03-01
    provides: HeroTextSelector component and HeroSection test stubs

provides:
  - HeroSection component: full-screen hero with video bg, overlay text, entrance animations
  - app/page.tsx wired to HeroSection — homepage is now the live hero

affects:
  - 04-portfolio-grid
  - 05-scroll-parallax

tech-stack:
  added: []
  patterns:
    - "Page-load entrance animation: initial/animate on motion elements (NOT useInView) for above-the-fold content"
    - "Staggered entrance delays: 0.2s / 0.5s / 0.8s editorial pacing"
    - "useReducedMotion guards all motion props — pass reduced={true} branch inline"
    - "Client component boundary: HeroSection declares 'use client', page.tsx stays Server Component"
    - "vi.hoisted() for mock variables used inside vi.mock() factory"

key-files:
  created:
    - components/hero/HeroSection.tsx
  modified:
    - app/page.tsx
    - __tests__/components/hero/HeroSection.test.tsx

key-decisions:
  - "HeroSection uses initial/animate (not useInView) — page-load entrance must fire without scroll"
  - "motion.p and motion.a added to test mock — plan used these elements not covered by 03-01 stub"
  - "Test stubs (it.todo) replaced with real assertions — component now exists and is testable"
  - "Video src='' intentional — gradient div covers blank video, no broken icon shown"

patterns-established:
  - "Page-load stagger pattern: motion element per content block with explicit delay values"
  - "CTA hover: whileHover scale:1.05, whileTap scale:0.98 — project-wide interactive element standard"

requirements-completed: [HERO-01, HERO-02, HERO-03, HERO-05, ANIM-04]

duration: 4min
completed: 2026-03-28
---

# Phase 3 Plan 02: HeroSection Summary

**Full-screen hero with dark gradient, cycling text selector, gold CTA, and staggered page-load entrance animations wired into homepage**

## Performance

- **Duration:** 4 min
- **Started:** 2026-03-28T03:27:00Z
- **Completed:** 2026-03-28T03:31:00Z
- **Tasks:** 2
- **Files modified:** 3

## Accomplishments

- HeroSection component with 100vh dark gradient background, empty video element, overlay text, and gold CTA
- Staggered page-load entrance: tagline at 0.2s, HeroTextSelector at 0.5s, CTA at 0.8s — all using initial/animate
- app/page.tsx replaced placeholder content with HeroSection; npm run build passes with zero errors
- Full test suite: 13 tests across 4 files, all green

## Task Commits

1. **Task 1: Create HeroSection component** - `0040d86` (feat)
2. **Task 2: Wire HeroSection into app/page.tsx** - `0867967` (feat)

**Plan metadata:** (docs commit — see final commit)

## Files Created/Modified

- `components/hero/HeroSection.tsx` - Full-screen hero section ('use client', motion entrance animations, HeroTextSelector, gold CTA)
- `app/page.tsx` - Homepage — imports and renders HeroSection, removes all placeholder content
- `__tests__/components/hero/HeroSection.test.tsx` - Replaced it.todo stubs with 4 real tests; added motion.p/motion.a to mock and vi.hoisted() pattern

## Decisions Made

- Used `initial`/`animate` on each motion element directly (not RevealWrapper/useInView) because hero content is above the fold and must animate on page load without scrolling.
- Test mock extended with `motion.p` and `motion.a` — the plan's component uses these elements which weren't in the 03-01 stub. Required vi.hoisted() fix (same pattern as 03-01 decision).
- Video `src=""` is intentional: the gradient div renders visually; when real assets are available, the src is populated without structural changes.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] vi.hoisted() required for mockUseReducedMotion in test file**
- **Found during:** Task 1 (verifying HeroSection tests)
- **Issue:** `mockUseReducedMotion` declared as `const` before `vi.mock()` factory — Vitest hoists vi.mock() causing ReferenceError
- **Fix:** Wrapped in `vi.hoisted()` — same pattern established in 03-01 STATE.md decisions
- **Files modified:** `__tests__/components/hero/HeroSection.test.tsx`
- **Verification:** All 4 HeroSection tests pass after fix
- **Committed in:** `0040d86` (Task 1 commit)

**2. [Rule 2 - Missing Critical] Extended motion mock with motion.p and motion.a**
- **Found during:** Task 1 (running tests after creating HeroSection)
- **Issue:** Test mock only covered motion.div, motion.span, motion.section — HeroSection uses motion.p (tagline) and motion.a (CTA)
- **Fix:** Added motion.p and motion.a entries to vi.mock factory with correct HTML element types
- **Files modified:** `__tests__/components/hero/HeroSection.test.tsx`
- **Verification:** Tests render tagline and CTA correctly; all assertions pass
- **Committed in:** `0040d86` (Task 1 commit)

---

**Total deviations:** 2 auto-fixed (1 bug, 1 missing mock coverage)
**Impact on plan:** Both fixes required for tests to run. No scope creep — component implementation unchanged.

## Issues Encountered

None beyond the test mock fixes above.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- HeroSection complete and live on homepage at `/`
- Phase 3 fully complete: animation variants, RevealWrapper, StaggerChildren, HeroTextSelector, HeroSection all shipped
- Phase 4 (portfolio grid) can begin — HeroSection provides the `#portfolio` anchor target for CTA navigation
- Video assets can be wired in later by setting `src` on the video element in HeroSection.tsx

---
*Phase: 03-hero-animation-system*
*Completed: 2026-03-28*
