<template>
  <a-form class="form" :form="form">
    <a-row :gutter="12">
      <a-col span="4">
        <a-form-item label="姓名">
          <a-input
            allow-clear
            placeholder="支持模糊查询"
            v-decorator="['userName']"
          />
        </a-form-item>
      </a-col>
      <a-col span="5">
        <a-form-item label="手机号码">
          <PhoneInput
            size="default"
            v-decorator="['phone']"
            placeholder="支持模糊查询"
          />
        </a-form-item>
      </a-col>
      <a-col span="4">
        <a-form-item label="状态">
          <a-select
            allow-clear
            placeholder="请选择"
            v-decorator="['userStatus']"
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
          <a-range-picker
            show-time
            style="width: 100%;"
            v-decorator="['date']"
            format="YYYY-MM-DD HH:mm:ss"
          />
        </a-form-item>
      </a-col>
      <a-col span="5">
        <a-form-item>
          <a-button style="margin-right: 12px;" @click="search">
            查询
          </a-button>
          <a-button @click="reset">重置</a-button>
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
import moment from 'moment';
import PhoneInput from 'components/PhoneInput';

export default {
  name: 'SearchForm',
  components: {
    PhoneInput,
  },
  methods: {
    search() {
      const { date, phone, userName, userStatus } = this.form.getFieldsValue();
      if (!userStatus && !userName && !date && !phone) return;
      const dateTime = {};
      if (date) {
        dateTime.endTime = date[1].format('YYYY-MM-DD HH:mm:ss');
        dateTime.starTime = date[0].format('YYYY-MM-DD HH:mm:ss');
      }
      this.$router.replace({
        path: this.$route.path,
        query: {
          phone,
          userName,
          pageNo: 1,
          userStatus,
          ...dateTime,
          pageSize: 10,
        },
      });
    },
    reset() {
      this.form.resetFields();
      this.$router.replace(this.$route.path);
    },
    setFormInitialValues() {
      const {
        phone,
        endTime,
        starTime,
        userName,
        userStatus,
      } = this.$route.query;
      this.form.setFieldsValue({
        phone,
        userName,
        userStatus,
        date: starTime && endTime ? [moment(starTime), moment(endTime)] : null,
      });
    },
  },
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  mounted() {
    this.setFormInitialValues();
  },
};
</script>

<style lang="less" scoped>
.form {
  margin-bottom: @padding-sm;
  /deep/ .ant-form-item {
    display: flex;
    &-control-wrapper {
      flex: 1;
    }
  }
}
</style>
