# Phase 4: Static Content Sections - Context

**Gathered:** 2026-03-28
**Status:** Ready for planning
**Source:** Auto mode (--auto) — all decisions are recommended defaults

<domain>
## Phase Boundary

All homepage sections from the photo strip through the footer are implemented and wired into `app/page.tsx`. This phase builds 10 sections (SECT-01 through SECT-10) plus card hover states (ANIM-05). Complex interactive sections (sticky process cards, testimonial carousel) are Phase 5 — they appear in this page as placeholders only.

</domain>

<decisions>
## Implementation Decisions

### Section Architecture
- Each section lives in `components/sections/` as its own file (e.g., `PhotoStripSection.tsx`, `ManifestoSection.tsx`)
- Server Components by default; only sections needing client interactivity get `'use client'` (FAQ accordion only)
- Shared spacing pattern: `py-24 px-6` on sections, `max-w-7xl mx-auto` on inner containers
- All sections imported and stacked in `app/page.tsx` (which stays a Server Component)
- Use `RevealWrapper` and `StaggerChildren`/`StaggerItem` (already upgraded with reduced-motion guard) for all scroll reveals

### Photo Strip (SECT-01)
- Horizontal strip of thumbnail images below the hero
- Layout: `flex gap-4 overflow-x-auto` or CSS grid — no JS scroll library (deferred to v2)
- Images: `next/image` with fixed aspect ratio `aspect-[4/3]` — placeholder via `bg-dark/10` div since real images not yet available
- RevealWrapper on the strip container with `variant="scaleIn"` for entrance

### Manifesto / Statement Text (SECT-02)
- Large centered editorial text block: `"Cada imagem conta uma história. Cada projeto começa com uma conversa."` — or similar from index.html reference
- Switzer font, large (4xl–6xl), centered, beige background
- RevealWrapper with `fadeUp`

### CTA / Proof Strip (SECT-03)
- "Meu Portfólio" gold button left, stacked avatar cluster center (3 circular avatar placeholder divs), client logos right (theo, Amsterdam, luminous, MILANO)
- Client logos: render text-based placeholders (real SVGs at `/images/logos/*.svg` — use plain `<img>` with `alt`; placeholder text if files not found)
- Layout: `flex items-center justify-between gap-8` responsive

### Services Section (SECT-04, SECT-05)
- Heading "Meus Serviços" left + "Ver Todos" button right — heading row above the grid
- 4-column grid (`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6`) of white cards (`bg-white rounded-2xl p-6 shadow-sm`)
- 7 service cards from `lib/data.ts` services array + 1 photo card (dark card with placeholder image)
- `StaggerChildren` wrapping the grid, `StaggerItem` per card — stagger 0.1s (satisfies ANIM-02)
- Each card: icon (emoji from data), title (Switzer medium), description (font-sans text-dark/70)

### Card Hover States (ANIM-05)
- ALL cards (service, portfolio, blog) use `motion.div` with `whileHover={{ scale: 1.02, y: -4 }}` and `transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}`
- This satisfies ANIM-05 re-assigned from Phase 3 (cards first appear in this phase)
- Images use `whileHover={{ scale: 1.05 }}` on the `motion.div` wrapper (not next/image directly)

### Portfolio Grid (SECT-06)
- "Trabalhos Selecionados" heading
- 3-column grid (`grid-cols-1 md:grid-cols-3 gap-6`) with image + caption per item
- Placeholder: `bg-dark/10 aspect-[3/4] rounded-xl` with caption below
- StaggerChildren + StaggerItem, whileHover on each card

### Blog Section (SECT-07)
- "Últimas Histórias" heading
- 3 blog cards from `lib/data.ts` blogPosts with horizontal `<hr>` separators between them (not around them)
- Each card: category tag, title, excerpt, date — NO grid, stacked list with separators
- RevealWrapper per card with staggered delays

### FAQ Section (SECT-08)
- "Alguma Dúvida?" title left, accordion right — two-column layout on desktop (`grid grid-cols-1 lg:grid-cols-2 gap-12`)
- Pure React `useState` — single accordion open at a time (`openId: string | null`)
- Motion `animate={{ height: isOpen ? 'auto' : 0 }}` with `overflow-hidden` for expand/collapse (0.3s ease)
- 4 questions from `lib/data.ts` faqItems
- `'use client'` directive on FAQSection component only

### CTA Section (SECT-09)
- "Transforme Suas Ideias em Visuais de Outro Nível" heading (Switzer, 4xl–5xl)
- "Entre em Contato" gold button linking to `/contato`
- Standing model/photographer figure: `absolute` positioned image at bottom-right — placeholder div since real asset not yet available
- Dark background (`bg-dark`) section for contrast

