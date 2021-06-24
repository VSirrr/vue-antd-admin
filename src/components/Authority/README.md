# Authority

> 根据用户权限判断按钮是否显示

## 参数

| 参数 | 说明 | 类型 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| value | 按钮的唯一标识 | string | '' | 根据页面与按钮功能命名，例如：新增用户按钮，user.increase |

## Demo

```html
<Authority :value="user.increase">
  <a-button type="primary" @click="increase">
    新增
  </a-button>
</Authority>
```
