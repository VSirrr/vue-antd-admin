<template>
  <div>
    <a-button type="primary" @click="showModal">
      显示 Modal
    </a-button>

    <a-modal
      v-drag-modal
      title="DragModal"
      :visible="visible"
      @ok="hideModal"
      @cancel="hideModal"
    >
      <p>DragModal</p>
      <p>DragModal</p>
      <p>DragModal</p>
      <p>DragModal</p>
      <p>DragModal</p>
      <p>DragModal</p>
      <p>DragModal</p>
    </a-modal>
  </div>
</template>

<script>
export default {
  name: 'DragModal',
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    showModal() {
      this.visible = true;
    },
    hideModal() {
      this.visible = false;
    },
  },
};
</script>

<style lang="less" scoped></style>
