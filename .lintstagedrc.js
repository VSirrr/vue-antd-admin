module.exports = {
  '*.md': ['prettier --write'],
  'package.json': ['prettier --write'],
  '!(dist/**/*).{js,jsx}': ['eslint --fix', 'prettier --write'],
  '!(dist/**/*).{css,less,html}': ['stylelint --fix', 'prettier --write'],
  '*.vue': ['eslint --fix', 'prettier --write', 'stylelint --fix'],
  '{!(package)*.json,*.code-snippets,.!(browserslist)*rc}': [
    'prettier --write--parser json',
  ],
};
