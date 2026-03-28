# Phase 5: Complex Interactive Sections - Research

**Researched:** 2026-03-28
**Domain:** CSS sticky stacking, CSS Grid bento layout, AnimatePresence carousel, Motion v12
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Sticky Process Cards (COMP-01, COMP-02)**
- Stacking mechanism: CSS `position: sticky` on each card with incrementing `top` values (`top-24`, `top-32`, `top-40`...) — pure CSS, no scroll-driven JS. Cards stay "stuck" as subsequent cards scroll over them creating the stacking visual.
- Paper-like rotation: Static subtle rotation per card via `rotate-[Ndeg]` Tailwind utility: alternating +1, -0.5, +0.5, -1, +0.5, -0.5 degrees — not scroll-animated, just visual variety
- Section structure: Tall scroll container (`min-h-[300vh]`) with `sticky` child cards — gives enough scroll travel for all 6 to stack
- Card content per COMP-02: Step number (top right, gold), step name (Switzer bold), circular image placeholder (`rounded-full aspect-square bg-dark/10 w-24`), description (font-sans)
- Data source: `processSteps` array from `lib/data.ts` (6 items: Descoberta, Planejamento, Captação, Edição, Entrega, Otimização)
- Component: `ProcessSection.tsx` — prefer Server Component + pure CSS sticky — no motion/react needed here
- CRITICAL pitfall: `useScroll` production offset bug requires `layoutEffect: false` — avoid `useScroll` entirely; pure CSS sticky is the safe path

**Bento Trust Grid (COMP-03)**
- Layout: CSS Grid `grid-cols-3 grid-rows-[auto]` with explicit `col-span`/`row-span` per cell — pure Server Component
- Cell structure: Left tall photo card (`col-span-1 row-span-2`) with "Visão Personalizada" dark overlay text; Center beige content card with "Atenção aos Detalhes" heading + skill checklist; Right column 4 sub-cards (equipment, quality polaroids, collaborations with avatar stacks + stats, dark "Abordagem Narrativa" card)
- Images: Placeholder divs — `bg-dark/10 w-full aspect-[3/4]` for tall card, smaller aspect for others
- Component: `BentoSection.tsx` — pure Server Component, no `'use client'`
- Responsive: On mobile collapses to single column (`grid-cols-1` at sm)

**Testimonial Carousel (COMP-04, COMP-05, COMP-06)**
- Component: `TestimonialSection.tsx` — `'use client'` required (useState + useEffect)
- State: `useState<number>` for `currentIndex` (0, 1, 2)
- Auto-advance: `useEffect` with `setInterval(5000)` — clears on unmount and on manual navigation
- Card transitions: `AnimatePresence mode="wait"` with `key={currentIndex}` — same pattern as HeroTextSelector. Enter: `opacity: 0, y: 20` → `opacity: 1, y: 0`. Exit: `opacity: 0, y: -20`. Duration 0.4s, ease `[0.22, 1, 0.36, 1]`
- Background: Dark section `bg-dark` — video element same pattern as HeroSection: `<video autoPlay muted loop playsInline src="">` with `bg-dark` gradient fallback when src empty
- Card design: White floating card `bg-white rounded-2xl p-8 shadow-2xl` — name, role, quote, 5-star rating dots
- Data: `testimonials` array from `lib/data.ts` (Danny Rose, David Nguyen, Alisha Moore)
- Dot navigation: 3 dots, clicking a dot sets `currentIndex`, clears + restarts interval. Active dot: `bg-gold`, inactive: `bg-white/40`

**Integration into page.tsx**
- Replace `<section id="process" aria-hidden="true" />` with `<ProcessSection />`
- Replace `<section id="testimonials" aria-hidden="true" />` with `<TestimonialSection />`
- Insert `<BentoSection />` between ServicesSection and PortfolioSection
- `app/page.tsx` remains a Server Component — only imported components have `'use client'`

### Claude's Discretion
- Exact sticky card `top` offsets and z-index values
- Whether bento grid sub-cards have hover effects (keep subtle if any)
- Exact skill checklist items for the bento center card
- Desktop vs mobile bento grid column count transition breakpoint
- Whether process card circular images use `next/image` or simple placeholder divs

