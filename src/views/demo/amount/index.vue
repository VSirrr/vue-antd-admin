<template>
  <div>
    <Amount :value="val" transition />
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
