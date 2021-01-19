import mark from './mark';
import { platformClose, platformEnable, platformDisable } from 'api/platform';

export default {
  mixins: [mark],
  methods: {
    // 标注
    addMark({ id: relateId, platformName }) {
      this.$_addMark({
        relateId,
        relateType: 1,
        name: platformName,
      });
    },
    // 删除标注
    deleteMark({ id: relateId }) {
      this.$_deleteMark({
        relateId,
        relateType: 1,
      });
    },
    // 注销
    platformClose({ id: platformId }) {
      this.$confirm({
        title: '注销',
        icon: () => (
          <a-icon theme="filled" style="color: #1890ff" type="info-circle" />
        ),
        content: (
          <div>
            <p>仓单运营平台注销后不能再恢复</p>
            <p>确定注销吗？</p>
          </div>
        ),
        onOk: async () => {
          await platformClose({ platformId });
          this.$message.success('操作成功');
          // 操作成功之后，重新获取数据--约定方法名必须为 getData
          this.getData();
        },
      });
    },
    // 启用
    platformEnable({ id: platformId, platformName }) {
      this.$confirm({
        title: '启用',
        icon: () => (
          <a-icon theme="filled" style="color: #1890ff" type="info-circle" />
        ),
        content: `确定启用${platformName}吗？`,
        onOk: async () => {
          await platformEnable({ platformId });
          this.$message.success('操作成功');
          // 操作成功之后，重新获取数据--约定方法名必须为 getData
          this.getData();
        },
      });
    },
    // 停用
    platformDisable({ id: platformId, platformName }) {
      this.$confirm({
        title: '停用',
        icon: () => (
          <a-icon theme="filled" style="color: #1890ff" type="info-circle" />
        ),
        content: `确定停用${platformName}吗？`,
        onOk: async () => {
          await platformDisable({ platformId });
          this.$message.success('操作成功');
          // 操作成功之后，重新获取数据--约定方法名必须为 getData
          this.getData();
        },
      });
    },
  },
};
