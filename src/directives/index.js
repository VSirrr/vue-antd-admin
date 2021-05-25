import Vue from 'vue';
import dragModal from './drag-modal';
import clipboard from './clipboard';

Vue.directive('drag-modal', dragModal);
Vue.directive('clipboard', clipboard);
