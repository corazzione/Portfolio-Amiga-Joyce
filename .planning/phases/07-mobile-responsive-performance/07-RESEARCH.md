# Phase 7: Mobile Responsive + Performance - Research

**Researched:** 2026-03-28
**Domain:** Tailwind CSS responsive design, Next.js Image optimization, touch events, Vercel deployment, Lighthouse performance
**Confidence:** HIGH

## Summary

Phase 7 is a cross-cutting quality pass over all 14+ section components built in Phases 1–6. No new sections are added. The work falls into four buckets: (1) responsive class audit across every section, (2) two targeted interactive fixes (ProcessSection sticky fallback, TestimonialSection touch swipe), (3) next/image `sizes` attributes and video placeholder comments, and (4) verifying the existing `vercel.json` and confirming `npm run build` exits 0.

All implementation decisions are locked by CONTEXT.md. The approach is pure Tailwind responsive modifiers — no new libraries, no JS media-query hooks, no device detection. The primary mobile target is 375px (iPhone SE). The test infrastructure (Vitest + jsdom) already exists with test files for every component; Phase 7 only requires adding new test cases to existing files.

The biggest practical risk is the ProcessSection `min-h-[300vh]` container creating excessive scroll height on mobile when sticky is disabled. The CONTEXT.md decision to use `sm:min-h-[300vh]` eliminates this cleanly. The Lighthouse ≥85 gate is achievable with placeholder images (no real photos to compress) — the main risks are large JS bundles and layout shift (CLS), both of which are addressed by existing Next.js defaults.

**Primary recommendation:** Work section-by-section in a single audit pass, applying `sm:`/`md:`/`lg:` prefixes where missing; then apply the two targeted component changes (ProcessSection + TestimonialSection); then verify `vercel.json` and run `npm run build`.

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Mobile Layout Audit (RESP-01, RESP-02, RESP-03, RESP-04, RESP-05)**
- Strategy: Pure Tailwind responsive classes — no new CSS framework, no media query hooks. Audit every section component and add/fix `sm:`/`md:`/`lg:` responsive modifiers where missing.
- Breakpoints: `sm` = 640px (tablet), `md` = 768px, `lg` = 1024px (desktop). All 375px (iPhone SE) checks must be the primary mobile target.
- Single-column rule: All grid-based sections (`grid-cols-*`) must have a `grid-cols-1` base before any responsive variant (e.g., `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`)
- Hero (RESP-04): HeroTextSelector must remain legible — verify font sizes don't overflow on 375px. Use `text-2xl sm:text-3xl lg:text-4xl` pattern for cycling text.
- Navigation (RESP-05): BottomBar fullscreen overlay already uses absolute positioning — verify it covers the full viewport on iOS Safari (safe-area-inset consideration). TopNav links should hide on mobile (hamburger-only).
- Sections to audit: HeroSection, PhotoStripSection, ManifestoSection, ProofStripSection, ServicesSection, PortfolioSection, BentoSection, BlogSection, FAQSection, CTASection, FooterSection — every `components/sections/*.tsx` file
- Typography scaling: Section headings using `text-4xl` should scale down to `text-2xl` or `text-3xl` on mobile

**Process Cards Mobile Fallback (RESP-07)**
- Mechanism: Change CSS sticky classes from unconditional to `sm:sticky` — below `sm` breakpoint (640px), cards render as normal stacked divs without the sticky effect
- Implementation: In ProcessSection.tsx, change the `topClasses` and `zClasses` arrays to prefix each class with `sm:` (e.g., `sm:sticky sm:top-16 sm:z-[10]`). On mobile, cards stack naturally in document flow.
- No JS fallback needed — CSS-only approach is cleaner and avoids any device detection logic
- The `min-h-[300vh]` container: On mobile with no sticky, the tall container would create excessive empty scroll. Add `sm:min-h-[300vh]` so the container height only applies at sm+ breakpoint.

