<template>
  <a-card :loading="loading" :bordered="false">
    <!-- 基本信息 -->
    <Descriptions title="基本信息">
      <!-- 基本信息——下载按钮 -->
      <template #extra>
        <a-button
          @click="
            downloadFile(
              `/wr/downWarehouseReceiptDetail?warehouseReceiptId=${id}`,
            )
          "
        >
          下载
        </a-button>
      </template>
      <!-- 基本信息——内容 -->
      <a-row :gutter="24">
        <a-col :span="12">
          <DescriptionsItem label="登记时间">
            {{ detail.createTime }}
          </DescriptionsItem>
          <DescriptionsItem label="全国性可流转仓单编号">
            {{ detail.receiptNumber }}
          </DescriptionsItem>
          <DescriptionsItem label="仓单状态">
            {{ detail.receiptStatusDesc }}
          </DescriptionsItem>
          <DescriptionsItem label="仓单运营平台">
            {{ detail.platformName }}
          </DescriptionsItem>
          <DescriptionsItem label="仓单运营平台仓单号">
            {{ detail.platformReceiptNumber }}
          </DescriptionsItem>
          <DescriptionsItem label="仓单填发日期">
            {{ detail.issuanceTime }}
          </DescriptionsItem>
          <DescriptionsItem label="存货人（仓单持有人）">
            {{ detail.depositorName }}
          </DescriptionsItem>
          <DescriptionsItem label="保管人（仓单出具人）">
            {{ detail.provideName }}
          </DescriptionsItem>
          <DescriptionsItem label="保管仓库名称">
            {{ detail.warehouseName }}
          </DescriptionsItem>
          <DescriptionsItem label="保管仓库地址">
            {{ detail.warehouseAddress }}
          </DescriptionsItem>
          <DescriptionsItem label="HASH值">
            {{ detail.hashVal }}
          </DescriptionsItem>
          <DescriptionsItem label="备注">
            {{ detail.content }}
          </DescriptionsItem>
        </a-col>
        <a-col :span="12">
          <DescriptionsItem label="仓储物名称">
            {{ detail.storageName }}
          </DescriptionsItem>
          <DescriptionsItem label="仓储物规格">
            {{ detail.storageSpecs }}
          </DescriptionsItem>
          <DescriptionsItem label="仓储物计量单位">
            {{ detail.storageUnit }}
          </DescriptionsItem>
          <DescriptionsItem label="仓储物价格">
            {{ detail.storagePrice }}
          </DescriptionsItem>
          <DescriptionsItem label="仓储物数量">
            {{ detail.storageCnt }}
          </DescriptionsItem>
          <DescriptionsItem label="仓储物标记">
            {{ detail.storageTag }}
          </DescriptionsItem>
          <DescriptionsItem label="仓储物损耗标准">
            {{ detail.storageLossStandard }}
          </DescriptionsItem>
          <DescriptionsItem label="仓储费率">
            {{ detail.storageRate }}
          </DescriptionsItem>
          <DescriptionsItem label="关联仓储合同号">
            {{ detail.contractNo }}
          </DescriptionsItem>
          <DescriptionsItem label="储存期间">
            {{ detail.storagePeriod }}
          </DescriptionsItem>
          <DescriptionsItem label="货物到期日">
            {{ detail.expiringDate }}
          </DescriptionsItem>
          <DescriptionsItem label="保险信息">
            <ul v-if="detail.insuranceList && detail.insuranceList.length">
              <li v-for="(item, index) in detail.insuranceList" :key="index">
                险种：{{ item.insurance }}，单号：{{ item.insurance }}，
                承保人：{{ item.insurance }}
              </li>
            </ul>
          </DescriptionsItem>
          <DescriptionsItem label="商检信息">
            <ul v-if="detail.testOrgList && detail.testOrgList.length">
              <li v-for="(item, index) in detail.testOrgList" :key="index">
                检验证书号：{{ item.inspectionNo }}，商检机构：
                {{ item.orgName }}
              </li>
            </ul>
          </DescriptionsItem>
          <DescriptionsItem label="附件">
            <FileList :fileList="detail.fileList" />
          </DescriptionsItem>
        </a-col>
      </a-row>
    </Descriptions>
    <a-divider dashed />
    <template v-if="detail.receiptStatus !== 1">
      <!-- 正常(1),质押审批中(2),已质押(3),解押审批中(4),转让中(5),提货中(6),注销中(7),已注销(8) -->
      <!-- 申请质押详情 -->
      <Descriptions title="申请质押详情" v-if="detail.receiptStatus === 2">
        <a-row>
          <a-col :span="12">
            <DescriptionsItem label="出质人">
              {{ detail.role.firstName }}
            </DescriptionsItem>
            <DescriptionsItem label="质权人">
              {{ detail.role.secondName }}
            </DescriptionsItem>
            <DescriptionsItem label="仓储物计量单位">
              {{ detail.role.storageUnit }}
            </DescriptionsItem>
            <DescriptionsItem label="质押数量">
              {{ detail.role.operateCnt }}
            </DescriptionsItem>
            <DescriptionsItem label="申请质押时间">
              {{ detail.role.createTime }}
            </DescriptionsItem>
          </a-col>
        </a-row>
      </Descriptions>
      <!-- 质押详情 -->
      <Descriptions title="质押详情" v-if="detail.receiptStatus === 3">
        <a-row>
          <a-col :span="12">
            <DescriptionsItem label="出质人">
              {{ detail.role.firstName }}
            </DescriptionsItem>
            <DescriptionsItem label="质权人">
              {{ detail.role.secondName }}
            </DescriptionsItem>
            <DescriptionsItem label="仓储物计量单位">
              {{ detail.role.storageUnit }}
            </DescriptionsItem>
            <DescriptionsItem label="质押数量">
              {{ detail.role.operateCnt }}
            </DescriptionsItem>
            <DescriptionsItem label="质押时间">
              {{ detail.role.createTime }}
            </DescriptionsItem>
          </a-col>
        </a-row>
      </Descriptions>
      <!-- 申请解押详情 -->
      <Descriptions title="申请解押详情" v-if="detail.receiptStatus === 4">
        <a-row>
          <a-col :span="12">
            <DescriptionsItem label="出质人">
              {{ detail.role.firstName }}
            </DescriptionsItem>
            <DescriptionsItem label="质权人">
              {{ detail.role.secondName }}
            </DescriptionsItem>
            <DescriptionsItem label="仓储物计量单位">
              {{ detail.role.storageUnit }}
            </DescriptionsItem>
            <DescriptionsItem label="质押数量">
              {{ detail.role.pledgeCnt }}
            </DescriptionsItem>
            <DescriptionsItem label="申请解押数量">
              {{ detail.role.operateCnt }}
            </DescriptionsItem>
            <DescriptionsItem label="申请解押时间">
              {{ detail.role.createTime }}
            </DescriptionsItem>
          </a-col>
        </a-row>
      </Descriptions>
      <!-- 申请转让详情 -->
      <Descriptions title="申请转让详情" v-if="detail.receiptStatus === 5">
        <a-row>
          <a-col :span="12">
            <DescriptionsItem label="转让人">
              {{ detail.role.firstName }}
            </DescriptionsItem>
            <DescriptionsItem label="受让人">
              {{ detail.role.secondName }}
            </DescriptionsItem>
            <DescriptionsItem label="申请转让时间">
              {{ detail.role.createTime }}
            </DescriptionsItem>
          </a-col>
        </a-row>
      </Descriptions>
      <!-- 申请提货详情 -->
      <Descriptions title="申请提货详情" v-if="detail.receiptStatus === 6">
        <a-row>
          <a-col :span="12">
            <DescriptionsItem label="仓储物计量单位">
              {{ detail.role.storageUnit }}
            </DescriptionsItem>
            <DescriptionsItem label="申请提货数量">
              {{ detail.role.operateCnt }}
            </DescriptionsItem>
            <DescriptionsItem label="申请提货时间">
              {{ detail.role.createTime }}
            </DescriptionsItem>
          </a-col>
        </a-row>
      </Descriptions>
      <!-- 申请注销详情 -->
      <Descriptions title="申请注销详情" v-if="detail.receiptStatus === 7">
        <a-row>
          <a-col :span="12">
            <DescriptionsItem label="申请注销时间">
              {{ detail.role.createTime }}
            </DescriptionsItem>
          </a-col>
        </a-row>
      </Descriptions>
      <!-- 注销详情 -->
      <Descriptions title="注销详情" v-if="detail.receiptStatus === 8">
        <a-row>
          <a-col :span="12">
            <DescriptionsItem label="注销时间">
              {{ detail.role.createTime }}
            </DescriptionsItem>
          </a-col>
        </a-row>
      </Descriptions>
      <a-divider dashed />
    </template>
    <!-- 标注信息 -->
    <Descriptions title="标注信息">
      <a-row>
        <a-col :span="12">
          <DescriptionsItem label="标注内容">
            <MarkList :markList="detail.markList" />
          </DescriptionsItem>
        </a-col>
      </a-row>
    </Descriptions>
    <a-divider dashed />
    <!-- 仓单历史记录 -->
    <HistoryRecordTable />
  </a-card>
</template>

<script>
import { downloadFile } from 'utils';
import MarkList from 'components/MarkList';
import FileList from 'components/FileList';
import { getWarehouseReceiptDetail } from 'api/wr';
import HistoryRecordTable from './components/HistoryRecordTable';
import Descriptions, { DescriptionsItem } from 'components/Descriptions';

export default {
  name: 'Detail',
  components: {
    MarkList,
    FileList,
    Descriptions,
    DescriptionsItem,
    HistoryRecordTable,
  },
  props: ['id'],
  data() {
    return {
      detail: {},
      loading: false,
    };
  },
  methods: {
    // 获取详情信息
    async getData() {
      try {
        this.loading = true;
        this.detail = await getWarehouseReceiptDetail({ id: this.id });
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    // 下载文件
    downloadFile,
  },
  created() {
    this.getData();
  },
};
</script>
