const md5 = require('md5');
const Mock = require('mockjs');

const { Random } = Mock;
const PWD = md5('qwer1234');
const PHONE = '13333333333';

const userInfo = {
  id: 123,
  phone: PHONE,
  userName: '天道酬勤',
  userStatus: 1,
  userType: 1,
  userTypeDesc: '操作员',
};

const list = [];
// 1:待审核,2:正常,3:已停用,4:审核不通过,5:已注销/已失效
const userStatus = {
  '2': '正常',
  '3': '已停用',
  '5': '已注销',
};

for (let i = 0; i < 100; i++) {
  const isAdmin = i === 0;
  const userStatusIndex = isAdmin ? 2 : +Mock.mock(/[235]/);
  list.push({
    id: i + 1,
    phone: Mock.mock(/^1[3-9]\d{9}$/),
    companyId: Random.increment(),
    companyName: Random.cname(),
    createTime: Random.datetime(),
    createUserId: 0,
    createUserName: '',
    queryNumber: 0,
    updateTime: Random.datetime(),
    updateUserId: 0,
    updateUserName: '',
    userName: Random.cname(),
    userStatus: userStatusIndex,
    userStatusDesc: userStatus[userStatusIndex],
    userType: isAdmin ? 1 : 2,
    userTypeDesc: isAdmin ? '超级管理员' : '操作员',
  });
}

module.exports = [
  {
    url: '/operator/login',
    type: 'post',
    response: req => {
      const { password, phone, pictureCode } = req.body;
      if (phone !== PHONE) {
        return {
          retcode: 30001,
          msg: '手机号未注册',
        };
      } else if (pictureCode !== '1234') {
        return {
          retcode: 30003,
          msg: '图片验证码不正确',
        };
      } else if (phone === PHONE && password !== PWD) {
        return {
          retcode: 30002,
          msg: '密码不正确',
        };
      } else if (phone === PHONE && password === PWD) {
        return {
          retcode: 0,
          msg: 'ok',
          data: userInfo,
        };
      }
    },
  },
  {
    url: '/operator/logout',
    type: 'post',
    response: () => {
      return {
        retcode: 0,
        msg: 'ok',
      };
    },
  },
  {
    url: '/operator/modifyOperatorPhone',
    type: 'post',
    response: req => {
      const { newPhone } = req.body;
      if (newPhone === PHONE) {
        return {
          retcode: 30000,
          msg: '手机号已注册，请更换其他手机号',
        };
      }
      return {
        retcode: 0,
        msg: 'ok',
        data: userInfo,
      };
    },
  },
  {
    url: '/operator/modifyOperatorPwd',
    type: 'post',
    response: req => {
      const { userOldPwd, userNewPwd } = req.body;
      if (userOldPwd !== PWD) {
        return {
          retcode: 30000,
          msg: '密码不正确',
        };
      }
      if (userNewPwd === PWD) {
        return {
          retcode: 30001,
          msg: '新密码不能与老密码相同',
        };
      }
      return {
        retcode: 0,
        msg: 'ok',
        data: userInfo,
      };
    },
  },
  {
    url: '/operator/queryOperatorList',
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
    url: '/operator/getCancelRecord',
    type: 'get',
    response: req => {
      console.log(req.query.userId);
      return {
        retcode: 0,
        msg: 'ok',
        data: {
          adminName: Random.cname(),
          cancelTime: Random.datetime(),
          operatorName: Random.cname(),
        },
      };
    },
  },
  {
    url: '/operator/resetOperatorPwd',
    type: 'post',
    response: req => {
      console.log(req.body.userId);
      return {
        retcode: 0,
        msg: 'ok',
        data: true,
      };
    },
  },
  {
    url: '/operator/changeOperatorStatus',
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
    url: '/operator/changeAdmin',
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
    url: '/operator/registerOperator',
    type: 'post',
    response: req => {
      if (req.body.phone === PHONE) {
        return {
          retcode: 30000,
          msg: '手机号已注册，请更换其他手机号',
        };
      }
      return {
        retcode: 0,
        msg: 'ok',
        data: true,
      };
    },
  },
];
