<template>
  <el-drawer
    :with-header="false"
    :visible="visible"
    direction="rtl"
    @open="openProxy"
    style="overflow: auto"
  >
    <el-tree
      ref="tree"
      :data="authList"
      :props="defaultProps"
      node-key="id"
      show-checkbox
      default-expand-all
      @check-change="handleNodeChange"
    ></el-tree>
    <div style="padding: 20px 10px; overflow: hidden">
      <el-button
        style="float: right; margin: 0 20px"
        type="primary"
        @click="setAuth(roleId)"
        >分配</el-button
      >
      <el-button style="float: right" @click="() => this.$emit('close')"
        >取消</el-button
      >
    </div>
  </el-drawer>
</template>
<script>
import { mapState } from "vuex";
export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    roleId: {
      type: String,
    },
  },
  data() {
    return {
      defaultProps: {
        label: "remarks",
        children: "children",
      },
      authList: [],
      checkedIds: [],
      preTwoLabels: {},
      addTwoLabels: {},
      subTwoLabels: {},
      isInit: true,
    };
  },
  computed: {
    ...mapState(["userInfo"]),

    // 获取树结构的checkIds中的所有叶子节点
    defaultCheckedIds() {
      let tem = [""];
      this.checkedIds.forEach((one) => {
        if (one.children.length !== 0) {
          one.children.forEach((two) => {
            if (two.children.length !== 0) {
              two.children.forEach((three) => {
                tem.push(three.id);
              });
            } else {
              // two是叶子节点
              tem.push(two.id);
            }
          });
        } else {
          // one是叶子节点
          tem.push(one.id);
        }
      });

      return tem;
    },
  },
  // watch:{
  //   addTwoLabels(val){
  //     console.log('addTwoLabels: ', val);
  //   },
  //   subTwoLabels(val){
  //     console.log('subTwoLabels: ', val);
  //   }
  // },
  methods: {
    handleNodeChange(node, checkedSelf, checkedChild) {
      // console.log('node: ', node);
      const curRemark = node.remarks;
      if (node.parentId && node.children != null) {
        // console.log('二级权限：',curRemark)
        // 判断当前节点是不是二级权限
        if (this.isInit) {
          // 初始化的时候，获取到上一次的已经选中的二级权限
          this.$set(this.preTwoLabels, curRemark, true);
        } else {
          // 用户点击复选框选择的时候
          // 判断当前二级标签的状态，注意：
          // 半选中（有子菜单选中） 和 选中 属于 同种状态
          // 没选中 属于 一种状态
          if (!this.preTwoLabels[curRemark]) {
            // 如果原来没有该二级权限
            if (checkedSelf || checkedChild) {
              // 现在该二级权限被选中了 或者 子权限被选中了
              this.$set(this.addTwoLabels, curRemark, "1");
            } else {
              // 该二级权限没被选中，子权限也没有一个被选中(用户选完后又取消)
              this.$delete(this.addTwoLabels, curRemark);
            }
          } else {
            // 如果原来有该二级权限
            if (!checkedSelf && !checkedChild) {
              // 现在该二级权限没被选中（自身和子权限都没有选中）
              this.$set(this.subTwoLabels, curRemark, "0");
            } else {
              // 该二级权限处于 选中 或者 子权限有被选中
              this.$delete(this.subTwoLabels, curRemark);
            }
          }
        }
      } else if (node.children === null) {
        // console.log('三级权限：',curRemark)
        // 处理第二次点击三级权限时候不触发父级node事件
        const parent = this.$refs.tree.getNode(node.parentId);
        const parentRemark = parent.data.remarks;
        // console.log("parent: ", parent);
        if (parent.checked) {
          if (!this.preTwoLabels[parentRemark]) {
            // 如果原来没有该二级权限
            // 现在该二级权限被选中了
            this.$set(this.addTwoLabels, parentRemark, "1");
          } else {
            // 如果原来有该二级权限
            // 现在该权限被选中
            this.$delete(this.subTwoLabels, parentRemark);
          }
        } else {
          // 父级没选中可能是 半选状态 或者 确实没选
          const brothers = parent.childNodes;
          let parentHalf = false;
          brothers.some((node) => (node.checked ? (parentHalf = true) : false));
          // console.log("parentHalf: ", parentHalf);
          if (parentHalf) {
            if (!this.preTwoLabels[parentRemark]) {
              // 如果原来没有该二级权限
              // 现在该二级权限被选中了
              this.$set(this.addTwoLabels, parentRemark, "1");
            } else {
              // 如果原来有该二级权限
              // 现在该权限被选中
              this.$delete(this.subTwoLabels, parentRemark);
            }
          }else{
            // 到这里说明确实是没被选中
            if (!this.preTwoLabels[parentRemark]) {
              // 如果原来没有该二级权限
              // 现在该二级权限没被选中
              this.$delete(this.addTwoLabels, parentRemark);
            } else {
              // 如果原来有该二级权限
              // 现在该权限没被选中
              this.$set(this.subTwoLabels, parentRemark,'0');
            }
          }
        }
      }
    },
    // 点击分配按钮
    async setAuth(roleId) {
      // console.log("roleId: ", roleId);
      if (this.roleId == this.userInfo.roleId) {
        this.elMessage.warning("不能分配自己的权限！！");
        this.$emit("close");
        return;
      }
      // 这里注意：还要获取半选中的父节点
      const selectedIds = this.$refs.tree
        .getHalfCheckedKeys()
        .concat(this.$refs.tree.getCheckedKeys());
      // console.log("selectedIds: ", selectedIds);
      const { data: res } = await this.$function.post(`/${roleId}`, {
        functionIdList: selectedIds,
      });
      // console.log("functionIdList: ", res);
      if (res.statusCode === 20000) {
        // 调用涛哥的接口更新用户角色权限菜单
        await this.synMenuByRole();
        this.elMessage.success(res.message);
        this.$emit("close");
      } else {
        console.error(res.message);
      }
    },
    // 将selectedIds格式化成allTwoLabels形式（修改后 的状态）
    getNewAllTwoLabels(selectedIds) {
      let allFunc = {};
      this.authList.forEach((one) => {
        if (one.children.length !== 0) {
          one.children.forEach((two) => {
            allFunc[two.remarks] = false;
            // 判断two.remarks的id是否在selectedIds中，是的话设为true
            // allFunc
          });
        }
      });
      return allFunc;
    },

    // 调用涛哥的接口更新用户角色权限
    async synMenuByRole() {
      const functionMap = {};
      for(const key in this.addTwoLabels){
        functionMap[key] = '1'
      }
      for(const key in this.subTwoLabels){
        functionMap[key] = '0'
      }
      const role = await this.getRoleInfo(this.roleId);
      const params = {
        baseId: this.userInfo.baseId,
        role,
        functionMap,
      };
      const { data: res } = await this.$label.put(`/role/function`, params);
      console.log('res: ', res);
      if(res.statusCode !== 20000){
        console.error(res.message);
      }
    },

    // 根据角色Id查询角色信息
    async getRoleInfo(id) {
      const { data: res } = await this.$role.get(`/get/${id}`);
      console.log('getRoleInfo: ', res);
      if (res.statusCode === 20000) {
        return res.data.name;
      }else{
        console.error(res.message);
      }
    },

    // 根据roleId获取 已授予 权限列表
    async getFunctionByRoleId(roleId) {
      const { data: res } = await this.$function.get(`/findFunction/${roleId}`);
      console.log("getFunctionByRoleId: ", res);
      if (res.statusCode === 20000) {
        // 设置checkedIds
        this.checkedIds = res.data;
      } else {
        this.elMessage.error(res.message);
      }
    },

    // 查询 所有权限
    async getAuthList() {
      const { data: res } = await this.$function.get();
      // console.log("getAuthList: ", res);
      if (res.statusCode === 20000) {
        this.authList = res.data;
      } else {
        this.elMessage.error(res.message);
      }
    },

    // 打开后处理函数
    async openProxy() {
      // console.log("open")

      // 打开后先获取已授予的权限
      await this.getFunctionByRoleId(this.roleId);
      // 这里设置已授权的权限，注意defaultCheckedIds包含的只有叶子节点
      await this.$refs.tree.setCheckedKeys(this.defaultCheckedIds);
      this.isInit = false;
    },
  },
  created() {
    // 获取所有权限
    this.getAuthList();
  },
};
</script>
<style lang="less" scoped>
/deep/.el-drawer__body {
  overflow: auto;
}
</style>