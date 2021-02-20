<template>
  <el-dialog
    @close="closeEvent"
    width="30%"
    :visible.sync="toDialogInfo.dialogVisible"
    title="修改出库记录"
  >
    <el-form :model="editInfo" label-width="135px" ref="formRef" :rules="rules">
      <el-form-item label="操作者身份" prop="operatorIdentity">
        <el-input v-model="editInfo.operatorIdentity"></el-input>
      </el-form-item>
      <el-form-item label="操作者姓名" prop="operatorName">
        <el-input v-model="editInfo.operatorName"></el-input>
      </el-form-item>
      <el-form-item label="投入品类别" prop="supplyTypeName">
        <el-input v-model="editInfo.supplyTypeName" disabled></el-input>
      </el-form-item>
      <el-form-item label="投入品" prop="supplyName">
        <el-input v-model="editInfo.supplyName"></el-input>
      </el-form-item>
      <el-form-item label="请输入仓库号" prop="warehouseNumber">
        <el-input v-model="editInfo.warehouseNumber"></el-input>
      </el-form-item>
      <el-form-item label="请输入出库数量" prop="outWeight">
        <el-input-number
          controls-position="right"
          :min="1"
          v-model="editInfo.outWeight"
        ></el-input-number>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="toDialogInfo.dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="editEvent()">确 定</el-button>
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
        baseId: this.$store.state.userInfo.baseId,
        id: "",
        operatorIdentity: "",
        operatorName: "",
        supplyId: "",
        supplyName: "",
        supplyTypeName: "饲料",
        warehouseNumber: "",
        outWeight: "",
      },
      rules: {
        operatorIdentity: [
          { required: true, message: "请输入操作者身份", trigger: "blur" },
        ],
        operatorName: [
          { required: true, message: "请输入操作员", trigger: "blur" },
        ],
        supplyName: [
          { required: true, message: "请输入投入品名称", trigger: "blur" },
        ],
        warehouseNumber: [
          { required: true, message: "请输入仓库号", trigger: "blur" },
        ],
        inWeight: [
          { required: true, message: "请输入投入品数量", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    closeEvent() {
      this.$refs.formRef.resetFields();
    },
    async editEvent() {
      console.log(this.toDialogInfo.id);
      this.editInfo.id = this.toDialogInfo.id
        const {data : res } = await this.$baseSupply.put('out', this.editInfo)
        console.log(res);
        if(res.statusCode === 20000){
            this.elMessage.success('修改出库记录成功')
            this.toDialogInfo.dialogVisible = false
        }
    },
  },
};
</script>

<style>
</style>