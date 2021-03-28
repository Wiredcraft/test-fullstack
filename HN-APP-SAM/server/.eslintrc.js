module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'no-empty': 'error',
    semi: ['error', 'never'],
    'semi-spacing': [
      'error',
      {
        before: false,
        after: true,
      },
    ],
    'lines-around-comment': [
      'error',
      {
        beforeBlockComment: true,
      },
    ],
    'line-comment-position': ['error', { position: 'above' }],
    'spaced-comment': ['error', 'always'],
  },
}
