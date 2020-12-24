<template>
  <a-layout class="basic-layout">
    <!-- 侧边栏 -->
    <a-layout-sider
      collapsible
      :width="256"
      theme="light"
      :trigger="null"
      breakpoint="lg"
      class="basic-layout-sider"
      @collapse="siderCollapse"
    >
      <!-- logo -->
      <div class="logo">
        <img src="@/assets/img/logo.png" alt="logo" /> vue-antd-admin
      </div>
      <!-- 菜单 -->
      <a-menu
        mode="inline"
        :openKeys.sync="openKeys"
        :selectedKeys="selectedKeys"
        @openChange="openChange"
      >
        <menu-item v-for="item in menus" :route="item" :key="item.path" />
      </a-menu>
    </a-layout-sider>
    <!-- 右侧 -->
    <a-layout
      class="basic-layout-main"
      :style="{ paddingLeft: collapsed ? '80px' : '256px' }"
    >
      <!-- header -->
      <div
        class="basic-layout-main-header"
        :style="{ left: collapsed ? '80px' : '256px' }"
      >
        <a-layout-header>
          <span v-show="userName"> 操作员：{{ userName }} </span>
          <a-icon class="logout" type="logout" @click="logoutConfirm" />
        </a-layout-header>
        <!-- breadcrumb -->
        <breadcrumb />
      </div>
      <!-- 内容区 -->
      <a-layout class="basic-layout-main-content">
        <router-view />
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script>
import { routes } from '@/router';
import MenuItem from './components/MenuItem';
import { mapGetters, mapActions } from 'vuex';
import Breadcrumb from './components/Breadcrumb';

export default {
  name: 'BasicLayout',
  components: {
    MenuItem,
    Breadcrumb,
  },
  data() {
    return {
      openKeys: [],
      selectedKeys: [],
      collapsed: false,
      cacheOpenKeys: [],
    };
  },
  computed: {
    ...mapGetters([/* 'routes', */ 'userName']),
    menus() {
      // const { routes } = this;
      if (routes.length) {
        return routes[0].children;
      }
      return routes;
    },
  },
  methods: {
    ...mapActions('user', ['logout']),
    openChange(openKeys) {
      this.openKeys = openKeys;
    },
    siderCollapse(collapsed) {
      this.collapsed = collapsed;
    },
    // 确认是否退出
    logoutConfirm() {
      this.$confirm({
        title: '提示',
        icon: () => (
          <a-icon
            style="color: #faad14;"
            type="exclamation-circle"
            theme="filled"
          />
        ),
        content: '您确定要退出吗？',
        onOk: this.logout,
      });
    },
  },
  watch: {
    $route: {
      handler(route) {
        const { matched } = route;
        const path = matched.map(item => item.path);
        this.selectedKeys = path;
        this.openKeys = path;
        this.cacheOpenKeys = path;
      },
      immediate: true,
    },
    collapsed: {
      handler(val) {
        if (val) {
          this.cacheOpenKeys = this.openKeys;
          this.openKeys = [];
        } else {
          this.openKeys = this.cacheOpenKeys;
        }
      },
      immediate: true,
    },
  },
};
</script>

<style lang="less" scoped>
.basic-layout {
  min-height: 100%;
  &-sider {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    z-index: 10;
    overflow-x: hidden;
    overflow-y: auto;
    .logo {
      padding: @padding-sm @padding-lg;
      height: @layout-header-height;
      line-height: @layout-header-height - 2 * @padding-sm;
      border-bottom: 1px solid #e8e8e8;
      font-size: 20px;
      font-weight: 700;
      overflow: hidden;
      img {
        height: 100%;
      }
    }
    /deep/ .ant-menu {
      border-right: 0 !important;
    }
  }
  &-main {
    transition: all 0.2s;
    &-header {
      position: fixed;
      top: 0;
      right: 0;
      z-index: 9;
      transition: all 0.2s;
      border-left: 1px solid #e8e8e8;
      /deep/ .ant-layout-header {
        padding: 0 @padding-lg;
        background: @white;
        text-align: right;
        border-bottom: 1px solid #e8e8e8;
      }
      .logout {
        margin-left: @padding-lg;
        color: #ccc;
        font-size: 20px;
        cursor: pointer;
        vertical-align: -5px;
      }
    }
    &-content {
      margin-top: 119px;
      padding: @padding-lg;
    }
  }
}
</style>
