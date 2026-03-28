'use client'

import { motion, useReducedMotion } from 'motion/react'
import { HeroTextSelector } from '@/components/hero/HeroTextSelector'

export function HeroSection() {
  const prefersReduced = useReducedMotion()

  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background: dark gradient + video element */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark/90 to-dark">
        {/* Video: self-host on Vercel Blob or Cloudinary, set NEXT_PUBLIC_VIDEO_URL env var */}
        {/* Example: <video src={process.env.NEXT_PUBLIC_VIDEO_URL} autoPlay muted loop playsInline /> */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Dark overlay for text contrast */}
      <div className="absolute inset-0 bg-dark/40" />

      {/* Content overlay */}
      <div className="relative z-10 flex flex-col items-center text-center gap-6 px-6">

        {/* Logo/tagline — delay 0.2s */}
        <motion.p
          initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={prefersReduced ? { duration: 0 } : {
            duration: 0.8,
            delay: 0.2,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="font-switzer text-sm md:text-base uppercase tracking-widest text-white"
        >
          MC. {'//'}  UMA CONTADORA DE HISTORIAS VISUAL
        </motion.p>

        {/* Text selector — delay 0.5s */}
        <motion.div
          initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={prefersReduced ? { duration: 0 } : {
            duration: 0.8,
            delay: 0.5,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <HeroTextSelector />
        </motion.div>

        {/* CTA button — delay 0.8s */}
        <motion.a
          href="#portfolio"
          initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={prefersReduced ? { duration: 0 } : {
            duration: 0.8,
            delay: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          whileHover={prefersReduced ? {} : { scale: 1.05 }}
          whileTap={prefersReduced ? {} : { scale: 0.98 }}
          className="inline-block bg-gold text-dark font-switzer font-semibold px-8 py-3 rounded-sm text-sm uppercase tracking-wider"
        >
          Ver Portfolio
        </motion.a>
      </div>
    </section>
  )
}
