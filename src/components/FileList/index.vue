<template>
  <ul>
    <li v-for="(item, index) in fileList" :key="index">
      <a target="_blank" :href="`/api/files/viewFile?id=${item.id}`">
        {{ item.originFileName }}
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'FileList',
  props: {
    fileList: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
};
</script>

<style lang="less" scoped></style>
