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
})
