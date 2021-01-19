import request from 'utils/request';

// 新增标注
export const addMark = data =>
  request({
    url: '/mark/addMark',
    method: 'post',
    data,
  });

// 移除标注
export const deleteMark = data =>
  request({
    url: '/mark/deleteMark',
    method: 'post',
    data,
  });
