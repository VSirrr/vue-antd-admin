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
    <img v-if="imgSrc" class="code" :src="imgSrc" alt="图片验证码" />
    <a-spin v-else class="code" style="vertical-align: 0;" />
    <a class="refresh" :disabled="spin" @click="refresh">
      <a-icon type="reload" :spin="spin" />
      刷新
    </a>
  </div>
</template>

<script>
import { getPictureCode } from 'api/msg';
import { formatPicCode } from './formatValue';

export default {
  name: 'PictureCode',
  props: {
    // eslint-disable-next-line vue/require-default-prop
    value: String,
    hasIcon: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      imgSrc: '',
      spin: false,
    };
  },
  created() {
    this.getData();
  },
  methods: {
    // 获取验证码
    async getData() {
      try {
        const qrcode = await getPictureCode();
        this.imgSrc = `data:image/jpeg;base64,${qrcode}`;
      } catch (error) {
        console.error(error);
      }
    },
    // 刷新验证码
    async refresh() {
      if (this.spin) {
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
};
</script>

<style lang="less" scoped>
.code {
  width: 90px;
  height: 30px;
  margin: 0 14px;
  vertical-align: -8px;
}

a.refresh {
  font-size: 14px;
  user-select: none;
  transition: transform 0.3s;

  &[disabled] {
    color: rgba(0, 0, 0, 0.25);
    cursor: not-allowed;
  }
}
</style>
