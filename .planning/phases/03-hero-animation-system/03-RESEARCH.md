# Phase 3: Hero + Animation System - Research

**Researched:** 2026-03-28
**Domain:** Motion v12 (motion/react), AnimatePresence, useReducedMotion, Next.js 14 App Router hero section
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Hero Background**
- Dark cinematic gradient placeholder (`bg-dark` base with subtle radial overlay) — no video file committed to git
- Video element wired with `src` prop accepting external URL (Vercel Blob / Cloudinary) — currently empty string, renders gradient fallback
- `<video autoPlay muted loop playsInline>` attributes required per HERO-01
- Overlay: `absolute inset-0 bg-dark/40` over video to ensure text contrast

**Text Selector**
- Auto-advance timer: cycles every 3 seconds (no scroll dependency)
- Three strings: `"A Criação"`, `"Videografia"`, `"Fotografia"` — in that order, looping
- `AnimatePresence` with `mode="wait"`: `initial={{ opacity: 0, y: 12 }}` → `animate={{ opacity: 1, y: 0 }}` → `exit={{ opacity: 0, y: -12 }}`
- Duration: 0.4s, easing `[0.22, 1, 0.36, 1]`
- Component: `HeroTextSelector` — `'use client'`, self-contained with `useEffect` interval

**Hero Load Animation**
- Three-element stagger: logo/tagline → selector text → CTA button
- `motion` with `initial={{ opacity: 0, y: 24 }}` → `animate={{ opacity: 1, y: 0 }}` (matches `fadeUp` variant shape)
- Delays: logo 0.2s, selector 0.5s, CTA 0.8s
- `initial` fires on mount (NOT `useInView`) — page-load animation per HERO-05
- Hero layout: `<section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">`

**Hero CTA + Copy**
- Gold CTA button: `bg-gold text-dark font-switzer` — "Ver Portfólio" — links to `#portfolio` anchor
- Tagline: `"MC. // UMA CONTADORA DE HISTÓRIAS VISUAL"` — Switzer, uppercase tracking-widest, white
- The `//` separator must render as `{'//'}` in JSX

**Animation System Hardening**
- `useReducedMotion()` from `motion/react` guards added to `RevealWrapper` AND `StaggerChildren`
- If reduced motion: render children in fully visible state immediately (no animation)
- `scaleIn` variant already exists — expose via `RevealWrapper` `variant` prop (`"fadeUp" | "scaleIn"`, default `"fadeUp"`)

### Claude's Discretion
- Exact hero layout proportions and text sizes (mobile vs desktop)
- Whether selector label "Especializada em" or similar precedes the cycling text
- Desktop centering vs left-aligned hero text layout
- Hover effect on CTA button (scale/brightness)

### Deferred Ideas (OUT OF SCOPE)
- Lenis smooth scroll integration — v2
- Custom cursor — v2
- Scroll-driven text selector (instead of timer) — deferred
- Parallax video effect on hero scroll — Phase 7 or v2
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| HERO-01 | Full-screen (100vh) looping background video (muted, autoplay, playsInline) | Video element pattern with gradient fallback when src is empty; iOS autoplay attributes confirmed |
| HERO-02 | Hero displays "MC. // UMA CONTADORA DE HISTÓRIAS VISUAL" logo/tagline overlay | JSX `{'//'}` pattern confirmed; Switzer token available |
| HERO-03 | Gold CTA button ("Ver Portfólio") in hero | `bg-gold text-dark` token pattern; hover scale/brightness via motion |
| HERO-04 | Animated text selector cycling through "A Criação / Videografia / Fotografia" | `AnimatePresence mode="wait"` + `useEffect` interval pattern documented |
| HERO-05 | Hero text and CTA animate in on page load (not scroll-triggered) | Mount-time animation pattern (no useInView); staggered delays documented |
| ANIM-01 | All content sections reveal on scroll: opacity 0→1, y 24→0, 0.8s cubic-bezier(0.22,1,0.36,1) | `fadeUp` variant already exists in `lib/animation-variants.ts`; `RevealWrapper` upgrade path documented |
| ANIM-02 | Image rows / cards stagger-reveal with 0.1s delay between children | `stagger` variant + `StaggerChildren`/`StaggerItem` already exist; upgrade path documented |
| ANIM-03 | Featured images/cards have scale-in on reveal (scale 0.985→1) | `scaleIn` variant exists; `RevealWrapper` `variant` prop addition researched |
| ANIM-04 | Buttons have gentle hover state | `whileHover` on `motion` element — no new library needed |
| ANIM-05 | Cards/images have subtle hover elevation/scale on mouse enter | Same `whileHover` pattern; `scale: 1.02` or `y: -2` |
| ANIM-06 | All animations respect `prefers-reduced-motion` | `useReducedMotion()` confirmed available in motion v12.38.0; guard pattern documented |
</phase_requirements>

