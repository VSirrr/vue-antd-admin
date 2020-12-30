import Vue from 'vue';
// ant-design-vue 的所有组件链接地址 https://github.com/vueComponent/ant-design-vue/blob/next/components/index.ts
import {
  Alert,
  Badge,
  Breadcrumb,
  Button,
  Card,
  Checkbox,
  Col,
  DatePicker,
  Form,
  FormModel,
  Icon,
  Input,
  Layout,
  Menu,
  Modal,
  Pagination,
  Popconfirm,
  Popover,
  Radio,
  Row,
  Select,
  Skeleton,
  Spin,
  Steps,
  Table,
  Tabs,
  Tag,
  TimePicker,
  Tooltip,
  Upload,
  ConfigProvider,
  Empty,
  Result,
  Descriptions,
  message,
  notification,
} from 'ant-design-vue';
import PageLoading from 'components/PageLoading';

// 最大显示数, 超过限制时，最早的消息会被自动关闭
message.config({ maxCount: 1 });

// https://github.com/vueComponent/ant-design-vue/issues/2592
if ('ActiveXObject' in window) {
  Input.methods.handleReset = function() {
    this.stateValue = '';
    this.$emit('change.value', '');
  };
}

const components = [
  Alert,
  Badge,
  Breadcrumb,
  Button,
  Card,
  Checkbox,
  Col,
  DatePicker,
  Form,
  FormModel,
  Icon,
  Input,
  Layout,
  Menu,
  Modal,
  Pagination,
  Popconfirm,
  Popover,
  Radio,
  Row,
  Select,
  Skeleton,
  Spin,
  Steps,
  Table,
  Tabs,
  Tag,
  TimePicker,
  Tooltip,
  Upload,
  ConfigProvider,
  Empty,
  Result,
  Descriptions,
  PageLoading,
];

components.map(component => {
  Vue.use(component);
});

Vue.prototype.$message = message;
Vue.prototype.$notification = notification;
Vue.prototype.$info = Modal.info;
Vue.prototype.$success = Modal.success;
Vue.prototype.$error = Modal.error;
Vue.prototype.$warning = Modal.warning;
Vue.prototype.$confirm = Modal.confirm;
Vue.prototype.$destroyAll = Modal.destroyAll;
