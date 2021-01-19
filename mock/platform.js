const Mock = require('mockjs');
const { Random } = Mock;

const list = [];
const status = {
  '1': '正常',
  '2': '已停用',
  '3': '已注销',
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
    platformName: Random.cname() + '有限公司',
    platformNumber: Mock.mock(/^[0-9A-Z]{18}$/),
    platformStatus: index,
    platformStatusDesc: status[index],
    address: Random.county(true),
    platformId: i + 1,
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
    url: '/platform/queryPlatformList',
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
    url: '/platform/platformClose',
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
    url: '/platform/platformDisable',
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
    url: '/platform/platformEnable',
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
    url: '/platform/getPlatformDetail',
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
    url: '/platform/addPlatform',
    type: 'post',
    response: req => {
      console.log(req.body);
      return {
        retcode: 0,
        msg: '',
        data: true,
      };
    },
  },
  {
    url: '/platform/toEditPlatform',
    type: 'get',
    response: req => {
      const id = req.query.platformId;
      return {
        retcode: 0,
        msg: '',
        data: list.find(item => item.id == id),
      };
    },
  },
  {
    url: '/platform/editPlatform',
    type: 'post',
    response: req => {
      console.log(req.body);
      return {
        retcode: 0,
        msg: '',
        data: true,
      };
    },
  },
];
