module.exports = [
  {
    url: '/operationApply/audit',
    type: 'post',
    response: () => {
      return {
        retcode: 0,
        msg: '',
        data: true,
      };
    },
  },
];
