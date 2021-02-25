<template>
  <div>
    <!-- 头部区域 -->
    <el-header id="custom-wzp-header">
      <div>
        <span>智慧渔业云服务平台</span>
      </div>
      <div>
        <el-select v-model="theme" placeholder="请选择" @change="changeTheme" size="medium" style="width:100px">
          <el-option
            v-for="item in themes"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-avatar size="large" :src="$store.state.userInfo.avatar"></el-avatar>
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
            <el-dropdown-item style="width: 60px" command="changeTheme"
              >更换主题
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    <!-- 修改用户信息 -->
    <InfoUser
      :isShow="isShowIU"
      :close-callback="() => (this.isShowIU = false)"
    ></InfoUser>
    <!-- 修改密码 -->
    <ModifyPassword
      :isShow="isShowMPD"
      :close-callback="() => (this.isShowMPD = false)"
    ></ModifyPassword>
  </div>
</template>
<script>
import InfoUser from "../wzp/user_info/InfoUser";
import ModifyPassword from "../wzp/user_info/ModifyPassword";
export default {
  data() {
    return {
      isShowIU: false,
      isShowMPD: false,
      curThemeName: "deepBlue",
      theme: "cosmic",
      themes: [
        {
          value: "cosmic",
          label: "cosmic",
        },
        {
          value: "light",
          label: "light",
        },
        {
          value: "dark",
          label: "dark",
        },
      ],
    };
  },
  computed: {
  },
  components: {
    InfoUser,
    ModifyPassword,
  },
  methods: {

    // 处理下拉框指令
    handleCommand(command) {
      // console.log(command);
      switch (command) {
        case "loginOut":
          this.loginOut();
          break;
        case "modifyPassword":
          this.modifyPassword();
          break;
        case "changeTheme":
          this.changeTheme();
          break;
      }
    },

    // 退出登录操作
    loginOut() {
      localStorage.removeItem("token");
      this.$router.push("/login");
    },

    // 修改密码操作
    modifyPassword() {
      this.isShowMPD = true;
    },

    // 换主题皮肤
    changeTheme(color) {
      document.body.className = 'custom-'+color;
    },
  },
  created() {
    this.changeTheme(this.theme)
  },
};
</script>
<style lang="less" scoped>
.el-header {
  display: flex;
  // 左右贴边对齐
  justify-content: space-between;
  // 去掉左内边距
  padding-left: 0;
  // y轴居中对齐
  align-items: center;
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