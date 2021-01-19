<template>
  <Descriptions title="仓单历史记录">
    <Table
      :pageNo="pageNo"
      :columns="columns"
      :loading="loading"
      :pageSize="pageSize"
      :totalPage="totalPage"
      :totalSize="totalSize"
      :dataSource="tableData"
      @change="getData"
    >
      <template #operate="{ id }">
        <a @click="showDetailModal(id)">详情</a>
      </template>
    </Table>
  </Descriptions>
</template>

<script>
import Table, { sortColumn } from 'components/Table';
import { queryHistory, getHistoryDetail } from 'api/wr';
import Descriptions, { DescriptionsItem } from 'components/Descriptions';

export default {
  name: 'HistoryRecordTable',
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
          title: '时间',
          width: 200,
          sorter: true,
          sortOrder: order,
        },
        {
          dataIndex: 'eventName',
          title: '事件',
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
    // 获取历史纪录
    async getData({ pageNo = 1, pageSize = 10, order = '' } = {}) {
      try {
        this.loading = true;
        const { list, totalPage, totalSize } = await queryHistory({
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
    async showDetailModal(id) {
      try {
        this.$loading.show();
        const data = await getHistoryDetail({ id });
        this.$info({
          title: data.eventName,
          icon: () => (
            <a-icon theme="filled" style="color: #1890ff" type="info-circle" />
          ),
          content: this.renderContent(data),
          okType: 'default',
          okText: '关闭',
          autoFocusButton: null,
          width: 620,
        });
      } catch (error) {
        console.error(error);
      } finally {
        this.$loading.hide();
      }
    },
    // 渲染详情数据
    renderContent({
      eventName,
      pledgeCnt,
      firstName,
      createTime,
      secondName,
      storageCnt,
      storageUnit,
      unPledgeCnt,
      receiptNumber,
      pickUpGoodsCnt,
      platformReceiptNumber,
    }) {
      switch (eventName) {
        case '仓单登记':
          return (
            <Descriptions
              layout={{
                labelCol: { span: 12 },
                wrapperCol: { span: 12 },
              }}>
              <DescriptionsItem label="全国性可流转仓单编号">
                {receiptNumber}
              </DescriptionsItem>
              <DescriptionsItem label="仓单运营平台电子仓单号">
                {platformReceiptNumber}
              </DescriptionsItem>
              <DescriptionsItem label="登记时间">{createTime}</DescriptionsItem>
            </Descriptions>
          );
        case '仓单发生转让':
          return (
            <Descriptions
              layout={{
                labelCol: { span: 12 },
                wrapperCol: { span: 12 },
              }}>
              <DescriptionsItem label="全国性可流转仓单编号">
                {receiptNumber}
              </DescriptionsItem>
              <DescriptionsItem label="仓单运营平台电子仓单号">
                {platformReceiptNumber}
              </DescriptionsItem>
              <DescriptionsItem label="转让人">{firstName}</DescriptionsItem>
              <DescriptionsItem label="受让人">{secondName}</DescriptionsItem>
              <DescriptionsItem label="转让时间">{createTime}</DescriptionsItem>
            </Descriptions>
          );
        case '仓单发生质押':
          return (
            <Descriptions
              layout={{
                labelCol: { span: 12 },
                wrapperCol: { span: 12 },
              }}>
              <DescriptionsItem label="全国性可流转仓单编号">
                {receiptNumber}
              </DescriptionsItem>
              <DescriptionsItem label="仓单运营平台电子仓单号">
                {platformReceiptNumber}
              </DescriptionsItem>
              <DescriptionsItem label="出质人">{firstName}</DescriptionsItem>
              <DescriptionsItem label="质权人">{secondName}</DescriptionsItem>
              <DescriptionsItem label="仓储物计量单位">
                {storageUnit}
              </DescriptionsItem>
              <DescriptionsItem label="仓储物数量">
                {storageCnt}
              </DescriptionsItem>
              <DescriptionsItem label="质押时间">{createTime}</DescriptionsItem>
            </Descriptions>
          );
        case '仓单发生解押':
          return (
            <Descriptions
              layout={{
                labelCol: { span: 12 },
                wrapperCol: { span: 12 },
              }}>
              <DescriptionsItem label="全国性可流转仓单编号">
                {receiptNumber}
              </DescriptionsItem>
              <DescriptionsItem label="仓单运营平台电子仓单号">
                {platformReceiptNumber}
              </DescriptionsItem>
              <DescriptionsItem label="出质人">{firstName}</DescriptionsItem>
              <DescriptionsItem label="质权人">{secondName}</DescriptionsItem>
              <DescriptionsItem label="仓储物计量单位">
                {storageUnit}
              </DescriptionsItem>
              <DescriptionsItem label="质押数量">{pledgeCnt}</DescriptionsItem>
              <DescriptionsItem label="解押数量">
                {unPledgeCnt}
              </DescriptionsItem>
              <DescriptionsItem label="解押时间">{createTime}</DescriptionsItem>
            </Descriptions>
          );
        case '仓单发生提货':
          return (
            <Descriptions
              layout={{
                labelCol: { span: 12 },
                wrapperCol: { span: 12 },
              }}>
              <DescriptionsItem label="全国性可流转仓单编号">
                {receiptNumber}
              </DescriptionsItem>
              <DescriptionsItem label="仓单运营平台电子仓单号">
                {platformReceiptNumber}
              </DescriptionsItem>
              <DescriptionsItem label="仓储物计量单位">
                {storageUnit}
              </DescriptionsItem>
              <DescriptionsItem label="提货数量">
                {pickUpGoodsCnt}
              </DescriptionsItem>
              <DescriptionsItem label="提货时间">{createTime}</DescriptionsItem>
            </Descriptions>
          );
        case '仓单已注销':
          return (
            <Descriptions
              layout={{
                labelCol: { span: 12 },
                wrapperCol: { span: 12 },
              }}>
              <DescriptionsItem label="全国性可流转仓单编号">
                {receiptNumber}
              </DescriptionsItem>
              <DescriptionsItem label="仓单运营平台电子仓单号">
                {platformReceiptNumber}
              </DescriptionsItem>
              <DescriptionsItem label="注销时间">{createTime}</DescriptionsItem>
            </Descriptions>
          );
        default:
          return null;
      }
    },
  },
  created() {
    this.getData();
  },
};
</script>
