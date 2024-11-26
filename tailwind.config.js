/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  variants: {
    extend: {
      display: ['group-hover'],
      // textColor: ['selection'],
      // backgroundColor: ['selection'],
    },
  },
  theme: {
    extend: {
      dropShadow: {
        glow: [
          "0 0px 20px rgba(255,255, 255, 0.35)",
          "0 0px 65px rgba(255, 255,255, 0.2)"
        ]
      },
      opacity: {
        '85': '.87',
      },
      fontFamily: {
        khorla: ['Khorla', 'sans-serif'],
        forrest: ['Forrest', 'sans-serif'],
      },
      colors: {
        black: '#000000',
        white: '#F2F2F2',
        orange: {
          500: '#924821'
        },
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
  plugins: [
    require('@tailwindcss/typography'),
    // require('tailwindcss-selection-variant'),
  ],
}
