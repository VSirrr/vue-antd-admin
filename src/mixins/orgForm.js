import { dealFileList } from 'utils';
import Upload from 'components/Upload';
import PhoneInput from 'components/PhoneInput';
import { REG_NAME, REG_PHONE, REG_CREADIT_CODE } from 'utils/reg';

function noop() {}

export default {
  components: {
    Upload,
    PhoneInput,
  },
  data() {
    return {
      submitting: false,
    };
  },
  methods: {
    // 提交
    formSubmit(cb) {
      this.form.validateFields(async (errors, values) => {
        if (errors) return;
        try {
          this.submitting = true;
          await cb({
            ...values,
            fileList: dealFileList(values.fileList),
          });
          this.$message.success('操作成功');
          const path = this.$route.path.replace(/(.*)\/(increase|edit)/, '$1');
          this.$router.push(path);
        } catch (error) {
          console.error(error);
          this.catchError(error, values);
        } finally {
          this.submitting = false;
        }
      });
    },
    // 处理错误信息
    catchError: noop,
    // 返回
    goBack() {
      this.$router.back();
    },
  },
  // 初始化表单
  beforeCreate() {
    this.form = this.$form.createForm(this);
    // 统一社会信用代码
    this.companyOrgCode = [
      'companyOrgCode',
      {
        validateTrigger: 'blur',
        rules: [
          {
            required: true,
            message: '请输入统一社会信用代码',
          },
          {
            pattern: REG_CREADIT_CODE,
            message: '请输入正确的统一社会信用代码',
          },
        ],
      },
    ];
    // 联系人
    this.linkMan = [
      'linkMan',
      {
        validateTrigger: 'blur',
        rules: [
          {
            required: true,
            message: '请输入联系人姓名',
          },
          {
            pattern: REG_NAME,
            message: '请输入正确的联系人姓名',
          },
        ],
      },
    ];
    // 联系电话
    this.linkPhone = [
      'linkPhone',
      {
        validateTrigger: 'blur',
        rules: [
          {
            required: true,
            message: '请输入联系人手机号',
          },
          {
            pattern: REG_PHONE,
            message: '请输入正确的联系人手机号',
          },
        ],
      },
    ];
    // 地址
    this.address = [
      'address',
      {
        validateTrigger: 'blur',
        rules: [
          {
            required: true,
            whitespace: true,
            message: '请输入经营地址',
          },
        ],
      },
    ];
    // 文件
    this.fileList = [
      'fileList',
      {
        valuePropName: 'fileList',
        rules: [
          {
            required: true,
            message: '请上传附件',
          },
        ],
      },
    ];
  },
};
