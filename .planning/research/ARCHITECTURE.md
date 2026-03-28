# Architecture Research

**Domain:** Next.js 14 App Router photographer portfolio (static content, animation-heavy)
**Researched:** 2026-03-28
**Confidence:** HIGH

## Standard Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                        Next.js App Router                            │
│                    (app/ directory, SSG output)                      │
├────────────────┬────────────────┬────────────────┬───────────────────┤
│   app/(root)   │  app/portfolio │  app/contato   │  app/privacidade  │
│   page.tsx     │  page.tsx      │  page.tsx      │  page.tsx         │
│   (Server)     │  (Server)      │  (Server)      │  (Server)         │
└───────┬────────┴───────┬────────┴───────┬────────┴──────────────────┘
        │                │                │
        ▼                ▼                ▼
┌─────────────────────────────────────────────────────────────────────┐
│                     Section Components (Server)                      │
│  HeroSection  PhotoStrip  ServicesSection  ProcessSection  ...       │
│  (static markup, no interactivity, no hooks)                        │
└───────────────────────────┬─────────────────────────────────────────┘
                            │ imports
                            ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    Interactive Client Islands                         │
│                                                                      │
│  BottomBar + MenuOverlay  │  HeroSelector  │  TestimonialCarousel   │
│  ("use client")           │  ("use client")│  ("use client")        │
│                           │                │                         │
│  ProcessCards             │  FAQAccordion  │  ScrollReveal wrapper  │
│  ("use client")           │  ("use client")│  ("use client")        │
└──────────────────────────────────┬──────────────────────────────────┘
                                   │ animation primitives
                                   ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    Shared Animation Layer                            │
