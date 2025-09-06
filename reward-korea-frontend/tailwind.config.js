/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#FFFFFF',
          dark: '#0B1215'
        },
        secondary: {
          light: '#F7FAFC',
          dark: '#1A202C'
        },
        accent: '#00A8FF',
        text: {
          light: '#1A202C',
          dark: '#F7FAFC'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
