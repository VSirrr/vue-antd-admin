/**
 * @description 下载文件
 * @param {string} 下载路径
 */
export const downloadFile = link => {
  try {
    const a = document.createElement('a');
    a.href = `${window.location.protocol}//${window.location.host}${process.env.VUE_APP_BASE_URL}${link}`;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    a.remove();
    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * @description 处理上传的文件
 * @param {array} 文件集合
 * @returns 非数组或空数组：返回 null，否则返回 [{basePath: '', fileName: '' ,originFileName: ''}]
 */
export const dealFileList = fileList => {
  return Array.isArray(fileList) && fileList.length > 0
    ? fileList.map(item => {
        let basePath;
        let fileName;
        let originFileName;
        if (item.response) {
          ({ basePath, fileName, originFileName } = item.response.data);
        } else {
          ({ basePath, fileName, originFileName } = item);
        }
        return {
          basePath,
          fileName,
          originFileName,
        };
      })
    : null;
};
