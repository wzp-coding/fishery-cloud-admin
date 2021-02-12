<template>
  <div>
    <!-- 头部区域 -->
    <el-header>
      <div>
        <span>智慧渔业云服务平台</span>
      </div>
      <div>
        <el-avatar
          size="large"
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        ></el-avatar>
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link" @click="isShowIU = true">
            个人中心<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item style="width: 60px" command="modifyPassword"
              >修改密码</el-dropdown-item
            >
            <el-dropdown-item style="width: 60px" command="loginOut"
              >退出登录</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    <!-- 修改用户信息 -->
    <InfoUser :isShow="isShowIU" :close-callback="()=>this.isShowIU=false"></InfoUser>
    <!-- 修改密码 -->
    <ModifyPassword :isShow="isShowMPD" :close-callback="()=>this.isShowMPD=false"></ModifyPassword>
  </div>
</template>
<script>
import InfoUser from "../wzp/user_info/InfoUser";
import ModifyPassword from "../wzp/user_info/ModifyPassword";
export default {
  data() {
    return {
      isShowIU:false,
      isShowMPD:false
    };
  },
  components: {
    InfoUser,
    ModifyPassword
  },
  methods: {
    // 处理下拉框指令
    handleCommand(command){
      // console.log(command);
      switch(command){
        case 'loginOut':this.loginOut();break;
        case 'modifyPassword':this.modifyPassword();break
      }
    },

    // 退出登录操作
    loginOut() {
      localStorage.removeItem("token");
      this.$router.push("/login");
    },

    // 修改密码操作
    modifyPassword(){
      this.isShowMPD=true
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