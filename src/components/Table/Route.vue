<script>
import table from './mixin';
export { sortColumn } from './mixin';

export default {
  name: 'RouteTable',
  mixins: [table],
  computed: {
    _pagination() {
      const { totalSize, totalPage, $route } = this;
      const { pageNo = 1, pageSize = 10 } = $route.query;
      // 总数量是否大于 100
      const show = totalSize > 100;
      return {
        // 当前页数
        current: +pageNo,
        // 每页条数
        pageSize: +pageSize,
        // 只有一页时是否隐藏分页器
        hideOnSinglePage: true,
        // 展示比较少的翻页按钮
        showLessItems: true,
        // 数据总数
        total: totalSize,
        // 是否可以改变 pageSize
        showSizeChanger: show,
        // 是否可以快速跳转至某页
        showQuickJumper: show,
        // 用于显示数据总量和当前数据顺序
        showTotal: total => `共 ${total} 条记录 第 ${pageNo} / ${totalPage} 页`,
      };
    },
  },
  methods: {
    change(pagination, filters, sorter) {
      const { path, query } = this.$route;
      const { current: pageNo, pageSize } = pagination;
      const { field, order } = sorter;
      // 当排序的字段或者顺序发生变化，跳到第一页
      let reset = false;
      if (query.field !== field || query.order !== order) {
        reset = true;
      }

      this.$router.replace({
        path,
        query: {
          ...query,
          pageSize: reset ? 10 : pageSize,
          pageNo: reset ? 1 : pageNo,
          field: order && field,
          order,
        },
      });
    },
  },
  created() {
    // 监听路由变化
    this.unwatch = this.$watch('$route', () => {
      this.$emit('change');
    });
  },
  beforeDestroy() {
    // 解除监听
    this.unwatch();
  },
};
</script>

<style lang="less" scoped>
@import './style';

/deep/ .ant-table-pagination.ant-pagination {
  float: none;
  text-align: center;
}
</style>
