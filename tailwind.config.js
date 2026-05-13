/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          900: '#121212', // Background
          800: '#1e1e1e', // Cards/Tabs
          700: '#2d2d2d', // Hover states
          600: '#3d3d3d', // Borders
        },
        primary: {
          500: '#3b82f6', // Accent blue
          600: '#2563eb', // Accent blue hover
        }
      }
    },
  },
  plugins: [],
}
