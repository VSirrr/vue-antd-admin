<template>
  <a-result status="404" title="404" sub-title="您访问的页面不存在！">
    <template #extra>
      <back-button />
    </template>
  </a-result>
</template>

<script>
import BackButton from './components/BackButton';

export default {
  name: 'Error404',
  components: {
    BackButton,
  },
};
</script>
