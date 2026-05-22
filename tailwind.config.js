/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red:    '#E8312A',
          yellow: '#F5C400',
          green:  '#4CAF50',
          blue:   '#2196F3',
          orange: '#FF6B2B',
          purple: '#9B59B6',
          teal:   '#00B4B4',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
