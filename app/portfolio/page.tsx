import type { Metadata } from 'next'
import { RevealWrapper } from '@/components/motion/RevealWrapper'
import { StaggerChildren, StaggerItem } from '@/components/motion/StaggerChildren'
import { PortfolioCard } from '@/components/sections/PortfolioCard'

export const metadata: Metadata = {
  title: 'Portfolio | Corazon',
  description: 'Trabalhos de fotografia e videografia — casamento, ensaio, corporativo, eventos.',
}

const categories = [
  {
    name: 'Casamento',
    items: [
      { id: 'cas-1', caption: 'Casamento na Praia' },
      { id: 'cas-2', caption: 'Cerimonia ao Ar Livre' },
      { id: 'cas-3', caption: 'Recepcao Intima' },
      { id: 'cas-4', caption: 'Casamento no Campo' },
    ],
  },
  {
    name: 'Ensaio',
    items: [
      { id: 'ens-1', caption: 'Ensaio Feminino' },
      { id: 'ens-2', caption: 'Ensaio Casal' },
      { id: 'ens-3', caption: 'Ensaio Familia' },
    ],
  },
  {
    name: 'Corporativo',
    items: [
      { id: 'cor-1', caption: 'Retrato Executivo' },
      { id: 'cor-2', caption: 'Evento Corporativo' },
      { id: 'cor-3', caption: 'Fotografia de Produto' },
    ],
  },
  {
    name: 'Eventos',
    items: [
      { id: 'eve-1', caption: 'Aniversario' },
      { id: 'eve-2', caption: 'Formatura' },
      { id: 'eve-3', caption: 'Evento Social' },
    ],
  },
  {
    name: 'Video',
    items: [
      { id: 'vid-1', caption: 'Video Institucional' },
      { id: 'vid-2', caption: 'Highlights Casamento' },
      { id: 'vid-3', caption: 'Ensaio em Movimento' },
    ],
  },
]

export default function PortfolioPage() {
  return (
    <main className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <RevealWrapper>
          <h1 className="font-switzer text-3xl sm:text-5xl font-bold tracking-tight mb-16">Todos os Trabalhos</h1>
        </RevealWrapper>
        {categories.map((category) => (
          <section key={category.name} className="mb-20">
            <RevealWrapper>
              <h2 className="font-switzer text-2xl font-semibold mb-8">{category.name}</h2>
            </RevealWrapper>
            <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.items.map((item) => (
                <StaggerItem key={item.id}>
                  <PortfolioCard caption={item.caption} />
                </StaggerItem>
              ))}
            </StaggerChildren>
          </section>
        ))}
      </div>
    </main>
  )
}
