import type { Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['Inter', ...fontFamily.sans],
    },
    extend: {
      colors: {
        'nexus-primary': {
          DEFAULT: '#111827', // A dark gray, good for backgrounds
          '800': '#1F2937',
          '900': '#111827',
        },
        'nexus-surface': {
          '700': '#374151',
          '800': '#1F2937',
        },
        'nexus-text': {
          primary: '#F9FAFB',
          secondary: '#D1D5DB',
          muted: '#6B7280',
        },
        'nexus-border': {
          subtle: '#374151',
          medium: '#4B5563',
        },
        'nexus-accent-gold': {
          DEFAULT: '#F59E0B', // Amber 500
          dark: '#D97706',   // Amber 600
        },
        'nexus-accent-cyan': {
          DEFAULT: '#06B6D4', // Cyan 500
          dark: '#0891B2',   // Cyan 600
        },
      },
    },
  },
  plugins: [],
} satisfies Config