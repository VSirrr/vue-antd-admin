<template>
  <a-modal
    :closable="false"
    :visible="visible"
    :mask-closable="false"
    :after-close="afterClose"
    :confirm-loading="submitting"
    @cancel="close"
    @ok="submit"
  >
    <h4 class="title">
      <a-icon theme="filled" style="color: #1890ff;" type="info-circle" />
      审核不通过
    </h4>
    <a-form :form="form">
      <a-form-item>
        <a-textarea
          v-decorator="auditRemark"
          :max-length="300"
          placeholder="请输入审核不通过原因"
          :auto-size="{ minRows: 5, maxRows: 5 }"
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
};
</script>

<style lang="less" scoped>
.title {
  font-size: 16px;
  font-weight: 500;
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
