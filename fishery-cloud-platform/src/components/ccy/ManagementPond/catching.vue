<template>
  <el-dialog title="池塘捕捞" :visible.sync="toDialogInfo.dialogVisible" width="28%" @close="closeEvent">
    <el-form :model="catchInfo" label-width="120px" ref="fromRef" :rules="rules">
      <el-form-item label="操作人" prop="operatorName">
        <el-input v-model="catchInfo.operatorName"></el-input>
      </el-form-item>
      <el-form-item label="捕捞量（尾/kg）" prop="catchAmount">
        <el-input-number v-model="catchInfo.catchAmount" :min="1" controls-position="right">
        </el-input-number>
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
      rules:{
        operatorName:[{ required: true, message: '请输入操作员', trigger: 'blur' }],
      }
    };
  },
  created(){
    // this.getPondInfo()
  },
  methods: {
    async getPondInfo(){
      const {data : res} = await this.$pondController.get(`getOneInfo/${this.toDialogInfo.pondId}`)
      if(res.statusCode===20000){
        let pondInfo = res.data
        console.log(pondInfo);
        this.catchInfo.germchitId = pondInfo.germchitId
        this.catchInfo.germchitBatchName = pondInfo.germchitSpecies
        this.catchInfo.totalWeight = pondInfo.inputNum
        console.log(this.catchInfo);
        this.catchEvent()
      }
    },
    async catchEvent(){
      const {data : res} = await this.$pondController.put("catching",this.catchInfo)
      if(res.statusCode === 20000){
        this.elMessage.success('捕捞成功')
        this.toDialogInfo.dialogVisible = false
        console.log(res);
        this.$emit('fatherMethod')
      }
    },
    closeEvent(){
      this.$refs.fromRef.resetFields()
    }
  },
};
</script>

<style>
</style>