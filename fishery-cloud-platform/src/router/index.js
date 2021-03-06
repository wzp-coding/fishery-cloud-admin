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

// 不需要权限的路由
const NoAuthRouters = ['/login', '/register', '/forgetPassword', '/info-farm-p', '/info-cold-p', '/info-logitis-p', '/info-plant-p']

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  NProgress.start();
  console.log('to.path: ', to.path);
  if (NoAuthRouters.includes(to.path)) {
    // 当跳转的页面不需要权限时，直接过
    next();
  } else if (!localStorage.getItem('token')) {
    // 当跳转到需要token的页面，且不带token，需要重新登录
    if (to.path == '/info-logitis-p' || to.path == '/info-farm-p' || to.path == '/info-cold-p' || to.path == 'info-plant-p') {
      next();
    }
    next('/login');
    Message.error('请您登录账户');
  } else if (to.path !== 'digital-base' && to.matched.length === 0) {
    // 此时已经正常进入页面了，处理一下非法跳转
    next('/digital-base');
    Message.error('无效路径');
  } else {
    // 合法的页面跳转
    next();
  }
})
router.afterEach(to => {
  NProgress.done();
})

export default router