### Deferred Ideas (OUT OF SCOPE)
- Touch swipe for testimonial carousel (Phase 7 — RESP-06)
- Process cards sticky effect graceful mobile fallback (Phase 7 — RESP-07)
- Parallax on bento images (v2)
- Video assets for testimonial background (content task — Joyce provides)
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| COMP-01 | "Um Caminho Claro para Visuais Excepcionais" — 6 process steps as sticky stacked cards with paper-like slight rotation; cards stack as user scrolls through the section | CSS `position: sticky` with incrementing top values; tall scroll container pattern documented below |
| COMP-02 | Each process card has: step number, step name, circular image, and description (Descoberta through Otimização) | `processSteps` array already in `lib/data.ts` with all 6 items; card structure documented below |
| COMP-03 | Asymmetric bento grid: tall photo card left (col-span-1 row-span-2), center beige card (checklist), right column (4 sub-cards) | CSS Grid `grid-template-columns: 1fr 1fr 1fr` with explicit span values; bento pattern documented below |
| COMP-04 | Dark cinematic testimonial section with looping background video and 3 floating white review cards | Video element pattern from HeroSection; dark full-bleed section pattern; `testimonials` array ready in `lib/data.ts` |
| COMP-05 | Testimonial cards auto-advance every 5 seconds with dot navigation for manual control | `setInterval` + `clearInterval` in `useEffect` — exact pattern from `HeroTextSelector.tsx`; dot nav pattern documented below |
| COMP-06 | Testimonial section transition uses AnimatePresence for smooth card enter/exit | `AnimatePresence mode="wait"` — exact pattern from `HeroTextSelector.tsx`; always-mounted parent pattern from `BottomBar.tsx` |
</phase_requirements>

---

## Summary

Phase 5 builds three sections of the highest implementation complexity in the portfolio: a sticky stacking process card deck, an asymmetric bento trust grid, and a cinematic testimonial carousel. All three are additive to `app/page.tsx` — they replace two existing placeholder anchors and insert a new section.

The critical architectural decision — already locked — is to implement the sticky process cards with pure CSS (`position: sticky` + incrementing `top` values) rather than any scroll-driven JS. This entirely sidesteps the `useScroll` production offset bug (Pitfall 7 from PITFALLS.md). ProcessSection and BentoSection are Server Components with zero client JS. TestimonialSection is the only `'use client'` component, and it follows the exact interval + AnimatePresence pattern already established in `HeroTextSelector.tsx`.

All data is already populated in `lib/data.ts`. All animation variants and motion primitives needed are already in the codebase. The test infrastructure (Vitest + jsdom + @testing-library/react) is fully in place and the established mock pattern for `motion/react` is consistent across 14 existing test files.

**Primary recommendation:** Copy the `HeroTextSelector.tsx` pattern for TestimonialSection verbatim; use pure CSS sticky for ProcessSection (no motion library involved); use CSS Grid with explicit span values for BentoSection.

---

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| motion/react | 12.38.0 (current) | AnimatePresence + motion.div in TestimonialSection | Already installed; project-wide convention |
| React (useState, useEffect, useReducedMotion) | 18.x (via Next.js 14) | State and lifecycle for carousel | Built-in; no new dependency |
| Tailwind CSS | 3.4.x | All layout, spacing, color tokens | Already configured with all custom tokens |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| next/image | 14.x | If process card images use Image component | Only if switching from placeholder divs to real images |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| CSS sticky (pure) | `useScroll` + `useTransform` | useScroll has production offset bug; pure CSS has no JS cost and no runtime risk |
| CSS Grid (pure) | Flexbox | Grid's `row-span` for the tall left bento cell is trivial; Flexbox requires wrapper nesting |
| setInterval in useEffect | Framer Motion `useMotionValue` timer | Interval is simpler, matches existing HeroTextSelector pattern, zero additional API surface |

**Installation:** No new packages needed — all dependencies already in the project.

---

## Architecture Patterns

