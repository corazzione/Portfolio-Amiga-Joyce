---
phase: 7
slug: mobile-responsive-performance
status: draft
nyquist_compliant: true
wave_0_complete: true
created: 2026-03-28
---

# Phase 7 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vitest 4.1.x + jsdom + @testing-library/react (installed in Phase 3) |
| **Config file** | `vitest.config.ts` — already exists |
| **Quick run command** | `npx vitest run __tests__/components/sections/ProcessSection.test.tsx __tests__/components/sections/TestimonialSection.test.tsx` |
| **Full suite command** | `npx vitest run` |
| **Estimated runtime** | ~15 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npx vitest run __tests__/components/sections/ProcessSection.test.tsx __tests__/components/sections/TestimonialSection.test.tsx`
- **After every plan wave:** Run `npx vitest run`
- **Before `/gsd:verify-work`:** Full suite green + `npm run build` exits 0
- **Max feedback latency:** ~15 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| RESP-new-assertions | 07-02 | 1 | RESP-06, RESP-07 | unit | `npx vitest run __tests__/components/sections/ProcessSection.test.tsx __tests__/components/sections/TestimonialSection.test.tsx` | ✅ Exists (new assertions) | ⬜ pending |
| RESP-01-05 | 07-01 | 1 | RESP-01,02,03,04,05 | unit | `npx vitest run __tests__/components/sections/` | ✅ Exists | ⬜ pending |
| RESP-06-07 | 07-02 | 1 | RESP-06, RESP-07 | unit | `npx vitest run __tests__/components/sections/ProcessSection.test.tsx __tests__/components/sections/TestimonialSection.test.tsx` | ✅ Exists | ⬜ pending |
| PERF-01-02 | 07-03 | 2 | PERF-01, PERF-02 | unit | `npx vitest run __tests__/components/hero/HeroSection.test.tsx` | ✅ Exists | ⬜ pending |
| PERF-03-04 | 07-03 | 2 | PERF-03, PERF-04 | smoke | `npm run build` | n/a | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

> **Wave 0 intent is satisfied by 07-02 Task 1 sequential ordering — test assertions are written before Task 2 implementation within the same plan.** Task 1 (TDD red phase) writes all test assertions and runs them to confirm RED state before Task 2 implements the production code. This is functionally equivalent to a separate Wave 0 plan.

All test files already exist. Only new test case assertions are needed:

- [x] `__tests__/components/sections/ProcessSection.test.tsx` — add: cards render with `sm:sticky` class; container renders with `sm:min-h-[300vh]` class; heading has `text-2xl` mobile base (RESP-07)
- [x] `__tests__/components/sections/TestimonialSection.test.tsx` — add: `onTouchStart` / `onTouchEnd` handlers present on content container; swipe left advances index; swipe right decrements index (RESP-06)

*No new test files needed — all infrastructure in place. Existing mock pattern (`vi.mock('motion/react', ...)`) unchanged.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| All sections single-column at 375px | RESP-01 | jsdom doesn't render CSS layouts | Open site in browser at 375px viewport; scroll all sections and verify single-column stacking |
| Services grid 4→2→1 columns | RESP-02 | Requires browser resize | Resize from 1280px → 768px → 375px; verify 4→2→1 column transition |
| Bento grid collapses to single column | RESP-03 | Requires browser resize | At 375px verify all bento cells stack vertically |
| Process cards stack without sticky on mobile | RESP-07 | Requires browser with CSS rendering | At 375px scroll process section; verify cards stack without sticky offset |
| Testimonial swipe left/right navigates | RESP-06 | Touch events require real touch device or DevTools | In DevTools touch mode, swipe left/right on testimonials; verify card changes |
| Lighthouse score ≥ 85 on Vercel | PERF-03 | Requires deployed site | Run Lighthouse in Chrome DevTools on deployed Vercel URL; verify score ≥ 85 |
| Site accessible at Vercel URL | PERF-04 | Requires deployment | After pushing to repo, verify Vercel auto-deploys and URL is publicly accessible |

---

## Validation Sign-Off

- [x] All tasks have `<automated>` verify or Wave 0 dependencies
- [x] Sampling continuity: no 3 consecutive tasks without automated verify
- [x] Wave 0 covers all test assertion additions (new assertions in existing files)
- [x] No watch-mode flags
- [x] Feedback latency < 15s
- [x] `nyquist_compliant: true` set in frontmatter

**Approval:** approved (wave_0 satisfied by 07-02 Task 1 sequential execution)
