# Phase 7: Mobile Responsive + Performance - Context

**Gathered:** 2026-03-28
**Status:** Ready for planning
**Source:** Auto mode (--auto) — all decisions are recommended defaults

<domain>
## Phase Boundary

The final polish pass: all sections reflow correctly on mobile, touch interactions work, images are optimized, and the site is deployed on Vercel. This phase treats mobile as a genuine redesign (single-column stacks, readable typography, working gestures), not a shrink-down. It also handles the Vercel deployment configuration and Lighthouse performance gate. No new sections or pages are added — this is a cross-cutting quality pass over everything built in Phases 1–6.

</domain>

<decisions>
## Implementation Decisions

### Mobile Layout Audit (RESP-01, RESP-02, RESP-03, RESP-04, RESP-05)
- **Strategy:** Pure Tailwind responsive classes — no new CSS framework, no media query hooks. Audit every section component and add/fix `sm:`/`md:`/`lg:` responsive modifiers where missing.
- **Breakpoints:** `sm` = 640px (tablet), `md` = 768px, `lg` = 1024px (desktop). All 375px (iPhone SE) checks must be the primary mobile target.
- **Single-column rule:** All grid-based sections (`grid-cols-*`) must have a `grid-cols-1` base before any responsive variant (e.g., `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`)
- **Hero (RESP-04):** HeroTextSelector must remain legible — verify font sizes don't overflow on 375px. Use `text-2xl sm:text-3xl lg:text-4xl` pattern for cycling text.
- **Navigation (RESP-05):** BottomBar fullscreen overlay already uses absolute positioning — verify it covers the full viewport on iOS Safari (safe-area-inset consideration). TopNav links should hide on mobile (hamburger-only).
- **Sections to audit:** HeroSection, PhotoStripSection, ManifestoSection, ProofStripSection, ServicesSection, PortfolioSection, BentoSection, BlogSection, FAQSection, CTASection, FooterSection — every `components/sections/*.tsx` file
- **Typography scaling:** Section headings using `text-4xl` should scale down to `text-2xl` or `text-3xl` on mobile

### Process Cards Mobile Fallback (RESP-07)
- **Mechanism:** Change CSS sticky classes from unconditional to `sm:sticky` — below `sm` breakpoint (640px), cards render as normal stacked divs without the sticky effect
- **Implementation:** In ProcessSection.tsx, change the `topClasses` and `zClasses` arrays to prefix each class with `sm:` (e.g., `sm:sticky sm:top-16 sm:z-[10]`). On mobile, cards stack naturally in document flow.
- **No JS fallback needed** — CSS-only approach is cleaner and avoids any device detection logic
- **The `min-h-[300vh]` container:** On mobile with no sticky, the tall container would create excessive empty scroll. Add `sm:min-h-[300vh]` so the container height only applies at sm+ breakpoint.

### Testimonial Touch Swipe (RESP-06)
- **Mechanism:** Inline `onTouchStart` / `onTouchEnd` delta detection in TestimonialSection.tsx — no swipe library needed
- **Threshold:** 50px horizontal delta triggers a swipe (standard mobile swipe threshold)
- **Direction:** Swipe left → next testimonial; swipe right → previous testimonial
- **Implementation:** Store `touchStartX` in a `useRef<number>(0)`. On `onTouchStart`, record `e.touches[0].clientX`. On `onTouchEnd`, compute delta, if `|delta| > 50` call the existing navigation logic (same as dot click, reuses `handleDotClick` pattern with interval restart)
- **Reduced motion:** Swipe still changes card but transition duration is 0 when `prefersReduced` is true (already handled by existing AnimatePresence guard)

### Image Strategy (PERF-01)
- **`next/image` with sizes:** Add `sizes` attribute to any existing `<Image>` components. Standard pattern: `sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"` for grid images, `sizes="100vw"` for full-width images.
- **Placeholder divs:** Placeholder divs (`bg-dark/10`) remain as-is — they have no `next/image` to optimize. No change needed.
- **No actual image files:** Since all images are placeholders, PERF-01 mainly applies to the `next/image` instances that DO exist. Verify each one has proper `sizes` + `alt` attributes.

### Video Hosting (PERF-02)
- **Current state:** All video elements have no `src` attribute (empty) — no video files are in git. PERF-02 is satisfied by default.
- **Documentation:** Add a code comment above each `<video>` element in HeroSection.tsx and TestimonialSection.tsx explaining the external hosting pattern:
  ```tsx
  {/* Video: self-host on Vercel Blob or Cloudinary, set NEXT_PUBLIC_VIDEO_URL env var */}
  {/* <video src={process.env.NEXT_PUBLIC_VIDEO_URL} autoPlay muted loop playsInline /> */}
  ```
