import type { Metadata } from 'next'
import { switzer, publicSans } from './fonts'
import './globals.css'
import { TopNav } from '@/components/layout/TopNav'
import { BottomBar } from '@/components/layout/BottomBar'

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
    <html lang="pt-BR" className={`${switzer.variable} ${publicSans.variable} overflow-x-hidden`}>
      <body>
        <TopNav />
        {children}
        <BottomBar />
      </body>
    </html>
  )
}
