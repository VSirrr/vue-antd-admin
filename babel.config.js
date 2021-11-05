module.exports = {
  env: {
    development: {
      // babel-plugin-dynamic-import-node plugin only does one thing by converting all import() to require().
      // This plugin can significantly increase the speed of hot updates, when you have a large number of pages.
      plugins: ['dynamic-import-node'],
    },
  },
  presets: [
    '@vue/cli-plugin-babel/preset',
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'entry',
        corejs: 3,
      },
    ],
  ],
  plugins: [
    // 减少 ES6 转为 ES5 的冗余代码
    '@babel/plugin-transform-runtime',
    [
      'import',
      {
        libraryName: 'ant-design-vue',
        libraryDirectory: 'es',
        style: true, // `style: 'css'` || `style: true` 会加载 less 文件
      },
    ],
  ],
};