### Recommended Component Structure
```
components/sections/
├── ProcessSection.tsx      # Server Component — pure CSS sticky, no 'use client'
├── BentoSection.tsx        # Server Component — CSS Grid, no 'use client'
└── TestimonialSection.tsx  # 'use client' — useState + useEffect + AnimatePresence
```

### Pattern 1: CSS Sticky Stacking Cards

**What:** Each card has `position: sticky` with an incrementing `top` value. The parent is a tall scroll container (`min-h-[300vh]`). As the user scrolls, each card sticks at its offset while the next card scrolls in on top. The stacking is purely visual — all 6 cards remain in the DOM at their sticky positions.

**When to use:** Any "cards dealt on a table" effect without JS scroll tracking. No motion library needed.

**Top offset progression (discretion: planner picks exact values):**
```tsx
// Suggested increments — enough gap to feel stacked but not too separated
const topClasses = [
  'top-16',  // card 1 — sticks lowest
  'top-20',  // card 2
  'top-24',  // card 3
  'top-28',  // card 4
  'top-32',  // card 5
  'top-36',  // card 6 — sticks highest
]

// z-index must increment with index so later cards appear on top
const zClasses = ['z-[10]', 'z-[20]', 'z-[30]', 'z-[40]', 'z-[50]', 'z-[60]']
```

**Full ProcessSection structure:**
```tsx
// Source: CSS position sticky MDN spec + project CONTEXT.md decision
// components/sections/ProcessSection.tsx — NO 'use client'
import { processSteps } from '@/lib/data'

const rotations = [
  'rotate-[1deg]', 'rotate-[-0.5deg]', 'rotate-[0.5deg]',
  'rotate-[-1deg]', 'rotate-[0.5deg]', 'rotate-[-0.5deg]',
]

export function ProcessSection() {
  return (
    <section className="relative bg-bg py-24">
      <div className="max-w-2xl mx-auto px-6">
        <h2 className="font-switzer font-bold text-4xl text-dark mb-12 text-center">
          Um Caminho Claro para Visuais Excepcionais
        </h2>
        {/* Tall scroll container — gives all 6 cards room to stack */}
        <div className="relative min-h-[300vh]">
          {processSteps.map((step, i) => (
            <div
              key={step.id}
              className={`sticky ${topClasses[i]} ${zClasses[i]} ${rotations[i]} bg-white rounded-2xl p-8 shadow-lg`}
            >
              {/* Step number — top right, gold */}
              <span className="absolute top-6 right-8 text-gold font-switzer font-bold text-xs tracking-widest">
                {String(step.id).padStart(2, '0')}
              </span>
              {/* Circular image placeholder */}
              <div className="w-24 aspect-square rounded-full bg-dark/10 mx-auto mb-6" />
              {/* Step name */}
              <h3 className="font-switzer font-bold text-xl text-dark text-center mb-3">
                {step.name}
              </h3>
              {/* Description */}
              <p className="font-sans text-sm text-dark/60 text-center leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

**Critical: No `'use client'` directive.** This is a Server Component. The rotation and top values MUST be written as complete Tailwind strings — not constructed dynamically — to survive Tailwind's production purge. Use lookup arrays with complete strings.

### Pattern 2: Bento CSS Grid

**What:** A 3-column grid where the left cell spans 2 rows, creating the asymmetric tall-photo / content layout.

```tsx
// Source: CSS Grid spec + index.html .bento inspection
// components/sections/BentoSection.tsx — NO 'use client'
export function BentoSection() {
  return (
    <section className="bg-bg py-24">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="font-switzer font-bold text-3xl text-dark mb-12">
          Construído na Confiança, Movido pela Qualidade
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 grid-rows-[auto_auto] gap-3">
          {/* Left: tall photo card — spans 2 rows */}
          <div className="relative sm:row-span-2 rounded-2xl overflow-hidden bg-dark min-h-[500px]">
            <div className="w-full h-full bg-dark/20" /> {/* image placeholder */}
            <span className="absolute bottom-7 left-7 font-switzer font-bold text-white text-xl">
              Visão Personalizada
            </span>
          </div>
          {/* Center: beige detail card */}
          <div className="relative rounded-2xl bg-[#E8E0D2] p-8">
            <h3 className="font-switzer font-bold text-xl text-dark mb-5">
              Atenção aos Detalhes
            </h3>
            <ul className="flex flex-wrap gap-x-6 gap-y-3">
              {['Tipografia', 'Cor', 'Composição', 'Iluminação', 'Edição', 'Enquadramento'].map(skill => (
                <li key={skill} className="flex items-center gap-2 text-sm font-sans text-dark">
                  <span className="text-gold">✓</span> {skill}
                </li>
              ))}
            </ul>
          </div>
          {/* Right top: equipment card */}
          <div className="rounded-2xl bg-[#C5CEC8] p-8 flex items-end">
            <h3 className="font-switzer font-bold text-dark text-lg">
              Equipamento Profissional
            </h3>
          </div>
          {/* Right bottom row — 2 cells that sit in col 2 row 2 and col 3 row 2 */}
          <div className="rounded-2xl bg-white p-8">
            <h3 className="font-switzer font-bold text-dark text-lg mb-4">
              Qualidade Consistente
            </h3>
            {/* polaroid placeholder stack */}
          </div>
          <div className="rounded-2xl bg-dark p-8">
            <h3 className="font-switzer font-bold text-white text-lg">
              Abordagem Narrativa
            </h3>
          </div>
          {/* Collaborations — spans under center in row 2 */}
          <div className="rounded-2xl bg-white p-8 sm:col-start-2">
            <h3 className="font-switzer font-bold text-dark text-lg mb-3">
              Colaborações
            </h3>
          </div>
        </div>
      </div>
    </section>
  )
}
```

Note: The exact bento grid cell placement may need planner refinement to match the index.html layout exactly (left col=span-2-rows, center row 1, right col row 1-2 with 4 sub-cards). The planner should inspect `index.html` lines 385–480 directly and map cells to `grid-column` / `grid-row` CSS or Tailwind `col-start-*` / `row-start-*` utilities.

### Pattern 3: AnimatePresence Carousel (TestimonialSection)

**What:** The established HeroTextSelector pattern — always-mounted parent containing AnimatePresence, `key` on the cycling value, `mode="wait"`, interval with cleanup.

```tsx
// Source: components/hero/HeroTextSelector.tsx — direct reuse
'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { testimonials } from '@/lib/data'

