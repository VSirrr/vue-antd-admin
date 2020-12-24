const Mock = require('mockjs');
const { Random } = Mock;

module.exports = [
  {
    url: '/warehouse/getCount',
    type: 'get',
    response: () => {
      return {
        retcode: 0,
        msg: '',
        data: {
          registered: Random.integer(1000, 9999),
          provider: Random.integer(1, 99),
          platform: Random.integer(1, 10),
          warehouse: Random.integer(100, 999),
        },
      };
    },
  },
];
