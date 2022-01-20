<script>
import table from './mixin';
export { sortColumn } from './mixin';

export default {
  name: 'Table',
  mixins: [table],
  props: {
    pageNo: {
      type: Number,
      default: 1,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
  },
  data() {
    return {
      field: undefined,
      order: undefined,
    };
  },
  computed: {
    $_pagination() {
      const { pageNo: current, pageSize, totalSize, totalPage } = this;

      return {
        // 当前页数
        current,
        // 每页条数
        pageSize,
        // 只有一页时是否隐藏分页器
        hideOnSinglePage: true,
        // 展示比较少的翻页按钮
        showLessItems: true,
        // 数据总数
        total: totalSize,
        // 用于显示数据总量和当前数据顺序
        showTotal: total =>
          `共 ${total} 条记录 第 ${current} / ${totalPage} 页`,
      };
    },
  },
  methods: {
    change(pagination, filters, sorter) {
      const { current: pageNo, pageSize } = pagination;
      const { field, order } = sorter;
      // 当排序的字段或者顺序发生变化，跳到第一页
      let reset = false;
      if (this.field !== field || this.order !== order) {
        reset = true;
      }
      this.order = order;
      this.field = field;

      this.$emit('change', {
        pageSize: reset ? 10 : pageSize,
        pageNo: reset ? 1 : pageNo,
        field: order && field,
        order,
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import './style';
</style>
