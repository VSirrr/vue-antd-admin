import request from 'utils/request';

// 平台列表查询
export const queryPlatformList = data =>
  request({
    url: '/platform/queryPlatformList',
    method: 'post',
    data,
  });

// 平台注销
export const platformClose = data =>
  request({
    url: '/platform/platformClose',
    method: 'post',
    data,
  });

// 平台停用
export const platformDisable = data =>
  request({
    url: '/platform/platformDisable',
    method: 'post',
    data,
  });

// 平台启用
export const platformEnable = data =>
  request({
    url: '/platform/platformEnable',
    method: 'post',
    data,
  });

// 查询平台列表
export const getPlatformDetail = params =>
  request({
    url: '/platform/getPlatformDetail',
    method: 'get',
    params,
  });

// 新增平台
export const addPlatform = data =>
  request({
    url: '/platform/addPlatform',
    method: 'post',
    data,
  });

// 平台编辑
export const toEditPlatform = params =>
  request({
    url: '/platform/toEditPlatform',
    method: 'get',
    params,
  });

// 平台编辑-保存信息
export const editPlatform = data =>
  request({
    url: '/platform/editPlatform',
    method: 'post',
    data,
  });
