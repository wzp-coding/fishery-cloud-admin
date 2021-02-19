<template>
  <el-dialog
    title="修改入库信息"
    :visible.sync="dialogInfo.dialogVisible"
    width="25%"
    @close="closeEvent"
  >
    <el-form :model="editInfo" label-width="140px" :rules="FormRules" ref="formRef">
      <el-form-item label="投入品" prop="supplyName">
        <el-input v-model="editInfo.supplyName"></el-input>
      </el-form-item>
      <el-form-item label="投入品类型" prop="supplyTypeName">
        <el-input v-model="editInfo.supplyTypeName" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="投入品剩余质量" prop="inWeight">
        <el-input v-model="editInfo.inWeight"></el-input>
      </el-form-item>
      <el-form-item label="操作人" prop="operatorName">
        <el-input v-model="editInfo.operatorName"></el-input>
      </el-form-item>
      <el-form-item label="操作人身份" prop="operatorIdentity">
        <el-input v-model="editInfo.operatorIdentity"></el-input>
      </el-form-item>
      <el-form-item label="仓库号" prop="warehouseNumber">
        <el-input v-model="editInfo.warehouseNumber"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogInfo.dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="editSupply">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    dialogInfo: {
      type: Object,
    },
  },
  data() {
    return {
      editInfo: {
        baseId: 1248910886228332544,
        id: "",
        inWeight: "",
        operatorIdentity: "",
        operatorName: "",
        supplyId: "",
        supplyName: "",
        supplyTypeName: "饲料",
        warehouseNumber: "",
      },
      FormRules: {
        supplyName: [
          { required: true, message: "请输入投入品名称", trigger: "blur" },
        ],
        operatorName: [
          { required: true, message: "请输入操作人", trigger: "blur" },
        ],
        warehouseNumber: [
          { required: true, message: "请输入仓库号", trigger: "blur" },
        ],
        inWeight: [
          { required: true, message: "请输入剩余数量", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    async editSupply() {
      this.editInfo.id = this.dialogInfo.id;
      const { data: res } = await this.$baseSupply.put("in", this.editInfo);
      this.dialogInfo.dialogVisible = false
      if ((res.statusCode = 20000)) {
        this.$emit("fatherMethod");
      }
    },
    closeEvent(){
      this.$refs.formRef.resetFields()
    }
  },
};
</script>

<style>
</style>