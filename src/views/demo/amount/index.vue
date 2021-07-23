<template>
  <div class="amount-demo">
    <Amount class="big" :value="val" transition />
  </div>
</template>

<script>
import Amount from 'components/Amount';

export default {
  name: 'AmountDemo',
  components: {
    Amount,
  },
  data() {
    return {
      val: 0,
    };
  },
  mounted() {
    setTimeout(() => {
      this.val = 1500;
      setTimeout(() => {
        this.val = 500;
      }, 2000);
    }, 300);
  },
};
</script>

<style lang="less" scoped>
.amount-demo {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 300px;

  & > .big {
    font-size: 48px;
  }
}
</style>
