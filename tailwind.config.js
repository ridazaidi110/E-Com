/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#f8b4d9',
        'primary-dark': '#f5a3cc',
        'primary-light': '#fbcfe8',
        'secondary': '#a5d8ff',
        'secondary-dark': '#7cc4ff',
        'accent': '#ffd6e8',
        'pastel-pink': '#ffd6e8',
        'pastel-blue': '#c7e9ff',
        'pastel-purple': '#e6d9f5',
        'pastel-yellow': '#fff4d6',
      },
    },
  },
  plugins: [],
}

