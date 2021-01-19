import mark from './mark';
import { provideClose, provideEnable, provideDisable } from 'api/provider';

export default {
  mixins: [mark],
  methods: {
    // 标注
    addMark({ id: relateId, provideName }) {
      this.$_addMark({
        relateId,
        relateType: 2,
        name: provideName,
      });
    },
    // 删除标注
    deleteMark({ id: relateId }) {
      this.$_deleteMark({
        relateId,
        relateType: 2,
      });
    },
    // 注销
    provideClose({ id: provideId }) {
      this.$confirm({
        title: '注销',
        icon: () => (
          <a-icon theme="filled" style="color: #1890ff" type="info-circle" />
        ),
        content: (
          <div>
            <p>仓单出具人注销后不能再恢复</p>
            <p>确定注销吗？</p>
          </div>
        ),
        onOk: async () => {
          await provideClose({ provideId });
          this.$message.success('操作成功');
          // 操作成功之后，重新获取数据--约定方法名必须为 getData
          this.getData();
        },
      });
    },
    // 启用
    provideEnable({ id: provideId, provideName }) {
      this.$confirm({
        title: '启用',
        icon: () => (
          <a-icon theme="filled" style="color: #1890ff" type="info-circle" />
        ),
        content: `确定启用${provideName}吗？`,
        onOk: async () => {
          await provideEnable({ provideId });
          this.$message.success('操作成功');
          // 操作成功之后，重新获取数据--约定方法名必须为 getData
          this.getData();
        },
      });
    },
    // 停用
    provideDisable({ id: provideId, provideName }) {
      this.$confirm({
        title: '停用',
        icon: () => (
          <a-icon theme="filled" style="color: #1890ff" type="info-circle" />
        ),
        content: `确定停用${provideName}吗？`,
        onOk: async () => {
          await provideDisable({ provideId });
          this.$message.success('操作成功');
          // 操作成功之后，重新获取数据--约定方法名必须为 getData
          this.getData();
        },
      });
    },
  },
};
