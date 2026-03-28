import localFont from 'next/font/local'
import { Public_Sans } from 'next/font/google'

export const switzer = localFont({
  src: './fonts/Switzer-Variable.woff2',
  variable: '--font-switzer',
  display: 'swap',
  weight: '100 900',
})

export const publicSans = Public_Sans({
  subsets: ['latin'],
  variable: '--font-public-sans',
  display: 'swap',
})
