<template>
  <a-input
    allow-clear
    :value="value"
    autocomplete="off"
    placeholder="请输入数值"
    v-bind="$attrs"
    @change="change"
    @blur="blur"
  />
</template>

<script>
import { formatInputOnlyNumber } from 'utils/format';

export default {
  name: 'NumberInput',
  props: {
    value: String,
  },
  methods: {
    change(e) {
      const val = (e.target.value = formatInputOnlyNumber(e.target.value));
      this.$emit('change', val);
    },
    blur(e) {
      this.$emit('blur', e);
    },
  },
};
</script>