---

## Summary

Phase 3 builds on a fully working foundation (phases 1–2 complete). The animation primitives (`RevealWrapper`, `StaggerChildren`, `lib/animation-variants.ts`) and all Tailwind tokens already exist. This phase upgrades those primitives and adds the hero section.

The two highest-complexity tasks are: (1) the `HeroTextSelector` component — it must cycle text using `AnimatePresence mode="wait"` to guarantee exit animations complete before enter begins, combined with a `useEffect` interval with proper cleanup; and (2) the `useReducedMotion` hardening of both wrapper components, which requires conditional logic to bypass all motion when the OS accessibility flag is set. Both are well-supported by motion v12.38.0's API (confirmed from installed package).

The hero itself is architecturally straightforward: it is a single `'use client'` component (`HeroSection`) containing a background video element with a CSS gradient fallback, static overlay text, and the `HeroTextSelector` island. Page-load entrance animations use direct `motion` props with explicit `initial`/`animate` and `transition.delay` — no `useInView`, no `AnimatePresence` needed for the entrance sequence.

**Primary recommendation:** Build in four discrete steps: (1) upgrade `RevealWrapper` + `StaggerChildren` with reduced-motion guard and variant prop, (2) build `HeroTextSelector` in isolation and verify the AnimatePresence slide transition, (3) build `HeroSection` wrapper with video/gradient background, (4) wire entrance animations with staggered delays.

---

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| `motion/react` | 12.38.0 (installed) | All animation — variants, AnimatePresence, useReducedMotion | Project-locked in Phase 1; confirmed export of all needed APIs |
| Next.js 14 | 14.x (installed) | App Router, SSR/SSG, layout | Project foundation |
| Tailwind CSS | 3.4 (installed) | All styling; `bg-dark`, `bg-gold`, `font-switzer` tokens available | Project-locked; tailwind.config.ts verified |
| TypeScript | 5.x (installed) | All component types | Project standard |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| React `useEffect` / `useRef` | Built-in | Interval timer, ref attachment | HeroTextSelector interval; video ref |
| `cn()` from `lib/utils.ts` | Local utility | Conditional Tailwind class composition | Any component with conditional classes |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| `AnimatePresence mode="wait"` | CSS transition on opacity only | CSS cannot sequence exit-then-enter; words would overlap mid-transition |
| `useReducedMotion()` hook | CSS `@media (prefers-reduced-motion)` | Hook approach keeps logic in component; CSS approach requires separate stylesheet rules; hook is the motion/react idiomatic solution |
| Single `HeroSection` client component | Server wrapper + client island | Given the hero needs `useEffect` for the interval AND mount-time animation, a single `'use client'` component is simpler; no Server Component benefit here |

**Installation:** No new packages needed. All dependencies are already installed.

**Version verification:** motion 12.38.0 installed and confirmed. `useReducedMotion`, `AnimatePresence`, `usePresence` all verified as exports of `motion/react`.

---

## Architecture Patterns

### Recommended File Structure for Phase 3

