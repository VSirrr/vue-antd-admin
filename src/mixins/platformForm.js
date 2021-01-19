import orgForm from './orgForm';

export default {
  mixins: [orgForm],
  methods: {
    // 处理错误信息
    catchError(error, { platformName }) {
      const { retcode, msg } = error;
      if (retcode === 61002) {
        this.form.setFields({
          platformName: {
            value: platformName,
            errors: [new Error(msg)],
          },
        });
      }
    },
  },
  // 初始化表单
  beforeCreate() {
    this.platformId = ['platformId'];
    this.platformName = [
      'platformName',
      {
        validateTrigger: 'blur',
        rules: [
          {
            required: true,
            whitespace: true,
            message: '请输入仓单运营平台名称',
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
            message: '请输入管理人机构名称',
          },
        ],
      },
    ];
  },
};
