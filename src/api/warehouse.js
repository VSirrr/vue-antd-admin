import request from 'utils/request';

// 查询仓库现状表
export const queryWarehouseStatusList = data =>
  request({
    url: '/warehouse/queryWarehouseStatusList',
    method: 'post',
    data,
  });

// 查询仓库列表
export const queryWarehouseList = data =>
  request({
    url: '/warehouse/queryWarehouseList',
    method: 'post',
    data,
  });

// 仓库注销
export const warehouseClose = data =>
  request({
    url: '/warehouse/warehouseClose',
    method: 'post',
    data,
  });

// 仓库停用
export const warehouseDisable = data =>
  request({
    url: '/warehouse/warehouseDisable',
    method: 'post',
    data,
  });

// 仓库启用
export const warehouseEnable = data =>
  request({
    url: '/warehouse/warehouseEnable',
    method: 'post',
    data,
  });

// 查询仓库列表
export const getWarehouseDetail = params =>
  request({
    url: '/warehouse/getWarehouseDetail',
    method: 'get',
    params,
  });

// 新增仓库
export const addWarehouse = data =>
  request({
    url: '/warehouse/addWarehouse',
    method: 'post',
    data,
  });

// 选择出具人列表查询
export const queryChoolseProvideList = data =>
  request({
    url: '/warehouse/queryChoolseProvideList',
    method: 'post',
    data,
  });

// 仓库编辑
export const toEditWarehouse = params =>
  request({
    url: '/warehouse/toEditWarehouse',
    method: 'get',
    params,
  });

// 仓库编辑-保存信息
export const editWarehouse = data =>
  request({
    url: '/warehouse/editWarehouse',
    method: 'post',
    data,
  });

// 根据出具人查询仓库列表
export const queryWarehouseListByProvideId = data =>
  request({
    url: '/warehouse/queryWarehouseListByProvideId',
    method: 'post',
    data,
  });
