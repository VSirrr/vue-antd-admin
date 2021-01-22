const md5 = require('md5');
const Mock = require('mockjs');

const { Random } = Mock;
const PWD = md5('qwer1234');

const adminPhone = '18888888888';
const operatorPhone = '13333333333';

let loginUserPhone = operatorPhone;

const adminInfo = {
  id: 1,
  userType: 1,
  userStatus: 1,
  phone: adminPhone,
  userName: '天道酬勤',
  userTypeDesc: '超级管理员',
};

const operatorInfo = {
  id: 2,
  phone: operatorPhone,
  userName: '天道酬勤',
  userStatus: 2,
  userType: 2,
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
      console.log(phone);

      if (pictureCode === '3333') {
        return {
          retcode: 10054,
          msg: '图片验证码已过期',
        };
      }

      if (pictureCode.toLowerCase() !== 'hm58') {
        return {
          retcode: 10053,
          msg: '图片验证码不正确',
        };
      }

      // 超级管理员
      if (phone === adminPhone && password === PWD) {
        loginUserPhone = adminPhone;
        return {
          retcode: 0,
          msg: 'ok',
          data: adminInfo,
        };
      }
      // 操作员
      if (phone === operatorPhone && password === PWD) {
        loginUserPhone = operatorPhone;
        return {
          retcode: 0,
          msg: 'ok',
          data: operatorInfo,
        };
      }
      // 用户密码错误
      if (
        (phone === operatorPhone || phone === adminPhone) &&
        password !== PWD
      ) {
        return {
          retcode: 10048,
          msg: '用户密码错误',
        };
      }

      if (phone === '15555555555') {
        return {
          retcode: 20001,
          msg: '该账号不可登录，请联系管理员',
        };
      }

      return {
        retcode: 10000,
        msg: '此手机号未注册，请先进行注册',
      };
    },
  },
  {
    url: '/operator/logout',
    type: 'get',
    response: () => {
      return {
        retcode: 0,
        msg: 'ok',
      };
    },
  },
  {
    url: '/operator/getOperator',
    type: 'get',
    response: () => {
      let userInfo = {};

      if (loginUserPhone === adminPhone) {
        userInfo = adminInfo;
      } else if (loginUserPhone === operatorPhone) {
        userInfo = operatorInfo;
      }

      return {
        retcode: 0,
        msg: 'ok',
        data: userInfo,
      };
    },
  },
  {
    url: '/operator/validModifyOperatorPhone',
    type: 'post',
    response: req => {
      const { newPhone } = req.body;
      if (newPhone === loginUserPhone) {
        return {
          retcode: 10050,
          msg: '新手机号不能与原手机号相同',
        };
      }
      if (newPhone === '15555555555') {
        return {
          retcode: 10001,
          msg: '手机号已注册，请更换其他手机号',
        };
      }
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
      if (newPhone === loginUserPhone) {
        return {
          retcode: 10050,
          msg: '新手机号不能与原手机号相同',
        };
      }
      if (newPhone === '15555555555') {
        return {
          retcode: 10001,
          msg: '手机号已注册，请更换其他手机号',
        };
      }
      return {
        retcode: 0,
        msg: 'ok',
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
          retcode: 10003,
          msg: '原密码错误',
        };
      }
      if (userNewPwd === PWD) {
        return {
          retcode: 10037,
          msg: '新密码不能与原密码相同',
        };
      }
      return {
        retcode: 0,
        msg: 'ok',
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
    url: '/operator/findChooseOperatorList',
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
      if (req.body.phone === operatorPhone) {
        return {
          retcode: 10001,
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
  {
    url: '/operator/operatorClose',
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
    url: '/operator/operatorDisable',
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
    url: '/operator/operatorEnable',
    type: 'post',
    response: () => {
      return {
        retcode: 0,
        msg: '',
        data: null,
      };
    },
  },
];
