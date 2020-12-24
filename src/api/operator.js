import request from 'utils/request';

// 登录
export const login = data =>
  request({
    url: '/operator/login',
    method: 'post',
    data,
  });

// 登出
export const logout = () =>
  request({
    url: '/operator/logout',
    method: 'post',
  });

// 修改手机号
export const modifyOperatorPhone = data =>
  request({
    url: '/operator/modifyOperatorPhone',
    method: 'post',
    data,
  });

// 修改密码
export const modifyOperatorPwd = data =>
  request({
    url: '/operator/modifyOperatorPwd',
    method: 'post',
    data,
  });

// 操作员分页列表
export const queryOperatorList = data =>
  request({
    url: '/operator/queryOperatorList',
    method: 'post',
    data,
  });

// 操作员注销记录
export const getCancelRecord = params =>
  request({
    url: '/operator/getCancelRecord',
    method: 'get',
    params,
  });

// 重置操作员密码
export const resetOperatorPwd = data =>
  request({
    url: '/operator/resetOperatorPwd',
    method: 'post',
    data,
  });

// 操作员状态变更
export const changeOperatorStatus = data =>
  request({
    url: '/operator/changeOperatorStatus',
    method: 'post',
    data,
  });

// 变更操作员
export const changeAdmin = data =>
  request({
    url: '/operator/changeAdmin',
    method: 'post',
    data,
  });

// 操作员注册
export const registerOperator = data =>
  request({
    url: '/operator/registerOperator',
    method: 'post',
    data,
  });
