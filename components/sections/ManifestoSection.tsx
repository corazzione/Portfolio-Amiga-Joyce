import { RevealWrapper } from '@/components/motion/RevealWrapper'

export function ManifestoSection() {
  return (
    <section className="py-24 px-6 bg-bg text-center">
      <div className="max-w-4xl mx-auto">
        <RevealWrapper variant="fadeUp">
          <p className="font-switzer text-4xl md:text-6xl font-bold leading-tight tracking-tight text-dark">
            Cada imagem conta uma historia.{' '}
            <span className="text-dark/50">
              Cada projeto comeca com uma conversa.
            </span>
          </p>
        </RevealWrapper>
      </div>
    </section>
  )
}
