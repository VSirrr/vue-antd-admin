<template>
  <a-modal :width="600" title="操作员角色" :visible="visible" @cancel="close">
    <Table
      size="small"
      class="table"
      :page-no="pageNo"
      :columns="columns"
      :loading="loading"
      :scroll="{ y: 260 }"
      :page-size="pageSize"
      :total-size="totalSize"
      :total-page="totalPage"
      :data-source="tableData"
      @change="change"
    >
    </Table>
    <template #footer>
      <a-button @click="close">关闭</a-button>
    </template>
  </a-modal>
</template>

<script>
import modal from 'mixins/modal';
import Table from 'components/Table';
import { queryUserRoleRelationList } from 'api/role';

export default {
  name: 'SearchRoleModal',
  components: {
    Table,
  },
  mixins: [modal],
  props: {
    userId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      columns: [
        {
          title: '角色名称',
          dataIndex: 'roleName',
        },
        {
          title: '角色描述',
          dataIndex: 'roleDesc',
        },
      ],
      pageNo: 1,
      pageSize: 10,
      totalPage: 0,
      totalSize: 0,
      tableData: [],
      loading: false,
    };
  },
  watch: {
    visible(val) {
      if (val) {
        this.change();
      }
    },
  },
  methods: {
    async change(pagination = {}) {
      const { pageNo = 1, pageSize = 10 } = pagination;
      try {
        this.loading = true;
        const { list, totalSize, totalPage } = await queryUserRoleRelationList({
          pageNo,
          pageSize,
          userId: this.userId,
        });
        this.pageNo = pageNo;
        this.tableData = list;
        this.pageSize = pageSize;
        this.totalSize = totalSize;
        this.totalPage = totalPage;
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
