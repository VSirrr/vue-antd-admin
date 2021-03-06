<template>
  <div class="login">
    <a-layout-header class="login-header">
      vue-antd-admin
    </a-layout-header>
    <div class="login-content">
      <div class="login-content-logo">
        <img src="@/assets/img/logo.png" alt="logo" />
      </div>
      <a-form :form="form">
        <a-form-item>
          <PhoneInput
            v-decorator="phone"
            size="large"
            type="phone"
            placeholder="请输入手机号"
          >
            <a-icon slot="prefix" type="mobile" />
          </PhoneInput>
        </a-form-item>
        <a-form-item>
          <a-input-password
            v-decorator="password"
            size="large"
            allow-clear
            autocomplete="off"
            placeholder="请输入密码"
          >
            <a-icon slot="prefix" type="lock" />
          </a-input-password>
        </a-form-item>
        <a-form-item>
          <PictureCodeInput ref="pictureCode" v-decorator="pictureCode" />
        </a-form-item>
        <a-form-item>
          <a-button
            block
            size="large"
            type="primary"
            :loading="submitting"
            @click="submit"
          >
            登 录
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import PhoneInput from 'components/Input';
import PictureCodeInput from 'components/Input/PictureCode';
import { REG_PASSWORD, REG_PIC_CODE, REG_PHONE } from 'utils/regexp';

export default {
  name: 'Login',
  components: {
    PhoneInput,
    PictureCodeInput,
  },
  data() {
    return {
      submitting: false,
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this);
    this.phone = [
      'phone',
      {
        validateTrigger: 'blur',
        getValueFromEvent: value => value,
        rules: [
          {
            required: true,
            message: '请输入手机号',
          },
          {
            pattern: REG_PHONE,
            message: '请输入正确的手机号',
          },
        ],
      },
    ];
    this.password = [
      'password',
      {
        validateTrigger: 'blur',
        rules: [
          {
            required: true,
            message: '请输入密码',
          },
          {
            pattern: REG_PASSWORD,
            message: '密码只能是6~30位数字、字母、符号的组合（至少含两种）',
          },
        ],
      },
    ];
    this.pictureCode = [
      'pictureCode',
      {
        validateTrigger: 'blur',
        rules: [
          {
            required: true,
            message: '请输入图片验证码',
          },
          {
            pattern: REG_PIC_CODE,
            message: '请输入正确的图片验证码',
          },
        ],
      },
    ];
  },
  methods: {
    ...mapActions('user', ['login']),
    submit() {
      this.form.validateFields(async (errors, values) => {
        if (errors) return;
        try {
          this.submitting = true;
          await this.login(values);
          this.$router.replace('/');
        } catch (error) {
          console.error(error);
          const { retcode, msg } = error;
          const { phone, password, pictureCode } = values;
          // 密码错误或者验证码失效，重新获取验证码
          if (retcode === 10048 || retcode === 10054) {
            this.$refs.pictureCode.refresh();
          }
          if (retcode === 10000) {
            this.form.setFields({
              phone: {
                value: phone,
                errors: [new Error(msg)],
              },
            });
          } else if (retcode === 10048) {
            this.form.setFields({
              password: {
                value: password,
                errors: [new Error(msg)],
              },
            });
          } else if (retcode === 10053 || retcode === 10054) {
            this.form.setFields({
              pictureCode: {
                value: pictureCode,
                errors: [new Error(msg)],
              },
            });
          } else if (retcode === 20001) {
            this.$warning({
              title: '提示',
              content: msg,
            });
          }
        } finally {
          this.submitting = false;
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import 'styles/color';
@import 'styles/mixin';

.login {
  height: 100%;

  &-header {
    .border-side(bottom);

    overflow: hidden;
    font-size: 20px;
    font-weight: 700;
    color: @main;
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
    background-color: #fff;
  }

  &-content {
    width: 354px;
    margin: 150px auto;

    &-logo {
      margin-bottom: 40px;
      text-align: center;

      & > img {
        height: 60px;
      }
    }
  }
}
</style>
