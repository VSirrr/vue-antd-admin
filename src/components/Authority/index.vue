<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Authority',
  props: {
    value: {
      type: String,
      default: '',
      reuqired: true,
    },
  },
  computed: {
    ...mapGetters(['buttons']),
  },
  render() {
    if (this.buttons.includes(this.value)) {
      return <span>{this.$slots.default}</span>;
    }
    return null;
  },
};
</script>
