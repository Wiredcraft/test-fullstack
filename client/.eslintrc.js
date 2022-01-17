module.exports = {
  root: true,
  extends: ['eslint:recommended', 'plugin:react/recommended', 'prettier'],
  parser: '@babel/eslint-parser',
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true,
  },
  plugins: ['react-hooks'],
  rules: {
    'no-console': 'off',
    semi: ['error', 'always'],
    quotes: ['error', 'single'],
    'no-duplicate-imports': 'error',
    'react/jsx-uses-react': 'off', // no longer needed with new jsx transform
    'react/react-in-jsx-scope': 'off', // ditto
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  overrides: [
    { files: ['src/**/*.jsx'] }, // eslint would lint .js only by default
  ],
};
