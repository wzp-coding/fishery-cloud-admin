import Vue from 'vue'
// 导出表格
import JsonExcel from 'vue-json-excel'
Vue.component('downloadExcel', JsonExcel)

// 面包屑
import Breadcrumb from "../components/public_components/Breadcrumb.vue"
Vue.component("Breadcrumb", Breadcrumb);

// 上传文件
import UploadFile from '../components/public_components/UploadFile.vue';
Vue.component('UploadFile', UploadFile)

// 拖拽相关组件
import draggable from 'vuedraggable'
Vue.component('Draggable', draggable)
import DraggableWrap from '../components/public_components/DraggableWrap.vue';
Vue.component('DraggableWrap', DraggableWrap)
import ChooseModule from '../components/public_components/ChooseModule.vue';
Vue.component('ChooseModule', ChooseModule)
import More from '../components/public_components/More.vue';
Vue.component('More', More)
