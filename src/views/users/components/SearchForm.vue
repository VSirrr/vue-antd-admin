<template>
  <a-form class="search-form" :form="searchForm">
    <a-row :gutter="12">
      <!-- <a-col span="4">
        <a-form-item label="机构名称">
          <a-input
            allow-clear
            :maxLength="100"
            placeholder="支持模糊查询"
            v-decorator="['companyName']"
          />
        </a-form-item>
      </a-col>
      <a-col span="7">
        <a-form-item label="查询次数">
          <QueryInput
            v-decorator="[
              'queryNumber',
              {
                initialValue: queryNumber,
              },
            ]"
          />
        </a-form-item>
      </a-col> -->
      <a-col span="4">
        <a-form-item label="状态">
          <a-select
            allow-clear
            placeholder="请选择"
            v-decorator="['userStatus']"
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
      <a-col span="8">
        <a-form-item label="注册时间">
          <a-range-picker style="width: 100%;" v-decorator="['date']" />
        </a-form-item>
      </a-col>
      <a-col span="4">
        <a-form-item>
          <SearchButton @search="search" @reset="reset" />
        </a-form-item>
      </a-col>
    </a-row>
  </a-form>
</template>

<script>
// import QueryInput from './QueryInput';
import searchForm from 'mixins/searchForm';

export default {
  name: 'SearchForm',
  mixins: [searchForm],
  // components: {
  //   QueryInput,
  // },
  // computed: {
  //   queryNumber() {
  //     const { queryNumberMin = '', queryNumberMax = '' } = this.$route.query;
  //     return {
  //       queryNumberMin,
  //       queryNumberMax,
  //     };
  //   },
  // },
  methods: {
    setFormInitialValues() {
      const {
        endTime,
        starTime,
        userStatus,
        companyName,
        // queryNumberMin,
        // queryNumberMax,
      } = this.$route.query;

      this.searchForm.setFieldsValue({
        userStatus,
        companyName,
        // queryNumber: {
        //   queryNumberMin,
        //   queryNumberMax,
        // },
        date: this.formatDateToMoment({ endTime, starTime }),
      });
    },
  },
};
</script>
