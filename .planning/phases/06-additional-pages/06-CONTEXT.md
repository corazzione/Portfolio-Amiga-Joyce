# Phase 6: Additional Pages - Context

**Gathered:** 2026-03-28
**Status:** Ready for planning
**Source:** Auto mode (--auto) — all decisions are recommended defaults

<domain>
## Phase Boundary

Three sub-pages built and wired into the Next.js 14 App Router: `/portfolio` (categorized work grid), `/contato` (contact form with email delivery), and `/privacidade` (LGPD-compliant privacy policy). The home page (PAGE-01) is already complete as of Phase 5 — this phase adds the three sub-pages that complete the site's navigation. Each page gets its own `app/[slug]/page.tsx` file under the root layout (TopNav + BottomBar already applied via `app/layout.tsx`).

</domain>

<decisions>
## Implementation Decisions

### Page Architecture
- **App Router structure:** `app/portfolio/page.tsx`, `app/contato/page.tsx`, `app/privacidade/page.tsx` — standard Next.js 14 App Router convention
- **Default: Server Components** — all three pages default to Server Components; only the contact form component needs `'use client'` for form state management
- **Layout inheritance:** All three pages inherit the root `app/layout.tsx` (TopNav + BottomBar) automatically — no per-page layout files needed
- **Shared spacing:** Consistent with existing sections — `py-24 px-6` on page containers, `max-w-7xl mx-auto` on inner wrappers

### Portfolio Page (PAGE-02)
- **Layout:** Static categorized grid — no JS filtering (filter/lightbox is Phase 7/v2). Categories displayed as static labeled sections or a simple visual grid with category tags
- **Grid:** `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6` — 3-column on desktop, consistent with existing PortfolioSection on homepage
- **Card:** Reuse `PortfolioCard` component from `components/sections/PortfolioCard.tsx` — whileHover scale already implemented
- **Content:** Placeholder images (`bg-dark/10 aspect-[3/4] rounded-xl`) with category labels — real photos provided by Joyce later. Static data array inline in the page (no lib/data.ts needed for v1)
- **Categories:** Casamento, Ensaio, Corporativo, Eventos, Vídeo — 5 categories, ~3-4 placeholder cards per category
- **Section heading:** "Todos os Trabalhos" — Switzer bold, same typography pattern as other section headings
- **Entrance:** RevealWrapper on the grid with StaggerChildren for staggered card entrance

### Contact Page (PAGE-03)
- **Form backend:** Formspree — POST to `https://formspree.io/f/{form_id}`. No serverless function needed, works with static deploy on Vercel. Form ID placeholder in code (`process.env.NEXT_PUBLIC_FORMSPREE_ID` or hardcoded placeholder)
- **Fields:** name (`text`), email (`email`), subject (`text`), message (`textarea`) — all required fields
- **Component:** `ContactForm.tsx` as a `'use client'` component — uses `useState` for form state: `idle | submitting | success | error`
- **Submit behavior:** `fetch` to Formspree endpoint, disable submit button during submission, show success message ("Mensagem enviada! Entraremos em contato em breve.") or error message ("Algo deu errado. Tente novamente.") inline below the form
- **Styling:** White card `bg-white rounded-2xl p-8 shadow-sm` on beige background — matches existing card pattern. Input fields `border border-dark/20 rounded-xl px-4 py-3 font-sans text-dark`. Submit button: gold `bg-gold text-dark` button, same as hero CTA
- **Page layout:** Two-column on desktop (`grid grid-cols-1 lg:grid-cols-2 gap-16`) — left: contact info/text block, right: form card
- **Contact info block (left):** "Vamos Conversar" heading, tagline, email address placeholder, social links (X, Instagram) — same content as footer

### Privacy Policy Page (PAGE-04)
- **Content:** Full LGPD-compliant privacy policy in Portuguese — planner generates standard boilerplate covering: data collected, purposes, legal basis, user rights (acesso, correção, exclusão, portabilidade), data retention, cookies, contact for DPO
- **Layout:** Simple single-column prose layout — `max-w-3xl mx-auto py-24 px-6`. Typography: Switzer for headings (h1, h2), Public Sans for body paragraphs
- **Heading:** "Política de Privacidade"
- **Server Component:** Pure static content, no interactivity
- **Last updated date:** 2026-03-28

