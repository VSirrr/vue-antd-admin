// polyfill
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
// import './filters';
import './permission';
// 按需引入组件
import './antd-components';
// 全局样式（包含对依赖库中的样式覆盖），放在所有css最后面
import './global.less';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
