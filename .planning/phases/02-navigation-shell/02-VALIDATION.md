---
phase: 2
slug: navigation-shell
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-28
---

# Phase 2 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Jest + jsdom + @testing-library/react (Wave 0 installs) |
| **Config file** | `jest.config.js` — Wave 0 creates |
| **Quick run command** | `npx jest --testPathPattern="TopNav|BottomBar" --passWithNoTests` |
| **Full suite command** | `npx jest --passWithNoTests` |
| **Estimated runtime** | ~5 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npx jest --testPathPattern="TopNav|BottomBar" --passWithNoTests`
- **After every plan wave:** Run `npx jest --passWithNoTests`
- **Before `/gsd:verify-work`:** Full suite must be green + manual visual checks complete
- **Max feedback latency:** ~5 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| NAV-01-scroll | 02-01 | 1 | NAV-01 | unit | `npx jest --testPathPattern=TopNav` | ❌ Wave 0 | ⬜ pending |
| NAV-02-bottombar | 02-01 | 1 | NAV-02 | smoke | `npx jest --testPathPattern=BottomBar` | ❌ Wave 0 | ⬜ pending |
| NAV-03-open | 02-01 | 1 | NAV-03 | unit | `npx jest --testPathPattern=BottomBar` | ❌ Wave 0 | ⬜ pending |
| NAV-04-close | 02-01 | 1 | NAV-04 | unit | `npx jest --testPathPattern=BottomBar` | ❌ Wave 0 | ⬜ pending |
| NAV-05-mobile | 02-01 | 1 | NAV-05 | manual | Visual check at 375px | manual-only | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `jest.config.js` — base Jest config with jsdom environment
- [ ] `jest.setup.ts` — `@testing-library/jest-dom` import
- [ ] `__tests__/components/layout/TopNav.test.tsx` — scroll toggle behavior (NAV-01)
- [ ] `__tests__/components/layout/BottomBar.test.tsx` — open/close and overlay (NAV-02, NAV-03, NAV-04)
- [ ] Install: `npm install -D jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event ts-jest`

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Overlay covers full viewport on mobile | NAV-05 | jsdom doesn't implement CSS layout | Check at 375px (iPhone SE) and 390px (iPhone 14) in Chrome DevTools |
| AnimatePresence exit animation fires on close | NAV-03/04 | Animation timing not testable in jsdom | Click open, click close, verify fade-out plays |
| TopNav transparent → solid visual transition | NAV-01 | CSS backdrop-blur not in jsdom | Scroll 100px in browser, verify blur + bg transition |
