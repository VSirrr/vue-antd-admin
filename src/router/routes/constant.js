import BasicLayout from '@/layouts/BasicLayout';
import BlankLayout from '@/layouts/BlankLayout';

/**
 * @param {string} icon meta 中设置 icon(ant-design-vue 中的 icon 组件类型)，则在菜单中显示图标
 * @param {string} title meta 中设置 title 就会在面包屑中显示，不设置就不显示
 * @param {boolean} hideChildren 设置为 true 的话 会隐藏所有子菜单
 * @param {boolean} hidden 在菜单中隐藏本路由对应的菜单
 */

export default [
  {
    path: '/',
    redirect: '/demo',
    component: BasicLayout,
    children: [
      {
        path: '/demo',
        meta: {
          title: 'Demo',
          icon: 'appstore',
        },
        component: BlankLayout,
        children: [
          {
            path: '/demo/drag-modal',
            meta: {
              title: 'DragModal',
            },
            component: () => import('views/demo/drag-modal'),
          },
          {
            path: '/demo/clipboard',
            meta: {
              title: 'Clipboard',
            },
            component: () => import('views/demo/clipboard'),
          },
          {
            path: '/demo/input',
            meta: {
              title: 'Input',
            },
            component: () => import('views/demo/input'),
          },
        ],
      },
      {
        path: '/users',
        meta: {
          title: '用户管理',
          icon: 'team',
        },
        component: () => import('views/users'),
      },
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
      {
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
      },
    ],
  },
  {
    path: '*',
    redirect: '/404',
  },
];
