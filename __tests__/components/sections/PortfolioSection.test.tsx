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

import { PortfolioSection } from '@/components/sections/PortfolioSection'

describe('PortfolioSection', () => {
  it('renders Trabalhos Selecionados heading', () => {
    render(<PortfolioSection />)
    expect(screen.getByText('Trabalhos Selecionados')).toBeInTheDocument()
  })

  it('renders 6 portfolio items', () => {
    render(<PortfolioSection />)
    const cards = screen.getAllByTestId('portfolio-card')
    expect(cards).toHaveLength(6)
  })

  it('renders all portfolio captions', () => {
    render(<PortfolioSection />)
    expect(screen.getByText('Retrato Editorial')).toBeInTheDocument()
    expect(screen.getByText('Campanha de Marca')).toBeInTheDocument()
    expect(screen.getByText('Cobertura de Evento')).toBeInTheDocument()
    expect(screen.getByText('Lifestyle & Produto')).toBeInTheDocument()
    expect(screen.getByText('Videografia')).toBeInTheDocument()
    expect(screen.getByText('Documental')).toBeInTheDocument()
  })
})
