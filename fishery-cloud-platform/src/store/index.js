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
    { name: '渔业管理', children: ['池塘管理', '养殖建议', '农资管理', '种苗管理', '种苗信息', '投入品管理'] },
    { name: '设备管理', children: ['监控设备', '气象设备', '水质设备'] },
    { name: '养殖生产', children: ['冷库', '加工厂'] },
    { name: '订单物流', children: ['订单管理', '物流信息'] },
    { name: '基地管理', children: ['客户管理', '员工管理', '权限管理', '基地信息', '备忘录'] },
    { name: '领导仓', children: ['基地数据'] },
  ],

  // 给菜单加上固定的id
  stdNavbarTree: [
    {
      "id": 1000,
      "name": "我的基地",
      "children": [
        {
          "id": 10000,
          "name": "数字基地",
          "parentId": 1000
        },
        {
          "id": 10001,
          "name": "实况监控",
          "parentId": 1000
        },
        {
          "id": 10002,
          "name": "环境监测",
          "parentId": 1000
        },
        {
          "id": 10003,
          "name": "疾病诊断",
          "parentId": 1000
        }
      ]
    },
    {
      "id": 1001,
      "name": "渔业管理",
      "children": [
        {
          "id": 10004,
          "name": "池塘管理",
          "parentId": 1001
        },
        {
          "id": 10005,
          "name": "养殖建议",
          "parentId": 1001
        },
        {
          "id": 10006,
          "name": "农资管理",
          "parentId": 1001
        },
        {
          "id": 10007,
          "name": "种苗管理",
          "parentId": 1001
        },
        {
          "id": 10008,
          "name": "种苗信息",
          "parentId": 1001
        },
        {
          "id": 10009,
          "name": "投入品管理",
          "parentId": 1001
        }
      ]
    },
    {
      "id": 1002,
      "name": "设备管理",
      "children": [
        {
          "id": 10010,
          "name": "监控设备",
          "parentId": 1002
        },
        {
          "id": 10011,
          "name": "气象设备",
          "parentId": 1002
        },
        {
          "id": 10012,
          "name": "水质设备",
          "parentId": 1002
        }
      ]
    },
    {
      "id": 1003,
      "name": "养殖生产",
      "children": [
        {
          "id": 10013,
          "name": "冷库",
          "parentId": 1003
        },
        {
          "id": 10014,
          "name": "加工厂",
          "parentId": 1003
        }
      ]
    },
    {
      "id": 1004,
      "name": "订单物流",
      "children": [
        {
          "id": 10015,
          "name": "订单管理",
          "parentId": 1004
        },
        {
          "id": 10016,
          "name": "物流信息",
          "parentId": 1004
        }
      ]
    },
    {
      "id": 1005,
      "name": "基地管理",
      "children": [
        {
          "id": 10017,
          "name": "客户管理",
          "parentId": 1005
        },
        {
          "id": 10018,
          "name": "员工管理",
          "parentId": 1005
        },
        {
          "id": 10019,
          "name": "权限管理",
          "parentId": 1005
        },
        {
          "id": 10020,
          "name": "基地信息",
          "parentId": 1005
        },
        {
          "id": 10021,
          "name": "备忘录",
          "parentId": 1005
        }
      ]
    },
    {
      "id": 1006,
      "name": "领导仓",
      "children": [
        {
          "id": 10022,
          "name": "基地数据",
          "parentId": 1006
        }
      ]
    }
  ],

  // 菜单名和id相互映射
  nameToIdMap: {
    "我的基地": 1000,
    "数字基地": 10000,
    "实况监控": 10001,
    "环境监测": 10002,
    "疾病诊断": 10003,
    "渔业管理": 1001,
    "池塘管理": 10004,
    "养殖建议": 10005,
    "农资管理": 10006,
    "种苗管理": 10007,
    "种苗信息": 10008,
    "投入品管理": 10009,
    "设备管理": 1002,
    "监控设备": 10010,
    "气象设备": 10011,
    "水质设备": 10012,
    "养殖生产": 1003,
    "冷库": 10013,
    "加工厂": 10014,
    "订单物流": 1004,
    "订单管理": 10015,
    "物流信息": 10016,
    "基地管理": 1005,
    "客户管理": 10017,
    "员工管理": 10018,
    "权限管理": 10019,
    "基地信息": 10020,
    "备忘录": 10021,
    "领导仓": 1006,
    "基地数据": 10022
  },
  idToNameMap: {
    "1000": "我的基地",
    "1001": "渔业管理",
    "1002": "设备管理",
    "1003": "养殖生产",
    "1004": "订单物流",
    "1005": "基地管理",
    "1006": "领导仓",
    "10000": "数字基地",
    "10001": "实况监控",
    "10002": "环境监测",
    "10003": "疾病诊断",
    "10004": "池塘管理",
    "10005": "养殖建议",
    "10006": "农资管理",
    "10007": "种苗管理",
    "10008": "种苗信息",
    "10009": "投入品管理",
    "10010": "监控设备",
    "10011": "气象设备",
    "10012": "水质设备",
    "10013": "冷库",
    "10014": "加工厂",
    "10015": "订单管理",
    "10016": "物流信息",
    "10017": "客户管理",
    "10018": "员工管理",
    "10019": "权限管理",
    "10020": "基地信息",
    "10021": "备忘录",
    "10022": "基地数据"
  },

  // 是否需要刷新菜单
  shouldFlushNavbar: false,

  // 存储二维码溯源信息
  typeToIdMap: {}
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
  },

  // 设置typeToIpMap
  setTypeToIdMap(state, data) {
    state.typeToIdMap = data;
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
    commit('setTypeToIdMap', {})
  },

  // 根据roleId查询登录用户的权限，并存到vuex中
  async getFunctionByRoleId({ commit, state }, vm) {
    // console.log('state: ', state);
    const { data: res } = await vm.$function.get(`/findFunction/${state.userInfo.roleId}`);
    console.log("getFunctionByRoleId: ", res);
    if (res.statusCode === 20000) {
      commit("setPermissionList", res.data);
    } else {
      console.error(res.message);
    }
  },

  // 根据id和溯源类型type查询相关信息（1：养殖信息，2：加工厂信息，3：冷库信息）
  async getOrginInfoByIdAndType({ state }, payload) {
    const {type,vm } = payload;
    const { data: res } = await vm.$traceability.get(`/info/${state.typeToIdMap[type][0]}/${type}`);
    if (res.statusCode != 20000) {
      console.error(res.message);
      vm.elMessage.error(res.message);
    }
    return res.data;
  },
}
export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
