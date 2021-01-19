<template>
  <div class="search-button">
    <a-button type="primary" @click="$emit('search')">
      查询
    </a-button>
    <a-button @click="$emit('reset')">
      重置
    </a-button>
    <a v-if="hasToggle" @click="toggle">
      <span v-show="show">
        收起
        <a-icon type="up" />
      </span>
      <span v-show="!show">
        展开
        <a-icon type="down" />
      </span>
    </a>
  </div>
</template>

<script>
export default {
  name: 'SearchButton',
  data() {
    return {
      show: false,
      hasToggle: 'toggle' in this.$attrs,
    };
  },
  methods: {
    toggle() {
      this.show = !this.show;
      this.$emit('update:toggle', this.show);
    },
  },
};
</script>

<style lang="less" scoped>
.search-button {
  & > button:not(:last-child) {
    margin-right: 10px;
  }
  & > a {
    display: inline-block;
    width: 46px;
    user-select: none;
  }
}
</style>
