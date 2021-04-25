# SearchButton

> 查询表单的查询、重置按钮，可选的展开、收起功能。

## 参数

| 参数 | 说明 |
| --- | --- |
| toggle | 属性中只要设置了 toggle 就会显示展开、收起功能，结合 :toggle.sync="toggle" 可以获取当前展开状态 |

## 事件

| 事件名称 | 说明                     |
| -------- | ------------------------ |
| search   | 点击查询按钮时触发的事件 |
| reset    | 点击重置按钮时触发的事件 |

## Demo

```html
<SearchButton :toggle.sync="toggle" @search="search" @reset="reset" />
```
