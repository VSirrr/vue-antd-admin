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
      <template #platformStatus="{ platformStatus, platformStatusDesc }">
        <a-badge v-if="platformStatus === 1" status="success" />
        <a-badge v-if="platformStatus === 2" status="error" />
        <a-badge v-if="platformStatus === 3" status="default" />
        {{ platformStatusDesc }}
      </template>
      <!-- 标注 -->
      <template #markList="{ markList }">
        <MarkList :markList="markList" />
      </template>
      <!-- 操作 -->
      <template #operate="platform">
        <OperateButton @click="toDetail(platform)">详情</OperateButton>
        <OperateButton
          v-if="platform.platformStatus !== 3"
          @click="addMark(platform)"
        >
          标注
        </OperateButton>
        <!-- 正常 -->
        <template v-if="platform.platformStatus === 1">
          <OperateButton colorRed @click="platformDisable(platform)">
            停用
          </OperateButton>
          <OperateButton colorRed @click="platformClose(platform)">
            注销
          </OperateButton>
        </template>
        <!-- 已停用 -->
        <template v-if="platform.platformStatus === 2">
          <OperateButton @click="platformEnable(platform)">
            启用
          </OperateButton>
          <OperateButton colorRed @click="platformClose(platform)">
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
import platform from 'mixins/platform';
import MarkList from 'components/MarkList';
import searchTable from 'mixins/searchTable';
import SearchForm from './components/SearchForm';
import { queryPlatformList } from 'api/platform';
import OperateButton from 'components/OperateButton';
import RouteTable, { sortColumn } from 'components/Table/Route';

export default {
  name: 'Platform',
  mixins: [searchTable, platform],
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
          dataIndex: 'platformName',
          title: '仓单运营平台',
          width: 200,
        },
        {
          dataIndex: 'platformNumber',
          title: '编号',
          width: 200,
        },
        {
          dataIndex: 'companyName',
          title: '管理人',
          width: 200,
        },
        {
          key: 'platformStatus',
          title: '状态',
          width: 150,
          scopedSlots: { customRender: 'platformStatus' },
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
    rowClassName({ platformStatus }) {
      if (platformStatus === 3) {
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
          platformName,
          platformStatus,
        } = this.$route.query;
        const { totalPage, totalSize, list } = await queryPlatformList({
          pageNo,
          endTime,
          pageSize,
          starTime,
          provideName,
          platformName,
          platformStatus,
          sortColumns: sortColumn('platform.id', order),
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
      this.$router.push(`/organization/platform/detail?id=${id}`);
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
