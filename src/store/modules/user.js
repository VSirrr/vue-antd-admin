import md5 from 'md5';
import router from '@/router';
import { getUser } from 'api/user';
import { login, logout } from 'api/operator';
import { setToken, removeToken } from 'utils/auth';

export default {
  namespaced: true,
  state: {
    // 用户信息
    userInfo: {},
  },
  mutations: {
    // 处理用户信息
    dealUserInfo: (state, data) => {
      state.userInfo = data;
    },
    // 清空用户信息
    clearUserInfo: state => {
      removeToken();
      router.push('/login');
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
        const data = await getUser();
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
