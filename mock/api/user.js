const Mock = require('mockjs');

const { Random } = Mock;

const list = [];
// 1:待审核,2:正常,3:已停用,4:审核不通过,5:已注销/已失效
const userStatus = {
  '1': '待审核',
  '2': '正常',
  '3': '已停用',
  '4': '审核不通过',
  '5': '已失效',
};
for (let i = 0; i < 100; i++) {
  const userStatusIndex = Random.integer(1, 5);
  list.push({
    id: i + 1,
    companyId: Random.increment(),
    companyName: Random.ctitle(),
    createTime: Random.datetime(),
    updateTime: Random.datetime(),
    userName: Random.cname(),
    userStatus: userStatusIndex,
    userStatusDesc: userStatus[userStatusIndex],
    userType: 3,
    userTypeDesc: '查询员',
    auditRefuseReason: '',
    companyOrgCode: Mock.mock(/^[0-9A-Z]{18}$/),
    createUserName: Random.cname(),
    fileId: Random.increment(),
    phone: Mock.mock(/^1[3-9]\d{9}$/),
    queryNumber: Random.integer(0, 10000),
  });
}

module.exports = [
  {
    url: '/operator/queryUserList',
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
    url: '/operator/userEnable',
    type: 'post',
    response: () => {
      return {
        retcode: 0,
        msg: 'ok',
        data: true,
      };
    },
  },
  {
    url: '/operator/userDisable',
    type: 'post',
    response: () => {
      return {
        retcode: 0,
        msg: 'ok',
        data: true,
      };
    },
  },
];
