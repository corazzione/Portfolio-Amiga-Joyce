'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { faqItems } from '@/lib/data'

export function FAQSection() {
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <section id="faq" className="py-24 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left: title */}
        <div>
          <h2 className="font-switzer text-3xl lg:text-5xl font-bold tracking-tight leading-none">
            Alguma<br />Duvida?
          </h2>
        </div>
        {/* Right: accordion */}
        <div className="flex flex-col">
          {faqItems.map((item) => {
            const isOpen = openId === item.id
            return (
              <div key={item.id} className="border-b border-dark/10">
                <button
                  className="flex items-center justify-between w-full py-5 text-left font-switzer text-base font-semibold text-dark"
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                >
                  <span>{item.question}</span>
                  <span
                    className="text-lg text-dark/40 transition-transform duration-300"
                    style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}
                  >
                    +
                  </span>
                </button>
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: isOpen ? 'auto' : 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="text-dark/60 text-sm leading-relaxed pb-5">
                    {item.answer}
                  </p>
                </motion.div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
