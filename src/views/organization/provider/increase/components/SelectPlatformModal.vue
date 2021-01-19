<template>
  <a-modal
    :width="900"
    okText="提交"
    :visible="visible"
    title="选择仓单运营平台"
    :afterClose="afterClose"
    @cancel="close"
    @ok="submit"
  >
    <Table
      size="small"
      :pageNo="pageNo"
      :columns="columns"
      :loading="loading"
      :scroll="{ y: 260 }"
      :pageSize="pageSize"
      :totalSize="totalSize"
      :totalPage="totalPage"
      :dataSource="tableData"
      :rowSelection="{
        onChange,
        columnWidth: 40,
        selectedRowKeys,
      }"
      @change="getData"
    >
      <!-- 状态 -->
      <template #status="{ platformStatusDesc }">
        <a-badge status="success" />
        {{ platformStatusDesc }}
      </template>
    </Table>
  </a-modal>
</template>

<script>
import modal from 'mixins/modal';
import Table from 'components/Table';
import { queryChoosePlatformList } from 'api/provider';

export default {
  name: 'SelectPlatformModal',
  mixins: [modal],
  components: {
    Table,
  },
  data() {
    return {
      pageNo: 1,
      pageSize: 10,
      totalPage: 0,
      totalSize: 0,
      tableData: [],
      loading: false,
      selectedRows: [],
      selectedRowKeys: [],
    };
  },
  computed: {
    columns() {
      const { pageNo = 1, pageSize = 10 } = this;
      return [
        {
          key: 'number',
          title: '序号',
          width: 90,
          customRender: (text, record, index) => {
            return (pageNo - 1) * pageSize + index + 1;
          },
        },
        {
          dataIndex: 'platformName',
          title: '运营平台',
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
          key: 'status',
          title: '状态',
          width: 100,
          scopedSlots: { customRender: 'status' },
        },
      ];
    },
  },
  methods: {
    // 页签切换
    async getData({ pageNo = 1, pageSize = 10 } = {}) {
      try {
        this.loading = true;
        const { list, totalSize, totalPage } = await queryChoosePlatformList({
          pageNo,
          pageSize,
        });
        this.pageNo = pageNo;
        this.tableData = list;
        this.pageSize = pageSize;
        this.totalSize = totalSize;
        this.totalPage = totalPage;
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
    // 选中项发生变化时的回调
    onChange(selectedRowKeys, selectedRows) {
      this.selectedRows = selectedRows;
      this.selectedRowKeys = selectedRowKeys;
    },
    // 点击提交按钮
    submit() {
      this.$emit('selected', this.selectedRows);
      this.close();
    },
    // 清空表单数据
    afterClose() {
      this.selectedRows = [];
      this.selectedRowKeys = [];
    },
  },
  watch: {
    visible(val) {
      if (val) {
        this.getData();
      }
    },
  },
};
</script>

<style lang="less" scoped>
/deep/ th.ant-table-selection-column {
  .ant-table-header-column {
    visibility: hidden;
  }
}
</style>
