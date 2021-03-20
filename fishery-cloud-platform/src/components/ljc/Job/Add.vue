<template>
  <div>
    <!-- 添加区域开始 -->
    <el-button type="primary" @click="DialogVisible = true">{{
      formTitle
    }}</el-button>
    <!-- 添加区域结束 -->

    <!-- 添加表单区域开始 -->
    <el-dialog
      :title="formTitle"
      :visible.sync="DialogVisible"
      @close="DialogClosed"
      width="40%"
    >
      <el-form
        :model="form"
        ref="formRef"
        :rules="formRules"
        label-width="100px"
        label-position="left"
        :hide-required-asterisk="true"
      >
        <el-form-item :label="labels.materialId" prop="materialId">
          <el-select v-model="form.materialId" @change="getMaterialById">
            <el-option
              v-for="item in Materials"
              :key="item.id"
              :label="item.materialName"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item :label="labels.operatorName" prop="operatorName">
          <el-select v-model="form.operatorName">
            <el-option
              v-for="item in Staffs"
              :key="item.id"
              :label="item.username"
              :value="item.username"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item :label="labels.productId" prop="productId">
          <el-select v-model="form.productId">
            <el-option
              v-for="item in Products"
              :key="item.id"
              :label="item.productName"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item :label="labels.materialWeight" prop="materialWeight">
          <el-input-number
            v-model="form.materialWeight"
            controls-position="right"
            :min="0"
            :max="weightMax"
          ></el-input-number>
        </el-form-item>

        <el-form-item :label="labels.productWeight" prop="productWeight">
          <el-input-number
            v-model="form.productWeight"
            controls-position="right"
            :min="0"
          ></el-input-number>
        </el-form-item>

        <el-form-item :label="labels.jobDescription" prop="jobDescription">
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="form.jobDescription"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="DialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addInfo()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加表单区域结束 -->
  </div>
</template>
<script>
import ljc from "./Job";
import publicFn from "../public/public";
export default {
  props: {
    processingFactoryId: {},
  },
  data() {
    return {
      model: new ljc(this),

      publicFn: new publicFn(this),

      // 表单名称
      formTitle: "添加加工作业",

      // 控制添加表单的显示与隐藏
      DialogVisible: false,

      // 添加信息
      form: {},

      // 原料列表
      Materials: [],

      //   人员列表
      Staffs: [],

      //   产品列表
      Products: [],

      //   原料上限
      weightMax: 100,

      materialId: "",
    };
  },
  computed: {
    // 表单验证规则对象
    formRules() {
      return this.model.formRules;
    },

    labels() {
      return this.model.labels;
    },
  },
  created() {
    this.getMaterial();
    this.getStaff();
    this.getProduct();
  },

  methods: {
    /* 添加 */
    addInfo() {
      this.$refs.formRef.validate(async (val) => {
        if (!val) return false;
        this.form.materialId = this.materialId;
        this.form.processingFactoryId = this.processingFactoryId;
        console.log(this.form);
        const { data: res } = await this.model.addInfo(this.form);
        if (res.statusCode !== 20000) {
          this.elMessage.error(res.message);
        } else {
          this.elMessage.success(res.message);
          this.$emit("getAllInfo");
          this.DialogVisible = false;
        }
      });
    },

    /* 监听窗口关闭事件 */
    DialogClosed() {
      this.form = {};
      this.$refs.formRef.resetFields();
    },

    /* 获取原料 */
    async getMaterial() {
      const { data: res } = await this.publicFn.getMaterial(
        this.processingFactoryId
      );
      this.Materials = res.data;
    },

    /* 获取操作人员 */
    async getStaff() {
      const { data: res } = await this.publicFn.getStaff();
      this.Staffs = res.data;
    },

    /* 获取产品列表 */
    async getProduct() {
      const { data: res } = await this.publicFn.getProduct(
        this.processingFactoryId
      );
      this.Products = res.data;
    },

    /* 根据id获取原料信息 */
    async getMaterialById() {
      const { data: res } = await this.publicFn.getMaterialById(
        this.form.materialId
      );
      this.weightMax = res.data.materialWeight;
      this.materialId = res.data.materialId;
    },
  },
};
</script>

