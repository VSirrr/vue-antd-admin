module.exports = {
  '*.md': ['prettier --write'],
  'package.json': ['prettier --write'],
  'src/**/*.{js,jsx}': ['eslint --fix', 'prettier --write'],
  'src/**/*.{css,less,html}': ['stylelint --fix', 'prettier --write'],
  'src/**/*.vue': ['eslint --fix', 'prettier --write', 'stylelint --fix'],
  '{!(package)*.json,*.code-snippets,.!(browserslist)*rc}': [
    'prettier --write--parser json',
  ],
};
