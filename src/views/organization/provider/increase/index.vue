<template>
  <a-card :bordered="false">
    <a-form
      :form="form"
      class="layout-form"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 18 }"
    >
      <a-form-item label="合作仓单运营平台">
        <input hidden v-decorator="platformIds" />
        <a-button
          ghost
          type="primary"
          @click="selectPlatformModalVisible = true"
        >
          请选择
        </a-button>
        <br />
        <p v-if="selectedPlatform" style="line-height: 20px; margin: 12px 0 0;">
          {{ selectedPlatform }}
        </p>
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
        <PhoneInput v-decorator="linkPhone" placeholder="请输入联系人手机号" />
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
    <!-- 选择仓单运营平台弹框 -->
    <SelectPlatformModal
      v-model="selectPlatformModalVisible"
      @selected="selectPlatform"
    />
  </a-card>
</template>

<script>
import { addProvide } from 'api/provider';
import providerForm from 'mixins/providerForm';

export default {
  name: 'ProviderIncrease',
  mixins: [providerForm],
  components: {
    SelectPlatformModal: () => import('./components/SelectPlatformModal'),
  },
  data() {
    return {
      selectedPlatform: '',
      selectPlatformModalVisible: false,
    };
  },
  methods: {
    // 提交
    submit() {
      this.formSubmit(addProvide);
    },
    // 处理选择的结果
    selectPlatform(list) {
      const ids = [];
      const names = [];
      list.forEach(item => {
        ids.push(item.id);
        names.push(item.platformName);
      });
      this.form.setFieldsValue({
        platformIds: ids.join(','),
      });
      this.selectedPlatform = names.join('、');
    },
  },
};
</script>
