const Mock = require('mockjs');
const { Random } = Mock;

const list = [];
const warningType = ['仓单登记失败', /* '仓单编辑失败',  */'仓单状态变更失败'];
for (let i = 0; i < 100; i++) {
  const index = Random.integer(0, 1);
  // const index = Random.integer(0, 2);
  list.push({
    id: i + 1,
    createTime: Random.datetime(),
    content: [
      '仓单运营平台、仓单出具人、仓库不存在',
      '仓单运营平台、仓单出具人、仓库状态异常',
      '关联关系不存在',
      '仓单不存在',
      '仓单状态异常',
      '仓单状态冲突，当前状态为质押中',
    ][i % 6],
    warningType: index,
    warningTypeDesc: warningType[index],
  });
}

module.exports = [
  {
    url: '/warning/queryWarningList',
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
];
