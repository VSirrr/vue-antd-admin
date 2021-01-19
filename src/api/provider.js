import request from 'utils/request';

// 出具人列表查询
export const queryProvideList = data =>
  request({
    url: '/provide/queryProvideList',
    method: 'post',
    data,
  });

// 出具人注销
export const provideClose = data =>
  request({
    url: '/provide/provideClose',
    method: 'post',
    data,
  });

// 出具人停用
export const provideDisable = data =>
  request({
    url: '/provide/provideDisable',
    method: 'post',
    data,
  });

// 出具人启用
export const provideEnable = data =>
  request({
    url: '/provide/provideEnable',
    method: 'post',
    data,
  });

// 出具人详情
export const getProvideDetail = params =>
  request({
    url: '/provide/getProvideDetail',
    method: 'get',
    params,
  });

// 根据平台 id 查询列表
export const queryProvideListByPlatform = data =>
  request({
    url: '/provide/queryProvideListByPlatform',
    method: 'post',
    data,
  });

// 出具人新增
export const addProvide = data =>
  request({
    url: '/provide/addProvide',
    method: 'post',
    data,
  });

// 选择平台列表
export const queryChoosePlatformList = data =>
  request({
    url: '/provide/queryChoosePlatformList',
    method: 'post',
    data,
  });

// 出具人编辑详情
export const toEditProvide = params =>
  request({
    url: '/provide/toEditProvide',
    method: 'get',
    params,
  });

// 出具人编辑
export const editProvide = data =>
  request({
    url: '/provide/editProvide',
    method: 'post',
    data,
  });
