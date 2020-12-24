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
  computed: {
    _pagination() {
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
      this.$emit('change', { pageNo, pageSize, field, order });
    },
  },
};
</script>

<style lang="less" scoped>
@import './style';
</style>
