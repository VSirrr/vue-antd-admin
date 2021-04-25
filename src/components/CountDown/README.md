# CountDown

## 参数

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 设置按钮类型，可选值为 primary dashed danger link 或者不设 | string | default |
| size | 设置按钮大小，可选值为 small large 或者不设 | string | default |
| seconds | 倒计时多少秒 | number \| string | 60 |
| disabled | 按钮失效状态 | boolean | false |
| limited | 获取短信是否达到最大次数 | boolean | false |

## 事件

| 事件名称 | 说明             | 回调参数      |
| -------- | ---------------- | ------------- |
| click    | 点击按钮时的回调 | (run) => void |

## Demo

```html
<CountDown size="large" seconds="180" type="default" @click="sendMessage" />
```

```js
// 回调函数会回传一个 run 方法，调用 run 方法，开始读秒倒计时
sendMessage(run) {
  // 1. 调用发送短信的接口
  // some code
  // 2. 手动调用回调函数
  run();
}
```
