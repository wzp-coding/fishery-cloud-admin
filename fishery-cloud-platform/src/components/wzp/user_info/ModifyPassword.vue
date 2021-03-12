<script>
import Form from "../Form";
export default {
  components: {
    Form,
  },
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    closeCallback: {
      type: Function,
    },
  },
  data() {
    return {
      infoForm: {},
      isModified: false,
    };
  },
  methods: {
    async handleSubmit(form) {
      // console.log('form: ', form);
      let { phoneCode } = form;
      const url = `/retrievePassword/${phoneCode}`;
      const { data: res } = await this.$user.post(url, form);
      if (res.statusCode === 20000) {
        this.elMessage.success(res.message);
        this.closeCallback();
        this.elMessage.warning('请您用新密码重新登录！')
        this.$router.push('/login');
      } else {
        this.elMessage.error(res.message);
      }
      // console.log('res: ', res);
    },
    beforeClose(done) {
      if (this.isModified) {
        done();
      }
      this.elConfirm("您未修改密码，是否保存修改密码后关闭？")
        .then((_) => {
          this.$refs.form.cb()
          done();
        })
        .catch((_) => {
          //   console.log(_)
          this.elMessage.warning("没有任何修改");
          done();
        });
    },
  },
  render(h) {
    const listeners = {
      "update:visible": (val) => this.closeCallback(val),
    };
    return (
      <el-dialog
        title="修改密码"
        visible={this.isShow}
        {...{ on: listeners }}
        width="30%"
        before-close={(done) => this.beforeClose(done)}
        close={() => this.closeCallback()}
      >
        <Form
          callback={this.handleSubmit}
          options={["phone", "password", "phoneCode"]}
          button="修改密码"
          ref="form"
        ></Form>
      </el-dialog>
    );
  },
};
</script>