│  lib/animation-variants.ts  │  hooks/useScrollReveal.ts             │
│  (motion variant objects)   │  (useInView, useScroll wrappers)      │
└─────────────────────────────────────────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    Static Data Layer                                 │
│  lib/data/services.ts  │  lib/data/testimonials.ts  │  lib/data/... │
│  (typed content objects, no CMS, no API calls)                      │
└─────────────────────────────────────────────────────────────────────┘
```

### Component Responsibilities

| Component | Responsibility | Server or Client |
|-----------|---------------|-----------------|
| `app/page.tsx` | Compose homepage sections in order, import all section components | Server |
| `components/sections/HeroSection` | Full-viewport hero, passes data to HeroSelector island | Server wrapper |
| `components/islands/HeroSelector` | Animated text cycling (A Criação / Videografia / Fotografia), scroll-driven active state | Client |
| `components/sections/PhotoStrip` | Horizontal thumbnail strip, manifesto text | Server (motion wrapper added inline) |
| `components/sections/ServicesSection` | 4-col service card grid, static content | Server |
| `components/sections/ProcessSection` | Sticky stacked process cards with scroll-driven rotation | Server wrapper + Client cards |
| `components/sections/WhySection` | Asymmetric bento trust grid | Server |
| `components/sections/WorksSection` | 3-col portfolio preview grid | Server |
| `components/sections/TestimonialsSection` | Dark full-bleed section, renders TestimonialCarousel | Server wrapper |
| `components/islands/TestimonialCarousel` | Auto-advance carousel, dot nav, AnimatePresence transitions | Client |
| `components/sections/BlogSection` | 3-card blog strip with line separators | Server |
| `components/sections/FAQSection` | Renders FAQAccordion island | Server wrapper |
| `components/islands/FAQAccordion` | Open/close accordion, single-item-open logic | Client |
| `components/sections/CTASection` | Standing model figure, CTA copy | Server |
| `components/layout/TopNav` | Fixed top nav, logo + contact button | Server (no state) |
| `components/layout/BottomBar` | Fixed bottom bar + menu overlay trigger | Client (manages open/close state) |
| `components/layout/MenuOverlay` | Fullscreen dark overlay with nav links | Client (AnimatePresence) |
| `components/ui/RevealWrapper` | Wraps any children in scroll-triggered motion.div | Client |
| `components/ui/StaggerChildren` | Wraps a list in staggered reveal animation | Client |
| `lib/animation-variants.ts` | Shared motion variant definitions (fade-up, scale-in, stagger) | Shared (imported by Client components) |
| `lib/data/*.ts` | Typed static content (services, testimonials, blog posts, FAQ) | Shared |

## Recommended Project Structure

```
E:/Fotógrafo/
├── app/
│   ├── layout.tsx              # Root layout: fonts, BottomBar, TopNav, body padding
│   ├── page.tsx                # Homepage: composes all sections in order
│   ├── globals.css             # Tailwind base + CSS custom properties (--bg, --gold, etc.)
│   ├── portfolio/
│   │   └── page.tsx            # Portfolio listing page
│   ├── contato/
│   │   └── page.tsx            # Contact form page
│   └── privacidade/
│       └── page.tsx            # Privacy/cookies page
│
├── components/
│   ├── layout/
│   │   ├── TopNav.tsx          # Server: fixed top nav, static markup
│   │   ├── BottomBar.tsx       # Client: fixed bottom bar, owns menu open state
│   │   └── MenuOverlay.tsx     # Client: fullscreen overlay, AnimatePresence
│   │
│   ├── sections/               # One file per homepage section
│   │   ├── HeroSection.tsx     # Server wrapper → HeroSelector island
│   │   ├── PhotoStrip.tsx      # Server (or thin client for parallax)
│   │   ├── StatementSection.tsx
│   │   ├── ProofSection.tsx    # Avatar cluster + client logos
│   │   ├── ServicesSection.tsx
│   │   ├── ProcessSection.tsx  # Server wrapper → ProcessCards island
│   │   ├── WhySection.tsx      # Bento grid
│   │   ├── WorksSection.tsx    # Portfolio grid
│   │   ├── TestimonialsSection.tsx  # Server wrapper → TestimonialCarousel
│   │   ├── BlogSection.tsx
│   │   ├── FAQSection.tsx      # Server wrapper → FAQAccordion
│   │   ├── CTASection.tsx
│   │   └── Footer.tsx
│   │
│   ├── islands/                # "use client" interactive components
│   │   ├── HeroSelector.tsx    # Animated text selector + scroll cycling
│   │   ├── ProcessCards.tsx    # Sticky stacked cards with useScroll
│   │   ├── TestimonialCarousel.tsx  # Auto-advance + AnimatePresence
│   │   └── FAQAccordion.tsx    # Accordion open/close
│   │
│   └── ui/                     # Reusable primitives
│       ├── RevealWrapper.tsx   # "use client" scroll reveal via useInView
│       ├── StaggerChildren.tsx # "use client" staggered list reveal
│       ├── GoldButton.tsx      # Button with hover animation
│       └── SectionLabel.tsx    # Small caps label chip (static)
│
├── lib/
│   ├── animation-variants.ts  # All motion variant objects
│   ├── fonts.ts               # next/font config (Switzer + Public Sans)
│   └── data/
│       ├── services.ts
│       ├── testimonials.ts
│       ├── process-steps.ts
│       ├── blog-posts.ts
│       └── faq.ts
│
├── public/
│   ├── images/                # Portfolio photos, avatars, logos
│   └── videos/                # Hero background video, testimonial bg videos
│
├── tailwind.config.ts         # Custom colors, fonts, extend
├── next.config.ts             # output: 'export' or default SSG
└── vercel.json
```

### Structure Rationale

- **components/sections/:** One file per visible section keeps the homepage readable. Each section file is a Server Component by default; it only pulls in a Client island when interactivity is required, keeping bundle size minimal.
- **components/islands/:** All `"use client"` components are co-located here. The name makes the Server/Client boundary explicit and easy to reason about during code review.
- **components/ui/:** RevealWrapper and StaggerChildren are reusable Client wrappers that can be dropped around any Server-rendered content to add scroll animations without converting the content component itself to a Client Component.
- **lib/animation-variants.ts:** Centralizing all Framer Motion variant objects prevents duplication and keeps animation timing consistent across the whole site. Any section that needs a fade-up uses the same easing curve.
- **lib/data/:** Typed static content in TypeScript objects — no CMS, no API calls, no `async` server components needed in v1. Easy to swap for a CMS later by changing only these files.

## Architectural Patterns

### Pattern 1: Server Component Shell + Client Island

**What:** A section is a Server Component that renders static structure and passes typed props into a `"use client"` child for the interactive or animated portion only.

**When to use:** Any section where the content is static but one sub-component needs `useState`, `useEffect`, Framer Motion hooks (`useScroll`, `useInView`), or event handlers.

**Trade-offs:** Slightly more files, but minimizes client JavaScript. Server Component renders HTML at build time; only the interactive island is hydrated.

**Example:**
```tsx
// components/sections/ProcessSection.tsx — Server Component
import { processSteps } from '@/lib/data/process-steps'
import { ProcessCards } from '@/components/islands/ProcessCards'

export function ProcessSection() {
  return (
    <section id="process" className="px-10 py-24 text-center">
      <p className="section-label">Como Trabalho</p>
      <h2 className="section-title">Um Caminho Claro para Visuais Excepcionais</h2>
      <ProcessCards steps={processSteps} />
    </section>
  )
}

// components/islands/ProcessCards.tsx — Client Island
'use client'
import { useScroll, useTransform, motion } from 'motion/react'
// ... sticky scroll logic here
```

### Pattern 2: Shared Animation Variants

**What:** All Framer Motion variant objects live in `lib/animation-variants.ts` and are imported wherever needed. No inline `initial`/`animate`/`exit` objects scattered through component files.

**When to use:** Always — from the first component built.

**Trade-offs:** One extra import per animated component, but consistent timing across the entire site and a single place to tune easing curves.

**Example:**
```ts
// lib/animation-variants.ts
import type { Variants } from 'motion/react'

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.985 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
}
```

### Pattern 3: RevealWrapper for Scroll-Triggered Animations

**What:** A thin `"use client"` component that uses Framer Motion's `useInView` to toggle a variant from `hidden` to `visible` when the element enters the viewport. Wrap any Server-rendered content in it without converting the content component.

**When to use:** Any section that needs scroll-reveal (opacity 0→1, y 24→0) without having interactive logic.

**Trade-offs:** Adds one extra DOM node per animated group. Negligible in practice for a portfolio site.

**Example:**
```tsx
// components/ui/RevealWrapper.tsx
'use client'
import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { fadeUp } from '@/lib/animation-variants'

export function RevealWrapper({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -40px 0px' })
  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  )
}
```

### Pattern 4: Sticky Stacked Process Cards

**What:** Each card gets `position: sticky` with a `top` value calculated from its index. A parent `useScroll` tracks scroll progress through the section, and each card uses `useTransform` to apply a slight rotation and scale as it gets "buried" under the next card.

**When to use:** Only for the ProcessSection — this is the most complex animation in the site.

**Trade-offs:** Requires a tall scroll container (height = number of cards × viewport height) to give sticky enough room. Must be a single Client component owning all cards to share the same `useScroll` ref.

**Example:**
```tsx
// components/islands/ProcessCards.tsx
'use client'
import { useRef } from 'react'
import { useScroll, useTransform, motion } from 'motion/react'

export function ProcessCards({ steps }: { steps: ProcessStep[] }) {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  })

  return (
    <div ref={containerRef} style={{ height: `${steps.length * 100}vh` }}>
      <div className="sticky top-0 flex items-center justify-center h-screen">
        {steps.map((step, i) => {
          const targetScale = 1 - (steps.length - i) * 0.025
          const range = [i / steps.length, (i + 1) / steps.length]
          const scale = useTransform(scrollYProgress, range, [1, targetScale])
          const rotate = useTransform(scrollYProgress, range, [0, -2])

          return (
            <motion.div
              key={step.id}
              style={{
                scale,
                rotate,
                top: `${i * 28}px`, // stagger offset
                zIndex: i,
                position: 'absolute'
              }}
              className="process-card"
            >
              {/* card content */}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
