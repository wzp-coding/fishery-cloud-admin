<template>
  <body>
    <div class="box">
      <h2>智慧渔业云服务平台</h2>
      <!-- 表单区域 -->
      <Form :callback="handleSubmit"></Form>
      <el-row class="psd_reg">
        <router-link to="/forgetPassword">找回密码</router-link>
        <router-link to="/register">注册</router-link>
      </el-row>
    </div>
  </body>
</template>

<script>
import Form from '../../components/wzp/user_info/Form'
export default {
  data() {
    return {
      token: localStorage.getItem("token"),
    };
  },
  components:{
    Form,
  },
  methods: {
    // 向登录接口发起请求
    handleSubmit(form) {
      console.log('form: ', form);
      // this.$router.push("/digital-base");
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
    height: 350px;
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
          margin-top: 9px;
        }
      }
    }
  }
}
/deep/ .el-button.el-button--success.handleBtn{
  width: 100%;
}
.psd_reg {
  color: #fff;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
}
</style>
