import { StaggerChildren, StaggerItem } from '@/components/motion/StaggerChildren'
import { ServiceCard } from './ServiceCard'
import { services } from '@/lib/data'

export function ServicesSection() {
  return (
    <section id="services" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-12">
          <h2 className="font-switzer text-2xl sm:text-4xl font-bold tracking-tight">Meus Servicos</h2>
          <a
            href="#services"
            className="bg-gold text-white px-6 py-2 rounded-full font-switzer text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Ver Todos
          </a>
        </div>
        <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s) => (
            <StaggerItem key={s.id}>
              <ServiceCard service={s} />
            </StaggerItem>
          ))}
          <StaggerItem>
            <div className="bg-dark rounded-2xl aspect-[3/4] flex items-end p-6">
              <span className="text-white/60 font-switzer text-sm">Foto Card</span>
            </div>
          </StaggerItem>
        </StaggerChildren>
      </div>
    </section>
  )
}