```

### Pattern 5: Fixed Bottom Bar + Fullscreen Menu Overlay

**What:** BottomBar is a single Client Component holding `isOpen` boolean state. It renders the fixed bar and conditionally renders MenuOverlay inside `AnimatePresence`. The overlay animates in/out on open/close. Body scroll lock (`overflow: hidden`) applied when open.

**When to use:** This is the global nav pattern — lives in `app/layout.tsx` so it persists across all pages.

**Trade-offs:** Both the bar and overlay are in the same Client Component tree, which is correct — they share state. Do not split them into two separate Client Components that communicate via a global store; that is unnecessary complexity.

**Example:**
```tsx
// components/layout/BottomBar.tsx
'use client'
import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import Link from 'next/link'

export function BottomBar() {
  const [isOpen, setIsOpen] = useState(false)

  // Scroll lock
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <>
      <div className="fixed bottom-0 inset-x-0 z-[200] h-[52px] bg-[#1a1a1a] flex items-center justify-center">
        <button
          onClick={() => setIsOpen(true)}
          className="absolute left-0 flex items-center gap-2 px-6 h-full bg-[#C8973A] ..."
        >
          Menu <span>+</span>
        </button>
        <span className="font-switzer font-bold text-xs tracking-widest text-white uppercase">Corazón</span>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="menu-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[300] bg-[#1a1a1a] flex flex-col items-center justify-center"
          >
            <button onClick={() => setIsOpen(false)} className="absolute top-6 right-8 text-white text-3xl">✕</button>
            <nav className="flex flex-col items-center gap-12">
              {['Sobre', 'Portfólio', 'Blog', 'Contato'].map((label) => (
                <Link key={label} href="#" onClick={() => setIsOpen(false)}
                  className="font-switzer font-bold text-white hover:text-[#C8973A] transition-colors"
                  style={{ fontSize: 'clamp(36px, 6vw, 72px)' }}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
```

### Pattern 6: Testimonial Carousel with AnimatePresence

**What:** Auto-advance interval (5 s) cycles through slides. The active slide key changes, triggering AnimatePresence exit/enter animations. Dot nav allows manual advance. Video background is a `<video>` element with `autoPlay muted loop playsInline` — not a Client concern, but must be inside the Client component because `<video>` autoplay requires user interaction workarounds on some browsers that need `useEffect`.

**When to use:** Only for TestimonialCarousel. The pattern handles background video swapping too — each slide has its own background image/video source.

**Trade-offs:** AnimatePresence with crossfading slides requires the exiting slide to remain mounted briefly. Use `mode="wait"` or `mode="popLayout"` depending on whether overlap is desired. For a clean crossfade, `mode="sync"` with both enter and exit using `opacity` works best.

**Example:**
```tsx
'use client'
import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'motion/react'

export function TestimonialCarousel({ slides }: { slides: TestimonialSlide[] }) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [slides.length])

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#1a1a18]">
      <AnimatePresence mode="sync">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          {/* background video/image for this slide */}
          <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover opacity-70">
            <source src={slides[current].videoSrc} type="video/mp4" />
          </video>
          {/* testimonial card */}
        </motion.div>
      </AnimatePresence>

      {/* dot nav */}
      <div className="absolute bottom-8 right-10 z-10 flex gap-2">
        {slides.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-colors ${i === current ? 'bg-white' : 'bg-white/30'}`}
          />
        ))}
      </div>
    </div>
  )
}
```

## Data Flow

### Request Flow (Static Site)

```
Vercel CDN (cached HTML)
    ↓
Next.js SSG page.tsx (Server Component — builds HTML at deploy time)
    ↓
Section components render static HTML
    ↓
Client Islands hydrate in browser (BottomBar, HeroSelector, ProcessCards, etc.)
    ↓
Framer Motion reads scroll/viewport position → drives animation values
```

### State Management

```
No global state store needed.

Per-component local state only:
  BottomBar.tsx     → isOpen: boolean
  HeroSelector.tsx  → activeIndex: number
  TestimonialCarousel.tsx → current: number
  FAQAccordion.tsx  → openIndex: number | null
```

Content data flows from `lib/data/*.ts` → Server Component props → passed as serializable props to Client islands. No context providers needed for a static portfolio site.

### Key Data Flows

1. **Animation trigger:** `RevealWrapper` useInView detects element entering viewport → toggles variant from `hidden` to `visible` → Framer Motion drives opacity and y transition.
2. **Process cards:** `useScroll` tracks scroll progress through tall container → `useTransform` maps progress range to scale/rotate values → each card animates independently as user scrolls.
3. **Testimonial auto-advance:** `setInterval` increments `current` index → React re-renders → AnimatePresence detects key change → exit animation on old slide, enter on new slide.
4. **Menu open/close:** button click toggles `isOpen` → AnimatePresence mounts/unmounts overlay → opacity 0→1 / 1→0 over 0.4 s → scroll lock applied/removed via `useEffect`.

## Scaling Considerations

| Scale | Architecture Adjustments |
|-------|--------------------------|
| Launch (static portfolio) | Current architecture is correct. SSG output, no server needed. |
| + Blog content | Add `lib/data/blog-posts.ts` entries. No architecture change. |
| + CMS integration | Replace `lib/data/*.ts` with `lib/cms/*.ts` fetchers. Section Server Components become `async` — zero changes to Client islands. |
| + Booking / e-commerce | Add API routes under `app/api/`. Contact form action already isolated. |

### Scaling Priorities

1. **First bottleneck:** Image performance. Portfolio photos will dominate LCP. Use `next/image` with `sizes` prop from day one — non-negotiable.
2. **Second bottleneck:** Video autoplay on mobile. Background videos degrade performance on slow connections. Add a `prefers-reduced-motion` check and a `connection.effectiveType` check via `useEffect` to swap video for a static poster image.

## Anti-Patterns

### Anti-Pattern 1: Converting Section Components to Client Components

**What people do:** Add `"use client"` to `ServicesSection.tsx` or `WorksSection.tsx` just to add a hover animation.

**Why it's wrong:** The entire section's content — which is static — now ships as client JavaScript instead of pre-rendered HTML. Bundle grows, LCP degrades, no benefit.

**Do this instead:** Wrap only the element that needs animation in a `RevealWrapper` or use a `motion.div` inside a dedicated Client island. Keep the section shell as a Server Component.

### Anti-Pattern 2: Inline Variant Objects

**What people do:** Define `initial={{ opacity: 0, y: 24 }}` `animate={{ opacity: 1, y: 0 }}` inline on every `motion.div`.

**Why it's wrong:** Animation timing diverges across sections over time. Changing the easing curve requires touching 20+ files. Impossible to maintain a consistent premium feel.

**Do this instead:** Import from `lib/animation-variants.ts`. One place to tune.

### Anti-Pattern 3: Multiple useScroll Refs for Process Cards

**What people do:** Give each ProcessCard its own `useScroll` hook and ref, trying to track each card's individual scroll position.

**Why it's wrong:** The stacking effect requires knowing progress through the entire section, not each card individually. Each card needs to know how far through the overall section the user has scrolled to compute its own scale/rotation.

**Do this instead:** One `useScroll` on the container ref in the parent `ProcessCards` component. Pass `scrollYProgress` down to each card as a prop, along with the card's index-based range.

### Anti-Pattern 4: Nesting AnimatePresence Too Deep

**What people do:** Place `AnimatePresence` inside a component that itself unmounts (e.g., inside the overlay it is trying to animate out).

**Why it's wrong:** When the parent unmounts, AnimatePresence has no chance to run the exit animation — the child is gone before exit can play.

**Do this instead:** `AnimatePresence` must live in a component that stays mounted while the child is exiting. In the menu case, `AnimatePresence` belongs in `BottomBar.tsx`, which is always mounted in the layout — never inside `MenuOverlay.tsx` itself.

### Anti-Pattern 5: Video Backgrounds Without Poster Images

**What people do:** `<video autoPlay muted loop>` with no `poster` attribute and no connection check.

**Why it's wrong:** On mobile or slow connections the video loading causes a black flash before the first frame loads. Google PageSpeed penalizes cumulative layout shift and LCP if the video takes time to appear.

**Do this instead:** Always set `poster="/videos/testimonial-poster.jpg"` on every background video element. The poster shows instantly while the video loads.

## Integration Points

### External Services

| Service | Integration Pattern | Notes |
|---------|---------------------|-------|
| Fontshare (Switzer) | `next/font` local download or `<link>` in layout.tsx head | Prefer next/font with `display: swap` to avoid FOUT |
| Google Fonts (Public Sans) | `next/font/google` — `import { Public_Sans } from 'next/font/google'` | Zero-config with next/font, fonts served from Vercel CDN |
| Vercel (deploy) | `vercel.json` with optional `headers` config for cache-control on `/public/videos` | Videos should have long cache TTL |
| Contact form | `app/api/contact/route.ts` POST handler, or Vercel's form handling, or a third-party like Resend | No backend needed for v1 if using a service |

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| Server Section → Client Island | Props only (serializable data) | Never pass functions, Date objects, or class instances as props across the Server/Client boundary |
| layout.tsx → BottomBar | BottomBar imported directly, no props needed | BottomBar reads its own state |
| lib/data → sections | Direct import in Server Components | Do not import lib/data inside Client islands — pass data as props from the Server parent instead |
| animation-variants → islands | Direct import | Fine to import in any Client component |

## Build Order (Dependency Chain)

Build in this order to avoid blocking on unbuilt dependencies:

```
1. Tailwind config + CSS custom properties + fonts (globals.css)
   → Nothing depends on this being done correctly until rendering starts
   → Do this first so every subsequent component looks right immediately

2. lib/animation-variants.ts + lib/data/*.ts
   → All islands depend on animation variants
   → All sections depend on data files

3. app/layout.tsx skeleton (html, body, font classes)
   → Required before any page renders

4. TopNav + BottomBar + MenuOverlay
   → Layout shells that appear on every page
   → Test menu open/close before building sections

5. HeroSection + HeroSelector
   → First visible content, sets the aesthetic tone
   → Gate: confirm animation feel matches reference before proceeding

6. RevealWrapper + StaggerChildren
   → All remaining sections use these primitives

7. PhotoStrip → StatementSection → ProofSection
   → Linear sections, no complex state, fast to build

8. ServicesSection
   → Grid layout, static, no interactivity

9. ProcessSection + ProcessCards
   → Most complex animation — sticky scroll + stacking
   → Build and validate in isolation before integrating into page

10. WhySection (bento) → WorksSection

11. TestimonialsSection + TestimonialCarousel
    → Second most complex — AnimatePresence + video

12. BlogSection → FAQSection + FAQAccordion → CTASection → Footer

13. Additional pages: /portfolio, /contato, /privacidade

14. Responsive polish (mobile breakpoints, touch behavior)

15. Performance pass: next/image audit, video poster images, Lighthouse
```

## Sources

- [Next.js App Router — Server and Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components) — HIGH confidence, official docs
- [Next.js 14 Rendering: Server Components](https://nextjs.org/docs/14/app/building-your-application/rendering/server-components) — HIGH confidence, official docs
- [Motion (Framer Motion) — useScroll](https://motion.dev/docs/react-use-scroll) — HIGH confidence, official docs (note: package rebranded from `framer-motion` to `motion/react` in late 2024)
- [Motion — Scroll Animations](https://motion.dev/docs/react-scroll-animations) — HIGH confidence, official docs
- [Build a Smooth Scroll Cards Parallax with Framer Motion and Next.js](https://blog.olivierlarose.com/tutorials/cards-parallax) — MEDIUM confidence, verified tutorial
- [Resolving Framer Motion Compatibility in Next.js 14: The 'use client' Workaround](https://medium.com/@dolce-emmy/resolving-framer-motion-compatibility-in-next-js-14-the-use-client-workaround-1ec82e5a0c75) — MEDIUM confidence
- [Solving Framer Motion Page Transitions in Next.js App Router](https://www.imcorfitz.com/posts/adding-framer-motion-page-transitions-to-next-js-app-router) — MEDIUM confidence, AnimatePresence pattern reference
- [Card stack scroll — Skiper UI](https://skiper-ui.com/v1/skiper16) — MEDIUM confidence, sticky card reference implementation

---
*Architecture research for: Next.js 14 App Router photographer portfolio (Corazón — Joyce)*
*Researched: 2026-03-28*
