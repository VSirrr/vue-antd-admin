<template>
  <a-modal
    :width="800"
    :visible="visible"
    :afterClose="afterClose"
    title="选择仓单出具人"
    @cancel="close"
  >
    <a-form class="search-form">
      <a-row :gutter="12">
        <a-col span="9">
          <a-form-item label="仓单出具人">
            <a-input
              allow-clear
              size="default"
              :maxLength="100"
              v-model="provideName"
              placeholder="支持模糊查询"
            />
          </a-form-item>
        </a-col>
        <a-col span="9">
          <a-form-item label="运营平台">
            <a-input
              allow-clear
              :maxLength="100"
              v-model="platformName"
              placeholder="支持模糊查询"
            />
          </a-form-item>
        </a-col>
        <a-col span="6">
          <a-form-item>
            <SearchButton @search="search" @reset="reset" />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
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
      @change="getData"
    >
      <template #provideName="{ provideName, markList }">
        {{ provideName }}
        <a-tag v-if="markList && markList.length" color="orange">
          有标注
        </a-tag>
      </template>
      <template #operate="provider">
        <a-button size="small" @click="select(provider)">选择</a-button>
      </template>
    </Table>
    <template #footer>
      <a-button @click="close">取消</a-button>
    </template>
  </a-modal>
</template>

<script>
import modal from 'mixins/modal';
import Table from 'components/Table';
import SearchButton from 'components/SearchButton';
import { queryChoolseProvideList } from 'api/warehouse';

export default {
  name: 'SelectProviderModal',
  mixins: [modal],
  components: {
    Table,
    SearchButton,
  },
  data() {
    return {
      pageNo: 1,
      pageSize: 10,
      totalPage: 0,
      totalSize: 0,
      tableData: [],
      loading: false,
      provideName: undefined,
      platformName: undefined,
    };
  },
  computed: {
    columns() {
      const { pageNo = 1, pageSize = 10 } = this;
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
          key: 'provideName',
          title: '仓单出具人',
          width: 200,
          scopedSlots: { customRender: 'provideName' },
        },
        {
          dataIndex: 'platformName',
          title: '运营平台',
          width: 200,
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
    // 页签切换
    async getData({ pageNo = 1, pageSize = 10 } = {}) {
      try {
        this.loading = true;
        const { provideName, platformName } = this;
        const { list, totalSize, totalPage } = await queryChoolseProvideList({
          pageNo,
          pageSize,
          provideName,
          platformName,
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
    // 选择
    select(provider) {
      this.$emit('selected', provider);
      this.close();
    },
    // 搜索
    search() {
      const { provideName, platformName } = this;
      if (!provideName && !platformName) return;
      this.getData();
    },
    // 重置
    reset() {
      this.afterClose();
      this.getData();
    },
    // 清空表单数据
    afterClose() {
      this.provideName = this.platformName = undefined;
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
