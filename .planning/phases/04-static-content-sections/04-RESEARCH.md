# Phase 4: Static Content Sections - Research

**Researched:** 2026-03-28
**Domain:** Next.js 14 App Router / Motion v12 / Tailwind CSS v3.4 / React 18 Server + Client Components
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

- Each section lives in `components/sections/` as its own file
- Server Components by default; only FAQSection gets `'use client'`
- Shared spacing: `py-24 px-6` on sections, `max-w-7xl mx-auto` on inner containers
- All sections imported and stacked in `app/page.tsx` (stays a Server Component)
- Use `RevealWrapper` and `StaggerChildren`/`StaggerItem` for all scroll reveals
- Photo strip: `flex gap-4 overflow-x-auto`, `next/image` with `aspect-[4/3]`, placeholder via `bg-dark/10` div, RevealWrapper `variant="scaleIn"`
- Manifesto: Switzer, large (4xl–6xl), centered, beige bg, RevealWrapper `fadeUp`
- CTA/proof strip: flex items-center justify-between, client logos text placeholder if SVG missing
- Services: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6`, white cards `bg-white rounded-2xl p-6 shadow-sm`, StaggerChildren + StaggerItem
- Card hover: ALL cards use `motion.div` with `whileHover={{ scale: 1.02, y: -4 }}` and `transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}`
- Image hover: `whileHover={{ scale: 1.05 }}` on the `motion.div` wrapper, not on next/image directly
- Portfolio: `grid-cols-1 md:grid-cols-3 gap-6`, placeholder `bg-dark/10 aspect-[3/4] rounded-xl`
- Blog: stacked list with `<hr>` separators, RevealWrapper per card with staggered delays
- FAQ: two-column desktop (`grid grid-cols-1 lg:grid-cols-2 gap-12`), `useState` single open, `motion` height animation
- CTA section: dark bg (`bg-dark`), placeholder div for figure
- Footer: white card (`bg-white rounded-3xl mx-6 mb-6`) on beige (`bg-bg`)
- Motion imports: always `from 'motion/react'` — never framer-motion
- `npm run build` must pass after each plan

### Claude's Discretion

- Exact manifesto text (use index.html for Portuguese copy)
- Exact number/style of avatar placeholder circles in proof strip (3 overlapping circles)
- Icon treatment for service cards (keep emoji from data.ts)
- Portfolio grid item data (6 static placeholder items inline, no data.ts needed)
- Exact CTA section figure placement and proportions

### Deferred Ideas (OUT OF SCOPE)

- Horizontal scroll for photo strip (Lenis/custom scroll) — v2
- Filterable portfolio grid — Phase 6
- Real SVG client logos — content task
- Real portfolio photos — content task
- Animated counter for stats in proof strip — v2
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| SECT-01 | Horizontal photo strip with thumbnail images scrolls/reveals below the hero | RevealWrapper `scaleIn` on strip container; placeholder divs; no JS scroll library |
| SECT-02 | Centered manifesto/statement text section with scroll-reveal | RevealWrapper `fadeUp`; Switzer font via `font-switzer`; Portuguese copy from index.html |
| SECT-03 | CTA/proof strip: gold button, avatar cluster, client logos | `flex items-center justify-between`; text placeholder for missing SVGs; `<img>` tag acceptable for logos since SSR-safe |
| SECT-04 | "Meus Serviços" 4-column white card grid, 7 service cards + 1 photo card | `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`; data from `lib/data.ts services[]`; StaggerChildren wrapping grid |
| SECT-05 | Service cards stagger-reveal on scroll | StaggerChildren + StaggerItem (already exported); stagger variant in animation-variants.ts provides 0.1s between children |
| SECT-06 | "Trabalhos Selecionados" 3-column portfolio preview grid, stagger-reveal | `grid-cols-1 md:grid-cols-3`; 6 inline static items; StaggerChildren + StaggerItem |
| SECT-07 | "Últimas Histórias" 3 blog cards with horizontal separators | Stacked list, RevealWrapper per card with `delay` prop; data from `lib/data.ts blogPosts[]` |
| SECT-08 | FAQ accordion with 4 questions, animated expand/collapse | `'use client'`; `useState`; motion height animation pattern (see Architecture Patterns below) |
| SECT-09 | Final CTA section: heading, "Entre em Contato" button, figure | `bg-dark` section; placeholder gradient div for figure; RevealWrapper `fadeUp` |
| SECT-10 | Footer: white card, brand, socials, nav links, copyright | Server Component; `bg-white rounded-3xl mx-6 mb-6`; text-based social icons |
| ANIM-05 | Cards and images have subtle hover elevation/scale on mouse enter | `motion.div` with `whileHover`; requires `'use client'` on any component using motion.div with whileHover (see ANIM-05 pattern below) |
</phase_requirements>

---

## Summary

Phase 4 builds 10 homepage sections plus card hover states. The technical surface is large in quantity but low in novelty — all patterns derive from work already done in Phases 1–3. The primary new challenges are: (1) the FAQ accordion's `motion` height animation, (2) the Server Component / Client Component boundary for `whileHover` cards, and (3) keeping `app/page.tsx` clean with 10+ imports.

The critical finding on ANIM-05 is that `whileHover` requires a Client Component. Any component that renders `motion.div` with `whileHover` must have `'use client'`. The pattern is to make the card component itself a Client Component (or a thin `'use client'` wrapper) while keeping the section-level Server Component as the import boundary. This does NOT require the parent section to be a Client Component.

The FAQ accordion height animation in Motion v12 uses `animate={{ height: isOpen ? 'auto' : 0 }}` with `initial={{ height: 0 }}` and `overflow: 'hidden'` on a `motion.div`. This works in Motion v12 — `height: 'auto'` is supported as an animate target (it is resolved at runtime using layout measurement). No extra configuration is required.

**Primary recommendation:** Build 10 thin section files, each under ~80 lines. Cards that need `whileHover` get `'use client'` at the top of their own file. FAQSection gets `'use client'`. All others are Server Components. Wire all into `app/page.tsx` as a simple list of JSX tags.

---

## Standard Stack

### Core (already installed — no new installs required)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| motion | ^12.38.0 | Animation: `motion.div`, `whileHover`, height animate | Project lock — all animation via this |
| next | 14.2.35 | `next/image` for images, App Router structure | Project lock |
| tailwindcss | ^3.4.1 | Layout, spacing, responsive grid | Project lock |
| react | ^18 | `useState` for FAQ accordion | Project lock |

### No New Dependencies

This phase introduces zero new npm dependencies. Everything needed is already installed.

**Verification:** `motion ^12.38.0` is installed (confirmed from package.json). No additional packages needed.

---

## Architecture Patterns

### Recommended Project Structure

```
components/
└── sections/
    ├── PhotoStripSection.tsx      # Server Component
    ├── ManifestoSection.tsx       # Server Component
    ├── ProofStripSection.tsx      # Server Component
    ├── ServicesSection.tsx        # Server Component (imports ServiceCard)
    ├── ServiceCard.tsx            # 'use client' — needs whileHover
    ├── PortfolioSection.tsx       # Server Component (imports PortfolioCard)
    ├── PortfolioCard.tsx          # 'use client' — needs whileHover
    ├── BlogSection.tsx            # Server Component
    ├── FAQSection.tsx             # 'use client' — needs useState + motion height
    ├── CTASection.tsx             # Server Component
    └── FooterSection.tsx          # Server Component