export function TestimonialSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    const id = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(id)
  }, [])

  function handleDotClick(index: number) {
    setCurrentIndex(index)
    // Note: interval restarts naturally on next useEffect re-run
    // or planner may choose to use a ref-based restart pattern
  }

  const t = testimonials[currentIndex]

  return (
    <section className="relative bg-dark min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video background — same pattern as HeroSection */}
      <video
        autoPlay
        muted
        loop
        playsInline
        src=""
        className="absolute inset-0 w-full h-full object-cover opacity-70"
      />
      <div className="absolute inset-0 bg-dark/30" />

      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Floating white card with AnimatePresence */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={prefersReduced ? { duration: 0 } : {
              duration: 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="bg-white rounded-2xl p-8 shadow-2xl w-[340px]"
          >
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-dark/10">
              <div className="flex gap-1">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <span key={i} className="text-gold text-sm">★</span>
                ))}
              </div>
              <span className="text-xs text-dark/40 font-sans font-semibold">
                {String(currentIndex + 1).padStart(2, '0')}/{testimonials.length}
              </span>
            </div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-dark/10 flex-shrink-0" />
              <div>
                <p className="font-switzer font-bold text-sm text-dark">{t.name}</p>
                <p className="font-sans text-xs text-dark/50">{t.role}</p>
              </div>
            </div>
            <blockquote className="font-switzer font-bold text-xl text-dark leading-snug">
              {t.quote}
            </blockquote>
          </motion.div>
        </AnimatePresence>

        {/* Dot navigation */}
        <div className="flex gap-3">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => handleDotClick(i)}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === currentIndex ? 'bg-gold' : 'bg-white/40'
              }`}
              aria-label={`Ir para depoimento ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
