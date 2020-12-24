<template>
  <a-card :bordered="false">
    <a-form
      class="form"
      :form="form"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 19 }"
    >
      <a-form-item :wrapper-col="{ sm: { span: 19, offset: 5 } }">
        <h4 class="form-title">操作员信息录入</h4>
      </a-form-item>
      <a-form-item required label="姓名">
        <a-input
          allow-clear
          size="large"
          :maxLength="50"
          style="width: 380px;"
          v-decorator="userName"
          placeholder="请输入姓名"
        />
      </a-form-item>
      <a-form-item required label="手机号">
        <PhoneInput style="width: 380px;" v-decorator="phone" />
        <span class="tip">（默认手机号为登录账号）</span>
      </a-form-item>
      <a-form-item required label="密码">
        <a-input
          allow-clear
          size="large"
          type="password"
          :maxLength="30"
          style="width: 380px;"
          v-decorator="password"
          placeholder="6~30位数字或字母"
        />
      </a-form-item>
      <a-form-item required label="角色">
        <a-select
          allow-clear
          size="large"
          placeholder="请选择"
          style="width: 380px;"
          v-decorator="userType"
        >
          <a-select-option :value="2">
            操作员
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item :wrapper-col="{ sm: { span: 19, offset: 5 } }">
        <a-button size="large" type="primary" @click="submit">
          提交
        </a-button>
        <a-button size="large" style="margin-left: 24px;" @click="back">
          取消
        </a-button>
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script>
import md5 from 'md5';
import PhoneInput from 'components/PhoneInput';
import { registerOperator } from 'api/operator';
import { REG_NAME, REG_PHONE, REG_PASSWORD } from 'utils/reg';

export default {
  name: 'OperatorIncrease',
  components: {
    PhoneInput,
  },
  methods: {
    submit() {
      this.form.validateFields(async (errors, values) => {
        if (errors) return;
        try {
          await registerOperator({
            ...values,
            password: md5(values.password),
          });
          this.$message.success('操作成功');
          this.back();
        } catch (error) {
          console.error(error);
          const { retcode, msg } = error;
          if (retcode === 30000) {
            this.form.setFields({
              phone: {
                value: values.phone,
                errors: [new Error(msg)],
              },
            });
          }
        }
      });
    },
    back() {
      this.$router.back();
    },
  },
  beforeCreate() {
    this.form = this.$form.createForm(this);
    this.userName = [
      'userName',
      {
        validateTrigger: '',
        rules: [
          {
            required: true,
            message: '请输入姓名',
          },
          {
            pattern: REG_NAME,
            message: '请输入正确的联系人姓名',
          },
        ],
      },
    ];
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
    this.userType = [
      'userType',
      {
        initialValue: 2,
      },
    ];
  },
};
</script>

<style lang="less" scoped>
@import 'styles/form';
@import 'styles/variable';

.tip {
  color: @gray-color;
}
</style>
