<template>
  <div class="card" @click="$_to">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    to: {
      type: String,
      required: true,
    },
  },
  methods: {
    $_to() {
      this.$router.push(this.to);
    },
  },
};
</script>

<style lang="less" scoped>
.card {
  margin: @padding-lg;
  float: left;
  width: 200px;
  height: 200px;
  line-height: 200px;
  border: 1px solid #e8e8e8;
  border-radius: @border-radius-base;
  font-size: 18px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    box-shadow: 2px 2px 6px #ccc;
  }
}
</style>
