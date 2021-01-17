import Vue from 'vue'
import VueRouter from 'vue-router'
import CCY from './breedBaseManagement_CCY'
import YZC from './environmentalMonitor_YZC'
import LJC from './processPlant_coldStorage_LJC'
import CGX from './logisticsSystem_CGX'
Vue.use(VueRouter)
const routes = [
  ...CCY,
  ...CGX,
  ...YZC,
  ...LJC,
]
console.log(routes);
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
