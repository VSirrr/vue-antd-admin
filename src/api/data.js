import request from 'utils/request';

export const getStatistics = () =>
  request({
    url: '/data/statistics',
    method: 'get',
  });
