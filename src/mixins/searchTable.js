function noop() {}

export default {
  data() {
    return {
      totalSize: 0,
      totalPage: 0,
      tableData: [],
      loading: false,
    };
  },
  methods: {
    getData: noop,
  },
  created() {
    this.getData();
  },
};
