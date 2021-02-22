<template>
  <el-dialog title="添加员工" :visible.sync="toDialogInfo">
    <el-form :model="addInfo" :rules="rules">
      <el-select v-model="addInfo.baseIdentity" placeholder="请选择身份">
        <el-option
          v-for="item in options"
          :key="item.id"
          :label="item.value"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="addInfo.email"></el-input>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  props: {
    toDialogInfo: {
      type: Boolean,
    },
  },
  data() {
    return {
      addInfo: {
        avatar: "",
        baseId: "",
        baseIdentity: "",
        email: "",
        password: "",
        phone: "",
        username: "",
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
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 11 个字符", trigger: "blur" },
        ],
      },
    };
  },
};
</script>

<style>
</style>