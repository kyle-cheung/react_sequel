/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'ssp': "'Source Sans Pro', sans-serif",
        'manrope': "'Manrope', sans-serif"
      }
    },
  },
  plugins: [],
}

