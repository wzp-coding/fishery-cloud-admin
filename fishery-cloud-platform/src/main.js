import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入组件库和样式(element-ui和自己定义的global.css)
import './plugins/element'
import './assets/css/global.css'
// 导入字体图标
import './assets/fonts/iconfont.css'

// 安装vue-cookies
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

// 导入全局注册的自定义组件
import './util/components'

// 安装自定义指令
import Directives from "./util/directives/index"
Vue.use(Directives)

// 封装axios并且把包挂载到原型对象上
import axiosObject from './util/request'
Vue.use(axiosObject)

// 安装lodash
import lodash from './util/lodash';
Vue.use(lodash);

// 安装echarts并且全局挂载
import echarts from 'echarts'
Vue.prototype.$echarts = echarts



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
