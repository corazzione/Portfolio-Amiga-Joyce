import { processSteps } from '@/lib/data'
import { RevealWrapper } from '@/components/motion/RevealWrapper'

const topClasses = ['sm:top-16', 'sm:top-20', 'sm:top-24', 'sm:top-28', 'sm:top-32', 'sm:top-36']
const zClasses = ['sm:z-[10]', 'sm:z-[20]', 'sm:z-[30]', 'sm:z-[40]', 'sm:z-[50]', 'sm:z-[60]']
const rotations = [
  'rotate-[1deg]', 'rotate-[-0.5deg]', 'rotate-[0.5deg]',
  'rotate-[-1deg]', 'rotate-[0.5deg]', 'rotate-[-0.5deg]',
]

export function ProcessSection() {
  return (
    <section id="process" className="relative bg-bg py-24">
      <div className="max-w-2xl mx-auto px-6">
        <RevealWrapper>
          <h2 className="font-switzer font-bold text-2xl sm:text-4xl text-dark mb-12 text-center">
            Um Caminho Claro para Visuais Excepcionais
          </h2>
        </RevealWrapper>
        <div className="relative sm:min-h-[300vh]">
          {processSteps.map((step, i) => (
            <div
              key={step.id}
              className={`sm:sticky ${topClasses[i]} ${zClasses[i]} ${rotations[i]} mb-6 bg-white rounded-2xl p-8 shadow-lg transition-shadow`}
            >
              <span className="absolute top-6 right-8 text-gold font-switzer font-bold text-xs tracking-widest">
                {String(step.id).padStart(2, '0')}
              </span>
              <div className="w-24 aspect-square rounded-full bg-dark/10 mx-auto mb-6" />
              <h3 className="font-switzer font-bold text-xl text-dark text-center mb-3">{step.name}</h3>
              <p className="font-sans text-sm text-dark/60 text-center leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
