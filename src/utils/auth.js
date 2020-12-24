import md5 from 'md5';
import storage from './storage';

const TOKEN_KEY = 'token';

// 设置 token
export const setToken = token => storage.set(TOKEN_KEY, md5(token));

// 获取 token
export const getToken = () => storage.get(TOKEN_KEY);

// 移除 token
export const removeToken = () => storage.remove(TOKEN_KEY);
