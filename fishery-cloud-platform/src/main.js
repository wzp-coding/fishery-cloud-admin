import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入组件库和样式(element-ui和自己定义的global.css)
import './plugins/element'
import './assets/less/global.less'
// 导入字体图标
import './assets/fonts/iconfont.css'
// 导入主题
import './assets/theme/index.js'

// 封装axios并且把包挂载到原型对象上
import axiosObject from './util/request/index'
Vue.use(axiosObject)

// 导入全局注册的自定义组件
import './util/components'

// 安装自定义指令
import directives from './util/directives/index';
Vue.use(directives)

// 安装过滤器
import filters from './util/filters/index';
Vue.use(filters)

// 安装lodash
import lodash from './util/lodash';
Vue.use(lodash);

// 安装echarts并且全局挂载
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

// 给所有组件添加一个save方法，用于保存拖拽模块
// 给自己的组件data选项声明（变量名要一致）：modules:[],moduleChecked:[]
Vue.mixin({
  methods: {
    save(viewsName, yourName) {
      if (!localStorage.getItem(`${yourName}-${viewsName}-modules`)) {
        // 第一次载入页面
        this.moduleChecked = this.modules.filter(
          (item) => item.checked
        );
      } else {
        // 第二次以后载入页面，获取上次保存的自定义视图
        this.modules = JSON.parse(
          localStorage.getItem(`${yourName}-${viewsName}-modules`)
        );
        this.moduleChecked = JSON.parse(
          localStorage.getItem(`${yourName}-${viewsName}-checked`)
        );
      }
    }
  },
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
