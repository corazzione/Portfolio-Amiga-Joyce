---
phase: 04-static-content-sections
plan: "01"
subsystem: sections
tags: [sections, animation, tdd, server-components, client-components]
dependency_graph:
  requires:
    - 03-02 (HeroSection, RevealWrapper, StaggerChildren, lib/data.ts)
  provides:
    - components/sections/PhotoStripSection.tsx
    - components/sections/ManifestoSection.tsx
    - components/sections/ProofStripSection.tsx
    - components/sections/ServicesSection.tsx
    - components/sections/ServiceCard.tsx
    - __tests__/components/sections/ (10 stub files)
  affects:
    - app/page.tsx (consumer of all section components)
tech_stack:
  added: []
  patterns:
    - Server Component sections importing 'use client' child components
    - RevealWrapper for single-element scroll reveals
    - StaggerChildren/StaggerItem for grid entrance animations
    - vi.mock pass-through for RevealWrapper and StaggerChildren in tests
key_files:
  created:
    - components/sections/PhotoStripSection.tsx
    - components/sections/ManifestoSection.tsx
    - components/sections/ProofStripSection.tsx
    - components/sections/ServicesSection.tsx
    - components/sections/ServiceCard.tsx
    - __tests__/components/sections/PhotoStripSection.test.tsx
    - __tests__/components/sections/ManifestoSection.test.tsx
    - __tests__/components/sections/ProofStripSection.test.tsx
    - __tests__/components/sections/ServicesSection.test.tsx
    - __tests__/components/sections/ServiceCard.test.tsx
    - __tests__/components/sections/PortfolioSection.test.tsx
    - __tests__/components/sections/BlogSection.test.tsx
    - __tests__/components/sections/FAQSection.test.tsx
    - __tests__/components/sections/CTASection.test.tsx
    - __tests__/components/sections/FooterSection.test.tsx
  modified: []
decisions:
  - "Server Component sections delegate 'use client' boundary to ServiceCard only — keeps animation contained to interactive leaf nodes"
  - "Test stubs use it.todo() not commented describe blocks — vitest recognizes files without import errors from non-existent components"
  - "CSS selector .aspect-\\[4\\/3\\] used in querySelector — Tailwind arbitrary value classes require escaping backslashes in test selectors"
metrics:
  duration: "2 min"
  completed_date: "2026-03-28"
  tasks_completed: 3
  files_created: 15
  files_modified: 0
  tests_passing: 12
  tests_todo: 13
---

# Phase 04 Plan 01: Static Content Sections Wave 1 Summary

**One-liner:** 10 test stubs + 4 homepage sections (PhotoStrip, Manifesto, ProofStrip, Services) with Server/Client component split and RevealWrapper/StaggerChildren animations.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Create all 10 section test stubs (Wave 0) | 53521f3 | 10 test files in `__tests__/components/sections/` |
| 2 | Implement PhotoStripSection, ManifestoSection, ProofStripSection | 1008227 | 3 components + 3 updated tests |
| 3 | Implement ServicesSection + ServiceCard with hover | 9870382 | 2 components + 2 updated tests |

## Verification Results

All 5 implemented component test files pass (12 tests). Remaining 5 stub files have 13 `it.todo()` entries for Plans 04-02 and 04-03.

```
Test Files  5 passed (5)
     Tests  12 passed (12)
```

## Components Built

**PhotoStripSection** (Server Component)
- 6 placeholder divs with `aspect-[4/3]`, `flex-shrink-0 w-[220px]`
- `overflow-x-auto` horizontal scroll, `overflow-hidden` on section
- RevealWrapper with `variant="scaleIn"`

**ManifestoSection** (Server Component)
- `font-switzer text-4xl md:text-6xl font-bold` centered text block
- Second sentence in `text-dark/50` span for contrast
- RevealWrapper with `variant="fadeUp"`

**ProofStripSection** (Server Component)
- Gold `bg-gold` CTA button with `rounded-full`
- 3 avatar circles: `w-9 h-9 rounded-full bg-dark/20 border-2 border-bg -ml-2 first:ml-0`
- 4 client logo names as `<span>` from `clientLogos` in lib/data

**ServicesSection** (Server Component)
- `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6`
- 7 ServiceCard components from `services` data array
- 1 dark photo placeholder card: `bg-dark rounded-2xl aspect-[3/4]`
- StaggerChildren/StaggerItem for grid entrance

**ServiceCard** (Client Component — `'use client'`)
- `motion.div` with `whileHover={{ scale: 1.02, y: -4 }}`
- `transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}`
- Renders icon (emoji), title, description

## Deviations from Plan

None - plan executed exactly as written.

## Self-Check

- [x] All 5 component files exist
- [x] All 10 test stub files exist
- [x] 3 task commits made (53521f3, 1008227, 9870382)
- [x] 12 tests passing, 13 todos remaining for future plans
