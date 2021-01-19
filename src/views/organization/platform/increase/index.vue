<template>
  <a-card :bordered="false">
    <a-form
      :form="form"
      class="layout-form"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 18 }"
    >
      <a-form-item label="仓单运营平台名称">
        <a-input
          allow-clear
          :maxLength="100"
          v-decorator="platformName"
          placeholder="请输入仓单运营平台名称"
        />
      </a-form-item>
      <a-form-item label="管理人（平台法人主体）">
        <a-input
          allow-clear
          :maxLength="100"
          v-decorator="companyName"
          placeholder="请输入管理人企业名称"
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
        <PhoneInput v-decorator="linkPhone" placeholder="请输入联系人手机号" />
      </a-form-item>
      <a-form-item
        label="附件"
        extra="（可以上传多个附件，附件上传格式为jpg、png、pdf、rar、zip，单个附件大小不能超过5M）"
      >
        <Upload
          :limitSize="5"
          v-decorator="fileList"
          :data="{ relateType: 1 }"
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
  </a-card>
</template>

<script>
import { addPlatform } from 'api/platform';
import platformForm from 'mixins/platformForm';

export default {
  name: 'PlatformIncrease',
  mixins: [platformForm],
  methods: {
    // 提交
    submit() {
      this.formSubmit(addPlatform);
    },
  },
};
</script>
