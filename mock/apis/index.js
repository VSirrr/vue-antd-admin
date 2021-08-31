const glob = require('glob');

const mocks = [];

// 获取 /mock/apis 文件夹下的 js 文件（非 index.js）
const filesPath = glob.sync('./*.js', {
  // The current working directory in which to search. Defaults to process.cwd().
  // 修改搜索路径
  cwd: __dirname,
  // 忽略 index.js
  ignore: './index.js',
});

// 根据路径获取文件导出的数组，并合并到 mocks
filesPath.forEach(path => {
  const file = require(path);
  mocks.push(...file);
});

module.exports = {
  mocks,
};
