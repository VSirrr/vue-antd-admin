<template>
  <div>
    <a-input v-model="copyData" />
    <a-button
      v-clipboard:copy="copyData"
      v-clipboard:success="copySuccess"
      v-clipboard:error="copyError"
      type="default"
    >
      复制
    </a-button>
  </div>
</template>

<script>
export default {
  name: 'Clipboard',
  data() {
    return {
      copyData: 234,
    };
  },
  methods: {
    copySuccess() {
      this.$message.success('复制成功');
    },
    copyError() {
      this.$message.error('复制失败');
    },
  },
};
</script>

<style lang="less" scoped></style>
