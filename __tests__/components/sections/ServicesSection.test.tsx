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

vi.mock('@/components/sections/ServiceCard', () => ({
  ServiceCard: ({ service }: { service: { title: string } }) => <div data-testid="service-card">{service.title}</div>,
}))

import { ServicesSection } from '@/components/sections/ServicesSection'

describe('ServicesSection', () => {
  it('renders Meus Servicos heading', () => {
    render(<ServicesSection />)
    expect(screen.getByText('Meus Servicos')).toBeTruthy()
  })

  it('renders 7 service cards from data', () => {
    render(<ServicesSection />)
    const cards = screen.getAllByTestId('service-card')
    expect(cards.length).toBe(7)
  })

  it('renders 1 photo card placeholder', () => {
    const { container } = render(<ServicesSection />)
    const photoCard = container.querySelector('.bg-dark.rounded-2xl')
    expect(photoCard).toBeTruthy()
  })
})
