import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

const mocks = vi.hoisted(() => ({
  useReducedMotion: vi.fn(() => false),
}))

vi.mock('motion/react', () => ({
  useReducedMotion: mocks.useReducedMotion,
}))

import { HeroTextSelector } from '@/components/hero/HeroTextSelector'

describe('HeroTextSelector', () => {
  it('renders all three text options', () => {
    render(<HeroTextSelector activeIndex={1} onSelect={vi.fn()} />)
    expect(screen.getByText('A Criação')).toBeInTheDocument()
    expect(screen.getByText('Videografia')).toBeInTheDocument()
    expect(screen.getByText('Fotografia')).toBeInTheDocument()
  })

  it('applies active styles to the active item', () => {
    render(<HeroTextSelector activeIndex={1} onSelect={vi.fn()} />)
    const active = screen.getByText('Videografia')
    expect(active.style.fontWeight).toBe('700')
  })

  it('calls onSelect with correct index on click', () => {
    const onSelect = vi.fn()
    render(<HeroTextSelector activeIndex={1} onSelect={onSelect} />)
    fireEvent.click(screen.getByText('Fotografia'))
    expect(onSelect).toHaveBeenCalledWith(2)
  })

  it('applies dimmed styles to inactive items', () => {
    render(<HeroTextSelector activeIndex={1} onSelect={vi.fn()} />)
    const inactive = screen.getByText('A Criação')
    expect(inactive.style.fontWeight).toBe('500')
  })
})
