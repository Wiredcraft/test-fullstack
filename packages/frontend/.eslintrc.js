const OFF = 0;
// const WARN = 1;
const ERROR = 2;

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:react/recommended',
    'plugin:unicorn/recommended',
    'plugin:promise/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'unicorn', 'promise', '@typescript-eslint'],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.json'],
      },
      typescript: {
        extensions: ['.tsx', '.ts'],
      },
    },
  },
  rules: {
    'import/extensions': [
      ERROR,
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never',
        json: 'never',
        js: 'never',
      },
    ],
    'react/jsx-filename-extension': [
      ERROR,
      {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    ],
    'unicorn/prefer-module': OFF,
    '@typescript-eslint/no-var-requires': OFF,
    'unicorn/prevent-abbreviations': OFF,
    'unicorn/no-array-reduce': OFF,
    'import/no-extraneous-dependencies': [ERROR, { devDependencies: true }],
    'react/jsx-uses-react': OFF,
    'react/react-in-jsx-scope': OFF,
    '@typescript-eslint/no-non-null-assertion': OFF,
    'import/no-import-module-exports': OFF,
    'unicorn/prefer-object-from-entries': OFF,
    'import/no-unresolved': OFF,
  },
};
