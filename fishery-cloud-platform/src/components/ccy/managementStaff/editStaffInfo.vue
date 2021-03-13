<template>
  <el-dialog
    title="修改员工信息"
    :visible.sync="toDialogInfo.dialogVisible"
    width="28%"
    @close="closeEvent"
  >
    <el-form :model="editForm" label-width="100px" :rules="rules" ref="fromRef">
      <el-form-item label="身份" prop="baseIdentity">
        <el-select v-model="editForm.roleId" placeholder="请选择身份">
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="toDialogInfo.dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="editEvent">确 定</el-button>
    </div>
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
      editForm: {
        // avatar: "",
        // baseId: this.$store.state.baseInfo.id,
        // baseIdentity: null,
        // email: "",
        // id: "",
        userId:'',
        roleId:'',
        // username:this.toDialogInfo.username ,
        // passwork: "",
        // username:"",
        // phone: "",
      },
      // 角色数组
      options: [],
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
  created(){
    this.getRoleList()
  },
  methods: {
    async editEvent() {
      console.log(this.toDialogInfo);
      this.editForm.userId = this.toDialogInfo.id;
      console.log(this.editForm);
      const { data: res } = await this.$user.put(`updateUserRole/?userId=${this.editForm.userId}&roleId=${this.editForm.roleId}`)
      console.log(res);
      if (res.statusCode === 20000) {
        this.elMessage.success("修改成功");
        this.$emit("fatherMethods");
        this.toDialogInfo.dialogVisible = false;
      }
    },
    async deleteLabel(){
      const {data:res} = await this.$userLabel.delete(`${id}`)
      console.log(res);
      if(res.statusCode === 20000){
        console.log('删除标签成功');
      }else{
        console.log('删除标签失败');
      }
    },
    closeEvent() {
      this.$refs.fromRef.resetFields();
    },
    async getRoleList(){
      const {data: res} = await this.$role(`noPage/${this.$store.state.baseInfo.id}`)
      console.log(res);
      if(res.statusCode === 20000){
        this.options = res.data
        this.options = this.options.slice(0,2)
      }
    }
  },
};
</script>

<style>
</style>