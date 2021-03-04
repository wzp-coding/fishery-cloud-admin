<template>
  <el-dialog
    title="投苗信息"
    :visible.sync="toDialog.dialogVisible"
    width="28%"
  >
    <el-form>
      <el-form-item label="投入品类型">
        <el-select v-model="addFarmInfo.germchitId" placeholder="请选择投放种苗" @change="selectEvent">
          <el-option
            v-for="item in germchitList"
            :key="item.germchitId"
            :value="item.germchitId"
            :label="item.germchitSpecies"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="投放量" prop="inputNum">
        <el-input-number
          v-model="addFarmInfo.inputNum"
          controls-position="right"
          :min="1"
        ></el-input-number>
        
      </el-form-item>
      <!-- <el-form-item label="投放量kg" prop="inputNum">
        <el-input-number
          v-model="addFarmInfo.inputWeight"
          controls-position="right"
          :precision="2"
        ></el-input-number> -->
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
    toDialog: {
      type: Object,
    },
  },
  data() {
    return {
      germchitList: [],
      addFarmInfo: {
        germchitId: "",
        inputNum: 1, //投入量
        inputWeight:null,
        pondId: this.toPond.pondId,
        baseId: "1248910886228332544",
      },
      rules:{

      }
    };
  },
  created() {
      this.getGermchit()
  },
  methods: {
      //根据获取种苗信息 向池塘投苗
    async getGermchit() {
      const { data: res } = await this.$germchit.get();
      // console.log(res);
      this.germchitList = res.data;
      console.log(res.data); 
    },
  },
};
</script>

<style>
</style>