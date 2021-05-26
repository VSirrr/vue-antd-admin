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
import dragModal from 'directives/drag-modal';

export default {
  name: 'DragModal',
  directives: {
    dragModal,
  },
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
