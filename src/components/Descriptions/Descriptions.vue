<template>
  <div class="descriptions">
    <h4 class="descriptions-title" v-if="title">
      {{ title }}
      <span class="descriptions-title-extra" v-if="$slots.extra">
        <slot name="extra" />
      </span>
    </h4>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Descriptions',
  provide() {
    const { layout } = this;

    return {
      layout,
    };
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    layout: {
      type: Object,
      default: () => ({
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
      }),
    },
  },
};
</script>

<style lang="less" scoped>
.descriptions {
  &-title {
    margin-bottom: 12px;
    font-weight: 700;
    font-size: 14px;
    line-height: 32px;
    &-extra {
      float: right;
      font-weight: 400;
    }
  }
  /deep/ .ant-form-item {
    margin-bottom: 0;
    color: #969799;
  }
}
</style>
