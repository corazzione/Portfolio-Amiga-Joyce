'use client'

import { useState } from 'react'

type Status = 'idle' | 'submitting' | 'success' | 'error'

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('submitting')
    const form = e.currentTarget
    const data = new FormData(form)
    const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ID
      ? `https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_ID}`
      : 'https://formspree.io/f/REPLACE_WITH_FORM_ID'
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      if (res.ok) {
        setStatus('success')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-sm space-y-6">
      <label className="block">
        <span className="block font-switzer text-sm font-semibold text-dark mb-2">Nome</span>
        <input
          type="text"
          name="name"
          required
          className="w-full border border-dark/20 rounded-xl px-4 py-3 font-sans text-dark focus:outline-none focus:ring-2 focus:ring-gold/40 disabled:opacity-50"
          disabled={status === 'submitting'}
        />
      </label>

      <label className="block">
        <span className="block font-switzer text-sm font-semibold text-dark mb-2">Email</span>
        <input
          type="email"
          name="email"
          required
          className="w-full border border-dark/20 rounded-xl px-4 py-3 font-sans text-dark focus:outline-none focus:ring-2 focus:ring-gold/40 disabled:opacity-50"
          disabled={status === 'submitting'}
        />
      </label>

      <label className="block">
        <span className="block font-switzer text-sm font-semibold text-dark mb-2">Assunto</span>
        <input
          type="text"
          name="subject"
          required
          className="w-full border border-dark/20 rounded-xl px-4 py-3 font-sans text-dark focus:outline-none focus:ring-2 focus:ring-gold/40 disabled:opacity-50"
          disabled={status === 'submitting'}
        />
      </label>

      <label className="block">
        <span className="block font-switzer text-sm font-semibold text-dark mb-2">Mensagem</span>
        <textarea
          name="message"
          rows={5}
          required
          className="w-full border border-dark/20 rounded-xl px-4 py-3 font-sans text-dark focus:outline-none focus:ring-2 focus:ring-gold/40 disabled:opacity-50"
          disabled={status === 'submitting'}
        />
      </label>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full bg-gold text-dark font-switzer font-semibold py-3 px-6 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {status === 'submitting' ? 'Enviando...' : 'Enviar Mensagem'}
      </button>

      {status === 'success' && (
        <p className="text-sm text-dark/70">Mensagem enviada! Entraremos em contato em breve.</p>
      )}
      {status === 'error' && (
        <p className="text-sm text-red-600">Algo deu errado. Tente novamente.</p>
      )}
    </form>
  )
}
