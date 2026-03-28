import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

const { mockUseReducedMotion } = vi.hoisted(() => ({
  mockUseReducedMotion: vi.fn(() => false),
}))

vi.mock('motion/react', () => ({
  motion: {
    div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement> & { children?: React.ReactNode }) => (
      <div {...props}>{children}</div>
    ),
    span: ({ children, ...props }: React.HTMLAttributes<HTMLSpanElement> & { children?: React.ReactNode }) => (
      <span {...props}>{children}</span>
    ),
    section: ({ children, ...props }: React.HTMLAttributes<HTMLElement> & { children?: React.ReactNode }) => (
      <section {...props}>{children}</section>
    ),
    p: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement> & { children?: React.ReactNode }) => (
      <p {...props}>{children}</p>
    ),
    a: ({ children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { children?: React.ReactNode }) => (
      <a {...props}>{children}</a>
    ),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useReducedMotion: mockUseReducedMotion,
  useInView: vi.fn(() => true),
}))

vi.mock('@/components/hero/HeroTextSelector', () => ({
  HeroTextSelector: () => <span data-testid="hero-text-selector">A Criação</span>,
}))

import { HeroSection } from '@/components/hero/HeroSection'

describe('HeroSection', () => {
  it('renders video element', () => {
    render(<HeroSection />)
    const video = document.querySelector('video')
    expect(video).toBeTruthy()
    expect(video?.autoplay).toBe(true)
    expect(video?.muted).toBe(true)
    expect(video?.loop).toBe(true)
  })

  it("renders CTA button with 'Ver Portfolio' text", () => {
    render(<HeroSection />)
    const cta = screen.getByRole('link', { name: /ver portfolio/i })
    expect(cta).toBeTruthy()
    expect(cta.getAttribute('href')).toBe('#portfolio')
  })

  it('renders tagline with MC.', () => {
    render(<HeroSection />)
    expect(screen.getByText(/MC\./)).toBeTruthy()
    expect(screen.getByText(/CONTADORA/)).toBeTruthy()
  })

  it('renders HeroTextSelector', () => {
    render(<HeroSection />)
    expect(screen.getByTestId('hero-text-selector')).toBeTruthy()
  })
})
