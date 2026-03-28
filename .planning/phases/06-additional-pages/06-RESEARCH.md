# Phase 6: Additional Pages - Research

**Researched:** 2026-03-28
**Domain:** Next.js 14 App Router sub-pages, Formspree contact form, LGPD privacy policy
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Page Architecture**
- App Router structure: `app/portfolio/page.tsx`, `app/contato/page.tsx`, `app/privacidade/page.tsx`
- Default: Server Components — only the contact form component needs `'use client'`
- Layout inheritance: all three pages inherit root `app/layout.tsx` (TopNav + BottomBar) automatically
- Shared spacing: `py-24 px-6` on page containers, `max-w-7xl mx-auto` on inner wrappers

**Portfolio Page (PAGE-02)**
- Layout: static categorized grid — no JS filtering (deferred to v2)
- Grid: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`
- Card: reuse `PortfolioCard` from `components/sections/PortfolioCard.tsx`
- Content: placeholder images (`bg-dark/10 aspect-[3/4] rounded-xl`) with category labels
- Categories: Casamento, Ensaio, Corporativo, Eventos, Vídeo — 5 categories, ~3-4 placeholder cards each
- Section heading: "Todos os Trabalhos" — Switzer bold
- Entrance: RevealWrapper + StaggerChildren for staggered card entrance

**Contact Page (PAGE-03)**
- Form backend: Formspree — POST to `https://formspree.io/f/{form_id}`
- Form ID: `process.env.NEXT_PUBLIC_FORMSPREE_ID` env var with placeholder comment
- Fields: name (text), email (email), subject (text), message (textarea) — all required
- Component: `ContactForm.tsx` as `'use client'` — useState for `idle | submitting | success | error`
- Submit: fetch to Formspree, disable button during submission, inline success/error message
- Success message: "Mensagem enviada! Entraremos em contato em breve."
- Error message: "Algo deu errado. Tente novamente."
- Styling: white card `bg-white rounded-2xl p-8 shadow-sm` on beige background
- Input fields: `border border-dark/20 rounded-xl px-4 py-3 font-sans text-dark`
- Submit button: gold `bg-gold text-dark` — same class as hero CTA
- Page layout: two-column on desktop (`grid grid-cols-1 lg:grid-cols-2 gap-16`)
- Left column: "Vamos Conversar" heading, tagline, email placeholder, social links

**Privacy Policy Page (PAGE-04)**
- Content: full LGPD-compliant privacy policy in Portuguese
- Layout: `max-w-3xl mx-auto py-24 px-6` — single-column prose
- Typography: Switzer for headings (h1, h2), Public Sans for body
- Heading: "Política de Privacidade"
- Server Component — pure static content
- Last updated: 2026-03-28

### Claude's Discretion
- Exact Formspree form ID (use `NEXT_PUBLIC_FORMSPREE_ID` env var with placeholder comment)
- Exact portfolio category counts and arrangement
- LGPD boilerplate text (standard Brazilian Portuguese privacy policy language)
- Whether portfolio page has a hero/header section above the grid
- Input focus ring styling (subtle gold outline is appropriate)

### Deferred Ideas (OUT OF SCOPE)
- Filterable portfolio grid with JS category switching (Phase 7 / v2 — ENH-04)
- Lightbox for portfolio image viewing (v2 — ENH-04)
- Blog post detail pages /blog/[slug] (v2)
- Resend serverless email action (v2 — Formspree covers v1)
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| PAGE-01 | `/` home page — full single-page portfolio experience with all sections | `app/page.tsx` already has all 13 sections imported; this phase confirms it is complete and wires the remaining placeholder sections (SECT-06, SECT-07, SECT-08 still unchecked in REQUIREMENTS.md — check prior phase completeness before marking done) |
| PAGE-02 | `/portfolio` — categorized work grid | Static data array, PortfolioCard reuse, StaggerChildren pattern — all infrastructure exists |
| PAGE-03 | `/contato` — contact form with email delivery | Formspree fetch API, ContactForm 'use client' component, FAQSection pattern for client component in Server Component page |
| PAGE-04 | `/privacidade` — LGPD-compliant privacy policy in Portuguese | Pure Server Component, static prose, standard LGPD boilerplate sections |
</phase_requirements>

