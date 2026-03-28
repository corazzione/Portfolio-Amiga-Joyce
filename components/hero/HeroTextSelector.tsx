'use client'

import { useReducedMotion } from 'motion/react'

const texts = ['A Criação', 'Videografia', 'Fotografia'] as const

interface Props {
  activeIndex: number
  onSelect: (index: number) => void
}

export function HeroTextSelector({ activeIndex, onSelect }: Props) {
  const prefersReduced = useReducedMotion()

  return (
    <div className="flex flex-col items-center select-none" style={{ gap: '6px' }}>
      {texts.map((text, i) => {
        const isActive = i === activeIndex
        return (
          <p
            key={text}
            onClick={() => onSelect(i)}
            className="font-switzer text-center cursor-pointer"
            style={{
              fontSize: isActive ? 'clamp(40px, 7vw, 88px)' : 'clamp(14px, 2vw, 18px)',
              color: isActive ? 'rgb(255,255,255)' : 'rgba(255,255,255,0.3)',
              fontWeight: isActive ? 700 : 500,
              letterSpacing: isActive ? '-0.03em' : '0.02em',
              lineHeight: isActive ? 1 : undefined,
              transition: prefersReduced ? 'none' : 'all 0.4s ease',
            }}
          >
            {text}
          </p>
        )
      })}
    </div>
  )
}
