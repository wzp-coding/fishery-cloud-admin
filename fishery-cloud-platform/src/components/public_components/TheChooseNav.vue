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
      :allow-drop="handleDrop"
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
      retNavList: [],
      retCheckedNav: [],
      defualtProps: {
        children: "children",
        label: "name",
      },
      preUserChecked: [],
      nameToIdMap: {},
    };
  },
  computed: {
    ...mapState(["userInfo", "stdNavbar"]),
    // 有授权的全部用户菜单
    navList() {
      const ret = [];
      let parentId = 1000;
      let childId = 10000;
      this.retNavList.forEach((item, index) => {
        ret.push({
          id: parentId,
          name: item.name,
          children: [],
        });
        this.$set(this.nameToIdMap, item.name, parentId);
        if (item.children.length !== 0) {
          item.children.forEach((name) => {
            ret[index].children.push({
              id: childId,
              name,
              parentId,
            });
            this.$set(this.nameToIdMap, name, childId);
            childId++;
          });
        }
        parentId++;
      });
      console.log("navList: ", ret);
      return ret;
    },
    // 上一次用户选中的菜单ID(只要叶子节点即可)
    checkedNav() {
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
    ...mapMutations(['setShouldFlushNavbar']),

    // 将乱序的标签排序，思路：先拷贝一份完全的顺序的菜单，再根据乱序的数组中查看是否有该菜单名，没有则删除即可
    sortRetLabels(retLabels) {
      // console.log("retLabels: ", retLabels);
      const ret = this._.cloneDeep(this.stdNavbar);
      // 生成一级标签map
      const mapOneLabel = {};

      retLabels?.forEach((oneLabel) => {
        mapOneLabel[oneLabel.name] = oneLabel.children;
      });
      // 必须倒着遍历然后删除，否则前边删除后index会影响后面的删除
      for (let index = ret.length - 1; index >= 0; index--) {
        let item = ret[index];
        if (mapOneLabel[item.name]) {
          // 如果返回包含该一级菜单
          // 生成二级map
          const mapTwoLabel = {};
          mapOneLabel[item.name].forEach(
            (twoLabel) => (mapTwoLabel[twoLabel] = true)
          );
          for (let cindex = item.children.length - 1; cindex >= 0; cindex--) {
            let citem = item.children[cindex];
            if (!mapTwoLabel[citem]) {
              // delete ret[index].children[cindex];
              ret[index].children.splice(cindex, 1);
            }
          }
        } else {
          // delete ret[index];
          ret.splice(index, 1);
        }
      }
      console.log("ret: ", ret);
      return ret;
    },

    // 点击保存自定义的时候
    async saveNav() {
      // 这里注意：还要获取半选中的父节点
      const curUserCheckedIds = this.$refs.tree
        .getHalfCheckedKeys()
        .concat(this.$refs.tree.getCheckedKeys());
      let c_navList = this._.cloneDeep(this.navList);
      // console.log("c_navList: ", c_navList);
      const customizedLabels = this.formatCNavList(
        c_navList,
        curUserCheckedIds
      );
      console.log("customizedLabels: ", customizedLabels);

      let params = {
        userId: this.userInfo.id,
        customizedLabels,
      };
      const { data: res } = await this.$userLabel.put("", params);
      // console.log("res: ", res);
      if (res.statusCode === 20000) {
        this.elMessage.success(res.message);
        this.$store.commit('setShouldFlushNavbar',true);
        this.$emit('close')
      } else {
        this.elMessage.error(res.message);
        console.error(res.message);
      }
      // if(res.statusCode !==)
    },
    // 将c_navList格式化传给后端
    formatCNavList(c_navList, curUserCheckedIds) {
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
    // 判断拖拽放置位置
    handleDrop(draggingNode, dropNode, type) {
      console.log("type: ", type);
      console.log("dropNode: ", dropNode);
      console.log("draggingNode: ", draggingNode);
    },
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
      const { data: res } = await this.$userLabel.post("", params);
      // console.log("userLabel: ", res);
      if (res.statusCode !== 20000) {
        console.error(res.message);
      } else {
        // console.log('userLabel: ', JSON.parse(res.data));
        this.retNavList = this.sortRetLabels(JSON.parse(res.data).labels);
        // console.log("navList: ", this.navList);
      }
      // 再请求该用户已经选择的标签菜单（进行初始化tree，同时记录一下标签菜单）
      // 这里设置上一次已经选择的二级菜单，注意checkedNav包含的只有叶子节点
      const { data: ret } = await this.$label.post("", params);
      // console.log('label: ', ret);
      if (ret.statusCode !== 20000) {
        console.error(ret.message);
      } else {
        // console.log('$label.post.customized_labels: ', JSON.parse(ret.data).customized_labels);
        this.retCheckedNav = this.sortRetLabels(
          JSON.parse(ret.data).customized_labels
        );
        // console.log(this.nameToIdMap);
        this.$refs.tree.setCheckedKeys(this.checkedNav);
      }
    },
  },
};
</script>
<style lang="less" scoped>
</style>