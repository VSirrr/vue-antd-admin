export default {
  // 用户菜单
  routes: state => state.user.routes,
  // 用户按钮权限集合
  buttons: state => state.user.buttons,
  // 用户 id
  userId: state => state.user.userInfo.id,
  // 用户手机号
  userPhone: state => state.user.userInfo.phone,
  // 用户名
  userName: state => state.user.userInfo.userName,
  // 用户角色：1 => 超级管理员 2 => 操作员
  userType: state => state.user.userInfo.userTypeDesc,
};
