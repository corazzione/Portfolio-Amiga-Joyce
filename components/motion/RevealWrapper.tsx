'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import { fadeUp, scaleIn } from '@/lib/animation-variants'

interface RevealWrapperProps {
  children: React.ReactNode
  delay?: number
  className?: string
  variant?: 'fadeUp' | 'scaleIn'
}

const variantMap = { fadeUp, scaleIn }

export function RevealWrapper({ children, delay = 0, className, variant = 'fadeUp' }: RevealWrapperProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -40px 0px' })
  const prefersReduced = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      variants={variantMap[variant]}
      initial={prefersReduced ? 'visible' : 'hidden'}
      animate={prefersReduced ? 'visible' : (inView ? 'visible' : 'hidden')}
      transition={prefersReduced ? { duration: 0 } : { delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
