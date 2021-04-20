<template>
  <a :class="cls" v-bind="$attrs" v-on="$listeners">
    <slot />
  </a>
</template>

<script>
export default {
  name: 'OperateButton',
  props: {
    colorRed: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    cls() {
      const cls = ['operate-button'];
      if (this.colorRed) {
        cls.push('color-red');
      }
      return cls;
    },
  },
};
</script>

<style lang="less" scoped>
@import 'styles/color';

.operate-button {
  &:not(:last-child) {
    margin-right: 18px;
  }

  &.color-red {
    color: @red;
  }
}
</style>