---

## Summary

Phase 6 creates three new route files (`app/portfolio/page.tsx`, `app/contato/page.tsx`, `app/privacidade/page.tsx`) and one new client component (`components/sections/ContactForm.tsx`). The home page (`app/page.tsx`) is already assembled from Phase 5 — PAGE-01 should be verified complete before closing. All foundation infrastructure is in place: reusable components (PortfolioCard, RevealWrapper, StaggerChildren), the motion import convention (`from 'motion/react'`), Tailwind tokens (bg-gold, bg-dark, font-switzer), and the `'use client'` boundary pattern from FAQSection.

The most technically involved piece is the contact form: a client component that manages a four-state machine (idle → submitting → success | error) using `useState`, submits via `fetch` with `Accept: application/json` header to a Formspree endpoint, and surfaces inline feedback to the user. The Formspree response is `{ ok: true }` on success or `{ errors: [{ message }] }` on failure. No serverless function or API route is needed — Formspree handles delivery entirely from the client.

The portfolio page is a straightforward expansion of the existing `PortfolioSection` pattern: more cards, grouped by category, using the same PortfolioCard + StaggerChildren composition. The privacy page is static prose — the only work is writing LGPD-compliant content and applying the correct typography classes.

**Primary recommendation:** Build ContactForm first (highest complexity, needs env var awareness), then portfolio page (pattern already proven in PortfolioSection), then privacy policy (pure content).

---

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | 14.2.35 | App Router, RSC, routing | Already installed — `app/portfolio/page.tsx` is all that's needed to create a route |
| React | ^18 | Component model | Already installed |
| motion | ^12.38.0 | Animation — whileHover on cards, reveal on grid | Already installed, `from 'motion/react'` import convention locked |
| Tailwind CSS | ^3.4.1 | Styling | Already installed, tokens defined in `tailwind.config.ts` |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| Formspree | Free tier (SaaS) | Contact form email delivery | POST to `https://formspree.io/f/{FORM_ID}` with `Accept: application/json` — no install needed |
| @testing-library/react | ^16.3.2 | Component tests | Already installed — write tests for ContactForm states |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Formspree | Resend + `app/api/contact/route.ts` | Resend requires serverless route and API key in server env; more complexity for v1 — locked as deferred |
| Static data array inline | lib/data.ts | data.ts already used for homepage sections; inline is simpler for portfolio page that will swap to CMS in v2 |

**Installation:**
No new packages required. Formspree is a SaaS — submit via `fetch`, no npm install.

---

## Architecture Patterns

### Recommended Project Structure
```
app/
├── portfolio/
│   └── page.tsx          # Server Component — imports PortfolioCard, StaggerChildren
├── contato/
│   └── page.tsx          # Server Component — imports ContactForm (client)
└── privacidade/
    └── page.tsx          # Server Component — static prose content

components/
└── sections/
    └── ContactForm.tsx   # 'use client' — useState form state machine

__tests__/
└── components/
    └── sections/
        ├── ContactForm.test.tsx
        ├── PortfolioPage.test.tsx  (optional — page is thin wrapper)
        └── PrivacidadePage.test.tsx (optional — static, low value)
```

### Pattern 1: Server Component page with Client Component child
Identical to how `FAQSection` works — the page file stays a Server Component, and only the interactive leaf (`ContactForm`) declares `'use client'`.

```typescript
// app/contato/page.tsx — Server Component (no 'use client')
import { ContactForm } from '@/components/sections/ContactForm'

export default function ContatoPage() {
  return (
    <main className="py-24 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left: static info — rendered on server */}
        <div>
          <h1 className="font-switzer text-5xl font-bold tracking-tight">Vamos Conversar</h1>
          {/* tagline, email, social links */}
        </div>
        {/* Right: interactive form — client boundary */}
        <ContactForm />
      </div>
    </main>
  )
}
```

