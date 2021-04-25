# Table

> 基于 a-table 组件进行的二次封装，对 pagination 进行了配置。

## 参数

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| row-key | 表格行 key 的取值，可以是字符串或一个函数 | string \| Function(record):string | id |
| total-size | 总条数 | number | 0 |
| total-page | 总页数 | number | 0 |
| table-layout | 表格元素的 table-layout 属性，设为 fixed 表示内容不会影响列的布局 | - \| auto \| fixed | fixed |
| page-no | 当前页数 | number | 1 |
| page-size | 一页多少条数据 | number | 10 |

## 事件

| 事件名称 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 分页、排序、筛选变化时触发 | Function(pagination, filters, sorter, { currentDataSource }) |

## Demo

```html
<DemoTable
  size="small"
  :page-no="pageNo"
  :columns="columns"
  :loading="loading"
  :scroll="{ y: 260 }"
  :page-size="pageSize"
  :total-size="totalSize"
  :total-page="totalPage"
  :data-source="tableData"
  @change="change"
/>
```
