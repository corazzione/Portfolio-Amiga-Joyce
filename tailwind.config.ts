import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#EFE8DC',
        gold: '#C8973A',
        dark: '#1a1a1a',
      },
      fontFamily: {
        switzer: ['var(--font-switzer)', 'sans-serif'],
        sans: ['var(--font-public-sans)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
