<template>
  <a-card :bordered="false">
    <a-form
      :form="form"
      class="layout-form"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 14 }"
    >
      <a-form-item :wrapper-col="{ span: 14, offset: 6 }">
        <h4 class="layout-form-title">修改密码</h4>
      </a-form-item>
      <a-form-item required label="原密码">
        <a-input-password placeholder="请输入原密码" v-decorator="oldPwd" />
      </a-form-item>
      <a-form-item required label="新密码">
        <a-input-password
          v-decorator="newPwd"
          placeholder="请输入新密码（6~30位字母、数字或符号）"
        />
      </a-form-item>
      <a-form-item required label="确认密码">
        <a-input-password
          placeholder="再次输入新密码"
          v-decorator="newPwdRepeat"
        />
      </a-form-item>
      <a-form-item :wrapper-col="{ sm: { span: 14, offset: 6 } }">
        <a-button type="primary" style="width: 120px;" @click="validateForm">
          确定修改
        </a-button>
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script>
import md5 from 'md5';
import { REG_PASSWORD } from 'utils/reg';
import { modifyOperatorPwd } from 'api/operator';

export default {
  name: 'AccountPwd',
  methods: {
    validateForm() {
      this.form.validateFields((errors, values) => {
        if (errors) return;
        this.$confirm({
          title: '提示',
          icon: () => (
            <a-icon theme="filled" style="color: #1890ff" type="info-circle" />
          ),
          content: '确定修改密码吗？',
          onOk: async () => {
            await this.submit(values);
          },
        });
      });
    },
    async submit({ oldPwd, newPwd, newPwdRepeat }) {
      try {
        await modifyOperatorPwd({
          userOldPwd: md5(oldPwd),
          userNewPwd: md5(newPwd),
          userNewPwdRepeat: md5(newPwdRepeat),
        });
        this.$message.success('操作成功');
        this.form.resetFields();
      } catch (error) {
        console.error(error);
        const { retcode, msg } = error;
        if (retcode === 10003) {
          this.form.setFields({
            oldPwd: {
              value: oldPwd,
              errors: [new Error(msg)],
            },
          });
        } else if (retcode === 10037) {
          this.form.setFields({
            newPwd: {
              value: newPwd,
              errors: [new Error(msg)],
            },
          });
        }
      }
    },
  },
  beforeCreate() {
    this.form = this.$form.createForm(this);
    this.oldPwd = [
      'oldPwd',
      {
        validateTrigger: 'blur',
        rules: [
          {
            required: true,
            message: '请输入原密码',
          },
          {
            pattern: REG_PASSWORD,
            message: '密码只能是6~30位数字、字母、符号的组合（至少含两种）',
          },
        ],
      },
    ];
    this.newPwd = [
      'newPwd',
      {
        validateTrigger: 'blur',
        rules: [
          {
            required: true,
            message: '请输入新密码',
          },
          {
            pattern: REG_PASSWORD,
            message: '密码只能是6~30位数字、字母、符号的组合（至少含两种）',
          },
        ],
      },
    ];
    this.newPwdRepeat = [
      'newPwdRepeat',
      {
        validateTrigger: 'blur',
        rules: [
          {
            validator: (rule, value, callback) => {
              if (!value) {
                return callback('请再次输入新密码');
              }
              if (value !== this.form.getFieldValue('newPwd')) {
                return callback('两次输入密码不一致');
              }
              callback();
            },
          },
        ],
      },
    ];
  },
};
</script>
