import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import PrivacidadePage from '@/app/privacidade/page'

describe('PrivacidadePage', () => {
  it('renders main heading', () => {
    render(<PrivacidadePage />)
    expect(screen.getByText('Politica de Privacidade')).toBeInTheDocument()
  })

  it('renders all 10 LGPD section headings', () => {
    render(<PrivacidadePage />)
    expect(screen.getByText('1. Quem Somos')).toBeInTheDocument()
    expect(screen.getByText('2. Dados Coletados')).toBeInTheDocument()
    expect(screen.getByText('3. Finalidade do Tratamento')).toBeInTheDocument()
    expect(screen.getByText('4. Base Legal')).toBeInTheDocument()
    expect(screen.getByText('5. Compartilhamento de Dados')).toBeInTheDocument()
    expect(screen.getByText('6. Direitos do Titular')).toBeInTheDocument()
    expect(screen.getByText('7. Cookies')).toBeInTheDocument()
    expect(screen.getByText('8. Retencao de Dados')).toBeInTheDocument()
    expect(screen.getByText('9. Contato do Responsavel')).toBeInTheDocument()
    expect(screen.getByText('10. Alteracoes nesta Politica')).toBeInTheDocument()
  })

  it('renders last updated date', () => {
    render(<PrivacidadePage />)
    expect(screen.getByText(/28 de marco de 2026/)).toBeInTheDocument()
  })
})