```

**AnimatePresence must live in the always-mounted parent** (established in BottomBar.tsx). The parent `<section>` is always mounted; only the `motion.div` with `key={currentIndex}` enters/exits. This is the same topology as HeroTextSelector.

### Anti-Patterns to Avoid

- **Dynamic Tailwind class construction:** `rotate-[${deg}deg]` — Tailwind purges this. Use a complete-string lookup array.
- **`useScroll` for process cards:** Documented production offset bug — pure CSS sticky avoids it entirely.
- **AnimatePresence in conditionally-mounted parent:** Must be in an always-rendered ancestor. See BottomBar.tsx for reference.
- **`setInterval` without cleanup:** Always `return () => clearInterval(id)` — established in HeroTextSelector.
- **`'use client'` on ProcessSection or BentoSection:** These are pure layout — no state, no effects, no browser APIs needed.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Card enter/exit animation | Custom CSS keyframes | `AnimatePresence mode="wait"` | Exit animations require React lifecycle hooks; CSS alone can't animate unmount |
| Sticky stacking effect | JS scroll listener + position calculations | CSS `position: sticky` + `top` increments | JS scroll is janky on mobile; CSS sticky is GPU-composited |
| Interval restart on dot click | Complex state machine | Clear + restart pattern with `useEffect` dependency or ref | Simple and already established in HeroTextSelector |
| Reduced motion support | Custom media query hook | `useReducedMotion()` from `motion/react` | Already used in RevealWrapper and HeroTextSelector |

**Key insight:** Every problem in this phase has an existing solution in the codebase. ProcessSection is ~40 lines. BentoSection is layout HTML. TestimonialSection is HeroTextSelector with more card content.

---

## Common Pitfalls

### Pitfall 1: Tailwind Dynamic Rotation Classes Purged in Production

**What goes wrong:** Process cards render with no rotation in production build even though they look correct in dev.

**Why it happens:** The rotation values are constructed dynamically (e.g., `` `rotate-[${deg}deg]` ``). Tailwind's JIT scanner only sees the template literal, not the evaluated string.

**How to avoid:** Define the rotation lookup array with complete Tailwind strings as string literals:
```ts
const rotations = [
  'rotate-[1deg]', 'rotate-[-0.5deg]', 'rotate-[0.5deg]',
  'rotate-[-1deg]', 'rotate-[0.5deg]', 'rotate-[-0.5deg]',
]
```
Same rule applies to `top-*` and `z-*` arrays for sticky offsets.

**Warning signs:** Styles present in dev but absent after `next build`.

### Pitfall 2: z-index Not Set — Cards Stack in DOM Order Only

**What goes wrong:** Later cards (higher DOM index) should visually appear on top of earlier ones. Without explicit `z-index`, stacking context is unpredictable with `position: sticky`.

**How to avoid:** Assign incrementing z-index classes to sticky cards: `z-[10]` through `z-[60]`. All values must be complete Tailwind strings in a lookup array.

### Pitfall 3: Testimonial Interval Not Restarting After Manual Navigation

**What goes wrong:** User clicks dot → card changes → but the old interval continues, so the next auto-advance fires at the wrong time relative to the manual click.

**How to avoid:** Two valid patterns:
1. Move `currentIndex` into a ref alongside a restart-key state: increment a `restartKey` on manual click and include it in the `useEffect` dependency array so the interval is cleared and reset.
2. Simpler: clear and restart the interval on every `currentIndex` change by including `currentIndex` in the `useEffect` dep array — but only if the interval is created inside the effect.

The HeroTextSelector uses option 2 implicitly (empty dep array, index updates don't reset interval). For testimonials, option 1 is more correct for UX. Planner decides.

### Pitfall 4: Bento Grid Row Span on Mobile

**What goes wrong:** `sm:row-span-2` on the left cell collapses incorrectly on mobile (1-column layout), creating a very tall empty space.

**How to avoid:** The `sm:` prefix means the row-span only applies at `sm` (640px) and above. On mobile (`grid-cols-1`), `row-span-2` has no visible effect because all items are in a single column — but the CSS declaration is still there. Verify this renders correctly at 375px width. The standard pattern is to only apply `row-span` classes at the breakpoint where multi-column layout kicks in: `sm:row-span-2`.

### Pitfall 5: Video src="" Blank Frame Flash

**What goes wrong:** An empty `src=""` attribute can cause a brief broken-image-icon frame or a network request to the current page URL on some browsers.

**How to avoid:** Omit the `src` attribute entirely when no video is available (not `src=""`). Use the same approach as HeroSection. The dark `bg-dark` background and gradient overlay already provide the visual fallback.

---

## Code Examples

Verified patterns from existing codebase:

### AnimatePresence mode="wait" — from HeroTextSelector.tsx
```tsx
// Source: components/hero/HeroTextSelector.tsx
<AnimatePresence mode="wait">
  <motion.span
    key={texts[index]}  // key MUST be the cycling value, not the index number
    initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    exit={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: -12 }}
    transition={prefersReduced ? { duration: 0 } : {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    }}
  >
    {texts[index]}
  </motion.span>
