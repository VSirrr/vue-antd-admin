import md5 from 'md5';
import { removeToken } from '@/utils/token';
import { login, logout, getOperator } from 'api/operator';
import router, { resetRouter, adminRoutes, operatorRoutes } from '@/router';

// 对路由表进行筛选
function generateRoutes(routes, authority) {
  for (let i = 0; i < routes.length; i++) {
    const route = routes[i];
    if (!authority.includes(route.path)) {
      routes.splice(i, 1);
      i--;
      continue;
    }
    if (route.children) {
      generateRoutes(route.children, authority);
    }
  }
}

// 区分菜单和按钮
function getMenuAndButton(data) {
  // 数组
  const menus = [];
  const buttons = [];
  data.forEach(item => {
    if (item.indexOf('menu:') === 0) {
      menus.push(item.slice(5));
    } else if (item.indexOf('button:') === 0) {
      buttons.push(item.slice(7));
    }
  });
  return {
    menus,
    buttons,
  };
}

// 初始状态
const initialState = {
  // 用户菜单
  routes: [],
  // 用户按钮权限集合
  buttons: [],
  // 用户信息
  userInfo: {},
};

export default {
  namespaced: true,
  state: Object.assign({}, initialState),
  mutations: {
    // 处理用户信息
    dealUserInfo: (state, userInfo) => {
      let routes;
      if (userInfo.userType === 1) {
        routes = adminRoutes;
      } else {
        // 区分菜单与按钮
        const { menus, buttons } = getMenuAndButton(userInfo.authority);
        // 根据后台返回的菜单过滤路由表
        generateRoutes(operatorRoutes[0].children, menus);
        routes = operatorRoutes;
        // 设置用户按钮权限集合
        state.buttons = buttons;
      }
      // 设置用户菜单
      state.routes = routes;
      // 设置用户信息
      state.userInfo = userInfo;
      // 动态添加路由表
      router.addRoutes(routes);
    },
    // 清空用户信息
    clearUserInfo: state => {
      // 移除 token
      removeToken();
      // 重置路由
      resetRouter();
      // 重置状态
      Object.assign(state, initialState);
      // 重定向到登录页
      router.push('/login');
    },
  },
  actions: {
    // 登录
    async login({ commit }, { phone, password, pictureCode }) {
      try {
        const userInfo = await login({
          phone,
          pictureCode,
          password: md5(password),
        });
        commit('dealUserInfo', userInfo);
        return Promise.resolve(userInfo);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    // 获取用户信息
    async getUserInfo({ commit }) {
      try {
        const userInfo = await getOperator();
        commit('dealUserInfo', userInfo);
        return Promise.resolve(userInfo);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    // 登出
    async logout({ commit }) {
      try {
        await logout();
        commit('clearUserInfo');
      } catch (error) {
        console.error(error);
      }
    },
  },
};
