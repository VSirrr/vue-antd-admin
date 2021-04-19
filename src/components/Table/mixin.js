import T from 'ant-design-vue/es/table/Table';

export default {
  props: {
    ...T.props,
    rowKey: {
      type: [String, Function],
      default: 'id',
    },
    // 总条数
    totalSize: {
      type: Number,
      default: 0,
    },
    // 总页数
    totalPage: {
      type: Number,
      default: 0,
    },
    // 表格布局方式
    tableLayout: {
      type: String,
      default: 'fixed',
    },
  },
  render() {
    const props = {};
    const { $slots, change, $_pagination, $scopedSlots } = this;
    // 处理 props
    Object.keys(T.props).forEach(k => {
      if (this[k]) {
        props[k] = this[k];
      }
    });
    // 自定义 pagination
    props.pagination = $_pagination;

    return (
      <a-table props={props} scopedSlots={$scopedSlots} onChange={change}>
        {Object.keys($slots).map(name => (
          <template slot={name}>{$slots[name]}</template>
        ))}
      </a-table>
    );
  },
};

// 对排序字段格式化
export function sortColumn(key, order) {
  if (!order) {
    return undefined;
  }
  return `${key} ${order.replace('end', '').toUpperCase()}`;
}
