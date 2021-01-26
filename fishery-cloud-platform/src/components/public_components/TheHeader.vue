<template>
  <div>
    <!-- 头部区域 -->
    <el-header>
      <div>
        <span>智慧渔业云服务平台</span>
      </div>
      <div>
        <img class="avatar" src="../../assets/131.jpg" />
        <el-dropdown  @command="loginOut">
          <span class="el-dropdown-link" @click="showUserInfo">
            个人中心<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
  </div>
</template>
<script>
export default {
  methods: {
    // 退出登录操作
    loginOut() {
      // localStorage.setItem("token", "");
      this.$router.push("/login");
    },
    showUserInfo(){
    }
  },
};
</script>
<style lang="less" scoped>
.el-header {
  background-color: #062f4f;
  display: flex;
  // 左右贴边对齐
  justify-content: space-between;
  // 去掉左内边距
  padding-left: 0;
  // y轴居中对齐
  align-items: center;
  //文本颜色
  color: #fff;
  //字体大小
  font-size: 20px;
  > div {
    display: flex;
    // y轴居中对齐
    align-items: center;
    span {
      // 图标与字体距离
      margin-left: 15px;
    }
  }
  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}
</style>