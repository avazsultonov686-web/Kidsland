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
        pastel: {
          rose:    '#FCE8EF',
          peach:   '#FFECD8',
          mint:    '#E4F7EF',
          sky:     '#E4F2FF',
          lilac:   '#EEE9FB',
          sand:    '#F7F5F3',
          cream:   '#FAFAFB',
          stroke:  '#E8E8ED',
          ink:     '#1C1C1E',
          inkmuted:'#6B6B70',
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
