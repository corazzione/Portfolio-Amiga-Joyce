'use client'

import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { fadeUp } from '@/lib/animation-variants'

interface RevealWrapperProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

export function RevealWrapper({ children, delay = 0, className }: RevealWrapperProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -40px 0px' })

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
