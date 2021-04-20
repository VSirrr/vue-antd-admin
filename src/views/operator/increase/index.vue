<template>
  <a-card :bordered="false">
    <a-form
      :form="form"
      class="layout-form"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 19 }"
    >
      <a-form-item :wrapper-col="{ sm: { span: 19, offset: 5 } }">
        <h4 class="layout-form-title">操作员信息录入</h4>
      </a-form-item>
      <a-form-item required label="姓名">
        <a-input
          v-decorator="userName"
          allow-clear
          :max-length="50"
          autocomplete="off"
          style="width: 380px;"
          placeholder="请输入姓名"
        />
      </a-form-item>
      <a-form-item required label="手机号">
        <PhoneInput v-decorator="phone" style="width: 380px;" />
        <span class="tip">（默认手机号为登录账号）</span>
      </a-form-item>
      <a-form-item required label="密码">
        <a-input
          v-decorator="password"
          allow-clear
          type="password"
          :max-length="30"
          autocomplete="off"
          style="width: 380px;"
          placeholder="6~30位数字、字母、符号的组合"
        />
      </a-form-item>
      <a-form-item required label="角色">
        <a-select
          v-decorator="userType"
          allow-clear
          placeholder="请选择"
          style="width: 380px;"
        >
          <a-select-option :value="2">
            操作员
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item :wrapper-col="{ sm: { span: 19, offset: 5 } }">
        <a-button type="primary" @click="submit">
          提交
        </a-button>
        <a-button style="margin-left: 24px;" @click="back">
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
  beforeCreate() {
    this.form = this.$form.createForm(this);
    this.userName = [
      'userName',
      {
        validateTrigger: 'blur',
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
        validateTrigger: 'blur',
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
    this.userType = [
      'userType',
      {
        initialValue: 2,
      },
    ];
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
          this.$router.push('/operator');
        } catch (error) {
          console.error(error);
          const { retcode, msg } = error;
          if (retcode === 10001) {
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
};
</script>

<style lang="less" scoped>
@import 'styles/color';

.tip {
  color: @light-gray;
}
</style>
