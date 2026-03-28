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

import { PhotoStripSection } from '@/components/sections/PhotoStripSection'

describe('PhotoStripSection', () => {
  it('renders photo strip container', () => {
    const { container } = render(<PhotoStripSection />)
    const section = container.querySelector('section')
    expect(section).toBeTruthy()
  })

  it('renders placeholder thumbnail divs', () => {
    const { container } = render(<PhotoStripSection />)
    const thumbs = container.querySelectorAll('.aspect-\\[4\\/3\\]')
    expect(thumbs.length).toBe(6)
  })
})
