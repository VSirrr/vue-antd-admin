<template>
  <Descriptions title="下属仓库列表">
    <Table
      :pageNo="pageNo"
      :columns="columns"
      :loading="loading"
      :pageSize="pageSize"
      :totalPage="totalPage"
      :totalSize="totalSize"
      :dataSource="tableData"
      :rowClassName="rowClassName"
      @change="getData"
    >
      <!-- 状态 -->
      <template #status="{ warehouseStatus, warehouseStatusDesc }">
        <a-badge v-if="warehouseStatus === 1" status="success" />
        <a-badge v-if="warehouseStatus === 2" status="error" />
        <a-badge v-if="warehouseStatus === 3" status="default" />
        {{ warehouseStatusDesc }}
      </template>
      <!-- 操作 -->
      <template #operate="{ id }">
        <a @click="toDetail(id)">详情</a>
      </template>
    </Table>
  </Descriptions>
</template>

<script>
import Descriptions from 'components/Descriptions';
import Table, { sortColumn } from 'components/Table';
import { queryWarehouseListByProvideId } from 'api/warehouse';

export default {
  name: 'WarehouseListTable',
  components: {
    Table,
    Descriptions,
  },
  data() {
    return {
      order: '',
      pageNo: 1,
      pageSize: 10,
      totalPage: 0,
      totalSize: 0,
      tableData: [],
      loading: false,
    };
  },
  computed: {
    columns() {
      const { order, pageNo = 1, pageSize = 10 } = this;
      return [
        {
          key: 'number',
          title: '序号',
          width: 100,
          customRender: (text, record, index) => {
            return (pageNo - 1) * pageSize + index + 1;
          },
        },
        {
          dataIndex: 'createTime',
          title: '创建时间',
          width: 200,
          sorter: true,
          sortOrder: order,
        },
        {
          dataIndex: 'warehouseName',
          title: '仓库',
          width: 200,
        },
        {
          dataIndex: 'warehouseNumber',
          title: '编号',
          width: 200,
        },
        {
          dataIndex: 'provideName',
          title: '所属仓单出具人',
          width: 200,
        },
        {
          key: 'status',
          title: '状态',
          width: 120,
          scopedSlots: { customRender: 'status' },
        },
        {
          key: 'operate',
          title: '操作',
          width: 100,
          scopedSlots: { customRender: 'operate' },
        },
      ];
    },
  },
  methods: {
    rowClassName({ warehouseStatus }) {
      if (warehouseStatus === 3) {
        return 'row-disabled';
      }
    },
    // 获取下属仓库列表
    async getData({ pageNo = 1, pageSize = 10, order = '' } = {}) {
      try {
        this.loading = true;
        const {
          list,
          totalPage,
          totalSize,
        } = await queryWarehouseListByProvideId({
          pageNo,
          pageSize,
          id: this.$route.query.id,
          sortColumns: sortColumn('id', order),
        });
        this.order = order;
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
    // 查看详情
    toDetail(id) {
      this.$router.push(`/organization/warehouse/detail?id=${id}`);
    },
  },
  created() {
    this.getData();
  },
};
</script>
