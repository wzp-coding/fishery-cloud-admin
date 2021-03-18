<template>
  <el-dialog
    :visible.sync="editVisible"
    title="修改喂养记录"
    @close="closeEvent"
    width="30%"
  >
    <el-form :model="eidtObject" label-width="110px" :rules="rules">
      <el-form-item label="操作者姓名" prop="operatorName">
        <el-input v-model="eidtObject.operatorName"></el-input>
      </el-form-item>
      <el-form-item label="操作者身份" prop="operatorIdentity">
        <el-input v-model="eidtObject.operatorIdentity"></el-input>
      </el-form-item>
      <el-form-item label="请选择投入品" prop="supplyName">
        <el-select
          @change="selectEvent"
          v-model="eidtObject.supplyName"
          placeholder="请选择"
        >
          <el-option
            v-for="(item, index) in supplyList"
            :key="index"
            :label="item.name"
            :value="index"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="请输入投喂量" prop="feedingVolume">
        <el-input-number
          controls-position="right"
          v-model="eidtObject.feedingVolume"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="请输入仓库号" prop="warehouseNumber">
        <el-input v-model="eidtObject.warehouseNumber"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeEvent">取 消</el-button>
      <el-button type="primary" @click="editFeed">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    editId: {
      type: String,
    },
  },
  data() {
    return {
      editVisible: this.dialogVisible,
      eidtObject: {
        baseId: this.$store.state.baseInfo.id,
        feedingVolume: null,
        id: this.editId,
        operatorIdentity: "",
        operatorName: "",
        pondId: this.editId,
        // remark: "string",
        supplyId: "",
        supplyName: "",
        supplyType: "饲料",
        warehouseNumber: "",
      },
      supplyList: [],
      rules: {
        operatorIdentity: [
          { required: true, message: "请输入操作者身份", trigger: "blur" },
        ],
        operatorName: [
          { required: true, message: "请输入操作员", trigger: "blur" },
        ],
        supplyName: [
          { required: true, message: "请输入投入品名称", trigger: "blur" },
        ],
        warehouseNumber: [
          { required: true, message: "请输入仓库号", trigger: "blur" },
        ],
        feedingVolume: [
          { required: true, message: "请输入投喂数量", trigger: "blur" },
        ],
      },
    };
  },
  watch: {
    dialogVisible: {
      handler(newVal, oldVal) {
        this.editVisible = newVal;
      },
    },
  },
  created() {
    this.getSupplyList();
  },
  methods: {
    closeEvent() {
      this.$emit("fatherMethods");
      this.editVisible = false;
    },
    async getSupplyList() {
      const { data: res } = await this.$supplyController.get();
      console.log(res);
      if (res.statusCode === 20000) {
        this.supplyList = res.data;
      }
    },
    selectEvent(res) {
      console.log(res);
      this.eidtObject.supplyId = this.supplyList[res].id;
      this.eidtObject.supplyName = this.supplyList[res].name;
    },
    async editFeed() {
      console.log(this.eidtObject);
      // const {data: res} = await this.$pondController.put('feeding',this.eidtObject)
      // console.log(res);
      // if(res.statusCode === 20000){

      // }
    },
  },
};
</script>

<style>
</style>