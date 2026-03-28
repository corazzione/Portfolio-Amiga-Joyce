import { RevealWrapper } from '@/components/motion/RevealWrapper'

export function CTASection() {
  return (
    <section className="py-24 px-6 bg-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <RevealWrapper variant="fadeUp">
          <h2 className="font-switzer text-4xl md:text-5xl font-bold text-white leading-tight max-w-xl">
            Transforme Suas Ideias em Visuais de Outro Nivel
          </h2>
          <a
            href="/contato"
            className="inline-block mt-8 bg-gold text-white px-8 py-3 rounded-full font-switzer font-semibold text-sm tracking-wide hover:opacity-90 transition-opacity"
          >
            Entre em Contato
          </a>
        </RevealWrapper>
      </div>
      {/* Placeholder for standing figure — absolute positioned */}
      <div className="absolute bottom-0 right-12 w-48 h-72 bg-white/5 rounded-t-full hidden lg:block" />
    </section>
  )
}
