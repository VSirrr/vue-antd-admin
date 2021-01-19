const Mock = require('mockjs');
const { Random } = Mock;

const list = [];
const status = {
  1: '正常',
  2: '已失效',
};
const warehouseStatus = {
  1: '正常',
  2: '已停用',
  3: '已注销',
};

for (let i = 0; i < 100; i++) {
  const index = Random.integer(1, 2);
  const warehouseStatusIndex = Random.integer(1, 3);
  list.push({
    id: i + 1,
    companyId: Random.increment(),
    companyName: Random.ctitle(),
    createTime: Random.datetime(),
    updateTime: Random.datetime(),
    companyOrgCode: Mock.mock(/^[0-9A-Z]{18}$/),
    linkMan: Random.cname(),
    linkPhone: Mock.mock(/^1[3-9]\d{9}$/),
    markList: [
      {
        id: 1,
        content: Random.ctitle(),
        createTime: Random.datetime(),
        updateTime: Random.datetime(),
      },
      {
        id: 2,
        content: Random.ctitle(),
        createTime: Random.datetime(),
        updateTime: Random.datetime(),
      },
    ],
    operation: [Random.ctitle(), Random.ctitle()],
    address: Random.county(true),
    content: Random.cparagraph(),
    platformName: Random.cname() + '平台',
    platformStatus: index,
    provideName: Random.cname() + '有限公司',
    provideStatus: index,
    warehouseCode: Mock.mock(/^[0-9A-Z]{18}$/),
    warehouseName: Random.cname() + '仓库',
    warehouseNumber: Mock.mock(/^[0-9A-Z]{18}$/),
    warehouseStatus: warehouseStatusIndex,
    warehouseStatusDesc: warehouseStatus[warehouseStatusIndex],
    platformReceiptNumber: Mock.mock(/^[0-9A-Z]{18}$/),
    status: index,
    statusDesc: status[index],
    fileList: [
      {
        basePath: 'bba',
        fileName: 'aab',
        id: 12,
        uid: 12,
        originFileName: '1111111',
        name: '1111111',
        url: `/files/previewFile?&basePath=aaa&fileName=bbb&originFileName=1111`,
      },
      {
        basePath: 'bba',
        fileName: 'aab',
        id: 13,
        uid: 13,
        originFileName: '122222',
        name: '122222',
        url: `/files/previewFile?&basePath=aaa&fileName=bbb&originFileName=1111`,
      },
    ],
    updateUserName: Random.cname(),
  });
}

module.exports = [
  {
    url: '/warehouse/queryWarehouseStatusList',
    type: 'post',
    response: () => {
      return {
        retcode: 0,
        msg: '',
        data: {
          list,
          totalPage: Math.ceil(list.length / 10),
          totalSize: list.length,
        },
      };
    },
  },
  {
    url: '/warehouse/queryWarehouseList',
    type: 'post',
    response: () => {
      return {
        retcode: 0,
        msg: '',
        data: {
          list,
          totalPage: Math.ceil(list.length / 10),
          totalSize: list.length,
        },
      };
    },
  },
  {
    url: '/warehouse/warehouseClose',
    type: 'post',
    response: () => {
      return {
        retcode: 0,
        msg: '',
        data: null,
      };
    },
  },
  {
    url: '/warehouse/warehouseDisable',
    type: 'post',
    response: () => {
      return {
        retcode: 0,
        msg: '',
        data: null,
      };
    },
  },
  {
    url: '/warehouse/warehouseEnable',
    type: 'post',
    response: () => {
      return {
        retcode: 0,
        msg: '',
        data: null,
      };
    },
  },
  {
    url: '/warehouse/getWarehouseDetail',
    type: 'get',
    response: req => {
      const id = req.query.id;
      return {
        retcode: 0,
        msg: '',
        data: list.find(item => item.id == id),
      };
    },
  },
  {
    url: '/warehouse/addWarehouse',
    type: 'post',
    response: req => {
      console.log(req.body);
      const { provideId, warehouseCode } = req.body;
      if (provideId == 1 && warehouseCode == 1234) {
        return {
          retcode: 70002,
          msg: '该仓库已存在，请增加其他仓库',
        };
      }
      return {
        retcode: 0,
        msg: '',
        data: true,
      };
    },
  },
  {
    url: '/warehouse/queryChoolseProvideList',
    type: 'post',
    response: () => {
      return {
        retcode: 0,
        msg: '',
        data: {
          list,
          totalPage: Math.ceil(list.length / 10),
          totalSize: list.length,
        },
      };
    },
  },
  {
    url: '/warehouse/toEditWarehouse',
    type: 'get',
    response: req => {
      const id = req.query.id;
      return {
        retcode: 0,
        msg: '',
        data: list.find(item => item.id == id),
      };
    },
  },
  {
    url: '/warehouse/editWarehouse',
    type: 'post',
    response: req => {
      console.log(req.body);
      const { provideId, warehouseCode } = req.body;
      if (provideId == 1 && warehouseCode == 1234) {
        return {
          retcode: 70002,
          msg: '该仓库已存在，请增加其他仓库',
        };
      }
      return {
        retcode: 0,
        msg: '',
        data: true,
      };
    },
  },
  {
    url: '/warehouse/queryWarehouseListByProvideId',
    type: 'post',
    response: req => {
      return {
        retcode: 0,
        msg: '',
        data: {
          list,
          totalPage: Math.ceil(list.length / 10),
          totalSize: list.length,
        },
      };
    },
  },
];
