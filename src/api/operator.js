import request from 'utils/request';

// 登录
export const login = data =>
  request({
    url: '/operator/login',
    method: 'post',
    data,
  });

// 获取登录用户的信息
export const getOperator = () =>
  request({
    url: '/operator/getOperator',
    method: 'get',
  });

// 登出
export const logout = () =>
  request({
    url: '/operator/logout',
    method: 'get',
  });

// 修改手机号前校验手机号
export const validModifyOperatorPhone = data =>
  request({
    url: '/operator/validModifyOperatorPhone',
    method: 'post',
    data,
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

// 变更管理员分页列表
export const findChooseOperatorList = data =>
  request({
    url: '/operator/findChooseOperatorList',
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

// 操作员注销
export const operatorClose = data =>
  request({
    url: '/operator/operatorClose',
    method: 'post',
    data,
  });

// 操作员停用
export const operatorDisable = data =>
  request({
    url: '/operator/operatorDisable',
    method: 'post',
    data,
  });

// 操作员启用
export const operatorEnable = data =>
  request({
    url: '/operator/operatorEnable',
    method: 'post',
    data,
  });

// 用户列表
export const queryUserList = data =>
  request({
    url: '/operator/queryUserList',
    method: 'post',
    data,
  });

// 用户启用
export const userEnable = data =>
  request({
    url: '/operator/userEnable',
    method: 'post',
    data,
  });

// 用户停用
export const userDisable = data =>
  request({
    url: '/operator/userDisable',
    method: 'post',
    data,
  });
