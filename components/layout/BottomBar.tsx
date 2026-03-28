'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useRouter } from 'next/navigation'

const NAV_LINKS = [
  { label: 'Inicio', href: '/' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Contato', href: '/contato' },
] as const

const overlayLinkVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
}

const overlayNavVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.15,
    },
  },
}

export function BottomBar() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  function handleLinkClick(href: string) {
    setIsOpen(false)
    router.push(href)
  }

  return (
    <>
      {/* Fixed bottom bar */}
      <div
        className="fixed bottom-0 inset-x-0 z-[200] bg-dark flex items-center justify-center h-[60px]"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <button
          onClick={() => setIsOpen(true)}
          className="absolute left-0 top-0 h-full px-6 bg-gold text-dark font-switzer font-bold text-xs tracking-widest uppercase flex items-center gap-1 border-none cursor-pointer"
          aria-label="Abrir menu"
        >
          Menu<span className="text-base font-light">+</span>
        </button>

        <span className="font-switzer font-bold text-xs tracking-widest uppercase text-white">
          Corazón
        </span>
      </div>

      {/* Fullscreen menu overlay via AnimatePresence */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="menu-overlay"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[300] bg-dark flex flex-col items-center justify-center"
          >
            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-8 text-white text-3xl leading-none bg-transparent border-none cursor-pointer hover:text-white/70 transition-colors"
              aria-label="Fechar menu"
            >
              ✕
            </button>

            {/* MC. logo */}
            <span className="absolute top-6 left-8 font-switzer font-bold text-white text-sm tracking-widest uppercase">
              MC.
            </span>

            {/* Nav links with stagger */}
            <motion.nav
              className="flex flex-col items-center gap-10"
              variants={overlayNavVariants}
              initial="hidden"
              animate="visible"
            >
              {NAV_LINKS.map(({ label, href }) => (
                <motion.div key={href} variants={overlayLinkVariants}>
                  <button
                    onClick={() => handleLinkClick(href)}
                    className="font-switzer font-bold text-white hover:text-gold transition-colors bg-transparent border-none cursor-pointer"
                    style={{ fontSize: 'clamp(36px, 6vw, 72px)', letterSpacing: '-0.02em' }}
                  >
                    {label}
                  </button>
                </motion.div>
              ))}
            </motion.nav>

            {/* Social links */}
            <div className="absolute bottom-8 left-8 flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors text-sm font-switzer tracking-widest uppercase"
              >
                Instagram
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors text-sm font-switzer tracking-widest uppercase"
              >
                X
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
