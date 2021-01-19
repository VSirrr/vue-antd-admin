<template>
  <a-card :bordered="false">
    <a-form
      :form="form"
      class="layout-form"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 18 }"
    >
      <a-form-item label="所属仓单出具人">
        <input hidden v-decorator="provideId" />
        <a-button
          ghost
          type="primary"
          @click="selectProviderModalVisible = true"
        >
          请选择
        </a-button>
        <br />
        <template v-if="selectedProvider">
          {{ selectedProvider.provideName }} --
          {{ selectedProvider.platformName }}
        </template>
      </a-form-item>
      <a-form-item label="仓库名称">
        <a-input
          allow-clear
          :maxLength="100"
          placeholder="请输入仓库名称"
          v-decorator="warehouseName"
        />
      </a-form-item>
      <a-form-item label="仓单运营平台仓库编码">
        <a-input
          allow-clear
          :maxLength="50"
          v-decorator="warehouseCode"
          placeholder="请输入仓单运营平台仓库编码"
        />
      </a-form-item>
      <a-form-item label="仓库地址">
        <a-input
          allow-clear
          :maxLength="300"
          v-decorator="address"
          placeholder="请输入仓库地址"
        />
      </a-form-item>
      <a-form-item label="联系人">
        <a-input
          allow-clear
          :maxLength="50"
          v-decorator="linkMan"
          placeholder="请输入管理人联系人姓名"
        />
      </a-form-item>
      <a-form-item label="联系方式">
        <PhoneInput v-decorator="linkPhone" placeholder="请输入联系人手机号" />
      </a-form-item>
      <a-form-item label="仓库基本情况描述">
        <a-textarea
          allow-clear
          :maxLength="500"
          v-decorator="content"
          :autoSize="{ minRows: 3, maxRows: 5 }"
          placeholder="包括仓库面积、几层、什么类型仓库、存放什么品类货物等"
        />
      </a-form-item>
      <a-form-item
        label="附件"
        extra="（可以上传多个附件，附件上传格式为jpg、png、pdf、rar、zip，单个附件大小不能超过5M）"
      >
        <Upload
          :limitSize="5"
          v-decorator="fileList"
          :data="{ relateType: 3 }"
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
    <SelectProviderModal
      v-model="selectProviderModalVisible"
      @selected="selectProvider"
    />
  </a-card>
</template>

<script>
import { addWarehouse } from 'api/warehouse';
import warehouseForm from 'mixins/warehouseForm';

export default {
  name: 'WarehouseIncrease',
  mixins: [warehouseForm],
  components: {
    SelectProviderModal: () => import('./components/SelectProviderModal'),
  },
  data() {
    return {
      selectedProvider: null,
      selectProviderModalVisible: false,
    };
  },
  methods: {
    // 提交
    submit() {
      this.formSubmit(addWarehouse);
    },
    // 处理选择出具人的结果
    selectProvider({ id: provideId, provideName, platformName }) {
      this.form.setFieldsValue({
        provideId,
      });
      this.selectedProvider = { provideName, platformName };
    },
  },
};
</script>
