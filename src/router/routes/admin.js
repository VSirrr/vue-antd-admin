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
        redirect: '/operator/list',
        meta: {
          title: '操作员管理',
          icon: 'team',
        },
        hideChildren: true,
        component: BlankLayout,
        children: [
          {
            path: '/operator/list',
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
      {
        path: '/roles',
        redirect: '/roles/list',
        meta: {
          title: '角色管理',
          icon: 'usergroup-add',
        },
        hideChildren: true,
        component: BlankLayout,
        children: [
          {
            path: '/roles/list',
            component: () => import('views/roles'),
          },
          {
            path: '/roles/increase',
            meta: {
              title: '新增角色',
            },
            component: () => import('views/roles/form'),
          },
          {
            path: '/roles/edit',
            meta: {
              title: '修改角色',
            },
            props: ({ query }) => ({ ...query }),
            component: () => import('views/roles/form'),
          },
        ],
      },
      account,
    ],
  },
  redirect,
];
