import request from 'utils/request';

// 已登记仓单信息列表
export const queryWarehouseReceiptList = data =>
  request({
    url: '/wr/queryWarehouseReceiptList',
    method: 'post',
    data,
  });

// 仓单详情
export const getWarehouseReceiptDetail = params =>
  request({
    url: '/wr/getWarehouseReceiptDetail',
    method: 'get',
    params,
  });

// 仓单详情的历史记录
export const queryHistory = data =>
  request({
    url: '/wr/queryHistory',
    method: 'post',
    data,
  });

// 仓单详情的历史记录详情
export const getHistoryDetail = params =>
  request({
    url: '/wr/getHistoryDetail',
    method: 'get',
    params,
  });
