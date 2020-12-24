const Mock = require('mockjs');
const { Random } = Mock;

module.exports = [
  {
    url: '/data/statistics',
    type: 'get',
    response: () => {
      return {
        retcode: 0,
        msg: '',
        data: {
          receipt: Random.integer(1000, 9999),
          provide: Random.integer(1, 99),
          platform: Random.integer(1, 10),
          warehouse: Random.integer(100, 999),
        },
      };
    },
  },
];
