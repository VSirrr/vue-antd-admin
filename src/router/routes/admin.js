import account from './account';
import redirect from './redirect';
import BasicLayout from '@/layouts/BasicLayout';
import BlankLayout from '@/layouts/BlankLayout';

export default [
  {
    path: '/',
    redirect: '/operator',
    component: BasicLayout,
    children: [
      {
        path: '/operator',
        meta: {
          title: '操作员管理',
          icon: 'user',
        },
        hideChildren: true,
        component: BlankLayout,
        children: [
          {
            path: '/operator',
            component: () => import('views/operator'),
          },
          {
            path: '/operator/increase',
            meta: {
              title: '新增操作员',
            },
            component: () => import('views/operator/increase'),
          },
        ],
      },
      account,
    ],
  },
  redirect,
];
