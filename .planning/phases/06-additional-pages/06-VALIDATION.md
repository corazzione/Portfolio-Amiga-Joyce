---
phase: 6
slug: additional-pages
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-28
---

# Phase 6 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vitest ^4.1.2 + @testing-library/react ^16.3.2 (installed in Phase 3) |
| **Config file** | `vitest.config.ts` — already exists |
| **Quick run command** | `npx vitest run __tests__/components/sections/ContactForm.test.tsx` |
| **Full suite command** | `npx vitest run` |
| **Estimated runtime** | ~15 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npx vitest run __tests__/components/sections/ContactForm.test.tsx`
- **After every plan wave:** Run `npx vitest run`
- **Before `/gsd:verify-work`:** Full suite green + `npm run build` exits 0
- **Max feedback latency:** ~15 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| PAGE-stubs | 06-01 | 0 | PAGE-02,03,04 | unit | `npx vitest run __tests__/components/sections/` | ❌ Wave 0 | ⬜ pending |
| PAGE-02 | 06-01 | 1 | PAGE-02 | unit | `npx vitest run __tests__/components/sections/PortfolioPage.test.tsx` | ❌ Wave 0 | ⬜ pending |
| PAGE-03 | 06-01 | 1 | PAGE-03 | unit | `npx vitest run __tests__/components/sections/ContactForm.test.tsx` | ❌ Wave 0 | ⬜ pending |
| PAGE-04 | 06-02 | 2 | PAGE-04 | unit | `npx vitest run __tests__/components/sections/PrivacidadePage.test.tsx` | ❌ Wave 0 | ⬜ pending |
| PAGE-01 | 06-02 | 2 | PAGE-01 | smoke | `npm run build` | n/a | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `__tests__/components/sections/ContactForm.test.tsx` — 4 tests: renders all 4 fields, shows success state on ok response, shows error state on failed response, disables submit button during submission (PAGE-03)
- [ ] `__tests__/components/sections/PortfolioPage.test.tsx` — renders "Todos os Trabalhos" heading, renders 5 category section headings, renders PortfolioCard components (PAGE-02)
- [ ] `__tests__/components/sections/PrivacidadePage.test.tsx` — renders "Política de Privacidade" heading, renders key LGPD section headings (PAGE-04)

*Use same `vi.mock('motion/react', ...)` pattern from existing `__tests__/components/sections/ServicesSection.test.tsx`*

*For ContactForm: mock `global.fetch` with `vi.fn()` to test async form states*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Formspree submission delivers email | PAGE-03 | Requires real Formspree account + live network | Configure `NEXT_PUBLIC_FORMSPREE_ID`, submit form in browser, verify email received |
| Contact form success/error UI renders correctly | PAGE-03 | Visual design check | Submit form with valid data → verify green success state; simulate network error → verify error message |
| Portfolio grid responsive layout (3→2→1 cols) | PAGE-02 | Requires browser resize | Resize from 1280px → 768px → 375px; verify grid reflows correctly |
| Privacy policy prose is readable | PAGE-04 | Content quality check | Scroll through /privacidade; verify section headings, readable typography, no broken layout |
| TopNav links navigate to correct pages | PAGE-01–04 | Requires real browser navigation | Click Portfólio and Contato links in TopNav; verify correct page loads |
| All 13 homepage sections complete end-to-end | PAGE-01 | Visual + scroll check | Scroll home page from top to footer; verify no missing or broken sections |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING test file references
- [ ] No watch-mode flags
- [ ] Feedback latency < 15s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
