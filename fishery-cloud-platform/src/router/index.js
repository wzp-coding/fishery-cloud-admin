import Vue from 'vue'
import VueRouter from 'vue-router'
import {Message} from 'element-ui';
import CCY from './breedBaseManagement_CCY'
import YZC from './environmentalMonitor_YZC'
import LJC from './processPlant_coldStorage_LJC'
import CGX from './logisticsSystem_CGX'
// 引入视图
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
// 引入默认展示的子组件
import DigitalBase from '../views/DigitalBase.vue'
Vue.use(VueRouter)
const routes = [
  // 第一次进入页面重定向到登录页面
  {
    path: '/',
    redirect: '/login'
  },
  {
    //登陆界面
    path: '/login',
    name: 'login',
    component: Login
  },
  // 跳转到首页时，重定向到第一个子菜单
  {
    path: '/home',
    name: 'home',
    component: Home,
    children:[
      {
        path:'',
        component: DigitalBase
      },
      ...CCY,
      ...CGX,
      ...YZC,
      ...LJC,
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
// 挂在路由导航守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/digital-base' && window.localStorage.getItem('token') == null) {
    next()
  } else if (to.path === '/login' && window.localStorage.getItem('token') == null) {
    next()
  } else if (to.path === '/login' && (window.localStorage.getItem('token') !== null || window.localStorage.getItem('token') !== undefined)) {
    next('/digital-base')
  } else if (window.localStorage.getItem('token') == null) {
    next('/login')
    Message.error('请登录！！')
  } else {
    if (to.matched.length === 0) {
      Message.error('无效路径')
      next('/digital-base')
    } else {
      next()
    }
  }
})

console.log(routes);
// 解决路由访问重复时报错问题：
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
export default router
