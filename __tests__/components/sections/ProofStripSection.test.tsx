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

// TODO: uncomment when component exists
// import { ProofStripSection } from '@/components/sections/ProofStripSection'

describe('ProofStripSection', () => {
  it.todo('renders Meu Portfolio button')
  it.todo('renders avatar circles')
  it.todo('renders all 4 client logo names')
})
