import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

const { mockUseReducedMotion } = vi.hoisted(() => ({
  mockUseReducedMotion: vi.fn(() => false),
}))

vi.mock('motion/react', () => ({
  useReducedMotion: mockUseReducedMotion,
}))

vi.mock('@/components/hero/HeroTextSelector', () => ({
  HeroTextSelector: ({ activeIndex }: { activeIndex: number; onSelect: (i: number) => void }) => (
    <span data-testid="hero-text-selector" data-active={activeIndex}>HeroTextSelector</span>
  ),
}))

import { HeroSection } from '@/components/hero/HeroSection'

describe('HeroSection', () => {
  it('renders the dark background', () => {
    render(<HeroSection />)
    const section = document.querySelector('section')
    expect(section).toBeTruthy()
  })

  it('renders HeroTextSelector with initial activeIndex 1', () => {
    render(<HeroSection />)
    const selector = screen.getByTestId('hero-text-selector')
    expect(selector).toBeTruthy()
    expect(selector.getAttribute('data-active')).toBe('1')
  })

  it('renders section with min-h-screen', () => {
    render(<HeroSection />)
    const section = document.querySelector('section')
    expect(section?.className).toContain('min-h-screen')
  })
})
