<template>
  <a-config-provider v-bind="config">
    <div id="app">
      <router-view />
    </div>
  </a-config-provider>
</template>

<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';

export default {
  name: 'App',
  data() {
    return {
      config: {
        // 设置中文
        locale: zhCN,
      },
    };
  },
};
</script>
