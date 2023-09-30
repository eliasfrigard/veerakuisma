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
        black: '#000000',
        white: '#F2F2F2',
        primary: {
          500: '#F2F2F2',
        },
        secondary: {
          500: '#d9d1c8',
        },
        accent: {
          500: '#D9B29C',
        },
      },
    },
    container: {
      center: true,
    },
  },
  plugins: [],
}
