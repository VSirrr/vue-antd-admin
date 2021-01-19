<template>
  <div>
    <NumberInput
      class="input"
      :maxLength="10"
      :value="queryNumberMin"
      @change="changeMin"
    />
    <span style="margin: 0 12px;color: #ccc;">—</span>
    <NumberInput
      class="input"
      :maxLength="10"
      :value="queryNumberMax"
      @change="changeMax"
    />
  </div>
</template>

<script>
import NumberInput from 'components/NumberInput';

export default {
  name: 'QueryInput',
  components: {
    NumberInput,
  },
  props: ['value'],
  data() {
    const { queryNumberMin, queryNumberMax } = this.value;
    return {
      queryNumberMin,
      queryNumberMax,
    };
  },
  methods: {
    changeMin(queryNumberMin) {
      this.change({ queryNumberMin });
    },
    changeMax(queryNumberMax) {
      this.change({ queryNumberMax });
    },
    change(changedValue) {
      this.$emit('change', { ...this.$data, ...changedValue });
    },
  },
  watch: {
    value: {
      handler({ queryNumberMin, queryNumberMax }) {
        this.queryNumberMin = queryNumberMin;
        this.queryNumberMax = queryNumberMax;
      },
      immediate: true,
    },
  },
};
</script>

<style lang="less" scoped>
.input {
  width: calc((100% - 38px) / 2);
}
</style>
