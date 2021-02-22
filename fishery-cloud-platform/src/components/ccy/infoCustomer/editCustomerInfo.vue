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
import { checkEmail, checkPhone } from "../../ccy/public/formCheck";
export default {
  props: {
    toDialogInfo: {
      type: Object,
    },
  },
  data() {
    // var checkPhone = (rule, value, callback) => {
    //   const phoneReg = /^1[3|4|5|7|8][0-9]{9}$/;
    //   if (!value) {
    //     return callback(new Error("电话号码不能为空"));
    //   }
    //   setTimeout(() => {
    //     // Number.isInteger是es6验证数字是否为整数的方法,但是我实际用的时候输入的数字总是识别成字符串
    //     // 所以我就在前面加了一个+实现隐式转换

    //     if (!Number.isInteger(+value)) {
    //       callback(new Error("请输入数字值"));
    //     } else {
    //       if (phoneReg.test(value)) {
    //         callback();
    //       } else {
    //         callback(new Error("电话号码格式不正确"));
    //       }
    //     }
    //   }, 100);
    // };
    // var checkEmail = (rule, value, callback) => {
    //   const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
    //   if (!value) {
    //     return callback(new Error("邮箱不能为空"));
    //   }
    //   setTimeout(() => {
    //     if (mailReg.test(value)) {
    //       callback();
    //     } else {
    //       callback(new Error("请输入正确的邮箱格式"));
    //     }
    //   }, 100);
    // };
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
        id: "",
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
            required: true,
            pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
            message: "请输入正确的邮箱",
            trigger: "blur",
          },
        ],
        phoneNumber: [
          { required: true, message: "请输入客户联系电话", trigger: "blur" },
          {
            min: 3,
            max: 15,
            message: "长度在 6 到 15 个字符",
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
  created() {
    this.temp();
  },
  methods: {
    async editEvent() {
      this.editInfo.id = this.toDialogInfo.id;
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
    // validateEmail(rule, value, callback) {
    //   if (!isEmail(value)) {
    //     callback(new Error("邮箱格式错误"));
    //   } else {
    //     callback();
    //   }
    // },
    temp() {
      console.log(this);
    },
    checkEmail: function () {
      checkEmail();
    },
  },
};
</script>

<style>
</style>