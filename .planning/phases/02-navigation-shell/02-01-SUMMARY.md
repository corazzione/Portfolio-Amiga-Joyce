---
phase: 02-navigation-shell
plan: "01"
subsystem: navigation
tags: [navigation, topnav, bottombar, animation, client-component]
dependency_graph:
  requires: [lib/utils.ts, lib/animation-variants.ts, motion/react]
  provides: [components/layout/TopNav.tsx, components/layout/BottomBar.tsx]
  affects: [app/layout.tsx]
tech_stack:
  added: []
  patterns: [AnimatePresence-in-parent, scroll-event-passive-listener, functional-state-update]
key_files:
  created:
    - components/layout/TopNav.tsx
    - components/layout/BottomBar.tsx
  modified: []
decisions:
  - "AnimatePresence lives in BottomBar (always-mounted parent) — exit animations require this"
  - "Scroll listener uses functional update pattern to avoid re-renders when value unchanged"
  - "Stagger animation added to overlay nav links (delayChildren 0.15s, stagger 0.05s)"
  - "Nav links in overlay use <button> + useRouter.push instead of <Link> to guarantee overlay closes before navigation"
metrics:
  duration: "1 min"
  completed_date: "2026-03-28"
  tasks_completed: 2
  files_changed: 2
---

# Phase 02 Plan 01: Navigation Components Summary

**One-liner:** TopNav (transparent-to-solid scroll bar) and BottomBar (fixed black bar with AnimatePresence-driven fullscreen overlay) using motion/react and Tailwind design tokens.

## Tasks Completed

| # | Task | Commit | Files |
|---|------|--------|-------|
| 1 | Create TopNav component with scroll transparency toggle | 897e7e7 | components/layout/TopNav.tsx |
| 2 | Create BottomBar component with AnimatePresence menu overlay | 8a1030f | components/layout/BottomBar.tsx |

## What Was Built

### TopNav (components/layout/TopNav.tsx)
- `'use client'` directive with passive scroll listener
- `SCROLL_THRESHOLD = 80` — toggles `bg-dark/95 backdrop-blur-sm` vs `bg-transparent`
- Text color swaps: `text-dark` at top, `text-white` when scrolled
- `pointer-events-none` container, `pointer-events-auto` on brand link and button
- MC. logo + `//` separator + tagline (hidden on mobile with `hidden md:inline`)
- Gold `Contato` button linking to `/contato`
- Responsive padding: `px-4 sm:px-5 md:px-8 py-3.5 sm:py-4 md:py-5`
- Functional update pattern: `setScrolled(prev => prev === isScrolled ? prev : isScrolled)` avoids unnecessary re-renders

### BottomBar (components/layout/BottomBar.tsx)
- Fixed `h-[60px]` black bar with `env(safe-area-inset-bottom)` for iOS
- Gold `Menu+` pill button (`bg-gold text-dark`) opens overlay
- `Corazón` centered in Switzer bold white
- `AnimatePresence` inline in BottomBar JSX (never a separate component)
- Overlay: `opacity: 0, y: 20` → `opacity: 1, y: 0` at 0.4s ease `[0.22, 1, 0.36, 1]`
- Staggered nav link entrance via `motion.nav` + `motion.div` variants
- Nav links: Inicio `/`, Portfolio `/portfolio`, Contato `/contato` at `clamp(36px, 6vw, 72px)`
- `document.body.style.overflow = 'hidden'` when open (with cleanup)
- Close button `aria-label="Fechar menu"`, MC. logo top-left, social links bottom-left

## Deviations from Plan

None — plan executed exactly as written.

## Verification

- `npx tsc --noEmit`: 0 errors
- Both files exist in `components/layout/`
- Both use `'use client'`
- No `framer-motion` imports — only `motion/react`
- `AnimatePresence` lives in `BottomBar.tsx`, not a separate component

## Self-Check: PASSED

- components/layout/TopNav.tsx: FOUND
- components/layout/BottomBar.tsx: FOUND
- .planning/phases/02-navigation-shell/02-01-SUMMARY.md: FOUND
- commit 897e7e7 (TopNav): FOUND
- commit 8a1030f (BottomBar): FOUND
