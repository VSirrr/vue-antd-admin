module.exports = [
  {
    url: '/user/getUser',
    type: 'get',
    response: () => {
      return {
        retcode: 0,
        msg: 'ok',
        data: {
          id: 123,
          phone: '13333333333',
          userName: '天道酬勤',
          userStatus: 1,
          userType: 1,
          userTypeDesc: '操作员',
        },
      };
    },
  },
];
