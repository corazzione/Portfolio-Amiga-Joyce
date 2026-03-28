# Phase 5: Complex Interactive Sections - Context

**Gathered:** 2026-03-28
**Status:** Ready for planning
**Source:** Auto mode (--auto) — all decisions are recommended defaults

<domain>
## Phase Boundary

Two highest-craft sections: (1) Sticky stacked process cards that stack as user scrolls through the section, and (2) A cinematic dark testimonial carousel with auto-advancing cards over a video background. The bento trust grid is also here. These sections replace the `<section id="process" />` and `<section id="testimonials" />` anchor placeholders in `app/page.tsx`. Hero section, content sections, and additional pages are separate phases.

</domain>

<decisions>
## Implementation Decisions

### Sticky Process Cards (COMP-01, COMP-02)
- **Stacking mechanism:** CSS `position: sticky` on each card with incrementing `top` values (`top-24`, `top-32`, `top-40`…) — pure CSS, no scroll-driven JS. Cards stay "stuck" as subsequent cards scroll over them creating the stacking visual.
- **Paper-like rotation:** Static subtle rotation per card via `rotate-[Ndeg]` Tailwind utility: alternating +1, -0.5, +0.5, -1, +0.5, -0.5 degrees — not scroll-animated, just visual variety
- **Section structure:** Tall scroll container (`min-h-[300vh]`) with `sticky` child cards — gives enough scroll travel for all 6 to stack
- **Card content per COMP-02:** Step number (top right, gold), step name (Switzer bold), circular image placeholder (`rounded-full aspect-square bg-dark/10 w-24`), description (font-sans)
- **Data source:** `processSteps` array from `lib/data.ts` (6 items: Descoberta, Planejamento, Captação, Edição, Entrega, Otimização)
- **Component:** `ProcessSection.tsx` — `'use client'` for any scroll tracking; or Server Component if pure CSS is sufficient. **Prefer Server Component + pure CSS sticky** — no motion/react needed here
- **CRITICAL pitfall from STATE.md:** `useScroll` production offset bug requires `layoutEffect: false` — avoid `useScroll` entirely in this phase; pure CSS sticky is the safe path

### Bento Trust Grid (COMP-03)
- **Layout:** CSS Grid `grid-cols-3 grid-rows-[auto]` with explicit `col-span`/`row-span` per cell — pure Server Component
- **Cell structure (left to right):**
  - Left: tall photo card (`col-span-1 row-span-2`) with "Visão Personalizada" dark overlay text
  - Center: beige content card — "Atenção aos Detalhes" heading + skill checklist (checkmarks, typography, color, composition, lighting, editing)
  - Right column 4 sub-cards: equipment card (dark), quality polaroids card, collaborations card (with avatar stacks + stats), dark "Abordagem Narrativa" card
- **Images:** Placeholder divs — `bg-dark/10 w-full aspect-[3/4]` for tall card, smaller aspect for others
- **Component:** `BentoSection.tsx` — pure Server Component, no `'use client'`
- **Responsive:** On mobile collapses to single column (`grid-cols-1` at sm)

### Testimonial Carousel (COMP-04, COMP-05, COMP-06)
- **Component:** `TestimonialSection.tsx` — `'use client'` required (useState + useEffect)
- **State:** `useState<number>` for `currentIndex` (0, 1, 2)
- **Auto-advance:** `useEffect` with `setInterval(5000)` — clears on unmount and on manual navigation
- **Card transitions:** `AnimatePresence mode="wait"` with `key={currentIndex}` — same pattern as `HeroTextSelector`. Enter: `opacity: 0, y: 20` → `opacity: 1, y: 0`. Exit: `opacity: 0, y: -20`. Duration 0.4s, ease `[0.22, 1, 0.36, 1]`
- **Background:** Dark section `bg-dark` — video element same pattern as HeroSection: `<video autoPlay muted loop playsInline src="">` with `bg-dark` gradient fallback when src empty
- **Card design:** White floating card `bg-white rounded-2xl p-8 shadow-2xl` — name, role, quote, 5-star rating dots
- **Data:** `testimonials` array from `lib/data.ts` (Danny Rose, David Nguyen, Alisha Moore)
- **Dot navigation:** 3 dots, clicking a dot sets `currentIndex`, clears + restarts interval. Active dot: `bg-gold`, inactive: `bg-white/40`

