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
      <template #warehouseStatus="{ warehouseStatus, warehouseStatusDesc }">
        <a-badge v-if="warehouseStatus === 1" status="success" />
        <a-badge v-if="warehouseStatus === 2" status="error" />
        <a-badge v-if="warehouseStatus === 3" status="default" />
        {{ warehouseStatusDesc }}
      </template>
      <!-- 标注 -->
      <template #markList="{ markList }">
        <MarkList :markList="markList" />
      </template>
      <!-- 操作 -->
      <template #operate="warehouse">
        <OperateButton @click="toDetail(warehouse)">详情</OperateButton>
        <OperateButton
          v-if="warehouse.warehouseStatus !== 3"
          @click="addMark(warehouse)"
        >
          标注
        </OperateButton>
        <!-- 正常 -->
        <template v-if="warehouse.warehouseStatus === 1">
          <OperateButton colorRed @click="warehouseDisable(warehouse)">
            停用
          </OperateButton>
          <OperateButton colorRed @click="warehouseClose(warehouse)">
            注销
          </OperateButton>
        </template>
        <!-- 已停用 -->
        <template v-if="warehouse.warehouseStatus === 2">
          <OperateButton @click="warehouseEnable(warehouse)">
            启用
          </OperateButton>
          <OperateButton colorRed @click="warehouseClose(warehouse)">
            注销
          </OperateButton>
        </template>
      </template>
    </RouteTable>
    <!-- 标注信息录入弹框 -->
    <AddMarkModal
      v-model="addMarkModalVisible"
      :options="addMarkModalOpitons"
      @marked="getData"
    />
  </a-card>
</template>

<script>
import warehouse from 'mixins/warehouse';
import MarkList from 'components/MarkList';
import searchTable from 'mixins/searchTable';
import SearchForm from './components/SearchForm';
import { queryWarehouseList } from 'api/warehouse';
import OperateButton from 'components/OperateButton';
import RouteTable, { sortColumn } from 'components/Table/Route';

export default {
  name: 'Warehouse',
  mixins: [searchTable, warehouse],
  components: {
    MarkList,
    RouteTable,
    SearchForm,
    OperateButton,
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
          dataIndex: 'warehouseCode',
          title: '编号',
          width: 200,
        },
        {
          dataIndex: 'provideName',
          title: '所属仓单出具人',
          width: 200,
        },
        {
          key: 'warehouseStatus',
          title: '状态',
          width: 150,
          scopedSlots: { customRender: 'warehouseStatus' },
        },
        {
          key: 'markList',
          title: '标注',
          width: 200,
          scopedSlots: { customRender: 'markList' },
        },
        {
          key: 'operate',
          title: '操作',
          width: 220,
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
    async getData() {
      try {
        this.loading = true;
        const {
          order,
          endTime,
          starTime,
          pageNo = 1,
          provideName,
          pageSize = 10,
          warehouseName,
          warehouseStatus,
        } = this.$route.query;
        const { totalPage, totalSize, list } = await queryWarehouseList({
          pageNo,
          endTime,
          pageSize,
          starTime,
          provideName,
          warehouseName,
          warehouseStatus,
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
    // 查看详情
    toDetail({ id }) {
      this.$router.push(`/organization/warehouse/detail?id=${id}`);
    },
  },
};
</script>

<style lang="less" scoped>
@import 'styles/variable';

.operate-btn {
  &:not(:last-child) {
    margin-right: @padding-md;
  }
  &.red {
    color: @red-color;
  }
}
</style>