```
components/
├── hero/
│   ├── HeroSection.tsx        # 'use client' — full hero, owns video + layout
│   └── HeroTextSelector.tsx   # 'use client' — isolated cycling text component
├── motion/
│   ├── RevealWrapper.tsx      # UPGRADE: add variant prop + useReducedMotion
│   └── StaggerChildren.tsx    # UPGRADE: add useReducedMotion guard
app/
└── page.tsx                   # Replace placeholder with <HeroSection />
lib/
└── animation-variants.ts      # NO CHANGES — fadeUp, scaleIn, stagger all present
```

### Pattern 1: Mount-Time Entrance Animation (No useInView)

**What:** Use `motion` with explicit `initial` / `animate` props and `transition.delay` to fire on component mount. No `useInView`, no `AnimatePresence` needed.

**When to use:** Page-load hero entrance — elements should animate in the moment the page renders, regardless of scroll position.

**Example:**
```tsx
// Source: motion/react docs + project variant shape
import { motion } from 'motion/react'

// Logo/tagline
<motion.div
  initial={{ opacity: 0, y: 24 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
>
  MC. {'//'}  UMA CONTADORA DE HISTÓRIAS VISUAL
</motion.div>

// Selector (contains HeroTextSelector)
<motion.div
  initial={{ opacity: 0, y: 24 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
>
  <HeroTextSelector />
</motion.div>

// CTA
<motion.div
  initial={{ opacity: 0, y: 24 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.8 }}
>
  <button className="bg-gold text-dark font-switzer ...">Ver Portfólio</button>
</motion.div>
```

**Why not use variants here:** The stagger delays are fixed and intentional (0.2/0.5/0.8s editorial pacing). Variant `staggerChildren` uses equal 0.1s gaps. Manual delays give editorial control.

### Pattern 2: AnimatePresence mode="wait" for Text Selector

**What:** `AnimatePresence` with `mode="wait"` guarantees the exit animation of the outgoing text completes before the entering text's animation begins. Without `mode="wait"`, both enter and exit play simultaneously — text overlaps.

**When to use:** Any cycling text display where old and new content must not visually overlap.

**Example:**
```tsx
'use client'
import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'motion/react'

const ITEMS = ['A Criação', 'Videografia', 'Fotografia']

export function HeroTextSelector() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % ITEMS.length)
    }, 3000)
    return () => clearInterval(timer)   // cleanup on unmount
  }, [])                                // empty deps — interval is stable

  return (
    <div className="relative overflow-hidden" style={{ minHeight: '1.2em' }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={ITEMS[index]}            // key change triggers AnimatePresence
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="block"
        >
          {ITEMS[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}
```

**Critical detail:** The `key` prop MUST be `ITEMS[index]` (the string value), not the `index` number. If index 0 appears again after cycling through all three, the same key reappears — the string key forces a fresh mount/unmount every time. However, since three distinct strings loop, either key works. Using the string is more semantically correct and handles edge cases if strings are reordered.

**Container sizing:** Wrap in a container with `overflow-hidden` and a `minHeight` matching the text line-height, or the exit animation (y: -12) will clip visibly against sibling elements.

### Pattern 3: useReducedMotion Guard in RevealWrapper and StaggerChildren

**What:** Call `useReducedMotion()` at the top of the component. If it returns `true`, skip all animation by rendering children in the immediately-visible state.

**When to use:** All animation wrapper components — required for ANIM-06 accessibility compliance.

**Verified API:** `useReducedMotion` is exported from `motion/react` 12.38.0 (confirmed from installed package). Returns `boolean | undefined` — treat `undefined` as `false` (animation allowed).

**Example — RevealWrapper upgrade:**
```tsx
'use client'
import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import { fadeUp, scaleIn } from '@/lib/animation-variants'
import { cn } from '@/lib/utils'

const VARIANTS = { fadeUp, scaleIn }

interface RevealWrapperProps {
  children: React.ReactNode
  delay?: number
  className?: string
  variant?: 'fadeUp' | 'scaleIn'
}

export function RevealWrapper({
  children,
  delay = 0,
  className,
  variant = 'fadeUp',
}: RevealWrapperProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -40px 0px' })
  const prefersReduced = useReducedMotion()

  // Reduced motion: render visible immediately, no animation
  if (prefersReduced) {
    return <div ref={ref} className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      variants={VARIANTS[variant]}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
```

