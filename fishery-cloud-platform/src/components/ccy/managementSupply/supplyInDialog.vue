<template>
  <el-dialog title="农资入库" :visible.sync="toDialogAddInfo.dialogVisible">
    <el-form :model="addInfo">
      <el-form-item label="操作者身份" prop="operatorIdentity">
        <el-input v-model="addInfo.operatorIdentity"></el-input>
      </el-form-item>
      <el-form-item label="操作者姓名" prop="operatorName">
        <el-input v-model="addInfo.operatorName"></el-input>
      </el-form-item>
      <el-form-item label="投入品类别" prop="supplyTypeName">
        <el-input v-model="addInfo.supplyTypeName"></el-input>
      </el-form-item>
      <el-form-item label="请输入仓库号" prop="warehouseNumber">
        <el-input v-model="addInfo.warehouseNumber"></el-input>
      </el-form-item>
      <el-form-item label="请输入投入品名称" prop="supplyName">
        <el-input v-model="addInfo.supplyName"></el-input>
      </el-form-item>
      <el-form-item label="请输入投入品数量" prop="inWeight">
        <el-input v-model="addInfo.inWeight"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="toDialogAddInfo.dialogVisible = false"
        >取 消</el-button
      >
      <el-button type="primary" @click="supplyIn">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    toDialogAddInfo: {
      type: Object,
    },
  },
  data() {
    return {
        supplyList:[],
        // supplyId: "",
      addInfo: {
        baseId: 1248910886228332544,
        // gmtCreate: "",
        inWeight: 1,
        operatorIdentity: "",
        operatorName: "",
        id:'',
        supplyName: "",
        supplyTypeName: "",
        warehouseNumber: "",
      },
    };
  },
  created(){
    //   this.getSupplyList()
  },
  methods: {
    async supplyIn() {
        // this.addInfo.gmtCreate = this.timeFormat(new Date())
        console.log(this.addInfo);
        const {data : res} = await this.$baseSupply.post('in',this.addInfo)
        console.log(res);
    },
    // async getSupplyList(){
    //     const {data : res} = await this.$supplyController.post()
    //     console.log(res);
    // },
    timeFormat(date) {
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      var d = date.getDate();
      d = d < 10 ? "0" + d : d;
      var h = date.getHours();
      h = h < 10 ? "0" + h : h;
      var minute = date.getMinutes();
      minute = minute < 10 ? "0" + minute : minute;
      var second = date.getSeconds();
      second = second < 10 ? "0" + second : second;
      return y + "-" + m + "-" + d + " " + h + ":" + minute + ":" + second;
    },
  },
};
</script>

<style>
</style>