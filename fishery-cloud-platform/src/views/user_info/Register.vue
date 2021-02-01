<template>
  <div class="lxl-login">
    <div class="lxl-page">
      <el-card class="box-card">
        <div class="lxl-title">
          <p style="font-size: 26px">注册页面</p>
        </div>
        <div class="lxl-form">
          <Form :callback="handleSubmit" :options="['phone','password','confirmPassword','phoneCode']" button="注册"></Form>
        </div>
        <div style="display: flex; justify-content: flex-end">
          <router-link to="/login">登录</router-link>
          <el-divider direction="vertical"></el-divider>
          <router-link to="/forgetPassword">忘记密码 ？</router-link>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
import Form from '../../components/wzp/user_info/Form'
export default {
  data() {
    
    return {
      // 第1，2个为计时器
      count: "",
      url: "",
      regForm: {
        captcha: "",
        phoneCode: "",
        userName: "",
        password: "",
        checkpassword: "",
        phone: "",
      },
      
    };
  },
  components:{
    Form,
  },
  created() {},
  methods: {
    handleSubmit(form){
      console.log('form: ', form);

    }
  },
};
</script>
<style lang="less" scoped>
.lxl-login {
  background-image: url("../../assets/131.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
// .lxl-page {
//   height: 30rem;
// }
.avatar_box {
  height: 100px;
  width: 100px;
  border: 1px solid rgb(255, 246, 246);
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px #ddd;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: rgb(236, 236, 236);
  }
}
.box-card {
  height: 490px;
  width: 380px;
  background-color: rgba(0, 0, 0, 0.8);
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.5);
  border: none;
  border-radius: 2%;
}
a {
  text-decoration: none;
}
.router-link-active {
  text-decoration: none;
}
.lxl-title {
  display: flex;
  justify-content: center;
  margin: 10px;
  margin-bottom: 20px;
  color: rgb(95, 95, 95);
}
</style>