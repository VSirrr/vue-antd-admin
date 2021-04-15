<template>
  <div class="steps">
    <a-steps class="steps-nav" :current="current">
      <a-step
        v-for="(item, index) in items"
        :key="index"
        :title="item"
        disabled
      />
    </a-steps>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'Steps',
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  computed: {
    current() {
      return this.$route.path.slice(-1) - 1;
    },
  },
};
</script>

<style lang="less" scoped>
.steps {
  max-width: 900px;
  margin: 60px auto;

  &-nav {
    margin-bottom: 100px;
  }
}
</style>
