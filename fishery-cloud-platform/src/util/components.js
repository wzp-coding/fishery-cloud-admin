import Vue from 'vue'
// 导出表格
// import JsonExcel from 'vue-json-excel'
Vue.component('downloadExcel', ()=>import(/* wabpackChunkName:"global-components" */'vue-json-excel'))

// 面包屑
// import Breadcrumb from "../components/public_components/Breadcrumb.vue"
Vue.component("Breadcrumb", ()=>import(/* wabpackChunkName:"global-components" */'../components/public_components/Breadcrumb.vue'));

// 上传文件
// import UploadFile from '../components/public_components/UploadFile.vue';
Vue.component('UploadFile', ()=>import(/* wabpackChunkName:"global-components" */'../components/public_components/UploadFile.vue'))

// 拖拽相关组件
Vue.component('Draggable', () => import(/* webpackChunkName:"global-components" */'vuedraggable'))
Vue.component('DraggableWrap', ()=>import(/* wabpackChunkName:"global-components" */'../components/public_components/DraggableWrap.vue'))
Vue.component('ChooseModule', ()=>import(/* wabpackChunkName:"global-components" */'../components/public_components/ChooseModule.vue'))
Vue.component('More', ()=>import(/* wabpackChunkName:"global-components" */'../components/public_components/More.vue'))
// import draggable from 'vuedraggable'
// import DraggableWrap from '../components/public_components/DraggableWrap.vue';
// import ChooseModule from '../components/public_components/ChooseModule.vue';
// import More from '../components/public_components/More.vue';
// 地图组件
Vue.component('Map', () => import(/* wabpackChunkName:"global-components" */'../components/public_components/Map.vue'))
Vue.component('MyLocationPicker', () => import(/* wabpackChunkName:"global-components" */'../components/public_components/MyLocationPicker.vue'))
