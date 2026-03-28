---
phase: 4
slug: static-content-sections
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-28
---

# Phase 4 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vitest + @testing-library/react (installed in Phase 3) |
| **Config file** | `vitest.config.ts` — already exists |
| **Quick run command** | `npx vitest run --reporter=verbose __tests__/components/sections` |
| **Full suite command** | `npx vitest run --reporter=verbose` |
| **Estimated runtime** | ~12 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npx vitest run --reporter=verbose __tests__/components/sections`
- **After every plan wave:** Run `npx vitest run --reporter=verbose`
- **Before `/gsd:verify-work`:** Full suite must be green + manual visual checks complete
- **Max feedback latency:** ~12 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| SECT-stubs | 04-01 | 0 | All SECT-* | unit | `npx vitest run __tests__/components/sections` | ❌ Wave 0 | ⬜ pending |
| SECT-01-02 | 04-01 | 1 | SECT-01, SECT-02 | unit | `npx vitest run PhotoStripSection ManifestoSection` | ❌ Wave 0 | ⬜ pending |
| SECT-03 | 04-01 | 1 | SECT-03 | unit | `npx vitest run ProofStripSection` | ❌ Wave 0 | ⬜ pending |
| SECT-04-05 | 04-01 | 1 | SECT-04, SECT-05, ANIM-05 | unit | `npx vitest run ServicesSection ServiceCard` | ❌ Wave 0 | ⬜ pending |
| SECT-06 | 04-02 | 2 | SECT-06, ANIM-05 | unit | `npx vitest run PortfolioSection` | ❌ Wave 0 | ⬜ pending |
| SECT-07 | 04-02 | 2 | SECT-07 | unit | `npx vitest run BlogSection` | ❌ Wave 0 | ⬜ pending |
| SECT-08 | 04-02 | 2 | SECT-08 | unit | `npx vitest run FAQSection` | ❌ Wave 0 | ⬜ pending |
| SECT-09-10 | 04-03 | 3 | SECT-09, SECT-10 | unit | `npx vitest run CTASection FooterSection` | ❌ Wave 0 | ⬜ pending |
| page-integration | 04-03 | 3 | All SECT-* | smoke | `npm run build` | n/a | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `__tests__/components/sections/PhotoStripSection.test.tsx` — renders strip container (SECT-01)
- [ ] `__tests__/components/sections/ManifestoSection.test.tsx` — renders manifesto text (SECT-02)
- [ ] `__tests__/components/sections/ProofStripSection.test.tsx` — renders CTA button, avatar cluster, logos (SECT-03)
- [ ] `__tests__/components/sections/ServicesSection.test.tsx` — renders 7 service cards + 1 photo card (SECT-04, SECT-05)
- [ ] `__tests__/components/sections/ServiceCard.test.tsx` — renders title, description, icon; whileHover prop (ANIM-05)
- [ ] `__tests__/components/sections/PortfolioSection.test.tsx` — renders 6 portfolio items (SECT-06)
- [ ] `__tests__/components/sections/BlogSection.test.tsx` — renders 3 blog posts with separators (SECT-07)
- [ ] `__tests__/components/sections/FAQSection.test.tsx` — renders 4 questions; click toggles open/close (SECT-08)
- [ ] `__tests__/components/sections/CTASection.test.tsx` — renders heading + "Entre em Contato" button (SECT-09)
- [ ] `__tests__/components/sections/FooterSection.test.tsx` — renders Corazón brand, "MC. © 2026" (SECT-10)

*Use same `vi.mock('motion/react', ...)` pattern from existing `__tests__/components/hero/HeroSection.test.tsx`*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Scroll reveal animations fire on section enter | SECT-01–10 | jsdom doesn't implement IntersectionObserver | Scroll each section into view in browser; verify fade-up entrance |
| Card hover scale on mouse enter | ANIM-05 | CSS hover not in jsdom | Hover over service, portfolio, and blog cards; verify scale: 1.02 effect |
| FAQ accordion expands/collapses smoothly | SECT-08 | Motion height animation requires real DOM | Click FAQ question; verify smooth height animation, answer visible |
| Services 4→2→1 column reflow | SECT-04 | Requires browser resize | Resize from desktop → tablet → mobile; verify grid reflows correctly |
| Photo strip horizontal scroll | SECT-01 | Requires real browser layout | Verify strip scrolls horizontally on mobile |
| Footer white card on beige bg | SECT-10 | Visual design check | Verify white card renders distinctly against beige bg |