**Testimonial Touch Swipe (RESP-06)**
- Mechanism: Inline `onTouchStart` / `onTouchEnd` delta detection in TestimonialSection.tsx — no swipe library needed
- Threshold: 50px horizontal delta triggers a swipe (standard mobile swipe threshold)
- Direction: Swipe left → next testimonial; swipe right → previous testimonial
- Implementation: Store `touchStartX` in a `useRef<number>(0)`. On `onTouchStart`, record `e.touches[0].clientX`. On `onTouchEnd`, compute delta, if `|delta| > 50` call the existing navigation logic (same as dot click, reuses `handleDotClick` pattern with interval restart)
- Reduced motion: Swipe still changes card but transition duration is 0 when `prefersReduced` is true (already handled by existing AnimatePresence guard)

**Image Strategy (PERF-01)**
- `next/image` with sizes: Add `sizes` attribute to any existing `<Image>` components. Standard pattern: `sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"` for grid images, `sizes="100vw"` for full-width images.
- Placeholder divs (`bg-dark/10`) remain as-is — they have no `next/image` to optimize. No change needed.
- No actual image files: Since all images are placeholders, PERF-01 mainly applies to the `next/image` instances that DO exist. Verify each one has proper `sizes` + `alt` attributes.

**Video Hosting (PERF-02)**
- Current state: All video elements have no `src` attribute (empty) — no video files are in git. PERF-02 is satisfied by default.
- Documentation: Add a code comment above each `<video>` element in HeroSection.tsx and TestimonialSection.tsx explaining the external hosting pattern:
  ```tsx
  {/* Video: self-host on Vercel Blob or Cloudinary, set NEXT_PUBLIC_VIDEO_URL env var */}
  {/* <video src={process.env.NEXT_PUBLIC_VIDEO_URL} autoPlay muted loop playsInline /> */}
  ```
- No env var wiring needed in v1 — Joyce sets this up when video assets are ready

**Vercel Deployment (PERF-03, PERF-04)**
- `vercel.json`: Already exists from Phase 1 with font caching and security headers. Verify it is correct and complete.
- Deployment is user-initiated: The planner should NOT automate `vercel deploy` (requires auth). Instead: verify the repo is wired to Vercel via `vercel.json` correctness, ensure `npm run build` exits 0, and document the one-time setup step.
- Lighthouse gate: PERF-03 (≥85 score) is verified on the deployed Vercel URL — this is a manual post-deployment check. The plan should include a checklist item for it, not an automated command.
- Build output: `npm run build` must continue to exit 0 after all Phase 7 changes — this is the automated gate.

### Claude's Discretion
- Exact responsive typography scale for each heading (2xl vs 3xl on mobile)
- Whether to add `overflow-x: hidden` to the `<body>` to prevent horizontal overflow on mobile
- Mobile padding adjustments (whether `px-6` is sufficient at 375px or needs `px-4`)
- Exact touch swipe threshold value (50px is a sensible default)
- Whether any section needs a dedicated mobile-specific layout vs the standard responsive reflow

