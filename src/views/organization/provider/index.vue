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
      <template #provideStatus="{ provideStatus, provideStatusDesc }">
        <a-badge v-if="provideStatus === 1" status="success" />
        <a-badge v-if="provideStatus === 2" status="error" />
        <a-badge v-if="provideStatus === 3" status="default" />
        {{ provideStatusDesc }}
      </template>
      <!-- 标注 -->
      <template #markList="{ markList }">
        <MarkList :markList="markList" />
      </template>
      <!-- 操作 -->
      <template #operate="provide">
        <OperateButton @click="toDetail(provide)">详情</OperateButton>
        <OperateButton
          v-if="provide.provideStatus !== 3"
          @click="addMark(provide)"
        >
          标注
        </OperateButton>
        <!-- 正常 -->
        <template v-if="provide.provideStatus === 1">
          <OperateButton colorRed @click="provideDisable(provide)">
            停用
          </OperateButton>
          <OperateButton colorRed @click="provideClose(provide)">
            注销
          </OperateButton>
        </template>
        <!-- 已停用 -->
        <template v-if="provide.provideStatus === 2">
          <OperateButton @click="provideEnable(provide)">
            启用
          </OperateButton>
          <OperateButton colorRed @click="provideClose(provide)">
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
import provider from 'mixins/provider';
import MarkList from 'components/MarkList';
import searchTable from 'mixins/searchTable';
import { queryProvideList } from 'api/provider';
import SearchForm from './components/SearchForm';
import OperateButton from 'components/OperateButton';
import RouteTable, { sortColumn } from 'components/Table/Route';

export default {
  name: 'Provider',
  mixins: [searchTable, provider],
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
          dataIndex: 'provideName',
          title: '仓单出具人',
          width: 200,
        },
        {
          dataIndex: 'provideNumber',
          title: '出具人编号',
          width: 200,
        },
        {
          key: 'provideStatus',
          title: '状态',
          width: 150,
          scopedSlots: { customRender: 'provideStatus' },
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
    rowClassName({ provideStatus }) {
      if (provideStatus === 3) {
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
          provideStatus,
        } = this.$route.query;
        const { totalPage, totalSize, list } = await queryProvideList({
          pageNo,
          endTime,
          pageSize,
          starTime,
          provideName,
          platformName,
          provideStatus,
          sortColumns: sortColumn('provide.id', order),
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
      this.$router.push(`/organization/provider/detail?id=${id}`);
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
