<template>
  <el-dialog
    title="修改员工信息"
    :visible.sync="toDialogInfo.dialogVisible"
    width="28%"
  >
    <el-form :model="editForm" label-width="100px">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="editForm.name" ></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="editForm.email"></el-input>
      </el-form-item>
      <el-form-item label="联系电话" prop="mobile">
        <el-input v-model="editForm.mobile" disabled></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="passwork">
        <el-input v-model="editForm.passwork" disabled></el-input>
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
        email: "",
        loginId: this.toDialogInfo.id,
        mobile: "",
        name: "",
        passwork: "",
        phone: "",
      },
    };
  },
  methods:{
      async editEvent(){
        const {data : res} = await this.$admin.put('admin/update',this.editForm)
        console.log(res);
      }
  }
};
</script>

<style>
</style>