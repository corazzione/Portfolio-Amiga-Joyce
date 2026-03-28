import type { Metadata } from 'next'
import { ContactForm } from '@/components/sections/ContactForm'
import { RevealWrapper } from '@/components/motion/RevealWrapper'

export const metadata: Metadata = {
  title: 'Contato | Corazon',
  description: 'Entre em contato para fotografia e videografia profissional.',
}

export default function ContatoPage() {
  return (
    <main className="py-24 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left: contact info */}
        <RevealWrapper>
          <div>
            <h1 className="font-switzer text-5xl font-bold tracking-tight mb-6">Vamos Conversar</h1>
            <p className="text-dark/60 text-lg leading-relaxed mb-8">
              Tem um projeto em mente? Adoraria ouvir sua ideia e transformar em visuais de outro nivel.
            </p>
            <div className="space-y-4 mb-8">
              <p className="text-dark/70 text-sm">
                <span className="font-switzer font-semibold text-dark block mb-1">Email</span>
                contato@corazon.com
              </p>
            </div>
            <div>
              <h3 className="font-switzer font-semibold text-sm text-dark/40 uppercase tracking-widest mb-4">Social</h3>
              <div className="flex gap-4">
                <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="text-dark/70 text-sm hover:text-dark transition-colors">X</a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-dark/70 text-sm hover:text-dark transition-colors">Instagram</a>
              </div>
            </div>
          </div>
        </RevealWrapper>
        {/* Right: form */}
        <RevealWrapper delay={0.1}>
          <ContactForm />
        </RevealWrapper>
      </div>
    </main>
  )
}
