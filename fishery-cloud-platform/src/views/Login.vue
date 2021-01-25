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
          <img :src="'data:image/png;base64,' + url" @click="getCaptcha" />
        </el-form-item>
        <el-button type="primary" @click="onSubmit">登录</el-button>
      </el-form>
    </div>
    <el-alert v-if="play" :title="frequent" type="warning" show-icon>
    </el-alert>
    <el-alert v-if="splay" title="无访问权限" type="error" show-icon>
    </el-alert>
  </body>
</template>

<script>
export default {
  data() {
    return {
      play: false,
      splay: false,
      url: "",
      frequent: "",
      loginForm: {
        captcha: "",
        loginId: null,
        password: null,
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
  mounted() {
    this.getCaptcha();
  },
  methods: {
    async isLogined() {
      const { data: res } = await this.$user.get("self");
      if (res.code === 20000) {
        this.$router.push("/home");
      }
    },

    // 向图片验证码端口发起请求
    getCaptcha() {
      this.$auth.post(`/captcha/getCaptcha`).then((ret) => {
        // console.log(ret);
        if (ret.data.code == 20001) {
          this.operation();
          this.frequent = ret.data.message;
        }
        this.url = ret.data.data.img;
      });
    },

    // 验证码刷新频繁操作
    operation() {
      this.play = true;
      setTimeout(this.operation1, 3000);
    },

    operation1() {
      this.play = false;
    },

    // 用户无baseId弹窗
    roperation() {
      this.splay = true;
      setTimeout(this.roperation1, 3000);
    },

    roperation1() {
      this.splay = false;
    },

    // 向登录接口发起请求
    onSubmit() {
      this.$auth
        .post(`/user/login?captcha=${this.loginForm.captcha}`, {
          loginId: this.loginForm.loginId || 210,
          password: this.loginForm.password || 123456,
        })
        .then((res) => {
          // console.log('res: ', res);
          // 登录失败刷新验证码
          if (res.data.flag == false) {
            this.getCaptcha();
            this.$message.error(res.data.message);
          }
          // 登录成功保留token值
          else {
            localStorage.setItem(`token`, "Bearer " + res.headers.token);
            localStorage.setItem("baseId", res.data.data.baseId);
            this.$router.push(`/digital-base`);
            this.$message.success(`登录成功`);
          }
        });
    },
  },
};
</script>

<style lang="less" scoped>
body {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
  background: url("../assets/20191220175048131.jpg");
  background-size: cover;
  /deep/.box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 360px;
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
/deep/ .el-button--primary {
  float: right;
}
</style>