### Footer (SECT-10)
- White card (`bg-white rounded-3xl mx-6 mb-6`) on beige background (`bg-bg`)
- Content: "Corazón" Switzer bold, Portuguese tagline, X + Instagram icon links, "Explorar" nav links (Início, Portfólio, Contato), "Privacidade" legal link, "Criado por Markus Corazzione", "MC. © 2026"
- Social links: SVG icons or Unicode — X (✕) and Instagram (📷) — use simple text icons until real SVGs provided
- Server Component (no interactivity)

### Image / Placeholder Strategy
- `next/image` for all actual images — wrap with fixed-dimension parent div
- For placeholder images: `<div className="bg-dark/10 w-full aspect-[4/3] rounded-xl" />` — no broken image icons
- Client logos: render name text (`<span>`) if SVG file doesn't exist at path — graceful fallback
- No images committed to git — real photo assets provided by Joyce later

### Claude's Discretion
- Exact manifesto text (use index.html reference for Portuguese copy)
- Exact number/style of avatar placeholder circles in proof strip (3 overlapping circles)
- Icon treatment for service cards (keep emoji from data.ts for now, easy to swap later)
- Portfolio grid item data (create 6 static placeholder items inline — no data.ts needed since portfolio is Phase 6)
- Exact CTA section figure placement and proportions

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Requirements
- `.planning/REQUIREMENTS.md` — SECT-01 through SECT-10 (all homepage sections), ANIM-05 (card hover)

### Visual reference
- `index.html` — Complete HTML mockup; inspect each section for exact Portuguese copy, section class names, layout structure, and color usage

### Foundation (prior phase outputs)
- `app/page.tsx` — Integration point: all sections appended here
- `lib/data.ts` — All content data (services, blogPosts, faqItems, clientLogos arrays) — read before implementing sections
- `components/motion/RevealWrapper.tsx` — Upgraded with variant prop; use for single-element scroll reveals
- `components/motion/StaggerChildren.tsx` — Upgraded with reduced-motion guard; use for card grids
- `lib/animation-variants.ts` — `fadeUp`, `scaleIn`, `stagger` — do not duplicate
- `lib/utils.ts` — `cn()` for conditional Tailwind
- `tailwind.config.ts` — `bg-bg`, `bg-dark`, `bg-gold`, `text-dark`, `font-switzer`, `font-sans` tokens

### Architecture patterns
- `.planning/research/ARCHITECTURE.md` — Component hierarchy, Server vs Client split

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `lib/data.ts`: All typed content arrays ready — services (7), processSteps (6), testimonials (3), blogPosts (3), faqItems (4), clientLogos (4)
- `components/motion/RevealWrapper.tsx`: `variant="fadeUp"|"scaleIn"` + `delay` prop — use on section containers
- `components/motion/StaggerChildren.tsx` + `StaggerItem`: wrap card grids for staggered entrance
- `lib/utils.ts`: `cn()` utility for conditional Tailwind composition
- `lib/animation-variants.ts`: `fadeUp`, `scaleIn`, `stagger` — import from here, never redefine

### Established Patterns
- Motion imports: `from 'motion/react'` only — never framer-motion
- `'use client'` only where needed (FAQ only in this phase)
- Section spacing: `py-24 px-6` on section, `max-w-7xl mx-auto` on inner
- Font: Switzer for headings/display, Public Sans for body — both inherited from `<html>`
- Tailwind card: `bg-white rounded-2xl p-6 shadow-sm` — white card on beige bg pattern
- Build must pass: `npm run build` exits 0 after each plan

### Integration Points
- `app/page.tsx` → Import and render all section components after `<HeroSection />`
- `components/sections/` → New directory for all 10 section components
- No modifications to layout.tsx, globals.css, or existing Phase 1-3 files

</code_context>

<specifics>
## Specific Ideas

- Blog cards with horizontal separators are more editorial than a grid — matches the Lumus template aesthetic
- FAQ two-column layout (title left, accordion right) is a common luxury portfolio pattern — matches index.html
- White card footer on beige background creates visual lift and closure at bottom of page
- Process and testimonial sections (Phase 5) appear as minimal placeholder sections in page.tsx with `<section id="process" />` and `<section id="testimonials" />` — just anchors, no content yet

</specifics>

<deferred>
## Deferred Ideas

- Horizontal scroll for photo strip (requires Lenis or custom scroll handling) — v2
- Filterable portfolio grid — Phase 6 (/portfolio page)
- Real SVG client logos — content task when Joyce provides assets
- Real portfolio photos — content task when Joyce provides assets
- Animated counter for stats in proof strip — v2

</deferred>

---

*Phase: 04-static-content-sections*
*Context gathered: 2026-03-28 via auto mode*
