<template>
  <el-dialog title="池塘捕捞" :visible.sync="toDialogInfo.dialogVisible">
    <el-form :model="catchInfo" >
      <el-form-item label="操作人" prop="operatorName">
        <el-input v-model="catchInfo.operatorName"></el-input>
      </el-form-item>
      <el-form-item label="捕捞量（尾/kg）" prop="catchAmount">
        <!-- <el-select v-model="catchInfo.catchAmount" placeholder="请选择">
          <el-option
            v-for="item in options3"
            :key="item.id"
            :value="item.value"
          ></el-option>
        </el-select> -->
      </el-form-item>
      <!-- <el-form-item label="产量kg" prop="yield">
        <el-input-number
          v-model="catchInfo.yield"
          controls-position="right"
          :min="0.01"
        ></el-input-number>
      </el-form-item> -->
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="toDialogInfo.dialogVisible = false">取 消</el-button>
      <el-button type="primary">确 定</el-button>
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
    };
  },
  created(){
    this.getPondInfo()
  },
  methods: {
    async getPondInfo(){
      const {data : res} = await this.$pondController.get(`getOneInfo/${this.toDialogInfo.pondId}`)
      console.log(res);
    }
  },
};
</script>

<style>
</style>