---
phase: 03-hero-animation-system
plan: "01"
subsystem: animation-system
tags: [vitest, testing, animation, accessibility, reduced-motion, hero]
dependency_graph:
  requires:
    - lib/animation-variants.ts
    - components/motion/RevealWrapper.tsx
    - components/motion/StaggerChildren.tsx
  provides:
    - vitest.config.ts
    - vitest.setup.ts
    - __tests__/components/motion/RevealWrapper.test.tsx
    - __tests__/components/motion/StaggerChildren.test.tsx
    - __tests__/components/hero/HeroTextSelector.test.tsx
    - __tests__/components/hero/HeroSection.test.tsx
    - components/motion/RevealWrapper.tsx (upgraded)
    - components/motion/StaggerChildren.tsx (upgraded)
    - components/hero/HeroTextSelector.tsx
  affects:
    - Every component using RevealWrapper or StaggerChildren (now accessibility-hardened)
    - Plan 03-02 (HeroSection consumes HeroTextSelector)
tech_stack:
  added:
    - vitest@4.1.2
    - "@vitejs/plugin-react"
    - jsdom
    - "@testing-library/react"
    - "@testing-library/jest-dom"
    - "@testing-library/user-event"
  patterns:
    - vi.hoisted() for mock variables referenced in vi.mock() factories
    - useReducedMotion() guard pattern: prefersReduced ? 'visible' : 'hidden'
    - AnimatePresence mode="wait" with string key for text cycling
    - setInterval with clearInterval cleanup in useEffect
key_files:
  created:
    - vitest.config.ts
    - vitest.setup.ts
    - __tests__/components/motion/RevealWrapper.test.tsx
    - __tests__/components/motion/StaggerChildren.test.tsx
    - __tests__/components/hero/HeroTextSelector.test.tsx
    - __tests__/components/hero/HeroSection.test.tsx
    - components/hero/HeroTextSelector.tsx
  modified:
    - components/motion/RevealWrapper.tsx
    - components/motion/StaggerChildren.tsx
    - package.json
decisions:
  - "vi.hoisted() required for mock variables used inside vi.mock() factory — Vitest hoists vi.mock() calls to top of file before const declarations"
  - "HeroSection.test.tsx uses it.todo() stubs — component created in Plan 03-02, expected to fail until then"
  - "AnimatePresence key uses text string (not index) — required for proper exit animation triggering"
metrics:
  duration: "3 min"
  completed_date: "2026-03-28"
  tasks_completed: 3
  files_changed: 9
---

# Phase 03 Plan 01: Vitest Infrastructure + Animation Hardening + HeroTextSelector Summary

Installed Vitest test infrastructure with jsdom, hardened RevealWrapper and StaggerChildren with useReducedMotion accessibility guards, and built HeroTextSelector cycling "A Criação/Videografia/Fotografia" every 3s via AnimatePresence mode="wait".

## What Was Built

### Task 0: Vitest Infrastructure
Installed 6 testing dev dependencies and created the test scaffolding:
- `vitest.config.ts`: jsdom environment, React plugin, `@` path alias matching tsconfig
- `vitest.setup.ts`: jest-dom matchers via `@testing-library/jest-dom/vitest`
- 4 test stub files covering RevealWrapper, StaggerChildren, HeroTextSelector, HeroSection

### Task 1: RevealWrapper Upgrade
Added `variant?: 'fadeUp' | 'scaleIn'` prop with `variantMap` lookup, and `useReducedMotion()` guard that sets `initial="visible" animate="visible" transition={{ duration: 0 }}` when the user prefers reduced motion.

### Task 2: StaggerChildren Upgrade + HeroTextSelector
- `StaggerChildren`: same `useReducedMotion()` pattern as RevealWrapper — parent renders `initial="visible"` which propagates to variant children (StaggerItem) automatically
- `HeroTextSelector`: new `'use client'` component with `useState` index, `setInterval(3000)` with cleanup, `AnimatePresence mode="wait"`, slide transitions (`y: 12` enter, `y: -12` exit), duration 0.4s easing `[0.22, 1, 0.36, 1]`

## Test Results

```
Test Files  3 passed (3)
Tests       9 passed (9)
```

All motion and hero text selector tests green. HeroSection.test.tsx has todo stubs — intentional, component built in Plan 03-02.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] vi.hoisted() required for mock variable references in vi.mock() factory**
- **Found during:** Task 0 verification
- **Issue:** `vi.mock()` is hoisted to top of file before `const mockUseReducedMotion = vi.fn()` declarations, causing `ReferenceError: Cannot access 'mockUseReducedMotion' before initialization` in all 3 test files with mock refs
- **Fix:** Replaced `const mockX = vi.fn()` + `vi.mock(...mockX...)` pattern with `const mocks = vi.hoisted(() => ({ useReducedMotion: vi.fn(...) }))` + `vi.mock(...mocks.useReducedMotion...)` in RevealWrapper.test.tsx, StaggerChildren.test.tsx, and HeroTextSelector.test.tsx
- **Files modified:** All 3 affected test files
- **Commit:** 50096e5 (re-written before commit)

**2. [Plan deviation] HeroSection.test.tsx uses it.todo() stubs instead of failing tests**
- **Found during:** Task 0
- **Rationale:** The plan note explicitly states "HeroSection tests will fail until Plan 03-02 creates HeroSection.tsx — that is expected." Using `it.todo()` is cleaner than importing a non-existent component and having import errors pollute the test output. All other test files work correctly.

## Self-Check: PASSED

Files verified:
- vitest.config.ts: FOUND
- vitest.setup.ts: FOUND
- __tests__/components/motion/RevealWrapper.test.tsx: FOUND
- __tests__/components/motion/StaggerChildren.test.tsx: FOUND
- __tests__/components/hero/HeroTextSelector.test.tsx: FOUND
- __tests__/components/hero/HeroSection.test.tsx: FOUND
- components/motion/RevealWrapper.tsx: FOUND (upgraded)
- components/motion/StaggerChildren.tsx: FOUND (upgraded)
- components/hero/HeroTextSelector.tsx: FOUND

Commits verified:
- 50096e5: chore(03-01): install Vitest and create test infrastructure
- 5167476: feat(03-01): upgrade RevealWrapper with variant prop and useReducedMotion guard
- a622213: feat(03-01): upgrade StaggerChildren with reduced motion guard and create HeroTextSelector
