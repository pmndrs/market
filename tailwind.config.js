module.exports = {
  // mode: 'jit',
  purge: ['./src/pages/**/*.js', './src/components/**/*.js'], // remove unused styles in production

  darkMode: 'media', // or 'media' or 'class'
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
  plugins: [require('@tailwindcss/aspect-ratio')],
}
