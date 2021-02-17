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
      default-expand-all
      node-key="id"
      show-checkbox
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
    };
  },
  computed: {
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
  methods: {
    // 点击分配按钮
    async setAuth(roleId) {
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
        this.elMessage.success(res.message);
        this.$emit("close");
      } else {
        this.elMessage.error(res.message);
      }
    },

    // 根据roleId获取 已授予 权限列表
    async getFunctionByRoleId(roleId) {
      const { data: res } = await this.$function.get(`/findFunction/${roleId}`);
      // console.log("getFunctionByRoleId: ", res);
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
      this.$refs.tree.setCheckedKeys(this.defaultCheckedIds);
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