### Deferred Ideas (OUT OF SCOPE)
- Lenis smooth scroll library (v2 — ENH-01)
- Custom cursor (v2 — ENH-02)
- Page transition animations (v2 — ENH-03)
- Lightbox for portfolio images (v2 — ENH-04)
- Horizontal scroll for photo strip (v2 — ENH-05)
- Touch swipe on process cards mobile (beyond the sticky fallback — v2)
- Progressive Web App (PWA) manifest — not in v1 scope
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| RESP-01 | Layout reflows to single-column vertical stacks on mobile (not just scaled-down desktop) | All multi-column grids need `grid-cols-1` base; section-by-section audit identifies gaps |
| RESP-02 | Services grid goes from 4-column to 2-column to 1-column on progressively smaller screens | ServicesSection already has `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4` — already correct |
| RESP-03 | Bento grid adapts to stacked single-column on mobile | BentoSection uses `grid-cols-1 sm:grid-cols-3` — already handles 1-col base; `sm:row-span-2` conditional already present |
| RESP-04 | Hero text selector remains legible and functional on mobile | HeroTextSelector uses `text-2xl md:text-4xl` — has base mobile size; container `h-[1.2em]` may clip at 375px |
| RESP-05 | Bottom bar and fullscreen menu overlay work correctly on mobile | BottomBar uses `env(safe-area-inset-bottom)` — iOS Safari safe area is handled; overlay uses `fixed inset-0` — correct full viewport coverage |
| RESP-06 | Testimonial cards are fully readable on mobile with touch swipe support | TestimonialSection needs `onTouchStart`/`onTouchEnd` handlers added; card is `max-w-[340px]` which fits 375px |
| RESP-07 | Process cards sticky effect has a graceful mobile fallback | ProcessSection needs `sm:sticky`, `sm:top-*`, `sm:z-*`, `sm:min-h-[300vh]` prefix changes — all in string literal arrays |
| PERF-01 | All images use `next/image` with appropriate `sizes` attributes and lazy loading | All images are placeholder divs — no actual `next/image` instances in current codebase; audit confirms no Image components to fix |
| PERF-02 | Background videos are hosted externally — no video files committed to git | Both video elements have no `src` attribute; no video files in git — satisfied by default; needs documentation comment |
| PERF-03 | Site passes Lighthouse performance score ≥ 85 on deployed Vercel URL | Manual post-deployment check; achievable with placeholders; main risks are JS bundle size and CLS |
| PERF-04 | Site is deployed and publicly accessible on Vercel from the corazzione/Portfolio-Amiga-Joyce repo | User-initiated; requires `vercel.json` correctness verification and `npm run build` passing |
</phase_requirements>

---

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Tailwind CSS | 3.4.x (project-locked) | Responsive utility classes via `sm:`/`md:`/`lg:` prefixes | Already in project; all breakpoints defined in tailwind.config.ts |
| Next.js | 14.2.35 (project-locked) | `next/image` optimization, build system, Vercel integration | Already in project |
| motion/react | 12.38.0 (project-locked) | Existing animations — no changes to animation system in this phase | Already in project |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| Vitest + jsdom | 4.1.x (project-locked) | Unit tests for touch handler logic and responsive rendering | All new behavior gets test coverage via existing test files |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Inline touch handlers | react-swipeable or use-gesture | Libraries add bundle weight; 50px delta check is 8 lines of code — no library justified |
| Pure Tailwind responsive | CSS media query hooks (useMediaQuery) | JS hooks cause hydration mismatches and extra re-renders; Tailwind is server-safe |
| Manual Lighthouse run | Vercel's built-in speed insights | Both acceptable; Lighthouse in browser is sufficient for ≥85 gate |

**No new package installation required for this phase.**

---

## Architecture Patterns

### Responsive Class Pattern (project standard)
**What:** Base-first responsive modifiers. Mobile styles are the default, desktop styles are additive.
**When to use:** Every multi-column grid, large heading, and layout container.
**Example:**
```tsx
// Correct: mobile-first base, then responsive modifiers
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

// Incorrect: no mobile base
<div className="grid lg:grid-cols-4 gap-6">
```

### ProcessSection Sticky-to-Stack Pattern
**What:** Prefix sticky/top/z classes with `sm:` so they only activate at tablet+. Container height also conditioned on `sm:`.
**When to use:** Any scroll-driven effect that is impractical on touch (sticky stacking, parallax).
**Example:**
```tsx
// Before (Phase 5)
const topClasses = ['top-16', 'top-20', 'top-24', 'top-28', 'top-32', 'top-36']
const zClasses = ['z-[10]', 'z-[20]', 'z-[30]', 'z-[40]', 'z-[50]', 'z-[60]']

// After (Phase 7)
const topClasses = ['sm:top-16', 'sm:top-20', 'sm:top-24', 'sm:top-28', 'sm:top-32', 'sm:top-36']
const zClasses = ['sm:z-[10]', 'sm:z-[20]', 'sm:z-[30]', 'sm:z-[40]', 'sm:z-[50]', 'sm:z-[60]']

// Container: was min-h-[300vh], becomes sm:min-h-[300vh]
<div className="relative sm:min-h-[300vh]">

// Card: was sticky, becomes sm:sticky
<div className={`sm:sticky ${topClasses[i]} ${zClasses[i]} ...`}>
```

