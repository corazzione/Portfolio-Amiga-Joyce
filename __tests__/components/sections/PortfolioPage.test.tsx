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
    button: ({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { children?: React.ReactNode }) => (
      <button {...props}>{children}</button>
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
  PortfolioCard: ({ caption }: { caption: string }) => (
    <div data-testid="portfolio-card">{caption}</div>
  ),
}))

import PortfolioPage from '@/app/portfolio/page'

describe('PortfolioPage', () => {
  it('renders main heading', () => {
    render(<PortfolioPage />)
    expect(screen.getByText('Todos os Trabalhos')).toBeInTheDocument()
  })

  it('renders all 5 category headings', () => {
    render(<PortfolioPage />)
    expect(screen.getByText('Casamento')).toBeInTheDocument()
    expect(screen.getByText('Ensaio')).toBeInTheDocument()
    expect(screen.getByText('Corporativo')).toBeInTheDocument()
    expect(screen.getByText('Eventos')).toBeInTheDocument()
    expect(screen.getByText('Video')).toBeInTheDocument()
  })

  it('renders portfolio cards', () => {
    render(<PortfolioPage />)
    const cards = screen.getAllByTestId('portfolio-card')
    expect(cards.length).toBeGreaterThanOrEqual(15)
  })
})
