const detailItems = [
  'Iluminação',
  'Enquadramento',
  'Cor',
  'Composição',
  'Edição',
  'Som',
] as const

const collabAvatars = [
  'https://framerusercontent.com/images/OFLcc6LcmHL0BVlLymUeRgqpm0.png?width=902&height=1200',
  'https://framerusercontent.com/images/tJKMYRt4meocCJyaShdA2jORnv4.png?width=900&height=1200',
  'https://framerusercontent.com/images/eQmYrCrKNoJpLlbVfYTUqKCGDgU.png?width=902&height=1200',
] as const

const qualityShots = [
  {
    src: 'https://framerusercontent.com/images/KdNoZZk3OD1MqJJoueIcpok5Rvs.png?width=1200&height=1200',
    className: 'left-[14px] top-[82px] -rotate-[9deg] sm:left-[26px] lg:left-[39px] lg:top-[77px]',
  },
  {
    src: 'https://framerusercontent.com/images/fgrNiJOSDiVEweLnajj8UVqX98.png?width=675&height=1200',
    className: 'right-[14px] top-[82px] rotate-[14deg] sm:right-[26px] lg:right-[52px] lg:top-[77px]',
  },
  {
    src: 'https://framerusercontent.com/images/XyiWfo5UyYYA3ohWYdLz5EAbrY.png?width=1200&height=904',
    className: 'left-1/2 top-[26px] -translate-x-1/2 rotate-[9deg] lg:top-[41px]',
  },
] as const

function DividerDots({ count = 16 }: { count?: number }) {
  return (
    <div className="flex w-full items-center justify-between gap-2">
      {Array.from({ length: count }).map((_, index) => (
        <span
          key={index}
          className="block h-4 w-[13px] rounded-[4px] bg-[#efe8dc]"
        />
      ))}
    </div>
  )
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex items-center gap-[6px] font-switzer text-sm font-semibold tracking-[-0.02em] text-[#0a0805]">
      <span className="text-base leading-none">✓</span>
      {children}
    </span>
  )
}

