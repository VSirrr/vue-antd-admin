<template>
  <div class="dashboard">
    <a-card title="数据统计" :bordered="false">
      <a-row>
        <a-col :sm="24" :lg="12">
          <div class="circle">
            <div class="circle-info">
              <h4 class="circle-info-title">已登记仓单</h4>
              <div class="circle-info-num">
                <Amount :value="statistics.receipt" :precision="0" />
              </div>
            </div>
          </div>
        </a-col>
        <a-col :sm="24" :lg="12">
          <div class="circle">
            <ul class="circle-list">
              <li class="circle-list-item">
                <label>平台总数：</label>
                <Amount :value="statistics.platform" :precision="0" />
              </li>
              <li class="circle-list-item">
                <label>出具人总数：</label>
                <Amount :value="statistics.provide" :precision="0" />
              </li>
              <li class="circle-list-item">
                <label>仓库总数：</label>
                <Amount :value="statistics.warehouse" :precision="0" />
              </li>
            </ul>
          </div>
        </a-col>
      </a-row>
    </a-card>
    <a-card style="margin-top: 24px;" title="快捷操作" :bordered="false">
      <Card to="/organization/platform">
        仓单运营平台管理
      </Card>
      <Card to="/organization/provider">
        仓单出具人管理
      </Card>
      <Card to="/organization/warehouse">
        仓库管理
      </Card>
      <Card to="/organization/warehouseStatus">
        仓库现状表
      </Card>
      <Card to="/users">
        查询用户管理
      </Card>
    </a-card>
  </div>
</template>

<script>
import Card from './components/Card';
import Amount from 'components/Amount';
import { getStatistics } from 'api/data';

export default {
  name: 'Dashboard',
  components: {
    Card,
    Amount,
  },
  data() {
    return {
      loading: false,
      statistics: {
        receipt: 0,
        provide: 0,
        platform: 0,
        warehouse: 0,
      },
    };
  },
  methods: {
    async getData() {
      this.statistics = await getStatistics();
    },
  },
  created() {
    this.getData();
  },
};
</script>

<style lang="less" scoped>
.dashboard {
  /deep/ .ant-card-head {
    border-bottom: 0;
    &-title {
      font-size: 20px;
      font-weight: 700;
    }
  }
  /deep/ .ant-row {
    margin: 0 10%;
  }
  /deep/ .ant-col {
    margin: @padding-lg 0;
  }
  .circle {
    margin: 0 auto;
    width: 240px;
    height: 240px;
    border: 10px solid #d2d4dd;
    border-radius: 50%;
    overflow: hidden;
    &-info {
      margin-top: 70px;
      &-title {
        margin-bottom: 24px;
        font-size: 18px;
        font-weight: 700;
        text-align: center;
      }
      &-num {
        font-size: 26px;
        color: #969799;
        text-align: center;
      }
    }
    &-list {
      margin-top: 60px;
      &-item {
        margin: @padding-sm 0;
        font-size: 16px;
        color: #969799;
        & > label {
          display: inline-block;
          width: 120px;
          font-weight: 700;
          text-align: right;
          color: #323233;
        }
      }
    }
  }
}
</style>