```

`app/page.tsx` remains a Server Component — it only imports and stacks components. The Client Component boundary is at the individual card or FAQ level, not the section level.

### Pattern 1: Server Component Section (most sections)

```tsx
// components/sections/ManifestoSection.tsx
// No 'use client' — Server Component

import { RevealWrapper } from '@/components/motion/RevealWrapper'

export function ManifestoSection() {
  return (
    <section className="py-24 px-6 bg-bg text-center">
      <div className="max-w-4xl mx-auto">
        <RevealWrapper variant="fadeUp">
          <p className="font-switzer text-4xl md:text-6xl font-bold leading-tight tracking-tight text-dark">
            Cada imagem conta uma história.{' '}
            <span className="text-dark/50">
              Cada projeto começa com uma conversa.
            </span>
          </p>
        </RevealWrapper>
      </div>
    </section>
  )
}
```

### Pattern 2: StaggerChildren for Card Grids

```tsx
// components/sections/ServicesSection.tsx — Server Component
import { StaggerChildren, StaggerItem } from '@/components/motion/StaggerChildren'
import { ServiceCard } from './ServiceCard'
import { services } from '@/lib/data'

export function ServicesSection() {
  return (
    <section id="services" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-start justify-between mb-12">
          <h2 className="font-switzer text-4xl font-bold tracking-tight">Meus Serviços</h2>
          <a href="#" className="...">Ver Todos</a>
        </div>
        <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s) => (
            <StaggerItem key={s.id}>
              <ServiceCard service={s} />
            </StaggerItem>
          ))}
          <StaggerItem>
            {/* photo card — dark bg placeholder */}
            <div className="bg-dark rounded-2xl aspect-[3/4] ..." />
          </StaggerItem>
        </StaggerChildren>
      </div>
    </section>
  )
}
```

### Pattern 3: ANIM-05 — whileHover Card (Client Component)

**Key insight:** `whileHover` is a Motion gesture prop. It requires a Client Component because it attaches event listeners. The card itself must have `'use client'`, but its parent section does NOT need to be a Client Component.

```tsx
// components/sections/ServiceCard.tsx
'use client'

