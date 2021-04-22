import account from './account';
import redirect from './redirect';
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
    redirect: '/users',
    component: BasicLayout,
    children: [
      {
        path: '/users',
        meta: {
          title: '用户管理',
          icon: 'team',
        },
        component: () => import('views/users'),
      },
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
        ],
      },
      account,
    ],
  },
  redirect,
];
