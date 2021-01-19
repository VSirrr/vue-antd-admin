import request from 'utils/request';

export const audit = data =>
  request({
    url: '/operationApply/audit',
    method: 'post',
    data,
  });
