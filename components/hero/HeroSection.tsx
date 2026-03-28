'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { HeroTextSelector } from '@/components/hero/HeroTextSelector'

const TEXTS_COUNT = 3
const HERO_IMAGES = [
  'https://framerusercontent.com/images/SHpm5JLT9X16LG28VxAgzi1jKvM.png?width=900&height=1200',
  'https://framerusercontent.com/images/opPcTuyGGMldvhH8CbZNJCv8r0M.png?width=900&height=1200',
  'https://framerusercontent.com/images/QJuz54nmjbsesqGJkdNUrJSuRgs.png?width=960&height=1200',
] as const

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
      <div className="absolute inset-0 bg-dark">
        {HERO_IMAGES.map((image, index) => {
          const isActive = index === activeIndex

          return (
            <motion.img
              key={image}
              src={image}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              initial={false}
              animate={{
                opacity: isActive ? 1 : 0,
                scale: isActive ? 1.04 : 1,
              }}
              transition={
                prefersReduced
                  ? { duration: 0 }
                  : { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
              }
            />
          )
        })}
      </div>

      {/* Overlay for text contrast */}
      <div className="absolute inset-0 bg-dark/40" />

      <div className="relative z-10">
        <HeroTextSelector activeIndex={activeIndex} onSelect={setActiveIndex} />
      </div>
    </section>
  )
}
