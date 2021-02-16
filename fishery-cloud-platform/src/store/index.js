import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const state = {

  // 登录后获取到的用户信息
  userInfo: {},

  // 该用户的所有权限
  permissionList: [],

  // 该用户的基地信息
  baseInfo:{}
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
  setBaseInfo(state,data){
    state.baseInfo = data;
  }
}
export default new Vuex.Store({
  state,
  mutations
})
