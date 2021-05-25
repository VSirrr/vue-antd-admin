import Big from 'big.js';

/**
 * @description 格式化输入框输入的金额：整数到亿，小数后只能有两位
 * @param {string} 金额字符串
 * @returns {string} 格式化之后的金额字符串
 */
export const formatInputMoney = (val = '') => {
  // 处理数字类型
  if (typeof val === 'number') {
    val = new Big(val).toString();
  }
  /**
   * 1. 去除非数字或 .
   * 2. 去除以 0 开始的整数
   * 3. 不能以 . 开始
   * 4. 限制只能输入一个 .
   * 5. 限制小数点后只能两位
   */
  val = val
    .replace(/[^0-9.]/g, '')
    .replace(/^0((?=\d))/, '$1')
    .replace(/^\./, '')
    .replace(/(\.\d*)\./, '$1')
    .replace(/^(\d+\.\d{2})\d+$/, '$1');
  // 6. 判断是否包含小数，并截取字符串长度
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
  // 7. 添加千分符并返回
  return val.replace(/(\d)(?=(\d{3})+(\.\d{0,2})?$)/g, '$1,');
};

/**
 * @description 格式化金额：对传入的数字或数字字符串进行格式化
 * @param {string|number} 数字或数字字符串
 * @returns {string} 格式化之后的金额字符串
 */
export const formatMoney = (val = '') => {
  // 1. 非字符串转换成字符串
  if (typeof val !== 'string') {
    val = val.toString();
  }
  // 2. 格式化
  val = formatInputMoney(val);
  // 3. 补充小数位
  const index = val.indexOf('.');
  if (index > -1) {
    const length = val.slice(index + 1).length;
    if (length < 2) {
      val = val.concat('0');
    }
  } else {
    val = val.concat('.00');
  }
  // 4. 返回处理好的值
  return val;
};

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
export const formatInputPhoneNumber = (val = '') => {
  /**
   * 1. 去除非数字
   * 2. 限制首字符只能为 1
   * 3. 截取 11 字符
   * 4. 转换为数组
   */
  const res = formatInputOnlyNumber(val)
    .replace(/^[^1]/, '')
    .slice(0, 11)
    .split('');
  // 5. 获取数组的长度
  const length = res.length;
  /**
   * 6. 判断数组长度
   * 6.1. 数组长度大于 3，需要对对数组的第三位添加空格
   * 6.2. 数组长度大于 7，需要对对数组的第八位添加空格
   */
  if (length > 3) {
    res.splice(3, 0, ' ');
  }
  if (length > 7) {
    res.splice(8, 0, ' ');
  }
  // 将数组转为字符串并返回
  return res.join('');
};

/**
 * @description 将格式化的值进行反格式化
 * @param {string} 格式化的值
 * @returns {number} 反格式化的值
 */
export const reformatValue = val => val.replace(/,|\s/g, '');

/**
 * @description 图片验证码格式化
 * @param {string} 输入的字符串
 * @returns {string} 格式化的值
 */
export const formatPicCode = (val = '') => val.replace(/[^0-9a-zA-Z]/g, '');
