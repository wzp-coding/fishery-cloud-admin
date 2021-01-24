import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入样式(element-ui和自己定义的global.css)
import './plugins/element'
import './assets/css/global.css'
// 导入字体图标
import './assets/fonts/iconfont.css'

// 安装vue-cookies
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

// 安装自定义指令
import Directives from "./libs/directives/index"
Vue.use(Directives)

// 封装axios并且把包挂载到原型对象上
import axiosObject from './libs/request'
Vue.use(axiosObject)

// 安装echarts并且全局挂载
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

// 导出表格
import JsonExcel from 'vue-json-excel'
Vue.component('downloadExcel', JsonExcel)

// 拖拽组件
import draggable from 'vuedraggable'
Vue.component('Draggable', draggable)

<<<<<<< HEAD




=======
>>>>>>> fa135045b6199ae14f69c69423437bc9be51d717
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
