import { RevealWrapper } from '@/components/motion/RevealWrapper'
import { clientLogos } from '@/lib/data'

export function ProofStripSection() {
  return (
    <section className="py-24 px-6">
      <RevealWrapper>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Gold CTA button */}
          <a
            href="#portfolio"
            className="bg-gold text-white px-8 py-3 rounded-full font-switzer font-semibold text-sm tracking-wide hover:opacity-90 transition-opacity"
          >
            Meu Portfolio
          </a>

          {/* Avatar cluster */}
          <div className="flex items-center">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-9 h-9 rounded-full bg-dark/20 border-2 border-bg -ml-2 first:ml-0"
              />
            ))}
          </div>

          {/* Client logos as text spans */}
          <div className="flex items-center gap-6">
            {clientLogos.map((logo) => (
              <span
                key={logo.id}
                className="font-switzer font-semibold text-sm text-dark/40 tracking-widest uppercase"
              >
                {logo.name}
              </span>
            ))}
          </div>
        </div>
      </RevealWrapper>
    </section>
  )
}
