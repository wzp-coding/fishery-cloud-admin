<template>
  <div>
    <!-- 添加区域开始 -->
    <el-button type="primary" @click="addDialogVisible = true">{{
      formTitle
    }}</el-button>
    <!-- 添加区域结束 -->

    <!-- 添加表单区域开始 -->
    <el-dialog
      :title="formTitle"
      :visible.sync="addDialogVisible"
      @close="addDialogClosed"
    >
      <el-form :model="addFrom" ref="addFromRef" :rules="formRules">
        <el-form-item :label="labels.productName" prop="productName">
          <el-input v-model="addFrom.productName"></el-input>
        </el-form-item>
        <el-form-item :label="labels.germchitId" prop="germchitId">
          <el-select v-model="addFrom.germchitId">
            <el-option
              v-for="item in germchitIds"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
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
  },
  data() {
    return {
      model: new ljc(this),

      // 表单名称
      formTitle: "添加加工产品",

      // 控制添加表单的显示与隐藏
      addDialogVisible: false,

      // 添加信息
      addFrom: {},
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
      this.$refs.addFromRef.validate(async (val) => {
        if (!val) return false;
        this.addFrom.processingFactoryId = this.processingFactoryId;
        const { data: res } = await this.model.addInfo(this.addFrom);
        if (res.statusCode == 20000) {
          this.$message.success(res.message);
        }
        this.$emit("getAllInfo");
        this.addDialogVisible = false;
      });
    },
    /* 添加结束 */

    /* 监听窗口关闭事件开始 */
    addDialogClosed() {
      this.addFrom = {};
      this.$refs.addFromRef.resetFields();
    },
    /* 监听窗口关闭事件关闭 */
  },
};
</script>

