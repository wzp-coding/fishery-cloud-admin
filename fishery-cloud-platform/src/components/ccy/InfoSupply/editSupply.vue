<template>
  <el-dialog :visible.sync="toDialogInfo.dialogVisible" width="55%">
    <el-form
      label-width="95px"
      label-position="left"
      :model="editForm"
      :rules="rules"
    >
      <editLayout>
        <el-form-item label="投入品名称" prop="suppliesName" slot="pre">
          <el-input
            placeholder="请输入投入品名称"
            v-model="editForm.name"
            clearable
          ></el-input>
        </el-form-item>
      </editLayout>
      <editLayout>
        <el-form-item label="生产日期" prop="produceDate" slot="pre">
          <el-date-picker
            v-model="editForm.produceDate"
            type="datetime"
            placeholder="选择生产日期时间"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="到期时间" prop="shelfDate" slot="after">
          <el-date-picker
            v-model="editForm.shelfDate"
            type="datetime"
            placeholder="选择到期时间时间"
          ></el-date-picker>
        </el-form-item>
      </editLayout>
      <editLayout>
        <el-form-item label="规格(mm)" prop="specification" slot="pre">
          <el-input-number
            placeholder="请输入投入品规格"
            :min="1"
            controls-position="right"
            v-model="editForm.specification"
            clearable
          ></el-input-number>
        </el-form-item>
        <!-- <el-form-item label="投入品类型" slot="after">
          <el-cascader
            placeholder="请选择投入品类型"
            v-model="valueType"
            :options="categoryOptions"
            @change="handleCategoryChange"
            clearable
            :show-all-levels="false"
          ></el-cascader>
        </el-form-item> -->
      </editLayout>
      <editLayout>
        <el-form-item label="供应商" prop="supplierName" slot="pre">
          <el-input
            placeholder="请输入供应商名称"
            v-model="editForm.supplierName"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="联系人" prop="inspector" slot="after">
          <el-input
            placeholder="请输入联系人名称"
            v-model="editForm.inspector"
            clearable
          ></el-input>
        </el-form-item>
      </editLayout>
      <editLayout>
        <el-form-item label="供应商电话" prop="supplierPhone" slot="pre">
          <el-input
            placeholder="请输入供应商电话"
            v-model="editForm.supplierPhone"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="供应商地址" prop="supplierAddress" slot="after">
          <el-input
            placeholder="请输入供应商地址"
            v-model="editForm.supplierAddress"
            clearable
          ></el-input>
        </el-form-item>
      </editLayout>
      <editLayout>
        <el-form-item label="投入品成分" prop="ingredient" slot="pre">
          <el-input v-model="editForm.ingredient"></el-input>
        </el-form-item>
      </editLayout>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="toDialogInfo.dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="editSupplies">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import editLayout from "../InfoSupply/editLayout";
export default {
  components: {
    editLayout,
  },
  props: {
    toDialogInfo: {
      type: Object,
    },
  },
  data() {
    return {
      editForm: {
        id: "",
        ingredient: "",
        inspector: "",
        name: "",
        picture: "",
        produceDate: "",
        shelfDate: "",
        specification: 1,
        supplierAddress: "",
        supplierLicense: "",
        supplierName: "",
        supplierPhone: "",
        type: 1,
      },
      rules: {
        name: [
          { required: true, message: "请输入投入品名称", trigger: "blur" },
        ],
        produceDate: [
          { required: true, message: "请输入生产日期", trigger: "blur" },
        ],
        shelfDate: [
          { required: true, message: "请输入到期时间", trigger: "blur" },
        ],
        supplierName: [
          { required: true, message: "请输入供应商名称", trigger: "blur" },
        ],
        inspector: [
          { required: true, message: "请输入联系人名称", trigger: "blur" },
        ],
        supplierPhone: [
          { required: true, message: "请输入供应商电话", trigger: "blur" },
          {
            min: 8,
            max: 11,
            message: "长度在 8 到 11 个字符",
            trigger: "blur",
          },
        ],
        supplierAddress: [
          { required: true, message: "请输入供应商地址", trigger: "blur" },
        ],
        specification: [
          { required: true, message: "请输入规格", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.test();
  },
  methods: {
    test() {
      console.log(this.toDialogInfo);
    },
    async editSupplies() {
      this.editForm.id = this.toDialogInfo.id;
      this.editForm.produceDate = this.timeFormat(this.editForm.produceDate);
      this.editForm.shelfDate = this.timeFormat(this.editForm.shelfDate);
      console.log(this.editForm);
      const { data: res } = await this.$supplyController.put(
        "",
        this.editForm
      );
      console.log(res);
      this.toDialogInfo.dialogVisible = false;
      this.$emit('fatherMethod');
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