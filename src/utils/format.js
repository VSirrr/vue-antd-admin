/**
 * @description 格式化输入框输入的金额：整数到亿，小数后只能有两位
 * @param {string} 金额字符串
 * @returns {string} 格式化之后的金额字符串
 */
export const formatInputMoney = (val = '') => {
  // 去除非 数字 或 .
  val = val.replace(/[^0-9.]/g, '');
  // 去除以 0 开始的整数
  val = val.replace(/^0((?=\d))/, '$1');
  // 不能以 . 开始
  val = val.replace(/^\./, '');
  // 限制只能输入一个 .
  val = val.replace(/(\.\d*)\./, '$1');
  // 限制小数点后只能两位
  val = val.replace(/^(\d+\.\d{2})\d+$/, '$1');

  if (val.indexOf('.') > -1) {
    const strs = val.split('.');
    let prefix = strs[0];
    const suffix = strs[1];
    if (prefix.length > 9) {
      prefix = prefix.slice(0, 9);
    }
    val = prefix + '.' + suffix;
  } else {
    if (val.length > 9) {
      val = val.slice(0, 9);
    }
  }

  // 千分符
  val = val.replace(/(\d)(?=(\d{3})+(\.\d{0,2})?$)/g, '$1,');

  return val;
};

/**
 * @description 格式化金额：对传入的数字或数字字符串进行格式化
 * @param {string|number} 数字或数字字符串
 * @returns {string} 格式化之后的金额字符串
 */
export const formatMoney = (val = '') => {
  if (typeof val !== 'string') {
    val = val.toString();
  }
  val = formatInputMoney(val);
  const index = val.indexOf('.');

  if (index > -1) {
    const length = val.slice(index + 1).length;
    if (length < 2) {
      val = val.concat('0');
    }
  } else {
    val = val.concat('.00');
  }

  return val;
};

/**
 * @description 将格式化的金额进行反格式化
 * @param {string} 格式化的金额
 * @returns {number} 反格式化的金额
 */
export const formatMoney2Number = val => +val.replace(/,/g, '');

/**
 * @description 对输入非数字内容进行替换
 * @param {string} 输入的字符串
 * @returns {number} 数字字符串
 */
export const formatInputOnlyNumber = (val = '') => val.replace(/\D/g, '');

/**
 * @description 格式化输入的银行卡号：每四位数字后添加一个空格
 * @param {string} 数字字符串
 * @returns {string} 格式化之后的银行卡号字符串
 */
export const formatInputBankNumber = (val = '') =>
  formatInputOnlyNumber(val).replace(/(\d{4})(?=\d)/g, '$1 ');

/**
 * @description 格式化输入的手机号
 * @param {string} 数字字符串
 * @returns {string} 格式化之后的手机号字符串
 */
export const formatPhoneNumber = (val = '') =>
  val.replace(/^(\d{3})(\d{4})(\d{4})/, '$1****$3');

/**
 * @description 限制只能输入数字和大小写字母
 * @param {string} 字符串
 * @returns {string} 只包含数字和大小写字母的字符串
 */
export const formatPicCode = (val = '') => val.replace(/[^0-9a-zA-Z]/g, '');
