import { processSteps } from '@/lib/data'

const processImages = [
  'https://framerusercontent.com/images/4SLUWePSxAzDyoquyaIdvGMyH1w.png?width=960&height=1200',
  'https://framerusercontent.com/images/c6v0Ypbu2euic0WAHLN5LKQMOaA.png?width=904&height=1200',
  'https://framerusercontent.com/images/AdBnyue4WwpNtwm5DoM7K53DVQ.png?width=960&height=1200',
  'https://framerusercontent.com/images/vOi2lbmRRbcU8DQD4RIb4B5e8Fs.png?width=960&height=1200',
  'https://framerusercontent.com/images/U4lCTADVqGEy96IwNiiV5yzrPqs.png?width=800&height=1200',
  'https://framerusercontent.com/images/AypO9DK23gHwtp8MSMY9GKUAVU.png?width=960&height=1200',
] as const

const rotations = [
  'rotate-[1.8deg]',
  'rotate-[-1.8deg]',
  'rotate-[1.8deg]',
  'rotate-[-1.8deg]',
  'rotate-[1.8deg]',
  'rotate-[-1.8deg]',
]

function ProcessCard({
  index,
  step,
  image,
  rotation,
}: {
  index: number
  step: (typeof processSteps)[number]
  image: string
  rotation: string
}) {
  return (
    <article
      className={`sticky top-24 w-full max-w-[320px] origin-center bg-white ${rotation} sm:top-28`}
    >
      <div className="flex flex-col items-center gap-10 px-6 pb-8 pt-6">
        <div className="flex w-full flex-col items-center gap-2 pt-2">
          <span className="font-switzer text-sm font-semibold leading-[1.3] tracking-[-0.02em] text-[#0a0805]">
            {index}
          </span>
          <div className="h-px w-full bg-[#0a0805]/30" />
        </div>

        <div className="flex w-full flex-col items-center gap-10">
          <h3 className="text-center font-switzer text-xl font-semibold leading-[1.3] tracking-[-0.02em] text-[#0a0805]">
            {step.name}
          </h3>

          <div className="h-[150px] w-full overflow-hidden rounded-[160px]">
            <img
              src={image}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>

          <p className="max-w-[207px] text-center font-sans text-sm font-normal leading-[1.2] tracking-[-0.01em] text-[#0a0805]">
            {step.description}
          </p>
        </div>
      </div>
    </article>
  )
}

export function ProcessSection() {
  return (
    <section
      id="my-process"
      className="bg-bg px-5 py-24 lg:px-10 lg:py-[120px]"
    >
      <div className="mx-auto flex max-w-[466px] flex-col items-center gap-16 lg:gap-20">
        <div className="flex w-full flex-col items-center gap-5">
          <div className="flex w-min items-center justify-center bg-[#0a080512] px-[6px] py-1">
            <span className="whitespace-nowrap font-switzer text-[15px] font-semibold leading-[1.3] tracking-[-0.02em] text-[#0a0805]">
              Meu Processo
            </span>
          </div>

          <h2 className="text-center font-switzer text-[30px] font-semibold leading-[1.2] tracking-[-0.02em] text-[#0a0805] sm:text-[34px] lg:text-[40px]">
            Um Caminho Claro para Visuais Excepcionais
          </h2>
        </div>

        <div className="flex w-full flex-col items-center gap-10">
          {processSteps.map((step, index) => (
            <ProcessCard
              key={step.id}
              index={index + 1}
              step={step}
              image={processImages[index]}
              rotation={rotations[index]}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
