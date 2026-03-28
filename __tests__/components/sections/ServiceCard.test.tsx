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

import { ServiceCard } from '@/components/sections/ServiceCard'

const mockService = {
  id: 'test',
  title: 'Test Service',
  description: 'Test desc',
  icon: '📷',
}

describe('ServiceCard', () => {
  it('renders service title', () => {
    render(<ServiceCard service={mockService} />)
    expect(screen.getByText('Test Service')).toBeTruthy()
  })

  it('renders service description', () => {
    render(<ServiceCard service={mockService} />)
    expect(screen.getByText('Test desc')).toBeTruthy()
  })

  it('renders service icon', () => {
    render(<ServiceCard service={mockService} />)
    expect(screen.getByText('📷')).toBeTruthy()
  })
})
