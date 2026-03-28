'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'

const texts = ['A Criação', 'Videografia', 'Fotografia'] as const

export function HeroTextSelector() {
  const [index, setIndex] = useState(0)
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative h-[1.2em] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.span
          key={texts[index]}
          initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: -12 }}
          transition={prefersReduced ? { duration: 0 } : {
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute inset-0 text-gold font-switzer text-2xl md:text-4xl font-bold tracking-wide"
        >
          {texts[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}
