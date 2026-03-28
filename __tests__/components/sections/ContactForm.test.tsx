import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
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

let mockFetch: ReturnType<typeof vi.fn>

beforeEach(() => {
  mockFetch = vi.fn()
  global.fetch = mockFetch
  mockFetch.mockReset()
})

import { ContactForm } from '@/components/sections/ContactForm'

describe('ContactForm', () => {
  it('renders all four fields', () => {
    render(<ContactForm />)
    expect(screen.getByLabelText(/nome/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/assunto/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/mensagem/i)).toBeInTheDocument()
  })

  it('shows success message on successful submission', async () => {
    const user = userEvent.setup()
    mockFetch.mockResolvedValueOnce({ ok: true })
    render(<ContactForm />)
    await user.type(screen.getByLabelText(/nome/i), 'Test User')
    await user.type(screen.getByLabelText(/email/i), 'test@example.com')
    await user.type(screen.getByLabelText(/assunto/i), 'Test Subject')
    await user.type(screen.getByLabelText(/mensagem/i), 'Test message')
    await user.click(screen.getByRole('button', { name: /enviar mensagem/i }))
    await waitFor(() => {
      expect(screen.getByText('Mensagem enviada! Entraremos em contato em breve.')).toBeInTheDocument()
    })
  })

  it('shows error message on failed submission', async () => {
    const user = userEvent.setup()
    mockFetch.mockResolvedValueOnce({ ok: false })
    render(<ContactForm />)
    await user.type(screen.getByLabelText(/nome/i), 'Test User')
    await user.type(screen.getByLabelText(/email/i), 'test@example.com')
    await user.type(screen.getByLabelText(/assunto/i), 'Test Subject')
    await user.type(screen.getByLabelText(/mensagem/i), 'Test message')
    await user.click(screen.getByRole('button', { name: /enviar mensagem/i }))
    await waitFor(() => {
      expect(screen.getByText('Algo deu errado. Tente novamente.')).toBeInTheDocument()
    })
  })

  it('disables submit button while submitting', async () => {
    const user = userEvent.setup()
    mockFetch.mockImplementation(() => new Promise(() => {}))
    render(<ContactForm />)
    await user.type(screen.getByLabelText(/nome/i), 'Test User')
    await user.type(screen.getByLabelText(/email/i), 'test@example.com')
    await user.type(screen.getByLabelText(/assunto/i), 'Test Subject')
    await user.type(screen.getByLabelText(/mensagem/i), 'Test message')
    await user.click(screen.getByRole('button', { name: /enviar mensagem/i }))
    expect(screen.getByRole('button', { name: /enviando/i })).toBeDisabled()
  })
})