</AnimatePresence>
```

### setInterval with cleanup — from HeroTextSelector.tsx
```tsx
// Source: components/hero/HeroTextSelector.tsx
useEffect(() => {
  const interval = setInterval(() => {
    setIndex((prev) => (prev + 1) % texts.length)
  }, 3000)
  return () => clearInterval(interval)  // cleanup on unmount
}, [])
```

### AnimatePresence always-mounted parent — from BottomBar.tsx
```tsx
// Source: components/layout/BottomBar.tsx
// AnimatePresence is in the always-mounted root (BottomBar renders unconditionally)
// Only the child motion.div conditionally renders
<AnimatePresence>
  {isOpen && (
    <motion.div
      key="menu-overlay"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      // ...
    />
  )}
</AnimatePresence>
```

### Motion import — project convention
```tsx
// Source: all existing components
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
// NOT from 'framer-motion'
```

### CSS Grid with row-span (Tailwind)
```html
<!-- Source: index.html .bento layout -->
<!-- grid-template-columns: 1fr 1fr 1fr; gap: 12px -->
<!-- Left cell: grid-row: span 2; min-height: 500px -->
<div class="grid grid-cols-3 grid-rows-[auto_auto] gap-3">
  <div class="row-span-2 ...">tall left card</div>
  <div>center card</div>
  <div>right top card</div>
  <!-- row 2: center right and far right -->
  <div>collab card</div>
  <div>quality card</div>
  <div>story card</div>
</div>
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `framer-motion` import | `motion/react` import | Motion v11+ | All imports must use `motion/react`; `framer-motion` still works as alias but `motion/react` is the canonical API |
| `useScroll` + `useTransform` for sticky stacking | Pure CSS `position: sticky` | Project decision (Phase 5) | Avoids production offset bug entirely; zero JS cost |
| `AnimatePresence` for page-level transitions | `AnimatePresence` for in-page component transitions only | Next.js 14 App Router | Page-level AnimatePresence is broken; component-level (carousel, overlays) works perfectly |

---

## Open Questions

1. **Bento grid right-column structure — 4 sub-cards or 3?**
   - What we know: index.html shows: gear card (row 1 right), quality card (row 2 col 2), collabs card (row 2 col 3?), story card (dark, mentioned in CONTEXT.md). The exact grid-column placement is unclear from the CSS alone.
   - What's unclear: Whether collabs and quality/story are both in the right column, or whether collabs is in the center column row 2.
   - Recommendation: Planner should read `index.html` lines 385–530 and the HTML structure (not just the CSS) to determine exact cell placement. Use `grid-column-start` / `grid-row-start` Tailwind utilities for explicit placement if needed.

2. **Interval restart on dot click — UX behavior**
   - What we know: HeroTextSelector uses empty dep array (interval does not reset on index change). For testimonials, resetting is better UX (prevents immediate auto-advance after manual click).
   - Recommendation: Planner should implement restart-on-manual-click using `useCallback` + a restart counter state variable, or using `useRef` to hold the interval ID and clearing it in the dot click handler before starting a new one.

