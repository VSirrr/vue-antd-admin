# Amount

## 参数

| 参数 | 说明 | 类型 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| value | 数值 | number | 0 | - |
| precision | 数字精度 | number | 2 | 小数点后保留几位 |
| is-round-up | 数字精度取舍是否四舍五入 | boolean | true | - |
| has-separator | 数字是否有千位分隔符 | boolean | true | - |
| separator | 数字千位分隔符 | string | , | - |
| is-capital | 数字是否转换为大写中文 | boolean | false | - |

## Demo

```html
<Amount :value="10000" :precision="2" is-round-up has-separator></Amount> //
10,000
```
