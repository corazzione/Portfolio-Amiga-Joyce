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

vi.mock('@/components/sections/PortfolioCard', () => ({
  PortfolioCard: ({ caption }: { caption: string }) => <div data-testid="portfolio-card">{caption}</div>,
}))

// TODO: uncomment when component exists
// import { PortfolioSection } from '@/components/sections/PortfolioSection'

describe('PortfolioSection', () => {
  it.todo('renders Trabalhos Selecionados heading')
  it.todo('renders 6 portfolio items')
})
