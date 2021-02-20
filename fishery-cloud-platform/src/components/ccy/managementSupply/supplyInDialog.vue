<template>
  <el-dialog
    title="农资入库"
    :visible.sync="toDialogAddInfo.dialogVisible"
    width="30%"
    @close="closeEvent"
  >
    <el-form :model="addInfo" label-width="135px" ref="formRef" :rules="rules">
      <el-form-item label="操作者身份" prop="operatorIdentity">
        <el-input v-model="addInfo.operatorIdentity"></el-input>
      </el-form-item>
      <el-form-item label="操作者姓名" prop="operatorName">
        <el-input v-model="addInfo.operatorName"></el-input>
      </el-form-item>
      <!-- <el-form-item label="投入品类别" prop="supplyTypeName" >
        <el-input v-model="addInfo.supplyTypeName"></el-input>
      </el-form-item> -->
      <el-form-item label="请输入仓库号" prop="warehouseNumber">
        <el-input v-model="addInfo.warehouseNumber"></el-input>
      </el-form-item>
      <el-form-item label="请选择投入品" prop="supplyName">
        <el-select
          v-model="addInfo.supplyId"
          placeholder="请选择"
        >
          <el-option
            v-for="item in supplyList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
        <!-- <el-input v-model="addInfo.supplyName"></el-input> -->
      </el-form-item>
      <el-form-item label="请输入投入品数量" prop="inWeight">
        <el-input-number controls-position="right" :min="1" v-model="addInfo.inWeight"></el-input-number>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="toDialogAddInfo.dialogVisible = false"
        >取 消</el-button
      >
      <el-button type="primary" @click="searchSupply()">确 定</el-button>
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
      supplyList: [],
      addInfo: {
        baseId: this.$store.state.userInfo.baseId,
        // gmtCreate: "",
        inWeight: 1,
        operatorIdentity: "",
        operatorName: "",
        supplyId: "",
        // id: "",
        supplyName: '',
        supplyTypeName: "饲料",
        warehouseNumber: "",
      },
      rules:{
        operatorIdentity:[{ required: true, message: '请输入操作者身份', trigger: 'blur' }],
        operatorName:[{ required: true, message: '请输入操作员', trigger: 'blur' }],
        supplyName:[{ required: true, message: '请输入投入品名称', trigger: 'blur' }],
        warehouseNumber:[{ required: true, message: '请输入仓库号', trigger: 'blur' }],
        inWeight:[{ required: true, message: '请输入投入品数量', trigger: 'blur' }],
      }
    };
  },
  created() {
    this.getSupplyList(); //获取所有投入品信息
  },
  methods: {
    async supplyIn() {
      console.log(this.addInfo);
      const { data: res } = await this.$baseSupply.post("in", this.addInfo);
      console.log(res);
      this.toDialogAddInfo.dialogVisible = false;
      this.$emit('fatherMethod')
    },
    async getSupplyList() {
      const { data: res } = await this.$supplyController.get();
      console.log(res);
      this.supplyList = res.data;
    },
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
    async searchSupply(){
      const {data : res} = await this.$supplyController.get(`${this.addInfo.supplyId}`)
      console.log(res);
      if(res.statusCode === 20000){
        this.addInfo.supplyName = res.data.name
        this.supplyIn()
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