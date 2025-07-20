/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './App.{js,jsx,ts,tsx}'], // Include App.js in root
  presets: [require('nativewind/preset')],
  theme: {
    extend: {},
  },
  plugins: [],
}
