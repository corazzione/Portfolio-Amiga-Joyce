---
phase: 5
slug: complex-interactive-sections
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-28
---

# Phase 5 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vitest 3.x + @testing-library/react (installed in Phase 3) |
| **Config file** | `vitest.config.ts` — already exists |
| **Quick run command** | `npx vitest run __tests__/components/sections/` |
| **Full suite command** | `npx vitest run` |
| **Estimated runtime** | ~15 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npx vitest run __tests__/components/sections/`
- **After every plan wave:** Run `npx vitest run`
- **Before `/gsd:verify-work`:** Full suite must be green + manual visual checks complete
- **Max feedback latency:** ~15 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| COMP-stubs | 05-01 | 0 | COMP-01–06 | unit | `npx vitest run __tests__/components/sections/` | ❌ Wave 0 | ⬜ pending |
| COMP-01-02 | 05-01 | 1 | COMP-01, COMP-02 | unit | `npx vitest run __tests__/components/sections/ProcessSection` | ❌ Wave 0 | ⬜ pending |
| COMP-03 | 05-01 | 1 | COMP-03 | unit | `npx vitest run __tests__/components/sections/BentoSection` | ❌ Wave 0 | ⬜ pending |
| COMP-04-06 | 05-02 | 2 | COMP-04, COMP-05, COMP-06 | unit | `npx vitest run __tests__/components/sections/TestimonialSection` | ❌ Wave 0 | ⬜ pending |
| page-integration | 05-02 | 2 | All COMP-* | smoke | `npm run build` | n/a | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `__tests__/components/sections/ProcessSection.test.tsx` — renders 6 cards with step data; each card has sticky class, rotation class, step number, step name, circular placeholder, description (COMP-01, COMP-02)
- [ ] `__tests__/components/sections/BentoSection.test.tsx` — renders tall left card with "Visão Personalizada", center card with "Atenção aos Detalhes" checklist, right column sub-cards (COMP-03)
- [ ] `__tests__/components/sections/TestimonialSection.test.tsx` — renders dark section, video element, white card with name/role/quote; auto-advance fires after 5000ms (fakeTimers); dot click updates index; AnimatePresence present (COMP-04, COMP-05, COMP-06)

*Use same `vi.mock('motion/react', ...)` pattern from existing `__tests__/components/sections/ServicesSection.test.tsx`*

*Standard mock block:*
```tsx
vi.mock('motion/react', () => ({
  motion: {
    div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement> & { children?: React.ReactNode }) => (
      <div {...props}>{children}</div>
    ),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useReducedMotion: vi.fn(() => false),
  useInView: vi.fn(() => true),
}))
```

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Sticky cards stack as user scrolls | COMP-01 | jsdom doesn't implement scroll + sticky positioning | Scroll through process section in browser; verify each card stays visible as next card scrolls in on top |
| Paper-like rotation visible on cards | COMP-01 | Visual design check | Inspect each process card; verify alternating slight rotation visible |
| Bento asymmetric grid layout intact on desktop | COMP-03 | Requires real browser layout | Open at 1280px+ viewport; verify left tall card spans 2 rows, center and right sub-cards positioned correctly |
| Bento collapses to single column on mobile | COMP-03 | Requires browser resize | Resize to 375px; verify all bento cells stack vertically, no overflow |
| Testimonial video fallback renders gracefully | COMP-04 | Empty src behavior is browser-specific | Load page in browser; verify dark bg-dark section renders without broken video icon |
| Auto-advance 5s timing correct | COMP-05 | Requires real time + browser | Watch testimonial section for 10–15s; verify card changes every 5s |
| Dot navigation changes card + restarts interval | COMP-05 | Requires user interaction | Click each dot; verify card changes immediately and auto-advance restarts cleanly from that card |
| AnimatePresence enter/exit transitions | COMP-06 | CSS transitions not in jsdom | Change cards via dot nav; verify smooth opacity + y transition |
| `next build` exits 0 (production CSS not purged) | COMP-01 | Tailwind purge only in production build | Run `npm run build`; verify rotation and top classes present in output CSS |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING test file references
- [ ] No watch-mode flags
- [ ] Feedback latency < 15s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
