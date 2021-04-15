module.exports = {
  '*.md': ['prettier --write'],
  'package.json': ['prettier --write'],
  '*.{js,jsx}': ['eslint --fix', 'prettier --write'],
  '*.{png,jpeg,jpg,gif,svg}': 'imagemin-lint-staged',
  '*.{css,less,html}': ['stylelint --fix', 'prettier --write'],
  '*.vue': ['eslint --fix', 'prettier --write', 'stylelint --fix'],
  '{!(package)*.json,*.code-snippets,.!(browserslist)*rc}': [
    'prettier --write--parser json',
  ],
};
