<template>
  <a-modal
    :visible="visible"
    title="标注信息录入"
    :afterClose="afterClose"
    :confirmLoading="submitting"
    @cancel="close"
    @ok="submit"
  >
    <a-form :form="form" v-bind="relate.layout">
      <a-form-item :label="relate.label">
        {{ options.name }}
      </a-form-item>
      <a-form-item label="标注内容">
        <a-textarea
          :maxLength="300"
          v-decorator="markContent"
          placeholder="请输入标注内容"
          :autoSize="{ minRows: 3, maxRows: 5 }"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import { addMark } from 'api/mark';
import formModal from 'mixins/formModal';

export default {
  name: 'AddMarkModal',
  mixins: [formModal],
  props: {
    options: {
      type: Object,
      required: true,
    },
  },
  computed: {
    relate() {
      let label = '';
      let layout = null;
      const { relateType } = this.options;

      if (relateType === 1) {
        label = '仓单运营平台名称';
        layout = {
          labelCol: { span: 7 },
          wrapperCol: { span: 17 },
        };
      } else if (relateType === 2) {
        label = '仓单出具人名称';
        layout = {
          labelCol: { span: 6 },
          wrapperCol: { span: 18 },
        };
      } else if (relateType === 3) {
        label = '仓库名称';
        layout = {
          labelCol: { span: 4 },
          wrapperCol: { span: 20 },
        };
      }

      return {
        label,
        layout,
      };
    },
  },
  methods: {
    submit() {
      this.form.validateFields(async (errors, { content }) => {
        if (errors) return;
        try {
          this.submitting = true;
          const { relateId, relateType } = this.options;
          await addMark({
            content,
            relateId,
            relateType,
          });
          this.$message.success('操作成功');
          this.$emit('marked');
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
    this.markContent = [
      'content',
      {
        validateTrigger: 'blur',
        rules: [
          {
            required: true,
            whitespace: true,
            message: '请输入标注内容',
          },
        ],
      },
    ];
  },
};
</script>

<style lang="less" scoped>
/deep/ .ant-form-item {
  color: @text-color-secondary;
}
</style>
