import axios from 'axios';
import store from '@/store';
import { message, notification } from 'ant-design-vue';

// 配置 axios 并创建实例
const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
});

// 异常拦截处理器
const errorHandler = error => {
  const { response, data, message } = error;
  // 错误提示
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
  // 返回错误数据
  return Promise.reject(data);
};

// 获取 CancelToken 类
const CancelToken = axios.CancelToken;
// 请求队列
const queue = {};

// 请求拦截器
request.interceptors.request.use(config => {
  // 获取请求接口路径
  const { url } = config;
  // 请求相同的接口,当上一次请求没有返回结果之前取消
  queue[url] && queue[url]('取消重复请求');
  // 为每个请求添加 cancelToken
  config.cancelToken = new CancelToken(cancel => {
    queue[url] = cancel;
  });
  return config;
}, errorHandler);

// 响应拦截器
request.interceptors.response.use(({ config, data: result }) => {
  const { retcode, msg, data } = result;
  // 正确情况
  if (retcode === 0) {
    delete queue[config.url];
    return Promise.resolve(data);
  }
  // 当发生错误时,取消通过 Promise.all() 发送的请求
  for (const url in queue) {
    queue[url]('取消后续请求！');
    delete queue[url];
  }
  // 提示错误消息
  if (retcode >= 50000 && retcode < 60000) {
    message.error(msg);
  }
  // 登录超时
  if (retcode === 10028) {
    message.error(msg);
    store.commit('user/clearUserInfo');
  }
  return Promise.reject(result);
}, errorHandler);

export default request;
