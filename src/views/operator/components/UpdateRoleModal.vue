<template>
  <a-modal
    :width="600"
    :visible="visible"
    title="修改操作员角色"
    :after-close="afterClose"
    :confirm-loading="submitting"
    @cancel="close"
    @ok="submit"
  >
    <a-form
      :form="form"
      class="layout-form"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 19 }"
    >
      <a-form-item required label="角色">
        <a-select
          v-decorator="roleIds"
          style="width: 380px;"
          placeholder="请选择角色"
          mode="multiple"
          allow-clear
        >
          <a-select-option
            v-for="(item, index) in roles"
            :key="index"
            :value="item.id"
          >
            {{ item.roleName }}
          </a-select-option>
        </a-select>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import formModal from 'mixins/formModal';
import { addUserRoleRelation, findOperatorRoleList } from 'api/role';

export default {
  name: 'UpdateRoleModal',
  mixins: [formModal],
  props: {
    userId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      roles: [],
    };
  },
  watch: {
    visible(val) {
      if (val) {
        this.getData();
      }
    },
  },
  beforeCreate() {
    this.roleIds = [
      'roleIds',
      {
        validateTrigger: 'blur',
        rules: [
          {
            validator: (_, value, callback) => {
              if (!value || value.length === 0) {
                callback('请选择角色');
              } else {
                callback();
              }
            },
          },
        ],
      },
    ];
  },
  methods: {
    async getData() {
      try {
        this.loading = true;
        this.roles = await findOperatorRoleList();
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    submit() {
      this.form.validateFields(async (errors, values) => {
        if (errors) return;
        try {
          this.submitting = true;
          await addUserRoleRelation({
            ...values,
            userId: this.userId,
          });
          this.$message.success('操作成功');
          this.close();
        } catch (error) {
          console.error(error);
        } finally {
          this.submitting = false;
        }
      });
    },
  },
};
</script>