**Example — StaggerChildren upgrade:**
```tsx
'use client'
import { motion, useInView, useReducedMotion } from 'motion/react'
import { useRef } from 'react'
import { stagger, fadeUp } from '@/lib/animation-variants'

export function StaggerChildren({ children, className }: StaggerChildrenProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -40px 0px' })
  const prefersReduced = useReducedMotion()

  if (prefersReduced) {
    return <div ref={ref} className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      variants={stagger}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// StaggerItem unchanged — it inherits from parent variants
export function StaggerItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return <motion.div variants={fadeUp} className={className}>{children}</motion.div>
}
```

**Note on `prefersReduced` value:** `useReducedMotion()` returns `boolean | undefined`. The `if (prefersReduced)` check treats `undefined` as falsy, which is the correct default (animate unless explicitly opted out). No explicit `=== true` check needed.

### Pattern 4: Hero Background — Video with Gradient Fallback

**What:** A `<video>` element absolutely positioned behind all content. When `src` is an empty string, the `<video>` element renders but does not display (transparent) — the gradient container behind it acts as the fallback.

**When to use:** This phase only — hero section background.

**Example:**
```tsx
// Gradient always visible behind video
<section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">

  {/* Gradient fallback — always rendered */}
  <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark/90 to-dark" />

  {/* Video — only visible when src resolves */}
  {videoSrc && (
    <video
      autoPlay
      muted
      loop
      playsInline
      className="absolute inset-0 w-full h-full object-cover"
    >
      <source src={videoSrc} type="video/mp4" />
    </video>
  )}

  {/* Overlay for text contrast */}
  <div className="absolute inset-0 bg-dark/40" />

  {/* Content */}
  <div className="relative z-10 ...">
    ...
  </div>
</section>
```

**Important:** Conditional render `{videoSrc && ...}` is cleaner than always rendering an empty `<source>` — an empty src causes a browser network request for an empty URL which logs a console error.

### Pattern 5: Button Hover Animations

**What:** `whileHover` prop on a `motion` element for CTA and card hover states. No CSS `transition` classes — let motion own all animation on animated elements (avoids Tailwind/Motion conflict).

**When to use:** ANIM-04 (button hover) and ANIM-05 (card hover).

**Example:**
```tsx
// CTA button
<motion.button
  whileHover={{ scale: 1.04, brightness: 1.08 }}
  whileTap={{ scale: 0.97 }}
  transition={{ duration: 0.2 }}
  className="bg-gold text-dark font-switzer px-8 py-4 rounded-md font-bold uppercase tracking-widest text-xs"
>
  Ver Portfólio
</motion.button>

// Card hover — subtle lift
<motion.div
  whileHover={{ y: -3, boxShadow: '0 12px 40px rgba(0,0,0,0.12)' }}
  transition={{ duration: 0.25 }}
>
  {/* card content */}
</motion.div>
```

### Anti-Patterns to Avoid

- **Don't use `useInView` for hero entrance:** The hero is always in view on load. `inView` would be `true` immediately and the animation would still fire — but the pattern creates unnecessary coupling to viewport detection. Use direct `animate` prop instead.
- **Don't forget `key` on AnimatePresence child:** Without a changing `key`, AnimatePresence cannot detect that the child has changed and will not trigger exit/enter animations.
- **Don't set `mode="sync"` for the text selector:** `mode="sync"` runs enter and exit simultaneously — text overlaps. `mode="wait"` is required for the sequential slide effect.
- **Don't use `mode="wait"` for the testimonial carousel (Phase 5):** The testimonial carousel wants overlap/crossfade. `mode="sync"` is correct there. Each use case is different.
- **Don't animate `height` or `top` in the text selector:** Only animate `opacity` and `y` (transform). Animating layout properties forces reflow on every frame.
- **Don't keep `transition` on the `motion.div` when also using `variants`:** The `transition` prop at the element level overrides variant-defined transitions. Either define `transition` in the variant object, or on the element — not both.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Exit animation before unmount | Manual CSS class toggle | `AnimatePresence` from `motion/react` | CSS cannot defer unmount until animation completes; hand-rolled solutions require timers and race conditions |
| Reduced motion detection | `window.matchMedia('prefers-reduced-motion')` listener | `useReducedMotion()` from `motion/react` | Hook handles SSR (returns `false` server-side), media query change events, and React lifecycle correctly |
| Interval cleanup | Any pattern other than `return () => clearInterval(timer)` in `useEffect` | Standard `useEffect` cleanup | React strict mode double-invokes effects — cleanup is mandatory to prevent duplicate intervals |
| Text cycling animation | CSS keyframes | `AnimatePresence mode="wait"` | CSS cannot sequence exit → enter with a gap; keyframes would require complex timing coordination |