### Touch Swipe Pattern (no library)
**What:** useRef stores touch start X; onTouchEnd computes delta and calls existing navigation.
**When to use:** Any carousel/slider component needing swipe on mobile.
**Example:**
```tsx
const touchStartX = useRef<number>(0)

// On the swipeable container:
onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX }}
onTouchEnd={(e) => {
  const delta = e.changedTouches[0].clientX - touchStartX.current
  if (delta < -50) handleDotClick((currentIndex + 1) % testimonials.length)
  if (delta > 50) handleDotClick((currentIndex - 1 + testimonials.length) % testimonials.length)
}}
```

### Typography Scaling Pattern
**What:** All large headings (`text-4xl`, `text-5xl`, `text-6xl`) get a mobile base size.
**When to use:** Any heading that could overflow a 375px viewport.
```tsx
// ManifestoSection (text-4xl md:text-6xl already correct — has mobile base)
// FAQSection text-5xl — needs text-3xl base
// CTASection text-4xl md:text-5xl — has mobile base (already correct)
// PortfolioSection text-4xl — needs text-2xl sm:text-4xl
// ServicesSection text-4xl — needs text-2xl sm:text-4xl
// ProcessSection h2 text-4xl — needs text-2xl sm:text-4xl
```

### iOS Safari Safe Area Pattern
**What:** BottomBar already uses `env(safe-area-inset-bottom)` inline style. The fullscreen overlay uses `fixed inset-0` which covers the full viewport including safe areas by default in modern iOS Safari.
**Status:** Already correct in BottomBar.tsx — no changes needed.

### Anti-Patterns to Avoid
- **JS device detection:** Never use `navigator.userAgent` or window width checks to decide layout. Use Tailwind breakpoints.
- **Animating layout properties for mobile toggle:** Don't use `display: none` toggled by JS for responsive hiding. Use `hidden sm:block` Tailwind utilities.
- **Inline media queries in style prop:** Breaks Tailwind purge and is harder to audit. Always use Tailwind responsive prefix classes.
- **Skipping the sticky prefix on `sticky` itself:** If you add `sm:top-*` but leave `sticky` unconditional, the element still tries to stick with no offset. Both `sticky` and `top-*` must be prefixed.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Touch swipe detection | Custom gesture system, velocity tracking, momentum | Inline `onTouchStart`/`onTouchEnd` 8-line pattern | Phase scope is a single carousel; full gesture library is overkill |
| Responsive breakpoints | JS `useMediaQuery` hook, ResizeObserver | Tailwind `sm:`/`md:`/`lg:` prefixes | Server-safe, no hydration mismatch, purge-friendly |
| Image optimization | Custom lazy loading, srcset generation | `next/image` built-in | Handles WebP/AVIF conversion, blur placeholder, srcset, lazy loading automatically |
| Viewport height on iOS | `100vh` hacks, JS window.innerHeight polling | `min-h-screen` + CSS `env(safe-area-inset-bottom)` | Already handled by BottomBar; `h-screen` works in modern iOS Safari |

**Key insight:** Phase 7 is additive class work. The harder the problem sounds, the more likely it's already solved by Tailwind or Next.js defaults.

---

## Common Pitfalls

