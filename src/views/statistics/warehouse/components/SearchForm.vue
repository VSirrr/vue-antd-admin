<template>
  <a-form class="search-form" :form="searchForm">
    <a-row :gutter="12">
      <a-col span="7">
        <a-form-item label="全国性可流转仓单编号">
          <a-input
            allow-clear
            :maxLength="50"
            placeholder="支持模糊查询"
            v-decorator="['receiptNumber']"
          />
        </a-form-item>
      </a-col>
      <a-col span="6">
        <a-form-item label="运营平台仓单号">
          <a-input
            allow-clear
            :maxLength="50"
            placeholder="支持模糊查询"
            v-decorator="['platformReceiptNumber']"
          />
        </a-form-item>
      </a-col>
      <a-col span="6">
        <a-form-item label="登记时间">
          <a-range-picker style="width: 100%;" v-decorator="['date']" />
        </a-form-item>
      </a-col>
      <a-col span="5">
        <a-form-item>
          <SearchButton :toggle.sync="toggle" @search="search" @reset="reset" />
        </a-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="12" v-show="toggle">
      <a-col span="6">
        <a-form-item label="仓单运营平台">
          <a-input
            allow-clear
            :maxLength="100"
            placeholder="支持模糊查询"
            v-decorator="['platformName']"
          />
        </a-form-item>
      </a-col>
      <a-col span="6">
        <a-form-item label="仓单出具人">
          <a-input
            allow-clear
            :maxLength="100"
            placeholder="支持模糊查询"
            v-decorator="['provideName']"
          />
        </a-form-item>
      </a-col>
      <a-col span="4">
        <a-form-item label="仓库">
          <a-input
            allow-clear
            :maxLength="100"
            placeholder="支持模糊查询"
            v-decorator="['warehouseName']"
          />
        </a-form-item>
      </a-col>
      <a-col span="4">
        <a-form-item label="品类">
          <a-input
            allow-clear
            :maxLength="100"
            placeholder="支持模糊查询"
            v-decorator="['storageCategory']"
          />
        </a-form-item>
      </a-col>
      <a-col span="4">
        <a-form-item label="状态">
          <a-select
            allow-clear
            placeholder="请选择"
            v-decorator="['receiptStatus']"
          >
            <a-select-option value="1">
              正常
            </a-select-option>
            <a-select-option value="2">
              质押审批中
            </a-select-option>
            <a-select-option value="3">
              已质押
            </a-select-option>
            <a-select-option value="4">
              解押审批中
            </a-select-option>
            <a-select-option value="5">
              转让中
            </a-select-option>
            <a-select-option value="6">
              提货中
            </a-select-option>
            <a-select-option value="7">
              注销中
            </a-select-option>
            <a-select-option value="8">
              已注销
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
    </a-row>
  </a-form>
</template>

<script>
import searchForm from 'mixins/searchForm';

export default {
  name: 'SearchForm',
  mixins: [searchForm],
  methods: {
    setFormInitialValues() {
      const {
        endTime,
        starTime,
        provideName,
        platformName,
        receiptNumber,
        receiptStatus,
        warehouseName,
        storageCategory,
        platformReceiptNumber,
      } = this.$route.query;

      this.searchForm.setFieldsValue({
        provideName,
        platformName,
        receiptNumber,
        receiptStatus,
        warehouseName,
        storageCategory,
        platformReceiptNumber,
        date: this.formatDateToMoment({ endTime, starTime }),
      });
    },
  },
};
</script>
