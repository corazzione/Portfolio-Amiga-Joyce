import { RevealWrapper } from '@/components/motion/RevealWrapper'

export function PhotoStripSection() {
  return (
    <section className="py-16 px-6 overflow-hidden">
      <RevealWrapper variant="scaleIn">
        <div className="flex gap-4 overflow-x-auto max-w-7xl mx-auto">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[220px] aspect-[4/3] bg-dark/10 rounded-lg"
            />
          ))}
        </div>
      </RevealWrapper>
    </section>
  )
}
