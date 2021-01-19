<template>
  <a-card :bordered="false">
    <a-form
      :form="form"
      class="layout-form"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 18 }"
    >
      <a-form-item :wrapper-col="{ span: 18, offset: 6 }">
        <h4 class="layout-form-title">操作员信息</h4>
      </a-form-item>
      <a-form-item label="姓名">
        {{ userName }}
      </a-form-item>
      <a-form-item required label="手机号">
        <PhoneInput style="width: 280px" v-decorator="phone" />
        <span class="tips">（默认手机号为登录账号）</span>
      </a-form-item>
      <a-form-item label="角色">
        {{ userType }}
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 18, offset: 6 }">
        <a-button size="large" type="primary" @click="validateForm">
          保存
        </a-button>
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script>
import { REG_PHONE } from 'utils/reg';
import PhoneInput from 'components/PhoneInput';
import { mapGetters, mapMutations } from 'vuex';
import { validModifyOperatorPhone, modifyOperatorPhone } from 'api/operator';

export default {
  name: 'AccountInfo',
  components: {
    PhoneInput,
  },
  computed: {
    ...mapGetters(['userPhone', 'userName', 'userType']),
  },
  methods: {
    ...mapMutations('user', ['clearUserInfo']),
    // 点击提交按钮，校验手机号
    validateForm() {
      this.form.validateFields(async (errors, { phone }) => {
        if (errors) return;
        try {
          // 校验手机号
          await validModifyOperatorPhone({
            newPhone: phone,
          });
          // 校验手机号通过之后弹出提示框
          this.showTips(phone);
        } catch (error) {
          this.catchError(error, phone);
        }
      });
    },
    // 修改手机号
    async submit(phone) {
      try {
        await modifyOperatorPhone({
          newPhone: phone,
        });
        this.$message.success('操作成功');
        this.clearUserInfo();
      } catch (error) {
        this.catchError(error, phone);
      }
    },
    // 修改手机号提示框
    showTips(phone) {
      this.$confirm({
        title: '提示',
        icon: () => (
          <a-icon theme="filled" style="color: #1890ff" type="info-circle" />
        ),
        content:
          '修改后的新手机号将会作为登录账号，密码不会发生改变，点击确定即将进行修改并退出登录，继续吗？',
        onOk: async () => {
          await this.submit(phone);
        },
      });
    },
    // 处理错误信息
    catchError(error, phone) {
      console.error(error);
      const { retcode, msg } = error;
      if (retcode === 10001 || retcode === 10050) {
        this.form.setFields({
          phone: {
            value: phone,
            errors: [new Error(msg)],
          },
        });
      }
    },
  },
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  created() {
    this.phone = [
      'phone',
      {
        initialValue: this.userPhone,
        validateTrigger: 'blur',
        rules: [
          {
            required: true,
            message: '请输入手机号',
          },
          {
            pattern: REG_PHONE,
            message: '请输入正确的联系人手机号',
          },
        ],
      },
    ];
  },
};
</script>

<style lang="less" scoped>
@import 'styles/variable';

.tips {
  color: @gray-color;
}
</style>