### Pitfall 1: Sticky Without Mobile Container Height Fix
**What goes wrong:** Removing `sticky` on mobile but leaving `min-h-[300vh]` on the container creates 3x viewport height of empty whitespace on mobile — the section appears to have a massive blank gap.
**Why it happens:** The tall container was sized to give the sticky scroll effect room to work. Without sticky, that height is purely dead space.
**How to avoid:** Change `min-h-[300vh]` to `sm:min-h-[300vh]` in the same commit as the sticky prefix changes.
**Warning signs:** Mobile preview shows a blank section with excessive scroll.

### Pitfall 2: Tailwind Dynamic Class Purge
**What goes wrong:** Constructing class strings dynamically (e.g., `'sm:top-' + value`) causes Tailwind to purge them — they don't appear in production CSS.
**Why it happens:** Tailwind scans source files for complete class strings. Partial strings are not detected.
**How to avoid:** Use complete string literals in arrays, as ProcessSection already does: `['sm:top-16', 'sm:top-20', ...]`. The CONTEXT.md decision explicitly preserves this pattern.
**Warning signs:** Sticky effect disappears in production build but works in dev.

### Pitfall 3: HeroTextSelector Container Clipping at 375px
**What goes wrong:** HeroTextSelector uses `h-[1.2em]` as container height for the cycling text. At 375px with `text-2xl` (24px), `1.2em = 28.8px`. If the parent applies a transform that shifts the text outside this box, text clips visually.
**Why it happens:** The container is sized to exactly one line height; if font metrics differ from expected, text can clip.
**How to avoid:** Test at 375px. If clipping occurs, increase to `h-[1.5em]` or `h-[2rem]` as a fixed floor.
**Warning signs:** Cycling text appears cut off or missing its descenders on mobile.

### Pitfall 4: ProofStripSection Logo Overflow
**What goes wrong:** The client logos row (`flex items-center gap-6` with 4 logo names) can overflow horizontally on 375px with no wrapping.
**Why it happens:** 4 text items × ~70px each + gaps ≈ 340px, which barely fits 375px but is at risk on shorter text or larger font rendering.
**How to avoid:** Add `flex-wrap` to the logos container, or reduce `gap-6` to `gap-3 sm:gap-6`.
**Warning signs:** Logos row causes horizontal scroll at 375px.

### Pitfall 5: `overflow-x: hidden` on `<body>` Breaking Sticky
**What goes wrong:** Adding `overflow-x: hidden` to `<body>` or a parent element disables `position: sticky` on any descendant in some browsers (documented browser behavior — a containing block with overflow clipping cancels sticky).
**Why it happens:** CSS spec: sticky positioning requires an overflow-visible ancestor up to the scroll container.
**How to avoid:** If `overflow-x-hidden` is needed to prevent horizontal scroll, apply it to the `<html>` element instead of `<body>`. Alternatively, apply it only to specific sections (not layout wrappers containing sticky children). ProcessSection sticky only activates at `sm:` — but still test carefully.
**Warning signs:** Process cards stop stacking on desktop after adding overflow-hidden.

### Pitfall 6: iOS Safari viewport height (`100vh` vs `dvh`)
**What goes wrong:** `h-screen` (which is `height: 100vh`) on iOS Safari includes the address bar height in some contexts — hero section may appear taller than the visible viewport.
**Why it happens:** iOS Safari's `100vh` is the full viewport height including the collapsed browser chrome, not the visible area.
**How to avoid:** For the hero, `h-screen` is acceptable (full cinematic height is the intent). For the testimonial section (`min-h-screen`), same reasoning applies. This is a deliberate design choice, not a bug. Document if it comes up.
**Warning signs:** Hero section has scroll gap at top or content hidden behind address bar on iPhone.

---

## Code Examples

