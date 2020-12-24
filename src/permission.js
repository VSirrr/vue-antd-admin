// https://github.com/rstacruz/nprogress
import store from '@/store';
import router from '@/router';
import 'nprogress/nprogress.css';
import NProgress from 'nprogress';
import { getToken } from 'utils/auth';
import { Modal } from 'ant-design-vue';

// NProgress Configuration
NProgress.configure({ showSpinner: false });

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  // 根据 token 是否存在，判断用户是否登录
  const token = getToken();
  if (token) {
    if (to.path === '/login') {
      next('/');
      NProgress.done();
    } else {
      if (store.getters.userName) {
        next();
      } else {
        try {
          await store.dispatch('user/getUserInfo');
          next({ ...to, replace: true });
        } catch (error) {
          console.error(error);
          next();
          NProgress.done();
        }
      }
    }
  } else {
    if (to.path === '/login') {
      next();
    } else {
      next({ path: '/login', replace: true });
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  NProgress.done();
  Modal.destroyAll();
});
