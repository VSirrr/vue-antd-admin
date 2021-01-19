<template>
  <a-form-item :label="label" label-align="left" v-bind="layout">
    <slot />
  </a-form-item>
</template>

<script>
export default {
  name: 'DescriptionsItem',
  inject: ['layout'],
  props: {
    label: {
      type: String,
      required: true,
    },
  },
};
</script>
