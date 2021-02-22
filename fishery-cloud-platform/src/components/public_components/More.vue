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
export default {
    props:{
        defLayout:{
            type:Function
        },
        moduleChecked:{
          type:Array
        },
        modules:{
          type:Array
        },
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
    saveLayout() {
      // 保存选中模块的调整顺序
      localStorage.setItem(
        "wzp-DigitalBase-checked",
        JSON.stringify(this.moduleChecked)
      );
      // 保存所有模块
      localStorage.setItem(
        "wzp-DigitalBase-modules",
        JSON.stringify(this.modules)
      );
      this.elMessage.success("保存成功");
    },
  },
};
</script>
<style lang="less" scoped>
.el-dropdown-link {
    cursor: pointer;
  }  
</style>