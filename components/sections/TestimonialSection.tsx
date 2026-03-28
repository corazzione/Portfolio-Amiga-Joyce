'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { testimonials } from '@/lib/data'

export function TestimonialSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const prefersReduced = useReducedMotion()
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const touchStartX = useRef<number>(0)

  const startInterval = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
  }, [])

  useEffect(() => {
    startInterval()
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [startInterval])

  function handleDotClick(index: number) {
    setCurrentIndex(index)
    startInterval()
  }

  const t = testimonials[currentIndex]

  return (
    <section id="testimonials" className="relative bg-dark min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video background — no src attribute to avoid blank frame flash */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-70"
      />
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-dark/30" />

      {/* Content container */}
      <div
        className="relative z-10 flex flex-col items-center gap-8 px-6"
        onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX }}
        onTouchEnd={(e) => {
          const delta = e.changedTouches[0].clientX - touchStartX.current
          if (delta < -50) handleDotClick((currentIndex + 1) % testimonials.length)
          if (delta > 50) handleDotClick((currentIndex - 1 + testimonials.length) % testimonials.length)
        }}
      >
        {/* Floating white card with AnimatePresence */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={prefersReduced ? { duration: 0 } : {
              duration: 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="bg-white rounded-2xl p-8 shadow-2xl w-full max-w-[340px]"
          >
            {/* Rating stars + counter row */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-dark/10">
              <div className="flex gap-1">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <span key={i} className="text-gold text-sm">★</span>
                ))}
              </div>
              <span className="text-xs text-dark/40 font-sans font-semibold">
                {String(currentIndex + 1).padStart(2, '0')}/{String(testimonials.length).padStart(2, '0')}
              </span>
            </div>

            {/* Avatar + name + role */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-dark/10 flex-shrink-0" />
              <div>
                <p className="font-switzer font-bold text-sm text-dark">{t.name}</p>
                <p className="font-sans text-xs text-dark/50">{t.role}</p>
              </div>
            </div>

            {/* Quote */}
            <blockquote className="font-switzer font-bold text-xl text-dark leading-snug">
              {t.quote}
            </blockquote>
          </motion.div>
        </AnimatePresence>

        {/* Dot navigation */}
        <div className="flex gap-3">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => handleDotClick(i)}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === currentIndex ? 'bg-gold' : 'bg-white/40'
              }`}
              aria-label={`Ir para depoimento ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
