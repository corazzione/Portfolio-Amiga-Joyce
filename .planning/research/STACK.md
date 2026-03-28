# Stack Research

**Domain:** Premium photographer/videographer portfolio — Next.js 14 App Router
**Researched:** 2026-03-28
**Confidence:** HIGH (core stack locked by project constraints; supporting libraries verified against official docs)

---

## Recommended Stack

### Core Technologies (Locked by Constraint)

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| Next.js | 14.2.x | React framework, SSG/SSR, routing | App Router gives RSC by default — static pages are zero-JS Server Components; Vercel-native with automatic edge deployment, image CDN, and font optimization |
| TypeScript | ^5.x | Type safety | Standard for Next.js 14 — `create-next-app` defaults to TS; catches prop mismatches in animation components early |
| Tailwind CSS | **3.4.x** | Utility-first styling | See v3 vs v4 decision below — v3 is the stable, well-documented choice for this locked Next.js 14 setup |
| Motion (framer-motion) | **^12.x** | Scroll animations, reveal effects, hover states | Rebranded from `framer-motion` in late 2024; `motion/react` import; requires `"use client"` wrapper strategy |

### Supporting Libraries

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `sharp` | ^0.33.x | Image processing for `next/image` | Required on Vercel for on-demand image optimization — install explicitly even though Next.js bundles it, to pin version |
| `plaiceholder` | ^3.x | Generate blur placeholder base64 strings | Use for portfolio grid images — generates tiny blurred preview embedded in page, eliminates content jump on load |
| `clsx` | ^2.x | Conditional className composition | Combine Tailwind classes conditionally (e.g., active nav state, open/closed menu); lighter than `classnames` |
| `tailwind-merge` | ^2.x | Merge Tailwind classes without conflicts | Pair with `clsx` via a `cn()` utility — prevents `text-red-500 text-blue-500` conflicts in shared components |
| `react-intersection-observer` | ^9.x | Trigger scroll-reveal animations | Cleaner than custom `IntersectionObserver` hooks; works with Motion's `whileInView` as an alternative trigger |
| `@vercel/analytics` | ^1.x | Page view analytics | Zero-config on Vercel — add to root layout, no cookies, GDPR-friendly |

### Development Tools

| Tool | Purpose | Notes |
|------|---------|-------|
| ESLint | Code quality | Use `eslint-config-next` — included by `create-next-app`, knows App Router rules |
| Prettier | Formatting | Add `prettier-plugin-tailwindcss` to auto-sort class names — critical for Tailwind readability |
| TypeScript strict mode | Type checking | Enable `"strict": true` in `tsconfig.json` — catches null issues in animation callbacks |

---

## Critical Decision: Tailwind CSS v3 vs v4

**Use Tailwind CSS v3.4.x, not v4.**

Tailwind v4 (released January 2025) is CSS-first — configuration moves from `tailwind.config.js` to `@theme` directives in CSS. The migration path exists but comes with real friction:

- **v4 dropped `tailwind.config.js`** — the font CSS variable integration pattern that `next/font` requires is more complex in v4
- Multiple developers reported having to downgrade from v4 to v3 on Next.js 14 projects due to PostCSS and Turbopack conflicts
- `next/font`'s CSS variable approach is documented against the v3 `fontFamily` config key — works out of the box
- This project has a locked color palette and two specific fonts; v3 handles both cleanly

**The v3 Tailwind config structure for this project:**
```js
// tailwind.config.ts
theme: {
  extend: {
    colors: {
      beige: '#EFE8DC',
      gold: '#C8973A',
      ink: '#1a1a1a',
    },
    fontFamily: {
      switzer: ['var(--font-switzer)', 'sans-serif'],
      sans: ['var(--font-public-sans)', 'sans-serif'],
    },
  },
},
```

---

## Critical Decision: Motion (framer-motion) Package Name

**Install `motion`, not `framer-motion`.**

Framer Motion rebranded to `motion` in late 2024. The `framer-motion` npm package still exists and is maintained, but `motion` is the canonical package going forward. Import paths changed:

- Old (framer-motion): `import { motion } from "framer-motion"`
- New (motion): `import { motion } from "motion/react"`
- Server-safe variant: `import * as motion from "motion/react-client"` (skips client bundle for RSC)

The `motion/react-client` import is the **preferred pattern for this project** — it reduces JS sent to the client by not including the full animation runtime in the RSC pass.

---

## Font Loading Strategy: Switzer + Public Sans

### The Problem with Switzer

