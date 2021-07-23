# Amount

> 对金额数字进行格式化，包含保留小数点位数、数字精度取舍是否四舍五入、数字是否有千位分隔符、设置数字千位分隔符、数字是否转换为大写中文等功能。

## 参数

| 参数 | 说明 | 类型 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| value | 数值 | number | 0 | - |
| precision | 数字精度 | number | 2 | 小数点后保留几位 |
| is-round-up | 数字精度取舍是否四舍五入 | boolean | true | - |
| has-separator | 数字是否有千位分隔符 | boolean | true | - |
| separator | 数字千位分隔符 | string | , | - |
| is-capital | 数字是否转换为大写中文 | boolean | false | - |
| is-animated | 是否使用动画，类似 countup.js 的效果 | boolean | false | - |
| transition | 是否使用动画，类似 countup.js 的效果 | boolean | false | - |
| duration | 动画的时长 | number | 1000 | ms |

## Demo

```html
<Amount :value="10000" :precision="2" is-round-up has-separator /> // 10,000.00
```
