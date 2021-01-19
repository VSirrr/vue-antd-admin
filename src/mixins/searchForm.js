import moment from 'moment';
import SearchButton from 'components/SearchButton';

function noop() {}

export default {
  name: 'SearchForm',
  data() {
    return {
      // 展开/收起
      toggle: false,
    };
  },
  components: {
    SearchButton,
  },
  methods: {
    // 搜索
    search() {
      const values = this.searchForm.getFieldsValue();
      // 判断是否至少存在一个搜索条件
      const hasValue = Object.values(values).some(
        item => item !== undefined && item !== null && item !== '',
      );
      if (!hasValue) return;
      const { date, queryNumber = {} } = values;
      delete values.date;
      delete values.queryNumber;
      this.$router.replace({
        path: this.$route.path,
        query: {
          pageNo: 1,
          pageSize: 10,
          ...values,
          ...queryNumber,
          ...this.formatDateFromMoment(date),
        },
      });
    },
    // 重置
    reset() {
      this.searchForm.resetFields();
      this.$router.replace(this.$route.path);
    },
    // 根据地址栏参数设置表单值
    setFormInitialValues: noop,
    // 格式化时间-将 moment 对象转成时间字符串
    formatDateFromMoment(date) {
      if (!date) {
        return {};
      }
      return {
        endTime: date[1].format('YYYY-MM-DD 23:59:59'),
        starTime: date[0].format('YYYY-MM-DD 00:00:00'),
      };
    },
    // 格式化时间-将时间字符串转成 moment 对象
    formatDateToMoment({ starTime, endTime }) {
      if (!starTime || !endTime) {
        return null;
      }
      return [moment(starTime), moment(endTime)];
    },
  },
  beforeCreate() {
    this.searchForm = this.$form.createForm(this);
  },
  mounted() {
    this.setFormInitialValues();
  },
};
