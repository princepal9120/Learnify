/** @type {import('tailwindcss').Config} */
import tailwindcssAnimate from 'tailwindcss-animate';

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      // Brutal spacing scale (8px base)
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
        '2xl': '32px',
        '3xl': '48px',
        '4xl': '64px',
      },
      // Brutalist typography
      fontSize: {
        'xs': ['12px', '16px'],
        'sm': ['14px', '20px'],
        'base': ['16px', '24px'],
        'lg': ['18px', '28px'],
        'xl': ['20px', '28px'],
        '2xl': ['24px', '32px'],
        '3xl': ['32px', '40px'],
        '4xl': ['48px', '56px'],
        '5xl': ['64px', '72px'],
      },
      fontWeight: {
        'thin': '100',
        'extralight': '200',
        'light': '300',
        'normal': '400',
        'medium': '500',
        'semibold': '600',
        'bold': '700',
        'extrabold': '800',
        'black': '900',
      },
      borderRadius: {
        'none': '0',
        'sm': '2px',
        'md': '4px',
        'lg': '8px',
        'xl': '12px',
        'full': '9999px',
      },
      borderWidth: {
        '1': '1px',
        '2': '2px',
        '3': '3px',
        '4': '4px',
      },
      boxShadow: {
        'none': 'none',
        'brutal': '2px 2px 0 rgba(0, 0, 0, 0.1)',
        'brutal-md': '4px 4px 0 rgba(0, 0, 0, 0.15)',
        'brutal-lg': '6px 6px 0 rgba(0, 0, 0, 0.2)',
      },
      // Brutalist color palette
      colors: {
        // Neutral base
        white: '#FFFFFF',
        black: '#000000',
        gray: {
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#EEEEEE',
          300: '#E0E0E0',
          400: '#BDBDBD',
          500: '#9E9E9E',
          600: '#757575',
          700: '#616161',
          800: '#424242',
          900: '#212121',
        },
        // Primary (Black)
        primary: {
          DEFAULT: '#000000',
          foreground: '#FFFFFF',
        },
        // Secondary (Trust Blue)
        secondary: {
          DEFAULT: '#1A73E8',
          foreground: '#FFFFFF',
        },
        // Accent (Gamification Yellow)
        accent: {
          DEFAULT: '#F7D900',
          foreground: '#000000',
        },
        // Semantic colors
        success: {
          DEFAULT: '#34A853',
          foreground: '#FFFFFF',
        },
        warning: {
          DEFAULT: '#FBBC04',
          foreground: '#000000',
        },
        error: {
          DEFAULT: '#EA4335',
          foreground: '#FFFFFF',
        },
        info: {
          DEFAULT: '#1A73E8',
          foreground: '#FFFFFF',
        },
        // Surface colors
        background: '#FFFFFF',
        foreground: '#000000',
        card: {
          DEFAULT: '#FAFAFA',
          foreground: '#000000'
        },
        muted: {
          DEFAULT: '#F5F5F5',
          foreground: '#757575'
        },
        border: '#E0E0E0',
        input: '#FFFFFF',
        ring: '#1A73E8',
      }
    }
  },
  plugins: [tailwindcssAnimate],
};
