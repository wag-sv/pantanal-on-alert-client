module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'airbnb-typescript',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.eslint.json',
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'better-styled-components',
  ],
  rules: {
    'import/prefer-default-export': 'off',
    'max-len': 'off',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'no-underscore-dangle': 'off',
    'no-plusplus': 'off',
    'better-styled-components/sort-declarations-alphabetically': 2,
    'react/require-default-props': 'off',
  },
};
