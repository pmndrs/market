module.exports = {
  mode: 'jit',
  purge: ['./src/pages/**/*', './src/components/**/*'],
  darkMode: 'class',
  jit: true,
  theme: {
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
