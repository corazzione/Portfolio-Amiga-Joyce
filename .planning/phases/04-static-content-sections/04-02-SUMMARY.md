---
phase: 04-static-content-sections
plan: 02
subsystem: sections
tags: [portfolio, blog, faq, accordion, motion, server-component, client-component]
dependency_graph:
  requires:
    - 04-01 (ServicesSection + ServiceCard pattern)
    - lib/data.ts (blogPosts, faqItems)
    - components/motion/StaggerChildren
    - components/motion/RevealWrapper
  provides:
    - components/sections/PortfolioSection
    - components/sections/PortfolioCard
    - components/sections/BlogSection
    - components/sections/FAQSection
  affects:
    - app/page.tsx (sections available to import)
tech_stack:
  added: []
  patterns:
    - Server Component delegates 'use client' boundary to leaf card (PortfolioCard)
    - motion height 0->auto accordion without AnimatePresence on persistent DOM element
    - hr separator with i>0 guard pattern (between posts, not around)
    - useState<string|null> single-open accordion with toggle-on-reclick
key_files:
  created:
    - components/sections/PortfolioCard.tsx
    - components/sections/PortfolioSection.tsx
    - components/sections/BlogSection.tsx
    - components/sections/FAQSection.tsx
  modified:
    - __tests__/components/sections/PortfolioSection.test.tsx
    - __tests__/components/sections/BlogSection.test.tsx
    - __tests__/components/sections/FAQSection.test.tsx
decisions:
  - PortfolioSection uses 6 static inline items (not from data.ts) per CONTEXT.md discretion
  - FAQSection uses height 0->auto motion animation without AnimatePresence — persistent DOM element pattern
  - BlogSection hr separator uses i>0 guard so no leading or trailing hr around the list
metrics:
  duration: 2 min
  completed_date: "2026-03-28T06:54:49Z"
  tasks_completed: 3
  files_changed: 7
---

# Phase 04 Plan 02: PortfolioSection, BlogSection, FAQSection Summary

**One-liner:** Portfolio 3-column grid with hover cards, blog stacked list with hr separators, and FAQ accordion using motion height 0-to-auto without AnimatePresence.

## What Was Built

### Task 1: PortfolioSection + PortfolioCard (commit 67e02d6)

**PortfolioCard.tsx** — Client Component following the ServiceCard pattern exactly:
- `'use client'` for `whileHover`
- `motion.div` with `whileHover={{ scale: 1.02, y: -4 }}` and `transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}`
- Placeholder: `bg-dark/10 aspect-[3/4] rounded-xl`
- Caption in `font-switzer text-sm font-medium text-dark/70`

**PortfolioSection.tsx** — Server Component (no `'use client'`):
- 6 static `portfolioItems` defined inline (not from data.ts)
- `StaggerChildren` wraps `grid grid-cols-1 md:grid-cols-3 gap-6`
- `StaggerItem` wraps each `PortfolioCard`

### Task 2: BlogSection (commit 914749e)

**BlogSection.tsx** — Server Component:
- Imports `blogPosts` from `@/lib/data` (3 items)
- Stacked list layout (not grid) — editorial style
- `{i > 0 && <hr className="border-dark/10" />}` — exactly 2 separators between 3 posts
- `RevealWrapper` per post with `delay={i * 0.1}` staggered entrance
- Category tag in `text-gold uppercase tracking-widest`

### Task 3: FAQSection (commit 8e8cc79)

**FAQSection.tsx** — Client Component:
- `'use client'` for `useState` + `motion`
- `useState<string | null>(null)` — single-open accordion, clicking open item closes it
- `motion.div` with `initial={{ height: 0 }}` and `animate={{ height: isOpen ? 'auto' : 0 }}`
- `className="overflow-hidden"` on motion.div — no AnimatePresence needed
- Two-column layout: `grid-cols-1 lg:grid-cols-2` with title left, accordion right
- `+` icon rotates 45deg via inline `style={{ transform }}` when open
- Imports `faqItems` from `@/lib/data` (4 items)

## Test Results

| File | Tests | Result |
|------|-------|--------|
| PortfolioSection.test.tsx | 3 | PASS |
| BlogSection.test.tsx | 3 | PASS |
| FAQSection.test.tsx | 4 | PASS |
| **Total** | **10** | **PASS** |

## Deviations from Plan

None — plan executed exactly as written.

## Decisions Made

1. **PortfolioSection static items**: 6 inline portfolio items defined in the component file rather than from data.ts, per the plan's explicit note about CONTEXT.md discretion. Easy to migrate to data.ts when real portfolio content is available.

2. **FAQSection no AnimatePresence**: Height animation runs on a persistent DOM element (`motion.div` always mounted), so AnimatePresence is not needed and was intentionally excluded. This is simpler and avoids the unmount/remount pattern.

3. **BlogSection hr pattern**: `{i > 0 && <hr />}` ensures separators appear only between posts — no leading hr before the first post and no trailing hr after the last.
