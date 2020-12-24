const isPro = process.env.NODE_ENV === 'production';

module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/prettier'],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': 'off',
    'no-debugger': isPro ? 'error' : 'off',
    'prefer-const': [
      2,
      {
        ignoreReadBeforeAssign: false,
      },
    ],
  },
  ignorePatterns: ['/dist/*.js', '/mock/*.js', '**/lib/*.js'],
};
