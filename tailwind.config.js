/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        agro: {
          50: '#f2fbf4',
          100: '#e1f7e6',
          200: '#c5eed0',
          300: '#98dfab',
          400: '#63c77e',
          500: '#3ba95a',
          600: '#2c8945',
          700: '#256d39',
          800: '#215630',
          900: '#1d472a',
          950: '#0b2614',
        },
        lime: {
          400: '#a3e635',
          500: '#84cc16',
          600: '#65a30d',
        },
        earth: {
          500: '#d97706',
          600: '#b45309',
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        display: ['var(--font-outfit)', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
};
