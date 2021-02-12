<script>
export default {
  props: {
    callback: {
      type: Function,
      required: true,
    },
    options: {
      type: Array,
      default() {
        return ["phone", "phoneCode"];
      },
      validator(arr) {
        const options = [
          "phone",
          "password",
          "confirmPassword",
          "phoneCode",
          "loginId",
          "captcha",
          "userName",
          "email",
          "avatar",
        ];
        let valid = true;
        arr.some((option) => {
          if (!options.includes(option)) {
            valid = false;
            return true;
          }
          return false;
        });
        return valid;
      },
    },
    button: {
      type: String,
      default: "登录",
      validator(val) {
        return ["登录", "注册", "找回密码", "修改信息","修改密码"].includes(val);
      },
    },
    defaultForm: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    // 自定义表单校验设置密码和确认密码
    var validatePassword = (rule, value, callback) => {
      if (this.form.password === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.form.confirmPassword !== "") {
          this.$refs.form.validateField("confirmPassword");
        }
        callback();
      }
    };

    var validateConfirmPassword = (rule, value, callback) => {
      if (this.form.confirmPassword === "") {
        callback(new Error("请再次输入密码"));
      } else if (this.form.confirmPassword !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      // 发送验证码标志
      isSended: false,

      // 发送验证码倒计时
      count: 60,

      // 图形验证码图片
      url: "",

      //   按钮文本内容
      btnText: this.button,

      // 打开上传文件弹窗标志
      isOpen: false,

      // 表单
      form: {
        phone: this.defaultForm.phone,
        password: "",
        confirmPassword: "",
        phoneCode: "",
        loginId: this.defaultForm.id,
        captcha: "",
        userName: this.defaultForm.username,
        email: this.defaultForm.email,
        avatar: this.defaultForm.avatar || "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
      },

      //表单验证规则
      rules: {
        // 验证用户ID是否合法
        loginId: [
          { required: true, message: "请输入用户ID", trigger: "blur" },
          {
            min: 1,
            max: 10,
            message: "长度在 1 到 10 个字符",
            trigger: "blur",
          },
        ],

        // 验证密码
        password: [
          {
            validator: validatePassword,
            trigger: "blur",
            required: true,
          },
          {
            pattern: /^[a-zA-Z]\w{5,17}$/,
            message: "以字母开头，长度在6~18之间，只能包含字母、数字和下划线",
          },
        ],

        // 确认密码
        confirmPassword: [
          {
            validator: validateConfirmPassword,
            required: true,
            trigger: "blur",
          },
        ],

        // 用户名
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "blur",
          },
        ],

        // 手机
        phone: [
          {
            required: true,
            message: "请输入手机号码",
            trigger: "blur",
          },
          {
            len: 11,
            pattern: /1\d{10}/,
            message: "号码必须以1开头且长度是11位",
          },
        ],

        // 图形验证码
        captcha: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          {
            len: 4,
            message: "长度为4个字符",
            trigger: "blur",
          },
        ],

        // 短信验证码
        phoneCode: [
          { required: true, message: "请输入短信验证码", trigger: "blur" },
          {
            len: 6,
            message: "长度为6个字符",
            trigger: "blur",
          },
        ],

        // 邮箱
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {
            pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
            message: "邮箱格式不正确",
          },
        ],

        // 头像
        avatar: [{ required: true, message: "请上传图片", trigger: "blur" }],
      },
    };
  },
  render(h) {
    // 输入手机号
    let phone = (
      <el-form-item label="手机" prop="phone">
        <el-input
          vModel={this.form.phone}
          placeholder="请输入手机号码"
          prefix-icon="el-icon-mobile-phone"
          style="font-size:14px;"
        ></el-input>
      </el-form-item>
    );

    // 短信验证码
    let phoneCode = (
      <el-form-item label="验证码" prop="phoneCode" inline={true}>
        <el-input
          placeholder="短信验证码"
          style="width: 100px"
          vModel={this.form.phoneCode}
        ></el-input>
        <el-button
          disabled={this.isSended}
          type="success"
          onClick={() => this.sendCode()}
        >
          <span vShow={this.isSended}>{this.count}s</span> 发送验证码
        </el-button>
      </el-form-item>
    );

    // 图形验证码
    let captcha = (
      <el-form-item prop="captcha" label="验证码">
        <el-input
          type="text"
          placeholder="请输入验证码"
          vModel={this.form.captcha}
          class="captcha"
        ></el-input>
        <img
          src={"data:image/png;base64," + this.url}
          onClick={() => {
            this.getCaptcha();
          }}
        />
      </el-form-item>
    );

    // 密码
    let password = (
      <el-form-item label="密码" prop="password">
        <el-input
          vModel={this.form.password}
          placeholder="设置密码"
          prefix-icon="el-icon-lock"
          show-password
        ></el-input>
      </el-form-item>
    );

    // 确认密码
    let confirmPassword = (
      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input
          placeholder="确认密码"
          type="confirmPassword"
          vModel={this.form.confirmPassword}
          prefix-icon="el-icon-unlock"
          show-password
        ></el-input>
      </el-form-item>
    );

    // 用户ID
    let loginId = (
      <el-form-item prop="loginId">
        <el-input
          autofocus
          type="text"
          required=""
          placeholder=" 账号"
          vModel={this.form.loginId}
          prefix-icon="iconfont icon-xia"
        ></el-input>
      </el-form-item>
    );

    // 用户名
    let userName = (
      <el-form-item label="用户名" prop="userName">
        <el-input
          vModel={this.form.userName}
          placeholder="请输入用户名"
          prefix-icon="el-icon-user"
        ></el-input>
      </el-form-item>
    );

    // 邮箱
    let email = (
      <el-form-item label="邮箱" prop="email">
        <el-input
          vModel={this.form.email}
          placeholder="请输入邮箱"
          prefix-icon="el-icon-message"
        ></el-input>
      </el-form-item>
    );

    // 头像
    let avatar = (
      <el-form-item label="头像" prop="avatar" inline={true}>
        <el-avatar size={50} src={this.form.avatar}>无</el-avatar>
        <el-button onClick={() => (this.isOpen = true)} class="avatar">
          上传头像
        </el-button>
        <UploadFile
          type='image'
          upload-success={(file) => this.uploadAvatar(file)}
          close-modal={() => (this.isOpen = false)}
          is-open={this.isOpen}
        ></UploadFile>
      </el-form-item>
    );

    // 所有的表单选项
    let allOptions = {
      phone,
      phoneCode,
      captcha,
      password,
      confirmPassword,
      loginId,
      userName,
      email,
      avatar,
    };

    // 按钮
    let btn = (
      <el-form-item>
        <el-button
          type="success"
          size="medium"
          class="handleBtn"
          onClick={() => this.cb()}
        >
          {this.btnText}
        </el-button>
      </el-form-item>
    );

    return (
      <el-form
        {...{
          props: {
            model: this.form,
            // -----------------------------------------------------------------------------------------------------------
            // rules: this.rules,
          },
        }}
        ref="form"
        label-width="80px"
      >
        {
          // 渲染表单选项
          this.options.map((component) => allOptions[component])
        }
        {
          // 插槽
          this.$slots.showInfo
        }
        {
          // 渲染按钮
          btn
        }
      </el-form>
    );
  },

  methods: {
    // 点击登录、注册、找回密码按钮时触发的回调函数
    cb() {
      // 校验函数
      this.$refs["form"].validate((valid, obj) => {
        // console.log("valid: ", valid);
        if (valid) {
          // 处理应该传出去的retForm
          let retForm = {};
          this.options.forEach((key) => {
            retForm[key] = this.form[key];
          });
          this.callback(retForm);
        }
      });
    },

    // 验证码发送倒计时
    startCountDown() {
      let timer = setInterval(() => {
        if (this.count > 0) {
          this.count--;
        } else {
          clearInterval(timer);
          this.isSended = false;
          this.count = 60;
        }
      }, 1000);
    },

    // 根据手机号发送验证码
    sendCode() {
      this.$refs.form.validateField("phone", async (err) => {
        // console.log(err);
        if (!err) {
          // console.log("发送验证码");
          // 类型：1是修改资料，2是登录，3是注册
          let type;
          if (this.button === "登录") {
            type = 2;
          } else if (this.button === "注册") {
            type = 3;
          } else if (this.button === "找回密码" || this.button === "修改密码") {
            type = 1;
          }
          let url = `/sendVerify/${type}/${this.form.phone}`;
          const { data: res } = await this.$message.get(url);
          // console.log('res: ', res);
          // 已成功发送信息，开始倒计时
          this.isSended = true;
          this.elMessage.success(res.message);
          this.startCountDown();
        } else {
          this.elMessage.error(res.message);
        }
      });
    },

    // 点击图片获取验证码
    async getCaptcha() {
      const { data: res } = await this.$captcha.post("/getCaptcha");
      this.url = res.data.img;
    },

    // 点击上传图片
    async uploadAvatar(file) {
      // console.log('file: ', file);
      this.form.avatar = file.url;
    },
  },
};
</script>
<style lang="less" scoped>
.avatar {
  display: inline-block;
  vertical-align: 20px;
  margin-left: 20px;
}
</style>