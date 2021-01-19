import modal from './modal';

export default {
  mixins: [modal],
  data() {
    return {
      submitting: false,
    };
  },
  methods: {
    afterClose() {
      this.form.resetFields();
    },
  },
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
};
