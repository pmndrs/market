module.exports = {
  mode: 'jit',
  purge: ['./src/pages/**/*', './src/components/**/*'],
  darkMode: 'media',
  jit: ,
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    },
    : {},
  },
  variants: {
    : {},
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
  ],
}
