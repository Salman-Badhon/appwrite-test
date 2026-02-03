import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';

const config = {
  darkMode: ['class'],
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './buildable-sections/**/**/*.{js,ts,jsx,tsx,mdx}',
    './examples/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  prefix: '',
  theme: {
    fontFamily: {
      primary: ['var(--font-primary)', ...fontFamily.sans],
    },
    extend: {
      container: {
        center: true,
        padding: '1rem',
      },
      fontSize: {
        xs: [
          '0.75rem', // 12px
          {
            lineHeight: '1.5',
          },
        ],
        sm: [
          '0.875rem', // 14px
          {
            lineHeight: '1.42',
          },
        ],
        base: [
          '1rem', // 16px
          {
            lineHeight: '1.5',
          },
        ],
        md: [
          '1.125rem', // 18px
          {
            lineHeight: '1.33',
          },
        ],
        lg: [
          '1.25rem', // 20px
          {
            lineHeight: '1.4',
          },
        ],
        xl: [
          '1.375rem', // 22px
          {
            lineHeight: '1.45',
          },
        ],
        '2xl': [
          '1.5rem', // 24px
          {
            lineHeight: '1.41',
          },
        ],
        '3xl': [
          '1.75rem', // 28px
          {
            lineHeight: '1.35',
          },
        ],
        '4xl': [
          '2rem', // 32px
          {
            lineHeight: '1.31',
          },
        ],
        '5xl': [
          '2.25rem', // 36px
          {
            lineHeight: '1.27',
          },
        ],
        '6xl': [
          '2.375rem', // 38px
          {
            lineHeight: '1.26',
          },
        ],
        '7xl': [
          '3rem', // 48px
          {
            lineHeight: '1.20',
          },
        ],
        '8xl': [
          '3.75rem', // 60px
          {
            lineHeight: '1.16',
          },
        ],
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        primary: {
          light: '#568cdc',
          DEFAULT: '#0d6efd',
          dark: '#0067ff',
        },
        gray: {
          light: '#dee2e6',
          DEFAULT: '#adb5bd',
          dark: '#6c757d',
        },
        black: '#000000',
        white: '#ffffff',
        info: '#0dcaf0',
        success: '#198754',
        warning: '#ffc107',
        danger: '#dc3545',
      },
      // Here we need to add this accordion animation config
      // for play the accordion animation correctly
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'scale-x-in': {
          from: { transform: 'scaleX(0)' },
          to: { transform: 'scaleX(1)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'scale-x-in': 'scale-x-in var(--duration, 0.2s)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;
