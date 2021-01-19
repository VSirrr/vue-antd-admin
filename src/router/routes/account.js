import BlankLayout from '@/layouts/BlankLayout';

export default {
  path: '/account',
  redirect: '/account/info',
  meta: {
    title: '账户管理',
    icon: 'setting',
  },
  component: BlankLayout,
  children: [
    {
      path: '/account/info',
      meta: {
        title: '账户信息',
      },
      component: () => import('views/account/info'),
    },
    {
      path: '/account/pwd',
      meta: {
        title: '修改密码',
      },
      component: () => import('views/account/pwd'),
    },
  ],
};
