import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'

const mocks = vi.hoisted(() => ({
  useReducedMotion: vi.fn(() => false),
  useInView: vi.fn(() => true),
}))

vi.mock('motion/react', () => ({
  motion: {
    div: ({ children, className }: { children?: React.ReactNode; className?: string }) => (
      <div className={className}>{children}</div>
    ),
  },
  useReducedMotion: mocks.useReducedMotion,
  useInView: mocks.useInView,
}))

import { RevealWrapper } from '@/components/motion/RevealWrapper'

describe('RevealWrapper', () => {
  beforeEach(() => {
    mocks.useReducedMotion.mockReturnValue(false)
    mocks.useInView.mockReturnValue(true)
  })

  it('renders children', () => {
    render(<RevealWrapper>Hello</RevealWrapper>)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })

  it("accepts variant='scaleIn' without error", () => {
    expect(() => {
      render(<RevealWrapper variant="scaleIn">Content</RevealWrapper>)
    }).not.toThrow()
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('renders children immediately when reduced motion is preferred', () => {
    mocks.useReducedMotion.mockReturnValue(true)
    render(<RevealWrapper>Visible</RevealWrapper>)
    expect(screen.getByText('Visible')).toBeInTheDocument()
  })
})
