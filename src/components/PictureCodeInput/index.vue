<template>
  <div>
    <a-input
      size="large"
      allow-clear
      :value="value"
      :max-length="4"
      autocomplete="off"
      style="width: 190px;"
      placeholder="请输入图片验证码"
      @change="change"
      @blur="blur"
    >
      <a-icon slot="prefix" type="safety" />
    </a-input>
    <img class="code" :src="imgSrc" alt="图片验证码" />
    <!-- <a-spin v-else /> -->
    <a class="refresh" :disabled="disabled" @click="toggle">
      <a-icon type="reload" :spin="spin" />
      刷新
    </a>
  </div>
</template>

<script>
import { formatPicCode } from 'utils/format';

export default {
  name: 'PictureCodeInput',
  props: {
    value: String,
    hasIcon: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      imgSrc: 'http://ats.cfaoe.com/captcha/getcode.do?s=login',
      spin: false,
      disabled: false,
    };
  },
  methods: {
    // 获取验证码
    async getData() {
      // this.imgSrc = await getPicCode();
    },
    // 刷新验证码
    async toggle() {
      if (this.disabled || this.spin) {
        return;
      }
      this.spin = true;
      await this.getData();
      this.spin = false;
    },
    // 当输入四位验证码是进行校验
    async change(e) {
      const code = (e.target.value = formatPicCode(e.target.value));
      this.$emit('change', code);
    },
    blur(e) {
      this.$emit('blur', e);
    },
  },
  // created() {
  //   this.getData();
  // },
};
</script>

<style lang="less" scoped>
.code {
  margin: 0 14px;
  width: 90px;
  height: 30px;
  vertical-align: -8px;
}
a.refresh {
  font-size: 14px;
  transition: transform 0.3s;
  user-select: none;
  &[disabled] {
    color: rgba(0, 0, 0, 0.25) !important;
  }
}
</style>
