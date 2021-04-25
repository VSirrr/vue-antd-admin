# RouteTable

> 基于 a-table 组件进行的二次封装，对 pagination 进行了配置，主要功能是表格的 change 事件会通过路由将参数添加到地址栏上，刷新页面不会丢失参数数据。

## 参数

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| row-key | 表格行 key 的取值，可以是字符串或一个函数 | string \| Function(record):string | id |
| total-size | 总条数 | number | 0 |
| total-page | 总页数 | number | 0 |
| table-layout | 表格元素的 table-layout 属性，设为 fixed 表示内容不会影响列的布局 | - \| auto \| fixed | fixed |

## 事件

| 事件名称 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 分页、排序、筛选变化时触发 | Function(pagination, filters, sorter, { currentDataSource }) |

## Demo

```html
<RouteTable
  :loading="loading"
  :columns="columns"
  :total-size="totalSize"
  :total-page="totalPage"
  :data-source="tableData"
  :row-class-name="rowClassName"
  @change="getData"
/>
```
