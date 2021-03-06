/* eslint-disable */
module.exports = {
  root: true,
  env: {
    browser: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
  },
  plugins: ['prettier'],
  extends: [
    'airbnb-base',
    'plugin:vue/recommended',
    'prettier/vue',
    'prettier',
    'plugin:prettier/recommended',
  ],
  rules: {
    'comma-dangle': 'off',
    'class-methods-use-this': 'off',
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'implicit-arrow-linebreak': 'off',
    'import/prefer-default-export': 'off',
    'vue/component-name-in-template-casing': [
      'error',
      'kebab-case',
      {
        ignores: [],
      },
    ],
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        endOfLine: 'auto',
      },
    ],
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: ['state'],
      },
    ],
    'no-param-reassign': [1, { props: false }],
    'no-use-before-define': ['error', { functions: false, classes: true }],
    'object-shorthand': 0,
    'prefer-destructuring': ['error', { object: true, array: false }],
  },
};