### Pattern 2: Formspree fetch submission
```typescript
// Source: https://help.formspree.io/hc/en-us/articles/360013470814
// components/sections/ContactForm.tsx
'use client'
import { useState } from 'react'

type Status = 'idle' | 'submitting' | 'success' | 'error'

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('submitting')
    const form = e.currentTarget
    const data = new FormData(form)
    const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ID
      ? `https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_ID}`
      : 'https://formspree.io/f/REPLACE_WITH_FORM_ID'

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      if (res.ok) {
        setStatus('success')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-sm">
      {/* fields: name, email, subject, textarea message */}
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="bg-gold text-dark font-switzer font-semibold ..."
      >
        {status === 'submitting' ? 'Enviando...' : 'Enviar Mensagem'}
      </button>
      {status === 'success' && (
        <p className="mt-4 text-sm text-dark/70">Mensagem enviada! Entraremos em contato em breve.</p>
      )}
      {status === 'error' && (
        <p className="mt-4 text-sm text-red-600">Algo deu errado. Tente novamente.</p>
      )}
    </form>
  )
}
```

### Pattern 3: Portfolio page with category grouping
```typescript
// app/portfolio/page.tsx — Server Component
import { StaggerChildren, StaggerItem } from '@/components/motion/StaggerChildren'
import { RevealWrapper } from '@/components/motion/RevealWrapper'
import { PortfolioCard } from '@/components/sections/PortfolioCard'

const categories = [
  {
    name: 'Casamento',
    items: [
      { id: 'c1', caption: 'Casamento na Praia' },
      { id: 'c2', caption: 'Cerimônia ao Ar Livre' },
      { id: 'c3', caption: 'Recepção Íntima' },
    ],
  },
  // ... Ensaio, Corporativo, Eventos, Vídeo
]

export default function PortfolioPage() {
  return (
    <main className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <RevealWrapper>
          <h1 className="font-switzer text-5xl font-bold tracking-tight mb-16">Todos os Trabalhos</h1>
        </RevealWrapper>
        {categories.map((category) => (
          <section key={category.name} className="mb-20">
            <RevealWrapper>
              <h2 className="font-switzer text-2xl font-semibold mb-8">{category.name}</h2>
            </RevealWrapper>
            <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.items.map((item) => (
                <StaggerItem key={item.id}>
                  <PortfolioCard caption={item.caption} />
                </StaggerItem>
              ))}
            </StaggerChildren>
          </section>
        ))}
      </div>
    </main>
  )
}
```

### Pattern 4: LGPD Privacy Policy structure
Standard LGPD-compliant privacy policy for a Brazilian photography service includes these sections (in Portuguese):
1. Introdução / Quem Somos
2. Dados Coletados (nome, email, mensagem via formulário de contato; cookies de sessão)
3. Finalidade do Tratamento (responder solicitações, melhorar serviço)
4. Base Legal (legítimo interesse, consentimento — Art. 7º LGPD)
5. Compartilhamento de Dados (Formspree como operador para entrega de emails)
6. Direitos do Titular (acesso, correção, exclusão, portabilidade, revogação do consentimento)
7. Cookies
8. Retenção de Dados
9. Contato do Responsável (DPO contact placeholder)
10. Alterações nesta Política
11. Data da última atualização: 28 de março de 2026

