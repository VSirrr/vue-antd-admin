import orgForm from './orgForm';

export default {
  mixins: [orgForm],
  methods: {
    // 处理错误信息
    catchError(error, { provideId, warehouseCode }) {
      const { retcode, msg } = error;
      if (
        retcode === 61001 ||
        retcode === 62001 ||
        retcode === 62003 ||
        retcode === 62005
      ) {
        this.form.setFields({
          provideId: {
            value: provideId,
            errors: [new Error(msg)],
          },
        });
      } else if (retcode === 70002) {
        this.form.setFields({
          warehouseCode: {
            value: warehouseCode,
            errors: [new Error(msg)],
          },
        });
      }
    },
  },
  // 初始化表单
  beforeCreate() {
    this.warehouseId = ['id'];
    this.provideId = [
      'provideId',
      {
        rules: [
          {
            required: true,
            message: '请选择所属仓单出具人',
          },
        ],
      },
    ];
    this.warehouseName = [
      'warehouseName',
      {
        validateTrigger: 'blur',
        rules: [
          {
            required: true,
            whitespace: true,
            message: '请输入仓库名称',
          },
        ],
      },
    ];
    this.warehouseCode = [
      'warehouseCode',
      {
        validateTrigger: 'blur',
        rules: [
          {
            required: true,
            whitespace: true,
            message: '请输入仓单运营平台仓库编码',
          },
        ],
      },
    ];
    this.address = [
      'address',
      {
        validateTrigger: 'blur',
        rules: [
          {
            required: true,
            whitespace: true,
            message: '请输入仓库地址',
          },
        ],
      },
    ];
    this.content = ['content'];
  },
};
