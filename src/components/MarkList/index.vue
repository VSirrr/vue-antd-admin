<template>
  <div>
    <ul v-if="showList">
      <li v-for="(item, index) in markList" :key="index">
        {{ item.content }}
      </li>
    </ul>
    <template v-else>
      暂无内容
    </template>
  </div>
</template>

<script>
export default {
  name: 'MarkList',
  props: {
    markList: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    showList() {
      return this.markList && this.markList.length > 0;
    },
  },
};
</script>
