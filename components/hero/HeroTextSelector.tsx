'use client'

import { motion, useReducedMotion } from 'motion/react'

const texts = ['A Criação', 'Videografia', 'Fotografia'] as const

interface Props {
  activeIndex: number
  onSelect: (index: number) => void
}

function moduloIndex(index: number) {
  return (index + texts.length) % texts.length
}

function getSlot(index: number, activeIndex: number) {
  if (index === activeIndex) return 'center'
  if (index === moduloIndex(activeIndex - 1)) return 'top'
  return 'bottom'
}

const slotStyles = {
  top: {
    y: 0,
    opacity: 0.65,
    scale: 0.92,
    fontSize: 'clamp(14px, 3.5vw, 16px)',
    fontWeight: 500,
    zIndex: 1,
  },
  center: {
    y: 28,
    opacity: 1,
    scale: 1,
    fontSize: 'clamp(18px, 4.6vw, 22px)',
    fontWeight: 600,
    zIndex: 2,
  },
  bottom: {
    y: 56,
    opacity: 0.65,
    scale: 0.92,
    fontSize: 'clamp(14px, 3.5vw, 16px)',
    fontWeight: 500,
    zIndex: 1,
  },
} as const

export function HeroTextSelector({ activeIndex, onSelect }: Props) {
  const prefersReduced = useReducedMotion()

  return (
    <div
      className="relative select-none overflow-hidden"
      style={{
        height: '92px',
        width: 'clamp(160px, 46vw, 220px)',
      }}
    >
      {texts.map((label, index) => {
        const slot = getSlot(index, activeIndex)
        const slotStyle = slotStyles[slot]

        return (
          <motion.button
            key={label}
            type="button"
            data-highlight="true"
            onClick={() => onSelect(index)}
            className="absolute inset-x-0 top-0 flex justify-center font-switzer cursor-pointer border-none bg-transparent p-0 text-center"
            initial={false}
            animate={{
              y: slotStyle.y,
              opacity: slotStyle.opacity,
              scale: slotStyle.scale,
            }}
            transition={
              prefersReduced
                ? { duration: 0 }
                : { duration: 0.32, ease: [0.22, 1, 0.36, 1] }
            }
            style={{
              fontSize: slotStyle.fontSize,
              color: 'rgb(255,255,255)',
              fontWeight: slotStyle.fontWeight,
              letterSpacing: '-0.02em',
              lineHeight: 1.3,
              zIndex: slotStyle.zIndex,
              width: '100%',
              whiteSpace: 'nowrap',
            }}
          >
            {label}
          </motion.button>
        )
      })}
    </div>
  )
}
