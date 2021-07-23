<template>
  <span>
    <template v-if="!isCapital">
      {{
        formatValue
          | doPrecision(legalPrecision, isRoundUp)
          | doFormat(hasSeparator, separator)
      }}
    </template>
    <template v-else>
      {{ formatValue | doPrecision(4, isRoundUp) | doCapital }}
    </template>
  </span>
</template>

<script>
import Animate from './animate';
import numberCapital from './number-capital';

export default {
  name: 'Amount',
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
      const formatValue = integerValue.replace(
        /(\d)(?=(\d{3})+$)/g,
        `$1${separator}`,
      );
      return decimalValue
        ? `${sign}${formatValue}.${decimalValue}`
        : `${sign}${formatValue}`;
    },
    doCapital(value) {
      return numberCapital(value);
    },
  },
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
    isAnimated: {
      type: Boolean,
      default: false,
    },
    transition: {
      type: Boolean,
      default: false,
    },
    duration: {
      type: Number,
      default: 1000,
    },
  },
  data() {
    return {
      formatValue: 0,
      isMounted: false,
    };
  },
  computed: {
    legalPrecision() {
      return this.precision > 0 ? this.precision : 0;
    },
  },
  watch: {
    value: {
      handler(val, oldVal) {
        if (!this.isMounted) {
          this.formatValue = val;
          return;
        }
        if (this.isAnimated || this.transition) {
          this.$_doAnimateDisplay(oldVal, val);
        } else {
          this.formatValue = val;
        }
      },
      immediate: true,
    },
  },
  mounted() {
    this.isMounted = true;
  },
  methods: {
    $_doAnimateDisplay(fromValue = 0, toValue = 0) {
      const step = percent => {
        if (percent === 1) {
          this.formatValue = toValue;
          return;
        }
        this.formatValue = fromValue + (toValue - fromValue) * percent;
      };

      const verify = id => id;
      const noop = () => {};

      Animate.start(step, verify, noop, this.duration);
    },
  },
};
</script>
