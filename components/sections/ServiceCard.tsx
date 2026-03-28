'use client'

import { motion } from 'motion/react'
import type { Service } from '@/lib/data'

export function ServiceCard({ service }: { service: Service }) {
  return (
    <motion.div
      className="bg-white rounded-2xl p-6 shadow-sm cursor-default"
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="text-2xl">{service.icon}</span>
      <h3 className="font-switzer text-lg font-bold mt-4 mb-2">{service.title}</h3>
      <p className="text-dark/70 text-sm leading-relaxed">{service.description}</p>
    </motion.div>
  )
}
