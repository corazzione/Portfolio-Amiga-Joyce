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

import { BlogSection } from '@/components/sections/BlogSection'

describe('BlogSection', () => {
  it('renders Ultimas Historias heading', () => {
    render(<BlogSection />)
    expect(screen.getByText('Ultimas Historias')).toBeInTheDocument()
  })

  it('renders 3 blog post titles', () => {
    render(<BlogSection />)
    expect(screen.getByText('Por Trás das Lentes de um Filme de Marca')).toBeInTheDocument()
    expect(screen.getByText('O Poder da Luz Natural')).toBeInTheDocument()
    expect(screen.getByText('Capturando Emoção na Fotografia de Retratos')).toBeInTheDocument()
  })

  it('renders hr separators between posts (exactly 2)', () => {
    const { container } = render(<BlogSection />)
    const hrs = container.querySelectorAll('hr')
    expect(hrs).toHaveLength(2)
  })
})
