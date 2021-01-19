<template>
  <a-input
    allow-clear
    :size="size"
    :value="value"
    :max-length="11"
    autocomplete="off"
    :placeholder="placeholder"
    @change="change"
    @blur="blur"
  >
    <a-icon v-if="hasIcon" slot="prefix" type="mobile" />
  </a-input>
</template>

<script>
import { formatInputOnlyNumber } from 'utils/format';

export default {
  name: 'PhoneInput',
  props: {
    value: String,
    size: {
      type: String,
      default: 'default',
    },
    hasIcon: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: '请输入手机号',
    },
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
