<template>
  <a-card :bordered="false">
    <SearchForm />
    <RouteTable
      :loading="loading"
      :columns="columns"
      :totalSize="totalSize"
      :totalPage="totalPage"
      :dataSource="tableData"
      @change="getData"
    />
  </a-card>
</template>

<script>
import searchTable from 'mixins/searchTable';
import { queryWarningList } from 'api/warning';
import RouteTable from 'components/Table/Route';
import SearchForm from './components/SearchForm';

export default {
  name: 'Alarm',
  mixins: [searchTable],
  components: {
    SearchForm,
    RouteTable,
  },
  computed: {
    columns() {
      const { pageNo = 1, pageSize = 10 } = this.$route.query;
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
          title: '报警时间',
          width: 180,
        },
        {
          dataIndex: 'warningTypeDesc',
          title: '错误类型',
          width: 160,
        },
        {
          dataIndex: 'content',
          title: '错误原因',
          width: 300,
        },
      ];
    },
  },
  methods: {
    async getData() {
      try {
        this.loading = true;
        const {
          endTime,
          starTime,
          pageNo = 1,
          warningType,
          pageSize = 10,
        } = this.$route.query;
        const { totalPage, totalSize, list } = await queryWarningList({
          pageNo,
          endTime,
          pageSize,
          starTime,
          warningType,
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
