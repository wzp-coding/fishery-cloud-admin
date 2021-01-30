<template>
  <body>
    <div class="box">
      <h2>智慧渔业云服务平台</h2>
      <!-- 表单区域 -->
      <el-form :rules="loginFormRules" :model="loginForm">
        <el-form-item prop="loginId">
          <el-input
            autofocus
            type="text"
            required=""
            placeholder=" 账号"
            v-model="loginForm.loginId"
            prefix-icon="iconfont icon-xia"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            name=""
            required=""
            placeholder=" 密码"
            v-model="loginForm.password"
            prefix-icon="iconfont icon-lock"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item prop="captcha">
          <el-input
            type="text"
            placeholder="请输入验证码"
            v-model="loginForm.captcha"
            class="captcha"
          ></el-input>
          <img :src="'data:image/png;base64,' + url" />
        </el-form-item>
        <el-row class="login">
          <el-button type="success" @click="onSubmit">登录</el-button>
        </el-row>
        <el-row class="psd_reg">
          <router-link to="/forgetPassword">找回密码</router-link>
          <router-link to="/register">注册</router-link>
        </el-row>
      </el-form>
    </div>
  </body>
</template>

<script>
export default {
  data() {
    return {
      url: "",
      loginForm: {
        captcha: "",
        loginId: "210",
        password: "123456",
      },
      // 这是表单的验证规则对象
      loginFormRules: {
        // 验证用户名是否合法
        loginId: [
          { required: true, message: "请输入用户ID", trigger: "blur" },
          {
            min: 1,
            max: 10,
            message: "长度在 1 到 10 个字符",
            trigger: "blur",
          },
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: "请输入登录密码", trigger: "blur" },
          {
            min: 1,
            max: 15,
            message: "长度在 1 到 15 个字符",
            trigger: "blur",
          },
        ],
        // 验证验证码是否合法
        captcha: [{ required: true, message: "请输入验证码", trigger: "blur" }],
      },
      token: localStorage.getItem("token"),
    };
  },
  mounted() {},
  methods: {
    // 向登录接口发起请求
    onSubmit() {
      this.$router.push("/digital-base");
    },
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
    height: 390px;
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
    }
    .el-form {
      .el-form-item {
        .el-input {
          .el-input__inner {
            border: none;
            border-bottom: 1px solid white;
            border-radius: unset;
            font-size: larger;
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
          margin-top: 9px;
        }
      }
    }
  }
}
/deep/ .el-button--success {
  width: 100%;
}
.login {
  text-align: center;
}
.psd_reg {
  color: #fff;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
}
</style>
