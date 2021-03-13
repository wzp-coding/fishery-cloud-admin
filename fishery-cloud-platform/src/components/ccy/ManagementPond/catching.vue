<template>
  <el-dialog
    title="池塘捕捞"
    :visible.sync="toDialogInfo.dialogVisible"
    width="25%"
    @close="closeEvent"
  >
    <el-form
      :model="catchInfo"
      label-width="120px"
      ref="fromRef"
      :rules="rules"
    >
      <el-form-item label="操作人" prop="operatorName">
        <el-input v-model="catchInfo.operatorName"></el-input>
      </el-form-item>
      <el-form-item label="剩余质量(kg)" prop="max">
        <el-input v-model="toDialogInfo.max" disabled></el-input>
      </el-form-item>
      <el-form-item label="捕捞量(尾)" prop="catchAmount">
        <el-input-number
          v-model="catchInfo.catchAmount"
          :min="0"
          controls-position="right"
        >
        </el-input-number>
      </el-form-item>
      <el-form-item label="捕捞质量(kg)" prop="totalWeight">
        <el-input-number
          v-model="catchInfo.totalWeight"
          :min="0"
          controls-position="right"
        >
        </el-input-number>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="toDialogInfo.dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="getPondInfo">确 定</el-button>
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
      catchInfo: {
        catchAmount: 0,
        germchitBatchName: "",
        germchitId: "",
        operatorName: "",
        pondId: this.toDialogInfo.pondId,
        totalWeight: "",
      },
      max: "",
      rules: {
        operatorName: [
          { required: true, message: "请输入操作员", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    async getPondInfo() {
      console.log(this.toDialogInfo.max);
      const { data: res } = await this.$pondController.get(
        `getOneInfo/${this.toDialogInfo.pondId}`
      );
      console.log(res);
      if (res.statusCode === 20000) {
        if (this.catchInfo.totalWeight <= res.data.surplusWeight) {
          let pondInfo = res.data;
          console.log(pondInfo);
          this.catchInfo.germchitId = pondInfo.germchitId;
          this.catchInfo.germchitBatchName = pondInfo.germchitSpecies;
          console.log(this.catchInfo);
          this.catchEvent();
        } else {
          this.elMessage.info("捕捞质量大于池塘剩余质量");
        }
      }
    },
    async catchEvent() {
      const { data: res } = await this.$pondController.put(
        "catching",
        this.catchInfo
      );
      console.log(res);
      if (res.statusCode === 20000) {
        this.elMessage.success("捕捞成功");
        this.toDialogInfo.dialogVisible = false;
        this.$emit("fatherMethod");
      }
    },
    closeEvent() {
      this.$refs.fromRef.resetFields();
    },
  },
};
</script>

<style>
</style>