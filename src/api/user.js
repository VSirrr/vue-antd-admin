import request from 'utils/request';

// 获取登录用户的信息
export const getUser = () =>
  request({
    url: '/user/getUser',
    method: 'get',
  });
