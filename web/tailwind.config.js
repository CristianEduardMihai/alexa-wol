/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        'background': '#020B12',
        'gray-900': '#131C23',
        'gray-500': '#282D33',
        'gray-200': '#444D54',
        'primary': '#069ED0'
      }
    },
  },
  plugins: [],
}

