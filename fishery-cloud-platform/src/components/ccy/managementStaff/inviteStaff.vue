<template>
  <el-dialog
    @close="closeEvent"
    title="邀请员工"
    :visible.sync="toDialogInfo.dialogVisible"
    :close-on-click-modal="false"
    width="50%"
  >
    <el-form :model="searchInfo">
      <el-form-item
        label="搜索员工"
        prop="id"
        class="inviteMember"
        label-width="90px"
      >
        <el-input
          placeholder="请输入要邀请的用户ID"
          v-model="searchInfo.id"
          class="input-with-select"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="searchInviteMember"
          ></el-button>
        </el-input>
      </el-form-item>
    </el-form>
    <el-table :data="userData"  v-loading="loading" v-if="!loading" style="width:100%">
      <el-table-column prop="id" label="id">
      </el-table-column>
      <el-table-column prop="phone" label="手机号码">
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template>
          <el-button
            size="mini"
            type="primary"
            @click="inviteWorker()"
            >邀请</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- <div slot="footer" class="dialog-footer">
      <el-button @click="toDialogInfo.dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="inviteEvent">确 定</el-button>
    </div> -->
  </el-dialog>
</template>

<script>
export default {
  props: {
    toDialogInfo: {
      type: Object,
    },
  },
  data() {
    return {
      searchInfo: {
        id: "",
      },
      loading: true,
      userData: [],
      options: [
        {
          id: "1",
          value: "员工",
        },
        {
          id: "2",
          value: "老板",
        },
      ],
      rules: {
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {
            required: true,
            pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
            message: "请输入正确的邮箱",
            trigger: "blur",
          },
        ],
        username: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          {
            min: 2,
            max: 15,
            message: "长度在 2 到 10 个字符",
            trigger: "blur",
          },
        ],
        phone: [
          { required: true, message: "请输入电话", trigger: "blur" },
          {
            min: 3,
            max: 15,
            message: "长度在 3 到 11 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 3,
            max: 15,
            message: "长度在 3 到 11 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    closeEvent() {
      this.userData = [];
      this.searchInfo.id = ""
    },
    async searchInviteMember() {
      console.log(this.searchInfo.id);
      const { data: res } = await this.$user.get(`/${this.searchInfo.id}`);
      console.log(res);
      if(res.statusCode === 20000 ){
        this.userData = [res.data];
        this.loading = false;
      }else{
        this.elMessage.info('查无此ID用户')
      }
      // const { data: res } = await this.$user.get(`${this.searchInfo.id}`);
      // console.log(res);
      // if (res.statusCode === 20000) {
      //   this.userData[0] = res.data;
      //   this.loading = false;
      // } else {
      //   this.elMessage.info("查无此ID用户");
      // }
    },
    async inviteWorker() {
      const { data: res } = await this.$user.get(`invite/${this.searchInfo.id}`);
      console.log(res);
      if (res.statusCode === 20000) {
        this.elMessage.success("成功发出邀请");
        this.toDialogInfo.dialogVisible = false;
      } else {
        console.error("邀请失败");
      }
    },
  },
};
</script>

<style>
</style>