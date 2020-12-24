import axios from 'axios';
import store from '@/store';
import { message, notification } from 'ant-design-vue';

const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
});

// 异常拦截处理器
const errorHandler = error => {
  const { response, message } = error;
  if (response) {
    const { status, config, statusText } = response;
    if (status === 404) {
      notification.error({
        message: '路径错误',
        description: `URL: "${config.url}" ${statusText}`,
      });
    } else if (status === 403) {
      notification.error({
        message: '没有权限',
        description: '您没有相关权限，无法访问',
      });
    } else if (status >= 500) {
      notification.error({
        message: '服务器错误',
        description: '系统错误，请稍后再试',
      });
    }
  } else if (message && message.includes('timeout')) {
    notification.error({
      message: '服务器错误',
      description: '服务器响应超时，请稍后再试',
    });
  }
  return Promise.reject(error);
};
// CancelToken
const CancelToken = axios.CancelToken;
let cancel;

request.interceptors.request.use(config => {
  config.cancelToken = new CancelToken(c => (cancel = c));
  return config;
}, errorHandler);

request.interceptors.response.use(response => {
  const { retcode, msg, data } = response.data;
  // 正确情况
  if (retcode === 0) {
    return Promise.resolve(data);
  }
  // 系统异常
  if (retcode >= 50000 && retcode < 60000) {
    message.error(msg);
    return Promise.reject(response.data);
  }
  // 登录超时
  if (retcode === 10028) {
    message.error(msg);
    cancel('登录超时，取消后续请求！');
    store.commit('user/clearUserInfo');
    return Promise.reject(response.data);
  }
  return Promise.reject(response.data);
}, errorHandler);

export default request;
