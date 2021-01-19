export default [
  {
    path: '/login',
    meta: {
      title: '登录',
    },
    component: () => import('views/login'),
  },
  {
    path: '/404',
    meta: {
      title: '404',
    },
    component: () => import('views/error/404'),
  },
];
