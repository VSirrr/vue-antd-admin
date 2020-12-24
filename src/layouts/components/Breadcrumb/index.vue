<template>
  <a-breadcrumb v-show="exist" class="breadcrumb">
    <a-breadcrumb-item v-for="(route, index) in breadcrumbs" :key="route.path">
      <a
        v-if="index < breadcrumbs.length - 1"
        @click="$router.push(route.path)"
      >
        {{ route.meta.title }}
      </a>
      <template v-else>
        {{ route.meta.title }}
      </template>
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script>
export default {
  name: 'Breadcrumb',
  computed: {
    /**
     * @description 根据 meta 中的 参数去判断是否显示在面包屑中
     * @param {boolean} notShowBreadcrumb 不显示整个面包屑
     * @param {string} title 在面包屑中显示的文字，不设置就不显示
     */
    breadcrumbs() {
      // 去掉根路径 '/'
      const routes = this.$route.matched.slice(1);
      // notShowBreadcrumb = true 不显示面包屑
      if (routes[0].meta.notShowBreadcrumb) {
        return [];
      }
      // todo 过滤掉路径相同的 route
      // 过滤掉没有设置 title 的 route
      return routes.filter(route => route.meta.title);
    },
    // 面包屑是否显示
    exist() {
      return this.breadcrumbs.length >= 1;
    },
  },
};
</script>

<style lang="less" scoped>
.breadcrumb {
  padding: @padding-md @padding-lg;
  border-bottom: 1px solid #e8e8e8;
  background: @white;
}
</style>
