<template>
  <a-form class="search-form" :form="searchForm">
    <a-row :gutter="24">
      <a-col :xs="6" :xl="4">
        <a-form-item label="状态">
          <a-select
            v-decorator="['userStatus']"
            allow-clear
            placeholder="请选择"
          >
            <a-select-option value="1">
              待审核
            </a-select-option>
            <a-select-option value="2">
              正常
            </a-select-option>
            <a-select-option value="3">
              已停用
            </a-select-option>
            <a-select-option value="4">
              审核不通过
            </a-select-option>
            <a-select-option value="5">
              已失效
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :xs="10" :xl="6">
        <a-form-item label="注册时间">
          <a-range-picker v-decorator="['date']" style="width: 100%;" />
        </a-form-item>
      </a-col>
      <a-col :xs="6" :xl="5">
        <a-form-item>
          <SearchButton @search="search" @reset="reset" />
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
      const { endTime, starTime, userStatus, companyName } = this.$route.query;
      this.searchForm.setFieldsValue({
        userStatus,
        companyName,
        date: this.formatDateToMoment({ endTime, starTime }),
      });
    },
  },
};
</script>