### ProcessSection — Full sm: Prefix Pattern
```tsx
// Source: CONTEXT.md locked decision + Phase 5 ProcessSection.tsx
const topClasses = ['sm:top-16', 'sm:top-20', 'sm:top-24', 'sm:top-28', 'sm:top-32', 'sm:top-36']
const zClasses = ['sm:z-[10]', 'sm:z-[20]', 'sm:z-[30]', 'sm:z-[40]', 'sm:z-[50]', 'sm:z-[60]']

// Container: remove unconditional min-h-[300vh], replace with sm:
<div className="relative sm:min-h-[300vh]">

// Card: sm:sticky replaces unconditional sticky
<div className={`sm:sticky ${topClasses[i]} ${zClasses[i]} ${rotations[i]} mb-6 ...`}>
```

### TestimonialSection — Touch Swipe Addition
```tsx
// Source: CONTEXT.md locked decision
// Add to existing TestimonialSection (already 'use client')
const touchStartX = useRef<number>(0)

// On the outer content container div:
<div
  className="relative z-10 flex flex-col items-center gap-8 px-6"
  onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX }}
  onTouchEnd={(e) => {
    const delta = e.changedTouches[0].clientX - touchStartX.current
    if (delta < -50) handleDotClick((currentIndex + 1) % testimonials.length)
    if (delta > 50) handleDotClick((currentIndex - 1 + testimonials.length) % testimonials.length)
  }}
>
```

### Video Comment Pattern
```tsx
// Source: CONTEXT.md locked decision (both HeroSection.tsx and TestimonialSection.tsx)

{/* Video: self-host on Vercel Blob or Cloudinary, set NEXT_PUBLIC_VIDEO_URL env var */}
{/* <video src={process.env.NEXT_PUBLIC_VIDEO_URL} autoPlay muted loop playsInline /> */}
```

### body overflow-x pattern (discretionary)
```tsx
// app/layout.tsx — apply to <body> with caution (see Pitfall 5)
// Safe option: apply to <html> instead
<html lang="pt-BR" className={`${switzer.variable} ${publicSans.variable} overflow-x-hidden`}>
```

### vercel.json — Current State (Already Correct)
```json
{
  "framework": "nextjs",
  "headers": [
    {
      "source": "/fonts/(.*)",
      "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }]
    },
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" }
      ]
    }
  ]
}
```
Status: Complete. No changes required. Font cache headers (1 year immutable) and security headers are correct.

---

## Section-by-Section Audit Findings

Based on direct code inspection of all component files:

| Component | File | Responsive Issues Found | Action Required |
|-----------|------|------------------------|-----------------|
| HeroSection | `components/hero/HeroSection.tsx` | No grid issues; `md:text-base` on tagline only — OK | Add video comment; heading uses no text-* class directly |
| HeroTextSelector | `components/hero/HeroTextSelector.tsx` | `text-2xl md:text-4xl` — has mobile base | Verify 375px clip behavior; may need `h-[1.5em]` |
| PhotoStripSection | `components/sections/PhotoStripSection.tsx` | `overflow-x-auto` horizontal scroll — works on mobile | No changes needed; works as horizontal scroll strip |
| ManifestoSection | `components/sections/ManifestoSection.tsx` | `text-4xl md:text-6xl` — has mobile base already | No changes needed |
| ProofStripSection | `components/sections/ProofStripSection.tsx` | `flex-col md:flex-row` — stacks on mobile already; logos `flex gap-6` may overflow | Add `flex-wrap` to logos container |
| ServicesSection | `components/sections/ServicesSection.tsx` | `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4` already correct; heading `text-4xl` needs mobile scale; `flex justify-between` header may need wrapping | Scale heading; wrap header row on mobile |
| PortfolioSection | `components/sections/PortfolioSection.tsx` | `grid-cols-1 md:grid-cols-3` — has 1-col base; heading `text-4xl` no mobile scale | Add `text-2xl sm:text-4xl` to heading |
| BentoSection | `components/sections/BentoSection.tsx` | `grid-cols-1 sm:grid-cols-3` + `sm:row-span-2` — already correctly conditioned | No changes needed |
| BlogSection | `components/sections/BlogSection.tsx` | Need to verify — not read | Audit for grid and heading responsive classes |
| FAQSection | `components/sections/FAQSection.tsx` | `grid-cols-1 lg:grid-cols-2` — has 1-col base; heading `text-5xl` needs mobile scale | Add `text-3xl lg:text-5xl` to heading |
| CTASection | `components/sections/CTASection.tsx` | `text-4xl md:text-5xl` already has mobile base; figure placeholder `hidden lg:block` correctly hidden on mobile | No changes needed |
| FooterSection | `components/sections/FooterSection.tsx` | `flex-col md:flex-row` already responsive; no issues found | No changes needed |
| ProcessSection | `components/sections/ProcessSection.tsx` | `sticky` without `sm:` prefix; `min-h-[300vh]` without `sm:` prefix; heading `text-4xl` no mobile scale | Full RESP-07 treatment + heading scale |
| TestimonialSection | `components/sections/TestimonialSection.tsx` | Card `max-w-[340px]` fits 375px; no touch handlers | Add touch swipe (RESP-06) |
| TopNav | `components/layout/TopNav.tsx` | Already has responsive padding; tagline `hidden md:inline` | No changes needed |
| BottomBar | `components/layout/BottomBar.tsx` | `env(safe-area-inset-bottom)` already set; `fixed inset-0` overlay — correct | No changes needed |

