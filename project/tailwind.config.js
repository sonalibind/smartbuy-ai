/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f0f3f8',
          100: '#dce3ee',
          200: '#b8c6dc',
          300: '#8fa1c4',
          400: '#6b7fab',
          500: '#4d62a0',
          600: '#3b4d82',
          700: '#2e3d68',
          800: '#1e2a4a',
          900: '#131d33',
        },
        accent: {
          50: '#f2efff',
          100: '#e8e2ff',
          200: '#d4c9ff',
          300: '#b8a4ff',
          400: '#9b7cff',
          500: '#7c4dff',
          600: '#6b34f0',
          700: '#5a26d4',
          800: '#4a20ad',
          900: '#3d1c8a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
