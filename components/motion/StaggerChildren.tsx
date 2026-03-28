'use client'

import { motion, useInView, useReducedMotion } from 'motion/react'
import { useRef } from 'react'
import { stagger, fadeUp } from '@/lib/animation-variants'

interface StaggerChildrenProps {
  children: React.ReactNode
  className?: string
}

export function StaggerChildren({ children, className }: StaggerChildrenProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -40px 0px' })
  const prefersReduced = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      variants={stagger}
      initial={prefersReduced ? 'visible' : 'hidden'}
      animate={prefersReduced ? 'visible' : (inView ? 'visible' : 'hidden')}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <motion.div variants={fadeUp} className={className}>
      {children}
    </motion.div>
  )
}
