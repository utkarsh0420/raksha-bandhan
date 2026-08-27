/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xxs': '360px',
        'xs': '420px',
      },
      colors: {
        festive: {
          crimson: '#9E1B32',
          ruby: '#E63946',
          gold: '#D4AF37',
          amber: '#F59E0B',
          saffron: '#FF7722',
          marigold: '#FFAA00',
          blush: '#FFF1F2',
          cream: '#FFFDF9',
          royal: '#1E1435',
          card: 'rgba(255, 255, 255, 0.85)',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        cursive: ['"Great Vibes"', 'cursive'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 18s linear infinite',
        'bounce-slow': 'bounce 3s infinite',
        'pulse-glow': 'pulseGlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 4s ease-in-out infinite',
        'sway': 'sway 3s ease-in-out infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '1', filter: 'drop-shadow(0 0 15px rgba(212, 175, 55, 0.8))' },
          '50%': { opacity: '.8', filter: 'drop-shadow(0 0 5px rgba(212, 175, 55, 0.4))' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        sway: {
          '0%, 100%': { transform: 'rotate(-4deg)' },
          '50%': { transform: 'rotate(4deg)' },
        },
      },
    },
  },
  plugins: [],
}
