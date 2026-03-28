import { render, screen, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

const mocks = vi.hoisted(() => ({
  useReducedMotion: vi.fn(() => false),
}))

vi.mock('motion/react', () => ({
  motion: {
    span: ({ children, className }: { children?: React.ReactNode; className?: string }) => (
      <span className={className}>{children}</span>
    ),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useReducedMotion: mocks.useReducedMotion,
}))

import { HeroTextSelector } from '@/components/hero/HeroTextSelector'

describe('HeroTextSelector', () => {
  beforeEach(() => {
    mocks.useReducedMotion.mockReturnValue(false)
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders first text option on mount', () => {
    render(<HeroTextSelector />)
    expect(screen.getByText('A Criação')).toBeInTheDocument()
  })

  it('cycles to next text after 3 seconds', () => {
    render(<HeroTextSelector />)
    expect(screen.getByText('A Criação')).toBeInTheDocument()

    act(() => {
      vi.advanceTimersByTime(3000)
    })

    expect(screen.getByText('Videografia')).toBeInTheDocument()
  })

  it('cycles to third text after 6 seconds', () => {
    render(<HeroTextSelector />)

    act(() => {
      vi.advanceTimersByTime(6000)
    })

    expect(screen.getByText('Fotografia')).toBeInTheDocument()
  })

  it('loops back to first text after 9 seconds', () => {
    render(<HeroTextSelector />)

    act(() => {
      vi.advanceTimersByTime(9000)
    })

    expect(screen.getByText('A Criação')).toBeInTheDocument()
  })
})
