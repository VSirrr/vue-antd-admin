const Mock = require('mockjs');
const { Random } = Mock;

const list = [];
const status = {
  1: '正常',
  2: '已停用',
  3: '已注销',
};
// 正常(1),质押审批中(2),已质押(3),解押审批中(4),转让中(5),提货中(6),注销中(7),已注销(8)
const receiptStatus = {
  1: '正常',
  2: '质押审批中',
  3: '已质押',
  4: '解押审批中',
  5: '转让中',
  6: '提货中',
  7: '注销中',
  8: '已注销',
};
const eventName = [
  '仓单登记',
  '仓单发生转让',
  '仓单发生质押',
  '仓单发生解押',
  '仓单发生提货',
  '仓单已注销',
];
for (let i = 0; i < 100; i++) {
  const index = Random.integer(1, 3);
  const receiptStatusIndex = Random.integer(1, 8);
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
    warehouseStatus: index,
    warehouseStatusDesc: status[index],
    storageCategory: Random.ctitle(),
    platformReceiptNumber: Mock.mock(/^[0-9A-Z]{18}$/),

    contractNo: Mock.mock(/^[0-9A-Z]{18}$/),
    depositorName: Random.cname(),
    expiringDate: Random.datetime(),
    fileList: [
      {
        basePath: 'bb',
        fileName: 'aa',
        id: 12,
        originFileName: '1111111',
      },
      {
        basePath: 'bb',
        fileName: 'aa',
        originFileName: '122222',
      },
    ],
    hashVal: Random.guid(),
    insuranceList: [
      {
        insurance: '22',
        insuranceNo: '111',
        insurer: '333',
      },
      {
        insurance: '22',
        insuranceNo: '111',
        insurer: '333',
      },
    ],
    issuanceTime: Random.datetime(),

    receiptNumber: Mock.mock(/^[0-9A-Z]{18}$/),
    receiptStatus: receiptStatusIndex,
    receiptStatusDesc: receiptStatus[receiptStatusIndex],
    role: {
      id: 1,
      firstName: 'aaa',
      operateCnt: 1,
      secondName: 'abvc',
      pledgeCnt: 'abcd',
      unPledgeCnt: 'absc',
      pickUpGoodsCnt: 'babc',
      storageUnit: 'abcqq',
      createTime: Random.datetime(),
    },
    storageCnt: Random.integer(1, 1000),
    storageLossStandard: Random.ctitle(),
    storageName: Random.ctitle(),
    storagePrice: Random.integer(100, 100000),
    storagePeriod: Random.datetime(),
    storageRate: Random.integer(1, 1000),
    storageSpecs: '2',
    storageTag: '3',
    storageUnit: '4',
    testOrgList: [
      {
        inspectionNo: '1',
        orgName: '2',
      },
      {
        inspectionNo: '13',
        orgName: '23',
      },
    ],
    warehouseAddress: Random.county(true),
  });
}

const list2 = [];

for (let i = 0; i < 100; i++) {
  const j = i + 1;
  list2.push({
    id: j,
    eventId: j,
    entityId: j,
    eventName: eventName[Random.integer(0, 5)],
    createTime: Random.datetime(),
    firstName: Random.cname(),
    pickUpGoodsCnt: 10,
    platformReceiptNumber: Mock.mock(/^[0-9A-Z]{18}$/),
    pledgeCnt: 20,
    receiptNumber: Mock.mock(/^[0-9A-Z]{18}$/),
    secondName: Random.cname(),
    storageCnt: Random.integer(1, 1000),
    storageUnit: '4',
    unPledgeCnt: 10,
  });
}

module.exports = [
  {
    url: '/wr/queryWarehouseReceiptList',
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
    url: '/wr/getWarehouseReceiptDetail',
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
    url: '/wr/downWarehouseReceiptDetail',
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
    url: '/wr/queryHistory',
    type: 'post',
    response: () => {
      return {
        retcode: 0,
        msg: '',
        data: {
          list: list2,
          totalPage: Math.ceil(list2.length / 10),
          totalSize: list2.length,
        },
      };
    },
  },
  {
    url: '/wr/getHistoryDetail',
    type: 'get',
    response: req => {
      const id = req.query.id;
      return {
        retcode: 0,
        msg: '',
        data: list2.find(item => item.id == id),
      };
    },
  },
];
