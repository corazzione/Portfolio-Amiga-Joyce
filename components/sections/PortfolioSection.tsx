import { StaggerChildren, StaggerItem } from '@/components/motion/StaggerChildren'
import { PortfolioCard } from './PortfolioCard'

const portfolioItems = [
  { id: 'p1', caption: 'Retrato Editorial' },
  { id: 'p2', caption: 'Campanha de Marca' },
  { id: 'p3', caption: 'Cobertura de Evento' },
  { id: 'p4', caption: 'Lifestyle & Produto' },
  { id: 'p5', caption: 'Videografia' },
  { id: 'p6', caption: 'Documental' },
]

export function PortfolioSection() {
  return (
    <section id="portfolio" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-switzer text-4xl font-bold tracking-tight mb-12">
          Trabalhos Selecionados
        </h2>
        <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {portfolioItems.map((item) => (
            <StaggerItem key={item.id}>
              <PortfolioCard caption={item.caption} />
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  )
}
