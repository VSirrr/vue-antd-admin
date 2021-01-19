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
      <!-- 状态 -->
      <template #status="{ status, statusDesc }">
        <a-badge v-if="status === 1" status="success" />
        <a-badge v-if="status === 2" status="default" />
        {{ statusDesc }}
      </template>
    </RouteTable>
  </a-card>
</template>

<script>
import searchTable from 'mixins/searchTable';
import SearchForm from './components/SearchForm';
import { queryWarehouseStatusList } from 'api/warehouse';
import RouteTable, { sortColumn } from 'components/Table/Route';

export default {
  name: 'WarehouseStatus',
  mixins: [searchTable],
  components: {
    SearchForm,
    RouteTable,
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
          dataIndex: 'platformName',
          title: '仓单运营平台',
          width: 200,
        },
        {
          dataIndex: 'provideName',
          title: '仓单出具人',
          width: 200,
        },
        {
          dataIndex: 'warehouseName',
          title: '仓库名称',
          width: 200,
        },
        {
          key: 'status',
          title: '状态',
          width: 120,
          scopedSlots: { customRender: 'status' },
        },
        {
          dataIndex: 'createTime',
          title: '仓库创建时间',
          width: 170,
          sorter: true,
          sortOrder: order,
        },
      ];
    },
  },
  methods: {
    rowClassName({ status }) {
      if (status === 2) {
        return 'row-disabled';
      }
    },
    async getData() {
      try {
        this.loading = true;
        const {
          order,
          status,
          endTime,
          starTime,
          pageNo = 1,
          provideName,
          platformName,
          warehouseName,
          pageSize = 10,
        } = this.$route.query;

        const { totalPage, totalSize, list } = await queryWarehouseStatusList({
          pageNo,
          status,
          endTime,
          pageSize,
          starTime,
          provideName,
          platformName,
          warehouseName,
          sortColumns: sortColumn('warehouse.id', order),
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
  },
};
</script>