**Key insight:** Motion v12 has already solved every animation timing problem this phase touches. The only custom logic needed is the `setInterval` counter and the `if (prefersReduced)` early return.

---

## Common Pitfalls

### Pitfall 1: AnimatePresence Not Triggering on Text Change

**What goes wrong:** Text selector cycles (state updates) but no animation plays — text just swaps instantly.

**Why it happens:** The `key` prop on the `motion` element inside `AnimatePresence` is not changing, or `AnimatePresence` is not a direct parent of the animated child.

**How to avoid:**
- `key={ITEMS[index]}` must be on the direct child of `AnimatePresence`
- `AnimatePresence` must wrap the element that mounts/unmounts — not a grandparent
- Verify the element is actually unmounting by checking that `exit` animation runs

**Warning signs:** Animation plays on first render but never again; `exit` never fires.

### Pitfall 2: Hero Entrance Fires Before Fonts Load

**What goes wrong:** The entrance animation starts at `delay: 0.2s`, but Switzer font hasn't loaded yet. Text flashes in system fallback, then jumps to Switzer mid-animation.

**Why it happens:** CSS custom properties from `next/font/local` inject as `<style>` in `<head>`, but font file loading is asynchronous. In dev mode this is less noticeable; in production the font is preloaded by Next.js and loads before first paint.

**How to avoid:** Since `next/font/local` with `preload: true` is already configured from Phase 1, this should not be an issue in production. Do NOT add an artificial delay to "wait for fonts" — that would make the entrance feel sluggish. Trust the preload.

**Warning signs:** FOUT visible in dev with CPU throttling; does not occur in production builds.

### Pitfall 3: Duplicate Interval in Strict Mode

**What goes wrong:** In development, the text selector advances twice as fast (every 1.5s instead of 3s) because two intervals are running.

**Why it happens:** React 18 Strict Mode double-invokes `useEffect`. If the cleanup function is missing or incorrect, the first interval is never cleared when the second one starts.

**How to avoid:**
```tsx
useEffect(() => {
  const timer = setInterval(() => {
    setIndex((prev) => (prev + 1) % ITEMS.length)
  }, 3000)
  return () => clearInterval(timer)  // THIS IS MANDATORY
}, [])
```
The empty dependency array `[]` is correct — `ITEMS.length` is a constant. `setIndex` with a functional updater `(prev) => ...` avoids stale closure.

**Warning signs:** Cycling happens at double speed in `next dev`; normal in production build.

### Pitfall 4: Text Selector Layout Shift During Animation

**What goes wrong:** As the cycling text animates out (moves up) and new text animates in (from below), surrounding elements jump up and down because the container height changes between short and long strings.

**Why it happens:** The container wrapping `AnimatePresence` has `height: auto` and the different strings have different widths (A Criação vs Videografia vs Fotografia at large font sizes).

**How to avoid:**
- Set a `minHeight` on the container matching the tallest expected string's line height
- Or use `position: absolute` on the animated `motion.span` inside a relatively-positioned container of fixed height
- The container with `overflow-hidden` prevents the exit animation (y: -12) from causing paint outside bounds

### Pitfall 5: video Element src="" Causes Console Error

