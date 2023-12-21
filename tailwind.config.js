module.exports = {
  content: ['./src/pages/**/*', './src/components/**/*'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      screens: {
        laptop: '1200px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('nightwind'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
  ],
}
