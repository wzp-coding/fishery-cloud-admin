<template>
  <div>
    <el-form
      label-position="right"
      label-width="80px"
      :model="userInfo"
      :rules="rules"
    >
      <el-form-item label="头像" prop="avatar">
        <el-avatar size="large" :src="userInfo.avatar"></el-avatar>
      </el-form-item>
      <el-form-item label="用户名" prop="userName">
        <el-input v-model="userInfo.userName"></el-input>
      </el-form-item>
      <el-form-item label="手机" prop="phone">
        <el-input v-model="userInfo.phone"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="userInfo.email"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="userInfo.password"></el-input>
      </el-form-item>
      <el-form-item label="昵称" prop="nickName">
        <el-input v-model="userInfo.nickName"></el-input>
      </el-form-item>
      <el-form-item label="养殖基地" prop="base">
        <el-input v-model="userInfo.base" disabled></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userInfo: {
        userName: "略",
        phone: "略",
        email: "略",
        password: "略",
        nickName: "略",
        base: "略",
        avatar:
          "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      },
      // 添加表单的验证规则对象
      rules: {
        avatar: [{ required: true, message: "请上传图片", trigger: "blur" }],
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        phone: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { pattern: /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/, message: "手机号码格式不正确" },
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {
            pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
            message: "邮箱格式不正确",
          },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" },{
            pattern:/^[a-zA-Z]\w{5,17}$/,message:'以字母开头，长度在6~18之间，只能包含字母、数字和下划线'
        }],
        nickName: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          {
            pattern: /^[\u4E00-\u9FA5A-Za-z0-9_]+$/,
            message: "昵称格式：中文、英文、数字包括下划线",
          },
        ],
      },
    };
  },
};
</script>
<style lang="less" scoped>
</style>