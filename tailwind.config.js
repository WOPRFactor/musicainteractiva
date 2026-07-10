/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // EMION — identidad tomada del rediseño (mockup)
        ink: {
          DEFAULT: '#F4F1EA', // texto principal (off-white cálido)
          2: '#B6B0C4',
          3: '#9A94AD',
          4: '#7C7690',
        },
        bg: {
          DEFAULT: '#0B0A14', // fondo base (índigo casi negro)
          2: '#100E1B',
        },
        panel: {
          DEFAULT: '#16131F',
          2: '#1B1620',
        },
        line: 'rgba(244,241,234,0.09)',
        lime: { DEFAULT: '#CFF54B', 2: '#E4FF8A' }, // acento firma
        pink: '#FF5470',
        cyan: '#56E1E9',
        orange: '#FF9F45',
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        pill: '999px',
      },
      maxWidth: {
        content: '1280px',
      },
      keyframes: {
        floatY: {
          '0%,100%': { transform: 'translateY(0) rotate(var(--r,0deg))' },
          '50%': { transform: 'translateY(-22px) rotate(var(--r,0deg))' },
        },
        marqL: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        eqBar: { '0%,100%': { transform: 'scaleY(0.25)' }, '50%': { transform: 'scaleY(1)' } },
        pulseDot: {
          '0%,100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.35', transform: 'scale(0.7)' },
        },
        revealBlur: {
          from: { opacity: '0', transform: 'translateY(30px)', filter: 'blur(8px)' },
          to: { opacity: '1', transform: 'translateY(0)', filter: 'blur(0)' },
        },
        gridDrift: { from: { backgroundPosition: '0 0' }, to: { backgroundPosition: '64px 64px' } },
        spinSlow: { from: { transform: 'rotate(0)' }, to: { transform: 'rotate(360deg)' } },
      },
      animation: {
        floatY: 'floatY 7s ease-in-out infinite',
        marqL: 'marqL 32s linear infinite',
        eqBar: 'eqBar 0.9s ease-in-out infinite',
        pulseDot: 'pulseDot 2s infinite',
        revealBlur: 'revealBlur 0.9s cubic-bezier(0.16,1,0.3,1) both',
        gridDrift: 'gridDrift 22s linear infinite',
        spinSlow: 'spinSlow 40s linear infinite',
      },
    },
  },
  plugins: [],
};
