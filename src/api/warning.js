import request from 'utils/request';

export const queryWarningList = data =>
  request({
    url: '/warning/queryWarningList',
    method: 'post',
    data,
  });
