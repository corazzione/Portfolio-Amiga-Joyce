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

import { BentoSection } from '@/components/sections/BentoSection'

describe('BentoSection', () => {
  it('renders section heading', () => {
    render(<BentoSection />)
    expect(screen.getByText(/Construído na Confiança/)).toBeTruthy()
  })

  it('renders section description', () => {
    render(<BentoSection />)
    expect(screen.getByText(/Habilidade, precisão/)).toBeTruthy()
  })

  it('renders Visão Personalizada overlay text', () => {
    render(<BentoSection />)
    expect(screen.getByText('Visão Personalizada')).toBeTruthy()
  })

  it('renders Atenção aos Detalhes card with skill checklist', () => {
    render(<BentoSection />)
    expect(screen.getByText('Atenção aos Detalhes')).toBeTruthy()
    expect(screen.getByText('Iluminação')).toBeTruthy()
    expect(screen.getByText('Enquadramento')).toBeTruthy()
    expect(screen.getByText('Cor')).toBeTruthy()
    expect(screen.getByText('Composição')).toBeTruthy()
    expect(screen.getByText('Edição')).toBeTruthy()
    expect(screen.getByText('Som')).toBeTruthy()
  })

  it('renders equipment card', () => {
    render(<BentoSection />)
    expect(screen.getByText(/Captado com o Melhor Equipamento/)).toBeTruthy()
  })

  it('renders Qualidade Consistente card', () => {
    render(<BentoSection />)
    expect(screen.getByText('Qualidade Consistente')).toBeTruthy()
  })

  it('renders Colaborações Fluidas card', () => {
    render(<BentoSection />)
    expect(screen.getByText('Colaborações Fluidas')).toBeTruthy()
  })

  it('renders Abordagem Narrativa card', () => {
    render(<BentoSection />)
    expect(screen.getByText('Abordagem Narrativa')).toBeTruthy()
  })
})
