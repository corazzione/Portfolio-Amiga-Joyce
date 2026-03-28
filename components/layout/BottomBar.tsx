'use client'

import { useState } from 'react'
import Link from 'next/link'

const NAV_LINKS = [
  { label: 'Sobre', href: '/about' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Contato', href: '/contato' },
] as const

const BAR_BG = '#261f12'
const LINK_BG = 'rgba(209, 159, 65, 0.07)'
const GOLD = '#d19f41'
const WHITE = '#ffffff'
const DARK_TEXT = '#0a0805'
const ROOT_WIDTH = '290px'
const PANEL_PADDING = '8px'
const LINK_WIDTH = '254px'
const LINK_HEIGHT = '36px'
const BASE_HEIGHT = '44px'
const BASE_PADDING = '0 16px 0 8px'
const TOGGLE_WIDTH = '60px'
const TOGGLE_HEIGHT = '28px'

export function BottomBar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '22px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 200,
        width: ROOT_WIDTH,
        height: isOpen ? '184px' : BASE_HEIGHT,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: '4px',
        boxShadow: 'none',
        overflow: 'clip',
      }}
    >
      <div
        style={{
          backgroundColor: BAR_BG,
          width: '100%',
          height: 'min-content',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '10px',
          overflow: 'clip',
          position: 'relative',
          transition: 'opacity 180ms ease, transform 180ms ease',
          opacity: isOpen ? 1 : 0,
          transform: isOpen ? 'translateY(0)' : 'translateY(8px)',
          pointerEvents: isOpen ? 'auto' : 'none',
        }}
      >
        <div
          style={{
            width: '100%',
            height: 'min-content',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            justifyContent: 'center',
            alignItems: 'center',
            padding: PANEL_PADDING,
            position: 'relative',
            overflow: 'clip',
          }}
        >
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setIsOpen(false)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                width: LINK_WIDTH,
                height: LINK_HEIGHT,
                padding: '0 8px',
                textDecoration: 'none',
                backgroundColor: LINK_BG,
                overflow: 'clip',
                position: 'relative',
                cursor: 'pointer',
              }}
            >
              <span
                style={{
                  display: 'block',
                  color: WHITE,
                  fontFamily: 'Switzer, sans-serif',
                  fontSize: '16px',
                  fontWeight: 600,
                  letterSpacing: '-0.02em',
                  lineHeight: '1.3em',
                  whiteSpace: 'pre-wrap',
                }}
              >
                {label}
              </span>
            </Link>
          ))}
        </div>
      </div>

      <div
        style={{
          width: '100%',
          height: BASE_HEIGHT,
          backgroundColor: BAR_BG,
          padding: BASE_PADDING,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '10px',
          zIndex: 5,
          flex: 'none',
          position: 'relative',
          overflow: 'clip',
          boxShadow: 'none',
        }}
      >
        <div
          style={{
            height: 'min-content',
            flex: '1 0 0',
            width: '1px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 0,
            position: 'relative',
            overflow: 'clip',
          }}
        >
          <button
            onClick={() => setIsOpen((v) => !v)}
            aria-expanded={isOpen}
            aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
            style={{
              width: TOGGLE_WIDTH,
              height: TOGGLE_HEIGHT,
              backgroundColor: GOLD,
              color: DARK_TEXT,
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'Switzer, sans-serif',
              fontSize: '14px',
              fontWeight: 600,
              letterSpacing: '-0.02em',
              flexShrink: 0,
              lineHeight: '1.3em',
              padding: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'clip',
              position: 'relative',
            }}
          >
            {isOpen ? 'Fechar' : 'Menu+'}
          </button>

          <Link
            href="/"
            style={{
              color: WHITE,
              textDecoration: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              width: 'min-content',
              height: 'min-content',
              padding: 0,
              position: 'relative',
              overflow: 'visible',
            }}
          >
            <span
              style={{
                display: 'block',
                color: WHITE,
                fontFamily: 'Switzer, sans-serif',
                fontSize: '14px',
                fontWeight: 600,
                letterSpacing: '-0.02em',
                lineHeight: '1.3em',
                whiteSpace: 'pre',
              }}
            >
              VERA STUDIO
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
}
