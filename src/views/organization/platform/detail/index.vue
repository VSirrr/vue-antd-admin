<template>
  <a-card :loading="loading" :bordered="false">
    <!-- 基本信息 -->
    <Descriptions
      title="基本信息"
      :layout="{
        labelCol: { span: 5 },
        wrapperCol: { span: 19 },
      }"
    >
      <!-- 基本信息——操作按钮 -->
      <template v-if="detail.platformStatus !== 3" #extra>
        <a-button
          type="primary"
          style="margin-right: 24px;"
          @click="addMark(detail)"
        >
          标注
        </a-button>
        <a-button-group>
          <a-button
            @click="$router.push(`/organization/platform/edit?id=${id}`)"
          >
            编辑
          </a-button>
          <a-button
            v-if="detail.platformStatus === 2"
            @click="platformEnable(detail)"
          >
            启用
          </a-button>
          <a-button v-else @click="platformDisable(detail)">停用</a-button>
          <a-button style="color: #d40000;" @click="platformClose(detail)">
            注销
          </a-button>
        </a-button-group>
      </template>
      <!-- 基本信息——内容 -->
      <DescriptionsItem label="创建时间">
        {{ detail.createTime }}
      </DescriptionsItem>
      <DescriptionsItem label="仓单运营平台编号">
        {{ detail.platformNumber }}
      </DescriptionsItem>
      <DescriptionsItem label="仓单运营平台名称">
        {{ detail.platformName }}
      </DescriptionsItem>
      <DescriptionsItem label="管理人（平台法人主体）">
        {{ detail.companyName }}
      </DescriptionsItem>
      <DescriptionsItem label="统一社会信用代码">
        {{ detail.companyOrgCode }}
      </DescriptionsItem>
      <DescriptionsItem label="经营地址">
        {{ detail.address }}
      </DescriptionsItem>
      <DescriptionsItem label="联系人">
        {{ detail.linkMan }}
      </DescriptionsItem>
      <DescriptionsItem label="联系方式">
        {{ detail.linkPhone }}
      </DescriptionsItem>
      <DescriptionsItem label="状态">
        {{ detail.platformStatusDesc }}
      </DescriptionsItem>
      <DescriptionsItem label="附件">
        <FileList :fileList="detail.fileList" />
      </DescriptionsItem>
    </Descriptions>
    <a-divider dashed />
    <!-- 注销信息 -->
    <template v-if="detail.platformStatus === 3">
      <Descriptions
        title="注销信息"
        :layout="{
          labelCol: { span: 5 },
          wrapperCol: { span: 19 },
        }"
      >
        <DescriptionsItem label="注销时间">
          {{ detail.updateTime }}
        </DescriptionsItem>
        <DescriptionsItem label="注销操作员">
          {{ detail.updateUserName }}
        </DescriptionsItem>
      </Descriptions>
      <a-divider dashed />
    </template>
    <!-- 标注信息 -->
    <Descriptions
      title="标注信息"
      :layout="{
        labelCol: { span: 5 },
        wrapperCol: { span: 19 },
      }"
    >
      <DescriptionsItem label="标注内容">
        <MarkList :markList="detail.markList" />
      </DescriptionsItem>

      <!-- 清除标注按钮 -->
      <template #extra v-if="showDeleteMark">
        <a-button @click="deleteMark(detail)">
          清除标注
        </a-button>
      </template>
    </Descriptions>
    <a-divider dashed />
    <!-- 下属仓单出具人列表 -->
    <ProviderListTable />
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
import FileList from 'components/FileList';
import { getPlatformDetail } from 'api/platform';
import ProviderListTable from './components/ProviderListTable';
import Descriptions, { DescriptionsItem } from 'components/Descriptions';

export default {
  name: 'Detail',
  mixins: [platform],
  components: {
    MarkList,
    FileList,
    Descriptions,
    DescriptionsItem,
    ProviderListTable,
  },
  props: ['id'],
  data() {
    return {
      detail: {},
      loading: false,
    };
  },
  computed: {
    showDeleteMark() {
      const { platformStatus, markList } = this.detail;
      return platformStatus !== 3 && markList && markList.length;
    },
  },
  methods: {
    // 获取详情信息
    async getData() {
      try {
        this.loading = true;
        this.detail = await getPlatformDetail({ id: this.id });
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
  },
  created() {
    this.getData();
  },
};
</script>
