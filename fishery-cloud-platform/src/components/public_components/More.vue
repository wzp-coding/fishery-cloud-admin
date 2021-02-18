<template>
  <el-dropdown style="float: right" @command="handleCommand">
    <span class="el-dropdown-link">
      更多<i class="el-icon-arrow-down el-icon--right"></i>
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item style="width: 70px" command="defLayout"
        >自定义布局</el-dropdown-item
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
        saveLayout:{
            type:Function
        }
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
  },
};
</script>