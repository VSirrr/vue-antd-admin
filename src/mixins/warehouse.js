import mark from './mark';
import {
  warehouseClose,
  warehouseEnable,
  warehouseDisable,
} from 'api/warehouse';

export default {
  mixins: [mark],
  methods: {
    // 标注
    addMark({ id: relateId, warehouseName }) {
      this.$_addMark({
        relateId,
        relateType: 3,
        name: warehouseName,
      });
    },
    // 删除标注
    deleteMark({ id: relateId }) {
      this.$_deleteMark({
        relateId,
        relateType: 3,
      });
    },
    // 注销
    warehouseClose({ id: warehouseId }) {
      this.$confirm({
        title: '注销',
        icon: () => (
          <a-icon theme="filled" style="color: #1890ff" type="info-circle" />
        ),
        content: (
          <div>
            <p>仓库注销后不能再恢复</p>
            <p>确定注销吗？</p>
          </div>
        ),
        onOk: async () => {
          await warehouseClose({ warehouseId });
          this.$message.success('操作成功');
          // 操作成功之后，重新获取数据--约定方法名必须为 getData
          this.getData();
        },
      });
    },
    // 启用
    warehouseEnable({ id: warehouseId, warehouseName }) {
      this.$confirm({
        title: '启用',
        icon: () => (
          <a-icon theme="filled" style="color: #1890ff" type="info-circle" />
        ),
        content: `确定启用${warehouseName}吗？`,
        onOk: async () => {
          await warehouseEnable({ warehouseId });
          this.$message.success('操作成功');
          // 操作成功之后，重新获取数据--约定方法名必须为 getData
          this.getData();
        },
      });
    },
    // 停用
    warehouseDisable({ id: warehouseId, warehouseName }) {
      this.$confirm({
        title: '停用',
        icon: () => (
          <a-icon theme="filled" style="color: #1890ff" type="info-circle" />
        ),
        content: `确定停用${warehouseName}吗？`,
        onOk: async () => {
          await warehouseDisable({ warehouseId });
          this.$message.success('操作成功');
          // 操作成功之后，重新获取数据--约定方法名必须为 getData
          this.getData();
        },
      });
    },
  },
};
