'use client'

import { clientLogos } from '@/lib/data'

const showcaseImages = [
  'https://framerusercontent.com/images/17dNyCPODsEeIl48Pej9Rglrmc.png?width=675&height=1200',
  'https://framerusercontent.com/images/QJuz54nmjbsesqGJkdNUrJSuRgs.png?width=960&height=1200',
  'https://framerusercontent.com/images/SHpm5JLT9X16LG28VxAgzi1jKvM.png?width=900&height=1200',
  'https://framerusercontent.com/images/lunWhumAey9Zvn2qztBuKw3lr4.png?width=900&height=1200',
  'https://framerusercontent.com/images/opPcTuyGGMldvhH8CbZNJCv8r0M.png?width=900&height=1200',
] as const

const avatarImages = [
  'https://framerusercontent.com/images/RkvXy2HZtwOFAtKs5AagReCCcJg.png?width=960&height=1200',
  'https://framerusercontent.com/images/QRfejkUxpaO3EBLC3ZiHYQTTPhw.png?width=1200&height=1200',
  'https://framerusercontent.com/images/1hhDxJE8FAgIoYwIH5SPM7EDbw.png?width=933&height=1200',
] as const

const duplicateLogos = [...clientLogos, ...clientLogos, ...clientLogos]

export function ManifestoSection() {
  return (
    <section className="bg-bg px-4 pb-10 pt-14 sm:px-5 sm:pb-14 sm:pt-16 lg:px-10 lg:pb-[72px] lg:pt-[100px]">
      <div className="mx-auto flex max-w-[1360px] flex-col items-center gap-16 lg:gap-[120px]">
        <div className="flex w-full justify-center overflow-visible">
          <div
            className="flex w-full justify-center overflow-hidden pb-6 lg:pb-[120px]"
            style={{
              maskImage:
                'radial-gradient(46% 266%, #000 0%, #000 51.95%, transparent 100%)',
              WebkitMaskImage:
                'radial-gradient(46% 266%, #000 0%, #000 51.95%, transparent 100%)',
            }}
          >
            <div className="flex items-start justify-center gap-3 sm:gap-5 lg:gap-[21.48px]">
              {showcaseImages.map((image, index) => {
                const isMain = index === 2

                if (isMain) {
                  return (
                    <div
                      key={image}
                      className="relative hidden shrink-0 bg-bg p-2 sm:block"
                      style={{
                        width: '272px',
                        height: '281px',
                        boxShadow:
                          '0 0.824357px 3.4623px -0.375px rgba(0,0,0,0.07), 0 2.10766px 8.85215px -0.75px rgba(0,0,0,0.07), 0 4.22539px 17.7466px -1.125px rgba(0,0,0,0.07), 0 8.00987px 33.6414px -1.5px rgba(0,0,0,0.07), 0 15.9212px 66.8691px -1.875px rgba(0,0,0,0.07), 0 35px 147px -2.25px rgba(0,0,0,0.08)',
                      }}
                    >
                      <img
                        src={image}
                        alt=""
                        className="absolute left-2 right-2 top-2 h-[245px] w-[256px] object-cover"
                      />
                    </div>
                  )
                }

                return (
                  <div
                    key={image}
                    className={`relative h-[180px] w-[31vw] max-w-[120px] shrink-0 sm:h-[243px] sm:w-[257px] sm:max-w-none ${index === 0 || index === 4 ? 'hidden lg:block' : ''}`}
                  >
                    <img
                      src={image}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div className="flex w-full max-w-[849px] flex-col items-center gap-10 lg:gap-[60px]">
          <h2 className="max-w-[849px] text-center font-switzer text-[25px] font-semibold leading-[1.2] tracking-[-0.02em] text-[#0a0805] sm:text-[32px] lg:text-[36px]">
            Qualquer pessoa pode tirar fotos ou gravar videos. O que me
            diferencia e a historia que conto com eles. Cada quadro e
            intencional, construido com detalhe, emocao e proposito.
          </h2>

          <div className="flex flex-col items-center gap-8 lg:gap-7">
            <div className="flex w-full flex-col items-center gap-6 sm:flex-row sm:justify-center sm:gap-8">
              <a
                href="/portfolio"
                className="flex h-14 w-full items-center justify-center bg-[#d19f41] px-6 text-center font-switzer text-[15px] font-bold uppercase tracking-[-0.02em] text-[#0a0805] transition-opacity hover:opacity-90 sm:w-auto sm:min-w-fit sm:px-10"
              >
                Meu Portfolio
              </a>

              <div className="flex flex-wrap items-center justify-center gap-4 sm:flex-nowrap sm:items-end sm:gap-6">
                <div className="flex pl-[11px]">
                  {avatarImages.map((image) => (
                    <div
                      key={image}
                      className="relative -ml-[11px] first:ml-0"
                    >
                      <img
                        src={image}
                        alt=""
                        className="h-12 w-12 rounded-full border-[3px] border-[#efe8dc] object-cover"
                      />
                    </div>
                  ))}
                </div>

                <div className="flex flex-col items-center gap-1 sm:items-start">
                  <div className="flex items-center gap-[2px] text-[#0a0805]">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <span key={index} className="text-[13px] leading-none">
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="text-center font-switzer text-sm font-semibold tracking-[-0.02em] text-[#0a0805] sm:text-left">
                    540+ clientes pelo mundo
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full max-w-[649px] overflow-hidden">
              <div
                className="flex items-center gap-6 py-[10px]"
                style={{
                  maskImage:
                    'linear-gradient(to right, transparent 0%, black 12.5%, black 87.5%, transparent 100%)',
                  WebkitMaskImage:
                    'linear-gradient(to right, transparent 0%, black 12.5%, black 87.5%, transparent 100%)',
                }}
              >
                {duplicateLogos.map((logo, index) => (
                  <span
                    key={`${logo.id}-${index}`}
                    className="shrink-0 font-switzer text-[21px] font-medium tracking-[-0.02em] text-[#0a0805]/70 sm:text-2xl"
                  >
                    {logo.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div
            className="relative w-full max-w-[420px] overflow-visible"
            style={{
              height: '289px',
            }}
          >
            <div className="absolute inset-x-0 top-0 flex justify-center">
              <div className="h-[226px] w-full overflow-hidden">
                <video
                  src="https://framerusercontent.com/assets/g3jXsx9hlJk3LnsdyHs46WpTmKA.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            <div
              className="absolute bottom-0 left-[-18px] right-[-18px] h-44 backdrop-blur-[10px] sm:left-[-56px] sm:right-[-57px]"
              style={{
                background:
                  'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.01) 100%)',
                maskImage:
                  'linear-gradient(180deg, transparent 30%, black 57.0571%, black 78.0781%, transparent 100%)',
                WebkitMaskImage:
                  'linear-gradient(180deg, transparent 30%, black 57.0571%, black 78.0781%, transparent 100%)',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
