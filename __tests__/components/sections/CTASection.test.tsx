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

import { CTASection } from '@/components/sections/CTASection'

describe('CTASection', () => {
  it('renders Transforme heading text', () => {
    render(<CTASection />)
    expect(screen.getByText(/Transforme Suas Ideias/i)).toBeTruthy()
  })

  it('renders Entre em Contato link to /contato', () => {
    render(<CTASection />)
    const link = screen.getByRole('link', { name: /Entre em Contato/i })
    expect(link.getAttribute('href')).toBe('/contato')
  })
})
