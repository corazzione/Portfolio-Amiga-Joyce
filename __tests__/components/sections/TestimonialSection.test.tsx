import { render, screen, fireEvent, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

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

import { TestimonialSection } from '@/components/sections/TestimonialSection'

describe('TestimonialSection', () => {
  it('renders dark section with video element', () => {
    const { container } = render(<TestimonialSection />)
    expect(container.querySelector('video')).toBeTruthy()
    const section = container.querySelector('section')
    expect(section?.className).toContain('bg-dark')
  })

  it('renders testimonial card with name and quote', () => {
    render(<TestimonialSection />)
    expect(screen.getByText('Danny Rose')).toBeTruthy()
    expect(screen.getByText(/Visuais excepcionais/)).toBeTruthy()
  })

  it('auto-advances after 5000ms', () => {
    vi.useFakeTimers()
    render(<TestimonialSection />)
    expect(screen.getByText('Danny Rose')).toBeTruthy()
    act(() => {
      vi.advanceTimersByTime(5000)
    })
    expect(screen.getByText('David Nguyen')).toBeTruthy()
    vi.useRealTimers()
  })

  it('dot click updates displayed card', () => {
    vi.useFakeTimers()
    render(<TestimonialSection />)
    const dots = screen.getAllByRole('button', { name: /Ir para depoimento/ })
    fireEvent.click(dots[2])
    expect(screen.getByText('Alisha Moore')).toBeTruthy()
    vi.useRealTimers()
  })

  it('renders 3 dot navigation buttons', () => {
    render(<TestimonialSection />)
    const dots = screen.getAllByRole('button', { name: /Ir para depoimento/ })
    expect(dots.length).toBe(3)
  })

  it('respects reduced motion preference', () => {
    mockUseReducedMotion.mockReturnValue(true)
    render(<TestimonialSection />)
    expect(screen.getByText('Danny Rose')).toBeTruthy()
    mockUseReducedMotion.mockReturnValue(false)
  })
})