---

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Vitest 3.x + @testing-library/react |
| Config file | `vitest.config.ts` (root) |
| Setup file | `vitest.setup.ts` |
| Quick run command | `npx vitest run __tests__/components/sections/` |
| Full suite command | `npx vitest run` |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| COMP-01 | ProcessSection renders 6 sticky cards with rotation classes | unit | `npx vitest run __tests__/components/sections/ProcessSection.test.tsx` | ❌ Wave 0 |
| COMP-02 | Each card shows step number, name, circular image placeholder, description | unit | `npx vitest run __tests__/components/sections/ProcessSection.test.tsx` | ❌ Wave 0 |
| COMP-03 | BentoSection renders with left tall card, center checklist card, right sub-cards | unit | `npx vitest run __tests__/components/sections/BentoSection.test.tsx` | ❌ Wave 0 |
| COMP-04 | TestimonialSection renders dark section with video element and card | unit | `npx vitest run __tests__/components/sections/TestimonialSection.test.tsx` | ❌ Wave 0 |
| COMP-05 | Auto-advance calls setIndex after 5s; dot click updates currentIndex | unit | `npx vitest run __tests__/components/sections/TestimonialSection.test.tsx` | ❌ Wave 0 |
| COMP-06 | AnimatePresence present in component tree; key changes on index change | unit | `npx vitest run __tests__/components/sections/TestimonialSection.test.tsx` | ❌ Wave 0 |

### Sampling Rate
- **Per task commit:** `npx vitest run __tests__/components/sections/`
- **Per wave merge:** `npx vitest run`
- **Phase gate:** Full suite green before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] `__tests__/components/sections/ProcessSection.test.tsx` — covers COMP-01, COMP-02
- [ ] `__tests__/components/sections/BentoSection.test.tsx` — covers COMP-03
- [ ] `__tests__/components/sections/TestimonialSection.test.tsx` — covers COMP-04, COMP-05, COMP-06

No framework or config gaps — Vitest + jsdom + @testing-library/react fully configured. Mock pattern for `motion/react` is established and consistent across all 14 existing test files.

**Standard mock block for all three new test files:**
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

## Sources

### Primary (HIGH confidence)
- Existing codebase — `components/hero/HeroTextSelector.tsx` (AnimatePresence + interval pattern)
- Existing codebase — `components/layout/BottomBar.tsx` (always-mounted AnimatePresence parent)
- Existing codebase — `lib/data.ts` (processSteps and testimonials arrays, verified structure)
- Existing codebase — `lib/animation-variants.ts` (fadeUp, scaleIn, spring variants)
- Existing codebase — `__tests__/components/sections/ServicesSection.test.tsx` (mock pattern)
- `index.html` — visual reference for bento `.bento`, `.bento-vision`, `.bento-detail` CSS
- `index.html` — visual reference for `.testimonial-card`, `.testimonial-slides` CSS
- `.planning/research/PITFALLS.md` — Pitfall 5 (Tailwind dynamic classes), Pitfall 7 (useScroll production offset)
- `.planning/phases/05-complex-interactive-sections/05-CONTEXT.md` — all locked decisions
- `npm view motion version` — confirmed motion@12.38.0 (2026-03-17)

### Secondary (MEDIUM confidence)
- CSS `position: sticky` MDN specification — sticky behavior with incrementing top values is standard, well-supported
- CSS Grid `row-span` — standard grid layout, Tailwind `row-span-2` maps directly to `grid-row: span 2`

### Tertiary (LOW confidence)
- None — all findings verified against codebase or official spec

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all dependencies already installed; versions confirmed from package registry
- Architecture: HIGH — all three component patterns have direct codebase precedents
- Pitfalls: HIGH — drawn from project PITFALLS.md (pre-researched) and codebase inspection
- Test patterns: HIGH — 14 existing test files establish consistent mock and assertion conventions

**Research date:** 2026-03-28
**Valid until:** 2026-04-28 (stable libraries; motion v12 API unlikely to change)
