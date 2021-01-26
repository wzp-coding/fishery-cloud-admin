import Vue from 'vue'
import VueRouter from 'vue-router'
import { Message } from 'element-ui';
import breedBaseManagement_CCY from './breedBaseManagement_CCY'
import environmentalMonitor_YZC from './environmentalMonitor_YZC'
import processPlant_LJC from './processPlant_LJC'
import coldStorage_LJC from './coldStorage_LJC'
import logisticsSystem_CGX from './logisticsSystem_CGX'
import userInfo_WZP from './userInfo_WZP'

// 引入视图
import Home from '../views/Home.vue'

// 路由加载进度条
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
Vue.use(VueRouter)


const routes = [
  // 用户登录注册、个人信息
  ...userInfo_WZP,
  // 主页界面
  {
    path: '/home',
    name: 'home',
    component: Home,
    children: [
      ...breedBaseManagement_CCY,
      ...environmentalMonitor_YZC,
      ...processPlant_LJC,
      ...coldStorage_LJC,
      ...logisticsSystem_CGX,
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  NProgress.start();
  // if (to.path !== '/login' && !localStorage.getItem('token')) {
  //   next('/login');
  //   Message.error('请您登录账户');  
  // } else if (to.path !== 'digital-base' && to.matched.length === 0) {
  //   next('/digital-base');
  //   Message.error('无效路径');
  // } else {
    next();
  // }
})
router.afterEach(to => {
  NProgress.done();
})

// console.log(routes);
// 解决路由访问重复时报错问题：
// const originalPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err)
// }
export default router
