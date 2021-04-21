import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';

Vue.use(Vuex);

// 引入 vuex 模块
const modulesFiles = require.context('./modules', true, /\.js$/);

const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const module = modulesFiles(modulePath);
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
  modules[moduleName] = module.default;
  return modules;
}, {});

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules,
  getters,
});
