import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const state = {
  // 权限对像
  permissionList: JSON.parse(localStorage.getItem("permissionList") || "{}"),
  // 权限同意列表
  permissionVisable: {
    // 池塘管理
    traceability_pond: false,
    traceability_pond_add: false,
    traceability_pond_delete: false,
    traceability_pond_update: false,
    traceability_pond_select: false,
    //  农资管理
    traceability_agricultural: false,
    traceability_agricultural_add: false,
    traceability_agricultural_delete: false,
    traceability_agricultural_update: false,
    traceability_agricultural_select: false,
    // 虾苗进货
    traceability_shrimp: false,
    traceability_shrimp_add: false,
    traceability_shrimp_delete: false,
    traceability_shrimp_update: false,
    traceability_shrimp_select: false,
    // 虾苗信息
    traceability_shrimpInfo: false,
    traceability_shrimpInfo_add: false,
    traceability_shrimpInfo_delete: false,
    traceability_shrimpInfo_update: false,
    traceability_shrimpInfo_select: false,
    // 投入品管理
    traceability_inputs: false,
    traceability_inputs_add: false,
    traceability_inputs_delete: false,
    traceability_inputs_update: false,
    traceability_inputs_select: false,
    // 监控设备
    traceability_monitor: false,
    traceability_monitor_add: false,
    traceability_monitor_delete: false,
    traceability_monitor_update: false,
    traceability_monitor_select: false,
    // 气象设备
    traceability_atmosphere: false,
    traceability_atmosphere_add: false,
    traceability_atmosphere_delete: false,
    traceability_atmosphere_update: false,
    traceability_atmosphere_select: false,
    // 水质设备
    traceability_waterquality: false,
    traceability_waterquality_add: false,
    traceability_waterquality_delete: false,
    traceability_waterquality_update: false,
    traceability_waterquality_select: false,
    // 冷库
    traceability_refrigeratory: false,
    traceability_refrigeratory_add: false,
    traceability_refrigeratory_delete: false,
    traceability_refrigeratory_update: false,
    traceability_refrigeratory_select: false,
    // 加工厂
    traceability_process: false,
    traceability_process_add: false,
    traceability_process_delete: false,
    traceability_process_update: false,
    traceability_process_select: false,
    // 产品信息
    traceability_product: false,
    traceability_product_add: false,
    traceability_product_delete: false,
    traceability_product_update: false,
    traceability_product_select: false,
  }
}

const mutations = {
  // 设置权限
  setPermissionList(state, data) {
    state.permissionList = data
    window.localStorage.setItem('permissionList', JSON.stringify(data))
    // console.log('data: ', data);
    // 先将权限重置，以免上一次的用户权限影响下一次的用户权限
    for (let key in state.permissionVisable) {
      state.permissionVisable[key] = false
    }
    // 设置JSON条件如果传入的data不会空对象则进入循环
    if (JSON.stringify(data) != '{}' && data.children.length != 0) {
      data.children.forEach((item) => {
        let name = item.name
        state.permissionVisable[name] = true
        if (item.children.length != 0) {
          item.children.forEach((itemInner) => {
            let name = itemInner.name
            state.permissionVisable[name] = true
          })
        }
      })
    }
    // console.log('state.permissionVisable: ', state.permissionVisable);
  }
}
export default new Vuex.Store({
  state,
  mutations
})
