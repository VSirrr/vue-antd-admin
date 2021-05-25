<template>
  <div>
    <Input v-model="money" type="money" />
    <Input v-model="phone" type="phone" />
    <Input v-model="digit" type="digit" />
    <Input v-model="bankCard" type="bankCard" />
    <Input v-model="password" type="password" />
  </div>
</template>

<script>
import Input from 'components/Input';

export default {
  name: 'InputDemo',
  components: {
    Input,
  },
  data() {
    return {
      money: 12345678,
      phone: '13312344321',
      digit: '3452216345673465',
      bankCard: '62223452216345673465',
      password: 'qwer1234',
    };
  },
};
</script>

<style lang="less" scoped></style>
