---
phase: 01-foundation
plan: 01
subsystem: ui
tags: [nextjs, typescript, tailwindcss, motion, fonts, next-font]

# Dependency graph
requires: []
provides:
  - Next.js 14 App Router scaffold with TypeScript strict mode
  - Tailwind CSS v3.4 with custom design tokens (bg/gold/dark colors, switzer/sans fonts)
  - Self-hosted Switzer variable font via next/font/local (zero FOUT)
  - Public Sans via next/font/google
  - Root layout with pt-BR lang and both font CSS variables
  - cn() utility (clsx + tailwind-merge) in lib/utils.ts
  - Working dev server and production build
affects: [all subsequent phases — every component depends on these tokens and fonts]

# Tech tracking
tech-stack:
  added:
    - next@14.2.35
    - react@18, react-dom@18
    - typescript@5
    - tailwindcss@3.4.1
    - motion@12.38.0
    - sharp@0.34.5
    - clsx@2.1.1
    - tailwind-merge@3.5.0
    - prettier + prettier-plugin-tailwindcss
    - autoprefixer
  patterns:
    - next/font/local for self-hosted variable fonts (Switzer)
    - next/font/google for Google Fonts (Public Sans)
    - CSS variable pattern for Tailwind font families (--font-switzer, --font-public-sans)
    - cn() utility for conditional class composition
    - Tailwind content array scans app/, components/, lib/ — no dynamic class names

key-files:
  created:
    - app/fonts.ts
    - app/fonts/Switzer-Variable.woff2
    - lib/utils.ts
  modified:
    - package.json
    - tsconfig.json
    - tailwind.config.ts
    - postcss.config.mjs
    - next.config.mjs
    - app/layout.tsx
    - app/page.tsx
    - app/globals.css

key-decisions:
  - "motion v12 installed as 'motion' package (not framer-motion) — imports from 'motion/react'"
  - "Tailwind CSS v3.4 chosen over v4 — v4 CSS-first config breaks next/font CSS variable integration"
  - "Switzer self-hosted via next/font/local — Fontshare CDN incompatible with next/font optimization"
  - "next.config.mjs kept as .mjs (scaffold default) with image/avif + image/webp formats"
  - "autoprefixer added to postcss.config.mjs (missing from create-next-app scaffold)"

patterns-established:
  - "Font loading: localFont for Fontshare fonts, next/font/google for Google Fonts"
  - "Color tokens: bg (#EFE8DC), gold (#C8973A), dark (#1a1a1a) — reference as bg-bg, bg-gold, bg-dark"
  - "Font families: font-switzer for headings, font-sans (Public Sans) for body text"
  - "Class composition: always use cn() from lib/utils.ts, never string concatenation"
  - "Tailwind content array: includes ./components/**/*.{ts,tsx} for future components"

requirements-completed: [FOUND-01, FOUND-02, FOUND-03, FOUND-04]

# Metrics
duration: 4min
completed: 2026-03-28
---

# Phase 01 Plan 01: Foundation Scaffold Summary

**Next.js 14 App Router with Tailwind v3.4 design tokens, self-hosted Switzer variable font, Public Sans, and cn() utility — production build passing**

## Performance

- **Duration:** 4 min
- **Started:** 2026-03-28T05:23:30Z
- **Completed:** 2026-03-28T05:27:40Z
- **Tasks:** 2
- **Files modified:** 12

## Accomplishments
- Next.js 14.2.35 App Router scaffolded with TypeScript strict mode and all required dependencies (motion, sharp, clsx, tailwind-merge)
- Tailwind v3.4 configured with locked design tokens: beige bg (#EFE8DC), gold (#C8973A), dark (#1a1a1a), and both font family CSS variable references
- Switzer variable font self-hosted at `app/fonts/Switzer-Variable.woff2` via next/font/local — zero FOUT, zero CDN requests
- Root layout sets `lang="pt-BR"` and applies both font CSS variables to `<html>` element
- `cn()` utility available in `lib/utils.ts` for conditional class composition across all components

## Task Commits

Each task was committed atomically:

1. **Task 1: Scaffold Next.js 14 and install all dependencies** - `f93feec` (feat)
2. **Task 2: Configure Tailwind tokens, fonts, globals.css, and root layout** - `ee28757` (feat)

## Files Created/Modified
- `package.json` - Next.js 14.2.35 + motion, sharp, clsx, tailwind-merge, prettier-plugin-tailwindcss
- `next.config.mjs` - Image optimization with avif/webp formats and deviceSizes
- `postcss.config.mjs` - tailwindcss + autoprefixer plugins
- `tailwind.config.ts` - Custom color tokens and font family CSS variable references
- `tsconfig.json` - Strict mode enabled, @/* path alias (unchanged from scaffold)
- `app/fonts.ts` - Switzer localFont and Public_Sans Google font exports with CSS variables
- `app/fonts/Switzer-Variable.woff2` - Self-hosted Switzer variable font (43KB)
- `app/layout.tsx` - Root layout: pt-BR lang, both font variables on html, metadata
- `app/globals.css` - Tailwind directives + base body styles (bg-bg, text-dark, font-sans)
- `app/page.tsx` - Validation page showing Switzer heading, Public Sans body, color token circles
- `lib/utils.ts` - cn() utility combining clsx + tailwind-merge

## Decisions Made
- Used `motion` v12 (not `framer-motion`) — imports from `"motion/react"` per project constraint
- Kept Tailwind v3.4 — v4 CSS-first config conflicts with `next/font` CSS variable integration pattern
- Self-hosted Switzer via `next/font/local` — Fontshare CDN cannot be used with `next/font` optimization
- Kept scaffold's `.mjs` extension for `next.config` — functionally equivalent to `.ts`
- Font CSS variable pattern: `--font-switzer` and `--font-public-sans` set on `<html>`, consumed by Tailwind `fontFamily` config

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 2 - Missing Critical] Added autoprefixer to postcss.config.mjs**
- **Found during:** Task 1 (scaffold verification)
- **Issue:** `create-next-app` scaffold omitted autoprefixer from postcss config — only had tailwindcss plugin
- **Fix:** Installed `autoprefixer` as dev dependency and added it to `postcss.config.mjs`
- **Files modified:** `postcss.config.mjs`, `package.json`
- **Verification:** Build passes with both plugins present
- **Committed in:** `ee28757` (Task 2 commit)

---

**Total deviations:** 1 auto-fixed (1 missing critical)
**Impact on plan:** Auto-fix necessary for correct CSS vendor prefix generation. No scope creep.

## Issues Encountered
- `create-next-app@14` cannot scaffold into a directory with non-URL-friendly characters (`Fotógrafo`). Resolved by scaffolding into `C:/temp/nextapp` and copying files to project root.
- The scaffold generated `.mjs` extension for `next.config` instead of `.ts` as the plan expected — kept `.mjs` since it is functionally equivalent.

## Next Phase Readiness
- Dev server ready at localhost:3000 with beige background, Switzer heading, and gold accent circle
- All design tokens and font families available as Tailwind classes throughout the project
- `cn()` utility available for conditional class composition in all components
- Motion v12 installed and ready for animation components in Phase 2+

---
*Phase: 01-foundation*
*Completed: 2026-03-28*
