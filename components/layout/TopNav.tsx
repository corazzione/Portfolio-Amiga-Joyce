'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const SCROLL_THRESHOLD = 80

export function TopNav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    function handleScroll() {
      const isScrolled = window.scrollY > SCROLL_THRESHOLD
      setScrolled((prev) => (prev === isScrolled ? prev : isScrolled))
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <nav
      className={cn(
        'fixed top-0 inset-x-0 z-[200] flex items-center justify-between',
        'px-4 sm:px-5 md:px-8 py-3.5 sm:py-4 md:py-5',
        'pointer-events-none transition-all duration-300',
        scrolled ? 'bg-dark/95 backdrop-blur-sm' : 'bg-transparent'
      )}
    >
      <Link
        href="/"
        className={cn(
          'pointer-events-auto flex items-center gap-2.5 font-switzer font-bold text-[13px] tracking-wider uppercase no-underline',
          scrolled ? 'text-white' : 'text-dark'
        )}
      >
        <span>MC.</span>
        <span className={cn('font-normal mx-1', scrolled ? 'text-white/40' : 'text-dark/40')}>
          //
        </span>
        <span
          className={cn(
            'font-normal text-[12px] tracking-[0.1em] hidden md:inline',
            scrolled ? 'text-white/60' : 'text-dark/60'
          )}
        >
          UMA CONTADORA DE HISTÓRIAS VISUAL
        </span>
      </Link>

      <Link
        href="/contato"
        className="pointer-events-auto bg-gold text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-md font-switzer font-bold text-[10px] sm:text-[11px] tracking-widest uppercase hover:opacity-90 transition-opacity"
      >
        Contato
      </Link>
    </nav>
  )
}
