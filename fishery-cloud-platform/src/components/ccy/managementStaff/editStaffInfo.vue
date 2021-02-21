<template>
  <el-dialog
    title="修改员工信息"
    :visible.sync="toDialogInfo.dialogVisible"
    width="28%"
  >
    <el-form :model="editForm" label-width="100px" :rules="rules">
      <el-form-item label="姓名" prop="username">
        <el-input v-model="editForm.name" ></el-input>
      </el-form-item>
      <el-form-item label="身份" prop="baseIdentity">
        <el-input v-model="editForm.baseIdentity" ></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="editForm.email"></el-input>
      </el-form-item>
      <el-form-item label="联系电话" prop="phone">
        <el-input v-model="editForm.phone" ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="passwork">
        <el-input v-model="editForm.passwork" ></el-input>
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
        avatar:"",
        baseId:this.$store.state.baseInfo.id,
        baseIdentity:'',
        email: "",
        id: "",
        username: "",
        passwork: "",
        phone: "",
      },
      rules: {
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {
            min: 3,
            max: 15,
            message: "长度在 3 到 11 个字符",
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
  methods:{
      async editEvent(){
        console.log(this.toDialogInfo);
        this.editForm.id = this.toDialogInfo.id
        console.log(this.editForm);
        const {data : res} = await this.$admin.put('admin/update',this.editForm)
        console.log(res);
        if(res.statusCode === 20000){
          this.elMessage.success('修改成功')
        }
        this.toDialogInfo.dialogVisible = false;
      }
  }
};
</script>

<style>
</style>