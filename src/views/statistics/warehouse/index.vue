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
      <template #receiptStatus="{ receiptStatusDesc }">
        <!-- receiptStatus, -->
        <a-badge status="success" />
        <!-- <a-badge v-if="receiptStatus === 1" status="success" /> -->
        <!-- <a-badge v-if="receiptStatus === 2" status="error" /> -->
        <!-- <a-badge v-if="receiptStatus === 3" status="default" /> -->
        {{ receiptStatusDesc }}
      </template>
      <!-- 标注 -->
      <template #markList="{ markList }">
        <MarkList :markList="markList" />
      </template>
      <!-- 操作 -->
      <template #operate="{ id }">
        <router-link :to="`/statistics/warehouse/detail?id=${id}`">
          详情
        </router-link>
      </template>
    </RouteTable>
  </a-card>
</template>

<script>
import MarkList from 'components/MarkList';
import searchTable from 'mixins/searchTable';
import SearchForm from './components/SearchForm';
import { queryWarehouseReceiptList } from 'api/wr';
import RouteTable, { sortColumn } from 'components/Table/Route';

export default {
  name: 'Warehouse',
  mixins: [searchTable],
  components: {
    MarkList,
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
          dataIndex: 'receiptNumber',
          title: '全国性可流转仓单编号',
          width: 200,
        },
        {
          dataIndex: 'platformName',
          title: '仓单运营平台',
          width: 200,
        },
        {
          dataIndex: 'platformReceiptNumber',
          title: '运营平台仓单号',
          width: 200,
        },
        {
          dataIndex: 'provideName',
          title: '仓单出具人',
          width: 200,
        },
        {
          dataIndex: 'storageCategory',
          title: '品类',
          width: 200,
        },
        {
          dataIndex: 'warehouseName',
          title: '仓库',
          width: 200,
        },
        {
          key: 'receiptStatus',
          title: '仓单状态',
          width: 170,
          scopedSlots: { customRender: 'receiptStatus' },
        },
        {
          key: 'markList',
          title: '标注',
          width: 200,
          scopedSlots: { customRender: 'markList' },
        },
        {
          dataIndex: 'createTime',
          title: '登记时间',
          width: 170,
          sorter: true,
          sortOrder: order,
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
    rowClassName({ receiptStatus }) {
      if (receiptStatus === 8) {
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
          pageNo = 1,
          provideName,
          platformName,
          pageSize = 10,
          receiptNumber,
          receiptStatus,
          warehouseName,
          storageCategory,
          platformReceiptNumber,
        } = this.$route.query;

        const { totalPage, totalSize, list } = await queryWarehouseReceiptList({
          pageNo,
          endTime,
          pageSize,
          starTime,
          provideName,
          platformName,
          receiptNumber,
          receiptStatus,
          warehouseName,
          storageCategory,
          platformReceiptNumber,
          sortColumns: sortColumn('receipt.id', order),
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
