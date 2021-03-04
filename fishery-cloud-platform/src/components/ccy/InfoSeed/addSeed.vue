<template>
  <el-dialog
    :visible.sync="toAddSeedInfo.dialogVisible"
    title="添加种苗信息"
    width="50%"
  >
    <el-form label-width="120px" :model="seedInfo" :rules="FormRules">
      <TheLayout>
        <el-form-item slot="pre" label="种苗数量" prop="germchitAmount">
          <el-input
            placeholder="请输入种苗数量"
            v-model="seedInfo.germchitAmount"
          ></el-input>
        </el-form-item>
        <el-form-item slot="after" label="种苗批次名称" prop="germchitBatchName">
          <el-input
            placeholder="请输入种苗批次名称"
            v-model="seedInfo.germchitBatchName"
          ></el-input>
        </el-form-item>
      </TheLayout>
      <TheLayout>
        <el-form-item slot="pre" label="种苗产地" prop="germchitOrigin">
          <el-input
            placeholder="请输入种苗产地"
            v-model="seedInfo.germchitOrigin"
          ></el-input>
        </el-form-item>
        <el-form-item slot="after" label="供应商姓名" prop="germchitSupplierName">
          <el-input
            placeholder="请输入种苗供应商姓名"
            v-model="seedInfo.germchitSupplierName"
          ></el-input>
        </el-form-item>
      </TheLayout>
      <TheLayout>
        <el-form-item slot="pre" label="供应商电话" prop="germchitSupplierPhone">
          <el-input
            placeholder="请输入种苗供应商电话"
            v-model="seedInfo.germchitSupplierPhone"
          ></el-input>
        </el-form-item>
        <el-form-item slot="after" label="种苗品种" prop="germchitSpecies">
          <el-input
            placeholder="请输入种苗品种"
            v-model="seedInfo.germchitSpecies"
          ></el-input>
        </el-form-item>
      </TheLayout>

      <!-- <el-form-item slot="after">
          <el-input
            placeholder="请输入种苗质检图片"
            v-model="seedInfo.germchitQualityInspection"
          ></el-input>
        </el-form-item> -->
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="toAddSeedInfo.dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="createSeed">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import TheLayout from "../TheLayout";
export default {
  components: {
    TheLayout,
  },
  props: {
    toAddSeedInfo: {
      type: Object,
    },
  },
  data() {
    return {
      seedInfo: {
        germchitAmount: "",
        germchitBatchName: "",
        germchitOrigin: "",
        germchitQualityInspection: "",
        germchitSpecies: "",
        germchitSupplierName: "",
        germchitSupplierPhone: "",
        gmtCreate:""
      },
      FormRules: {
        germchitBatchName: [
          { required: true, message: "请输入种苗批次名称", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "种苗批次名称的长度在2~10个字符之间",
            trigger: "blur",
          },
        ],
        germchitSupplierPhone: [
          { required: true, message: "请输入供应商联系电话", trigger: "blur" },
          {
            min: 2,
            max: 15,
            message: "供应商联系电话的长度在2~15个字符之间",
            trigger: "blur",
          },
        ],
        germchitSpecies: [
          { required: true, message: "请输入种苗品种", trigger: "blur" },
        ],
        germchitOrigin: [
          { required: true, message: "请输入种苗产地", trigger: "blur" },
        ],
        germchitSupplierName: [
          { required: true, message: "请输入种苗供应商姓名", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "种苗供应商名称的长度在2~10个字符之间",
            trigger: "blur",
          },
        ],
        germchitAmount: [
          { required: true, message: "请输入种苗数量", trigger: "blur" },
        ],
      },
    };
  },
  created() {},
  methods: {
    async createSeed() {
      this.seedInfo.gmtCreate = this.timeFormat(new Date())
      console.log(this.seedInfo.gmtCreate)
      const {data : res} = await this.$germchit.post('', this.seedInfo)
      console.log(res);
      if(res.statusCode ===20000){
        this.$emit('fatherMethod')
        this.toAddSeedInfo.dialogVisible = false
        this.elMessage.success('添加种苗成功')
      }
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
  },
};
</script>

<style>
</style>