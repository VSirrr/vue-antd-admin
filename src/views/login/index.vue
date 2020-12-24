<template>
  <div class="login">
    <a-layout-header class="login-header">
      中仓登仓单信息登记服务平台-管理端
    </a-layout-header>
    <div class="login-content">
      <div class="login-content-logo">
        <img src="@/assets/img/logo.png" alt="logo" />
      </div>
      <a-form :form="form">
        <a-form-item>
          <PhoneInput hasIcon v-decorator="phone" />
        </a-form-item>
        <a-form-item>
          <a-input-password
            size="large"
            allow-clear
            autocomplete="off"
            v-decorator="password"
            placeholder="请输入密码"
          >
            <a-icon slot="prefix" type="lock" />
          </a-input-password>
        </a-form-item>
        <a-form-item>
          <PictureCodeInput v-decorator="pictureCode" />
        </a-form-item>
        <a-form-item>
          <a-button block size="large" :loading="submitting" @click="submit">
            登 录
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import PhoneInput from 'components/PhoneInput';
import PictureCodeInput from 'components/PictureCodeInput';
import { REG_PASSWORD, REG_PIC_CODE, REG_PHONE } from 'utils/reg';

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
          if (retcode === 30001) {
            this.form.setFields({
              phone: {
                value: phone,
                errors: [new Error(msg)],
              },
            });
          } else if (retcode === 30002) {
            this.form.setFields({
              password: {
                value: password,
                errors: [new Error(msg)],
              },
            });
          } else if (retcode === 30003) {
            this.form.setFields({
              pictureCode: {
                value: pictureCode,
                errors: [new Error(msg)],
              },
            });
          }
        } finally {
          this.submitting = false;
        }
      });
    },
  },
  beforeCreate() {
    this.form = this.$form.createForm(this);
    this.phone = [
      'phone',
      {
        validateTrigger: '',
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
        validateTrigger: '',
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
        validateTrigger: '',
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
};
</script>

<style lang="less" scoped>
@import 'styles/variable';
@import 'styles/mixin';
.login {
  height: 100%;
  &-header {
    .border-side(bottom);
    font-size: 20px;
    font-weight: 700;
    color: @main-color;
    background-color: #fff;
    text-align: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  &-content {
    margin: 150px auto;
    width: 354px;
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