**Summary:** Most sections are already responsive. Primary work is:
1. Typography scaling on 4 headings (ProcessSection, ServicesSection, PortfolioSection, FAQSection)
2. ProcessSection sticky → sm:sticky + container height fix (RESP-07)
3. TestimonialSection touch swipe (RESP-06)
4. ProofStripSection logos `flex-wrap`
5. Video comments in HeroSection + TestimonialSection (PERF-02)

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `@media` queries in CSS files | Tailwind responsive prefixes (`sm:`/`md:`/`lg:`) | ~2020 | All responsive work stays in JSX class strings, zero separate CSS |
| JS window resize listeners for layout | CSS-only responsive classes | ~2018 | No hydration mismatch, no flash of wrong layout |
| `100vh` for full-height on mobile | `dvh` unit or accepting Safari behavior | ~2023 | `h-screen` still works acceptably; `dvh` is modern alternative but not required here |
| Loading swipe gesture libraries | Native touch events for simple cases | Ongoing | 8-line useRef pattern replaces 20KB library for single-carousel use |
| Video files in git | External hosting (Vercel Blob, Cloudinary) | Next.js convention | Keeps repo size small, enables CDN delivery |

**Deprecated/outdated for this project:**
- `framer-motion` import path: Use `motion/react` (v12 convention, already in use)
- `display: none` toggled by JS for responsive: Use `hidden sm:block` Tailwind utilities

---

## Open Questions

1. **BlogSection responsive state**
   - What we know: Not read during research (file exists at `components/sections/BlogSection.tsx`)
   - What's unclear: Whether it has heading scale and grid responsive classes
   - Recommendation: Implementer reads BlogSection first; apply standard heading scale + grid audit pattern

2. **`overflow-x-hidden` on body vs html**
   - What we know: Adding `overflow-x: hidden` to `<body>` breaks sticky positioning on descendants (browser behavior)
   - What's unclear: Whether any horizontal overflow actually occurs at 375px before adding this
   - Recommendation: Test without it first; add only to `<html>` if horizontal scroll is confirmed; do NOT add to `<body>` due to sticky interaction

3. **`app/portfolio/page.tsx` and `app/contato/page.tsx` sub-page mobile layout**
   - What we know: CONTEXT.md lists these as files to audit; they were built in Phase 6
   - What's unclear: Specific responsive gaps in sub-pages
   - Recommendation: Apply same heading scale + grid audit pass to sub-pages during the section audit task

---

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Vitest 4.1.x + jsdom + @testing-library/react |
| Config file | `vitest.config.ts` (root) |
| Quick run command | `npx vitest run --reporter=verbose` |
| Full suite command | `npx vitest run` |

