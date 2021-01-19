<template>
  <a-modal
    :closable="false"
    :visible="visible"
    :maskClosable="false"
    :afterClose="afterClose"
    :confirmLoading="submitting"
    @cancel="close"
    @ok="submit"
  >
    <h4 class="title">
      <a-icon theme="filled" style="color: #1890ff" type="info-circle" />
      审核不通过
    </h4>
    <a-form :form="form">
      <a-form-item>
        <a-textarea
          :maxLength="300"
          v-decorator="auditRemark"
          placeholder="请输入审核不通过原因"
          :autoSize="{ minRows: 5, maxRows: 5 }"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import formModal from 'mixins/formModal';
import { audit } from 'api/operationApply';

export default {
  name: 'AuditModal',
  mixins: [formModal],
  props: {
    options: {
      type: Object,
      required: true,
    },
  },
  methods: {
    submit() {
      this.form.validateFields(async (errors, values) => {
        if (errors) return;
        try {
          this.submitting = true;
          const { userId, companyId } = this.options;
          await audit({
            userId,
            companyId,
            ...values,
            applyStatus: 3,
          });
          this.$message.success('操作成功');
          this.$emit('success');
          this.close();
        } catch (error) {
          console.error(error);
        } finally {
          this.submitting = false;
        }
      });
    },
  },
  beforeCreate() {
    this.auditRemark = [
      'auditRemark',
      {
        validateTrigger: 'blur',
        rules: [
          {
            required: true,
            whitespace: true,
            message: '请输入审核不通过原因',
          },
        ],
      },
    ];
  },
};
</script>

<style lang="less" scoped>
.title {
  font-weight: 500;
  font-size: 16px;
  line-height: 1.4;
  .anticon {
    float: left;
    margin-right: 16px;
    font-size: 22px;
  }
}
/deep/ .ant-form {
  margin: 24px 0 0 38px;
}
/deep/ .ant-modal-footer {
  border-top: 0;
}
</style>
