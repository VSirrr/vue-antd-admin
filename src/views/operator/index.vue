<template>
  <a-card :bordered="false">
    <SearchForm />
    <RouteTable
      :loading="loading"
      :columns="columns"
      :total-size="totalSize"
      :total-page="totalPage"
      :data-source="tableData"
      :row-class-name="rowClassName"
      @change="getData"
    >
      <!-- 状态 -->
      <template #userStatus="{ userStatus, userStatusDesc }">
        <a-badge v-if="userStatus === 2" status="success" />
        <a-badge v-if="userStatus === 3" status="error" />
        <a-badge v-if="userStatus === 5" status="default" />
        {{ userStatusDesc }}
      </template>
      <!-- 操作 -->
      <template #operate="{ userStatus, userType, userName, id }">
        <template v-if="userStatus === 2 && userType === 1">
          <OperateButton @click="visible1 = true">变更管理员</OperateButton>
        </template>
        <template v-if="userStatus === 2 && userType === 2">
          <OperateButton @click="searhRole(id)">查看角色</OperateButton>
          <OperateButton @click="updateRole(id)">修改角色</OperateButton>
          <OperateButton @click="resetPwd(userName, id)"
            >重置密码
          </OperateButton>
          <OperateButton color-red @click="disable(id)">停用</OperateButton>
          <OperateButton color-red @click="cancel(id)">注销</OperateButton>
        </template>
        <template v-if="userStatus === 3">
          <OperateButton @click="enable(id)">启用</OperateButton>
          <OperateButton color-red @click="cancel(id)">注销</OperateButton>
        </template>
        <template v-if="userStatus === 5">
          <OperateButton @click="cancelRecord(id)">注销记录</OperateButton>
        </template>
      </template>
    </RouteTable>
    <!-- 变更管理员弹框 -->
    <ChangeAdminModal v-model="visible1" />
    <!-- 查询操作员角色弹框 -->
    <SearchRoleModal v-model="visible2" :user-id="userId" />
    <!-- 修改操作员角色弹框 -->
    <UpdateRoleModal v-model="visible3" :user-id="userId" />
  </a-card>
</template>

<script>
import searchTable from 'mixins/searchTable';
import SearchForm from './components/SearchForm';
import OperateButton from 'components/OperateButton';
import SearchRoleModal from './components/SearchRoleModal';
import UpdateRoleModal from './components/UpdateRoleModal';
import ChangeAdminModal from './components/ChangeAdminModal';
import RouteTable, { sortColumn } from 'components/Table/Route';
import {
  operatorClose,
  operatorEnable,
  operatorDisable,
  getCancelRecord,
  resetOperatorPwd,
  queryOperatorList,
} from 'api/operator';

export default {
  name: 'Operator',
  components: {
    RouteTable,
    SearchForm,
    OperateButton,
    SearchRoleModal,
    UpdateRoleModal,
    ChangeAdminModal,
  },
  mixins: [searchTable],
  data() {
    return {
      userId: 0,
      visible1: false,
      visible2: false,
      visible3: false,
    };
  },
  computed: {
    columns() {
      const { order, pageNo = 1, pageSize = 10 } = this.$route.query;
      return [
        {
          key: 'number',
          title: '序号',
          width: 80,
          customRender: (text, record, index) => {
            return (pageNo - 1) * pageSize + index + 1;
          },
        },
        {
          dataIndex: 'phone',
          title: '手机号码',
          width: 120,
        },
        {
          dataIndex: 'userName',
          title: '姓名',
          width: 140,
        },
        {
          dataIndex: 'updateTime',
          title: '更新时间',
          width: 180,
          sorter: true,
          sortOrder: order,
        },
        {
          key: 'userStatus',
          title: '状态',
          width: 120,
          scopedSlots: { customRender: 'userStatus' },
        },
        {
          dataIndex: 'userTypeDesc',
          title: '角色',
          width: 120,
        },
        {
          key: 'operate',
          title: '操作',
          width: 340,
          scopedSlots: { customRender: 'operate' },
        },
      ];
    },
  },
  methods: {
    rowClassName({ userStatus }) {
      if (userStatus === 5) {
        return 'row-disabled';
      }
    },
    async getData() {
      try {
        this.loading = true;
        const {
          order,
          phone,
          endTime,
          userName,
          starTime,
          userStatus,
          pageNo = 1,
          pageSize = 10,
        } = this.$route.query;
        const { totalPage, totalSize, list } = await queryOperatorList({
          phone,
          pageNo,
          endTime,
          pageSize,
          userName,
          starTime,
          userStatus,
          sortColumns: sortColumn('user.UpdateTime', order),
        });
        this.tableData = list;
        this.totalPage = totalPage;
        this.totalSize = totalSize;
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    // 重置密码
    resetPwd(userName, userId) {
      this.$confirm({
        title: '重置密码',
        icon: () => (
          <a-icon theme="filled" style="color: #1890ff" type="info-circle" />
        ),
        content: (
          <div>
            重置操作员 {userName} 的密码吗？
            <br />
            默认密码：zcd123456
          </div>
        ),
        onOk: async () => {
          await resetOperatorPwd({ userId });
          this.$message.success('操作成功');
        },
      });
    },
    // 注销记录
    async cancelRecord(userId) {
      try {
        this.$loading.show();
        const { adminName, cancelTime, operatorName } = await getCancelRecord({
          userId,
        });
        this.$info({
          autoFocusButton: null,
          title: '注销记录',
          icon: () => (
            <a-icon theme="filled" style="color: #1890ff" type="info-circle" />
          ),
          content: (
            <div>
              管理员 {adminName} 注销了操作员 {operatorName} 的账号
              <br />
              注销时间：{cancelTime}
            </div>
          ),
          okType: 'default',
          okText: '关闭',
        });
      } catch (error) {
        console.error(error);
      } finally {
        this.$loading.hide();
      }
    },
    // 注销
    cancel(userId) {
      this.$confirm({
        title: '注销',
        icon: () => (
          <a-icon theme="filled" style="color: #1890ff" type="info-circle" />
        ),
        content:
          '注销账号后不能再重新开通，但是仍然可以用这个手机号再注册，确定注销该操作员吗？',
        onOk: async () => {
          await operatorClose({ userId });
          this.$message.success('操作成功');
          this.getData();
        },
      });
    },
    // 启用
    enable(userId) {
      this.$confirm({
        title: '启用',
        icon: () => (
          <a-icon theme="filled" style="color: #1890ff" type="info-circle" />
        ),
        content: '确定启用该操作员账号吗？',
        onOk: async () => {
          await operatorEnable({ userId });
          this.$message.success('操作成功');
          this.getData();
        },
      });
    },
    // 停用
    disable(userId) {
      this.$confirm({
        title: '停用',
        icon: () => (
          <a-icon theme="filled" style="color: #1890ff" type="info-circle" />
        ),
        content: '确定停用该操作员账号吗？',
        onOk: async () => {
          await operatorDisable({ userId });
          this.$message.success('操作成功');
          this.getData();
        },
      });
    },
    searhRole(id) {
      this.userId = id;
      this.visible2 = true;
    },
    updateRole(id) {
      this.userId = id;
      this.visible3 = true;
    },
  },
};
</script>
