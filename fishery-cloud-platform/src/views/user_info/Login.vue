<template>
  <body>
    <div class="box" :style="boxHeight">
      <h2>智慧渔业云服务平台</h2>
      <el-tabs v-model="activeName" @tab-click="handleTabClick" :stretch="true">
        <!-- 表单区域 -->
        <el-tab-pane label="密码登录" name="passwordLogin">
          <Form
            :callback="handleSubmit"
            :options="['phone', 'password', 'captcha']"
            ref="passwordLogin"
          ></Form>
        </el-tab-pane>
        <el-tab-pane label="短信登录" name="messageLogin">
          <Form :callback="handleSubmit"></Form>
        </el-tab-pane>
      </el-tabs>
      <div style="display: flex; justify-content: flex-end">
        <router-link to="/forgetPassword">找回密码</router-link>
        <el-divider direction="vertical"></el-divider>
        <router-link to="/register">注册</router-link>
      </div>
    </div>
  </body>
</template>

<script>
import Form from "../../components/wzp/user_info/Form";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      // 默认登录方式
      activeName: "passwordLogin",
      // 切换登录方式设置背景高度
      boxHeight: "height:440px",

      token: undefined,
    };
  },
  components: {
    Form,
  },
  methods: {
    ...mapMutations(["setUserInfo", "setPermissionList"]),

    // 切换登录方式
    handleTabClick(tab) {
      // console.log("tab: ", tab);
      this.activeName = tab.name;
      if (tab.name === "passwordLogin") {
        this.boxHeight = "height:440px";
      } else {
        this.boxHeight = "height:390px";
      }
    },

    // 向登录接口发起请求
    async handleSubmit(form) {
      // console.log("form: ", form);
      let { phoneCode, phone, captcha, password } = form;
      let url;
      if (this.activeName === "passwordLogin") {
        url = `/login?password=${password}&phone=${phone}&code=${captcha}`;
      } else {
        url = `/loginByPhone?phone=${phone}&code=${phoneCode}`;
      }
      const { data: res, headers } = await this.$user.post(url);
      // console.log("res: ", res);
      if (res.statusCode === 20000) {
        localStorage.setItem("token", headers.token);
        this.$store.commit("setUserInfo", res.data);
        await this.getFunctionByBaseIdAndBaseIdentity();
        this.elMessage.success(res.message);
        this.$router.push("/digital-base");
      } else {
        this.$refs.passwordLogin.getCaptcha();
        this.elMessage.error(res.message);
      }
    },

    // 查询该用户的所有权限，并存到vuex中
    async getFunctionByBaseIdAndBaseIdentity() {
      const { data: res } = await this.$function.get();
      this.$store.commit("setPermissionList", res.data);
    },
  },
  mounted() {
    if (this.activeName === "passwordLogin") {
      this.$refs.passwordLogin.getCaptcha();
    }
  },
};
</script>

<style lang="less" scoped>
body {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
  background: url("../../assets/131.jpg");
  background-size: cover;
  /deep/.box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    padding: 40px;
    background: rgba(0, 0, 0, 0.8);
    box-sizing: border-box;
    box-shadow: 0 15px 25px rgba(0, 0, 0, 0.5);
    border-radius: 10px; /*登录窗口边角圆滑*/
    h2 {
      margin: 0 0 30px;
      padding: 0;
      color: #fff;
      text-align: center;
    }
    .el-input__inner {
      background-color: transparent;
      color: #fff;
      font-size: 14px;
    }
    .el-form {
      .el-form-item {
        .el-input {
          .el-input__inner {
            border: none;
            border-bottom: 1px solid white;
            border-radius: unset;
            font-size: 14px;
          }
        }
        .captcha {
          width: 50%;
          float: left;
          .el-input__inner {
            border: 1px solid white;
            border-radius: 5px !important;
            background-color: #fff;
            color: grey;
          }
        }
        img {
          width: 45%;
          position: relative;
          display: block;
          left: -1%;
          float: right;
          height: 40px;
        }
      }
    }
  }
}
/deep/.el-tabs__item {
  color: #fff;
}
</style>
