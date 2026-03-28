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

// TODO: uncomment when component exists
// import { ServicesSection } from '@/components/sections/ServicesSection'

describe('ServicesSection', () => {
  it.todo('renders Meus Servicos heading')
  it.todo('renders 7 service cards from data')
  it.todo('renders 1 photo card placeholder')
})
