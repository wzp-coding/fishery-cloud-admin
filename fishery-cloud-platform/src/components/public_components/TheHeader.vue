<template>
  <div>
    <!-- 头部区域 -->
    <el-header id="custom-wzp-header">
      <div>
        <span>智慧渔业云服务平台</span>
      </div>
      <div>
        <el-select
          v-model="theme"
          placeholder="请选择"
          @change="changeTheme"
          size="medium"
          style="width: 150px"
        >
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
            <el-dropdown-item style="width: 60px" command="showInvitation"
              >查看邀请
            </el-dropdown-item>
            <el-dropdown-item style="width: 60px" command="loginOut"
              >退出登录</el-dropdown-item
            >
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
    <!-- 查看邀请 -->
    <ShowInvitation
      :isShow="isShowSI"
      :close-callback="() => (this.isShowSI = false)"
    ></ShowInvitation>
  </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
import InfoUser from "../wzp/user_info/InfoUser";
import ModifyPassword from "../wzp/user_info/ModifyPassword";
import ShowInvitation from "../wzp/user_info/ShowInvitation";
export default {
  data() {
    return {
      isShowIU: false, //个人中心
      isShowMPD: false, //修改密码
      isShowSI: false, //查看邀请
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
        {
          value: "metarial-dark",
          label: "metarial-dark",
        },
      ],
    };
  },
  components: {
    InfoUser,
    ModifyPassword,
    ShowInvitation,
  },
  computed: {
    ...mapState(["userInfo"]),
  },
  methods: {
    ...mapMutations(["setUserInfo"]),
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
        case "showInvitation":
          this.showInvitation();
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

    // 查看用户邀请
    showInvitation() {
      this.isShowSI = true;
    },

    // 换主题皮肤
    async changeTheme(color) {
      const form = Object.assign(this.userInfo, { theme: color });
      console.log('form: ', form);
      const { data: res } = await this.$user.put("/user", form);
      if (res.statusCode === 20000) {
        document.body.className = "custom-" + color;
        // 更新vuex里的用户信息
        this.$store.commit("setUserInfo", form);
        this.elMessage.success(res.message);
      } else {
        this.elMessage.error(res.message);
      }
    },
  },
  created() {
    document.body.className = "custom-" + this.userInfo.theme;
    this.theme = this.userInfo.theme;
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