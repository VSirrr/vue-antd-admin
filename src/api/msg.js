import request from 'utils/request';

export const getPictureCode = () =>
  request({
    url: '/msg/picture',
    method: 'get',
  });
