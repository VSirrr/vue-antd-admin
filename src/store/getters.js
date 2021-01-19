export default {
  // 用户菜单
  routes: state => state.user.routes,
  // 用户 id
  userId: state => state.user.userInfo.id,
  // 手机号
  userPhone: state => state.user.userInfo.phone,
  // 用户名
  userName: state => state.user.userInfo.userName,
  // 用户角色
  userType: state => state.user.userInfo.userTypeDesc,
};
