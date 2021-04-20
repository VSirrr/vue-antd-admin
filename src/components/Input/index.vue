<script>
import Input from 'ant-design-vue/es/input/Input';
import {
  reformatValue,
  formatInputMoney,
  formatInputOnlyNumber,
  formatInputBankNumber,
  formatInputPhoneNumber,
} from './formatValue';

export default {
  name: 'Input',
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    ...Input.props,
    value: {
      type: [String, Number],
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
    autocomplete: {
      type: String,
      default: 'off',
    },
  },
  data() {
    return {
      // 输入框的值
      inputValue: '',
    };
  },
  computed: {
    // 输入框的格式
    inputType() {
      if (this.type === 'password') {
        return 'password';
      }
      return 'text';
    },
    // 反格式化的值
    reformatValue() {
      // 对金额、银行卡号、手机号进行反格式化
      if (
        this.type === 'bankCard' ||
        this.type === 'money' ||
        this.type === 'phone'
      ) {
        return reformatValue(this.inputValue);
      }
      return this.inputValue;
    },
  },
  created() {
    this.inputValue = this.formatValue(this.value);
  },
  methods: {
    /**
     * @description 对输入框输入的值进行格式化
     * @param {string} val 需要格式化的值
     * @return {string} 返回格式化之后的值
     */
    formatValue(val) {
      /**
       * 1. 数字
       * 2. 金额
       * 3. 银行卡号
       * 4. 手机号
       * 5. 其他
       */
      switch (this.type) {
        case 'digit':
          return formatInputOnlyNumber(val);
        case 'money':
          return formatInputMoney(val);
        case 'bankCard':
          return formatInputBankNumber(val);
        case 'phone':
          return formatInputPhoneNumber(val);
        default:
          return val;
      }
    },
    /**
     * @description 输入框发生变化，格式化输入的值，并 emit change 事件
     * @param {object} e 事件对象
     * @return {undefined} 无返回值
     */
    change(e) {
      // 格式化金额并赋值给 inputValue
      this.inputValue = e.target.value = this.formatValue(e.target.value);
      // 反格式化金额，并传给父组件
      this.emit('change');
    },
    /**
     * @description 输入框获取焦点后 emit focus 事件
     * @return {undefined} 无返回值
     */
    focus() {
      this.emit('focus');
    },
    /**
     * @description 输入框失去焦点后 emit blur 事件
     * @return {undefined} 无返回值
     */
    blur() {
      this.emit('blur');
    },
    /**
     * @description emit 事件并传值
     * @param {string} eventType 事件类型
     * @return {undefined} 无返回值
     */
    emit(eventType) {
      this.$emit(eventType, this.reformatValue);
    },
  },
  render() {
    const props = {};
    const {
      blur,
      focus,
      $slots,
      $attrs,
      change,
      inputType,
      inputValue,
      $scopedSlots,
    } = this;
    // 合并属性
    Object.keys(Input.props).forEach(k => {
      if (this[k]) {
        props[k] = this[k];
      }
    });
    // 合并自定义属性
    Object.assign(props, {
      ...$attrs,
      type: inputType,
      value: inputValue,
    });

    return (
      <a-input
        props={props}
        scopedSlots={$scopedSlots}
        onChange={change}
        onFocus={focus}
        onBlur={blur}
      >
        {Object.keys($slots).map(name => (
          <template slot={name}>{$slots[name]}</template>
        ))}
      </a-input>
    );
  },
};
</script>
