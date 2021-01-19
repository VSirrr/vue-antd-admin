import Vue from 'vue';
import Router from 'vue-router';
import routes from './routes/default';
import adminRoutes from './routes/admin';
import operatorRoutes from './routes/operator';

// hack router push callback
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) {
    return originalPush.call(this, location, onResolve, onReject);
  }
  return originalPush.call(this, location).catch(err => err);
};
const originalReplace = Router.prototype.replace;
Router.prototype.replace = function replace(location, onResolve, onReject) {
  if (onResolve || onReject) {
    return originalReplace.call(this, location, onResolve, onReject);
  }
  return originalReplace.call(this, location).catch(err => err);
};

Vue.use(Router);

// 创建路由实例
const createRouter = () =>
  new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    scrollBehavior: () => ({ y: 0 }),
    routes,
  });

// 生成路由实例
const router = createRouter();

// 重置路由表
const resetRouter = () => {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher;
};

export { routes, adminRoutes, operatorRoutes, resetRouter };

export default router;
