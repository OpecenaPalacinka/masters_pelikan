import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif']
      },
      keyframes: {
        slideDown: {
          from: { height: '0px' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        slideUp: {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0px' }
        }
      },
      animation: {
        slideDown: 'slideDown .3s cubic-bezier(0.87, 0, 0.13, 1)',
        slideUp: 'slideUp .3s cubic-bezier(0.87, 0, 0.13, 1)'
      }
    }
  },
  plugins: [require('tailwindcss-react-aria-components')({ prefix: 'rac' })]
} satisfies Config
