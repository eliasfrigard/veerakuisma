const withMT = require("@material-tailwind/react/utils/withMT");

/** @type {import('tailwindcss').Config} */
module.exports = withMT({
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  variants: {
    extend: {
      display: ['group-hover'],
    },
  },
  theme: {
    extend: {
      fontFamily: {
        khorla: ['Khorla', 'sans-serif'],
        forrest: ['Forrest', 'sans-serif'],
      },
      colors: {
        black: '#000000',
        white: '#F2F2F2',
        primary: {
          50: '#f5f8fa',
          100: '#eaeff4',
          200: '#cfdde8',
          300: '#a5c0d4',
          400: '#759ebb',
          500: '#5483a3',
          600: '#416988',
          700: '#35546f',
          800: '#2f485d',
          900: '#2b3e4f',
          950: '#11181f',
        },
        secondary: {
          500: '#0D0907',
        },
        accent: {
          DEFAULT: '#E1215D',
          50: '#F7C3D3',
          100: '#F4B1C6',
          200: '#F08DAC',
          300: '#EB6991',
          400: '#E64577',
          500: '#E1215D',
          600: '#B21848',
          700: '#801134',
          800: '#4F0B20',
          900: '#1E040C',
          950: '#050102',
        },
      },
    },
    container: {
      center: true,
    },
  },
  plugins: [require('@tailwindcss/typography')],
})
