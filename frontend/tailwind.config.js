/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        burgundy: {
          midnight: '#351018',
          royal: '#641B2B',
          deep: '#1F070E',
          soft: '#4a1518ff',
        },
        gold: {
          champagne: '#D8B779',
          light: '#F3E5C8',
          shimmer: '#FBE9B9',
          deep: '#9B7436',
          bronze: '#7A5420',
        },
        rose: {
          blush: '#EBC3C5',
          antique: '#B66B78',
          petal: '#F4D8DA',
          dusty: '#8E4B56',
        },
        ivory: {
          warm: '#FFF8EF',
          cream: '#FAF3E7',
          soft: '#F4EADA',
        },
        cocoa: {
          deep: '#2C1B1B',
          rich: '#1E1212',
          muted: '#453232',
        },
      },
      fontFamily: {
        cormorant: ['"Cormorant Garamond"', 'serif'],
        playfair: ['"Playfair Display"', 'serif'],
        script: ['"Great Vibes"', 'cursive'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'gold-glow': '0 0 25px rgba(216, 183, 121, 0.45)',
        'gold-glow-lg': '0 0 50px rgba(216, 183, 121, 0.65)',
        'burgundy-deep': '0 20px 40px -15px rgba(31, 7, 14, 0.85)',
        'rose-soft': '0 10px 30px -10px rgba(182, 107, 120, 0.3)',
      },
      animation: {
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 4s ease-in-out infinite',
        'spin-slow': 'spin 24s linear infinite',
      },
      keyframes: {
        shimmer: {
          '0%, 100%': { opacity: '0.85', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.02)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(2deg)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
      },
    },
  },
  plugins: [],
}
