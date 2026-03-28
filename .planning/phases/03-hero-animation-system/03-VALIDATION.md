---
phase: 3
slug: hero-animation-system
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-28
---

# Phase 3 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vitest + @testing-library/react (Wave 0 installs) |
| **Config file** | `vitest.config.ts` — Wave 0 creates |
| **Quick run command** | `npx vitest run --reporter=verbose components/hero` |
| **Full suite command** | `npx vitest run --reporter=verbose` |
| **Estimated runtime** | ~8 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npx vitest run --reporter=verbose components/hero`
- **After every plan wave:** Run `npx vitest run --reporter=verbose`
- **Before `/gsd:verify-work`:** Full suite must be green + manual visual checks complete
- **Max feedback latency:** ~8 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| ANIM-reduced-motion | 03-01 | 0 | ANIM-06 | unit | `npx vitest run --reporter=verbose RevealWrapper` | ❌ Wave 0 | ⬜ pending |
| ANIM-variant-prop | 03-01 | 0 | ANIM-03 | unit | `npx vitest run --reporter=verbose RevealWrapper` | ❌ Wave 0 | ⬜ pending |
| ANIM-stagger-reduced | 03-01 | 0 | ANIM-06 | unit | `npx vitest run --reporter=verbose StaggerChildren` | ❌ Wave 0 | ⬜ pending |
| HERO-selector | 03-01 | 1 | HERO-04 | unit | `npx vitest run --reporter=verbose HeroTextSelector` | ❌ Wave 0 | ⬜ pending |
| HERO-section | 03-02 | 1 | HERO-01, HERO-02, HERO-03 | smoke | `npx vitest run --reporter=verbose HeroSection` | ❌ Wave 0 | ⬜ pending |
| HERO-load-anim | 03-02 | 1 | HERO-05 | manual | Visual check on page load | manual-only | ⬜ pending |
| ANIM-hover | 03-02 | 2 | ANIM-04, ANIM-05 | manual | Hover on CTA and cards in browser | manual-only | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `vitest.config.ts` — Vitest config with jsdom environment
- [ ] `vitest.setup.ts` — `@testing-library/jest-dom` import
- [ ] `__tests__/components/motion/RevealWrapper.test.tsx` — variant prop + reduced motion (ANIM-03, ANIM-06)
- [ ] `__tests__/components/motion/StaggerChildren.test.tsx` — reduced motion guard (ANIM-06)
- [ ] `__tests__/components/hero/HeroTextSelector.test.tsx` — cycling behavior, AnimatePresence (HERO-04)
- [ ] `__tests__/components/hero/HeroSection.test.tsx` — renders, video element present, CTA button (HERO-01, HERO-02, HERO-03)
- [ ] Install: `npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event`

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Hero entrance animation on page load | HERO-05 | jsdom doesn't run Motion animations | Load page in browser; verify logo → selector → CTA stagger at 0.2/0.5/0.8s |
| Text selector slide transition visual | HERO-04 | AnimatePresence animation not testable in jsdom | Watch selector cycle: text exits upward (y: -12), new text enters from below (y: 12) |
| CTA button hover scale/brightness | ANIM-04 | CSS hover states not in jsdom | Hover over "Ver Portfólio" button; verify subtle scale or brightness change |
| Card hover elevation | ANIM-05 | CSS hover states not in jsdom | Hover over any card/image element in later sections; verify y offset or scale change |
| TopNav transparent over dark hero | HERO-01 | Visual contrast check | At page top, TopNav text must be white/visible against dark hero gradient |
| Video gradient fallback | HERO-01 | Needs browser render | With empty video src, page shows dark gradient (no broken video element) |
| prefers-reduced-motion OS setting | ANIM-06 | Requires OS accessibility setting | Enable reduced motion in OS; reload page; verify zero animation plays |
