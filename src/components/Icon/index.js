export default {
  functional: true,
  render(h, context) {
    const { props, data } = context;
    const { type } = props;
    try {
      const svg = require(`assets/icons/${type}.svg?inline`).default;
      return h('a-icon', {
        ...data,
        attrs: {
          ...props,
          component: svg,
        },
      });
    } catch (error) {
      console.error(error);
      return null;
    }
  },
};
