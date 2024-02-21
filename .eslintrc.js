// @js-ignore
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'react-app',
    'plugin:tailwind/recommended',
    'plugin:react-hooks/recommended',
  ],
  rules: {
    'react/prop-types': 'off',
    'react/display-name': 'off',
    'react/jsx-indent-props': [2, 'first'],
    'import/prefer-default-export': 'off',
    'import/no-cycle': 'off',
    'no-multi-assign': 'off',
    'react/react-in-jsx-scope': 'off',
    // nextjs issue; need to update next
    'jsx-a11y/anchor-is-valid': 'off',
    "react/no-unknown-property": 0
  },
  settings: {},
  plugins: ['import'],
}
