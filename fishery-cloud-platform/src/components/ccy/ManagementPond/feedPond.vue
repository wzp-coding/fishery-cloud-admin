<template>
  <el-dialog
    :visible.sync="toDialogInfo.dialogVisible"
    title="池塘投料"
    width="30%"
    @close="closeEvent"
  >
    <el-form :model="feedInfo" label-width="130px" :rules="fromRules" ref="formRef">
      <el-form-item label="操作者身份" prop="operatorIdentity">
        <el-input v-model="feedInfo.operatorIdentity"></el-input>
      </el-form-item>
      <el-form-item label="操作者姓名" prop="operatorName">
        <el-input v-model="feedInfo.operatorName"></el-input>
      </el-form-item>
      <el-form-item label="投入品类别" prop="supplyType">
        <el-input v-model="feedInfo.supplyType" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="请输入仓库号" prop="warehouseNumber">
        <el-input v-model="feedInfo.warehouseNumber"></el-input>
      </el-form-item>
      <el-form-item label="请选择投入品" prop="supplyName">
        <el-select v-model="feedInfo.supplyId" placeholder="请选择">
          <el-option
            v-for="item in supplyList"
            :key="item.id"
            :label="item.name"
            :value="item.supplyId"
          >
          </el-option>
        </el-select>
        <!-- <el-input v-model="feedInfo.supplyName"></el-input> -->
      </el-form-item>
      <el-form-item label="请输入投喂量" prop="feedingVolume">
        <el-input-number
          controls-position="right"
          :min="1"
          v-model="feedInfo.feedingVolume"
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
      baseId: "1248910886228332544",
      feedInfo: {
        baseId: "1248910886228332544",
        feedingVolume: 0,
        operatorIdentity: "",
        operatorName: "",
        pondId: this.toDialogInfo.pondId,
        remark: "暂无", //备注信息
        supplyId: "",
        supplyName: "",
        supplyType: "饲料",
        warehouseNumber: "",
      },
      fromRules: {
        supplyName: [
          { required: true, message: "请选择投入品", trigger: "blur" },
        ],
        operatorName: [
          { required: true, message: "请输入操作人", trigger: "blur" },
        ],
        feedingVolume: [
          { required: true, message: "请输入投放量", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.getSupplyList(); //获取基地所有投入品库存信息
  },
  methods: {
    async createFeed() {
      const { data: res } = await this.$pondController.post(
        "feeding",
        this.feedInfo
      );
      if (res.statusCode === 20000) {
        alert("喂养成功");
      }
      console.log(res);
      //   console.log(this.toDialogInfo);
    },
    async getSupplyList() {
      const { data: res } = await this.$baseSupply.get(`all/${this.baseId}`);
      console.log(res);
      if (res.statusCode === 20000) {
        this.supplyList = res.data;
      }
    },
    async searchSupply() {
      const { data: res } = await this.$supplyController.get(
        `${this.feedInfo.supplyId}`
      );
      console.log(this.feedInfo);
      console.log(res);
      if (res.statusCode === 20000) {
        this.feedInfo.supplyName = res.data.name;
        console.log(this.feedInfo);
        this.createFeed();
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