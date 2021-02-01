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
        return ["登录", "注册", "找回密码"].includes(val);
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

      // 表单
      form: {
        phone: "",
        password: "",
        confirmPassword: "",
        phoneCode: "",
        loginId: "",
        captcha: "",
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
          { required: true, message: "请输入手机验证码", trigger: "blur" },
          {
            len: 6,
            message: "长度为6个字符",
            trigger: "blur",
          },
        ],
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
      <el-form-item label="验证码" prop="phoneCode">
        <el-input
          placeholder="短信验证码"
          style="width: 110px"
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
      <el-form-item prop="captcha">
        <el-input
          type="text"
          placeholder="请输入验证码"
          vModel={this.form.captcha}
          class="captcha"
        ></el-input>
        <img src={"data:image/png;base64," + this.url} />
      </el-form-item>
    );
    // 设置密码
    let password = (
      <el-form-item label="设置密码" prop="password">
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
    // 按钮
    let btn = (
      <el-form-item>
        <el-button type="success" class="handleBtn" onClick={() => this.cb()}>
          {this.btnText}
        </el-button>
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
    };
    return (
      <el-form
        {...{
          props: {
            model: this.form,
            rules: this.rules,
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
    // 根据手机号发送验证码
    sendCode() {
      this.$refs.form.validateField("phone", function (err) {
        // console.log(err);
        if (!err) {
          console.log("发送验证码");
        }
      });
    },
  },
};
</script>
<style lang="less" scoped>
</style>