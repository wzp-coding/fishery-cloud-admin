<template>
  <el-dialog
    @close="closeEvent"
    title="添加员工"
    :visible.sync="toDialogInfo.dialogVisible"
    width="30%"
  >
    <el-form :model="addInfo" :rules="rules" label-width="115px" ref="formRef">
      <el-form-item label="姓名" prop="username">
        <el-input v-model="addInfo.username"></el-input>
      </el-form-item>
      <!-- <el-form-item label="职位" prop="baseIdentity">
        <el-select v-model="addInfo.baseIdentity" placeholder="请选择身份">
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.value"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="addInfo.email"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="addInfo.password"></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="phone">
        <el-input v-model="addInfo.phone"></el-input>
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
      addInfo: {
        // avatar: "",
        baseId: this.$store.state.baseInfo.id,
        // baseIdentity: "",
        email: "",
        password: "",
        phone: "",
        username: "",
        // isAdmin:1,
        // usernameStatus:true
      },
      options: [
        {
          id: "1",
          value: "员工",
        },
        {
          id: "2",
          value: "经理",
        },
      ],
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
  methods: {
    async editEvent() {
      console.log(this.addInfo);
      const { data: res } = await this.$admin.post("", this.addInfo);
      if (res.statusCode === 20000) {
        this.toDialogInfo.dialogVisible = false;
        this.elMessage.success('添加成功')
        this.$emit('fatherMethods')
      }
      console.log(res);
      console.log(this.addInfo);
    },
    closeEvent() {
      this.$refs.formRef.resetFields();
    },
  },
};
</script>

<style>
</style>