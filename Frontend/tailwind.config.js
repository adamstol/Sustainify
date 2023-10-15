/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'house-green': '#1e3932',
        'primary-green': '#006241',
        'mountain-meadow': '#23c686',
        'deco': "#c5d893",
        'japanese-laurel': "#099d02",
      }
    },
  },
  plugins: [],
}