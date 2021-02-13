<template>
  <el-drawer
    :with-header="false"
    :visible="visible"
    direction="rtl"
    @open="openProxy"
    style="overflow:auto"
  >
    <el-tree
      ref="tree"
      :data="authList"
      :props="defaultProps"
      default-expand-all
      :default-checked-keys="checkedIds"
      node-key="id"
      show-checkbox
    ></el-tree>
    <div style="padding: 20px 10px; overflow: hidden">
      <el-button
        style="float: right; margin: 0 20px"
        type="primary"
        @click="getCheckedKeys"
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
  methods: {
    getCheckedKeys() {
      console.log(this.$refs.tree.getCheckedKeys());
    },

    // 根据roleId获取 已授予 权限列表
    async getFunctionByRoleId(roleId) {
      const { data: res } = await this.$function.get(`/findFunction/${roleId}`);
        console.log("res: ", res);
      if (res.statusCode === 20000) {
        // 设置checkedIds

      } else {
        this.elMessage.error(res.message);
      }
    },

    // 根据roleId获取 可授予 的权限
    async getAuthList(roleId) {
      const { data: res } = await this.$function.get(
        `/findOtherFunction/${roleId}`
      );
      console.log("res: ", res);
      if (res.statusCode === 20000) {
          this.authList = res.data;
      }else {
        this.elMessage.error(res.message);
      }
    },

    // 打开后处理函数
    async openProxy() {
      // 打开后先获取已授予的权限
      await this.getFunctionByRoleId(this.roleId);
      // 再获取可授予的权限
      await this.getAuthList(this.roleId);
    },
  },
};
</script>
<style lang="less" scoped>
/deep/.el-drawer__body {
    overflow: auto;
}
</style>