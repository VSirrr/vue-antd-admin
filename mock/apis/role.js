const Mock = require('mockjs');

const { Random } = Mock;

const elementsTrees = [
  {
    title: '机构管理',
    key: 'menu:/organization',
    children: [
      {
        title: '电子仓单运营企业管理',
        key: 'menu:/organization/platform',
        children: [
          {
            title: '查询页面',
            key: 'menu:/organization/platform/list',
            children: [
              {
                title: '查询功能',
                key: 'button:platformList.search',
              },
              {
                title: '新增功能',
                key: 'button:platformList.increase',
              },
              {
                title: '查看详情',
                key: 'button:platformList.detail',
              },
              {
                title: '编辑功能',
                key: 'button:platformList.edit',
              },
            ],
          },
          {
            title: '详情页面',
            key: 'menu:/organization/platform/detail',
            children: [
              {
                title: '标注功能',
                key: 'button:platformDetail.mark',
              },
              {
                title: '编辑功能',
                key: 'button:platformDetail.edit',
              },
              {
                title: '停用功能',
                key: 'button:platformDetail.disable',
              },
              {
                title: '启用功能',
                key: 'button:platformDetail.enable',
              },
            ],
          },
          {
            title: '编辑页面',
            key: 'menu:/organization/platform/edit',
          },
        ],
      },
      {
        title: '仓储管理企业管理',
        key: 'menu:/organization/provider',
        children: [
          {
            title: '查询页面',
            key: 'menu:/organization/provider/list',
            children: [
              {
                title: '查询功能',
                key: 'button:providerList.search',
              },
              {
                title: '新增功能',
                key: 'button:providerList.increase',
              },
              {
                title: '查看详情',
                key: 'button:providerList.detail',
              },
              {
                title: '编辑功能',
                key: 'button:providerList.edit',
              },
            ],
          },
          {
            title: '详情页面',
            key: 'menu:/organization/provider/detail',
            children: [
              {
                title: '标注功能',
                key: 'button:providerDetail.mark',
              },
              {
                title: '编辑功能',
                key: 'button:providerDetail.edit',
              },
              {
                title: '停用功能',
                key: 'button:providerDetail.disable',
              },
              {
                title: '启用功能',
                key: 'button:providerDetail.enable',
              },
            ],
          },
          {
            title: '编辑页面',
            key: 'menu:/organization/provider/edit',
          },
        ],
      },
      {
        title: '仓库管理',
        key: 'menu:/organization/warehouse',
        children: [
          {
            title: '查询页面',
            key: 'menu:/organization/warehouse/list',
            children: [
              {
                title: '查询功能',
                key: 'button:warehouseList.search',
              },
              {
                title: '新增功能',
                key: 'button:warehouseList.increase',
              },
              {
                title: '查看详情',
                key: 'button:warehouseList.detail',
              },
              {
                title: '编辑功能',
                key: 'button:warehouseList.edit',
              },
              {
                title: '复制功能',
                key: 'button:warehouseList.copy',
              },
            ],
          },
          {
            title: '详情页面',
            key: 'menu:/organization/warehouse/detail',
            children: [
              {
                title: '标注功能',
                key: 'button:warehouseDetail.mark',
              },
              {
                title: '编辑功能',
                key: 'button:warehouseDetail.edit',
              },
              {
                title: '停用功能',
                key: 'button:warehouseDetail.disable',
              },
              {
                title: '启用功能',
                key: 'button:warehouseDetail.enable',
              },
            ],
          },
          {
            title: '复制页面',
            key: 'menu:/organization/warehouse/copyIncrease',
          },
          {
            title: '编辑页面',
            key: 'menu:/organization/warehouse/edit',
          },
        ],
      },
      {
        title: '运营关系查询',
        key: 'menu:/organization/operationRelationship',
      },
    ],
  },
  {
    title: '数据统计',
    key: 'menu:/statistics',
    children: [
      {
        title: '已登记仓单信息表',
        key: 'menu:/statistics/warehouseReceipt',
        children: [
          {
            title: '查询页面',
            key: 'menu:/statistics/warehouseReceipt/list',
            children: [
              {
                title: '查询功能',
                key: 'button:warehouseReceiptList.search',
              },
              {
                title: '查看详情',
                key: 'button:warehouseReceiptList.detail',
              },
            ],
          },
          {
            title: '详情页面',
            key: 'menu:/statistics/warehouseReceipt/detail',
            children: [
              {
                title: '下载功能',
                key: 'button:warehouseReceiptDetail.download',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    title: '报警管理',
    key: 'menu:/alarm',
    children: [
      {
        title: '查询功能',
        key: 'button:alarm.search',
      },
    ],
  },
  {
    title: '查询用户管理',
    key: 'menu:/users',
    children: [
      {
        title: '查询功能',
        key: 'button:users.search',
      },
      {
        title: '查看文件',
        key: 'button:users.file',
      },
      {
        title: '审核功能',
        key: 'button:users.examine',
      },
      {
        title: '停用功能',
        key: 'button:users.disable',
      },
      {
        title: '启用功能',
        key: 'button:users.enable',
      },
    ],
  },
];

let list = [];
let i;

for (i = 0; i < 21; i++) {
  list.push({
    id: i + 1,
    createTime: Random.datetime(),
    roleName: `角色${i + 1}`,
    roleDesc: Random.cword(6),
    checkedKeys: [],
  });
}

module.exports = [
  {
    url: '/role/addRoleElementsRelation',
    type: 'post',
    response: () => {
      return {
        retcode: 0,
        msg: 'ok',
        data: 0,
      };
    },
  },
  {
    url: '/role/addRole',
    type: 'post',
    response: req => {
      list.push({
        id: ++i,
        ...req.body,
      });
      return {
        retcode: 0,
        msg: 'ok',
        data: 0,
      };
    },
  },
  {
    url: '/role/addUserRoleRelation',
    type: 'post',
    response: () => {
      return {
        retcode: 0,
        msg: 'ok',
        data: 0,
      };
    },
  },
  {
    url: '/role/delRole',
    type: 'post',
    response: req => {
      list = list.filter(item => item.id != req.body.id);
      return {
        retcode: 0,
        msg: 'ok',
        data: 0,
      };
    },
  },
  {
    url: '/role/editRole',
    type: 'post',
    response: req => {
      const { id } = req.body;
      return {
        retcode: 0,
        msg: 'ok',
        data: list.find(item => item.id == id),
      };
    },
  },
  {
    url: '/role/toEditRole',
    type: 'get',
    response: req => {
      const { id } = req.query;
      return {
        retcode: 0,
        msg: 'ok',
        data: list.find(item => item.id == id),
      };
    },
  },
  {
    url: '/role/queryRoleElementsRelationList',
    type: 'get',
    response: req => {
      const { id } = req.query;
      const checkedKeys = [];
      if (id) {
        const res = list.find(item => item.id == id);
        checkedKeys.push(...res.checkedKeys);
      }
      return {
        retcode: 0,
        msg: 'ok',
        data: {
          elementsTrees,
          checkedKeys,
        },
      };
    },
  },
  {
    url: '/role/queryRoleList',
    type: 'post',
    response: () => {
      return {
        retcode: 0,
        msg: 'ok',
        data: {
          list,
          totalPage: Math.ceil(list.length / 10),
          totalSize: list.length,
        },
      };
    },
  },
  {
    url: '/role/queryUserRoleRelationList',
    type: 'post',
    response: () => {
      return {
        retcode: 0,
        msg: 'ok',
        data: {
          list,
          totalPage: Math.ceil(list.length / 10),
          totalSize: list.length,
        },
      };
    },
  },
  {
    url: '/role/findOperatorRoleList',
    type: 'post',
    response: () => {
      return {
        retcode: 0,
        msg: 'ok',
        data: list,
      };
    },
  },
];
