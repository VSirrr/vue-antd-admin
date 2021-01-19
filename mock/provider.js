const Mock = require('mockjs');
const { Random } = Mock;

const list = [];
const status = {
  1: '正常',
  2: '已停用',
  3: '已注销',
};
for (let i = 0; i < 100; i++) {
  const index = Random.integer(1, 3);
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
        content: Random.ctitle(),
        createTime: Random.datetime(),
        id: 0,
        updateTime: Random.datetime(),
      },
    ],
    operation: [Random.ctitle(), Random.ctitle()],
    provideName: Random.cname() + '有限公司',
    provideNumber: Mock.mock(/^[0-9A-Z]{18}$/),
    provideStatus: index,
    provideStatusDesc: status[index],
    platformStatus: index,
    platformStatusDesc: status[index],
    address: Random.county(true),
    platformId: i + 1,
    platformName: Random.cname() + '平台',
    platformNumber: Mock.mock(/^[0-9A-Z]{18}$/),
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
    url: '/provide/queryProvideList',
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
    url: '/provide/queryProvideListByPlatform',
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
    url: '/provide/provideClose',
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
    url: '/provide/provideDisable',
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
    url: '/provide/provideEnable',
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
    url: '/provide/getProvideDetail',
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
    url: '/provide/addProvide',
    type: 'post',
    response: req => {
      console.log(req.body);
      const { companyOrgCode } = req.body;
      if (companyOrgCode === '123412341234123412') {
        return {
          retcode: 70002,
          msg: '请输入正确的统一社会信用代码',
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
    url: '/provide/queryChoosePlatformList',
    type: 'post',
    response: req => {
      const chooseList = list.filter(item => item.platformStatus === 1);
      return {
        retcode: 0,
        msg: '',
        data: {
          list: chooseList,
          totalPage: Math.ceil(chooseList.length / 10),
          totalSize: chooseList.length,
        },
      };
    },
  },
  {
    url: '/provide/toEditProvide',
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
    url: '/provide/editProvide',
    type: 'post',
    response: req => {
      console.log(req.body);
      const { companyOrgCode } = req.body;
      if (companyOrgCode === '123412341234123412') {
        return {
          retcode: 70002,
          msg: '请输入正确的统一社会信用代码',
        };
      }
      return {
        retcode: 0,
        msg: '',
        data: true,
      };
    },
  },
];
