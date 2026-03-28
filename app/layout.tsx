import type { Metadata } from 'next'
import { switzer, publicSans } from './fonts'
import './globals.css'

export const metadata: Metadata = {
  title: 'Corazon - Fotografia & Videografia',
  description: 'Uma contadora de historias visual. Fotografia e videografia premium.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={`${switzer.variable} ${publicSans.variable}`}>
      <body>{children}</body>
    </html>
  )
}
