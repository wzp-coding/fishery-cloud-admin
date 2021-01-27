<template>
  <div>
    <!-- 头部区域 -->
    <el-header>
      <div>
        <span>智慧渔业云服务平台</span>
      </div>
      <div>
        <el-avatar size="large" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
        <el-dropdown @command="loginOut">
          <span class="el-dropdown-link" @click="showUserInfo">
            个人中心<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    <el-dialog
      title="个人信息"
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="beforeClose"
    >
      <InfoUser></InfoUser>
    </el-dialog>
  </div>
</template>
<script>
import InfoUser from "../wzp/InfoUser";
export default {
  data() {
    return {
      dialogVisible: false,
    };
  },
  components: {
    InfoUser,
  },
  methods: {
    // 退出登录操作
    loginOut() {
      // localStorage.setItem("token", "");
      this.$router.push("/login");
    },
    showUserInfo() {
      this.dialogVisible = !this.dialogVisible;
    },
    beforeClose(done) {
      this.$confirm("是否保存修改内容后关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
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
  .el-dropdown-link {
    cursor: pointer;
  }
  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}
</style>