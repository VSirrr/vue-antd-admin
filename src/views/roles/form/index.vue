<template>
  <a-card :bordered="false">
    <a-spin :spinning="loading">
      <a-form
        :form="form"
        class="layout-form"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 19 }"
      >
        <a-form-item :wrapper-col="{ sm: { span: 19, offset: 5 } }">
          <h4 class="layout-form-title">
            {{ isEdit ? '角色信息编辑' : '角色信息录入' }}
          </h4>
        </a-form-item>
        <a-form-item required label="角色名称">
          <a-input
            v-decorator="roleName"
            allow-clear
            :max-length="50"
            autocomplete="off"
            style="width: 380px;"
            placeholder="请输入角色名称"
          />
        </a-form-item>
        <a-form-item required label="角色描述">
          <a-input
            v-decorator="roleDesc"
            allow-clear
            :max-length="300"
            autocomplete="off"
            style="width: 380px;"
            placeholder="请输入角色描述"
          />
        </a-form-item>
        <a-form-item required label="角色权限">
          <a-tree
            v-decorator="elementIds"
            checkable
            :selectable="false"
            :expanded-keys="expandedKeys"
            :auto-expand-parent="autoExpandParent"
            :tree-data="treeData"
            @expand="onExpand"
          />
        </a-form-item>
        <a-form-item :wrapper-col="{ sm: { span: 19, offset: 5 } }">
          <a-button type="primary" @click="submit">
            <!-- {{ isEdit ? '修改' : '添加' }} -->
            提交
          </a-button>
          <a-button style="margin-left: 24px;" @click="back">
            取消
          </a-button>
        </a-form-item>
      </a-form>
    </a-spin>
  </a-card>
</template>

<script>
import {
  addRole,
  editRole,
  toEditRole,
  addRoleElementsRelation,
  queryRoleElementsRelationList,
} from 'api/role';

export default {
  name: 'RoleForm',
  props: {
    id: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      treeData: [],
      loading: false,
      checkedKeys: [],
      expandedKeys: [],
      submitting: false,
      autoExpandParent: true,
    };
  },
  computed: {
    isEdit() {
      return this.$route.path === '/roles/edit';
    },
  },
  beforeCreate() {
    this.form = this.$form.createForm(this);
    this.roleName = [
      'roleName',
      {
        validateTrigger: 'blur',
        rules: [
          {
            required: true,
            message: '请输入角色名称',
          },
        ],
      },
    ];
    this.roleDesc = [
      'roleDesc',
      {
        validateTrigger: 'blur',
        rules: [
          {
            required: true,
            message: '请输入角色描述',
          },
        ],
      },
    ];
    this.elementIds = [
      'elementIds',
      {
        valuePropName: 'checkedKeys',
        validateTrigger: 'check',
        rules: [
          {
            validator: (rule, value, callback) => {
              if (!value || value.length === 0) {
                callback('请配置角色权限');
                return;
              }
              callback();
            },
          },
        ],
      },
    ];
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      try {
        const { id, isEdit } = this;
        const param = { id };
        // 编辑页面，根据 id 获取角色信息
        if (isEdit) {
          this.loading = true;
          const { roleName, roleDesc } = await toEditRole(param);
          this.form.setFieldsValue({ roleName, roleDesc });
        }
        // 获取角色权限树与已经配置的权限
        const {
          checkedKeys,
          elementsTrees,
        } = await queryRoleElementsRelationList(param);
        this.treeData = elementsTrees;
        this.checkedKeys = checkedKeys;
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    submit() {
      this.form.validateFields(async (errors, values) => {
        if (errors) return;
        const cb = this.isEdit ? editRole : addRole;
        try {
          this.submitting = true;
          const { roleName, roleDesc, elementIds } = values;
          await Promise.all([
            cb({ roleName, roleDesc }),
            addRoleElementsRelation({
              roleId: this.id,
              elementIds,
            }),
          ]);
          this.$message.success('操作成功');
          this.back();
        } catch (error) {
          console.error(error);
          const { retcode, msg } = error;
          if (retcode === 21000) {
            this.form.setFields({
              roleName: {
                value: values.roleName,
                errors: [new Error(msg)],
              },
            });
          }
        } finally {
          this.submitting = false;
        }
      });
    },
    onExpand(expandedKeys) {
      this.expandedKeys = expandedKeys;
      this.autoExpandParent = false;
    },
    onCheck(checkedKeys) {
      this.checkedKeys = checkedKeys;
    },
    back() {
      this.$router.back();
    },
  },
};
</script>
