<template>
  <el-dialog
    :visible.sync="toPurchaseInfo.dialogVisible"
    title="订单信息"
    width="24%"
    @close="closeEvent"
  >
    <el-form :model="purchaseInfo" label-width="100px" ref="formRef" :rules="rules">
      <el-form-item label="购买数量" prop="purchaseAmount">
        <el-input-number
          v-model="purchaseInfo.purchaseAmount"
          controls-position="right"
          :min="0"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="操作者" prop="creatorName">
        <el-input v-model="purchaseInfo.creatorName"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="toPurchaseInfo.dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="purchaseEvent">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    toPurchaseInfo: {
      type: Object,
    },
  },
  data() {
    return {
      purchaseInfo: {
        creatorName: "", //操作者
        baseId: "1248910886228332544",
        purchaseAmount: 1, //购买数量
        germchitId: "", //购买商品ID
      },
      rules: {
        creatorName: [
          { required: true, message: "请输入操作员", trigger: "blur" },
        ],
      },
    };
  },
  created() {},
  methods: {
    //下订单
    async purchaseEvent() {
      this.purchaseInfo.germchitId = this.toPurchaseInfo.germchitId;
      console.log(this.purchaseInfo);
      const { data: res } = await this.$germchitManagerController.post(
        "purchase",
        this.purchaseInfo
      );
      if (res.statusCode === 20000) {
        this.elMessage.success("提交订单成功");
      } else {
        console.log("下订单失败");
      }
      this.toPurchaseInfo.dialogVisible = false;
    },
    closeEvent() {
      this.$refs.formRef.resetFields();
    },
  },
};
</script>

<style>
</style>