Switzer is distributed by Fontshare (https://api.fontshare.com), not Google Fonts. `next/font/google` cannot load it. Using a `<link>` tag to Fontshare's CDN:
- Sends third-party network requests from the browser (privacy, performance hit)
- Blocks font rendering until CDN responds
- Fails `next/font`'s zero-layout-shift guarantee

### Correct Strategy: Download + localFont

1. **Download the Switzer variable font** from https://www.fontshare.com/fonts/switzer — download `Switzer-Variable.woff2` (the variable font file, ~80KB, covers weight 100–900)
2. Place it in `app/fonts/Switzer-Variable.woff2`
3. Use `localFont` from `next/font/local`

```ts
// app/fonts.ts
import localFont from 'next/font/local'
import { Public_Sans } from 'next/font/google'

export const switzer = localFont({
  src: './fonts/Switzer-Variable.woff2',
  variable: '--font-switzer',
  display: 'swap',
  weight: '100 900',  // variable font range
})

export const publicSans = Public_Sans({
  subsets: ['latin'],
  variable: '--font-public-sans',
  display: 'swap',
})
```

```tsx
// app/layout.tsx
import { switzer, publicSans } from './fonts'

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={`${switzer.variable} ${publicSans.variable}`}>
      <body className="font-switzer">{children}</body>
    </html>
  )
}
```

**Why this works:** `next/font/local` self-hosts, preloads, and injects `font-display: swap` automatically. Zero external requests. The CSS variables are then available to Tailwind via the `fontFamily` config.

### Public Sans

Public Sans is on Google Fonts — use `next/font/google` directly. No download needed. Next.js fetches it at build time and self-hosts it.

---

## Image Optimization Strategy

### next/image Configuration

For a photography portfolio, `next/image` is non-negotiable — it handles WebP/AVIF conversion, responsive `srcSet`, lazy loading, and prevents layout shift.

**Key patterns:**

```tsx
// Hero / above-fold images: always priority
<Image src="/hero.jpg" alt="..." fill priority />

// Portfolio grid: lazy + blur placeholder
<Image
  src={photo.src}
  alt={photo.alt}
  fill
  placeholder="blur"
  blurDataURL={photo.blurDataURL}  // pre-generated at build time via plaiceholder
  sizes="(max-width: 768px) 100vw, 33vw"
/>

// Avoid: width/height on fill-mode images (use fill + sizes instead)
```

**Generate blur placeholders at build time:**
```ts
// lib/images.ts — run during data fetching or as a build script
import { getPlaiceholder } from 'plaiceholder'
import fs from 'fs'

const buffer = fs.readFileSync('./public/portfolio/photo.jpg')
const { base64 } = await getPlaiceholder(buffer)
// store base64 in your static data file alongside photo metadata
```

**next.config.js image settings:**
```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],  // AVIF first — 50% smaller than WebP
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    // No remotePatterns needed for static portfolio (all images local)
  },
}
```

### Background Video

The hero and testimonial sections use background video. Do NOT use `next/image` for video. Use a plain `<video>` element with:
- `autoPlay muted loop playsInline` attributes
- `preload="metadata"` (not `auto`) to avoid blocking initial page load
- Serve `.mp4` (H.264) + `.webm` (VP9) variants for browser coverage

---

## Framer Motion / Motion — App Router Strategy

### The Core Problem

Motion components use browser APIs (`window`, `requestAnimationFrame`, DOM measurements). These APIs do not exist during Server-Side Rendering. Next.js App Router renders Server Components on the server — Motion cannot run there.

### The Solution: Thin Client Wrapper Pattern

Create small "motion wrapper" components with `"use client"` at the top. Keep as much logic as possible in Server Components; push only the animated shell down to client.

```tsx
// components/motion/FadeIn.tsx
"use client"
import { motion } from "motion/react"

interface FadeInProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

export function FadeIn({ children, delay = 0, className }: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.22, 1, 0.36, 1],  // cubic-bezier from PROJECT.md spec
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
```

```tsx
// components/motion/StaggerChildren.tsx
"use client"
import { motion } from "motion/react"

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
}
const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
}

export { containerVariants, itemVariants }
```

**The sticky stacked process cards** (one of the two critical animations per PROJECT.md) require `useScroll` + `useTransform` from motion — these are inherently client. Mark the entire process section component as `"use client"`.

**AnimatePresence for the fullscreen mobile menu:** Works correctly for show/hide transitions within a single route. The documented limitation (AnimatePresence doesn't work for page transitions in App Router) does not apply here — the mobile menu mounts/unmounts within the same page.

---

## Vercel Deployment Configuration

### vercel.json

For a Next.js 14 static-leaning portfolio, minimal `vercel.json` is correct. Vercel auto-detects Next.js and applies optimal defaults. Only configure what you need to override:

```json
{
  "framework": "nextjs",
  "buildCommand": "next build",
  "outputDirectory": ".next",
  "headers": [
    {
      "source": "/fonts/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
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

### next.config.js

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
  },
  // Do NOT enable Turbopack for this project — Tailwind v3 PostCSS pipeline
  // is more stable with the default webpack compiler in Next.js 14
}

module.exports = nextConfig
```

---

## Installation

```bash
# Scaffold
npx create-next-app@14 . --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*"

# Core animation library (replaces framer-motion)
npm install motion

# Image optimization utilities
npm install sharp plaiceholder

# Class name utilities
npm install clsx tailwind-merge

# Analytics
npm install @vercel/analytics

# Intersection observer (optional — Motion's whileInView covers most cases)
npm install react-intersection-observer

# Dev dependencies
npm install -D prettier prettier-plugin-tailwindcss
```

---

## Alternatives Considered

| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| Motion v12 (`motion`) | `framer-motion` v10 | Only if a third-party library you depend on pins to `framer-motion` — they coexist but add bundle weight |
| Tailwind CSS v3.4 | Tailwind CSS v4 | New project starting after the Next.js 15 + Turbopack ecosystem fully stabilizes (estimated late 2025) |
| `next/font/local` for Switzer | Fontshare CDN `<link>` tag | Never — CDN link defeats the entire point of font optimization in Next.js |
| `next/font/google` for Public Sans | Self-host Public Sans as localFont | Only if you need offline-first builds or strict no-external-request CI environments |
| Static images in `/public` | External image CDN (Cloudinary, Imgix) | Only if portfolio grows to 100+ photos needing DAM features — overkill for v1 |
| `plaiceholder` | `@plaiceholder/next` | Same package, `plaiceholder` v3 is framework-agnostic and works fine with Next.js |

---

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| `framer-motion` (old package name) | Deprecated in favor of `motion` — still works but won't receive new features | `motion` with `"motion/react"` imports |
| Tailwind v4 | CSS-first config conflicts with `next/font` CSS variable pattern; Turbopack instability in Next.js 14 | Tailwind v3.4.x |
| `<AnimatePresence>` for page transitions | Documented broken in Next.js App Router — relies on internal router methods that can break any release | Per-section reveal animations with `whileInView` instead |
| Fontshare CDN `<link>` for Switzer | Third-party network request blocks rendering, fails privacy requirements of `next/font` | Download Switzer variable font, use `localFont` |
| `next/image` with `domains` config | Deprecated in Next.js 14 in favor of `remotePatterns` | `remotePatterns` (not needed for static-only portfolio) |
| CSS-in-JS (styled-components, emotion) | Requires server-side style injection setup; conflicts with RSC; adds runtime overhead | Tailwind utility classes — zero runtime |
| `react-spring` | Alternative animation library — no benefit over Motion; splits the team's mental model | Motion only |

---

## Version Compatibility Matrix

| Package | Compatible With | Notes |
|---------|----------------|-------|
| `next@14.2.x` | `react@18.x`, `react-dom@18.x` | Do NOT use React 19 with Next.js 14 — requires Next.js 15 |
| `motion@^12.x` | `react@18.2+` | React 18.2 minimum; works with Next.js 14 App Router |
| `tailwindcss@^3.4.x` | `postcss@^8.x`, `autoprefixer@^10.x` | These three always travel together in the devDependencies |
| `plaiceholder@^3.x` | `sharp@^0.33.x` | plaiceholder v3 requires sharp as a peer — install both |
| `@vercel/analytics@^1.x` | `next@14.x` | Works in App Router via `<Analytics />` in root layout |

---

## Stack Patterns: App Router Page Types

**Static pages (/, /portfolio, /privacidade):**
- Server Components at the page level
- No `"use client"` on page files
- Motion wrapper components (`FadeIn`, `StaggerChildren`) are client leaf nodes
- Images: static imports or `/public` paths with `next/image`

**Contact page (/contato):**
- Form needs `"use client"` — uses `useState` for form state
- Or: keep page as Server Component, extract only the `<ContactForm>` as a client component

**No dynamic routes needed in v1** — all content is static, no `[slug]` pages for blog (static cards only per PROJECT.md).

---

## Sources

- https://nextjs.org/docs/14/app/building-your-application/optimizing/fonts — `next/font/local` API, CSS variable + Tailwind integration pattern (HIGH confidence)
- https://motion.dev/docs/react-installation — Current Motion v12 install, `motion/react` and `motion/react-client` imports (HIGH confidence)
- https://motion.dev/docs/react-upgrade-guide — Package rename from `framer-motion` to `motion`, v11 → v12 changes (HIGH confidence)
- https://tailwindcss.com/blog/tailwindcss-v4 — v4 CSS-first configuration, confirmed `tailwind.config.js` removal (HIGH confidence)
- https://nextjs.org/docs/14/app/building-your-application/optimizing/images — `next/image` `formats`, `priority`, `placeholder="blur"` (HIGH confidence)
- https://vercel.com/docs/project-configuration — `vercel.json` schema, `headers`, `buildCommand` (HIGH confidence)
- Medium article on Tailwind v4 → v3 downgrades on Next.js: `https://medium.com/@pradeepgudipati/downgrading-from-tailwind-css-v4-to-v3` — reported real-world friction (MEDIUM confidence — single author, corroborated by multiple similar reports)
- https://github.com/vercel/next.js/issues/49279 — Confirmed `AnimatePresence` page transition breakage in App Router (HIGH confidence — official Next.js repo)

---

*Stack research for: Portfólio Fotógrafa Joyce (Corazón brand)*
*Researched: 2026-03-28*
