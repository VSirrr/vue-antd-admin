import { deleteMark } from 'api/mark';
import AddMarkModal from 'components/AddMarkModal';

export default {
  components: {
    AddMarkModal,
  },
  data() {
    return {
      // 添加标注弹框需要的参数
      addMarkModalOpitons: {},
      // 添加标注弹框是否显示
      addMarkModalVisible: false,
    };
  },
  methods: {
    // 添加标注
    $_addMark(params) {
      this.addMarkModalOpitons = params;
      this.addMarkModalVisible = true;
    },
    // 清除标注
    $_deleteMark(params) {
      this.$confirm({
        title: '清除标注',
        icon: () => (
          <a-icon theme="filled" style="color: #1890ff" type="info-circle" />
        ),
        content: '清除标注内容？',
        onOk: async () => {
          await deleteMark(params);
          this.$message.success('操作成功');
          // 操作成功之后，重新获取数据--约定方法名必须为 getData
          this.getData();
        },
      });
    },
  },
};
