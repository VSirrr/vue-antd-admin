<template>
  <a-form class="search-form" :form="searchForm">
    <a-row :gutter="12">
      <a-col span="4">
        <a-form-item label="姓名">
          <a-input
            allow-clear
            :maxLength="50"
            placeholder="支持模糊查询"
            v-decorator="['userName']"
          />
        </a-form-item>
      </a-col>
      <a-col span="5">
        <a-form-item label="手机号码">
          <PhoneInput v-decorator="['phone']" placeholder="支持模糊查询" />
        </a-form-item>
      </a-col>
      <a-col span="4">
        <a-form-item label="状态">
          <a-select
            allow-clear
            placeholder="请选择"
            v-decorator="['userStatus']"
          >
            <a-select-option value="2">
              正常
            </a-select-option>
            <a-select-option value="3">
              已停用
            </a-select-option>
            <a-select-option value="5">
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
      <a-col span="5">
        <a-form-item>
          <SearchButton @search="search" @reset="reset" />
        </a-form-item>
      </a-col>
    </a-row>
    <div style="text-align: right;">
      <a-button type="primary" @click="$router.push('/operator/increase')">
        新增
      </a-button>
    </div>
  </a-form>
</template>

<script>
import searchForm from 'mixins/searchForm';
import PhoneInput from 'components/PhoneInput';

export default {
  name: 'SearchForm',
  mixins: [searchForm],
  components: {
    PhoneInput,
  },
  methods: {
    setFormInitialValues() {
      const {
        phone,
        endTime,
        starTime,
        userName,
        userStatus,
      } = this.$route.query;

      this.searchForm.setFieldsValue({
        phone,
        userName,
        userStatus,
        date: this.formatDateToMoment({ endTime, starTime }),
      });
    },
  },
};
</script>
