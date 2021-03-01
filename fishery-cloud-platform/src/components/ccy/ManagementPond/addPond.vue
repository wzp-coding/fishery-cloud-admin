<template>
  <el-dialog
    @close="closeEvent"
    title="添加池塘"
    :visible.sync="toDialogInfo.dialogVisible"
    width="30%"
  >
    <el-form
      :model="addeForm"
      :rules="FormRules"
      ref="formRef"
      label-width="125px"
    >
      <el-form-item label="池塘名称" prop="name">
        <el-input v-model="addeForm.name"></el-input>
      </el-form-item>
      <el-form-item label="池塘类型" prop="type">
        <el-input v-model="addeForm.type"></el-input>
      </el-form-item>
      <el-form-item label="池塘面积/m²" prop="area">
        <el-input-number
          v-model="addeForm.area"
          controls-position="right"
          :min="1"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="池塘深度/m" prop="depth">
        <el-input-number
          v-model="addeForm.depth"
          controls-position="right"
          :min="1"
        ></el-input-number>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="toDialogInfo.dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="addPondEvent">确 定</el-button>
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
      addeForm: {
        //与对话框的输入数据绑定
        area: "", //池塘面积
        baseId: "1248910886228332544", //基地id
        creator: "boss", //创建者
        depth: "", //池塘深度
        name: "", //池塘名称
        type: "", //池塘类型
        // version:0
      },
      // 添加表单的验证规则对象
      FormRules: {
        name: [
          { required: true, message: "请输入池塘名称", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "池塘名称的长度在2~10个字符之间",
            trigger: "blur",
          },
        ],
        type: [
          { required: true, message: "请输入池塘类型", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "池塘类型的长度在2~10个字符之间",
            trigger: "blur",
          },
        ],
        depth: [{ required: true, message: "请输入池塘深度", trigger: "blur" }],
        area: [{ required: true, message: "请输入池塘面积", trigger: "blur" }],
      },
    };
  },
  methods: {
    async addPondEvent() {
      const { data: res } = await this.$pondController.post(
        `create}`,
        this.addeForm
      );
      if(res.statusCode === 20000){
          this.elMessage.success("添加池塘成功!!");
          this.$emit('fatherMethods')
          this.$refs.formRef.resetFields();
          this.toDialogInfo.dialogVisible = false
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