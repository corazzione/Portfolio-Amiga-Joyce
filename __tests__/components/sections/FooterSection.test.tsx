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

import { FooterSection } from '@/components/sections/FooterSection'

describe('FooterSection', () => {
  it('renders Corazon brand name', () => {
    render(<FooterSection />)
    expect(screen.getByText(/Corazon/i)).toBeTruthy()
  })

  it('renders MC copyright 2026', () => {
    render(<FooterSection />)
    expect(screen.getByText(/MC\..*2026/)).toBeTruthy()
  })

  it('renders Criado por Markus Corazzione', () => {
    render(<FooterSection />)
    expect(screen.getByText(/Criado por Markus Corazzione/i)).toBeTruthy()
  })
})
