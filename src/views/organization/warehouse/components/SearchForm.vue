<template>
  <a-form class="search-form" :form="searchForm">
    <a-row :gutter="12">
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
      <a-col span="6">
        <a-form-item label="所属仓单出具人">
          <a-input
            allow-clear
            size="default"
            :maxLength="100"
            v-decorator="['provideName']"
            placeholder="支持模糊查询"
          />
        </a-form-item>
      </a-col>
      <a-col span="4">
        <a-form-item label="状态">
          <a-select
            allow-clear
            placeholder="请选择"
            v-decorator="['warehouseStatus']"
          >
            <a-select-option value="1">
              正常
            </a-select-option>
            <a-select-option value="2">
              已停用
            </a-select-option>
            <a-select-option value="3">
              已注销
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col span="6">
        <a-form-item label="创建时间">
          <a-range-picker style="width: 100%;" v-decorator="['date']" />
        </a-form-item>
      </a-col>
      <a-col span="4">
        <a-form-item>
          <SearchButton @search="search" @reset="reset" />
        </a-form-item>
      </a-col>
    </a-row>
    <div style="text-align: right;">
      <a-button
        type="primary"
        @click="$router.push('/organization/warehouse/increase')"
      >
        新增
      </a-button>
    </div>
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
        warehouseName,
        warehouseStatus,
      } = this.$route.query;

      this.searchForm.setFieldsValue({
        provideName,
        warehouseName,
        warehouseStatus,
        date: this.formatDateToMoment({ endTime, starTime }),
      });
    },
  },
};
</script>