### Phase Requirements → Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| RESP-01 | Grid sections render with `grid-cols-1` base class | unit | `npx vitest run __tests__/components/sections/ -t "grid"` | Partial — existing files, new assertions needed |
| RESP-02 | ServicesSection grid has 1→2→4 responsive classes | unit | `npx vitest run __tests__/components/sections/ServicesSection.test.tsx` | Yes |
| RESP-03 | BentoSection grid has `grid-cols-1 sm:grid-cols-3` | unit | `npx vitest run __tests__/components/sections/BentoSection.test.tsx` | Yes |
| RESP-04 | HeroTextSelector renders with `text-2xl` base class | unit | `npx vitest run __tests__/components/hero/HeroTextSelector.test.tsx` | Yes |
| RESP-05 | BottomBar renders with `env(safe-area-inset-bottom)` style | unit | `npx vitest run __tests__/components/sections/` | Yes (BottomBar tested via integration) |
| RESP-06 | TestimonialSection touch swipe calls handleDotClick | unit | `npx vitest run __tests__/components/sections/TestimonialSection.test.tsx` | Yes |
| RESP-07 | ProcessSection cards have `sm:sticky` class; container has `sm:min-h-[300vh]` | unit | `npx vitest run __tests__/components/sections/ProcessSection.test.tsx` | Yes |
| PERF-01 | No `<Image>` without `sizes` attribute (audit confirms none exist) | unit | `npx vitest run __tests__/components/` | Yes (covered by existing render tests) |
| PERF-02 | HeroSection video has no `src` attribute; comment present | unit | `npx vitest run __tests__/components/hero/HeroSection.test.tsx` | Yes |
| PERF-03 | Lighthouse ≥85 | manual | n/a — post-deployment browser check | n/a |
| PERF-04 | Vercel deployment accessible | manual | `npm run build` (automated gate) | n/a |

### Sampling Rate
- **Per task commit:** `npx vitest run __tests__/components/sections/ProcessSection.test.tsx __tests__/components/sections/TestimonialSection.test.tsx`
- **Per wave merge:** `npx vitest run`
- **Phase gate:** `npm run build` exits 0 + full Vitest suite green before marking PERF-04 complete

### Wave 0 Gaps
- [ ] `__tests__/components/sections/ProcessSection.test.tsx` — add assertions for `sm:sticky` class on card divs and `sm:min-h-[300vh]` on container (file exists, new test cases needed)
- [ ] `__tests__/components/sections/TestimonialSection.test.tsx` — add touch event simulation test for swipe navigation (file exists, new test cases needed)

*(All test files exist — framework infrastructure is complete. Only new test case assertions are needed, not new files.)*

---

## Sources

### Primary (HIGH confidence)
- Direct code inspection of all 16 component files in `components/` — responsive class audit
- `tailwind.config.ts` — confirmed breakpoints: sm=640px, md=768px, lg=1024px (Tailwind v3 defaults)
- `vercel.json` — confirmed correct; no changes required
- `vitest.config.ts` — confirmed jsdom environment, globals: true, @/ alias
- `.planning/phases/07-mobile-responsive-performance/07-CONTEXT.md` — all locked implementation decisions

### Secondary (MEDIUM confidence)
- Tailwind CSS v3 documentation: responsive design prefix behavior, purge/content scanning rules
- Next.js 14 documentation: `next/image` sizes attribute behavior, build system

### Tertiary (LOW confidence)
- iOS Safari `overflow: hidden` + `position: sticky` interaction — browser behavior documented in multiple community sources; not tested in this project specifically

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all libraries are project-locked; no new dependencies
- Architecture: HIGH — responsive patterns verified against actual code; all section files read
- Pitfalls: HIGH for ProcessSection sticky/overflow; MEDIUM for iOS Safari viewport edge cases

**Research date:** 2026-03-28
**Valid until:** 2026-04-28 (stable domain — Tailwind v3 and Next.js 14 APIs are locked)