import { motion } from 'motion/react'
import type { Service } from '@/lib/data'

export function ServiceCard({ service }: { service: Service }) {
  return (
    <motion.div
      className="bg-white rounded-2xl p-6 shadow-sm cursor-default"
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="text-2xl">{service.icon}</span>
      <h3 className="font-switzer text-lg font-bold mt-4 mb-2">{service.title}</h3>
      <p className="text-dark/70 text-sm leading-relaxed">{service.description}</p>
    </motion.div>
  )
}
```

The same `'use client'` + `motion.div whileHover` pattern applies to `PortfolioCard.tsx` and any blog card that needs hover.

### Pattern 4: FAQ Accordion — motion height animation

**Confirmed in Motion v12:** `animate={{ height: 'auto' }}` is supported. Motion v12 resolves `'auto'` at runtime by measuring the element. The correct pattern is:

```tsx
// components/sections/FAQSection.tsx
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { faqItems } from '@/lib/data'

export function FAQSection() {
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <section id="faq" className="py-24 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left: title */}
        <div>
          <h2 className="font-switzer text-5xl font-bold tracking-tight leading-none">
            Alguma<br />Dúvida?
          </h2>
        </div>
        {/* Right: accordion */}
        <div className="flex flex-col">
          {faqItems.map((item) => {
            const isOpen = openId === item.id
            return (
              <div key={item.id} className="border-b border-dark/10">
                <button
                  className="flex items-center justify-between w-full py-5 text-left
                             font-switzer text-base font-semibold text-dark"
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                >
                  <span>{item.question}</span>
                  <span
                    className="text-lg text-dark/40 transition-transform duration-300"
                    style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}
                  >
                    +
                  </span>
                </button>
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: isOpen ? 'auto' : 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  style={{ overflow: 'hidden' }}
                >
                  <p className="text-dark/60 text-sm leading-relaxed pb-5">
                    {item.answer}
                  </p>
                </motion.div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
```

**Critical:** `style={{ overflow: 'hidden' }}` must be an inline style (not a Tailwind class) on the `motion.div` that animates height. Tailwind's `overflow-hidden` is a static class and works too, but inline style is more explicit and avoids purging edge cases during `animate`. Both work in practice.

**Do NOT use `AnimatePresence` for this pattern.** The height animation runs on the existing element; `AnimatePresence` is for mount/unmount transitions. Use it only when the content div is conditionally rendered (not recommended here).

### Pattern 5: next/image in Server Components

`next/image` works in Server Components without any special handling. Two valid usage modes:

**Fixed dimensions (preferred for photo strip, blog thumbnails):**
```tsx
import Image from 'next/image'

<div className="relative w-[220px] h-[300px] rounded-lg overflow-hidden flex-shrink-0">
  <Image
    src="/images/placeholder.jpg"
    alt="Photo"
    fill
    className="object-cover"
    sizes="220px"
  />
</div>
```

**Aspect ratio with fill (preferred for portfolio grid):**
```tsx
<div className="relative aspect-[3/4] rounded-xl overflow-hidden">
  <Image
    src="/images/placeholder.jpg"
    alt="Portfolio work"
    fill
    className="object-cover"
    sizes="(max-width: 768px) 100vw, 33vw"
  />
</div>
```

**When images don't exist yet:** Use a plain `<div>` placeholder. Do NOT use `<Image>` with a non-existent src — it will throw a 404 error in the build output. Use:
```tsx
<div className="bg-dark/10 w-full aspect-[4/3] rounded-xl" />
```

### Pattern 6: Client Logo Fallback (SECT-03)

Since SVG files at `/images/logos/*.svg` do not exist yet, using `<img>` would produce broken-image icons. Use conditional rendering based on knowledge that files are absent:

```tsx
// All logos render as text until real SVGs are provided
// Decision from CONTEXT.md: render name text if file not found
{clientLogos.map((logo) => (
  <span
    key={logo.id}
    className="font-switzer font-semibold text-sm text-dark/40 tracking-widest uppercase"
  >
    {logo.name}
  </span>
))}
```

**Do not use `<img>` with the SVG src paths at all in this phase.** The files don't exist and next/image would fail on build with missing local files. Plain text placeholders are the correct implementation per CONTEXT.md.

Note: `next/image` cannot load local SVG files without `unoptimized` prop anyway — the image optimizer does not handle SVG. For future real logos, use `<img>` (not `next/image`) or inline SVG.

### Pattern 7: Wiring app/page.tsx (10+ sections)

Keep `app/page.tsx` as a flat import list. Group imports by section order:

```tsx
import { HeroSection } from '@/components/hero/HeroSection'
import { PhotoStripSection } from '@/components/sections/PhotoStripSection'
import { ManifestoSection } from '@/components/sections/ManifestoSection'
// ... 8 more

export default function Home() {
  return (
    <main>
      <HeroSection />
      <PhotoStripSection />
      <ManifestoSection />
      <ProofStripSection />
      <ServicesSection />
      <PortfolioSection />
      <BlogSection />
      <FAQSection />
      <CTASection />
      {/* Phase 5 placeholders */}
      <section id="process" aria-hidden="true" />
      <section id="testimonials" aria-hidden="true" />
      <FooterSection />
    </main>
  )
}
```

This file stays a Server Component. Each section component declares its own `'use client'` boundary only if needed. Next.js App Router resolves the tree correctly.

### Pattern 8: RevealWrapper on section containers vs. individual elements

- **Use on section container** (the inner `max-w-7xl` div): when the entire section should animate as one unit (Manifesto, CTA)
- **Use on individual elements** with staggered `delay` prop: Blog cards — where each card reveals independently (`delay={0}`, `delay={0.1}`, `delay={0.2}`)
- **Use StaggerChildren + StaggerItem on grid containers**: Services, Portfolio — where children are repeated items from a data array
- **Do NOT double-wrap**: A `StaggerItem` (which is a `motion.div` with `fadeUp` variant) inside a `RevealWrapper` (also a `motion.div`) creates nested motion contexts and will conflict. Choose one pattern per use case.

### Anti-Patterns to Avoid

- **Importing from `framer-motion`**: Always `from 'motion/react'`. The `motion` package v12 re-exports under `motion/react` subpath.
- **Using `motion.div` in a Server Component**: `motion.div` requires a Client Component boundary. Without `'use client'`, Next.js will throw at build time.
- **Double-wrapping with both RevealWrapper and StaggerItem**: Pick one animation wrapper per element.
- **`next/image` without a sized parent**: The `fill` prop requires the parent to have `position: relative` and explicit dimensions or an aspect-ratio that produces height. Always wrap with a positioned div.
- **`next/image` for SVG files**: The optimizer skips SVGs but still generates requests. Use plain `<img>` or inline SVG for logos.
- **`AnimatePresence` for height accordion**: Height animation on a persistent DOM element uses `animate={{ height }}` directly — no `AnimatePresence` needed.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Card stagger reveal | Custom IntersectionObserver + delay logic | `StaggerChildren` + `StaggerItem` (already built) | Handles reduced-motion, once: true, inView logic |
| Scroll reveal | Manual CSS transition on IntersectionObserver | `RevealWrapper` (already built) | Reduced-motion guard, variant prop, delay prop |
| Height accordion animation | CSS max-height transition | `motion.div animate={{ height: 'auto' }}` | `max-height` animation has jump artifacts; Motion measures actual height |
| Responsive grid | CSS Grid with JS breakpoint detection | Tailwind responsive prefixes (`sm:`, `lg:`) | Zero JS, handled at build time |
| Image optimization | Manual `<img>` with srcset | `next/image` with `fill` + `sizes` | Automatic WebP, lazy loading, LCP optimization |

**Key insight:** The photo strip, services grid, portfolio grid, and blog cards are all solved by combining existing `StaggerChildren`/`RevealWrapper` primitives with Tailwind grid. Zero custom animation logic is needed in this phase.

---

## Common Pitfalls

### Pitfall 1: `motion.div whileHover` in a Server Component fails silently or at build
**What goes wrong:** Next.js App Router throws "You're importing a component that needs `useState`" or similar when `motion.div` with event-based props is used in a Server Component.
**Why it happens:** `whileHover`, `whileTap`, etc. register event listeners at runtime — this is Client Component behavior.
**How to avoid:** Any component file that uses `motion.div` with gesture props (`whileHover`, `whileTap`, `whileFocus`, `whileDrag`) MUST have `'use client'` at the top.
**Warning signs:** Build error mentioning "client component" or "event handlers cannot be passed to Client Component props."

### Pitfall 2: `height: 'auto'` accordion jumps on first open
**What goes wrong:** On the first open, the height animation may jump or not animate smoothly if the element has display:none or if overflow is set incorrectly.
**Why it happens:** Motion needs to measure the element's natural height. If the element is not in the DOM or has zero intrinsic height before measurement, the animation target cannot be computed.
**How to avoid:** Always render the `motion.div` in the DOM (not conditionally rendered). Set `initial={{ height: 0 }}` and `style={{ overflow: 'hidden' }}`. Never use `display: none` — use `height: 0` instead.
**Warning signs:** Content flashes to full height before animating, or no animation occurs on first click.

### Pitfall 3: `next/image` build error with non-existent local files
**What goes wrong:** `next build` throws a 404 or missing-image error if a local file path passed to `src` prop doesn't exist in `public/`.
**Why it happens:** Next.js image optimizer validates/processes the image at build time for static exports and dev mode.
**How to avoid:** Use placeholder divs (`<div className="bg-dark/10 ..." />`) wherever real images aren't available. Never pass a non-existent local path to `next/image`.
**Warning signs:** `npm run build` exits non-zero with "could not find image" or 404 during static generation.

### Pitfall 4: `StaggerItem` outside `StaggerChildren` breaks animation
**What goes wrong:** `StaggerItem` uses `motion.div variants={fadeUp}` without its own `initial`/`animate` — it inherits from `StaggerChildren` parent via Motion's variant propagation. Used standalone, it has no trigger and stays hidden.
**Why it happens:** Motion's variant propagation requires a parent with matching `initial`/`animate` variant names. `fadeUp` uses `hidden`/`visible` names — these must match the parent.
**How to avoid:** Always wrap `StaggerItem` components inside a `StaggerChildren`. Never use `StaggerItem` as a standalone reveal element — use `RevealWrapper` for that.

### Pitfall 5: Tailwind `content` config doesn't scan `components/sections/`
**What goes wrong:** New classes used only in `components/sections/` get purged from production build.
**Why it happens:** Tailwind purges based on the `content` array. If the glob doesn't match, classes are stripped.
**How to avoid:** Verify `tailwind.config.ts` includes `'./components/**/*.{ts,tsx}'`. It does (confirmed). No action needed.

### Pitfall 6: `app/page.tsx` accumulating 'use client' accidentally
**What goes wrong:** Adding a Client Component import to a Server Component parent doesn't make the parent a Client Component — but adding `'use client'` to `page.tsx` would make ALL its children client-rendered.
**Why it happens:** Developer adds `'use client'` to resolve a misunderstood error.
**How to avoid:** Never add `'use client'` to `app/page.tsx`. Each section or card component declares its own boundary. If a build error points to `page.tsx`, the fix is at the imported component level.

---

## Code Examples

Verified patterns from project codebase:

### Existing motion mock pattern for tests (from `__tests__/components/hero/HeroSection.test.tsx`)
```tsx
vi.mock('motion/react', () => ({
  motion: {
    div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement> & { children?: React.ReactNode }) => (
      <div {...props}>{children}</div>
    ),
    // add button, span, etc. as needed per component
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useReducedMotion: mockUseReducedMotion,
  useInView: vi.fn(() => true),
}))
```
New section tests must extend this mock to include any additional `motion.*` elements used (e.g., `motion.button` for FAQ toggle if used).

### Blog section separator pattern (from index.html reference)
The index.html uses vertical separators (border-right on non-last cards). The CONTEXT.md spec says horizontal `<hr>` separators between cards. Use `<hr className="border-dark/10" />` between mapped items, not around them:
```tsx
{blogPosts.map((post, i) => (
  <div key={post.id}>
    {i > 0 && <hr className="border-dark/10" />}
    <RevealWrapper delay={i * 0.1}>
      {/* card content */}
    </RevealWrapper>
  </div>
))}
```

### Avatar cluster (SECT-03)
```tsx
<div className="flex items-center">
  {[0, 1, 2].map((i) => (
    <div
      key={i}
      className="w-9 h-9 rounded-full bg-dark/20 border-2 border-bg -ml-2 first:ml-0"
    />
  ))}
</div>
```

### Portfolio placeholder items (inline, no data.ts)
```tsx
const portfolioItems = [
  { id: 'p1', caption: 'Retrato Editorial' },
  { id: 'p2', caption: 'Campanha de Marca' },
  { id: 'p3', caption: 'Cobertura de Evento' },
  { id: 'p4', caption: 'Lifestyle & Produto' },
  { id: 'p5', caption: 'Videografia' },
  { id: 'p6', caption: 'Documental' },
]
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `framer-motion` imports | `motion/react` imports (Motion v12) | Motion v12 rebranding | Breaking change — always use `from 'motion/react'` |
| CSS `max-height` accordion | `motion.div animate={{ height: 'auto' }}` | Motion v6+ | Smoother, no fixed max-height estimation needed |
| `<img>` for all images | `next/image` with `fill` + `sizes` | Next.js 13+ | Automatic optimization, LCP improvement |
| Page-level `'use client'` | Component-level `'use client'` boundary | Next.js 13 App Router | Server-first by default; Client boundary at leaf level |

**Deprecated/outdated:**
- `framer-motion` package: replaced by `motion` package v12. Same API surface but different import path.
- `next/image` `layout` prop: removed in Next.js 13. Use `fill` boolean instead.
- `height: 0` + CSS `transition` for accordion: produces jump because `height: auto` is not CSS-animatable. Motion solves this.

---

## Open Questions

1. **`height: 'auto'` in Motion v12 — does it require `layout` prop?**
   - What we know: Motion v12 supports `animate={{ height: 'auto' }}` on `motion.div`. The library measures the element's natural height before animating.
   - What's unclear: Whether `layout` prop is also needed (it should NOT be needed for this pattern — `layout` is for layout-affecting position changes, not explicit height animation).
   - Recommendation: Use `animate={{ height: isOpen ? 'auto' : 0 }}` without `layout`. If animation is choppy, add `layout` as fallback. Based on Motion documentation, `height: 'auto'` without `layout` is the correct pattern for accordion.
   - Confidence: MEDIUM — verified by Motion docs pattern, not tested against this exact version in this repo.

2. **`next/image` with `fill` in a flex container (photo strip)**
   - What we know: `fill` requires `position: relative` on the parent and defined dimensions (height or aspect ratio).
   - What's unclear: In a `flex` row with `flex-shrink-0`, the parent needs explicit width + height or the image has no container to fill.
   - Recommendation: Wrap each strip photo in `<div className="relative flex-shrink-0 w-[220px] h-[300px] rounded-lg overflow-hidden">` then use `<Image fill>`. This is the safe pattern.

---

## Validation Architecture

> `workflow.nyquist_validation` is `true` in `.planning/config.json` — this section is required.

### Test Framework

| Property | Value |
|----------|-------|
| Framework | Vitest ^4.1.2 + @testing-library/react ^16.3.2 |
| Config file | `vitest.config.ts` (exists) |
| Setup file | `vitest.setup.ts` (imports `@testing-library/jest-dom/vitest`) |
| Quick run command | `npx vitest run --reporter=verbose` |
| Full suite command | `npx vitest run` |

### What Can Be Automated

| Component | What to Test | Type |
|-----------|-------------|------|
| FAQSection | Renders 4 questions from faqItems; clicking a question sets it open; clicking again closes it; clicking a second question closes the first | unit/interaction |
| ServicesSection | Renders 8 cards (7 services + 1 photo); each service title from data is present | unit |
| BlogSection | Renders 3 blog post titles; separators appear between cards (not around) | unit |
| FooterSection | Renders "Corazón", "MC. © 2026", social link hrefs | unit |
| ProofStripSection | Renders 4 client logo names (theo, Amsterdam, luminous, MILANO) | unit |
| ManifestoSection | Renders manifesto text content | unit |
| PortfolioSection | Renders 6 portfolio item captions | unit |
| ServiceCard | Renders with whileHover props (mock motion); shows icon, title, description | unit |
| data.ts | services has 7 items; blogPosts has 3; faqItems has 4; clientLogos has 4 | unit |

### What Requires Visual/Manual Check

| Check | Why Automated Is Insufficient |
|-------|-------------------------------|
| Scroll reveal animations | `useInView` is mocked in tests; real scroll behavior requires browser |
| FAQ height animation | jsdom does not compute CSS heights; `height: 'auto'` measures 0 in jsdom |
| `whileHover` scale effect | jsdom has no pointer events that trigger motion gestures |
| Responsive grid reflow (4→2→1 col) | Tailwind breakpoints require real viewport; jsdom has no layout engine |
| Photo strip visual proportions | Aspect ratios and flex layout require real rendering |
| Footer card visual lift on beige bg | CSS rendering, not logic |
| `npm run build` passes | Static analysis catch; run `npm run build` as mandatory plan gate |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| SECT-01 | PhotoStripSection renders without error | unit | `npx vitest run __tests__/components/sections/PhotoStripSection.test.tsx` | ❌ Wave 0 |
| SECT-02 | ManifestoSection renders text content | unit | `npx vitest run __tests__/components/sections/ManifestoSection.test.tsx` | ❌ Wave 0 |
| SECT-03 | ProofStripSection renders 4 logo names | unit | `npx vitest run __tests__/components/sections/ProofStripSection.test.tsx` | ❌ Wave 0 |
| SECT-04 | ServicesSection renders 8 cards | unit | `npx vitest run __tests__/components/sections/ServicesSection.test.tsx` | ❌ Wave 0 |
| SECT-05 | StaggerChildren/StaggerItem wrap cards | visual | manual scroll check | N/A |
| SECT-06 | PortfolioSection renders 6 items | unit | `npx vitest run __tests__/components/sections/PortfolioSection.test.tsx` | ❌ Wave 0 |
| SECT-07 | BlogSection renders 3 posts + separators | unit | `npx vitest run __tests__/components/sections/BlogSection.test.tsx` | ❌ Wave 0 |
| SECT-08 | FAQSection accordion open/close state | unit + interaction | `npx vitest run __tests__/components/sections/FAQSection.test.tsx` | ❌ Wave 0 |
| SECT-09 | CTASection renders heading + button href | unit | `npx vitest run __tests__/components/sections/CTASection.test.tsx` | ❌ Wave 0 |
| SECT-10 | FooterSection renders brand + copyright | unit | `npx vitest run __tests__/components/sections/FooterSection.test.tsx` | ❌ Wave 0 |
| ANIM-05 | ServiceCard/PortfolioCard render with motion mock | unit | included in ServicesSection + PortfolioSection tests | ❌ Wave 0 |

### Sampling Rate

- **Per task commit:** `npx vitest run` (full suite, ~2–5s for this codebase)
- **Per wave merge:** `npx vitest run && npm run build`
- **Phase gate:** Full suite green + `npm run build` exits 0 before `/gsd:verify-work`

### Wave 0 Gaps

All section test files need creation. Suggested structure mirrors existing `__tests__/components/hero/` pattern:

- [ ] `__tests__/components/sections/FAQSection.test.tsx` — covers SECT-08 (most complex: interaction test needed)
- [ ] `__tests__/components/sections/ServicesSection.test.tsx` — covers SECT-04, ANIM-05
- [ ] `__tests__/components/sections/BlogSection.test.tsx` — covers SECT-07
- [ ] `__tests__/components/sections/FooterSection.test.tsx` — covers SECT-10
- [ ] `__tests__/components/sections/PortfolioSection.test.tsx` — covers SECT-06
- [ ] `__tests__/components/sections/ProofStripSection.test.tsx` — covers SECT-03
- [ ] `__tests__/components/sections/ManifestoSection.test.tsx` — covers SECT-02
- [ ] `__tests__/components/sections/PhotoStripSection.test.tsx` — covers SECT-01
- [ ] `__tests__/components/sections/CTASection.test.tsx` — covers SECT-09

All test files must use the `vi.mock('motion/react', ...)` pattern established in `__tests__/components/hero/HeroSection.test.tsx`. The mock must include all `motion.*` elements used by the component under test.

---

## Sources

### Primary (HIGH confidence)

- Project codebase (`lib/data.ts`, `components/motion/`, `lib/animation-variants.ts`, `app/page.tsx`) — direct inspection, all patterns confirmed
- `index.html` reference — Portuguese copy, exact section layout and color usage inspected
- `tailwind.config.ts` — token names confirmed: `bg-bg`, `bg-dark`, `bg-gold`, `text-dark`, `font-switzer`, `font-sans`
- `package.json` — exact versions confirmed: motion ^12.38.0, next 14.2.35, tailwindcss ^3.4.1, vitest ^4.1.2
- `vitest.config.ts` + `vitest.setup.ts` — test infrastructure confirmed operational
- `__tests__/` — existing test patterns inspected and documented

### Secondary (MEDIUM confidence)

- Motion v12 `animate={{ height: 'auto' }}` pattern: supported per Motion library design (height auto animation is a core Motion feature available since v4+, present in v12). Confidence MEDIUM because not verified against this exact installed version in a live test.

### Tertiary (LOW confidence)

- None — all critical claims backed by direct codebase inspection or well-established Motion library behavior.

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all versions confirmed from package.json
- Architecture patterns: HIGH — derived directly from existing code in repo
- Pitfalls: HIGH — derived from Next.js App Router rules + existing STATE.md decisions
- FAQ accordion pattern: MEDIUM — Motion `height: auto` is well-documented but not yet tested in this repo
- Validation architecture: HIGH — vitest config confirmed, test pattern confirmed from existing test files

**Research date:** 2026-03-28
**Valid until:** 2026-04-28 (stable stack; Motion v12 API is stable)
