<template>
  <a-button
    class="count-down"
    :style="style"
    v-bind="$attrs"
    :type="type"
    :size="size"
    :disabled="isDisabled"
    @click="click"
  >
    {{ showingText }}
  </a-button>
</template>

<script>
export default {
  name: 'CountDown',
  props: {
    type: {
      type: String,
      default: 'default',
    },
    size: {
      type: String,
      default: 'large',
    },
    seconds: {
      type: [Number, String],
      default: 60,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    limited: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      count: 0,
    };
  },
  computed: {
    style() {
      return {
        'font-size': this.limited ? '12px' : '14px',
      };
    },
    isDisabled() {
      const { limited, disabled, count } = this;
      return limited || disabled || count > 0;
    },
    showingText() {
      const { count, limited } = this;
      if (limited) {
        return '本日已达上限';
      }
      if (count > 0) {
        const text = `${count} s`;
        if (count < 10) {
          return `0${text}`;
        }
        return text;
      }
      return '获取验证码';
    },
  },
  methods: {
    run() {
      this.$message.success('验证码已发送');
      this.count = this.seconds;
      if (this.timer) {
        clearInterval(this.timer);
      }
      this.timer = setInterval(() => {
        this.count--;
        if (this.count === 0) {
          clearInterval(this.timer);
        }
      }, 1000);
    },
    click() {
      this.$emit('click', this.run);
    },
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
};
</script>

<style lang="less" scoped>
.count-down {
  margin-left: 14px;
  padding: 0 10px;
  width: 92px;
  vertical-align: 0.5px;
  overflow: hidden;
  transition-duration: 0s;
}
</style>
