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

import { ProofStripSection } from '@/components/sections/ProofStripSection'

describe('ProofStripSection', () => {
  it('renders Meu Portfolio button', () => {
    render(<ProofStripSection />)
    expect(screen.getByText(/Meu Portfolio/i)).toBeTruthy()
  })

  it('renders avatar circles', () => {
    const { container } = render(<ProofStripSection />)
    const avatars = container.querySelectorAll('.rounded-full.bg-dark\\/20')
    expect(avatars.length).toBe(3)
  })

  it('renders all 4 client logo names', () => {
    render(<ProofStripSection />)
    expect(screen.getByText('theo')).toBeTruthy()
    expect(screen.getByText('Amsterdam')).toBeTruthy()
    expect(screen.getByText('luminous')).toBeTruthy()
    expect(screen.getByText('MILANO')).toBeTruthy()
  })
})
