<template>
  <a-card :bordered="false">
    <SearchForm />
    <RouteTable
      :loading="loading"
      :columns="columns"
      :totalSize="totalSize"
      :totalPage="totalPage"
      :dataSource="tableData"
      :rowClassName="rowClassName"
      @change="getData"
    >
      <!-- 查询次数 -->
      <template #queryNumber="{ queryNumber }">
        <Amount :precision="0" :value="queryNumber" />
      </template>
      <!-- 状态 -->
      <template #userStatus="{ userStatus, userStatusDesc }">
        <a-badge v-if="userStatus === 1" status="processing" />
        <a-badge v-if="userStatus === 2" status="success" />
        <a-badge v-if="userStatus === 3" status="error" />
        <a-badge v-if="userStatus === 4" status="warning" />
        <a-badge v-if="userStatus === 5" status="default" />
        {{ userStatusDesc }}
      </template>
      <!-- 操作 -->
      <template #operate="{ id, fileId,  companyId, userStatus }">
        <template v-if="fileId">
          <OperateButton
            target="_blank"
            :href="`/api/files/viewFile?id=${fileId}`"
          >
            查看文件
          </OperateButton>
        </template>
        <!-- 待审核 -->
        <template v-if="userStatus === 1">
          <OperateButton @click="auditPass(id, companyId)">
            审核通过
          </OperateButton>
          <OperateButton colorRed @click="auditNotPass(id, companyId)">
            审核不通过
          </OperateButton>
        </template>
        <!-- 正常 -->
        <template v-if="userStatus === 2">
          <OperateButton colorRed @click="disable(id)">
            停用
          </OperateButton>
        </template>
        <!-- 已停用 -->
        <template v-if="userStatus === 3">
          <OperateButton @click="enable(id)">启用</OperateButton>
        </template>
      </template>
    </RouteTable>
    <!-- 审核不通过弹框 -->
    <AuditModal
      v-model="auditModalVisible"
      :options="auditModalOptions"
      @success="getData"
    />
  </a-card>
</template>

<script>
import Amount from 'components/Amount';
import { audit } from 'api/operationApply';
import searchTable from 'mixins/searchTable';
import SearchForm from './components/SearchForm';
import OperateButton from 'components/OperateButton';
import RouteTable, { sortColumn } from 'components/Table/Route';
import { queryUserList, userEnable, userDisable } from 'api/operator';

export default {
  name: 'Users',
  mixins: [searchTable],
  components: {
    Amount,
    SearchForm,
    RouteTable,
    OperateButton,
    AuditModal: () => import('./components/AuditModal'),
  },
  data() {
    return {
      auditModalOptions: {},
      auditModalVisible: false,
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
          dataIndex: 'companyName',
          title: '机构名称',
          width: 200,
        },
        {
          dataIndex: 'companyOrgCode',
          title: '统一社会信用代码',
          width: 200,
        },
        {
          dataIndex: 'userName',
          title: '注册人',
          width: 120,
        },
        {
          dataIndex: 'phone',
          title: '手机号码',
          width: 120,
        },
        {
          key: 'queryNumber',
          title: '查询次数',
          width: 120,
          scopedSlots: { customRender: 'queryNumber' },
        },
        {
          key: 'userStatus',
          title: '状态',
          width: 120,
          scopedSlots: { customRender: 'userStatus' },
        },
        {
          dataIndex: 'createTime',
          title: '注册时间',
          width: 170,
          sorter: true,
          sortOrder: order,
        },
        {
          key: 'operate',
          title: '操作',
          width: 260,
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
          endTime,
          starTime,
          userStatus,
          pageNo = 1,
          companyName,
          pageSize = 10,
          queryNumberMin,
          queryNumberMax,
        } = this.$route.query;
        const { totalPage, totalSize, list } = await queryUserList({
          pageNo,
          endTime,
          pageSize,
          starTime,
          userStatus,
          companyName,
          queryNumberMin,
          queryNumberMax,
          sortColumns: sortColumn('user.CreateTime', order),
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
    // 审核通过
    auditPass(userId, companyId) {
      this.$confirm({
        title: '审核通过',
        icon: () => (
          <a-icon theme="filled" style="color: #1890ff" type="info-circle" />
        ),
        content: '该账号申请将会审核通过?',
        onOk: async () => {
          await audit({
            userId,
            companyId,
            applyStatus: 2,
          });
          this.$message.success('操作成功');
          this.getData();
        },
      });
    },
    // 审核不通过
    async auditNotPass(userId, companyId) {
      this.auditModalOptions = { userId, companyId };
      this.auditModalVisible = true;
    },
    // 启用
    enable(userId) {
      this.$confirm({
        title: '启用',
        icon: () => (
          <a-icon theme="filled" style="color: #1890ff" type="info-circle" />
        ),
        content: '确定启用该查询用户的账号吗？',
        onOk: async () => {
          await userEnable({ userId });
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
        content: '确定停用该查询用户的账号吗？',
        onOk: async () => {
          await userDisable({ userId });
          this.$message.success('操作成功');
          this.getData();
        },
      });
    },
  },
};
</script>
