<template>
  <div>
    <a-input v-model="copyData">
      <a-button
        slot="suffix"
        v-clipboard:copy="copyData"
        v-clipboard:success="copySuccess"
        v-clipboard:error="copyError"
        style="margin-right: -12px;"
        type="primary"
      >
        复制
      </a-button>
    </a-input>
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