### Claude's Discretion
- Exact Formspree form ID (use `NEXT_PUBLIC_FORMSPREE_ID` env var with placeholder comment)
- Exact portfolio category counts and arrangement
- LGPD boilerplate text (standard Brazilian Portuguese privacy policy language)
- Whether portfolio page has a hero/header section above the grid
- Input focus ring styling (subtle gold outline is appropriate)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Requirements
- `.planning/REQUIREMENTS.md` — PAGE-01 through PAGE-04 (all additional pages requirements)

### Visual reference
- `index.html` — Complete HTML mockup; inspect `.contact-section`, portfolio-related sections, and footer for exact copy and layout patterns

### Foundation (prior phase outputs)
- `app/page.tsx` — Integration model: how sections are imported and composed (Server Component with client children)
- `app/layout.tsx` — Root layout with TopNav + BottomBar — all sub-pages inherit this automatically
- `components/sections/PortfolioCard.tsx` — Reuse for /portfolio grid cards (whileHover already implemented)
- `components/sections/FooterSection.tsx` — Contact info content (email, social links) to mirror in /contato left column
- `components/motion/RevealWrapper.tsx` — Use for page section entrances
- `components/motion/StaggerChildren.tsx` — Use for portfolio grid stagger
- `tailwind.config.ts` — `bg-dark`, `bg-gold`, `bg-bg`, `font-switzer` tokens

### Critical patterns
- `components/sections/FAQSection.tsx` — Pattern for `'use client'` component with useState inside a Server Component page (same topology for ContactForm)
- `components/hero/HeroSection.tsx` — Gold button class: `bg-gold text-dark font-switzer font-semibold`

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `components/sections/PortfolioCard.tsx`: Already has `'use client'`, `motion.div` whileHover — import directly into /portfolio page
- `components/motion/RevealWrapper.tsx`: `variant="fadeUp"|"scaleIn"` + `delay` prop — wrap portfolio grid and form card
- `components/motion/StaggerChildren.tsx` + `StaggerItem`: wrap portfolio grid cards for staggered entrance
- `components/sections/FooterSection.tsx`: Contains "Corazón" brand + social links + nav links — extract contact info for /contato left column
- `lib/utils.ts`: `cn()` for conditional Tailwind composition

### Established Patterns
- Motion imports: `from 'motion/react'` only
- `'use client'` only at component level that needs it (ContactForm only — page.tsx stays Server Component)
- Section spacing: `py-24 px-6` on section, `max-w-7xl mx-auto` on inner
- Card pattern: `bg-white rounded-2xl p-6 shadow-sm` on beige background
- Form submission with fetch: use `useState` for `status: 'idle' | 'submitting' | 'success' | 'error'`
- Build must pass: `npm run build` exits 0 after each plan

### Integration Points
- `app/portfolio/page.tsx` → imports PortfolioCard, RevealWrapper, StaggerChildren
- `app/contato/page.tsx` → imports ContactForm (client), renders server layout around it
- `app/privacidade/page.tsx` → pure Server Component, static prose content
- `components/layout/TopNav.tsx` → navigation links already point to `/portfolio` and `/contato` — pages just need to exist

</code_context>

<specifics>
## Specific Ideas

- Contact page two-column layout (info left, form right) is a luxury portfolio standard — matches the Lumus template aesthetic
- Portfolio page should feel like a gallery — generous whitespace between cards, not cramped
- Privacy policy should be readable prose, not a legal wall of text — use section headings to break it up
- Formspree is the simplest path to a working contact form with zero server infrastructure — Joyce can set up her own form endpoint on free plan

</specifics>

<deferred>
## Deferred Ideas

- Filterable portfolio grid with JS category switching (Phase 7 / v2 — ENH-04 area)
- Lightbox for portfolio image viewing (v2 — ENH-04)
- Blog post detail pages /blog/[slug] (v2 — static blog cards only in v1)
- Resend serverless email action (v2 — Formspree covers v1 requirement)

</deferred>

---

*Phase: 06-additional-pages*
*Context gathered: 2026-03-28 via auto mode*
