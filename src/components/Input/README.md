# Input

> 基于 a-input 组件，进行的二次封装，主要功能是对输入内容进行格式化,如果不需要对输入内容进行格式化，请使用 a-input 组件。

## 参数

| 参数 | 说明 | 类型 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| value | 输入框内容，配合 v-decorator 使用 | number \| string | - | 可以使用 v-model 进行双向绑定 |
| type | 表单类型，特殊类型自带文本格式化 | string | text | text(文本),bankCard(银行卡号),phone(手机号),money(金额),digit(数字),password(密码), 以及其他的标准 Html Input 类型 |

## 事件

| 事件名称 | 说明                   | 回调参数        |
| -------- | ---------------------- | --------------- |
| change   | 输入框内容变化时的回调 | (value) => void |

## Demo

```html
<DigitInput type="digit" /> //1234567890

<MoneyInput type="money" /> // 10,000.00

<PhoneInput type="phone" /> // 133 4444 5555

<BankCardInput type="bankCard" /> // 6222 1234 5678 9102 7894
```
