import Vue from 'vue'
// 导出表格
import JsonExcel from 'vue-json-excel'
// 拖拽组件
import draggable from 'vuedraggable'
// 面包屑
import Breadcrumb from "../components/public_components/Breadcrumb.vue"
import DraggableWrap from '../components/public_components/DraggableWrap.vue';
Vue.component("Breadcrumb", Breadcrumb);
Vue.component('downloadExcel', JsonExcel)
Vue.component('Draggable', draggable)
Vue.component('DraggableWrap', DraggableWrap)