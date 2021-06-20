const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  purge: ['./src/pages/**/*', './src/components/**/*'],
  darkMode: 'class',
  jit: true,
  theme: {
    colors: colors,
    nightwind: {
      colors: {
        white: colors.gray[900],
        black: colors.gray[50],
      },
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    },
    extend: {
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
