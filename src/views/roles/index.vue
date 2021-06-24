<template>
  <a-card :bordered="false">
    <div class="clearfix">
      <a-button
        type="primary"
        style="float: right;margin-bottom: 24px;"
        @click="$router.push('/roles/increase')"
      >
        新增
      </a-button>
    </div>
    <RouteTable
      :loading="loading"
      :columns="columns"
      :total-size="totalSize"
      :total-page="totalPage"
      :data-source="tableData"
      @change="getData"
    >
      <!-- 操作 -->
      <template #operate="{ id }">
        <OperateButton @click="$router.push(`/roles/edit?id=${id}`)">
          修改
        </OperateButton>
        <OperateButton color-red @click="del(id)">删除</OperateButton>
      </template>
    </RouteTable>
  </a-card>
</template>

<script>
import searchTable from 'mixins/searchTable';
import RouteTable from 'components/Table/Route';
import { delRole, queryRoleList } from 'api/role';
import OperateButton from 'components/OperateButton';

export default {
  name: 'Roles',
  components: {
    RouteTable,
    OperateButton,
  },
  mixins: [searchTable],
  data() {
    return {
      visible: false,
    };
  },
  computed: {
    columns() {
      const { pageNo = 1, pageSize = 10 } = this.$route.query;
      return [
        {
          key: 'number',
          title: '序号',
          customRender: (text, record, index) => {
            return (pageNo - 1) * pageSize + index + 1;
          },
        },
        {
          dataIndex: 'roleName',
          title: '角色名称',
        },
        {
          dataIndex: 'roleDesc',
          title: '角色描述',
        },
        {
          key: 'operate',
          title: '操作',
          scopedSlots: { customRender: 'operate' },
        },
      ];
    },
  },
  methods: {
    async getData() {
      try {
        this.loading = true;
        const { pageNo = 1, pageSize = 10 } = this.$route.query;
        const { totalPage, totalSize, list } = await queryRoleList({
          pageNo,
          pageSize,
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
    del(id) {
      this.$confirm({
        title: '删除',
        icon: () => (
          <a-icon theme="filled" style="color: #1890ff" type="info-circle" />
        ),
        content: '确定删除该角色吗？',
        onOk: async () => {
          await delRole({ id });
          this.$message.success('操作成功');
          this.getData();
        },
      });
    },
  },
};
</script>
