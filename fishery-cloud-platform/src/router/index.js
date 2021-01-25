import Vue from 'vue'
import VueRouter from 'vue-router'
import { Message } from 'element-ui';
import CCY from './breedBaseManagement_CCY'
import YZC from './environmentalMonitor_YZC'
import LJC from './processPlant_coldStorage_LJC'
import CGX from './logisticsSystem_CGX'
// 引入视图
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
// 进度条
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
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
    component: Login,
    beforeEnter: async (to, from, next) => {
      // console.log(Vue.prototype.$originAxios);
      // 获取本地坐标和详细地址
      let { data: res } = await Vue.prototype.$originAxios.get("/api/ws/location/v1/ip?key=4YUBZ-GEPK4-6URUL-DV5B4-Q3IWE-EZBCJ&ip=" + localStorage.getItem('Ip'))
      res = res.result;
      const location = res.location;
      localStorage.setItem("location",JSON.stringify(location));
      res = res.ad_info;
      const address = res.nation + res.province + res.city + res.district;
      localStorage.setItem("address",address);
      next();
    }
  },
  // 主页界面
  {
    path: '/home',
    name: 'home',
    component: Home,
    children: [
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
// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  NProgress.start();
  if (to.path !== '/login' && !localStorage.getItem('token')) {
    next('/login');
    Message.error('请您登录账户');  
  } else if (to.path !== 'digital-base' && to.matched.length === 0) {
    next('/digital-base');
    Message.error('无效路径');
  } else {
    next();
  }
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
