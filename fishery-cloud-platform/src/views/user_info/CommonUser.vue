<template>
  <div class="create-base-container">
    <el-card class="create-base-card">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
        <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
        <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
        <el-tab-pane label="定时任务补偿" name="fourth"
          >定时任务补偿</el-tab-pane
        >
      </el-tabs>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName: "first",
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
};
</script>

<style lang="less" scoped>
.create-base-container {
  background-image: url("../../assets/images/loginbg.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
  .create-base-card {
    margin: auto;
    width: 70%;
  }
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .create-base-footer {
    margin-top: 10px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>