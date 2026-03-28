import { RevealWrapper } from '@/components/motion/RevealWrapper'

const skills = ['Iluminação', 'Enquadramento', 'Cor', 'Composição', 'Edição', 'Som']

export function BentoSection() {
  return (
    <section id="why" className="bg-bg py-24">
      <div className="max-w-6xl mx-auto px-6">
        <RevealWrapper>
          <h2 className="font-switzer font-bold text-3xl md:text-4xl text-dark mb-4">
            Construído na Confiança,<br />Movido pela Qualidade
          </h2>
          <p className="font-sans text-sm text-dark/60 max-w-[340px] leading-relaxed mb-12">
            Habilidade, precisão e foco claro em criar visuais que movem pessoas e marcas para frente.
          </p>
        </RevealWrapper>

        <RevealWrapper>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

            {/* 1. Vision card — tall, left, spans 2 rows */}
            <div
              className="relative sm:row-span-2 rounded-2xl overflow-hidden min-h-[280px] sm:min-h-[500px]"
              style={{ background: 'linear-gradient(160deg, #2a1a10, #4a3020)' }}
            >
              <div className="w-full h-full flex items-center justify-center text-[120px] opacity-30">
                👁
              </div>
              <span className="absolute bottom-7 left-7 font-switzer font-bold text-white text-xl">
                Visão Personalizada
              </span>
            </div>

            {/* 2. Detail card — center, beige */}
            <div className="relative rounded-2xl bg-[#E8E0D2] p-8">
              {/* Decorative gold circles SVG */}
              <svg
                className="absolute top-4 right-4 opacity-15"
                width="80"
                height="80"
                viewBox="0 0 80 80"
                fill="none"
                aria-hidden="true"
              >
                <circle cx="40" cy="40" r="36" stroke="#C8973A" strokeWidth="1.5" />
                <circle cx="40" cy="40" r="26" stroke="#C8973A" strokeWidth="1.5" />
                <circle cx="40" cy="40" r="16" stroke="#C8973A" strokeWidth="1.5" />
              </svg>
              <h3 className="font-switzer font-bold text-xl text-dark mb-5">Atenção aos Detalhes</h3>
              <div className="flex flex-wrap gap-x-6 gap-y-3">
                {skills.map((skill) => (
                  <span key={skill} className="flex items-center gap-2 text-sm font-sans text-dark">
                    <span className="text-gold">✓</span> {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* 3. Gear card — right top, green-gray */}
            <div className="rounded-2xl bg-[#C5CEC8] p-8 flex items-end min-h-[200px]">
              <h3 className="font-switzer font-bold text-dark text-lg">
                Captado com o Melhor Equipamento
              </h3>
            </div>

            {/* 4. Quality card — polaroids */}
            <div className="rounded-2xl bg-white p-8 flex flex-col items-center justify-center gap-2">
              <div className="relative w-24 h-24 mb-4">
                <div className="absolute inset-0 rotate-[-8deg] bg-white shadow-md rounded w-16 h-20 top-2 left-2">
                  <div className="w-full h-14 bg-[#d0c4b4] rounded-t" />
                </div>
                <div className="absolute inset-0 rotate-[3deg] bg-white shadow-md rounded w-16 h-20 top-0 left-4">
                  <div className="w-full h-14 bg-[#c4b8a8] rounded-t" />
                </div>
                <div className="absolute inset-0 rotate-[-2deg] bg-white shadow-md rounded w-16 h-20 top-1 left-3">
                  <div className="w-full h-14 bg-[#e0d4c4] rounded-t" />
                </div>
              </div>
              <h3 className="font-switzer font-bold text-dark text-xl text-center">
                Qualidade Consistente
              </h3>
            </div>

            {/* 5. Collaborations card */}
            <div className="rounded-2xl bg-white p-8">
              <h3 className="font-switzer font-bold text-dark text-lg mb-3">
                Colaborações Fluidas
              </h3>
              <div className="flex mb-3">
                <div className="w-[30px] h-[30px] rounded-full bg-[#c8b8a8]" />
                <div className="w-[30px] h-[30px] rounded-full bg-[#b8a898] -ml-2" />
                <div className="w-[30px] h-[30px] rounded-full bg-[#d8c8b8] -ml-2" />
              </div>
              <div className="flex gap-0.5 mb-2">
                {[1, 2, 3, 4, 5].map((n) => (
                  <span key={n} className="text-gold text-sm">★</span>
                ))}
              </div>
              <span className="text-xs font-sans text-dark/60">540+ Clientes no Mundo</span>
            </div>

            {/* 6. Story card — dark */}
            <div className="rounded-2xl bg-[#4a2820] p-8 flex flex-col justify-end min-h-[200px]">
              <h3 className="font-switzer font-bold text-white text-xl mb-2">
                Abordagem Narrativa
              </h3>
              <p className="font-sans text-xs text-white/60 leading-relaxed">
                Foco em visuais que conectam e deixam uma impressão duradoura.
              </p>
            </div>

          </div>
        </RevealWrapper>
      </div>
    </section>
  )
}
