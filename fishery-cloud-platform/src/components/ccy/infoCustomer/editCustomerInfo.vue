<template>
  <el-dialog
    title="修改客户信息"
    :visible.sync="toDialogInfo.dialogVisible"
    width="29%"
    @close="closeEvent"
  >
    <el-form :model="editInfo" label-width="120px" :rules="rules" ref="formRef">
      <el-form-item label="客户名" prop="customerName">
        <el-input v-model="editInfo.customerName"></el-input>
      </el-form-item>
      <el-form-item label="联系人" prop="contactPerson">
        <el-input v-model="editInfo.contactPerson"></el-input>
      </el-form-item>
      <el-form-item label="客户类型" prop="contactPerson">
        <el-select v-model="editInfo.customerType" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.type"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="editInfo.email"></el-input>
      </el-form-item>
      <el-form-item label="电话号码" prop="phoneNumber">
        <el-input v-model="editInfo.phoneNumber"></el-input>
      </el-form-item>
      <el-form-item label="收货地址" prop="receiveAddress">
        <el-input v-model="editInfo.receiveAddress"></el-input>
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
      editInfo: {
        addressLatitude: "",
        addressLongitude: "",
        baseId: this.$store.state.baseInfo.id,
        contactPerson: "",
        customerName: "",
        customerType: "",
        email: "",
        phoneNumber: "",
        receiveAddress: "",
        id: this.toDialogInfo.id,
      },
      options: [
        {
          id: 2,
          type: "企业",
        },
        {
          id: 1,
          type: "个人",
        },
      ],
      rules: {
        contactPerson: [
          { required: true, message: "请输入联系人姓名", trigger: "blur" },
          {
            min: 2,
            max: 15,
            message: "长度在 2 到 15 个字符",
            trigger: "blur",
          },
        ],
        customerName: [
          { required: true, message: "请输入客户名或单位", trigger: "blur" },
          {
            min: 2,
            max: 15,
            message: "长度在 3 到 15 个字符",
            trigger: "blur",
          },
        ],
        email: [
          { required: true, message: "请输入客户邮箱", trigger: "blur" },
          {
            min: 3,
            max: 15,
            message: "长度在 3 到 15 个字符",
            trigger: "blur",
          },
        ],
        phoneNumber: [
          { required: true, message: "请输入客户联系电话", trigger: "blur" },
          {
            min: 3,
            max: 15,
            message: "长度在 3 到 15 个字符",
            trigger: "blur",
          },
        ],
        receiveAddress: [
          { required: true, message: "请输入收货地址", trigger: "blur" },
          {
            min: 3,
            max: 15,
            message: "长度在 3 到 33 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    async editEvent() {
      console.log(this.toDialogInfo);
    //   this.editInf.id = this.toDialogInfo.id;
      console.log(this.editInfo);
      const { data: res } = await this.$Customer.put("", this.editInfo);
      console.log(res);
      if (res.statusCode === 20000) {
        this.toDialogInfo.dialogVisible = false;
        this.elMessage.success("修改客户信息成功");
        this.$emit("fatherMethods");
      }
    },
    closeEvent() {
      this.$refs.formRef.resetFields();
    },
  },
};
</script>

<style>
</style>