import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const state = {

  // 登录后获取到的用户信息
  userInfo: {},

  // 该用户的所有权限
  permissionList: [],

  // 该用户的基地信息
  baseInfo: {},

  // 有顺序的标准的标签菜单(永不修改且永久保存)
  stdNavbar: [
    { name: '我的基地', children: ['数字基地', '实况监控', '环境监测', '疾病诊断'] },
    { name: '渔业管理', children: ['池塘管理', '养殖建议', '农资管理', '种苗进货', '种苗信息', '投入品管理'] },
    { name: '设备管理', children: ['监控设备', '气象设备', '水质设备'] },
    { name: '养殖生产', children: ['冷库', '加工厂'] },
    { name: '订单物流', children: ['订单管理', '物流信息'] },
    { name: '基地管理', children: ['客户管理', '员工管理', '权限管理', '基地信息', '备忘录'] },
    { name: '领导仓', children: ['基地数据'] },
  ],

  shouldFlushNavbar: false
}

const mutations = {

  // 设置用户信息
  setUserInfo(state, data) {
    state.userInfo = data;
  },

  // 设置权限
  setPermissionList(state, data) {
    state.permissionList = data;
  },

  // 设置基地信息（一个用户一个基地）
  setBaseInfo(state, data) {
    state.baseInfo = data;
  },

  // 设置状态（true或false）来决定是否刷新菜单
  setShouldFlushNavbar(state, data) {
    state.shouldFlushNavbar = data;
  }
}
const getters = {

}
const actions = {

  // 重置State
  resetState({ commit }) {
    commit('setUserInfo', {})
    commit('setPermissionList', [])
    commit('setBaseInfo', {})
    commit('setShouldFlushNavbar', false)
  },

  // 根据roleId查询登录用户的权限，并存到vuex中
 async getFunctionByRoleId({ commit, state },vm) {
    // console.log('state: ', state);
    const { data: res } = await vm.$function.get(`/findFunction/${state.userInfo.roleId}`);
    console.log("getFunctionByRoleId: ", res);
    if (res.statusCode === 20000) {
      commit("setPermissionList", res.data);
    } else {
      console.error(res.message);
    }
  },
}
export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
