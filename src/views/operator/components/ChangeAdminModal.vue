<template>
  <a-modal :width="600" title="变更管理员" :visible="visible" @cancel="close">
    <p class="tip">请选择超级管理员</p>
    <Table
      class="table"
      :pageNo="pageNo"
      :columns="columns"
      :loading="loading"
      :scroll="{ y: 260 }"
      :pageSize="pageSize"
      :totalSize="totalSize"
      :totalPage="totalPage"
      :dataSource="tableData"
      @change="change"
    >
      <template #operate="{ userName, userId }">
        <a-button size="small" @click="select(userName, userId)">选择</a-button>
      </template>
    </Table>
    <template #footer>
      <a-button @click="close">取消</a-button>
    </template>
  </a-modal>
</template>

<script>
import { mapMutations } from 'vuex';
import Table from 'components/Table';
import { changeAdmin, queryOperatorList } from 'api/operator';

export default {
  name: 'ChangeAdminModal',
  components: {
    Table,
  },
  model: {
    prop: 'visible',
    event: 'change',
  },
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      columns: [
        {
          width: 200,
          title: '手机号码',
          dataIndex: 'phone',
        },
        {
          width: 200,
          title: '姓名',
          dataIndex: 'userName',
        },
        {
          width: 100,
          key: 'operate',
          scopedSlots: { customRender: 'operate' },
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
  methods: {
    ...mapMutations('user', ['clearUserInfo']),
    close() {
      this.$emit('change', false);
    },
    async change(pagination = {}) {
      const { pageNo = 1, pageSize = 10 } = pagination;
      try {
        this.loading = true;
        const { list, totalSize, totalPage } = await queryOperatorList({
          pageNo,
          pageSize,
          userStatus: 2,
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
    select(userName, userId) {
      this.$confirm({
        title: '变更管理员',
        icon: () => (
          <a-icon theme="filled" style="color: #1890ff" type="info-circle" />
        ),
        content: `即将选择 ${userName} 作为新的超级管理员，确认选择后当前登录的账号将被强制退出，继续吗？`,
        okText: '继续更换',
        onOk: async () => {
          await changeAdmin({ userId });
          this.$message.success('操作成功');
          this.clearUserInfo();
        },
      });
    },
  },
  watch: {
    visible(val) {
      if (val) {
        this.change();
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import 'styles/mixin';

.tip {
  color: @text-color-secondary;
}
.table {
  .border-base();
}
</style>