export function BentoSection() {
  return (
    <section
      id="why-choose-us"
      className="bg-bg px-4 py-16 sm:px-5 lg:px-10 lg:py-[100px]"
    >
      <div className="mx-auto flex max-w-[1360px] flex-col items-center gap-16 lg:gap-20">
        <div className="flex w-full flex-col items-start gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex w-full max-w-[563px] flex-col items-start gap-5">
            <div className="flex w-min items-center justify-center bg-[#0a080512] px-[6px] py-1">
              <span className="whitespace-nowrap font-switzer text-[15px] font-semibold leading-[1.3] tracking-[-0.02em] text-[#0a0805]">
                Por que me escolher
              </span>
            </div>

            <h2 className="font-switzer text-[30px] font-semibold leading-[1.2] tracking-[-0.02em] text-[#0a0805] sm:text-[34px] lg:text-[40px]">
              Construído na Confiança, Movido pela Qualidade
            </h2>
          </div>

          <p className="max-w-[320px] font-sans text-[15px] font-medium leading-[1.3] tracking-[-0.02em] text-[#0a080594]">
            Técnica, precisão e um foco claro em criar visuais que movem pessoas
            e marcas para frente.
          </p>
        </div>

        <div className="w-full bg-[#fff9] p-2">
          <div className="flex flex-col gap-2 lg:h-[992px] lg:flex-row">
            <div className="flex flex-col gap-2 lg:h-full lg:flex-1">
              <div className="relative min-h-[360px] flex-1 overflow-hidden lg:min-h-0">
                <img
                  src="https://framerusercontent.com/images/BAGr1GDvGnj4Gui8oRdT5wFNt8.png?width=992&height=1200"
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-[#0a080521]" />
                <h3 className="absolute left-1/2 top-1/2 z-[2] -translate-x-1/2 -translate-y-1/2 text-center font-switzer text-[22px] font-semibold leading-[1.2] tracking-[-0.02em] text-white sm:text-[32px]">
                  Visão Sob Medida
                </h3>
              </div>

              <div className="flex items-center justify-between">
                <DividerDots />
              </div>

              <div className="relative flex min-h-[220px] flex-col items-center justify-center overflow-hidden bg-[#efe8dc] px-8 py-10 lg:min-h-0 lg:basis-[24%]">
                <div className="absolute -right-[240px] -top-6 rotate-[41deg] opacity-45">
                  <div className="relative h-[520px] w-[768px]">
                    {[0, 88, 208, 320].map((offset) => (
                      <div
                        key={offset}
                        className="absolute top-0 h-[448px] w-[448px] rounded-full border border-[#d19f41]"
                        style={{ left: `${offset}px` }}
                      />
                    ))}
                  </div>
                </div>

                <div className="relative z-[1] flex max-w-[420px] flex-col items-center gap-6">
                  <h3 className="text-center font-switzer text-[22px] font-semibold leading-[1.2] tracking-[-0.02em] text-[#0a0805] sm:text-[32px]">
                    Colaborações Fluidas
                  </h3>

                  <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
                    <div className="flex pl-[11px]">
                      {collabAvatars.map((src, index) => (
                        <img
                          key={src}
                          src={src}
                          alt=""
                          className={`h-12 w-12 rounded-full border-[3px] border-[#efe8dc] object-cover ${index === 0 ? '' : '-ml-[11px]'}`}
                        />
                      ))}
                    </div>

                    <div className="flex flex-col items-center gap-1 sm:items-start">
                      <div className="flex gap-[2px] text-[#d19f41]">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <span key={index}>★</span>
                        ))}
                      </div>
                      <p className="text-center font-switzer text-sm font-semibold tracking-[-0.02em] text-[#0a0805] sm:text-left">
                        540+ clientes pelo mundo
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 lg:h-full lg:flex-1">
              <div className="relative flex min-h-[280px] flex-col items-center justify-center overflow-hidden bg-[#efe8dc] px-4 py-10 lg:min-h-0 lg:flex-1">
                <h3 className="relative z-[1] text-center font-switzer text-[22px] font-semibold leading-[1.2] tracking-[-0.02em] text-[#0a0805] sm:text-[32px]">
                  Atenção aos Detalhes
                </h3>

                <div className="relative z-[1] mt-6 flex max-w-[420px] flex-wrap items-center justify-center gap-4 sm:gap-6">
                  {detailItems.map((item) => (
                    <Chip key={item}>{item}</Chip>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <DividerDots />
              </div>

              <div className="relative min-h-[220px] overflow-hidden lg:min-h-0 lg:basis-[29%]">
                <video
                  src="https://framerusercontent.com/assets/MAg4L718ASChTJhZXXNCvp7OGQ.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-[#0a080512]" />
                <h3 className="absolute left-1/2 top-1/2 z-[2] -translate-x-1/2 -translate-y-1/2 text-center font-switzer text-[18px] font-semibold leading-[1.3] tracking-[-0.02em] text-[#0a0805] sm:text-[24px]">
                  Captado com o Melhor Equipamento
                </h3>
              </div>

              <div className="flex items-center justify-between">
                <DividerDots />
              </div>

              <div className="relative min-h-[280px] overflow-hidden bg-[#efe8dc] lg:min-h-0 lg:basis-[37%]">
                <div className="relative h-full min-h-[280px] lg:min-h-0">
                  {qualityShots.map((shot) => (
                    <div
                      key={shot.src}
                      className={`absolute h-[126px] w-[120px] bg-white p-1 shadow-[0_0.711334px_2.9876px_-0.45px_rgba(0,0,0,0.07),0_1.93715px_8.13604px_-0.9px_rgba(0,0,0,0.07),0_4.25329px_17.8638px_-1.35px_rgba(0,0,0,0.07),0_9.44132px_39.6536px_-1.8px_rgba(0,0,0,0.07),0_24px_100.8px_-2.25px_rgba(0,0,0,0.08)] sm:h-[140px] sm:w-[134px] lg:h-[154px] lg:w-[148px] ${shot.className}`}
                    >
                      <img
                        src={shot.src}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}

                  <h3 className="absolute bottom-[26px] left-1/2 w-[90%] -translate-x-1/2 text-center font-switzer text-[20px] font-semibold leading-[1.2] tracking-[-0.02em] text-[#0a0805] sm:text-[26px] lg:bottom-[35px] lg:w-auto lg:text-[32px]">
                    Qualidade Consistente
                  </h3>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 lg:h-full lg:flex-1">
              <div className="relative min-h-[260px] overflow-hidden lg:min-h-0 lg:flex-1">
                <video
                  src="https://framerusercontent.com/assets/wz1i2lnjR0tt4V53LPTtHPHwEM.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-[#0a08054d]" />
                <div className="absolute left-1/2 top-1/2 z-[2] -translate-x-1/2 -translate-y-1/2">
                  <p className="text-center font-switzer text-[18px] font-semibold leading-[1.3] tracking-[-0.02em] text-white sm:text-[24px]">
                    Filmado com os Melhores Recursos
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <DividerDots />
              </div>

              <div className="relative min-h-[300px] overflow-hidden lg:min-h-0 lg:basis-[67%]">
                <img
                  src="https://framerusercontent.com/images/eIpjkr8adujr6I68YyVfc0WTuTI.png?width=800&height=1200"
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(84,84,84,0)_46.8468%,rgba(0,0,0,0.42)_100%)]" />
                <div className="absolute bottom-[26px] left-[20px] right-[20px] z-[2] flex max-w-[205px] flex-col items-start gap-3 sm:left-[30px] lg:bottom-[52px] lg:left-[38px] lg:right-auto">
                  <h3 className="font-switzer text-[22px] font-semibold leading-[1.2] tracking-[-0.02em] text-white sm:text-[26px] lg:text-[32px]">
                    Abordagem Guiada por História
                  </h3>
                  <p className="font-sans text-sm font-normal leading-[1.2] tracking-[-0.01em] text-[#ffffffd9]">
                    Eu foco em visuais que conectam e deixam uma impressão
                    duradoura.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
