<template>
  <el-dialog
    @close="closeEvent"
    title="农资出库"
    :visible.sync="toDialogInfo.dialogVisible"
    width="30%"
  >
    <el-form :model="addInfo" label-width="130px" ref="formRef" :rules="rules">
      <el-form-item label="操作者身份" prop="operatorIdentity">
        <el-input v-model="addInfo.operatorIdentity"></el-input>
      </el-form-item>
      <el-form-item label="操作者姓名" prop="operatorName">
        <el-input v-model="addInfo.operatorName"></el-input>
      </el-form-item>
      <el-form-item label="投入品类别" prop="supplyTypeName">
        <el-input v-model="addInfo.supplyTypeName" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="请输入仓库号" prop="warehouseNumber">
        <el-input v-model="addInfo.warehouseNumber"></el-input>
      </el-form-item>
      <el-form-item label="请选择投入品" prop="supplyName">
        <el-select v-model="addInfo.supplyId" placeholder="请选择">
          <el-option
            v-for="item in supplyList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="请输入出库数量" prop="outWeight">
        <el-input-number
          controls-position="right"
          :min="1"
          v-model="addInfo.outWeight"
        ></el-input-number>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="toDialogInfo.dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="searchSupply">确 定</el-button>
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
      supplyList: [],  
      baseId: this.$store.state.userInfo.baseId,
      addInfo: {
        baseId: this.$store.state.userInfo.baseId,
        outWeight: 1,
        operatorIdentity: "",
        operatorName: "",
        supplyId: "",
        // id: "",
        supplyName: "玉米粉",
        supplyTypeName: "饲料",
        warehouseNumber: "",
      },
      rules:{
        supplyName: [
          { required: true, message: "请输入投入品名称", trigger: "blur" },
        ],
        warehouseNumber: [
          { required: true, message: "请输入仓库号", trigger: "blur" },
        ],
        operatorIdentity: [
          { required: true, message: "请输入操作者身份", trigger: "blur" },
        ],
        operatorName: [
          { required: true, message: "请输入操作者姓名", trigger: "blur" },
        ],
        outWeight: [
          { required: true, message: "请输入出库质量", trigger: "blur" },
        ],
      }
    };
  },
  created() {
    this.getSupplyList();
    // this.searchSupplyInfo();
  },
  methods: {
    //创建出库记录
    async createSupplyOut() {
      console.log(this.addInfo);
      const { data: res } = await this.$baseSupply.post("out", this.addInfo);
      console.log(res);
      //   toDialogInfo
      if (res.statusCode === 20000) {
        this.elMessage.success("出库成功");
        this.toDialogInfo.dialogVisible = false;
          this.$emit('faherMethod');
      }
    },
    async getSupplyList() {
      const { data: res } = await this.$baseSupply.get(`all/${this.$store.state.baseInfo.id}`);
      console.log(this.toDialogInfo.id);
      console.log(res);
      if(res.statusCode === 20000){
        this.supplyList = res.data;
      }
    },
    async searchSupply() {
      const { data: res } = await this.$supplyController.get(
        `${this.addInfo.supplyId}`
      );
      console.log(this.addInfo.supplyId);
      console.log(res);
      if (res.statusCode === 20000) {
        // this.addInfo.supplyName = res.data.name;
        console.log(this.addInfo);
        this.createSupplyOut();
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