module.exports = {
  mode: 'jit',
  purge: ['./src/pages/**/*', './src/components/**/*'],
  darkMode: 'media',
  jit: true,
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
  ],
}
