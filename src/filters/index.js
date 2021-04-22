import Vue from 'vue';
import moment from 'moment';

// 时间格式化
Vue.filter('moment', (val, format = 'YYYY-MM-DD HH:mm:ss') => {
  val = val || '';
  return moment(val).format(format);
});
// 手机号隐藏
Vue.filter('phoneAsterisk', val => {
  val = val || '';
  return val.replace(/^(\d{3})\d{4}(\d{4})$/, `$1****$2`);
});
// 银行卡号格式化 每四位空格隔开
Vue.filter('bankNum', val => {
  val = val || '';
  return val.replace(/(\d{4})(?=\d)/g, '$1 ');
});
// 银行卡号隐藏
Vue.filter('bankNumAsterisk', val => {
  val = val || '';
  const repeatLength = val.length - 8;
  return val.replace(
    /^(\d{4})\d+(\d{4})$/g,
    `$1${'*'.repeat(repeatLength > 0 ? repeatLength : 0)}$2`,
  );
});
// 身份证号隐藏
Vue.filter('idNumAsterisk', val => {
  val = val || '';
  const repeatLength = val.length - 5 || 0;
  return (
    val.slice(0, 3) +
    '*'.repeat(repeatLength > 0 ? repeatLength : 0) +
    val.slice(-2)
  );
});
// 姓名隐藏
Vue.filter('nameAsterisk', val => {
  val = val || '';
  const length = val.length;

  if (length === 2) {
    return `*${val.slice(-1)}`;
  } else if (length >= 3) {
    return val.slice(0, 1) + '*'.repeat(length - 2) + val.slice(-1);
  }
  return val;
});
