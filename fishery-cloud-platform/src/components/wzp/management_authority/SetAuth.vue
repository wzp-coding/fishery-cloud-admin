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
      :default-checked-keys="defaultCheckedIds"
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
    defaultCheckedIds() {
      const tem = [""];
      this.checkedIds.forEach((one) => {
        tem.push(one.id);
        if (one.children) {
          one.children.forEach((two) => {
            tem.push(two.id);
            if (two.children) {
              two.children.forEach((three) => {
                tem.push(three.id);
              });
            }
          });
        }
      });
      console.log('tem: ', tem);
      return tem;
    },
  },
  watch: {
    defaultCheckedIds(val) {
      console.log("defaultCheckedIds: ", val);
    },
  },
  methods: {
    async setAuth(roleId) {
      const selectedIds = this.$refs.tree.getCheckedKeys();
      // console.log("roleId: ", roleId);
      console.log(this.$refs.tree.getCheckedKeys());
      console.log(JSON.stringify({ "functionIdList": selectedIds }));
      const { data: res } = await this.$function.post(
        `/${roleId}`,
        { "functionIdList": selectedIds }
      );
      console.log("functionIdList: ", res);
    },

    // 根据roleId获取 已授予 权限列表
    async getFunctionByRoleId(roleId) {
      console.log('roleId: ', roleId);
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
      console.log("open")
      // 打开后先获取已授予的权限
      await this.getFunctionByRoleId(this.roleId);
    },
  },
  created() {
    // 获取所有权限
    this.getAuthList();
  },
  destroyed() {
    console.log("destroyed")
  },
};
</script>
<style lang="less" scoped>
/deep/.el-drawer__body {
  overflow: auto;
}
</style>