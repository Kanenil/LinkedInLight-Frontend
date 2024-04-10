/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        animationOpacity: {
          from: {opacity: 0.2}, to: {opacity: 1}
        },
        scaleIn: {
          '0%': {
            opacity: 0,
            transform: 'scale(0.9)'
          },
          '50%': {
            opacity: 0.3
          },
          '100%': {
            opacity: 1,
            transform: 'scale(1)'
          }
        },
        fadeInUp: {
          '0%': {
            opacity: 0,
            transform: 'translate3d(0,20px,0)'
          },
          '100%': {
            opacity: 1,
            transform: 'translate3d(0,0,0)'
          },
        },
        customPulse: {
          '0%, 100%': {
            backgroundColor: 'var(--tw-gradient-from)'
          },
          '50%': {
            backgroundColor: 'var(--tw-gradient-to)'
          }
        }
      },
      animation: {
        opacity: 'animationOpacity .5s ease-in-out',
        scaleIn: 'scaleIn .35s ease-in-out',
        fadeInUp: 'fadeInUp .65s ease-in-out',
        customPulse: 'customPulse 2s cubic-bezier(0.4, 0, 0.6, 1) 2 forwards'
      }
    },
  },
  plugins: [require('@tailwindcss/forms'),],
}

