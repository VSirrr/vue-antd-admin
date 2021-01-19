<template>
  <a-form class="search-form" :form="searchForm">
    <a-row :gutter="24">
      <a-col span="8" offset="3">
        <a-form-item label="报警时间">
          <a-range-picker style="width: 100%;" v-decorator="['date']" />
        </a-form-item>
      </a-col>
      <a-col span="6">
        <a-form-item label="错误类型">
          <a-select
            allow-clear
            placeholder="请选择"
            v-decorator="['warningType']"
          >
            <a-select-option value="1">
              仓单登记失败
            </a-select-option>
            <a-select-option value="3">
              仓单状态变更失败
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col span="5">
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
  mixins: [searchForm],
  methods: {
    setFormInitialValues() {
      const { endTime, starTime, warningType } = this.$route.query;

      this.searchForm.setFieldsValue({
        warningType,
        date: this.formatDateToMoment({ endTime, starTime }),
      });
    },
  },
};
</script>