### Anti-Patterns to Avoid
- **`'use client'` on the page file:** ContactForm handles state — the page itself should stay a Server Component. Mirrors the FAQSection pattern exactly.
- **`useState` in a Server Component:** Will throw at runtime. Only `ContactForm.tsx` gets `'use client'`.
- **Hardcoding the Formspree ID:** Use `NEXT_PUBLIC_FORMSPREE_ID` env var. Hardcoding exposes the endpoint and makes rotating it harder.
- **Missing `Accept: application/json` header:** Without this header, Formspree returns an HTML redirect instead of a JSON response, breaking the success/error detection.
- **Not disabling the submit button during submission:** Users can double-submit. Set `disabled={status === 'submitting'}`.
- **Dynamic Tailwind class strings:** Do not construct class strings like `"grid-cols-" + n`. Use complete string literals — Tailwind's content scanner cannot detect dynamically composed classes.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Email delivery from contact form | Custom `/api/contact` route + SMTP | Formspree free tier | Formspree handles spam filtering, SMTP, delivery retries, unsubscribe — building this reliably is non-trivial |
| Form validation UI | Custom error state per field | HTML5 `required` + `type="email"` attributes | Native browser validation handles the common cases for v1; no additional library needed |
| Animation on new pages | Custom scroll handlers | RevealWrapper + StaggerChildren (already built) | Already tested and working with `prefers-reduced-motion` support |

**Key insight:** The contact form's only custom logic is the four-state machine and the `fetch` call. Everything else (email delivery, spam protection) is Formspree's responsibility.

---

## Common Pitfalls

### Pitfall 1: Missing `Accept: application/json` on Formspree fetch
**What goes wrong:** Formspree returns a 302 redirect to a "thank you" page instead of JSON. `fetch` follows the redirect, `res.ok` may still be `true`, but there is no JSON body to parse. The error/success states become unreliable.
**Why it happens:** Formspree's default mode is HTML form submission. JSON mode requires the `Accept: application/json` header.
**How to avoid:** Always include `headers: { Accept: 'application/json' }` in the fetch call.
**Warning signs:** Form appears to submit successfully but no email is received; `res.json()` throws parse errors.

### Pitfall 2: Tailwind not scanning new page files
**What goes wrong:** Classes used in `app/portfolio/page.tsx` or `app/contato/page.tsx` are purged — styles missing in production build.
**Why it happens:** `tailwind.config.ts` content array is `./app/**/*.{ts,tsx}` — this DOES cover the new page files. No change needed.
**How to avoid:** Verify the content glob covers `app/portfolio/page.tsx` — it does. No action required.
**Warning signs:** Styles appear in dev but disappear after `npm run build`.

### Pitfall 3: NEXT_PUBLIC_ prefix required for client-side env vars
**What goes wrong:** `process.env.FORMSPREE_ID` is `undefined` at runtime in the browser because Next.js only exposes `NEXT_PUBLIC_` prefixed vars to client bundles.
**Why it happens:** Next.js tree-shakes server-only env vars from client bundles for security.
**How to avoid:** Use `NEXT_PUBLIC_FORMSPREE_ID`. Add a `.env.local.example` comment in code noting the required variable.
**Warning signs:** Endpoint resolves to the fallback placeholder string, form POSTs to wrong URL.

### Pitfall 4: PortfolioCard category label vs. caption prop
**What goes wrong:** PortfolioCard only accepts a `caption` prop. Category headings must be rendered by the parent page, not by the card component.
**Why it happens:** PortfolioCard is a thin leaf component — it shows one image placeholder and one caption string.
**How to avoid:** Render `<h2>` category headings in the page, not inside PortfolioCard. Group items by category in the page's data array.

### Pitfall 5: Static page metadata for sub-pages
**What goes wrong:** All sub-pages inherit the root layout `metadata` — every page shows "Corazon - Fotografia & Videografia" as the tab title.
**Why it happens:** Next.js merges metadata — child pages can export their own `metadata` to override the root.
**How to avoid:** Export a `metadata` constant from each page file with a page-specific title. e.g., `export const metadata = { title: 'Portfolio | Corazón' }`.

---

## Code Examples

### Formspree Response Shape
```typescript
// SUCCESS: res.ok === true, res.status === 200
// { ok: true, next: "...", hashid: "..." }

// ERROR: res.ok === false, res.status === 4xx
// { errors: [{ field: "email", message: "must be a valid email" }] }
```

### Input Field Pattern (consistent with existing card/form patterns)
```typescript
// Focus ring: subtle gold outline — Claude's discretion
<input
  type="text"
  name="name"
  required
  className="w-full border border-dark/20 rounded-xl px-4 py-3 font-sans text-dark
             focus:outline-none focus:ring-2 focus:ring-gold/40
             disabled:opacity-50"
/>
```

