<template>
  <el-dropdown style="float: right" @command="handleCommand">
    <span class="el-dropdown-link">
      更多<i class="el-icon-arrow-down el-icon--right"></i>
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item style="width: 70px" command="defLayout"
        >选择模块</el-dropdown-item
      >
      <el-dropdown-item style="width: 70px" command="saveLayout"
        >保存布局</el-dropdown-item
      >
    </el-dropdown-menu>
  </el-dropdown>
</template>
<script>
import { mapState } from "vuex";
export default {
  props: {
    defLayout: {
      type: Function,
    },
    moduleChecked: {
      type: Array,
    },
    modules: {
      type: Array,
    },
  },
  computed: {
    ...mapState(["userInfo"]),
  },
  methods: {
    // 处理下拉框指令
    handleCommand(command) {
      // console.log(command);
      switch (command) {
        case "defLayout":
          this.defLayout();
          break;
        case "saveLayout":
          this.saveLayout();
          break;
      }
    },

    // 保存布局
    async saveLayout() {
      console.log("this.modules: ", this.modules);
      this.modules.forEach(async(item) => {
       const {data:res} = await this.$drag.put("", item);
       if(res.statusCode !== 20000){
         this.elMessage.error(res.message);
       }
      });
      let moduleCheckedIds = this.moduleChecked.map((item) => item.id);
      const params = {
        moduleChecked: moduleCheckedIds,
        userId: this.userInfo.id,
      };
      const { data: res } = await this.$drag.put("/checked", params);
      if (res.statusCode === 20000) {
        this.elMessage.success(res.message);
      } else {
        this.elMessage.error(res.message);
        console.error(res.message);
      }
    },
  },
};
</script>
<style lang="less" scoped>
.el-dropdown-link {
  cursor: pointer;
}
</style>