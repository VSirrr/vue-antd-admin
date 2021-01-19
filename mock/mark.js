const Mock = require('mockjs');
const { Random } = Mock;

module.exports = [
  {
    url: '/mark/addMark',
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
    url: '/mark/deleteMark',
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
