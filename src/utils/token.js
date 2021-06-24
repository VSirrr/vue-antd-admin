import cookie from 'js-cookie';

const TOKEN_KEY = 'token';

// 获取 token
export const getToken = () => cookie.get(TOKEN_KEY);

// 移除 token
export const removeToken = () => cookie.remove(TOKEN_KEY);