### Page Metadata Export
```typescript
// Source: Next.js 14 App Router docs
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Portfolio | Corazón',
  description: 'Trabalhos de fotografia e videografia — casamento, ensaio, corporativo, eventos.',
}
```

### Test Pattern for ContactForm (matches project conventions)
```typescript
// __tests__/components/sections/ContactForm.test.tsx
import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import userEvent from '@testing-library/user-event'

// Mock fetch globally
const mockFetch = vi.fn()
global.fetch = mockFetch

vi.mock('motion/react', () => ({
  motion: {
    div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement> & { children?: React.ReactNode }) => (
      <div {...props}>{children}</div>
    ),
  },
  useReducedMotion: vi.fn(() => false),
  useInView: vi.fn(() => true),
}))

import { ContactForm } from '@/components/sections/ContactForm'

describe('ContactForm', () => {
  beforeEach(() => { mockFetch.mockReset() })

  it('renders all four fields', () => {
    render(<ContactForm />)
    expect(screen.getByRole('textbox', { name: /nome/i })).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: /email/i })).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: /assunto/i })).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: /mensagem/i })).toBeInTheDocument()
  })

  it('shows success message on successful submission', async () => {
    mockFetch.mockResolvedValueOnce({ ok: true })
    const user = userEvent.setup()
    render(<ContactForm />)
    await user.click(screen.getByRole('button', { name: /enviar/i }))
    await waitFor(() => {
      expect(screen.getByText(/mensagem enviada/i)).toBeInTheDocument()
    })
  })

  it('shows error message on failed submission', async () => {
    mockFetch.mockResolvedValueOnce({ ok: false })
    const user = userEvent.setup()
    render(<ContactForm />)
    await user.click(screen.getByRole('button', { name: /enviar/i }))
    await waitFor(() => {
      expect(screen.getByText(/algo deu errado/i)).toBeInTheDocument()
    })
  })

  it('disables submit button while submitting', async () => {
    mockFetch.mockImplementation(() => new Promise(() => {})) // never resolves
    const user = userEvent.setup()
    render(<ContactForm />)
    const btn = screen.getByRole('button', { name: /enviar/i })
    await user.click(btn)
    expect(btn).toBeDisabled()
  })
})
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `pages/` directory routes | `app/` directory with Server Components | Next.js 13 (2022) | Pages are Server Components by default; no `getServerSideProps` or `getStaticProps` needed |
| `framer-motion` import | `motion/react` import | Motion v12 (2024) | Breaking change — project locked to `from 'motion/react'` |
| Per-page layout files | Root layout inheritance | App Router | Sub-pages automatically inherit TopNav + BottomBar; no per-page layout needed |

**Deprecated/outdated:**
- `framer-motion`: Replaced by `motion` package — project uses `motion/react` exclusively
- `pages/_app.tsx`: Not used — App Router uses `app/layout.tsx`

---

## Open Questions

1. **PAGE-01 completion status**
   - What we know: `app/page.tsx` imports all 13 sections including PortfolioSection, BlogSection, FAQSection
   - What's unclear: REQUIREMENTS.md shows SECT-06, SECT-07, SECT-08 as unchecked — were these completed in Phase 4/5 or still pending?
   - Recommendation: Planner should include a task to verify `app/page.tsx` renders all sections and the build passes — if SECT-06/07/08 sections exist as components, PAGE-01 is satisfied

2. **Formspree form ID setup**
   - What we know: Joyce needs to create a free Formspree account and paste the form ID into `.env.local`
   - What's unclear: Whether to create a `.env.local.example` file or just add a comment in the code
   - Recommendation: Add a comment block above the endpoint variable in ContactForm.tsx explaining the setup step; optionally create `.env.local.example` with `NEXT_PUBLIC_FORMSPREE_ID=your_form_id_here`

---

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Vitest ^4.1.2 + @testing-library/react ^16.3.2 |
| Config file | `vitest.config.ts` (root) |
| Quick run command | `npx vitest run __tests__/components/sections/ContactForm.test.tsx` |
| Full suite command | `npx vitest run` |

### Phase Requirements → Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| PAGE-01 | Home page renders all sections | smoke | `npx vitest run` (build check via `npm run build`) | Covered by existing tests + build |
| PAGE-02 | Portfolio page renders category headings and cards | unit | `npx vitest run __tests__/components/sections/PortfolioPage.test.tsx` | ❌ Wave 0 |
| PAGE-03 (render) | ContactForm renders all 4 fields | unit | `npx vitest run __tests__/components/sections/ContactForm.test.tsx` | ❌ Wave 0 |
| PAGE-03 (success) | ContactForm shows success state on ok response | unit | `npx vitest run __tests__/components/sections/ContactForm.test.tsx` | ❌ Wave 0 |
| PAGE-03 (error) | ContactForm shows error state on failed response | unit | `npx vitest run __tests__/components/sections/ContactForm.test.tsx` | ❌ Wave 0 |
| PAGE-03 (submitting) | Submit button disabled during submission | unit | `npx vitest run __tests__/components/sections/ContactForm.test.tsx` | ❌ Wave 0 |
| PAGE-04 | Privacy page renders LGPD section headings | unit | `npx vitest run __tests__/components/sections/PrivacidadePage.test.tsx` | ❌ Wave 0 |

### Sampling Rate
- **Per task commit:** `npx vitest run __tests__/components/sections/ContactForm.test.tsx`
- **Per wave merge:** `npx vitest run`
- **Phase gate:** Full suite green + `npm run build` exits 0 before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] `__tests__/components/sections/ContactForm.test.tsx` — covers PAGE-03 (4 test cases above)
- [ ] `__tests__/components/sections/PortfolioPage.test.tsx` — covers PAGE-02 (heading + card count)
- [ ] `__tests__/components/sections/PrivacidadePage.test.tsx` — covers PAGE-04 (key headings present)

*(Note: Privacy and Portfolio page tests are low-complexity — static content assertions. ContactForm test is the highest-value test in this phase due to async state logic.)*

---

## Sources

### Primary (HIGH confidence)
- Project codebase — `components/sections/FAQSection.tsx` (client component pattern in server page)
- Project codebase — `components/sections/PortfolioCard.tsx`, `PortfolioSection.tsx` (reuse pattern)
- Project codebase — `components/motion/RevealWrapper.tsx`, `StaggerChildren.tsx` (animation wrappers)
- Project codebase — `app/layout.tsx` (confirmed layout inheritance — no per-page layouts needed)
- Project codebase — `tailwind.config.ts` (confirmed token names: bg-gold, bg-dark, bg-bg, font-switzer)
- Project codebase — `__tests__/components/sections/FAQSection.test.tsx`, `PortfolioSection.test.tsx` (test pattern)
- Next.js 14 App Router — Server Components, metadata export, route file conventions

### Secondary (MEDIUM confidence)
- [Formspree AJAX/fetch submission](https://help.formspree.io/hc/en-us/articles/360013470814-Submit-forms-with-JavaScript-AJAX) — `Accept: application/json` header requirement, response shape `{ errors: [{message}] }` — verified via WebSearch with multiple corroborating sources

### Tertiary (LOW confidence)
- LGPD boilerplate section structure — based on common Brazilian privacy policy patterns; exact legal language should be reviewed by someone with legal knowledge before production use

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all packages already installed, versions verified in package.json
- Architecture: HIGH — patterns directly observed in existing codebase (FAQSection, PortfolioSection)
- Formspree API: MEDIUM — WebSearch verified against official Formspree help article
- Pitfalls: HIGH — derived from project decisions and Next.js/Tailwind documented behaviors
- LGPD content: LOW — standard boilerplate; not verified by legal counsel

**Research date:** 2026-03-28
**Valid until:** 2026-04-28 (stable stack; Formspree API unlikely to change)
