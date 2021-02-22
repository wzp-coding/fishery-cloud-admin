<script>
import Form from "../Form";
import { mapMutations } from "vuex";
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
      isUpdated: false,
    };
  },
  methods: {
    ...mapMutations(["setUserInfo"]),

    // 修改信息按钮
    async handleSubmit(form) {
      form.id = this.infoForm.id;
      form.username = form.userName;
      console.log("form: ", form);
      const { data: res } = await this.$user.put("/user", form);
      console.log("handleSubmit: ", res);
      if (res.statusCode === 20000) {
        this.isUpdated = true;
        this.elMessage.success(res.message);
        this.closeCallback();
      } else {
        this.elMessage.error(res.message);
      }
    },

    // 获取登录用户的具体信息
    async getSelfInfo() {
      const { data: res } = await this.$user.get("/self");
      console.log("getSelfInfo: ", res);
      this.infoForm = res.data;
      this.$store.commit("setUserInfo", res.data);
    },

    // 关闭前的回调
    beforeClose(done) {
      if (this.isUpdated) {
        done();
      }
      this.elConfirm("您未保存信息，是否保存修改内容后关闭？")
        .then((_) => {
          this.$refs.form.cb();
          done();
        })
        .catch((_) => {
          console.log(_);
          this.elMessage.warning("没有任何修改");
          done();
        });
    },
  },
  created() {
    this.getSelfInfo();
  },
  render(h) {
    const listeners = {
      "update:visible": (val) => this.closeCallback(val),
    };
    return (
      <el-dialog
        title="个人信息"
        visible={this.isShow}
        {...{ on: listeners }}
        width="30%"
        before-close={(done) => this.beforeClose(done)}
        close={() => this.closeCallback()}
      >
        <Form
          callback={this.handleSubmit}
          options={["avatar", "userName", "email", "phone"]}
          button="修改信息"
          defaultForm={this.infoForm}
          ref="form"
        >
          <template slot="showInfo">
            <el-form-item label="基地id">
              <el-input value={this.infoForm.baseId} disabled></el-input>
            </el-form-item>
            <el-form-item label="基地身份">
              <el-input value={this.infoForm.baseIdentity} disabled></el-input>
            </el-form-item>
          </template>
        </Form>
      </el-dialog>
    );
  },
};
</script>