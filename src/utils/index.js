/**
 * @description 下载文件
 * @param {string} 下载路径
 */
export const downloadFile = link => {
  const a = document.createElement('a');
  a.href = `${window.location.protocol}//${window.location.host}${process.env.VUE_APP_BASE_URL}${link}`;
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  a.remove();
};
