<template>
  <el-drawer
    title="选择菜单"
    :visible="isShow"
    direction="rtl"
    @open="openProxy"
    :before-close="() => $emit('close')"
    size="20%"
    style="overflow: auto"
  >
    <el-tree
      ref="tree"
      :data="navList"
      :props="defualtProps"
      node-key="id"
      show-checkbox
      accordion
      draggable
      :allow-drop="handleAllowDrop"
      @node-drop="handleNodeDrop"
    ></el-tree>
    <div style="padding: 20px 10px; overflow: hidden">
      <el-button
        style="float: right; margin: 0 20px"
        type="primary"
        @click="saveNav"
        >保存</el-button
      >
      <el-button style="float: right" @click="() => this.$emit('close')"
        >取消</el-button
      >
    </div>
  </el-drawer>
</template>
<script>
import { mapMutations, mapState } from "vuex";
export default {
  props: {
    isShow: {
      type: Boolean,
    },
  },
  data() {
    return {
      navList: [], //后端返回的菜单
      retCheckedNav: [], //后端返回选中的菜单
      // tree组件
      defualtProps: {
        children: "children",
        label: "name",
      },
    };
  },
  computed: {
    ...mapState(["userInfo", "stdNavbar", "idToNameMap","nameToIdMap", "stdNavbarTree","stdNavbarTree"]),
    // 上一次用户选中的菜单ID(只要叶子节点即可)
    checkedNavIds() {
      const checkedIds = [];
      this.retCheckedNav.forEach((item) => {
        if (item.children.length != 0) {
          item.children.forEach((citem) => {
            checkedIds.push(this.nameToIdMap[citem]);
          });
        }
      });
      return checkedIds;
    },
  },
  methods: {
    ...mapMutations(["setShouldFlushNavbar"]),

    // 打开弹窗处理
    async openProxy() {
      // console.log("open");
      // 打开之前先请求该用户最原始所拥有的标签菜单（并存在本地，不必总是请求）
      // 存在本地注意通过用户ID作为键值，防止两个不同的用户在同一台电脑登录
      const { baseId, role, id: userId } = this.userInfo;
      const params = {
        baseId,
        role,
        userId,
      };
      const { data: res1 } = await this.$userLabel.post("", params);
      const { data: res2 } = await this.$userLabel.get(
        `/sequence/${this.userInfo.id}`
      );
      // console.log('sequence: ', res2);
      // console.log("userLabel: ", res1);
      if (res1.statusCode !== 20000 || res2.statusCode !== 20000) {
        console.error(res1.message);
      } else {
        console.log("userLabel: ", JSON.parse(res1.data));
        // 将返回所有菜单按上次的拖拽顺序排序
        this.navList = this.sortRetLabels(
          JSON.parse(res1.data).labels,
          res2.data
        );
        // console.log("navList: ", this.navList);
      }
      // 再请求该用户已经选择的标签菜单（进行初始化tree，同时记录一下标签菜单）
      // 这里设置上一次已经选择的二级菜单，注意checkedNav包含的只有叶子节点
      const { data: ret } = await this.$label.post("", params);
      // console.log('label: ', ret);
      if (ret.statusCode !== 20000) {
        console.error(ret.message);
      } else {
        console.log("$label.post ", JSON.parse(ret.data));
        let checkedLabels = JSON.parse(ret.data);
        this.retCheckedNav = checkedLabels.customized_labels
          ? checkedLabels.customized_labels
          : checkedLabels.labels;
        console.log(this.checkedNavIds);
        this.$refs.tree.setCheckedKeys(this.checkedNavIds);
      }
    },

    // 点击保存自定义的时候(1.保存所有菜单拖拽顺序  2.更新选中的菜单)
    async saveNav() {
      // 这里注意：还要获取半选中的父节点
      const curUserCheckedIds = this.$refs.tree
        .getHalfCheckedKeys()
        .concat(this.$refs.tree.getCheckedKeys());
      let c_navList = this._.cloneDeep(this.navList);
      // console.log("c_navList: ", c_navList);
      // 保存自定义的customizedLabels数组
      const customizedLabels = this.formatCNavListToName(
        c_navList,
        curUserCheckedIds
      );
      console.log("customizedLabels: ", customizedLabels);
      // 保存拖拽顺序的labelsSequence数组
      const labelsSequence = this.formatNavListToId(this.navList);
      console.log("labelsSequence: ", labelsSequence);
      let params1 = {
        userId: this.userInfo.id,
        customizedLabels,
        baseId: this.userInfo.baseId,
        role: this.userInfo.role,
      };
      console.log("this.navList: ", this.navList);
      let params2 = {
        labelsSequence,
        userId: this.userInfo.id,
      };
      const { data: res1 } = await this.$userLabel.put("", params1);
      const { data: res2 } = await this.$userLabel.put("/sequence", params2);
      // console.log("res: ", res);
      if (res1.statusCode === 20000 && res2.statusCode === 20000) {
        this.elMessage.success(res1.message);
        this.$store.commit("setShouldFlushNavbar", true);
        this.$emit("close");
      } else {
        this.elMessage.error(res1.message);
        console.error(res1.message);
      }
    },

    // 判断拖拽放置位置
    handleAllowDrop(draggingNode, dropNode, type) {
      // console.log("type: ", type);
      // console.log("dropNode: ", dropNode);
      // console.log("draggingNode: ", draggingNode);
      if (type === "inner") return false;
      if (draggingNode.level !== dropNode.level) return false;
      return true;
    },
    // 拖拽完成触发，处理拖拽后取消选中的问题
    handleNodeDrop(draggingNode) {
      // console.log("draggingNode: ", draggingNode);
      if (draggingNode.level === 1) {
        // 处理一级菜单的拖拽
        const childNodes = draggingNode.childNodes;
        const childKeys = childNodes.map((item) =>
          item.checked ? item.key : ""
        );
        console.log("childKeys: ", childKeys);
        this.$refs.tree.setCheckedKeys(
          childKeys.concat(this.$refs.tree.getCheckedKeys())
        );
      } else if (draggingNode.level === 2) {
        // 处理二级菜单的拖拽
        if (draggingNode.checked) {
          this.$refs.tree.setCheckedKeys(
            [draggingNode.key].concat(this.$refs.tree.getCheckedKeys())
          );
        }
      }
      // console.log("dropNode: ", dropNode);
      // console.log("draggingNode: ", draggingNode);
    },
    // 将后端返回的乱序的标签排序，思路：根据所拥有的菜单标签和顺序id，生成一颗tree
    sortRetLabels(retLabels, sortIds) {
      if (sortIds.length === 0) {
        // 如果用户是第一次进入选择菜单页面
        // 这时候是没有顺序id数组的，默认用vuex里定义好的即可
        return this.stdNavbarTree;
      }
      console.log("retLabels: ", retLabels);
      console.log("sortIds: ", sortIds);
      const ret = [];
      sortIds.forEach((item) => {
        let pitem = {
          id: item.parentId,
          name: this.idToNameMap[item.parentId],
          children: [],
        };
        item.childrenIds.forEach(cid=>{
          pitem.children.push({
            id:cid,
            name:this.idToNameMap[cid],
            parentId:item.parentId
          })
        })
        ret.push(pitem);
      });
      console.log("ret: ", ret);
      return ret;
    },

    // 将选中的菜单c_navList格式化成name传给后端
    formatCNavListToName(c_navList, curUserCheckedIds) {
      // 先删除一级菜单(从后往前)
      for (let i = c_navList.length - 1; i >= 0; i--) {
        let item = c_navList[i];
        if (!curUserCheckedIds.includes(item.id)) {
          // 用户选中的id中没有该一级菜单
          // delete c_navList[i];
          c_navList.splice(i, 1);
        } else {
          for (let cindex = item.children.length - 1; cindex >= 0; cindex--) {
            let citem = item.children[cindex];
            if (!curUserCheckedIds.includes(citem.id)) {
              // delete c_navList[i].children[cindex];
              c_navList[i].children.splice(cindex, 1);
            }
          }
        }
      }
      let ret = [];
      c_navList.forEach((item, index) => {
        ret.push({
          name: item.name,
          children: [],
        });
        item.children.forEach((citem) => {
          ret[index].children.push(citem.name);
        });
      });
      return ret;
    },

    // 将拖拽后的所有菜单顺序，转为id形式传给后端
    formatNavListToId(navList) {
      const ids = [];
      navList.forEach((item) => {
        let pitem = {};
        pitem.parentId = item.id;
        pitem.childrenIds = [];
        item.children.forEach((citem) => {
          pitem.childrenIds.push(citem.id);
        });
        ids.push(pitem);
      });
      return ids;
    },
  },
};
</script>