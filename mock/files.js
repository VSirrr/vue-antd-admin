module.exports = [
  {
    url: '/files/upload',
    type: 'post',
    response: req => {
      console.log(req.body);
      return {
        retcode: 0,
        msg: '',
        data: {
          basePath: 'sdfgwer123ewrweqr',
          fileName: '123werqwe',
          originFileName: '123',
        },
      };
    },
  },
];
