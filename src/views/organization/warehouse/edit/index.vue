<template>
  <a-card :bordered="false">
    <a-spin :spinning="loading">
      <a-form
        :form="form"
        class="layout-form"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 18 }"
      >
        <a-form-item label="仓库编号">
          {{ warehouse.warehouseNumber }}
          <input hidden v-decorator="warehouseId" />
        </a-form-item>
        <a-form-item label="所属仓单出具人">
          {{ warehouse.provideName }} --
          {{ warehouse.platformName }}
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
          <PhoneInput
            v-decorator="linkPhone"
            placeholder="请输入联系人手机号"
          />
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
    </a-spin>
  </a-card>
</template>

<script>
import warehouseForm from 'mixins/warehouseForm';
import { editWarehouse, toEditWarehouse } from 'api/warehouse';

export default {
  name: 'WarehouseEdit',
  mixins: [warehouseForm],
  props: ['id'],
  data() {
    return {
      warehouse: {},
      loading: false,
    };
  },
  methods: {
    // 获取仓库详情数据
    async getData() {
      try {
        this.loading = true;
        const {
          id,
          address,
          content,
          linkMan,
          fileList,
          linkPhone,
          provideName,
          platformName,
          warehouseCode,
          warehouseName,
          warehouseNumber,
        } = await toEditWarehouse({ id: this.id });
        this.form.setFieldsValue({
          id,
          address,
          content,
          linkMan,
          fileList,
          linkPhone,
          warehouseCode,
          warehouseName,
        });
        this.warehouse = {
          provideName,
          platformName,
          warehouseNumber,
        };
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    // 提交
    submit() {
      this.formSubmit(editWarehouse);
    },
  },
  mounted() {
    this.getData();
  },
};
</script>
