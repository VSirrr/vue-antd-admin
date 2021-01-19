<template>
  <a-card :bordered="false">
    <a-spin :spinning="loading">
      <a-form
        :form="form"
        class="layout-form"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 18 }"
      >
        <a-form-item label="仓单出具人编号">
          {{ provider.provideNumber }}
          <input hidden v-decorator="provideId" />
        </a-form-item>
        <a-form-item label="合作仓单运营平台">
          {{ provider.platformName }}
        </a-form-item>
        <a-form-item label="仓单出具人名称">
          <a-input
            allow-clear
            :maxLength="100"
            placeholder="请输入仓单出具人名称"
            v-decorator="companyName"
          />
        </a-form-item>
        <a-form-item label="统一社会信用代码">
          <a-input
            allow-clear
            :maxLength="18"
            v-decorator="companyOrgCode"
            placeholder="请输入统一社会信用代码"
          />
        </a-form-item>
        <a-form-item label="经营地址">
          <a-input
            allow-clear
            :maxLength="300"
            v-decorator="address"
            placeholder="请输入经营地址"
          />
        </a-form-item>
        <a-form-item label="联系人">
          <a-input
            allow-clear
            :maxLength="50"
            v-decorator="linkMan"
            placeholder="请输入联系人姓名"
          />
        </a-form-item>
        <a-form-item label="联系方式">
          <PhoneInput
            v-decorator="linkPhone"
            placeholder="请输入联系人手机号"
          />
        </a-form-item>
        <a-form-item
          label="附件"
          extra="（可以上传多个附件，附件上传格式为jpg、png、pdf、rar、zip，单个附件大小不能超过5M）"
        >
          <Upload
            :limitSize="5"
            v-decorator="fileList"
            :data="{ relateType: 2 }"
            action="/api/files/upload"
            accept=".jpg,.png,.pdf,.rar,.zip"
          />
        </a-form-item>
        <a-form-item :wrapper-col="{ sm: { span: 14, offset: 6 } }">
          <a-button
            type="primary"
            :loading="submitting"
            style="margin-right: 24px;"
            @click="submit"
          >
            提交
          </a-button>
          <a-button @click="goBack">取消</a-button>
        </a-form-item>
      </a-form>
    </a-spin>
  </a-card>
</template>

<script>
import providerForm from 'mixins/providerForm';
import { editProvide, toEditProvide } from 'api/provider';

export default {
  name: 'ProviderEdit',
  mixins: [providerForm],
  props: ['id'],
  data() {
    return {
      provider: {},
      loading: false,
    };
  },
  methods: {
    // 获取仓库详情数据
    async getData() {
      try {
        this.loading = true;
        const {
          address,
          linkMan,
          fileList,
          linkPhone,
          companyName,
          platformName,
          id: provideId,
          provideNumber,
          companyOrgCode,
        } = await toEditProvide({ provideId: this.id });
        this.form.setFieldsValue({
          address,
          linkMan,
          fileList,
          linkPhone,
          provideId,
          companyName,
          companyOrgCode,
        });
        this.provider = {
          platformName,
          provideNumber,
        };
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    // 提交
    submit() {
      this.formSubmit(editProvide);
    },
  },
  mounted() {
    this.getData();
  },
};
</script>
