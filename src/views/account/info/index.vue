<template>
  <a-card :bordered="false">
    <a-form
      class="form"
      :form="form"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 18 }"
    >
      <a-form-item :wrapper-col="{ span: 18, offset: 6 }">
        <h4 class="form-title">操作员信息</h4>
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
import { mapGetters, mapMutations } from 'vuex';
import PhoneInput from 'components/PhoneInput';
import { modifyOperatorPhone } from 'api/operator';

export default {
  name: 'AccountInfo',
  components: {
    PhoneInput,
  },
  computed: {
    ...mapGetters(['userId', 'userPhone', 'userName', 'userType']),
  },
  methods: {
    ...mapMutations('user', ['clearUserInfo']),
    validateForm() {
      this.form.validateFields((errors, values) => {
        if (errors) return;
        this.$confirm({
          title: '提示',
          icon: () => (
            <a-icon theme="filled" style="color: #1890ff" type="info-circle" />
          ),
          content:
            '修改后的新手机号将会作为登录账号，密码不会发生改变，点击确定即将进行修改并退出登录，继续吗？',
          onOk: async () => {
            await this.submit(values);
          },
        });
      });
    },
    async submit({ phone }) {
      try {
        await modifyOperatorPhone({
          newPhone: phone,
          userId: this.userId,
        });
        this.$message.success('操作成功');
        this.clearUserInfo();
      } catch (error) {
        console.error(error);
        const { retcode, msg } = error;
        if (retcode === 30000) {
          this.form.setFields({
            phone: {
              value: phone,
              errors: [new Error(msg)],
            },
          });
        }
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
@import 'styles/form';
@import 'styles/variable';

.tips {
  color: @gray-color;
}
</style>
