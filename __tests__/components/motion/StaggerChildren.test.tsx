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

import { StaggerChildren, StaggerItem } from '@/components/motion/StaggerChildren'

describe('StaggerChildren', () => {
  beforeEach(() => {
    mocks.useReducedMotion.mockReturnValue(false)
    mocks.useInView.mockReturnValue(true)
  })

  it('renders children', () => {
    render(
      <StaggerChildren>
        <StaggerItem>Item</StaggerItem>
      </StaggerChildren>
    )
    expect(screen.getByText('Item')).toBeInTheDocument()
  })

  it('renders children immediately when reduced motion is preferred', () => {
    mocks.useReducedMotion.mockReturnValue(true)
    render(
      <StaggerChildren>
        <StaggerItem>Visible Item</StaggerItem>
      </StaggerChildren>
    )
    expect(screen.getByText('Visible Item')).toBeInTheDocument()
  })
})
