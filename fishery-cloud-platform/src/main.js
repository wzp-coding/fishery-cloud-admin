import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element'
import echarts from 'echarts'

// 导入全局样式表
import './assets/css/global.css'
import VueCookies from 'vue-cookies'
// 导入包
import axios from 'axios'
import defines from './config'
// 导入字体图标
import './assets/fonts/iconfont.css'
// 导出表格
import JsonExcel from 'vue-json-excel'
Vue.component('downloadExcel', JsonExcel)

Vue.use(VueCookies)
// 配置请求的根路径

axios.defaults.baseURL = 'http://106.75.154.40:9012/traceability'

// 配置权限根路径
Vue.prototype.$limit = 'http://106.75.154.40:9003'

// 把包挂载到原型对象上：
Vue.prototype.$http = axios
// 从路径获取当前基地id
Vue.prototype.defines = defines
// 全局挂载echarts
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
