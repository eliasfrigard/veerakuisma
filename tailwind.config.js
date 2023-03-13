/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        khorla: ['Khorla', 'sans-serif'],
        forrest: ['Forrest', 'sans-serif'],
      },
      colors: {
        primary: '#F2F2F2',
        black: '#000000',
        secondary: {
          500: '#d9d1c8',
        },
        matcha: {
          800: '#3c4c3f',
          500: '#667c6e',
          400: '#8eb59c',
          300: '#b3d3af',
          200: '#d9ead3',
        },
      },
    },
    container: {
      center: true,
    },
  },
  plugins: [],
}
