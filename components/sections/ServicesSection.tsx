import { services } from '@/lib/data'

function ServiceDots() {
  return (
    <div className="absolute bottom-[-6px] left-[6px] right-[6px] flex items-center justify-between">
      {Array.from({ length: 12 }).map((_, index) => (
        <span
          key={index}
          className="block h-4 w-[13px] rounded-[4px] bg-[#efe8dc]"
        />
      ))}
    </div>
  )
}

function ServiceCard({
  index,
  title,
  description,
}: {
  index: number
  title: string
  description: string
}) {
  return (
    <article className="relative flex h-[280px] w-full flex-col overflow-visible bg-[#ffffffd9] px-4 pb-10 pt-5">
      <div className="flex h-full flex-col justify-between">
        <div className="flex flex-col items-start gap-8">
          <div className="flex flex-col items-start gap-8">
            <div className="flex h-[30px] w-[30px] items-center justify-center bg-[#261f12]">
              <span className="font-switzer text-xs font-semibold leading-[1.3] tracking-[-0.02em] text-[#efe8dc]">
                {index}
              </span>
            </div>

            <h3 className="font-switzer text-[21px] font-medium leading-[1.3] tracking-[-0.02em] text-[#0a0805] sm:text-2xl">
              {title}
            </h3>
          </div>

          <p className="max-w-[240px] font-sans text-[15px] font-normal leading-[1.3] tracking-[-0.02em] text-[#0a0805]">
            {description}
          </p>
        </div>
      </div>

      <ServiceDots />
    </article>
  )
}

export function ServicesSection() {
  return (
    <section
      id="services"
      className="bg-bg px-4 py-16 sm:px-5 lg:px-10"
    >
      <div className="mx-auto flex max-w-[1360px] flex-col items-center gap-16 lg:gap-20">
        <div className="flex w-full flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <div className="flex w-full max-w-[370px] flex-col items-start gap-5">
            <h2 className="font-switzer text-[30px] font-semibold leading-[1.2] tracking-[-0.02em] text-[#0a0805] sm:text-[34px] lg:text-[40px]">
              Meus Serviços
            </h2>
            <p className="font-sans text-[15px] font-medium leading-[1.3] tracking-[-0.02em] text-[#0a080594] sm:text-base">
              Seja para fotos, videos ou direcao criativa completa, eu entrego
              visuais que elevam a sua identidade.
            </p>
          </div>

          <a
            href="/about"
            className="flex h-14 items-center justify-center bg-[#d19f41] px-10 font-switzer text-[15px] font-bold uppercase tracking-[-0.02em] text-[#0a0805] transition-opacity hover:opacity-90"
          >
            Mais Sobre Mim
          </a>
        </div>

        <div className="grid w-full grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 xl:grid-cols-4">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              index={index + 1}
              title={service.title}
              description={service.description}
            />
          ))}

          <div className="w-full self-start">
            <div className="h-[280px] w-full overflow-hidden bg-[#f5f5f5]">
              <img
                src="https://framerusercontent.com/images/hGgMxHaMzJ1HGOsJn6tZWhvW4s.png?width=800&height=1200"
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
