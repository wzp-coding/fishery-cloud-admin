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

// 安装axios并且把包挂载到原型对象上
import axios from 'axios'
Vue.prototype.$http = axios

// 安装echarts并且全局挂载
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

// 导出表格
import JsonExcel from 'vue-json-excel'
Vue.component('downloadExcel', JsonExcel)

// 配置请求的根路径
axios.defaults.baseURL = 'http://106.75.154.40:9012/traceability'
// 配置权限根路径
Vue.prototype.$limit = 'http://106.75.154.40:9003'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
