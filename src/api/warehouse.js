import request from 'utils/request';

export const getCount = () =>
  request({
    url: '/warehouse/getCount',
    method: 'get',
  });
