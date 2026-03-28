'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { useReducedMotion } from 'motion/react'
import { HeroTextSelector } from '@/components/hero/HeroTextSelector'

const TEXTS_COUNT = 3

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeIndex, setActiveIndex] = useState(1)
  const prefersReduced = useReducedMotion()

  const handleScroll = useCallback(() => {
    const hero = sectionRef.current
    if (!hero) return
    const heroBottom = hero.offsetTop + hero.offsetHeight
    if (window.scrollY < heroBottom) {
      const progress = window.scrollY / (hero.offsetHeight * 0.5)
      const idx = Math.min(TEXTS_COUNT - 1, Math.floor(progress * TEXTS_COUNT))
      setActiveIndex(idx)
    }
  }, [])

  useEffect(() => {
    if (prefersReduced) return
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll, prefersReduced])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ padding: '80px 24px 100px' }}
    >
      {/* Background: photo/image goes here */}
      <div className="absolute inset-0 bg-dark">
        {/* Image: self-host and set NEXT_PUBLIC_HERO_IMAGE_URL env var */}
        {/* <img src={process.env.NEXT_PUBLIC_HERO_IMAGE_URL} alt="" className="absolute inset-0 w-full h-full object-cover" /> */}
      </div>

      {/* Overlay for text contrast */}
      <div className="absolute inset-0 bg-dark/40" />

      <div className="relative z-10">
        <HeroTextSelector activeIndex={activeIndex} onSelect={setActiveIndex} />
      </div>
    </section>
  )
}
