'use client'

import { motion } from 'motion/react'

interface PortfolioCardProps {
  caption: string
}

export function PortfolioCard({ caption }: PortfolioCardProps) {
  return (
    <motion.div
      className="cursor-default"
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="bg-dark/10 aspect-[3/4] rounded-xl" />
      <p className="mt-3 font-switzer text-sm font-medium text-dark/70">{caption}</p>
    </motion.div>
  )
}
