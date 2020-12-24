<template>
  <span>
    <template v-if="!isCapital">{{
      value
        | doPrecision(legalPrecision, isRoundUp)
        | doFormat(hasSeparator, separator)
    }}</template>
    <template v-else>
      {{ value | doPrecision(4, isRoundUp) | doCapital }}
    </template>
  </span>
</template>

<script>
import numberCapital from './number-capital';

export default {
  name: 'Amount',
  props: {
    value: {
      type: Number,
      default: 0,
    },
    precision: {
      type: Number,
      default: 2,
    },
    isRoundUp: {
      type: Boolean,
      default: true,
    },
    hasSeparator: {
      type: Boolean,
      default: true,
    },
    separator: {
      type: String,
      default: ',',
    },
    isCapital: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      formatValue: 0,
    };
  },
  computed: {
    legalPrecision() {
      return this.precision > 0 ? this.precision : 0;
    },
  },
  filters: {
    doPrecision(value, precision, isRoundUp) {
      const exponentialForm = Number(`${value}e${precision}`);
      const rounded = isRoundUp
        ? Math.round(exponentialForm)
        : Math.floor(exponentialForm);
      return Number(`${rounded}e-${precision}`).toFixed(precision);
    },
    doFormat(value, hasSeparator, separator) {
      if (!hasSeparator) {
        return value;
      }
      const numberParts = value.split('.');
      let integerValue = numberParts[0];
      const decimalValue = numberParts[1] || '';
      let sign = '';
      if (integerValue.startsWith('-')) {
        integerValue = integerValue.substring(1);
        sign = '-';
      }
      const formateValue = integerValue.replace(
        /(\d)(?=(\d{3})+$)/g,
        `$1${separator}`,
      );
      return decimalValue
        ? `${sign}${formateValue}.${decimalValue}`
        : `${sign}${formateValue}`;
    },
    doCapital(value) {
      return numberCapital(value);
    },
  },
};
</script>