**What goes wrong:** Browser logs `GET http://localhost:3000/ net::ERR_ABORTED` or similar when `src=""` is on a `<source>` element.

**Why it happens:** An empty string src is a valid relative URL pointing to the current page. The browser attempts to load it as a media resource and fails.

**How to avoid:** Use conditional rendering: `{videoSrc && <video>...</video>}`. Only mount the video element when a real URL is available.

### Pitfall 6: HeroSection Needs 'use client' Even Without Hooks

**What goes wrong:** `HeroSection` is written as a Server Component (no directive), but imports `HeroTextSelector` which is a Client Component. This is actually fine in Next.js 14 — a Server Component can import and render a Client Component. However, if `HeroSection` itself uses any hook (e.g., for the mount animation), it must be a Client Component.

**How to avoid:**
- `HeroSection` contains `motion` elements for the entrance animations → it must be `'use client'`
- Alternatively, extract the entrance animation wrappers into a separate client component, making `HeroSection` a Server Component shell
- Given that this is the hero (always client-rendered, no SEO-critical text beyond what's in the HTML markup), keeping it as a single `'use client'` component is the simpler choice and matches the CONTEXT.md decision

---

## Code Examples

Verified patterns from official sources and existing codebase:

### useReducedMotion — Verified API (motion/react 12.38.0)
```tsx
// Source: confirmed export from installed motion/react package
import { useReducedMotion } from 'motion/react'

function MyComponent() {
  const prefersReduced = useReducedMotion()
  // Returns: boolean | undefined
  // undefined = SSR/unknown, treat as false (allow animation)
  // true = user has enabled prefers-reduced-motion
  // false = no reduced motion preference
}
```

### AnimatePresence mode="wait"
```tsx
// Source: motion.dev/docs/react-animate-presence
import { AnimatePresence, motion } from 'motion/react'

<AnimatePresence mode="wait">
  <motion.span
    key={currentValue}  // MUST change when content changes
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -12 }}
    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
  >
    {currentValue}
  </motion.span>
</AnimatePresence>
```

### useEffect Interval with Cleanup
```tsx
// Source: React docs — effects with cleanup
useEffect(() => {
  const timer = setInterval(() => {
    setIndex((prev) => (prev + 1) % ITEMS.length)
  }, 3000)
  return () => clearInterval(timer)
}, [])
// Note: functional updater (prev =>) avoids stale closure on index
```

### Existing Variants (lib/animation-variants.ts — actual file content)
```ts
// fadeUp: opacity 0→1, y 24→0, 0.8s [0.22,1,0.36,1]
// scaleIn: opacity 0→1, scale 0.985→1, 0.8s [0.22,1,0.36,1]
// stagger: staggerChildren 0.1s
// spring: { type: 'spring', stiffness: 200, damping: 30 }
// All use "hidden" / "visible" key names — RevealWrapper must use these exact keys
```

### Hero Section Tailwind Layout (from index.html reference)
```
min-height: 100vh
display: flex; flex-direction: column; align-items: center; justify-content: center
padding: 80px 24px 100px (top/bottom offset to clear TopNav and BottomBar)

Text selector active state: clamp(40px, 7vw, 88px), letter-spacing: -0.03em
Text selector inactive items: clamp(14px, 2vw, 18px), opacity 30%, font-weight 500
```

**Note on index.html selector design:** The HTML mockup shows ALL three items stacked vertically (active item large, inactive items small above/below). The CONTEXT.md decision uses `AnimatePresence` to show only ONE item at a time cycling. These are different designs. The locked CONTEXT.md decision takes precedence — implement as single cycling item, not a three-item stack.

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `import { motion } from 'framer-motion'` | `import { motion } from 'motion/react'` | Motion v12 (late 2024) | Package rename; API identical but import path changed — critical to get right or build fails |
| `whileInView` prop on motion.div | `useInView` hook + `animate={inView ? 'visible' : 'hidden'}` | Current project choice | More explicit control; supports variant system; chosen in Phase 1 |
| `AnimatePresence` for page transitions in App Router | Per-section animations only | Next.js 14 App Router broke this | AnimatePresence at layout level does not work; only use within components |

**Deprecated/outdated:**
- `framer-motion` package name: Project locked to `motion/react` — never use the old name
- String attribute `autoplay` on video: Use camelCase React prop `autoPlay` — string attribute is ignored in JSX

---

## Open Questions

1. **Selector label prefix**
   - What we know: CONTEXT.md marks "Whether selector label 'Especializada em' precedes the cycling text" as Claude's Discretion
   - What's unclear: The index.html mockup shows no prefix label — just the cycling text at large size. Adding "Especializada em" above would change the layout significantly.
   - Recommendation: Do not add a prefix label unless the visual review after implementation looks sparse. The large cycling text at clamp(40px, 7vw, 88px) is the primary visual statement.

2. **TopNav transparency over hero**
   - What we know: Phase 2 implemented TopNav with scroll-based transparency toggle. The hero background is dark (`bg-dark` gradient).
   - What's unclear: TopNav text/logo color when transparent over a dark hero — if TopNav defaults to dark text on transparent, it will be invisible against the dark hero background.
   - Recommendation: The planner should verify the TopNav component's default text color and ensure it uses white/light text when transparent (or reads the background color). This is a cross-phase integration concern.

3. **HeroSection location in component tree**
   - What we know: CONTEXT.md says `components/hero/HeroSection.tsx` and `components/hero/HeroTextSelector.tsx` are new files. ARCHITECTURE.md specifies `components/sections/HeroSection.tsx` and `components/islands/HeroSelector.tsx`.
   - What's unclear: Which path wins — CONTEXT.md (closer to phase) or ARCHITECTURE.md (system design)?
   - Recommendation: Use `components/hero/` as specified in CONTEXT.md. CONTEXT.md is the authoritative per-phase decision source.

---

## Validation Architecture

`nyquist_validation` is enabled in `.planning/config.json`.

### Test Framework

| Property | Value |
|----------|-------|
| Framework | None installed (Jest/Vitest not present in package.json) |
| Config file | None — Wave 0 must create |
| Quick run command | `npx vitest run --reporter=verbose` (after Wave 0 setup) |
| Full suite command | `npx vitest run` |

### What Can Be Unit Tested (Automated)

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| ANIM-01/03 | `lib/animation-variants.ts` exports `fadeUp`, `scaleIn`, `stagger`, `spring` with correct shape | unit | `npx vitest run __tests__/animation-variants.test.ts` | ❌ Wave 0 |
| ANIM-06 | `RevealWrapper` renders children in non-animated `<div>` when `useReducedMotion` returns `true` | unit | `npx vitest run __tests__/RevealWrapper.test.tsx` | ❌ Wave 0 |
| ANIM-06 | `StaggerChildren` renders children in non-animated `<div>` when `useReducedMotion` returns `true` | unit | `npx vitest run __tests__/StaggerChildren.test.tsx` | ❌ Wave 0 |
| HERO-04 | `HeroTextSelector` renders the first string on mount | unit | `npx vitest run __tests__/HeroTextSelector.test.tsx` | ❌ Wave 0 |
| HERO-04 | `HeroTextSelector` interval cleanup: `clearInterval` called on unmount | unit | `npx vitest run __tests__/HeroTextSelector.test.tsx` | ❌ Wave 0 |
| ANIM-03 | `RevealWrapper` renders `motion.div` with `scaleIn` variants when `variant="scaleIn"` is passed | unit | `npx vitest run __tests__/RevealWrapper.test.tsx` | ❌ Wave 0 |

### What Requires Visual / Manual Verification

| Req ID | Behavior | Why Manual |
|--------|----------|------------|
| HERO-01 | Background video plays (looping, muted) when a real src URL is provided | Requires external URL and browser video API — not unit testable |
| HERO-01 | Gradient fallback visible when src is empty | Requires browser rendering |
| HERO-02 | "MC. `{'//'}` UMA CONTADORA DE HISTÓRIAS VISUAL" renders correctly with `//` separator | JSX rendering correctness — verify in browser that `{'//'}` displays as `//` not as empty |
| HERO-03 | Gold CTA button hover state (scale/brightness) feels correct | Animation feel is subjective |
| HERO-04 | Text slides out upward (y: -12) and new text slides in from below (y: 12→0) with no overlap | AnimatePresence mode="wait" visual — timing feels editorial |
| HERO-05 | Staggered entrance: logo at 0.2s, selector at 0.5s, CTA at 0.8s — feels composed, deliberate | Timing perception is subjective |
| ANIM-01 | fadeUp animation on scroll-entering elements feels smooth at 0.8s | Animation feel |
| ANIM-04/05 | Button/card hover states respond at correct scale and feel premium not cheap | Interaction feel |
| ANIM-06 | With OS "Reduce Motion" enabled: zero motion, all content immediately visible | Requires OS accessibility setting to be toggled |

### Suggested Test File Paths

```
__tests__/
├── animation-variants.test.ts    # Export shape, variant key names, transition values
├── RevealWrapper.test.tsx         # variant prop, reduced-motion branch, default fadeUp
├── StaggerChildren.test.tsx       # reduced-motion branch renders plain div
└── HeroTextSelector.test.tsx      # Initial render, interval setup, cleanup on unmount
```

### Wave 0 Gaps

- [ ] `vitest` and `@testing-library/react` need to be installed
- [ ] `vitest.config.ts` or `vitest.config.js` — test runner config
- [ ] `__tests__/animation-variants.test.ts` — covers ANIM-01, ANIM-03 variant exports
- [ ] `__tests__/RevealWrapper.test.tsx` — covers ANIM-06, ANIM-03 (variant prop)
- [ ] `__tests__/StaggerChildren.test.tsx` — covers ANIM-06
- [ ] `__tests__/HeroTextSelector.test.tsx` — covers HERO-04 (mount render, cleanup)

**Note on testing motion components:** To test `useReducedMotion` behavior, the test must mock the hook. With Vitest: `vi.mock('motion/react', () => ({ useReducedMotion: () => true, ... }))`. Alternatively, test the rendered output and assert that no `motion.div` is present (only a plain `div`).

---

## Sources

### Primary (HIGH confidence)
- `motion/react` 12.38.0 — installed package; verified `useReducedMotion`, `AnimatePresence`, `usePresence` exports via `node -e require()`
- `E:/Fotógrafo/lib/animation-variants.ts` — actual file; fadeUp, scaleIn, stagger, spring shapes confirmed
- `E:/Fotógrafo/components/motion/RevealWrapper.tsx` — actual file; current props interface and animation pattern
- `E:/Fotógrafo/components/motion/StaggerChildren.tsx` — actual file; current implementation
- `E:/Fotógrafo/tailwind.config.ts` — actual file; `bg-dark`, `bg-gold`, `font-switzer` tokens confirmed
- `E:/Fotógrafo/.planning/phases/03-hero-animation-system/03-CONTEXT.md` — locked decisions for this phase
- `E:/Fotógrafo/.planning/research/ARCHITECTURE.md` — AnimatePresence patterns, component architecture
- `E:/Fotógrafo/.planning/research/PITFALLS.md` — iOS autoplay, AnimatePresence placement rules, reduced motion

### Secondary (MEDIUM confidence)
- `E:/Fotógrafo/index.html` — HTML mockup; hero text sizes (clamp values), layout structure, color tokens — verified against Tailwind config
- `motion.dev/docs` — AnimatePresence `mode` options; useReducedMotion return type

### Tertiary (LOW confidence)
- None

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all libraries verified from installed packages
- Architecture: HIGH — derived from existing files + locked CONTEXT.md decisions
- Pitfalls: HIGH — majority sourced from PITFALLS.md (already researched) + new hero-specific pitfalls from code analysis
- Animation patterns: HIGH — `useReducedMotion` and `AnimatePresence` APIs confirmed from installed package

**Research date:** 2026-03-28
**Valid until:** 2026-04-28 (stable Motion v12 API; 30-day window)
