import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';

Vue.use(Vuex);

// 引入 vuex 模块
const modules = {};
const modulesFiles = require.context('./modules', true, /\.js$/);

modulesFiles.keys().forEach(filePath => {
  const modulesFile = modulesFiles(filePath);
  const modulesName = filePath.replace(/^\.\/(.*)\.\w+$/, '$1');
  modules[modulesName] = modulesFile.default;
});

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules,
  getters,
});
