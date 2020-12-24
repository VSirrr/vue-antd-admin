/**
 * 常用正则
 */

// 手机号
export const REG_PHONE = /^1[3-9]\d{9}$/;
// 身份证号
export const REG_ID_NUMBER = /^[1-9]\d{5}(?:19|20)\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[1-2]\d|30|31)\d{3}[\dXx]$/;
// 密码
export const REG_PASSWORD = /^((?=.*\d)(?=.*\D)|(?=.*[a-zA-Z])(?=.*[^a-zA-Z]))^.{6,30}$/;
// 手机验证码
export const REG_CAPTCHA = /^\d{6}$/;
// 社会信用代码
export const REG_CREADIT_CODE = /^[0-9A-Z]{18}$/;
// 空白
export const REG_SPACE = /\s/g;
// 银行卡号
export const REG_BANK_NUMBER = /^\d{16,21}$/;
// 中文名称
export const REG_NAME = /^(?:[\u4e00-\u9fa5·]{2,30})$/;
//数字
export const REG_NUM = /^[0-9]*$/;
// 图片验证码
export const REG_PIC_CODE = /[0-9a-zA-Z]{4}/;
