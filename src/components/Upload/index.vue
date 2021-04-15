<template>
  <a-upload
    name="file"
    v-bind="$attrs"
    :accept="accept"
    :multiple="false"
    :list-type="listType"
    :file-list="fileList"
    :before-upload="beforeUpload"
    @change="change"
    @preview="preview"
  >
    <template v-if="listType === 'picture-card'">
      <a-icon style="font-size: 30px;color: #999;" type="plus" />
      <div style="margin-top: 8px;color: #666;">
        {{ uploadText }}
      </div>
    </template>
    <template v-else>
      <a-button> <a-icon type="upload" />{{ uploadText }} </a-button>
    </template>
  </a-upload>
</template>

<script>
import { mapMutations } from 'vuex';

// 1 MB
const MB = 1024 * 1024;

export default {
  name: 'Upload',
  model: {
    prop: 'fileList',
    event: 'change',
  },
  props: {
    fileList: {
      type: Array,
      default: () => [],
    },
    accept: {
      type: String,
      default: '.pdf,.jpg,.png',
    },
    listType: {
      type: String,
      default: 'text',
    },
    // 上传文件个数
    limit: {
      type: Number,
      default: 99,
    },
    // 上传文件大小
    limitSize: {
      type: Number,
      default: 30,
    },
    // 文字描述
    uploadText: {
      type: String,
      default: '上传文件',
    },
  },
  data() {
    return {
      // 文件是否符合要求
      unqualified: false,
    };
  },
  methods: {
    ...mapMutations('user', ['clearUserInfo']),
    beforeUpload(file) {
      const { size, name } = file;
      const { limit, accept, limitSize, fileList = [] } = this;
      // 判断文件类型
      if (!accept.includes(name.slice(name.lastIndexOf('.')))) {
        file.status = 'error';
        this.$message.error('文件类型不符合要求');
        this.unqualified = true;
        return false;
      }
      // 判断文件大小
      if (size / MB > limitSize) {
        file.status = 'error';
        this.$message.error('文件大小超出限制');
        this.unqualified = true;
        return false;
      }
      // 判断文件个数是否超出限制
      if (fileList.length >= limit) {
        file.status = 'error';
        this.$message.error(`超出上传文件最大个数`);
        this.unqualified = true;
        return false;
      }
      return true;
    },
    async change({ file, fileList, event }) {
      if (!this.unqualified && file.status === 'error') {
        this.$message.error('文件上传错误');
      }
      this.unqualified = false;
      // 删除文件
      if (file.status === 'removed' && this.$listeners.delete) {
        await this.$listeners.delete();
      }
      this.$emit(
        'change',
        fileList
          // 过滤错误的文件
          .filter(file => file.status !== 'error')
          // 为上传成功的文件添加预览地址 url
          .map(file => {
            if (file.response) {
              const { retcode, msg, data } = file.response;
              if (retcode) {
                this.$message.error(msg);
                if (retcode === 10028) {
                  this.clearUserInfo();
                }
              } else {
                const { basePath, fileName, originFileName } = data;
                file.url = `/files/previewFile?&basePath=${basePath}&fileName=${fileName}&originFileName=${encodeURIComponent(
                  originFileName,
                )}`;
              }
            }
            return file;
          }),
        event,
      );
    },
    // 预览文件
    preview(file) {
      window.open(`${process.env.VUE_APP_BASE_URL}${file.url}`);
    },
  },
};
</script>
