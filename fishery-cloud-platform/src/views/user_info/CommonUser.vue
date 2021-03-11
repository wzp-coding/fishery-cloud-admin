<template>
  <div class="create-base-container">
    <el-container>
      <el-main style="backgroundcolor: transparent;" >
        <el-card class="create-base-card">
          <el-header
            style="
              text-align: center;
              line-height: 60px;
              box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
              margin-bottom: 5px;
            "
            >普 通 用 户
          </el-header>
          <el-tabs
            v-model="activeName"
            type="card"
            stretch
          >
            <el-tab-pane label="用户中心" name="userInfo">
              <Form
                :callback="this.handleSubmit"
                :options="['avatar', 'loginId', 'userName', 'email', 'phone']"
                button="修改信息"
                :defaultForm="this.infoForm"
                ref="form"
              >
              </Form>
            </el-tab-pane>
            <el-tab-pane label="修改密码" name="updatePsd"
              >
              <UpdatePsd></UpdatePsd>
              </el-tab-pane
            >
            <el-tab-pane label="邀请信息" name="invitedInfo"
              >
              <InvitatedInfo></InvitatedInfo>
              </el-tab-pane
            >
          </el-tabs>
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import { mapState } from "vuex";
import Form from "../../components/wzp/Form";
import InvitatedInfo from "../../components/wzp/user_info/InvitatedInfo";
import UpdatePsd from "../../components/wzp/user_info/UpdatePsd";
export default {
  components: {
    Form,
    InvitatedInfo,
    UpdatePsd
  },
  data() {
    return {
      activeName: "userInfo",
      infoForm: {},
    };
  },
  computed: {
    ...mapState(["userInfo"]),
  },
  methods: {
    // 修改信息 按钮
   async handleSubmit(form) {
     console.log('form: ', form);
    //  return
      form.id = form.loginId;
      form.username = form.userName;
      // console.log("form: ", form);
      const { data: res } = await this.$user.put("/user", form);
      console.log("handleSubmit: ", res);
      if (res.statusCode === 20000) {
        // 更新vuex里的用户信息
        this.$store.commit('setUserInfo',Object.assign(this.userInfo,form));
        this.elMessage.success(res.message);
      } else {
        this.elMessage.error(res.message);
      }
    },
  },
  created() {
    const { userName: username } = this.userInfo;
    console.log('this.infoForm: ', this.infoForm);
    this.infoForm = {...this.userInfo,username};
  },
};
</script>

<style lang="less" scoped>
.create-base-container {
  background-image: url("../../assets/images/loginbg.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
  .create-base-card {
    margin: auto;
    width: 50%;
  }
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .create-base-footer {
    margin-top: 10px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>