- **No env var wiring needed in v1** — Joyce sets this up when video assets are ready

### Vercel Deployment (PERF-03, PERF-04)
- **`vercel.json`:** Already exists from Phase 1 with font caching and security headers. Verify it is correct and complete.
- **Deployment is user-initiated:** The planner should NOT automate `vercel deploy` (requires auth). Instead: verify the repo is wired to Vercel via `vercel.json` correctness, ensure `npm run build` exits 0, and document the one-time setup step.
- **Lighthouse gate:** PERF-03 (≥85 score) is verified on the deployed Vercel URL — this is a manual post-deployment check. The plan should include a checklist item for it, not an automated command.
- **Build output:** `npm run build` must continue to exit 0 after all Phase 7 changes — this is the automated gate.

### Claude's Discretion
- Exact responsive typography scale for each heading (2xl vs 3xl on mobile)
- Whether to add `overflow-x: hidden` to the `<body>` to prevent horizontal overflow on mobile
- Mobile padding adjustments (whether `px-6` is sufficient at 375px or needs `px-4`)
- Exact touch swipe threshold value (50px is a sensible default)
- Whether any section needs a dedicated mobile-specific layout vs the standard responsive reflow

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Requirements
- `.planning/REQUIREMENTS.md` — RESP-01 through RESP-07 (mobile responsiveness), PERF-01 through PERF-04 (performance + deployment)

### All section components to audit
- `components/sections/` — all 14 section/card files: PhotoStripSection, ManifestoSection, ProofStripSection, ServicesSection, ServiceCard, PortfolioSection, PortfolioCard, BentoSection, BlogSection, FAQSection, CTASection, FooterSection, ProcessSection, TestimonialSection
- `components/hero/HeroSection.tsx` — hero mobile layout, video element comment
- `components/layout/TopNav.tsx` — mobile nav collapse
- `components/layout/BottomBar.tsx` — mobile overlay safe area
- `app/portfolio/page.tsx`, `app/contato/page.tsx`, `app/privacidade/page.tsx` — sub-page mobile layout

### Config / deployment
- `vercel.json` — verify font caching headers and security headers are correct for production
- `tailwind.config.ts` — breakpoint tokens and design system tokens

### Phase 5 pattern files (critical for responsive changes)
- `components/sections/ProcessSection.tsx` — modify for `sm:sticky` fallback (RESP-07)
- `components/sections/TestimonialSection.tsx` — add touch swipe (RESP-06)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `components/sections/TestimonialSection.tsx`: `handleDotClick` + `startInterval` pattern already handles index change + interval restart — swipe handler just calls this same function
- `components/sections/ProcessSection.tsx`: `topClasses` and `zClasses` are complete Tailwind string literal arrays — adding `sm:` prefix to each class is the only change needed
- `tailwind.config.ts`: Custom breakpoints use Tailwind defaults (sm=640px, md=768px, lg=1024px) — consistent throughout codebase

### Established Patterns
- Responsive grid: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6` — base-first, then responsive modifiers
- `'use client'` only at component level that needs it — TestimonialSection is already a client component (swipe goes here, not in the page)
- Tailwind `sm:` prefix for conditional layout: `sm:sticky`, `sm:min-h-[300vh]`, `sm:row-span-2` — all existing patterns
- Build must pass: `npm run build` exits 0 — final gate before PERF-03 Lighthouse check

### Integration Points
- All section component changes are additive responsive classes — no architectural changes
- `app/layout.tsx` — consider adding `overflow-x-hidden` to body to prevent horizontal overflow
- `vercel.json` — ensure caching headers and rewrites are correct before deployment

</code_context>

<specifics>
## Specific Ideas

- The "genuine mobile redesign" goal means checking that every section actually looks good at 375px, not just that it technically doesn't overflow
- Process cards on mobile should feel like a naturally scrolling list of steps — the sticky effect is a desktop enhancement, not a requirement
- Testimonial swipe should feel native — 50px threshold prevents accidental swipes while still feeling responsive
- The Lighthouse ≥85 score is achievable with placeholder images (no real photos to compress) — the main risks are large JS bundles and layout shift

</specifics>

<deferred>
## Deferred Ideas

- Lenis smooth scroll library (v2 — ENH-01)
- Custom cursor (v2 — ENH-02)
- Page transition animations (v2 — ENH-03)
- Lightbox for portfolio images (v2 — ENH-04)
- Horizontal scroll for photo strip (v2 — ENH-05)
- Touch swipe on process cards mobile (beyond the sticky fallback — v2)
- Progressive Web App (PWA) manifest — not in v1 scope

</deferred>

---

*Phase: 07-mobile-responsive-performance*
*Context gathered: 2026-03-28 via auto mode*
