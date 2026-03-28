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
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useReducedMotion: mockUseReducedMotion,
  useInView: vi.fn(() => true),
}))

vi.mock('@/components/motion/RevealWrapper', () => ({
  RevealWrapper: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}))

vi.mock('@/components/motion/StaggerChildren', () => ({
  StaggerChildren: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  StaggerItem: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}))

import { ProcessSection } from '@/components/sections/ProcessSection'

describe('ProcessSection', () => {
  it('renders section heading "Um Caminho Claro para Visuais Excepcionais"', () => {
    render(<ProcessSection />)
    expect(screen.getByText('Um Caminho Claro para Visuais Excepcionais')).toBeTruthy()
  })

  it('renders 6 process step cards', () => {
    render(<ProcessSection />)
    expect(screen.getByText('Descoberta')).toBeTruthy()
    expect(screen.getByText('Planejamento')).toBeTruthy()
    expect(screen.getByText('Captação')).toBeTruthy()
    expect(screen.getByText('Edição')).toBeTruthy()
    expect(screen.getByText('Entrega')).toBeTruthy()
    expect(screen.getByText('Otimização')).toBeTruthy()
  })

  it('each card shows step number', () => {
    render(<ProcessSection />)
    expect(screen.getByText('01')).toBeTruthy()
    expect(screen.getByText('02')).toBeTruthy()
    expect(screen.getByText('03')).toBeTruthy()
    expect(screen.getByText('04')).toBeTruthy()
    expect(screen.getByText('05')).toBeTruthy()
    expect(screen.getByText('06')).toBeTruthy()
  })

  it('each card shows circular image placeholder', () => {
    const { container } = render(<ProcessSection />)
    const circles = container.querySelectorAll('[class*="rounded-full"]')
    expect(circles.length).toBeGreaterThanOrEqual(6)
  })

  it('each card has sticky class', () => {
    const { container } = render(<ProcessSection />)
    const stickyEls = container.querySelectorAll('[class*="sticky"]')
    expect(stickyEls.length).toBeGreaterThanOrEqual(6)
  })

  it('cards have rotation classes', () => {
    const { container } = render(<ProcessSection />)
    const rotatedEls = container.querySelectorAll('[class*="rotate-"]')
    expect(rotatedEls.length).toBeGreaterThanOrEqual(1)
  })

  it('renders container with sm:min-h-[300vh] instead of unconditional min-h', () => {
    render(<ProcessSection />)
    const container = document.querySelector('.sm\\:min-h-\\[300vh\\]')
    expect(container).toBeTruthy()
    const unconditional = document.querySelector('.min-h-\\[300vh\\]')
    expect(unconditional).toBeFalsy()
  })

  it('renders cards with sm:sticky instead of unconditional sticky', () => {
    render(<ProcessSection />)
    const stickyCards = document.querySelectorAll('.sm\\:sticky')
    expect(stickyCards.length).toBe(6)
    const unconditionalSticky = document.querySelectorAll('[class*="sticky"]:not([class*="sm:sticky"])')
    // Filter out elements that don't actually have standalone 'sticky'
    const trueUnconditional = Array.from(unconditionalSticky).filter(el =>
      el.className.split(' ').includes('sticky')
    )
    expect(trueUnconditional.length).toBe(0)
  })

  it('renders heading with mobile-scaled text class', () => {
    render(<ProcessSection />)
    const heading = screen.getByText('Um Caminho Claro para Visuais Excepcionais')
    expect(heading.className).toContain('text-2xl')
  })
})
