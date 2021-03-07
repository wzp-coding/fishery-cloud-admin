<template>
  <div class="create-base-container">
    <el-card class="create-base-card"> 普通用户，只允许修改个人信息，修改密码等局限操作 </el-card>
  </div>
</template>
<script>
export default {};
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