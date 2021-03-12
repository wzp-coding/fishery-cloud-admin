<template>
  <div>
    <!-- 添加区域开始 -->
    <el-button type="primary" @click="addDialogVisible = true" v-auth="'traceability_product_add'">{{
      formTitle
    }}</el-button>
    <!-- 添加区域结束 -->

    <!-- 添加表单区域开始 -->
    <el-dialog
      :title="formTitle"
      :visible.sync="addDialogVisible"
      @close="addDialogClosed"
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
        <el-form-item :label="labels.productName" prop="productName">
          <el-input v-model="form.productName"></el-input>
        </el-form-item>
        <el-form-item :label="labels.commodityId" prop="germchitId">
          <el-select v-model="form.commodityId">
            <el-option
              v-for="item in commoditIds"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="labels.inventory" prop="inventory">
          <el-input-number
            v-model="form.inventory"
            controls-position="right"
            :min="0"
          ></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addInfo()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加表单区域结束 -->
  </div>
</template>
<script>
import ljc from "../product/product";
export default {
  props: {
    processingFactoryId: {},
    labels: {},
    commoditIds: {},
  },
  data() {
    return {
      model: new ljc(this),

      // 表单名称
      formTitle: "添加加工产品",

      // 控制添加表单的显示与隐藏
      addDialogVisible: false,

      // 添加信息
      form: {},
    };
  },
  computed: {
    //获取种苗编号列表
    germchitIds() {
      return this.model.germchitIds;
    },

    // 验证规则
    formRules() {
      return this.model.formRules;
    },
  },
  created() {},
  methods: {
    /* 添加开始 */
    addInfo() {
      this.$refs.formRef.validate(async (val) => {
        if (!val) return false;
        this.form.processingFactoryId = this.processingFactoryId;
        console.log(this.form);
        const { data: res } = await this.model.addInfo(this.form);
        if (res.statusCode == 20000) {
          this.elMessage.success(res.message);
        }
        this.$emit("getAllInfo");
        this.addDialogVisible = false;
      });
    },
    /* 添加结束 */

    /* 监听窗口关闭事件开始 */
    addDialogClosed() {
      this.form = {};
      this.$refs.formRef.resetFields();
    },
    /* 监听窗口关闭事件关闭 */
  },
};
</script>