### Integration into page.tsx
- Replace `<section id="process" aria-hidden="true" />` with `<ProcessSection />`
- Replace `<section id="testimonials" aria-hidden="true" />` with `<TestimonialSection />`
- Insert `<BentoSection />` between services grid and portfolio (or wherever index.html places it)
- `app/page.tsx` remains a Server Component — only the imported components have 'use client'

### Claude's Discretion
- Exact sticky card `top` offsets and z-index values
- Whether bento grid sub-cards have hover effects (keep subtle if any)
- Exact skill checklist items for the bento center card
- Desktop vs mobile bento grid column count transition breakpoint
- Whether process card circular images use `next/image` or simple placeholder divs

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Requirements
- `.planning/REQUIREMENTS.md` — COMP-01 through COMP-06 (all complex interactive section requirements)

### Visual reference
- `index.html` — Complete HTML mockup; inspect `.process-section`, `.trust-section` (bento), and `.testimonials-section` for exact layout, copy, and visual design

### Foundation (prior phase outputs)
- `app/page.tsx` — Replace the `<section id="process" />` and `<section id="testimonials" />` anchors with real components
- `lib/data.ts` — `processSteps` (6 items), `testimonials` (3 items) arrays — read before implementing
- `components/motion/RevealWrapper.tsx` — use for section entrances
- `lib/animation-variants.ts` — `fadeUp`, `scaleIn` — use existing variants
- `tailwind.config.ts` — `bg-dark`, `bg-gold`, `bg-bg`, `font-switzer` tokens

### Critical pitfalls
- `.planning/research/PITFALLS.md` — useScroll production offset bug: requires `layoutEffect: false` OR avoid useScroll entirely. **Process cards use pure CSS sticky — no useScroll needed.**
- `.planning/research/PITFALLS.md` — AnimatePresence must live in always-mounted parent (same pattern as BottomBar.tsx)

### Pattern references
- `components/hero/HeroTextSelector.tsx` — AnimatePresence mode="wait" pattern to reuse for testimonial carousel
- `components/layout/BottomBar.tsx` — AnimatePresence always-mounted parent pattern

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `lib/data.ts`: `processSteps` (6 steps, already has name + description + image placeholder), `testimonials` (3 cards, name + role + quote + rating)
- `components/hero/HeroTextSelector.tsx`: Auto-advance interval + AnimatePresence mode="wait" pattern — copy this pattern for testimonials
- `components/motion/RevealWrapper.tsx`: variant prop + reduced-motion guard — use for section entrances
- `components/sections/ServiceCard.tsx`: Example of `'use client'` card with motion.div

### Established Patterns
- Motion imports: `from 'motion/react'` only
- `'use client'` only at component level that needs it (TestimonialSection needs it; ProcessSection and BentoSection do NOT)
- AnimatePresence: always mounted parent, `key` = the cycling value (not index), `mode="wait"`
- Build must pass: `npm run build` exits 0 after each plan
- Interval cleanup: `return () => clearInterval(id)` in useEffect — established in HeroTextSelector

### Integration Points
- `app/page.tsx` → Replace 2 anchor placeholders with 3 real components (Process, Bento, Testimonial)
- `components/sections/ProcessSection.tsx` → New; pure CSS sticky, Server Component
- `components/sections/BentoSection.tsx` → New; CSS grid, Server Component
- `components/sections/TestimonialSection.tsx` → New; `'use client'`, useState + useEffect + AnimatePresence

</code_context>

<specifics>
## Specific Ideas

- Process section should feel like "cards are being dealt on a table" — stacking effect is the key visual payoff
- The bento grid is an info-dense section — whitespace inside cards matters; don't cram
- Testimonial carousel should feel cinematic — the dark video background makes the white floating card pop
- Dot nav: gold active dot on dark bg is a strong visual indicator

</specifics>

<deferred>
## Deferred Ideas

- Touch swipe for testimonial carousel (Phase 7 — RESP-06)
- Process cards sticky effect graceful mobile fallback (Phase 7 — RESP-07)
- Parallax on bento images (v2)
- Video assets for testimonial background (content task — Joyce provides)

</deferred>

---

*Phase: 05-complex-interactive-sections*
*Context gathered: 2026-03-28 via auto mode*
