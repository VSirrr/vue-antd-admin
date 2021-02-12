import md5 from 'md5';
import { setToken, removeToken } from 'utils/auth';
import { login, logout, getOperator } from 'api/operator';
import router, { resetRouter, adminRoutes, operatorRoutes } from '@/router';

export default {
  namespaced: true,
  state: {
    // 用户菜单
    routes: [],
    // 用户信息
    userInfo: {},
  },
  mutations: {
    // 处理用户信息
    dealUserInfo: (state, data) => {
      if (data.userType === 1) {
        state.routes = adminRoutes;
        router.addRoutes(adminRoutes);
      } else {
        state.routes = operatorRoutes;
        router.addRoutes(operatorRoutes);
      }
      state.userInfo = data;
    },
    // 清空用户信息
    clearUserInfo: state => {
      removeToken();
      resetRouter();
      router.push('/login');
      state.routes = [];
      state.userInfo = {};
    },
  },
  actions: {
    // 登录
    async login({ commit }, { phone, password, pictureCode }) {
      try {
        const data = await login({
          phone,
          password: md5(password),
          pictureCode,
        });
        // 设置 token
        setToken('operator' + Date.now());
        commit('dealUserInfo', data);
        return Promise.resolve(data);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    // 获取用户信息
    async getUserInfo({ commit }) {
      try {
        const data = await getOperator();
        commit('dealUserInfo', data);
        return Promise.resolve(data);
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
