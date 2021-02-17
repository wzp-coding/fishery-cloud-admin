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

  // 主题颜色
  themes: {
    deepBlue: {
      header: "background:#062f4f;color:#fff",
      navbar: { backgroundColor: "#0d3b53", textColor: "#fff", activeTextColor: "#3e95ee" },
      main: {
        body: "background:rgb(234, 237, 241);",
      }
    },
    lightWhite: {
      header: "background:#fff;color:#000",
      navbar: { backgroundColor: "#fff", textColor: "#000", activeTextColor: "rgb(81,209,129)" },
      main: {
        body: "background:rgb(234, 236, 245);",
      }
    },
  },

  // 当前主题
  curTheme: {
    header: "background:#062f4f;color:#fff",
    navbar: { backgroundColor: "#0d3b53", textColor: "#fff", activeTextColor: "#3e95ee" },
    main: {
      body: "background:rgb(234, 237, 241);",
    }
  },
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

  // 设置当前主题
  setTheme(state, themeName) {
    state.curTheme = state.themes[themeName];
    localStorage.setItem('curThemeName', themeName);
  }
}
export default new Vuex.Store({
  state,
  mutations
})
