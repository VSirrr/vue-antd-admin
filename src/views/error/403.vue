<template>
  <a-result status="403" title="403" sub-title="您没有权限访问该页面！">
    <template #extra>
      <back-button />
    </template>
  </a-result>
</template>

<script>
import BackButton from './components/BackButton';

export default {
  name: 'Error403',
  components: {
    BackButton,
  },
};
</script>
