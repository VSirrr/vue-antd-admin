import orgForm from './orgForm';

export default {
  mixins: [orgForm],
  methods: {
    // 处理错误信息
    catchError(error, { platformIds, companyName }) {
      const { retcode, msg } = error;
      if (retcode === 61001 || retcode === 61003) {
        this.form.setFields({
          platformIds: {
            value: platformIds,
            errors: [new Error(msg)],
          },
        });
      } else if (retcode === 62002) {
        this.form.setFields({
          companyName: {
            value: companyName,
            errors: [new Error(msg)],
          },
        });
      }
    },
  },
  // 初始化表单
  beforeCreate() {
    this.provideId = ['provideId'];
    this.platformIds = [
      'platformIds',
      {
        rules: [
          {
            required: true,
            message: '请选择合作仓单运营平台',
          },
        ],
      },
    ];
    this.companyName = [
      'companyName',
      {
        validateTrigger: 'blur',
        rules: [
          {
            required: true,
            whitespace: true,
            message: '请输入仓单出具人名称',
          },
        ],
      },
    ];
  },
};
