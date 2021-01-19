<template>
  <a-form class="search-form" :form="searchForm">
    <a-row :gutter="12">
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
      <a-col span="3">
        <a-form-item label="状态">
          <a-select allow-clear placeholder="请选择" v-decorator="['status']">
            <a-select-option value="1">
              正常
            </a-select-option>
            <a-select-option value="2">
              已失效
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col span="5">
        <a-form-item>
          <SearchButton :toggle.sync="toggle" @search="search" @reset="reset" />
        </a-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="12" v-show="toggle">
      <a-col span="7">
        <a-form-item label="仓库创建时间">
          <a-range-picker style="width: 100%;" v-decorator="['date']" />
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
        status,
        endTime,
        starTime,
        provideName,
        platformName,
        warehouseName,
      } = this.$route.query;

      this.searchForm.setFieldsValue({
        status,
        provideName,
        platformName,
        warehouseName,
        date: this.formatDateToMoment({ endTime, starTime }),
      });
    },
  },
};
</script>
