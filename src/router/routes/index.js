import BasicLayout from '@/layouts/BasicLayout';
import BlankLayout from '@/layouts/BlankLayout';

/**
 * @param {boolean} notShowBreadcrumb 控制不显示面包屑
 * @param {string} title meta 中设置 title 就会在面包屑中显示，不设置就不显示
 * @param {boolean} hideChildren 设置为 true 的话 会隐藏所有子菜单
 */

export default [
  {
    path: '/',
    redirect: '/dashboard',
    component: BasicLayout,
    children: [
      {
        path: '/dashboard',
        meta: {
          title: '工作台',
          icon: 'dashboard',
        },
        component: () => import('views/dashboard'),
      },
      {
        path: '/organization',
        redirect: '/organization/platform',
        meta: {
          title: '机构管理',
          icon: 'apartment',
        },
        component: BlankLayout,
        children: [
          {
            path: '/organization/platform',
            meta: {
              title: '仓单运营平台管理',
            },
            hideChildren: true,
            component: BlankLayout,
            children: [
              {
                path: '/organization/platform',
                component: () => import('views/organization/platform'),
              },
              {
                path: '/organization/platform/detail',
                meta: {
                  title: '仓单运营平台详情',
                },
                component: () => import('views/organization/platform/detail'),
              },
              {
                path: '/organization/platform/increase',
                meta: {
                  title: '新增仓单运营平台',
                },
                component: () => import('views/organization/platform/increase'),
              },
              {
                path: '/organization/platform/edit',
                meta: {
                  title: '修改信息',
                },
                component: () => import('views/organization/platform/edit'),
              },
            ],
          },
          {
            path: '/organization/provider',
            meta: {
              title: '仓单出具人管理',
            },
            hideChildren: true,
            component: BlankLayout,
            children: [
              {
                path: '/organization/provider',
                component: () => import('views/organization/provider'),
              },
              {
                path: '/organization/provider/detail',
                meta: {
                  title: '仓单出具人详情',
                },
                component: () => import('views/organization/provider/detail'),
              },
              {
                path: '/organization/provider/increase',
                meta: {
                  title: '新增仓单出具人',
                },
                component: () => import('views/organization/provider/increase'),
              },
              {
                path: '/organization/provider/edit',
                meta: {
                  title: '修改信息',
                },
                component: () => import('views/organization/provider/edit'),
              },
            ],
          },
          {
            path: '/organization/warehouse',
            meta: {
              title: '仓库管理',
            },
            hideChildren: true,
            component: BlankLayout,
            children: [
              {
                path: '/organization/warehouse',
                component: () => import('views/organization/warehouse'),
              },
              {
                path: '/organization/warehouse/detail',
                meta: {
                  title: '仓库详情',
                },
                component: () => import('views/organization/warehouse/detail'),
              },
              {
                path: '/organization/warehouse/increase',
                meta: {
                  title: '新增仓库',
                },
                component: () =>
                  import('views/organization/warehouse/increase'),
              },
              {
                path: '/organization/warehouse/edit',
                meta: {
                  title: '修改信息',
                },
                component: () => import('views/organization/warehouse/edit'),
              },
            ],
          },
          {
            path: '/organization/warehouseStatus',
            meta: {
              title: '仓库现状表',
            },
            component: () => import('views/organization/warehouseStatus'),
          },
        ],
      },
      {
        path: '/statistics',
        redirect: '/statistics/warehouse',
        meta: {
          title: '数据统计',
          icon: 'database',
        },
        component: BlankLayout,
        children: [
          {
            path: '/statistics/warehouse',
            meta: {
              title: '已登记仓单信息表',
            },
            hideChildren: true,
            component: BlankLayout,
            children: [
              {
                path: '/statistics/warehouse',
                component: () => import('views/statistics/warehouse'),
              },
              {
                path: '/statistics/warehouse/detail',
                meta: {
                  title: '仓单详情',
                },
                component: () => import('views/statistics/warehouse/detail'),
              },
            ],
          },
        ],
      },
      {
        path: '/alarm',
        meta: {
          title: '报警管理',
          icon: 'alert',
        },
        component: () => import('views/alarm'),
      },
      {
        path: '/users',
        meta: {
          title: '查询用户管理',
          icon: 'user',
        },
        component: () => import('views/users'),
      },
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
  {
    path: '*',
    redirect: '/404',
  },
];
