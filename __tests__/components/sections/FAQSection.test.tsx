import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'

const { mockUseReducedMotion } = vi.hoisted(() => ({
  mockUseReducedMotion: vi.fn(() => false),
}))

vi.mock('motion/react', () => ({
  motion: {
    div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement> & { children?: React.ReactNode }) => (
      <div {...props}>{children}</div>
    ),
    button: ({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { children?: React.ReactNode }) => (
      <button {...props}>{children}</button>
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

import { FAQSection } from '@/components/sections/FAQSection'

describe('FAQSection', () => {
  it('renders 4 FAQ questions', () => {
    render(<FAQSection />)
    expect(screen.getByText('Que tipos de projetos você realiza?')).toBeInTheDocument()
    expect(screen.getByText('Quanto tempo leva para receber os arquivos finais?')).toBeInTheDocument()
    expect(screen.getByText('Você oferece pacotes personalizados?')).toBeInTheDocument()
    expect(screen.getByText('Você está disponível para viagens?')).toBeInTheDocument()
  })

  it('clicking a question shows its answer', async () => {
    const user = userEvent.setup()
    render(<FAQSection />)
    const btn = screen.getByText('Que tipos de projetos você realiza?')
    await user.click(btn)
    expect(screen.getByText(/Trabalho com fotografia/i)).toBeInTheDocument()
  })

  it('clicking same question again toggles it closed (button still present)', async () => {
    const user = userEvent.setup()
    render(<FAQSection />)
    const btn = screen.getByText('Que tipos de projetos você realiza?')
    await user.click(btn)
    await user.click(btn)
    // Answer text is still in DOM (motion.div is mocked to plain div), button remains
    expect(screen.getByText('Que tipos de projetos você realiza?')).toBeInTheDocument()
  })

  it('clicking different question closes previous', async () => {
    const user = userEvent.setup()
    render(<FAQSection />)
    const btn1 = screen.getByText('Que tipos de projetos você realiza?')
    const btn2 = screen.getByText('Quanto tempo leva para receber os arquivos finais?')
    await user.click(btn1)
    await user.click(btn2)
    // Second question's answer should now be visible
    expect(screen.getByText(/Normalmente de 7 a 14 dias/i)).toBeInTheDocument()
    // Both buttons remain in document
    expect(btn1).toBeInTheDocument()
    expect(btn2).toBeInTheDocument()
  })
})
