import request from 'utils/request';

// 增加角色
export const addRole = data =>
  request({
    url: '/role/addRole',
    method: 'post',
    data,
  });

// 给角色分配权限
export const addRoleElementsRelation = data =>
  request({
    url: '/role/addRoleElementsRelation',
    method: 'post',
    data,
  });

// 给用户分配角色
export const addUserRoleRelation = data =>
  request({
    url: '/role/addUserRoleRelation',
    method: 'post',
    data,
  });

// 删除角色
export const delRole = data =>
  request({
    url: '/role/delRole',
    method: 'post',
    data,
  });

// 获取角色信息
export const toEditRole = params =>
  request({
    url: '/role/toEditRole',
    method: 'get',
    params,
  });

// 编辑角色
export const editRole = data =>
  request({
    url: '/role/editRole',
    method: 'post',
    data,
  });

// 查询角色权限
export const queryRoleElementsRelationList = params =>
  request({
    url: '/role/queryRoleElementsRelationList',
    method: 'get',
    params,
  });

// 查询角色列表
export const queryRoleList = data =>
  request({
    url: '/role/queryRoleList',
    method: 'post',
    data,
  });

// 获取所有角色
export const findOperatorRoleList = data =>
  request({
    url: '/role/findOperatorRoleList',
    method: 'post',
    data,
  });

// 查询用户拥有的角色列表
export const queryUserRoleRelationList = data =>
  request({
    url: '/role/queryUserRoleRelationList',
    method: 'post',
    data,
  });
